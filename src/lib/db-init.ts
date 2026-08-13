import { db } from "@/db";
import { eixos, cursos, perguntas, alternativas } from "@/db/schema";
import { eixosData, cursosData, quizData } from "./seed-data";

const globalForSeed = globalThis as typeof globalThis & {
  __tecEduSeedPromise?: Promise<boolean>;
};

export async function seedDatabase() {
  const existing = await db.select().from(eixos).limit(1);
  if (existing.length > 0) {
    return false;
  }

  const insertedEixos = await db.insert(eixos).values(eixosData).returning();

  for (const cursoData of cursosData) {
    const eixo = insertedEixos.find((e: any) => e.slug === cursoData.eixoSlug);
    if (!eixo) continue;

    const [insertedCurso] = await db
      .insert(cursos)
      .values({
        eixoId: eixo.id,
        slug: cursoData.slug,
        nome: cursoData.nome,
        descricao: cursoData.descricao,
        oQueAprender: cursoData.oQueAprender,
        ondeAtuar: cursoData.ondeAtuar,
        habilidades: cursoData.habilidades,
      })
      .returning();

    const quizPerguntas = quizData[cursoData.slug];
    if (quizPerguntas && insertedCurso) {
      for (let i = 0; i < quizPerguntas.length; i++) {
        const perguntaData = quizPerguntas[i];
        const [insertedPergunta] = await db
          .insert(perguntas)
          .values({
            cursoId: insertedCurso.id,
            enunciado: perguntaData.enunciado,
            ordem: i + 1,
          })
          .returning();

        await db.insert(alternativas).values(
          perguntaData.alternativas.map((alt: any) => ({
            perguntaId: insertedPergunta.id,
            texto: alt.texto,
            correta: alt.correta,
          }))
        );
      }
    }
  }

  return true;
}

export async function ensureSeeded() {
  try {
    const current = await db.select().from(eixos).limit(1);
    if (current.length > 0) {
      return false;
    }

    if (!globalForSeed.__tecEduSeedPromise) {
      globalForSeed.__tecEduSeedPromise = seedDatabase();
    }

    await globalForSeed.__tecEduSeedPromise;
    return true;
  } catch (error) {
    console.error("❌ Database seed error:", error);
    return false;
  } finally {
    if (globalForSeed.__tecEduSeedPromise) {
      globalForSeed.__tecEduSeedPromise = undefined;
    }
  }
}

export async function initDb() {
  return ensureSeeded();
}
