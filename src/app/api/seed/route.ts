import { NextResponse } from "next/server";
import { db } from "@/db";
import { eixos, cursos, perguntas, alternativas } from "@/db/schema";
import { eixosData, cursosData, quizData } from "@/lib/seed-data";
import { eq } from "drizzle-orm";

export async function POST() {
  try {
    // Clear existing data in reverse order
    await db.delete(alternativas);
    await db.delete(perguntas);
    await db.delete(cursos);
    await db.delete(eixos);

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

      // Insert quiz questions for this course
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

    return NextResponse.json({ success: true, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const eixosCount = await db.select().from(eixos);
    const cursosCount = await db.select().from(cursos);
    return NextResponse.json({
      eixos: eixosCount.length,
      cursos: cursosCount.length,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
