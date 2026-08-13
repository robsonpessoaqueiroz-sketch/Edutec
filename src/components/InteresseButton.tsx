"use client";

import { useState, useEffect } from "react";
import { Heart, HelpCircle, X, Loader2 } from "lucide-react";
import type { InteresseStatus } from "@/types";
import { getOrCreateSessionId } from "@/lib/session";

interface InteresseButtonProps {
  cursoId: string;
  cursoNome: string;
}

const options: { value: InteresseStatus; label: string; icon: React.ReactNode; activeClass: string }[] = [
  {
    value: "quero",
    label: "Quero",
    icon: <Heart className="w-4 h-4" aria-hidden="true" />,
    activeClass: "bg-green-600 border-green-600 text-white",
  },
  {
    value: "talvez",
    label: "Talvez",
    icon: <HelpCircle className="w-4 h-4" aria-hidden="true" />,
    activeClass: "bg-yellow-500 border-yellow-500 text-white",
  },
  {
    value: "nao_quero",
    label: "Não quero",
    icon: <X className="w-4 h-4" aria-hidden="true" />,
    activeClass: "bg-red-500 border-red-500 text-white",
  },
];

export default function InteresseButton({ cursoId, cursoNome }: InteresseButtonProps) {
  const [status, setStatus] = useState<InteresseStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const sessaoId = getOrCreateSessionId();
    fetch(`/api/interesse?sessaoId=${sessaoId}&cursoId=${cursoId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data && data.status) {
          setStatus(data.status as InteresseStatus);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [cursoId]);

  async function handleSelect(value: InteresseStatus) {
    const sessaoId = getOrCreateSessionId();
    setSaving(true);
    try {
      const res = await fetch("/api/interesse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessaoId, cursoId, status: value }),
      });
      if (res.ok) {
        setStatus(value);
      }
    } catch (e) {
      console.error("Error saving interesse:", e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
        Este curso combina com você?
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Marque seu nível de interesse em{" "}
        <span className="font-medium text-gray-700 dark:text-gray-300">{cursoNome}</span>:
      </p>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
          Carregando...
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {options.map((opt) => {
            const isActive = status === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                disabled={saving}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${
                  isActive
                    ? opt.activeClass
                    : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                {saving && isActive ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  opt.icon
                )}
                {opt.label}
              </button>
            );
          })}
        </div>
      )}

      {status && (
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
          ✓ Sua preferência foi salva e ficará disponível quando você voltar.
        </p>
      )}
    </div>
  );
}
