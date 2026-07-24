"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LANGUAGES,
  getDefaultLanguage,
  type LanguageConfig,
} from "@/lib/config";
import { getLocalProfile, saveLocalProfile } from "@/lib/local-profile";
import {
  getLocalPreferences,
  saveLocalPreferences,
} from "@/lib/local-preferences";

function setLanguageCookie(code: string) {
  document.cookie = `language_preference=${code};path=/;max-age=31536000;SameSite=Lax`;
}

export function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<LanguageConfig>(() => {
    const local = getLocalProfile();
    if (local?.language) {
      const found = LANGUAGES.find((l) => l.code === local.language);
      if (found) return found;
    }

    const prefs = getLocalPreferences();
    if (prefs?.language) {
      const found = LANGUAGES.find((l) => l.code === prefs.language);
      if (found) {
        const profile = getLocalProfile();
        saveLocalProfile({
          name: profile?.name ?? "",
          gender: profile?.gender ?? "neutral",
          language: found.code,
        });
        return found;
      }
    }

    return getDefaultLanguage();
  });

  function switchLanguage(code: string) {
    const lang = LANGUAGES.find((l) => l.code === code);
    if (!lang || lang.code === currentLang.code) return;

    const local = getLocalProfile();
    saveLocalProfile({
      name: local?.name ?? "",
      gender: local?.gender ?? "neutral",
      language: code,
    });

    const prefs = getLocalPreferences();
    saveLocalPreferences({
      language: code,
      categories: prefs?.categories ?? [],
    });

    setLanguageCookie(code);
    setCurrentLang(lang);

    window.dispatchEvent(
      new CustomEvent("language-changed", { detail: { language: code } })
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md hover:bg-accent transition-colors cursor-pointer outline-none">
        <span className="text-base leading-none">{currentLang.flag}</span>
        <ChevronDown className="size-3 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="text-lg leading-none">{lang.flag}</span>
            <div className="flex-1">
              <div className="text-sm font-medium">{lang.name}</div>
              <div className="text-xs text-muted-foreground">
                {lang.nativeName} — {lang.grandma.name}
              </div>
            </div>
            {lang.code === currentLang.code && (
              <Check className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
