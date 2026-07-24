import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import { getUserRecipes, addUserRecipe } from "@/lib/models";
import { getNextRecipe } from "@/lib/recipes";
import { mockUserRecipes } from "@/lib/mock-data";

const unlockRecipeSchema = z.object({
  language: z.string().min(1).max(10),
});

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(mockUserRecipes);
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(mockUserRecipes);
  }

  const recipes = await getUserRecipes(user.id);
  return NextResponse.json(recipes);
}

export async function POST(request: NextRequest) {
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

  const parsed = unlockRecipeSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { language } = parsed.data;

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const existingRecipes = await getUserRecipes(user.id);
  const existingIds = existingRecipes.map((r) => r.recipeId);

  const nextRecipe = getNextRecipe(language, existingIds);
  if (!nextRecipe) {
    return NextResponse.json(
      { error: "Нет рецептов для этого языка" },
      { status: 404 }
    );
  }

  if (existingIds.includes(nextRecipe.recipeId)) {
    return NextResponse.json(
      { error: "Рецепт уже разблокирован", recipeId: nextRecipe.recipeId },
      { status: 409 }
    );
  }

  const saved = await addUserRecipe({
    userId: user.id,
    recipeId: nextRecipe.recipeId,
    language: nextRecipe.language,
    title: nextRecipe.title,
    titleRu: nextRecipe.titleRu,
    emoji: nextRecipe.emoji,
  });

  return NextResponse.json({
    ...saved,
    recipeData: nextRecipe,
  });
}
