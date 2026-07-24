"use client";

import { useRef, useState } from "react";
import { Flame, BookOpen, Bookmark } from "lucide-react";
import { getLocalStreak } from "@/lib/local-streak";
import { getLocalStats } from "@/lib/local-stats";

interface StreakData {
  currentStreak: number;
}

interface PopupStats {
  wordsLearned: number;
  newsRead: number;
}

function getInitialStreak(): StreakData | null {
  const cached = getLocalStreak();
  return cached ? { currentStreak: cached.currentStreak } : null;
}

export function StreakDisplay() {
  const [streak] = useState<StreakData | null>(getInitialStreak);
  const [open, setOpen] = useState(false);
  const [popupStats, setPopupStats] = useState<PopupStats | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function handleToggle() {
    const next = !open;
    setOpen(next);
    if (next && !popupStats) {
      const stats = getLocalStats();
      setPopupStats({
        wordsLearned: stats.wordsLearned ?? 0,
        newsRead: stats.newsRead ?? 0,
      });
    }
  }

  if (!streak || streak.currentStreak === 0) return null;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="flex items-center gap-1 text-sm text-amber-600 font-medium hover:opacity-80 transition-opacity cursor-pointer"
      >
        <Flame className="size-4 fill-amber-500 text-amber-500" />
        <span>{streak.currentStreak}</span>
      </button>

      {open && (
        <div
          ref={popupRef}
          className="absolute right-0 top-full mt-2 z-50 min-w-44 rounded-lg border bg-popover p-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex items-center gap-2 text-amber-600 mb-2 pb-2 border-b">
            <Flame className="size-4 fill-amber-500 text-amber-500" />
            <span className="text-sm font-semibold">
              {streak.currentStreak}
            </span>
            <span className="text-xs text-muted-foreground">дней подряд</span>
          </div>
          {popupStats ? (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-600">
                <Bookmark className="size-3.5 text-emerald-500" />
                <span className="text-sm font-medium">
                  {popupStats.wordsLearned}
                </span>
                <span className="text-xs text-muted-foreground">слов</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <BookOpen className="size-3.5 text-blue-500" />
                <span className="text-sm font-medium">
                  {popupStats.newsRead}
                </span>
                <span className="text-xs text-muted-foreground">новостей</span>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
