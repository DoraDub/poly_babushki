"use client";

import { useState } from "react";
import { BookOpen, Bookmark } from "lucide-react";
import { getLocalStats } from "@/lib/local-stats";

export function StatsPanel() {
  const [stats] = useState(() => {
    const statsData = getLocalStats();
    return {
      wordsLearned: statsData.wordsLearned ?? 0,
      newsRead: statsData.newsRead ?? 0,
    };
  });

  if (stats.wordsLearned === 0 && stats.newsRead === 0) {
    return null;
  }

  return (
    <div className="flex flex-col max-md:flex-row max-md:flex-wrap max-md:justify-center max-md:gap-x-6 p-4">
      {stats.wordsLearned > 0 && (
        <div className="flex items-center gap-2 text-emerald-600">
          <Bookmark className="size-4 text-emerald-500" />
          <span className="text-sm font-medium">{stats.wordsLearned}</span>
          <span className="text-xs text-muted-foreground">слов</span>
        </div>
      )}
      {stats.newsRead > 0 && (
        <div className="flex items-center gap-2 text-blue-600">
          <BookOpen className="size-4 text-blue-500" />
          <span className="text-sm font-medium">{stats.newsRead}</span>
          <span className="text-xs text-muted-foreground">новостей</span>
        </div>
      )}
    </div>
  );
}
