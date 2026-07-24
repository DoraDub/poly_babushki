"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  BookOpen,
  Newspaper,
  Flame,
  Clock,
  ArrowLeft,
  Play,
  Square,
  Trophy,
  Languages,
  Lock,
  CheckCircle2,
  ChevronRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { getLanguageByCode } from "@/lib/config";
import type { Level, AchievementStatus } from "@/lib/achievements";
import { getLocalStats, incrementStudyTime } from "@/lib/local-stats";
import { getLocalStreak } from "@/lib/local-streak";
import { getLocalVocabulary } from "@/lib/local-vocabulary";
import {
  getLevel,
  getLevelProgress,
  computeNewAchievements,
  checkAchievements,
} from "@/lib/achievements";

interface StatsResponse {
  wordsByLanguage: Record<string, number>;
  totalWords: number;
  newsReadByLanguage: Record<string, number>;
  totalNewsRead: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyTime: number;
  level: Level;
  levelProgress: { progress: number; nextLevelAt: number | null };
  achievements: AchievementStatus[];
}

const ACHIEVEMENT_ICONS: Record<string, React.ReactNode> = {
  newspaper: <Newspaper className="size-5" />,
  flame: <Flame className="size-5" />,
  languages: <Languages className="size-5" />,
};

function formatTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0) {
    return `${h} ч ${m} мин`;
  }
  return `${m} мин`;
}

function getLevelColor(levelId: string): string {
  switch (levelId) {
    case "novice":
      return "bg-amber-100 text-amber-800 border-amber-300";
    case "expat":
      return "bg-sky-100 text-sky-800 border-sky-300";
    case "local":
      return "bg-emerald-100 text-emerald-800 border-emerald-300";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getLanguageBadge(lang: string): { flag: string; name: string } {
  const config = getLanguageByCode(lang);
  return {
    flag: config?.flag ?? "",
    name: config?.name ?? lang.toUpperCase(),
  };
}

function buildStatsResponse(): StatsResponse {
  const stats = getLocalStats();
  const streak = getLocalStreak();

  const savedLanguages = ["fi", "sr", "ka"];
  const wordsByLanguage: Record<string, number> = {};
  const newsReadByLanguage: Record<string, number> = {
    ...(stats.newsReadByLanguage ?? {}),
  };
  let totalWords = 0;

  for (const lang of savedLanguages) {
    const vocab = getLocalVocabulary(lang);
    wordsByLanguage[lang] = vocab.length;
    totalWords += vocab.length;
  }

  const currentStreak = streak?.currentStreak ?? 0;
  const longestStreak = streak?.longestStreak ?? 0;

  const achievements = computeNewAchievements(
    stats.newsRead ?? 0,
    currentStreak,
    wordsByLanguage,
    stats.achievements ?? {}
  );

  const achievementStatuses = checkAchievements(
    stats.newsRead ?? 0,
    currentStreak,
    wordsByLanguage,
    achievements
  );

  const level = getLevel(totalWords);
  const levelProgress = getLevelProgress(totalWords);

  return {
    wordsByLanguage,
    totalWords,
    newsReadByLanguage,
    totalNewsRead: stats.newsRead ?? 0,
    currentStreak,
    longestStreak,
    totalStudyTime: stats.totalStudyTime ?? 0,
    level,
    levelProgress,
    achievements: achievementStatuses,
  };
}

export function StatsContent() {
  const [stats, setStats] = useState<StatsResponse>(buildStatsResponse);
  const [studySeconds, setStudySeconds] = useState(0);
  const [studyActive, setStudyActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const studyStartRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setStats(buildStatsResponse());
    }, 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (studyActive) {
      studyStartRef.current = Date.now();
      timerRef.current = setInterval(() => {
        if (studyStartRef.current) {
          setStudySeconds(
            Math.floor((Date.now() - studyStartRef.current) / 1000)
          );
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      studyStartRef.current = null;
    }
  }, [studyActive]);

  function handleStartStudy() {
    setStudyActive(true);
  }

  function handleStopStudy() {
    if (!studyStartRef.current) return;

    const elapsedMinutes = Math.max(
      1,
      Math.floor((Date.now() - studyStartRef.current) / 60000)
    );

    setStudyActive(false);
    setStudySeconds(0);

    incrementStudyTime(elapsedMinutes);
    toast.success(`Тренировка завершена! +${formatTime(elapsedMinutes)}`);
    const newData = buildStatsResponse();
    setStats(newData);
  }

  function formatTimer(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/60">
        <div className="mx-auto max-w-3xl px-4 py-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            На главную
          </Link>
          <p className="text-muted-foreground">
            Статистика пока пуста. Начните читать новости!
          </p>
        </div>
      </div>
    );
  }

  const allLanguages = new Set([
    ...Object.keys(stats.wordsByLanguage),
    ...Object.keys(stats.newsReadByLanguage),
  ]);
  const langEntries = Array.from(allLanguages).sort();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/80 to-orange-50/60">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          На главную
        </Link>

        <div className="flex flex-col gap-2 mb-8">
          <h1 className="font-serif text-3xl font-bold text-amber-950">
            Статистика
          </h1>
          <p className="text-muted-foreground text-sm">
            Ваш прогресс в изучении языков
          </p>
        </div>

        <div className="mb-8">
          <Card className="bg-white/90 border-amber-200/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Star className="size-5 text-amber-500" />
                Ваш уровень
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Badge
                    variant="outline"
                    className={`text-sm px-3 py-1 ${getLevelColor(stats.level.id)}`}
                  >
                    {stats.level.name}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {stats.totalWords} слов
                  </span>
                </div>
                {stats.levelProgress.nextLevelAt && (
                  <span className="text-xs text-muted-foreground">
                    Следующий уровень: {stats.levelProgress.nextLevelAt} слов
                  </span>
                )}
              </div>
              <Progress
                value={stats.levelProgress.progress}
                className="h-2 bg-amber-100"
              />
              {stats.levelProgress.nextLevelAt && (
                <p className="text-xs text-muted-foreground mt-2">
                  +{stats.levelProgress.nextLevelAt - stats.totalWords} слов до
                  следующего уровня
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <Card className="bg-white/90 border-amber-200/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-amber-100 p-2.5">
                  <BookOpen className="size-5 text-amber-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-950">
                {stats.totalWords}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Выучено слов</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-amber-200/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-amber-100 p-2.5">
                  <Newspaper className="size-5 text-amber-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-950">
                {stats.totalNewsRead}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Прочитано новостей
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-amber-200/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-amber-100 p-2.5">
                  <Flame className="size-5 text-amber-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-950">
                {stats.currentStreak}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Текущий стрик (дней)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 border-amber-200/50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-full bg-amber-100 p-2.5">
                  <Clock className="size-5 text-amber-700" />
                </div>
              </div>
              <p className="text-3xl font-bold text-amber-950">
                {formatTime(stats.totalStudyTime)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Общее время занятий
              </p>
            </CardContent>
          </Card>
        </div>

        {langEntries.length > 0 && (
          <Card className="bg-white/90 border-amber-200/50 mb-8">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Languages className="size-5 text-amber-500" />
                Статистика по языкам
              </CardTitle>
              <CardDescription>
                Детальный разбивка прогресса по каждому языку
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={langEntries[0]}>
                <TabsList className="mb-4">
                  {langEntries.map((lang) => {
                    const info = getLanguageBadge(lang);
                    return (
                      <TabsTrigger key={lang} value={lang}>
                        {info.flag} {info.name}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                {langEntries.map((lang) => {
                  const words = stats.wordsByLanguage[lang] ?? 0;
                  const news = stats.newsReadByLanguage[lang] ?? 0;
                  const langLevel = getLanguageByCode(lang);

                  return (
                    <TabsContent key={lang} value={lang} className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg bg-amber-50/80 p-4 border border-amber-100">
                          <p className="text-2xl font-bold text-amber-950">
                            {words}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            слов в словаре
                          </p>
                        </div>
                        <div className="rounded-lg bg-amber-50/80 p-4 border border-amber-100">
                          <p className="text-2xl font-bold text-amber-950">
                            {news}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            новостей прочитано
                          </p>
                        </div>
                      </div>
                      {langLevel?.grandma && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="inline-block size-2 rounded-full bg-amber-400" />
                          Ваша бабушка: {langLevel.grandma.name} из{" "}
                          {langLevel.grandma.city}
                        </p>
                      )}
                    </TabsContent>
                  );
                })}
              </Tabs>
            </CardContent>
          </Card>
        )}

        <Card className="bg-white/90 border-amber-200/50 mb-8">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Trophy className="size-5 text-amber-500" />
              Достижения
            </CardTitle>
            <CardDescription>
              {stats.achievements.filter((a) => a.unlocked).length} /{" "}
              {stats.achievements.length} получено
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {stats.achievements.map((a) => (
                <div
                  key={a.achievement.id}
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                    a.unlocked
                      ? "bg-amber-50/80 border-amber-200"
                      : "bg-muted/30 border-muted opacity-60"
                  }`}
                >
                  <div
                    className={`rounded-full p-2.5 ${
                      a.unlocked
                        ? "bg-amber-100 text-amber-700"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {a.unlocked ? (
                      (ACHIEVEMENT_ICONS[a.achievement.icon] ?? (
                        <Trophy className="size-5" />
                      ))
                    ) : (
                      <Lock className="size-5" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm font-medium ${
                        a.unlocked ? "text-amber-950" : "text-muted-foreground"
                      }`}
                    >
                      {a.achievement.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.achievement.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {a.unlocked ? (
                      <CheckCircle2 className="size-5 text-emerald-500" />
                    ) : (
                      <ChevronRight className="size-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 border-amber-200/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="size-5 text-amber-500" />
              Тренировка
            </CardTitle>
            <CardDescription>
              Запустите таймер во время занятий, чтобы отслеживать общее время
              тренировок.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {studyActive ? (
              <div className="flex flex-col items-center gap-4">
                <div className="text-4xl font-mono font-bold text-amber-800">
                  {formatTimer(studySeconds)}
                </div>
                <Button
                  variant="outline"
                  onClick={handleStopStudy}
                  className="gap-2 border-red-300/50 text-red-700 hover:bg-red-100/80"
                >
                  <Square className="size-4" />
                  Завершить тренировку
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={handleStartStudy}
                className="gap-2 border-amber-300/50 text-amber-800 hover:bg-amber-100/80"
              >
                <Play className="size-4" />
                Начать тренировку
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
