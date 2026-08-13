"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle,
  XCircle,
  ChevronRight,
  RotateCcw,
  Trophy,
  BookOpen,
  AlertCircle,
} from "lucide-react";
import type { Pergunta, QuizResult } from "@/types";
import { getOrCreateSessionId } from "@/lib/session";

interface QuizProps {
  perguntas: Pergunta[];
  cursoId: string;
  cursoNome: string;
}

type QuizState = "idle" | "running" | "finished";

export default function Quiz({ perguntas, cursoId, cursoNome }: QuizProps) {
  const [state, setState] = useState<QuizState>("idle");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [saving, setSaving] = useState(false);

  const currentPergunta = perguntas[currentIndex];
  const totalAcertos = results.filter((r) => r.acertou).length;

  function handleStart() {
    setState("running");
    setCurrentIndex(0);
    setSelectedId(null);
    setConfirmed(false);
    setResults([]);
  }

  function handleSelect(id: string) {
    if (confirmed) return;
    setSelectedId(id);
  }

  function handleConfirm() {
    if (!selectedId || !currentPergunta) return;
    const alt = currentPergunta.alternativas.find((a) => a.id === selectedId);
    const correctAlt = currentPergunta.alternativas.find((a) => a.correta);
    if (!alt || !correctAlt) return;

    const result: QuizResult = {
      perguntaId: currentPergunta.id,
      enunciado: currentPergunta.enunciado,
      alternativaEscolhidaId: selectedId,
      alternativaCorretaId: correctAlt.id,
      acertou: alt.correta,
      textoEscolhido: alt.texto,
      textoCorreto: correctAlt.texto,
    };

    setResults((prev) => [...prev, result]);
    setConfirmed(true);
  }

  function handleNext() {
    if (currentIndex < perguntas.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedId(null);
      setConfirmed(false);
    } else {
      finishQuiz();
    }
  }

  async function finishQuiz() {
    setState("finished");
    const sessaoId = getOrCreateSessionId();
    setSaving(true);
    try {
      await fetch("/api/respostas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessaoId,
          cursoId,
          respostas: results.map((r) => ({
            perguntaId: r.perguntaId,
            alternativaId: r.alternativaEscolhidaId,
            acertou: r.acertou,
          })),
        }),
      });
    } catch (e) {
      console.error("Error saving quiz results:", e);
    } finally {
      setSaving(false);
    }
  }

  function handleRestart() {
    setState("idle");
    setCurrentIndex(0);
    setSelectedId(null);
    setConfirmed(false);
    setResults([]);
  }

  function getFeedbackMessage(acertos: number, total: number) {
    const pct = acertos / total;
    if (pct >= 0.8) {
      return {
        emoji: "🎉",
        title: "Você já entende bem sobre o curso!",
        desc: "Suas expectativas estão muito alinhadas com o que o curso realmente oferece. Parece uma ótima escolha para você!",
        color: "text-green-600 dark:text-green-400",
        bg: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
      };
    } else if (pct >= 0.4) {
      return {
        emoji: "📚",
        title: "Você tem uma ideia, mas vale explorar mais!",
        desc: "Você conhece parte do curso, mas ainda há conteúdos que podem te surpreender. Pesquise mais antes de decidir!",
        color: "text-yellow-600 dark:text-yellow-400",
        bg: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      };
    } else {
      return {
        emoji: "🤔",
        title: "Suas expectativas são bem diferentes do curso!",
        desc: "O que você imagina sobre o curso é bastante diferente da realidade. Leia mais sobre o curso e reflita se ele combina com você.",
        color: "text-red-600 dark:text-red-400",
        bg: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      };
    }
  }

  // IDLE STATE
  if (state === "idle") {
    return (
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-[#168F6B]/10 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-[#168F6B]" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Quiz Vocacional
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-2">
          <span className="font-semibold text-[#168F6B]">{cursoNome}</span>
        </p>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-md mx-auto">
          Responda {perguntas.length} perguntas para descobrir se suas expectativas
          combinam com o que este curso realmente oferece.
        </p>
        <button
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#168F6B] text-white font-semibold rounded-xl hover:bg-[#127558] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2"
        >
          Iniciar quiz
          <ChevronRight className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>
    );
  }

  // RUNNING STATE
  if (state === "running" && currentPergunta) {
    const progress = ((currentIndex) / perguntas.length) * 100;

    return (
      <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span>Pergunta {currentIndex + 1} de {perguntas.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#168F6B] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={currentIndex}
              aria-valuemin={0}
              aria-valuemax={perguntas.length}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 leading-snug">
          {currentPergunta.enunciado}
        </h3>

        {/* Alternatives */}
        <div className="space-y-3 mb-6">
          {currentPergunta.alternativas.map((alt) => {
            let className =
              "w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]";

            if (!confirmed) {
              if (selectedId === alt.id) {
                className +=
                  " border-[#168F6B] bg-[#168F6B]/10 text-gray-900 dark:text-white";
              } else {
                className +=
                  " border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 hover:border-[#168F6B]/50 hover:bg-[#168F6B]/5 cursor-pointer";
              }
            } else {
              if (alt.correta) {
                className +=
                  " border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
              } else if (selectedId === alt.id && !alt.correta) {
                className +=
                  " border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
              } else {
                className +=
                  " border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30 text-gray-400 dark:text-gray-600";
              }
            }

            return (
              <button
                key={alt.id}
                onClick={() => handleSelect(alt.id)}
                disabled={confirmed}
                className={className}
                aria-pressed={selectedId === alt.id}
              >
                <div className="flex items-start gap-3">
                  {confirmed && (
                    <span className="flex-shrink-0 mt-0.5">
                      {alt.correta ? (
                        <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                      ) : selectedId === alt.id ? (
                        <XCircle className="w-4 h-4 text-red-500" aria-hidden="true" />
                      ) : (
                        <span className="w-4 h-4 block" />
                      )}
                    </span>
                  )}
                  <span>{alt.texto}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          {!confirmed ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedId}
              className="px-5 py-2.5 bg-[#168F6B] text-white font-semibold rounded-xl hover:bg-[#127558] transition-colors disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2"
            >
              Confirmar
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#168F6B] text-white font-semibold rounded-xl hover:bg-[#127558] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2"
            >
              {currentIndex < perguntas.length - 1 ? "Próxima" : "Ver resultado"}
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    );
  }

  // FINISHED STATE
  if (state === "finished") {
    const feedback = getFeedbackMessage(totalAcertos, perguntas.length);

    return (
      <div className="space-y-6">
        {/* Score Card */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#168F6B]/10 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-[#168F6B]" aria-hidden="true" />
          </div>
          <div className="text-5xl font-bold text-[#168F6B] mb-1">
            {totalAcertos}/{perguntas.length}
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">acertos</p>

          {/* Feedback */}
          <div className={`rounded-xl border p-4 text-left ${feedback.bg}`}>
            <p className={`text-base font-bold mb-1 ${feedback.color}`}>
              {feedback.emoji} {feedback.title}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{feedback.desc}</p>
          </div>

          {saving && (
            <p className="text-xs text-gray-400 mt-3">Salvando respostas...</p>
          )}
        </div>

        {/* Results breakdown */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Revisão das perguntas
          </h3>
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={r.perguntaId}
                className={`rounded-xl border p-4 ${
                  r.acertou
                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10"
                    : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5">
                    {r.acertou ? (
                      <CheckCircle
                        className="w-5 h-5 text-green-500"
                        aria-label="Correto"
                      />
                    ) : (
                      <XCircle
                        className="w-5 h-5 text-red-500"
                        aria-label="Incorreto"
                      />
                    )}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                      {i + 1}. {r.enunciado}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Sua resposta:{" "}
                      <span
                        className={
                          r.acertou
                            ? "text-green-600 dark:text-green-400 font-medium"
                            : "text-red-600 dark:text-red-400 font-medium"
                        }
                      >
                        {r.textoEscolhido}
                      </span>
                    </p>
                    {!r.acertou && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                        Resposta correta:{" "}
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {r.textoCorreto}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restart */}
        <div className="flex justify-center">
          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B]"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            Refazer quiz
          </button>
        </div>
      </div>
    );
  }

  return null;
}
