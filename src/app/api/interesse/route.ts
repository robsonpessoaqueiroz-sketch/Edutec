import { NextResponse } from "next/server";
import { db } from "@/db";
import { interesseUsuario } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessaoId, cursoId, status } = body as {
      sessaoId: string;
      cursoId: string;
      status: "quero" | "talvez" | "nao_quero";
    };

    if (!sessaoId || !cursoId || !status) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (!["quero", "talvez", "nao_quero"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Upsert using delete + insert
    await db
      .delete(interesseUsuario)
      .where(
        and(
          eq(interesseUsuario.sessaoId, sessaoId),
          eq(interesseUsuario.cursoId, cursoId)
        )
      );

    const [result] = await db
      .insert(interesseUsuario)
      .values({ sessaoId, cursoId, status })
      .returning();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error saving interesse:", error);
    return NextResponse.json({ error: "Failed to save interesse" }, { status: 500 });
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

    // O 'db' em memória oferece suporte limitado ao where(), então buscamos
    // todos os registros e filtramos em JS para compatibilidade.
    const all = await db.select().from(interesseUsuario);
    const interesse = all.find((i: any) => i.sessaoId === sessaoId && i.cursoId === cursoId) || null;

    return NextResponse.json(interesse);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch interesse" }, { status: 500 });
  }
}
