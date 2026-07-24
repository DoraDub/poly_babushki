import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createServerSupabaseClient,
  isSupabaseConfigured,
} from "@/lib/supabase";
import { isDatabaseAvailable } from "@/lib/db";
import {
  getUserStats,
  putUserStats,
  getVocabulary,
  getUserStreak,
} from "@/lib/models";
import { mockUserStats, mockUserStreak } from "@/lib/mock-data";
import {
  getLevel,
  getLevelProgress,
  computeNewAchievements,
  checkAchievements,
} from "@/lib/achievements";

const updateStatsSchema = z.object({
  newsRead: z.number().int().min(0).optional(),
  newsReadByLanguage: z.record(z.string(), z.number().int().min(0)).optional(),
  totalStudyTime: z.number().int().min(0).optional(),
});

function getWordsByLanguage(
  vocab: { language: string }[]
): Record<string, number> {
  const wbl: Record<string, number> = {};
  for (const item of vocab) {
    wbl[item.language] = (wbl[item.language] ?? 0) + 1;
  }
  return wbl;
}

function buildResponse(
  userId: string | undefined,
  vocab: { language: string }[],
  streak: { currentStreak: number; longestStreak: number } | null,
  stats: {
    newsReadByLanguage?: Record<string, number>;
    totalStudyTime: number;
    achievements?: Record<string, string>;
  } | null
) {
  const wordsByLanguage = getWordsByLanguage(vocab);
  const totalWords = vocab.length;
  const newsReadByLanguage: Record<string, number> = {};
  const existingNewsReadByLanguage = stats?.newsReadByLanguage ?? {};
  for (const [k, v] of Object.entries(existingNewsReadByLanguage)) {
    newsReadByLanguage[k] = v;
  }
  const totalNewsRead = Object.values(newsReadByLanguage).reduce(
    (a, b) => a + b,
    0
  );
  const currentStreak = streak?.currentStreak ?? 0;
  const existingAchievements = stats?.achievements ?? {};

  const level = getLevel(totalWords);
  const levelProgress = getLevelProgress(totalWords);
  const achievements = checkAchievements(
    totalNewsRead,
    currentStreak,
    wordsByLanguage,
    existingAchievements
  );

  return NextResponse.json({
    userId,
    wordsByLanguage,
    totalWords,
    newsReadByLanguage,
    totalNewsRead,
    currentStreak,
    longestStreak: streak?.longestStreak ?? 0,
    totalStudyTime: stats?.totalStudyTime ?? 0,
    level,
    levelProgress,
    achievements,
  });
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    const ms = mockUserStats;
    return buildResponse(
      undefined,
      [],
      {
        currentStreak: mockUserStreak.currentStreak,
        longestStreak: mockUserStreak.longestStreak,
      },
      ms
    );
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const dbAvailable = await isDatabaseAvailable();

  if (!dbAvailable) {
    const ms = mockUserStats;
    return buildResponse(
      user.id,
      [],
      {
        currentStreak: mockUserStreak.currentStreak,
        longestStreak: mockUserStreak.longestStreak,
      },
      ms
    );
  }

  const [vocab, streak, stats] = await Promise.all([
    getVocabulary(user.id),
    getUserStreak(user.id),
    getUserStats(user.id),
  ]);

  const existingAchievements = stats?.achievements ?? {};
  const wordsByLanguage = getWordsByLanguage(vocab);
  const totalWords = vocab.length;
  const newsReadByLanguage: Record<string, number> = {};
  for (const [k, v] of Object.entries(stats?.newsReadByLanguage ?? {})) {
    newsReadByLanguage[k] = v;
  }
  const totalNewsRead = Object.values(newsReadByLanguage).reduce(
    (a, b) => a + b,
    0
  );
  const currentStreak = streak?.currentStreak ?? 0;

  const newAchievements = computeNewAchievements(
    totalNewsRead,
    currentStreak,
    wordsByLanguage,
    existingAchievements
  );

  if (
    JSON.stringify(newAchievements) !== JSON.stringify(existingAchievements)
  ) {
    await putUserStats({
      userId: user.id,
      wordsLearned: totalWords,
      newsRead: totalNewsRead,
      totalStudyTime: stats?.totalStudyTime ?? 0,
      newsReadByLanguage,
      achievements: newAchievements,
      updatedAt: new Date().toISOString(),
    });
  }

  return buildResponse(user.id, vocab, streak, stats);
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Сервис недоступен" }, { status: 503 });
  }

  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  const parsed = updateStatsSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Некорректные данные", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const dbAvailable = await isDatabaseAvailable();
  if (!dbAvailable) {
    return NextResponse.json(
      { error: "База данных недоступна" },
      { status: 503 }
    );
  }

  const existing = await getUserStats(user.id);
  const existingNewsReadByLanguage = existing?.newsReadByLanguage ?? {};

  const newsReadByLanguage = { ...existingNewsReadByLanguage };
  if (parsed.data.newsReadByLanguage) {
    for (const [lang, count] of Object.entries(
      parsed.data.newsReadByLanguage
    )) {
      newsReadByLanguage[lang] = (newsReadByLanguage[lang] ?? 0) + count;
    }
  }

  const updated = {
    userId: user.id,
    wordsLearned: existing?.wordsLearned ?? 0,
    newsRead: (existing?.newsRead ?? 0) + (parsed.data.newsRead ?? 0),
    totalStudyTime:
      (existing?.totalStudyTime ?? 0) + (parsed.data.totalStudyTime ?? 0),
    newsReadByLanguage,
    achievements: existing?.achievements ?? {},
    updatedAt: new Date().toISOString(),
  };

  await putUserStats(updated);
  return NextResponse.json(updated);
}
