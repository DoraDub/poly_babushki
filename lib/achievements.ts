export interface Level {
  id: "novice" | "expat" | "local";
  name: string;
  nameFi: string;
  minWords: number;
  maxWords: number | null;
}

export const LEVELS: Level[] = [
  {
    id: "novice",
    name: "Новичок",
    nameFi: "Aloittelija",
    minWords: 0,
    maxWords: 49,
  },
  {
    id: "expat",
    name: "Экспат",
    nameFi: "Ekspatriaatti",
    minWords: 50,
    maxWords: 999,
  },
  {
    id: "local",
    name: "Местный",
    nameFi: "Paikallinen",
    minWords: 1000,
    maxWords: null,
  },
];

export function getLevel(totalWords: number): Level {
  for (const level of LEVELS) {
    if (level.maxWords === null) return level;
    if (totalWords >= level.minWords && totalWords <= level.maxWords)
      return level;
  }
  return LEVELS[0];
}

export function getNextLevel(currentLevel: Level): Level | null {
  const idx = LEVELS.indexOf(currentLevel);
  if (idx < LEVELS.length - 1) return LEVELS[idx + 1];
  return null;
}

export function getLevelProgress(totalWords: number): {
  progress: number;
  nextLevelAt: number | null;
} {
  const current = getLevel(totalWords);
  const next = getNextLevel(current);
  if (!next) return { progress: 100, nextLevelAt: null };

  const range = next.minWords - current.minWords;
  const progress = Math.min(
    100,
    Math.round(((totalWords - current.minWords) / range) * 100)
  );
  return { progress, nextLevelAt: next.minWords };
}

export interface Achievement {
  id: string;
  title: string;
  titleFi: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first_news",
    title: "Первая новость",
    titleFi: "Ensimmäinen uutinen",
    description: "Прочитайте первую новость",
    icon: "newspaper",
  },
  {
    id: "five_day_streak",
    title: "5 дней подряд",
    titleFi: "5 päivää putkeen",
    description: "Занимайтесь 5 дней подряд",
    icon: "flame",
  },
  {
    id: "polyglot",
    title: "Полиглот",
    titleFi: "Polyglotti",
    description: "Учите слова в 2+ языках",
    icon: "languages",
  },
];

export interface AchievementStatus {
  achievement: Achievement;
  unlocked: boolean;
  unlockedAt: string | null;
}

export function checkAchievements(
  totalNewsRead: number,
  currentStreak: number,
  wordsByLanguage: Record<string, number>,
  existingAchievements: Record<string, string>
): AchievementStatus[] {
  return ACHIEVEMENTS.map((a) => {
    const already = existingAchievements[a.id];
    if (already) {
      return { achievement: a, unlocked: true, unlockedAt: already };
    }

    let shouldUnlock = false;
    switch (a.id) {
      case "first_news":
        shouldUnlock = totalNewsRead >= 1;
        break;
      case "five_day_streak":
        shouldUnlock = currentStreak >= 5;
        break;
      case "polyglot":
        shouldUnlock =
          Object.values(wordsByLanguage).filter((c) => c > 0).length >= 2;
        break;
    }

    return {
      achievement: a,
      unlocked: shouldUnlock,
      unlockedAt: shouldUnlock ? new Date().toISOString() : null,
    };
  });
}

export function computeNewAchievements(
  totalNewsRead: number,
  currentStreak: number,
  wordsByLanguage: Record<string, number>,
  existingAchievements: Record<string, string>
): Record<string, string> {
  const result: Record<string, string> = { ...existingAchievements };
  const statuses = checkAchievements(
    totalNewsRead,
    currentStreak,
    wordsByLanguage,
    existingAchievements
  );

  for (const s of statuses) {
    if (s.unlocked && !existingAchievements[s.achievement.id]) {
      result[s.achievement.id] = s.unlockedAt!;
    }
  }

  return result;
}
