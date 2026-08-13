import { db } from "@/db";
import { eixos, cursos, perguntas, alternativas } from "@/db/schema";
import { eixosData, cursosData, quizData } from "./seed-data";
import { sql } from "drizzle-orm";

export async function initDb() {
  try {
    // Check if data already exists
    const existing = await db.select().from(eixos).limit(1);
    if (existing.length > 0) {
      return; // Already seeded
    }

    // Insert eixos
    const insertedEixos = await db.insert(eixos).values(eixosData).returning();

    // Insert cursos
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
      if (quizPerguntas) {
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

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Database seed error:", error);
  }
}
