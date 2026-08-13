import { NextResponse } from "next/server";
import { db } from "@/db";
import { cursos, perguntas, alternativas } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ cursoSlug: string }> }
) {
  try {
    const { cursoSlug } = await params;
    const [curso] = await db
      .select()
      .from(cursos)
      .where(eq(cursos.slug, cursoSlug));

    if (!curso) {
      return NextResponse.json({ error: "Curso not found" }, { status: 404 });
    }

    const allPerguntas = await db
      .select()
      .from(perguntas)
      .where(eq(perguntas.cursoId, curso.id))
      .orderBy(perguntas.ordem);

    const result = await Promise.all(
      allPerguntas.map(async (p: any) => {
        const alts = await db
          .select()
          .from(alternativas)
          .where(eq(alternativas.perguntaId, p.id));
        return { ...p, alternativas: alts };
      })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    return NextResponse.json({ error: "Failed to fetch quiz" }, { status: 500 });
  }
}
