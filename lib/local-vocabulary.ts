"use client";

import type { VocabularyItem } from "./models";

const STORAGE_KEY_PREFIX = "suomikoti_vocabulary_";

function getStorageKey(language: string): string {
  return `${STORAGE_KEY_PREFIX}all_${language}`;
}

export function getLocalVocabulary(language: string): VocabularyItem[] {
  try {
    const raw = localStorage.getItem(getStorageKey(language));
    if (!raw) return [];
    return JSON.parse(raw) as VocabularyItem[];
  } catch {
    return [];
  }
}

export function saveLocalVocabularyItem(item: VocabularyItem): void {
  try {
    const key = getStorageKey(item.language);
    const items = getLocalVocabulary(item.language);
    const exists = items.some(
      (i) => i.word === item.word && i.language === item.language
    );
    if (exists) return;
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage not available
  }
}

export function removeLocalVocabularyItem(
  language: string,
  word: string
): void {
  try {
    const key = getStorageKey(language);
    const items = getLocalVocabulary(language).filter((i) => i.word !== word);
    localStorage.setItem(key, JSON.stringify(items));
  } catch {
    // localStorage not available
  }
}

export function replaceLocalVocabulary(
  language: string,
  items: VocabularyItem[]
): void {
  try {
    localStorage.setItem(getStorageKey(language), JSON.stringify(items));
  } catch {
    // localStorage not available
  }
}

export function getLocalVocabularyLanguages(): string[] {
  const languages: string[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith(STORAGE_KEY_PREFIX)) {
        const lang = key.replace(STORAGE_KEY_PREFIX, "");
        languages.push(lang);
      }
    }
  } catch {
    // localStorage not available
  }
  return languages;
}
