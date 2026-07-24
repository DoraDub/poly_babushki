"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChefHat, ArrowLeft, Loader as Loader2, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LANGUAGES, getDefaultLanguage } from "@/lib/config";
import { RecipeDialog } from "@/components/recipe-dialog";
import { getRecipesByLanguage } from "@/lib/recipes";
import type { RecipeData } from "@/lib/recipes";

interface RecipeItem {
  userId: string;
  recipeId: string;
  language: string;
  title: string;
  titleRu: string;
  emoji: string;
  unlockedAt: string;
}

export function RecipeCollection({
  initialLanguage,
}: {
  initialLanguage?: string;
}) {
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLanguage, setActiveLanguage] = useState(
    initialLanguage ?? getDefaultLanguage().code
  );
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/recipes");
      if (!res.ok) {
        if (res.status === 401) {
          setLoading(false);
          return;
        }
        throw new Error("Ошибка загрузки");
      }
      const data = await res.json();
      setRecipes(data);
    } catch {
      toast.error("Не удалось загрузить рецепты");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const langRecipes = recipes.filter((r) => r.language === activeLanguage);

  function handleOpenRecipe(recipeId: string) {
    const recipeData = getRecipesByLanguage(activeLanguage).find(
      (r) => r.recipeId === recipeId
    );
    if (recipeData) {
      setSelectedRecipe(recipeData);
      setDialogOpen(true);
    }
  }

  const currentLang = LANGUAGES.find((l) => l.code === activeLanguage);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="size-6 animate-spin text-amber-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Kotiin
        </Link>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-amber-100 p-2.5">
          <ChefHat className="size-5 text-amber-700" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-amber-950">
            Reseptit
          </h1>
          <p className="text-xs text-muted-foreground">
            {recipes.length} reseptiä
            {currentLang
              ? ` — ${currentLang.flag} ${currentLang.nativeName}`
              : ""}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {LANGUAGES.map((lang) => (
          <Button
            key={lang.code}
            variant={activeLanguage === lang.code ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLanguage(lang.code)}
            className="gap-1.5"
          >
            <span>{lang.flag}</span>
            <span className="text-xs">{lang.nativeName}</span>
          </Button>
        ))}
      </div>

      {langRecipes.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground">
          <div className="rounded-full bg-amber-100/50 p-5">
            <Bookmark className="size-8 text-amber-400" />
          </div>
          <p className="font-serif text-sm italic">Ei reseptejä vielä</p>
          <p className="text-xs text-muted-foreground">
            Lue 5 uutista saadaksesi ensimmäisen reseptin
          </p>
          <Link href="/">
            <Button variant="outline" size="sm">
              Lue uutisia
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {langRecipes.map((recipe) => (
            <button
              key={recipe.recipeId}
              onClick={() => handleOpenRecipe(recipe.recipeId)}
              className="text-left group p-4 rounded-xl border border-amber-200/40 bg-amber-50/50 hover:bg-amber-50 hover:border-amber-300/60 transition-all cursor-pointer"
            >
              <div className="text-2xl mb-2">{recipe.emoji}</div>
              <h3 className="text-sm font-semibold text-amber-950">
                {recipe.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {recipe.titleRu}
              </p>
              <p className="text-[10px] text-amber-600/50 mt-2">
                {new Date(recipe.unlockedAt).toLocaleDateString("ru-RU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </button>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <RecipeDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          recipe={selectedRecipe}
          language={activeLanguage}
        />
      )}
    </div>
  );
}
