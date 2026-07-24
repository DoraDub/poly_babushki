"use client";

import type { UserStreak } from "./models";

const STORAGE_KEY = "suomikoti_streak";

export function getLocalStreak(): UserStreak | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as UserStreak;
  } catch {
    return null;
  }
}

export function saveLocalStreak(streak: UserStreak): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(streak));
  } catch {
    // localStorage not available
  }
}

export function incrementLocalStreak(): UserStreak {
  const today = new Date().toISOString().split("T")[0];
  const existing = getLocalStreak();

  if (existing && existing.lastActivityDate === today) {
    return existing;
  }

  if (existing) {
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    const newStreak =
      existing.lastActivityDate === yesterdayStr
        ? existing.currentStreak + 1
        : 1;

    const streak: UserStreak = {
      userId: "local",
      currentStreak: newStreak,
      longestStreak: Math.max(existing.longestStreak, newStreak),
      lastActivityDate: today,
      updatedAt: new Date().toISOString(),
    };
    saveLocalStreak(streak);
    return streak;
  }

  const streak: UserStreak = {
    userId: "local",
    currentStreak: 1,
    longestStreak: 1,
    lastActivityDate: today,
    updatedAt: new Date().toISOString(),
  };
  saveLocalStreak(streak);
  return streak;
}

export function clearLocalStreak(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}
