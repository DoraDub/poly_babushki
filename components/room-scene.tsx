"use client";

import { useMemo, useState, useEffect } from "react";
import type { NewsArticle } from "@/lib/newsapi";
import { NewsCatalog } from "@/components/news-catalog";
import { GrandmaSprite } from "@/components/grandma-sprite";
import { GrandmaStory } from "@/components/grandma-story";
import { StatsPanel } from "@/components/stats-panel";
import { NightModePanel } from "@/components/night-mode-panel";
import {
  getTimeOfDay,
  getBackgroundForTimeOfDay,
  getPngBackgroundUrl,
  type TimeOfDay,
} from "@/lib/room-config";
import { getLanguageByCode } from "@/lib/config";

export function RoomScene({
  articles: initialArticles,
  countryCode: initialCountryCode = "fi",
  language: initialLanguage = "fi",
}: {
  articles: NewsArticle[];
  countryCode?: string;
  language?: string;
}) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [language, setLanguage] = useState(initialLanguage);
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [bgError, setBgError] = useState(false);

  const isNight = timeOfDay === "night";

  useEffect(() => {
    const id = setTimeout(() => {
      setTimeOfDay(getTimeOfDay());
    }, 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isNight) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isNight]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function handleLanguageChange(e: Event) {
      const detail = (e as CustomEvent).detail as { language: string };
      const lang = getLanguageByCode(detail.language);
      if (!lang) return;

      setLanguage(lang.code);
      setCountryCode(lang.countryCode);

      fetch(`/api/news?language=${lang.code}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.articles) {
            setArticles(data.articles);
          }
        })
        .catch(() => {});
    }

    window.addEventListener("language-changed", handleLanguageChange);
    return () =>
      window.removeEventListener("language-changed", handleLanguageChange);
  }, []);

  const bgConfig = useMemo(
    () => getBackgroundForTimeOfDay(countryCode, timeOfDay ?? "day"),
    [countryCode, timeOfDay]
  );

  const pngUrl = useMemo(
    () => getPngBackgroundUrl(countryCode, timeOfDay ?? "day"),
    [countryCode, timeOfDay]
  );

  if (timeOfDay === null) {
    return null;
  }

  return (
    <div className="relative w-full h-[calc(100vh-9rem)] overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
        {!bgError && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pngUrl}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            onLoad={() => setBgLoaded(true)}
            onError={() => setBgError(true)}
          />
        )}
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: bgConfig.gradient,
            opacity: bgLoaded && !bgError ? 0 : 1,
          }}
        />
      </div>

      {/* Wall texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 40px, #8B7355 40px, #8B7355 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, #8B7355 40px, #8B7355 41px)",
        }}
      />

      {/* Wallpaper subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, #8B6914 1.5px, transparent 1.5px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Wooden floor */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%]">
        <div
          className="w-full h-full"
          style={{
            background: isNight
              ? "linear-gradient(180deg, #1e293b 0%, #0f172a 50%, #020617 100%)"
              : "linear-gradient(180deg, #D4B896 0%, #C9A97E 40%, #BF9D6E 100%)",
          }}
        >
          <div
            className="w-full h-full opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 140px, #8B7355 140px, #8B7355 142px), repeating-linear-gradient(0deg, transparent, transparent 28px, #8B7355 28px, #8B7355 29px)",
            }}
          />
        </div>
      </div>

      {/* Warm vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isNight
            ? "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(0, 0, 0, 0.5) 100%)"
            : "radial-gradient(ellipse at 50% 60%, transparent 50%, rgba(200, 160, 100, 0.15) 100%)",
        }}
      />

      {/* Rug */}
      <div
        className={`absolute bottom-[18%] left-1/2 -translate-x-1/2 w-72 h-36 transition-opacity duration-1000 ${isNight ? "opacity-30" : "opacity-100"}`}
      >
        <svg viewBox="0 0 288 144" className="w-full h-full">
          <rect
            x="4"
            y="4"
            width="280"
            height="136"
            rx="4"
            fill="#C4956A"
            stroke="#A07850"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="14"
            width="260"
            height="116"
            rx="2"
            fill="#B8845A"
            stroke="#D4A67A"
            strokeWidth="1"
          />
          <rect x="24" y="24" width="240" height="96" rx="1" fill="#A07048" />
          <rect x="34" y="34" width="220" height="76" fill="#C4956A" />
          <polygon
            points="144,44 164,72 144,100 124,72"
            fill="#8B5E3C"
            opacity="0.6"
          />
          <polygon
            points="144,54 156,72 144,90 132,72"
            fill="#D4A67A"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Responsive layout */}
      <div className="absolute inset-0 flex flex-col md:flex-row">
        {/* Left section — Grandma + News */}
        <div className="flex flex-col md:flex-col lg:flex-row flex-1 overflow-hidden min-h-0">
          {/* Grandma column */}
          <div
            className="
              flex flex-col items-center justify-end z-10
              max-md:max-h-[28vh] max-md:pb-1
              md:max-h-[35vh] md:pb-2
              lg:max-h-none lg:w-[37.5%] lg:pb-[15%]
            "
          >
            {!isNight && (
              <div className="mb-2 ml-8 self-start max-md:hidden">
                <GrandmaStory language={language} />
              </div>
            )}
            <div className="max-md:max-w-[140px] max-md:max-h-[200px]">
              <GrandmaSprite countryCode={countryCode} isNight={isNight} />
            </div>
          </div>

          {/* Center column — Content */}
          <div
            className="
              flex flex-col items-center justify-start z-10 px-4 overflow-y-auto
              max-md:flex-1 max-md:py-2
              md:flex-1 md:py-4
            "
          >
            {isNight ? (
              <NightModePanel language={language} />
            ) : (
              <div className="w-full max-w-2xl animate-in fade-in duration-700">
                <NewsCatalog articles={articles} language={language} />
              </div>
            )}
          </div>
        </div>

        {/* Right column — Stats panel */}
        <div
          className="
            flex flex-col z-10
            max-md:items-center max-md:justify-center max-md:py-1.5 max-md:w-full
            md:w-56 md:items-end md:pt-6 md:pr-4
            lg:w-[20%]
          "
        >
          <div
            className="
              rounded-xl bg-background/60 backdrop-blur-sm
              border border-border/50 shadow-sm
              max-md:w-full max-md:max-w-sm max-md:mx-4
            "
          >
            <StatsPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
