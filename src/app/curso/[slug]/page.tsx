import { db } from "@/db";
import { cursos, eixos, perguntas, alternativas } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import type { Pergunta } from "@/types";
import EixoIcon from "@/components/EixoIcon";
import Quiz from "@/components/Quiz";
import InteresseButton from "@/components/InteresseButton";
import { ArrowLeft, CheckCircle, MapPin, Zap } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const all = await db.select().from(cursos);
    const curso = all.find((c: any) => c.slug === slug);
    if (!curso) return { title: "Curso não encontrado" };
    return {
      title: `${curso.nome} — Cursos Técnicos 2027 EEEP Maria Célia`,
      description: curso.descricao,
    };
  } catch {
    return { title: "Curso" };
  }
}

async function getPerguntasComAlternativas(cursoId: string): Promise<Pergunta[]> {
  const allPerguntas = await db.select().from(perguntas);
  const perguntasDoCurso = allPerguntas.filter((p: any) => p.cursoId === cursoId).sort((a: any, b: any) => (a.ordem ?? 0) - (b.ordem ?? 0));

  const allAlts = await db.select().from(alternativas);
  const result: Pergunta[] = [];
  for (const p of perguntasDoCurso) {
    const alts = allAlts.filter((a: any) => a.perguntaId === p.id);
    result.push({ ...p, alternativas: alts });
  }
  return result;
}

export default async function CursoPage({ params }: PageProps) {
  const { slug } = await params;

  let curso: any;
  let eixo: any;
  let quizPerguntas: Pergunta[] = [];

  try {
    const allCursos = await db.select().from(cursos);
    const foundCurso = allCursos.find((c: any) => c.slug === slug);
    if (!foundCurso) notFound();
    curso = foundCurso;

    if (curso.eixoId) {
      const allEixos = await db.select().from(eixos);
      const foundEixo = allEixos.find((e: any) => e.id === curso.eixoId);
      eixo = foundEixo;
    }

    quizPerguntas = await getPerguntasComAlternativas(curso.id);
  } catch {
    notFound();
  }

  if (!curso) notFound();

  const oQueAprender: string[] = (curso.oQueAprender ?? "").split("|").filter(Boolean);
  const ondeAtuar: string[] = (curso.ondeAtuar ?? "").split("|").filter(Boolean);
  const habilidades: string[] = (curso.habilidades ?? "").split("|").filter(Boolean);

  const cor: string = eixo?.cor ?? "#168F6B";

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `radial-gradient(ellipse at top left, ${cor}, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          {/* Breadcrumb */}
          <nav aria-label="Navegação estrutural" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/"
              className="hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              Início
            </Link>
            <span>/</span>
            {eixo && (
              <>
                <Link
                  href={`/eixo/${eixo.slug}`}
                  className="hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
                >
                  {eixo.nome}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 dark:text-white font-medium">{curso.nome}</span>
          </nav>

          {/* Course header */}
          <div className="flex items-start gap-4 mb-6">
            {eixo && <EixoIcon icone={eixo.icone} cor={cor} size="md" />}
            <div>
              {eixo && (
                <Link
                  href={`/eixo/${eixo.slug}`}
                  className="inline-block text-sm font-semibold uppercase tracking-wide mb-1 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
                  style={{ color: cor }}
                >
                  {eixo.nome}
                </Link>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {curso.nome}
              </h1>
            </div>
          </div>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {curso.descricao}
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
        {/* O que você vai aprender */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-5">
            <CheckCircle className="w-5 h-5 text-[#168F6B]" aria-hidden="true" />
            O que você vai aprender
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {oQueAprender.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cor }}
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Onde pode atuar */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-5">
            <MapPin className="w-5 h-5 text-[#168F6B]" aria-hidden="true" />
            Onde pode atuar
          </h2>
          <ul className="space-y-2.5">
            {ondeAtuar.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <span
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: cor }}
                  aria-hidden="true"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Habilidades desenvolvidas */}
        <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mb-5">
            <Zap className="w-5 h-5 text-[#168F6B]" aria-hidden="true" />
            Habilidades desenvolvidas
          </h2>
          <div className="flex flex-wrap gap-2">
            {habilidades.map((item: string, i: number) => (
              <span
                key={i}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border"
                style={{
                  backgroundColor: `${cor}12`,
                  color: cor,
                  borderColor: `${cor}30`,
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Interesse */}
        <InteresseButton cursoId={curso.id} cursoNome={curso.nome} />

        {/* Quiz */}
        {quizPerguntas.length > 0 ? (
          <Quiz
            perguntas={quizPerguntas}
            cursoId={curso.id}
            cursoNome={curso.nome}
          />
        ) : (
          <div className="bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-700/50 rounded-2xl p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Quiz não disponível para este curso no momento.
            </p>
          </div>
        )}

        {/* Back link */}
        {eixo && (
          <div className="pt-2">
            <Link
              href={`/eixo/${eixo.slug}`}
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Ver outros cursos de {eixo.nome}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
