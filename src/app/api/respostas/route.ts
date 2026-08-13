import { NextResponse } from "next/server";
import { db } from "@/db";
import { respostasUsuario } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessaoId, cursoId, respostas } = body as {
      sessaoId: string;
      cursoId: string;
      respostas: {
        perguntaId: string;
        alternativaId: string;
        acertou: boolean;
      }[];
    };

    if (!sessaoId || !cursoId || !respostas || !Array.isArray(respostas)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Delete previous answers for this session and course
    await db
      .delete(respostasUsuario)
      .where(
        and(
          eq(respostasUsuario.sessaoId, sessaoId),
          eq(respostasUsuario.cursoId, cursoId)
        )
      );

    // Insert new answers
    await db.insert(respostasUsuario).values(
      respostas.map((r) => ({
        sessaoId,
        cursoId,
        perguntaId: r.perguntaId,
        alternativaId: r.alternativaId,
        acertou: r.acertou,
      }))
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving respostas:", error);
    return NextResponse.json({ error: "Failed to save respostas" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessaoId = searchParams.get("sessaoId");
    const cursoId = searchParams.get("cursoId");

    if (!sessaoId || !cursoId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const respostas = await db
      .select()
      .from(respostasUsuario)
      .where(
        and(
          eq(respostasUsuario.sessaoId, sessaoId),
          eq(respostasUsuario.cursoId, cursoId)
        )
      );

    return NextResponse.json(respostas);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch respostas" }, { status: 500 });
  }
}
