"use client";

import { useState, useCallback } from "react";
import { BookmarkPlus, Check, Loader as Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { findWordsInText } from "@/lib/dictionary";
import type { DictionaryEntry } from "@/lib/dictionary";
import { incrementLocalStreak } from "@/lib/local-streak";
import { saveLocalVocabularyItem } from "@/lib/local-vocabulary";
import type { VocabularyItem } from "@/lib/models";

interface HighlightedWord {
  entry: DictionaryEntry;
  start: number;
  end: number;
}

interface WordHighlighterProps {
  text: string;
  language: string;
  savedWords?: Set<string>;
  articleUrl?: string;
  articleTitle?: string;
}

export function WordHighlighter({
  text,
  language,
  savedWords = new Set(),
  articleUrl,
  articleTitle,
}: WordHighlighterProps) {
  const [savingWord, setSavingWord] = useState<string | null>(null);
  const [localSaved, setLocalSaved] = useState<Set<string>>(savedWords);

  const highlightedWords = useCallback(() => {
    const entries = findWordsInText(text, language);
    const result: HighlightedWord[] = [];
    const lowerText = text.toLowerCase();

    for (const entry of entries) {
      let searchFrom = 0;
      while (true) {
        const idx = lowerText.indexOf(entry.word.toLowerCase(), searchFrom);
        if (idx === -1) break;
        result.push({ entry, start: idx, end: idx + entry.word.length });
        searchFrom = idx + entry.word.length;
      }
    }

    result.sort((a, b) => a.start - b.start);

    const merged: HighlightedWord[] = [];
    for (const hw of result) {
      const prev = merged[merged.length - 1];
      if (prev && prev.entry.word === hw.entry.word) continue;
      merged.push(hw);
    }

    return merged;
  }, [text, language]);

  const words = highlightedWords();
  const allSaved = new Set([...savedWords, ...localSaved]);

  if (words.length === 0) return null;

  function handleSave(entry: DictionaryEntry) {
    setSavingWord(entry.word);
    const id = toast.loading("Сохраняем...");
    try {
      const item: VocabularyItem = {
        userId: "local",
        sk: `${language}#${entry.word}`,
        word: entry.word,
        language,
        translationRu: entry.translationRu,
        translationEn: entry.translationEn,
        articleUrl,
        articleTitle,
        createdAt: new Date().toISOString(),
      };
      saveLocalVocabularyItem(item);
      setLocalSaved((prev) => new Set([...prev, entry.word]));
      toast.success("Слово добавлено в словарь", { id });
      incrementLocalStreak();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка сохранения", { id });
    } finally {
      setSavingWord(null);
    }
  }

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {words.map((hw, i) => {
        const isSaved = allSaved.has(hw.entry.word);
        const isSaving = savingWord === hw.entry.word;

        return (
          <div
            key={`${hw.entry.word}-${i}`}
            className="group relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-100/70 border border-amber-200/50 text-sm hover:bg-amber-100 transition-colors"
          >
            <span className="font-medium text-amber-900 text-xs">
              {hw.entry.word}
            </span>
            <span className="text-[10px] text-amber-600/70">
              — {hw.entry.translationRu}
            </span>
            <Button
              variant="ghost"
              size="icon"
              disabled={isSaved || isSaving}
              onClick={() => handleSave(hw.entry)}
              className="size-5 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
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
  );
}
