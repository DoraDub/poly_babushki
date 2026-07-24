"use client";

import type { UserGender } from "./models";

const STORAGE_KEY = "suomikoti_profile";

export interface LocalProfile {
  name: string;
  gender: UserGender;
  language: string;
}

export function getLocalProfile(): LocalProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalProfile;
  } catch {
    return null;
  }
}

export function saveLocalProfile(profile: LocalProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {}
}

export function clearLocalProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}
