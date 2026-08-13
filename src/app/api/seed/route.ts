import { NextResponse } from "next/server";
import { db } from "@/db";
import { eixos, cursos } from "@/db/schema";
import { seedDatabase } from "@/lib/db-init";

export async function POST() {
  try {
    await db.delete(cursos);
    await db.delete(eixos);

    await seedDatabase();

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
