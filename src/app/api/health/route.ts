import { NextResponse } from "next/server";
import { db } from "@/db";
import { eixos } from "@/db/schema";

export async function GET() {
  try {
    await db.select().from(eixos).limit(1);
    return NextResponse.json({ status: "ok", database: "connected" });
  } catch (error) {
    return NextResponse.json(
      { status: "ok", database: "disconnected", error: String(error) },
      { status: 200 }
    );
  }
}
