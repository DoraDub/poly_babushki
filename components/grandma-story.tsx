"use client";

import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { getRandomStory } from "@/lib/stories";

const STORAGE_KEY = "suomikoti_story_date";
const SHOW_PROBABILITY = 0.15;

function wasStoryShownToday(): boolean {
  try {
    const lastDate = localStorage.getItem(STORAGE_KEY);
    if (!lastDate) return false;
    const today = new Date().toISOString().split("T")[0];
    return lastDate === today;
  } catch {
    return false;
  }
}

function markStoryShownToday(): void {
  try {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(STORAGE_KEY, today);
  } catch {
    /**/
  }
}

interface GrandmaStoryProps {
  language?: string;
}

export function GrandmaStory({ language = "fi" }: GrandmaStoryProps) {
  const [story] = useState<{
    text: string;
    translationRu: string;
  } | null>(() => {
    if (wasStoryShownToday()) return null;
    const roll = Math.random();
    if (roll >= SHOW_PROBABILITY) return null;
    const picked = getRandomStory(language);
    if (!picked) return null;
    markStoryShownToday();
    return picked;
  });
  const [showTranslation, setShowTranslation] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (!story || dismissed) return null;

  return (
    <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Speech bubble tail */}
      <div className="absolute -bottom-2 left-12 w-4 h-4 bg-amber-100 dark:bg-amber-900 rotate-45 border-r border-b border-amber-200 dark:border-amber-700" />

      <div className="bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700 rounded-2xl rounded-bl-md px-5 py-4 max-w-xs shadow-lg">
        {/* Close button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute -top-2 -right-2 rounded-full bg-background border border-border size-5 flex items-center justify-center hover:bg-accent transition-colors"
        >
          <X className="size-3" />
        </button>

        {/* Grandma intro */}
        <div className="flex items-center gap-1.5 mb-2 text-amber-700 dark:text-amber-400">
          <MessageCircle className="size-3.5" />
          <span className="text-xs font-medium">Mummo kertoo</span>
        </div>

        {/* Story text */}
        <p className="text-sm text-foreground leading-relaxed mb-2">
          {story.text}
        </p>

        {/* Translation toggle */}
        <button
          type="button"
          onClick={() => setShowTranslation((v) => !v)}
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {showTranslation ? "Скрыть перевод" : "Показать перевод"}
        </button>

        {showTranslation && (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed border-t border-amber-200 dark:border-amber-800 pt-2 animate-in fade-in duration-300">
            {story.translationRu}
          </p>
        )}
      </div>
    </div>
  );
}
