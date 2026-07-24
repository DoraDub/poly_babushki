import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { translateText } from "@/lib/openai";

const translateSchema = z.object({
  text: z.string().min(1).max(5000),
  language: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const parsed = translateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const translation = await translateText(
    parsed.data.text,
    parsed.data.language
  );
  return NextResponse.json(translation);
}
