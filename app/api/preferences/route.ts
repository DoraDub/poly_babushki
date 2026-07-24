import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { mockUserPreferences } from "@/lib/mock-data";
import { getDefaultLanguage } from "@/lib/config";
import { CATEGORIES, type CategoryId } from "@/lib/constants";
import { putUserPreferences } from "@/lib/models";
import { isDatabaseAvailable } from "@/lib/db";

const categoryIds = CATEGORIES.map((c) => c.id) as [
  CategoryId,
  ...CategoryId[],
];

const updateSchema = z.object({
  language: z.string().min(1).max(10),
  categories: z.array(z.enum(categoryIds)),
});

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(mockUserPreferences);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("user_preferences")
    .select("language, categories, updated_at")
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    const defaultLang = getDefaultLanguage();
    return NextResponse.json({
      userId: user.id,
      language: defaultLang.code,
      categories: [],
      updatedAt: new Date().toISOString(),
    });
  }

  return NextResponse.json({
    userId: user.id,
    language: data.language,
    categories: data.categories as CategoryId[],
    updatedAt: data.updated_at,
  });
}

export async function PUT(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Сервис недоступен" }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { language, categories } = parsed.data;

  const { error } = await supabase.from("user_preferences").upsert(
    {
      user_id: user.id,
      language,
      categories,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    return NextResponse.json(
      { error: "Ошибка сохранения в Supabase" },
      { status: 500 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();
  if (dbAvailable) {
    try {
      await putUserPreferences(user.id, language, categories);
    } catch {
      // DynamoDB save is a secondary store; don't fail the request
    }
  }

  return NextResponse.json({
    userId: user.id,
    language,
    categories,
    updatedAt: new Date().toISOString(),
  });
}
