"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Bookmark, Trash2, Loader as Loader2, BookOpen, ArrowLeft, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LANGUAGES, getDefaultLanguage } from "@/lib/config";
import {
  getLocalVocabulary,
  removeLocalVocabularyItem,
} from "@/lib/local-vocabulary";
import type { VocabularyItem } from "@/lib/models";

export function VocabularyPage({
  initialLanguage,
}: {
  initialLanguage?: string;
}) {
  const [items, setItems] = useState<VocabularyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState(
    initialLanguage ?? getDefaultLanguage().code
  );

  const fetchVocabulary = useCallback(() => {
    setLoading(true);
    try {
      const data = getLocalVocabulary(activeLanguage);
      setItems(data);
    } catch {
      toast.error("Не удалось загрузить словарь");
    } finally {
      setLoading(false);
    }
  }, [activeLanguage]);

  useEffect(() => {
    fetchVocabulary();
  }, [fetchVocabulary]);

  function handleDelete(word: string) {
    setDeleting(word);
    try {
      removeLocalVocabularyItem(activeLanguage, word);
      setItems((prev) => prev.filter((item) => item.word !== word));
      toast.success("Слово удалено");
    } catch {
      toast.error("Не удалось удалить слово");
    } finally {
      setDeleting(null);
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
          <BookOpen className="size-5 text-amber-700" />
        </div>
        <div>
          <h1 className="text-xl font-serif font-bold text-amber-950">
            Sanasto
          </h1>
          <p className="text-xs text-muted-foreground">
            {items.length} sanaa
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

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16 text-muted-foreground">
          <div className="rounded-full bg-amber-100/50 p-5">
            <Bookmark className="size-8 text-amber-400" />
          </div>
          <p className="font-serif text-sm italic">Sanasto on tyhjä</p>
          <p className="text-xs text-muted-foreground">
            Lisää sanoja lukemalla uutisia
          </p>
          <Link href="/">
            <Button variant="outline" size="sm">
              Lue uutisia
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={`${item.language}#${item.word}`}
              className="flex items-start gap-3 p-3 rounded-lg border border-amber-200/40 bg-amber-50/50 hover:bg-amber-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-amber-900 text-sm">
                    {item.word}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    — {item.translationRu}
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground/60">
                  {item.translationEn}
                </span>
                {item.articleTitle && (
                  <div className="mt-1">
                    {item.articleUrl ? (
                      <a
                        href={item.articleUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[10px] text-amber-600/70 hover:text-amber-700 transition-colors"
                      >
                        <ExternalLink className="size-2.5" />
                        {item.articleTitle}
                      </a>
                    ) : (
                      <span className="text-[10px] text-amber-600/50">
                        {item.articleTitle}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                disabled={deleting === `${item.language}#${item.word}`}
                onClick={() => handleDelete(item.word)}
                className="size-7 shrink-0 text-muted-foreground hover:text-red-600 hover:bg-red-50"
              >
                {deleting === `${item.language}#${item.word}` ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Trash2 className="size-3.5" />
                )}
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
