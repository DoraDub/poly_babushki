"use client";

import { useState, useEffect, useCallback } from "react";
import { Moon, BookHeart, Sparkles, Volume2, History } from "lucide-react";
import {
  getRandomNightDream,
  getRandomNightWhisper,
  getNightStories,
} from "@/lib/night-mode-data";
import { getLocalStreak } from "@/lib/local-streak";
import { getLanguageByCode } from "@/lib/config";
import { Skeleton } from "@/components/ui/skeleton";

type NightSection = "dreams" | "words" | "stories";

const SOFT_WORDS: Record<
  string,
  { word: string; translationRu: string; translationEn: string }[]
> = {
  fi: [
    { word: "koti", translationRu: "дом", translationEn: "home" },
    { word: "perhe", translationRu: "семья", translationEn: "family" },
    { word: "rakkaus", translationRu: "любовь", translationEn: "love" },
    { word: "rauha", translationRu: "покой", translationEn: "peace" },
    { word: "uni", translationRu: "сон", translationEn: "dream/sleep" },
    { word: "tähti", translationRu: "звезда", translationEn: "star" },
    { word: "kuu", translationRu: "луна", translationEn: "moon" },
    { word: "lämmin", translationRu: "тёплый", translationEn: "warm" },
    { word: "hiljainen", translationRu: "тихий", translationEn: "quiet" },
    { word: "kaunis", translationRu: "красивый", translationEn: "beautiful" },
    { word: "muisto", translationRu: "воспоминание", translationEn: "memory" },
    { word: "toivo", translationRu: "надежда", translationEn: "hope" },
  ],
  sr: [
    { word: "kuća", translationRu: "дом", translationEn: "home" },
    { word: "porodica", translationRu: "семья", translationEn: "family" },
    { word: "ljubav", translationRu: "любовь", translationEn: "love" },
    { word: "mir", translationRu: "покой", translationEn: "peace" },
    { word: "san", translationRu: "сон", translationEn: "dream" },
    { word: "zvezda", translationRu: "звезда", translationEn: "star" },
    { word: "mesec", translationRu: "луна", translationEn: "moon" },
    { word: "topao", translationRu: "тёплый", translationEn: "warm" },
    { word: "tih", translationRu: "тихий", translationEn: "quiet" },
    { word: "lep", translationRu: "красивый", translationEn: "beautiful" },
    { word: "sećanje", translationRu: "воспоминание", translationEn: "memory" },
    { word: "nada", translationRu: "надежда", translationEn: "hope" },
  ],
  ka: [
    { word: "სახლი", translationRu: "дом", translationEn: "home" },
    { word: "ოჯახი", translationRu: "семья", translationEn: "family" },
    { word: "სიყვარული", translationRu: "любовь", translationEn: "love" },
    { word: "მშვიდობა", translationRu: "покой", translationEn: "peace" },
    { word: "სიზმარი", translationRu: "сон", translationEn: "dream" },
    { word: "ვარსკვლავი", translationRu: "звезда", translationEn: "star" },
    { word: "მთვარე", translationRu: "луна", translationEn: "moon" },
    { word: "თბილი", translationRu: "тёплый", translationEn: "warm" },
    { word: "წყნარი", translationRu: "тихий", translationEn: "quiet" },
    { word: "ლამაზი", translationRu: "красивый", translationEn: "beautiful" },
    { word: "ხსოვნა", translationRu: "воспоминание", translationEn: "memory" },
    { word: "იმედი", translationRu: "надежда", translationEn: "hope" },
  ],
};

export function NightModePanel({ language = "fi" }: { language?: string }) {
  const [section, setSection] = useState<NightSection>("dreams");
  const [dream, setDream] = useState(getRandomNightDream(language));
  const [showTranslation, setShowTranslation] = useState(false);
  const [showWhisperTranslation, setShowWhisperTranslation] = useState(false);
  const [showStoryTranslation, setShowStoryTranslation] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState(true);

  const localStreakData = getLocalStreak();
  const initialStreak = localStreakData?.currentStreak ?? 0;
  const initialWhisper =
    initialStreak > 7 ? getRandomNightWhisper(language) : null;

  const whisper = initialWhisper;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const refreshDream = useCallback(() => {
    setDream(getRandomNightDream(language));
    setShowTranslation(false);
  }, [language]);

  const grandmaName = getLanguageByCode(language)?.grandma?.name ?? "Бабушка";
  const words = SOFT_WORDS[language] ?? SOFT_WORDS.fi;
  const stories = getNightStories(language);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-8">
        <Skeleton className="size-10 rounded-full bg-indigo-900/30" />
        <Skeleton className="h-4 w-48 bg-indigo-900/30" />
        <Skeleton className="h-3 w-64 bg-indigo-900/30" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-6 gap-6 animate-in fade-in duration-700">
      {/* Whisper banner - streak > 7 */}
      {whisper && (
        <div className="w-full animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="relative rounded-2xl bg-indigo-950/60 border border-indigo-400/20 p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 shrink-0">
                <Volume2 className="size-4 text-indigo-300" />
              </div>
              <div className="space-y-1.5">
                <p className="text-xs font-medium text-indigo-300 uppercase tracking-wider">
                  {grandmaName} шепчет...
                </p>
                <p className="text-sm text-indigo-100 leading-relaxed">
                  {whisper.text}
                </p>
                {showWhisperTranslation && (
                  <p className="text-xs text-indigo-300/70 italic leading-relaxed animate-in fade-in duration-300">
                    {whisper.translationRu}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setShowWhisperTranslation(!showWhisperTranslation)
                  }
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {showWhisperTranslation
                    ? "Скрыть перевод"
                    : "Показать перевод"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Section navigation */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setSection("dreams")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            section === "dreams"
              ? "bg-indigo-600/80 text-white border border-indigo-400/60 shadow-lg shadow-indigo-900/50"
              : "text-indigo-200/70 hover:text-white border border-indigo-400/20 hover:border-indigo-400/40"
          }`}
        >
          <Moon className="size-3" />
          Сны бабушки
        </button>
        <button
          type="button"
          onClick={() => setSection("words")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            section === "words"
              ? "bg-indigo-600/80 text-white border border-indigo-400/60 shadow-lg shadow-indigo-900/50"
              : "text-indigo-200/70 hover:text-white border border-indigo-400/20 hover:border-indigo-400/40"
          }`}
        >
          <BookHeart className="size-3" />
          Повторение слов
        </button>
        {initialStreak > 30 && (
          <button
            type="button"
            onClick={() => setSection("stories")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              section === "stories"
                ? "bg-indigo-600/80 text-white border border-indigo-400/60 shadow-lg shadow-indigo-900/50"
                : "text-indigo-200/70 hover:text-white border border-indigo-400/20 hover:border-indigo-400/40"
            }`}
          >
            <History className="size-3" />
            Семейные истории
          </button>
        )}
      </div>

      {/* Content sections */}
      <div className="w-full">
        {/* Dreams section */}
        {section === "dreams" && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-full bg-indigo-900/40 p-3">
              <Moon className="size-6 text-indigo-200" />
            </div>
            <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-widest">
              Сон {grandmaName}
            </p>
            <div className="relative max-w-lg text-center">
              <p className="text-sm text-indigo-100/90 leading-relaxed italic">
                &ldquo;{dream.text}&rdquo;
              </p>
              {showTranslation && (
                <p className="text-xs text-indigo-300/60 leading-relaxed mt-3 italic animate-in fade-in duration-300">
                  {dream.translationRu}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {showTranslation ? "Скрыть перевод" : "Показать перевод"}
            </button>
            <button
              type="button"
              onClick={refreshDream}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-400/20 hover:bg-indigo-800/40 transition-all"
            >
              <Sparkles className="size-3" />
              Другой сон
            </button>
          </div>
        )}

        {/* Word review section */}
        {section === "words" && (
          <div className="flex flex-col items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-full bg-indigo-900/40 p-3">
              <BookHeart className="size-6 text-indigo-200" />
            </div>
            <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-widest">
              Тихие карточки
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md">
              {words.map((w) => (
                <div
                  key={w.word}
                  className="group rounded-xl bg-indigo-950/40 border border-indigo-400/10 p-3 text-center transition-all hover:bg-indigo-900/40 hover:border-indigo-400/20"
                >
                  <p className="text-base font-medium text-indigo-100">
                    {w.word}
                  </p>
                  <p className="text-xs text-indigo-300/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {w.translationRu}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-indigo-300/40 text-center max-w-xs">
              Просто смотри на слова. Не надо запоминать — они уже с тобой.
            </p>
            <button
              type="button"
              onClick={() => setSection("dreams")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-400/20 hover:bg-indigo-800/40 transition-all"
            >
              <Moon className="size-3" />
              Вернуться к снам
            </button>
          </div>
        )}

        {/* Family stories section */}
        {section === "stories" && (
          <div className="flex flex-col items-center gap-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="rounded-full bg-indigo-900/40 p-3">
              <History className="size-6 text-indigo-200" />
            </div>
            <p className="text-xs font-medium text-indigo-300/60 uppercase tracking-widest">
              Ночные семейные истории
            </p>
            <div className="w-full max-w-lg space-y-4">
              {stories.map((story, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-indigo-950/40 border border-indigo-400/10 p-4"
                >
                  <p className="text-sm font-medium text-indigo-200 mb-2">
                    {story.title}
                  </p>
                  <p className="text-xs text-indigo-100/80 leading-relaxed">
                    {story.text}
                  </p>
                  {showStoryTranslation[i] && (
                    <p className="text-xs text-indigo-300/60 leading-relaxed mt-2 italic animate-in fade-in duration-300">
                      {story.translationRu}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={() =>
                      setShowStoryTranslation((prev) => ({
                        ...prev,
                        [i]: !prev[i],
                      }))
                    }
                    className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-1"
                  >
                    {showStoryTranslation[i]
                      ? "Скрыть перевод"
                      : "Показать перевод"}
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSection("dreams")}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-indigo-200 bg-indigo-900/30 border border-indigo-400/20 hover:bg-indigo-800/40 transition-all"
            >
              <Moon className="size-3" />
              Вернуться к снам
            </button>
          </div>
        )}
      </div>

      {/* Quiet message */}
      <p className="text-[10px] text-indigo-300/30 text-center">
        Тихий режим · Нет викторин · Только покой
      </p>
    </div>
  );
}
