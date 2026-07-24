import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import {
  createChatSession,
  getChatSession,
  getChatSessionByArticle,
  getChatMessages,
  addChatMessage,
  getUserProfile,
  getUserStreak,
} from "@/lib/models";
import { getBabushkaOpening, getBabushkaReply } from "@/lib/openai";
import { mockChatMessages } from "@/lib/mock-data";

const startChatSchema = z.object({
  articleUrl: z.string().min(1),
  articleTitle: z.string().min(1),
  articleContent: z.string().optional().default(""),
  language: z.string().optional(),
});

const continueChatSchema = z.object({
  sessionId: z.string().min(1),
  message: z.string().min(1).max(2000),
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

  const body = await request.json();
  const dbAvailable = await isDatabaseAvailable();

  if (body.sessionId) {
    const parsed = continueChatSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Некорректные данные", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { sessionId, message, language } = parsed.data;
    const session = await getChatSession(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 });
    }

    if (session.userId !== user.id) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    const userMsg = await addChatMessage({
      sessionId,
      role: "user",
      content: message,
    });

    const history = await getChatMessages(sessionId);

    const streak = await getUserStreak(user.id);
    const currentStreak = streak?.currentStreak ?? 0;

    const profile = await getUserProfile(user.id);

    const reply = await getBabushkaReply(
      session.articleTitle,
      "",
      message,
      history,
      language,
      currentStreak,
      profile?.name,
      profile?.gender
    );

    const assistantMsg = await addChatMessage({
      sessionId,
      role: "assistant",
      content: reply.content,
      translationRu: reply.translationRu,
      translationEn: reply.translationEn,
    });

    return NextResponse.json({
      sessionId,
      messages: [...history, userMsg, assistantMsg],
    });
  }

  const parsed = startChatSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { articleUrl, articleTitle, articleContent, language } = parsed.data;

  if (!dbAvailable) {
    return NextResponse.json({
      sessionId: "mock-session-1",
      messages: mockChatMessages.slice(0, 1),
    });
  }

  const existing = await getChatSessionByArticle(user.id, articleUrl);
  if (existing) {
    const messages = await getChatMessages(existing.sessionId);
    return NextResponse.json({ sessionId: existing.sessionId, messages });
  }

  const session = await createChatSession(user.id, articleUrl, articleTitle);

  const streak = await getUserStreak(user.id);
  const currentStreak = streak?.currentStreak ?? 0;

  const profile = await getUserProfile(user.id);

  const opening = await getBabushkaOpening(
    articleTitle,
    articleContent,
    language,
    currentStreak,
    profile?.name,
    profile?.gender
  );

  const assistantMsg = await addChatMessage({
    sessionId: session.sessionId,
    role: "assistant",
    content: opening.content,
    translationRu: opening.translationRu,
    translationEn: opening.translationEn,
  });

  return NextResponse.json(
    { sessionId: session.sessionId, messages: [assistantMsg] },
    { status: 201 }
  );
}

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const articleUrl = request.nextUrl.searchParams.get("articleUrl");
  const dbAvailable = await isDatabaseAvailable();

  if (sessionId) {
    const session = await getChatSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 });
    }
    if (session.userId !== user.id) {
      return NextResponse.json({ error: "Доступ запрещён" }, { status: 403 });
    }

    if (!dbAvailable) {
      return NextResponse.json({
        sessionId,
        messages: mockChatMessages,
      });
    }

    const messages = await getChatMessages(sessionId);
    return NextResponse.json({ sessionId, messages });
  }

  if (articleUrl) {
    if (!dbAvailable) {
      return NextResponse.json({
        sessionId: "mock-session-1",
        messages: mockChatMessages,
      });
    }

    const session = await getChatSessionByArticle(user.id, articleUrl);
    if (!session) {
      return NextResponse.json({ sessionId: null, messages: [] });
    }

    const messages = await getChatMessages(session.sessionId);
    return NextResponse.json({ sessionId: session.sessionId, messages });
  }

  return NextResponse.json(
    { error: "Параметр sessionId или articleUrl обязателен" },
    { status: 400 }
  );
}
