import { db } from "@/db";
import { eixos, cursos } from "@/db/schema";
import { ensureSeeded } from "@/lib/db-init";
import type { Eixo, Curso } from "@/types";
import EixoCard from "@/components/EixoCard";
import { Sparkles, ChevronRight, GraduationCap, Calendar } from "lucide-react";
import Link from "next/link";

async function getEixosComCursos(): Promise<Eixo[]> {
  try {
    await ensureSeeded();
    const allEixos = await db.select().from(eixos);
    const allCursos = await db.select().from(cursos);

    return allEixos.map((eixo: any) => ({
      ...eixo,
      cursos: allCursos.filter((c: any) => c.eixoId === eixo.id) as Curso[],
    }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const eixosData = await getEixosComCursos();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#168F6B]/10 via-transparent to-transparent dark:from-[#168F6B]/5 dark:via-transparent dark:to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-[#168F6B]/5 blur-3xl" />
          <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-blue-500/5 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#168F6B]/10 border border-[#168F6B]/20 text-[#168F6B] text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Novidades chegando em 2027</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
              Conheça os novos{" "}
              <span className="text-[#168F6B]">Cursos Técnicos</span>{" "}
              da EEEP Maria Célia
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              A <strong className="text-gray-800 dark:text-gray-200">EEEP Professora Maria Célia Pinheiro Falcão</strong> está
              expandindo sua oferta de cursos técnicos a partir de 2027. Explore os eixos,
              conheça cada curso e descubra qual combina mais com você através do nosso quiz vocacional.
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                <GraduationCap className="w-4 h-4 text-[#168F6B]" aria-hidden="true" />
                4 cursos técnicos
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                <Sparkles className="w-4 h-4 text-[#168F6B]" aria-hidden="true" />
                3 eixos de formação
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                <Calendar className="w-4 h-4 text-[#168F6B]" aria-hidden="true" />
                A partir de 2027
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#eixos"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#168F6B] text-white font-semibold rounded-xl hover:bg-[#127558] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#168F6B] focus-visible:ring-offset-2"
              >
                Explorar cursos
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Eixos Section */}
      <section id="eixos" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Eixos de Formação
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Os cursos estão organizados em 3 eixos. Clique em um eixo para ver seus cursos.
          </p>
        </div>

        {eixosData.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-8 h-8 text-gray-400" aria-hidden="true" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Os dados ainda estão sendo carregados.
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Se você é administrador, acesse{" "}
              <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">
                /api/seed
              </code>{" "}
              para popular o banco de dados.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop: Grid 3 columns */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {eixosData.map((eixo) => (
                <EixoCard key={eixo.id} eixo={eixo} />
              ))}
            </div>

            {/* Mobile/Tablet: Horizontal scroll */}
            <div className="lg:hidden">
              <div
                className="flex gap-4 overflow-x-auto pb-4 scroll-container"
                style={{ scrollSnapType: "x mandatory" }}
                role="list"
                aria-label="Lista de eixos de formação"
              >
                {eixosData.map((eixo) => (
                  <div
                    key={eixo.id}
                    style={{ scrollSnapAlign: "start" }}
                    role="listitem"
                  >
                    <EixoCard eixo={eixo} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
                ← Deslize para ver mais →
              </p>
            </div>
          </>
        )}
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-[#168F6B] to-[#0e6b50] rounded-2xl p-8 sm:p-12 text-center text-white">
          <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-90" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Como funciona o Quiz Vocacional?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto leading-relaxed">
            Acesse a página de cada curso e responda 10 perguntas para descobrir se
            suas expectativas se alinham com o que o curso realmente ensina. Ao final,
            veja seus acertos e marque seu nível de interesse.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {["Escolha um eixo", "Selecione um curso", "Responda 10 perguntas", "Veja seu resultado"].map(
              (step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-white/90">{step}</span>
                  {i < 3 && (
                    <ChevronRight className="w-4 h-4 text-white/50" aria-hidden="true" />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
