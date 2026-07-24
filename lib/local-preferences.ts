"use client";

import type { CategoryId } from "./constants";

const STORAGE_KEY = "suomikoti_preferences";

export interface LocalPreferences {
  language: string;
  categories: CategoryId[];
}

export function getLocalPreferences(): LocalPreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalPreferences;
  } catch {
    return null;
  }
}

export function saveLocalPreferences(prefs: LocalPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // localStorage not available
  }
}

export function clearLocalPreferences(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage not available
  }
}
