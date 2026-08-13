import { NextResponse } from "next/server";
import { db } from "@/db";
import { eixos, cursos } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allEixos = await db.select().from(eixos);
    const allCursos = await db.select().from(cursos);

    const result = allEixos.map((eixo: any) => ({
      ...eixo,
      cursos: allCursos.filter((c: any) => c.eixoId === eixo.id),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching eixos:", error);
    return NextResponse.json({ error: "Failed to fetch eixos" }, { status: 500 });
  }
}
