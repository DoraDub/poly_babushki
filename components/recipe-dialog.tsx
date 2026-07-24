"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChefHat, UtensilsCrossed, BookmarkPlus, Check, Loader as Loader2 } from "lucide-react";
import { toast } from "sonner";
import { findWordsInText } from "@/lib/dictionary";
import type { RecipeData, RecipeIngredient } from "@/lib/recipes";
import { saveLocalVocabularyItem } from "@/lib/local-vocabulary";
import type { VocabularyItem } from "@/lib/models";

interface RecipeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipe: RecipeData;
  language: string;
}

export function RecipeDialog({
  open,
  onOpenChange,
  recipe,
  language,
}: RecipeDialogProps) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [savingWords, setSavingWords] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());

  const foundWords = findWordsInText(recipe.instructions, language).filter(
    (e) => recipe.newWords.some((nw) => nw.word === e.word)
  );

  function handleSaveWord(
    word: string,
    translationRu: string,
    translationEn: string
  ) {
    setSavingWords((prev) => new Set([...prev, word]));
    const id = toast.loading("Сохраняем...");
    try {
      const item: VocabularyItem = {
        userId: "local",
        sk: `${language}#${word}`,
        word,
        language,
        translationRu,
        translationEn,
        articleTitle: recipe.title,
        createdAt: new Date().toISOString(),
      };
      saveLocalVocabularyItem(item);
      setSavedWords((prev) => new Set([...prev, word]));
      toast.success("Слово добавлено в словарь", { id });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка сохранения", { id });
    } finally {
      setSavingWords((prev) => {
        const next = new Set(prev);
        next.delete(word);
        return next;
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div className="rounded-full bg-amber-100 p-2">
              <ChefHat className="size-5 text-amber-700" />
            </div>
            <DialogTitle className="text-lg">
              {recipe.emoji} {recipe.title}
            </DialogTitle>
          </div>
          <DialogDescription>
            <span className="text-xs text-amber-700/70">{recipe.titleRu}</span>
          </DialogDescription>
        </DialogHeader>

        <p className="text-sm text-muted-foreground italic">
          {showTranslation ? recipe.descriptionRu : recipe.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-xs text-amber-600 hover:text-amber-700 self-start -mt-2"
        >
          {showTranslation ? "Показать на языке" : "Показать перевод"}
        </Button>

        <div className="border-t border-amber-200/50 pt-3">
          <h4 className="text-sm font-medium text-amber-900 mb-2 flex items-center gap-1.5">
            <UtensilsCrossed className="size-4" />
            Ainekset / Ингредиенты
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {recipe.ingredients.map((ing) => (
              <IngredientCard
                key={ing.name}
                ingredient={ing}
                showTranslation={showTranslation}
              />
            ))}
          </div>
        </div>

        <div className="border-t border-amber-200/50 pt-3">
          <h4 className="text-sm font-medium text-amber-900 mb-2">
            Valmistus / Приготовление
          </h4>
          <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
            {showTranslation ? recipe.instructionsRu : recipe.instructions}
          </p>
        </div>

        {foundWords.length > 0 && (
          <div className="border-t border-amber-200/50 pt-3">
            <h4 className="text-sm font-medium text-amber-900 mb-2">
              Uudet sanat / Новые слова
            </h4>
            <div className="flex flex-wrap gap-2">
              {recipe.newWords.map((nw) => {
                const isSaved = savedWords.has(nw.word);
                const isSaving = savingWords.has(nw.word);
                return (
                  <div
                    key={nw.word}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/70 border border-amber-200/50 text-sm"
                  >
                    <span className="font-medium text-amber-900 text-xs">
                      {nw.word}
                    </span>
                    <span className="text-[10px] text-amber-600/70">
                      — {nw.translationRu}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isSaved || isSaving}
                      onClick={() =>
                        handleSaveWord(
                          nw.word,
                          nw.translationRu,
                          nw.translationEn
                        )
                      }
                      className="size-5 ml-0.5"
                    >
                      {isSaving ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : isSaved ? (
                        <Check className="size-3 text-green-600" />
                      ) : (
                        <BookmarkPlus className="size-3" />
                      )}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function IngredientCard({
  ingredient,
  showTranslation,
}: {
  ingredient: RecipeIngredient;
  showTranslation: boolean;
}) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50/70 border border-amber-100/60 hover:bg-amber-50 transition-colors">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-amber-900 truncate">
          {ingredient.name}
        </p>
        <p className="text-[10px] text-muted-foreground truncate">
          {showTranslation
            ? `${ingredient.translationRu} / ${ingredient.translationEn}`
            : `${ingredient.translationRu}`}
        </p>
      </div>
      {ingredient.amount && (
        <span className="text-[10px] font-medium text-amber-600 shrink-0">
          {ingredient.amount}
        </span>
      )}
    </div>
  );
}
