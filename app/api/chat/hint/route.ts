import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { getChatSession, getChatMessages } from "@/lib/models";
import { getReplyHint } from "@/lib/openai";

const hintSchema = z.object({
  sessionId: z.string().min(1),
  language: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = hintSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { sessionId, language } = parsed.data;
  const session = await getChatSession(sessionId);

  if (!session) {
    return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 });
  }

  if (session.userId !== user.id) {
    return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
  }

  const messages = await getChatMessages(sessionId);
  const lastAssistantMsg = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");

  const hint = await getReplyHint(
    session.articleTitle,
    lastAssistantMsg?.content ?? "",
    language
  );

  return NextResponse.json({ hint });
}
