import { NextResponse } from "next/server";
import { db } from "@/db";
import { eixos, cursos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [eixo] = await db.select().from(eixos).where(eq(eixos.slug, slug));

    if (!eixo) {
      return NextResponse.json({ error: "Eixo not found" }, { status: 404 });
    }

    const cursosDoEixo = await db
      .select()
      .from(cursos)
      .where(eq(cursos.eixoId, eixo.id));

    return NextResponse.json({ ...eixo, cursos: cursosDoEixo });
  } catch (error) {
    console.error("Error fetching eixo:", error);
    return NextResponse.json({ error: "Failed to fetch eixo" }, { status: 500 });
  }
}
