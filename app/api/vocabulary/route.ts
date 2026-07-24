import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getVocabulary,
  addVocabularyItem,
  deleteVocabularyItem,
} from "@/lib/models";
import { mockVocabulary } from "@/lib/mock-data";

const addWordSchema = z.object({
  word: z.string().min(1).max(200),
  language: z.string().min(1).max(10),
  translationRu: z.string().min(1).max(500),
  translationEn: z.string().min(1).max(500),
  articleUrl: z.string().url().optional(),
  articleTitle: z.string().max(300).optional(),
});

export async function GET(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const language = request.nextUrl.searchParams.get("language") ?? undefined;

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const userMock = language
      ? mockVocabulary.filter(
          (v) => v.userId === user.id && v.language === language
        )
      : mockVocabulary.filter((v) => v.userId === user.id);
    return NextResponse.json(userMock.length > 0 ? userMock : mockVocabulary);
  }

  const items = await getVocabulary(user.id, language);
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = addWordSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  try {
    const item = await addVocabularyItem({
      userId: user.id,
      sk: `${parsed.data.language}#${parsed.data.word}`,
      language: parsed.data.language,
      word: parsed.data.word,
      translationRu: parsed.data.translationRu,
      translationEn: parsed.data.translationEn,
      articleUrl: parsed.data.articleUrl,
      articleTitle: parsed.data.articleTitle,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message === "DUPLICATE_WORD") {
      return NextResponse.json(
        { error: "Слово уже добавлено для этого языка", duplicate: true },
        { status: 409 }
      );
    }
    throw e;
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const word = request.nextUrl.searchParams.get("word");
  const language = request.nextUrl.searchParams.get("language");

  if (!word || !language) {
    return NextResponse.json(
      { error: "Параметры word и language обязательны" },
      { status: 400 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  await deleteVocabularyItem(user.id, language, word);
  return NextResponse.json({ success: true });
}
