import { NextResponse } from "next/server";
import { db } from "@/db";
import { cursos, eixos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const [curso] = await db.select().from(cursos).where(eq(cursos.slug, slug));

    if (!curso) {
      return NextResponse.json({ error: "Curso not found" }, { status: 404 });
    }

    let eixo = null;
    if (curso.eixoId) {
      const [found] = await db
        .select()
        .from(eixos)
        .where(eq(eixos.id, curso.eixoId));
      eixo = found || null;
    }

    return NextResponse.json({ ...curso, eixo });
  } catch (error) {
    console.error("Error fetching curso:", error);
    return NextResponse.json({ error: "Failed to fetch curso" }, { status: 500 });
  }
}
