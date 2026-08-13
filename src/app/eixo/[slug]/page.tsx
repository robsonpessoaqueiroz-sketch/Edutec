import { db } from "@/db";
import { eixos, cursos } from "@/db/schema";
import { ensureSeeded } from "@/lib/db-init";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import type { Curso } from "@/types";
import EixoIcon from "@/components/EixoIcon";
import CursoCard from "@/components/CursoCard";
import { ArrowLeft, BookOpen } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    await ensureSeeded();
    const all = await db.select().from(eixos);
    const eixo = all.find((e: any) => e.slug === slug);
    if (!eixo) return { title: "Eixo não encontrado" };
    return {
      title: `${eixo.nome} — Cursos Técnicos 2027 EEEP Maria Célia`,
      description: eixo.descricao,
    };
  } catch {
    return { title: "Eixo" };
  }
}

export default async function EixoPage({ params }: PageProps) {
  const { slug } = await params;

  let eixo: any;
  let cursosDoEixo: Curso[] = [];

  try {
    await ensureSeeded();
    const allEixos = await db.select().from(eixos);
    const found = allEixos.find((e: any) => e.slug === slug);
    if (!found) notFound();
    eixo = found;

    const allCursos = await db.select().from(cursos);
    cursosDoEixo = allCursos.filter((c: any) => c.eixoId === found.id) as Curso[];
  } catch {
    notFound();
  }

  if (!eixo) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{ background: `radial-gradient(ellipse at top left, ${eixo.cor}, transparent 70%)` }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Navegação estrutural" className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-[#168F6B] dark:hover:text-[#168F6B] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] rounded"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Voltar para início
            </Link>
          </nav>

          <div className="flex items-start gap-5">
            <EixoIcon icone={eixo.icone} cor={eixo.cor} size="lg" />
            <div>
              <p className="text-sm font-semibold text-[#168F6B] mb-1 uppercase tracking-wide">
                Eixo de Formação
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {eixo.nome}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                {eixo.descricao}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="mb-6 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#168F6B]" aria-hidden="true" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Cursos disponíveis
          </h2>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-bold bg-[#168F6B]/10 text-[#168F6B]">
            {cursosDoEixo.length}
          </span>
        </div>

        {cursosDoEixo.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum curso encontrado para este eixo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cursosDoEixo.map((curso) => (
              <CursoCard key={curso.id} curso={curso} eixo={eixo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
