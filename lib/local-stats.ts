"use client";

import type { UserStats } from "./models";

const STORAGE_KEY = "suomikoti_stats";

const DEFAULT_STATS: UserStats = {
  userId: "local",
  wordsLearned: 0,
  newsRead: 0,
  totalStudyTime: 0,
  newsReadByLanguage: {},
  achievements: {},
  updatedAt: new Date().toISOString(),
};

export function getLocalStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATS };
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATS };
  }
}

export function saveLocalStats(stats: Partial<UserStats>): UserStats {
  const current = getLocalStats();
  const updated: UserStats = {
    ...current,
    ...stats,
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage not available
  }
  return updated;
}

export function incrementNewsRead(language: string): UserStats {
  const current = getLocalStats();
  const newsReadByLanguage = {
    ...(current.newsReadByLanguage ?? {}),
    [language]: (current.newsReadByLanguage?.[language] ?? 0) + 1,
  };
  return saveLocalStats({
    newsRead: (current.newsRead ?? 0) + 1,
    newsReadByLanguage,
  });
}

export function incrementStudyTime(minutes: number): UserStats {
  const current = getLocalStats();
  return saveLocalStats({
    totalStudyTime: (current.totalStudyTime ?? 0) + minutes,
  });
}

export function updateWordsByLanguage(
  _language: string,
  totalWords: number
): UserStats {
  return saveLocalStats({
    wordsLearned: totalWords,
  });
}

export function clearLocalStats(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}
