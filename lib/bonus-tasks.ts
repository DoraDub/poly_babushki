export type BonusTaskType = "find_word" | "make_sentence";

export interface BonusTask {
  type: BonusTaskType;
  word: string;
  description: string;
  rewardBonus: number;
}

interface BonusTasksData {
  completedTasks: string[];
}

const STORAGE_KEY = "suomikoti_bonus_tasks";

function getData(): BonusTasksData {
  if (typeof window === "undefined") return { completedTasks: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { completedTasks: [] };
    return JSON.parse(raw) as BonusTasksData;
  } catch {
    return { completedTasks: [] };
  }
}

function saveData(data: BonusTasksData): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function getCompletedTaskKeys(): string[] {
  return getData().completedTasks;
}

export function markTaskCompleted(type: BonusTaskType, word: string): void {
  const data = getData();
  const key = taskKey(type, word);
  if (!data.completedTasks.includes(key)) {
    data.completedTasks.push(key);
  }
  saveData(data);
}

export function resetCompletedTasks(): void {
  saveData({ completedTasks: [] });
}

function taskKey(type: BonusTaskType, word: string): string {
  return `${type}#${word.toLowerCase()}`;
}

export function pickTask(
  language: string,
  articleText: string
): BonusTask | null {
  const dict = getDictionaryForLanguage(language);
  const words = extractWords(articleText, language);
  const matchedWords = words.filter((w) =>
    dict.some((e) => e.word.toLowerCase() === w)
  );
  if (matchedWords.length === 0) return null;

  const completed = getCompletedTaskKeys();
  const types: BonusTaskType[] = ["find_word", "make_sentence"];

  const candidates: BonusTask[] = [];

  for (const word of matchedWords) {
    for (const type of types) {
      const key = taskKey(type, word);
      if (!completed.includes(key)) {
        const dictEntry = dict.find((e) => e.word.toLowerCase() === word);
        candidates.push({
          type,
          word,
          description:
            type === "find_word"
              ? `Найди в тексте слово «${word}» (${dictEntry?.translationRu ?? ""}) и подтверди`
              : `Составь предложение со словом «${word}» (${dictEntry?.translationRu ?? ""}), не менее 3 слов`,
          rewardBonus: type === "find_word" ? 10 : 15,
        });
      }
    }
  }

  if (candidates.length === 0) {
    resetCompletedTasks();
    const dictEntry = dict.find(
      (e) => e.word.toLowerCase() === matchedWords[0]
    );
    return {
      type: "find_word",
      word: matchedWords[0],
      description: `Найди в тексте слово «${matchedWords[0]}» (${dictEntry?.translationRu ?? ""}) и подтверди`,
      rewardBonus: 10,
    };
  }

  return candidates[Math.floor(Math.random() * candidates.length)];
}

function extractWords(text: string, language: string): string[] {
  const lower = text.toLowerCase();
  if (language === "ka") {
    const georgian = lower.match(/[\u10A0-\u10FF\u2D00-\u2D2F]+/g) ?? [];
    return [...new Set(georgian)];
  }
  if (language === "sr") {
    const latin = lower.match(/[a-zčćžšđČĆŽŠĐ]+/g) ?? [];
    const cyrillic = lower.match(/[а-я]+/g) ?? [];
    return [...new Set([...latin, ...cyrillic])];
  }
  const words = lower.match(/[a-zäöåÄÖÅ]+/g) ?? [];
  return [...new Set(words)];
}

interface DictEntry {
  word: string;
  translationRu: string;
  translationEn: string;
}

function getDictionaryForLanguage(language: string): DictEntry[] {
  try {
    const dicts: Record<string, DictEntry[]> = {
      fi: [
        {
          word: "hallitus",
          translationRu: "правительство",
          translationEn: "government",
        },
        {
          word: "koulutus",
          translationRu: "образование",
          translationEn: "education",
        },
        {
          word: "tutkimus",
          translationRu: "исследование",
          translationEn: "research",
        },
        { word: "terveys", translationRu: "здоровье", translationEn: "health" },
        { word: "urheilu", translationRu: "спорт", translationEn: "sports" },
        {
          word: "kulttuuri",
          translationRu: "культура",
          translationEn: "culture",
        },
        { word: "musiikki", translationRu: "музыка", translationEn: "music" },
        { word: "taide", translationRu: "искусство", translationEn: "art" },
        {
          word: "kehitys",
          translationRu: "развитие",
          translationEn: "development",
        },
        {
          word: "sopimus",
          translationRu: "соглашение",
          translationEn: "agreement",
        },
        { word: "yritys", translationRu: "компания", translationEn: "company" },
        { word: "voitto", translationRu: "победа", translationEn: "victory" },
        { word: "joukkue", translationRu: "команда", translationEn: "team" },
        { word: "ottelu", translationRu: "матч", translationEn: "match" },
        {
          word: "festivaali",
          translationRu: "фестиваль",
          translationEn: "festival",
        },
        { word: "sää", translationRu: "погода", translationEn: "weather" },
        { word: "energia", translationRu: "энергия", translationEn: "energy" },
        { word: "ilmasto", translationRu: "климат", translationEn: "climate" },
        {
          word: "tekniikka",
          translationRu: "техника",
          translationEn: "technology",
        },
        { word: "teatteri", translationRu: "театр", translationEn: "theatre" },
        {
          word: "näyttely",
          translationRu: "выставка",
          translationEn: "exhibition",
        },
        {
          word: "liikunta",
          translationRu: "физическая активность",
          translationEn: "exercise",
        },
        { word: "tiede", translationRu: "наука", translationEn: "science" },
        { word: "ruoka", translationRu: "еда", translationEn: "food" },
        { word: "luonto", translationRu: "природа", translationEn: "nature" },
      ],
      sr: [
        {
          word: "obrazovanje",
          translationRu: "образование",
          translationEn: "education",
        },
        {
          word: "zdravlje",
          translationRu: "здоровье",
          translationEn: "health",
        },
        { word: "sport", translationRu: "спорт", translationEn: "sports" },
        {
          word: "kultura",
          translationRu: "культура",
          translationEn: "culture",
        },
        {
          word: "tehnologija",
          translationRu: "технология",
          translationEn: "technology",
        },
        { word: "muzika", translationRu: "музыка", translationEn: "music" },
        { word: "priroda", translationRu: "природа", translationEn: "nature" },
        { word: "hrana", translationRu: "еда", translationEn: "food" },
        { word: "porodica", translationRu: "семья", translationEn: "family" },
        { word: "posao", translationRu: "работа", translationEn: "job" },
        { word: "pobeda", translationRu: "победа", translationEn: "victory" },
        { word: "igra", translationRu: "игра", translationEn: "game" },
        {
          word: "razvoj",
          translationRu: "развитие",
          translationEn: "development",
        },
        { word: "energija", translationRu: "энергия", translationEn: "energy" },
        {
          word: "vreme",
          translationRu: "погода/время",
          translationEn: "weather/time",
        },
        {
          word: "vežbanje",
          translationRu: "упражнение",
          translationEn: "exercise",
        },
        {
          word: "festival",
          translationRu: "фестиваль",
          translationEn: "festival",
        },
        { word: "umetnost", translationRu: "искусство", translationEn: "art" },
        { word: "nauka", translationRu: "наука", translationEn: "science" },
        { word: "игра", translationRu: "игра", translationEn: "game" },
        { word: "спорт", translationRu: "спорт", translationEn: "sports" },
        { word: "здравље", translationRu: "здоровье", translationEn: "health" },
        {
          word: "култура",
          translationRu: "культура",
          translationEn: "culture",
        },
        { word: "породица", translationRu: "семья", translationEn: "family" },
        {
          word: "развој",
          translationRu: "развитие",
          translationEn: "development",
        },
      ],
      ka: [
        {
          word: "განათლება",
          translationRu: "образование",
          translationEn: "education",
        },
        {
          word: "ჯანმრთელობა",
          translationRu: "здоровье",
          translationEn: "health",
        },
        { word: "სპორტი", translationRu: "спорт", translationEn: "sports" },
        {
          word: "კულტურა",
          translationRu: "культура",
          translationEn: "culture",
        },
        {
          word: "ტექნოლოგია",
          translationRu: "технология",
          translationEn: "technology",
        },
        { word: "მუსიკა", translationRu: "музыка", translationEn: "music" },
        { word: "ბუნება", translationRu: "природа", translationEn: "nature" },
        { word: "საჭმელი", translationRu: "еда", translationEn: "food" },
        { word: "ოჯახი", translationRu: "семья", translationEn: "family" },
        { word: "სამსახური", translationRu: "работа", translationEn: "job" },
        {
          word: "გამარჯვება",
          translationRu: "победа",
          translationEn: "victory",
        },
        { word: "თამაში", translationRu: "игра", translationEn: "game" },
        {
          word: "განვითარება",
          translationRu: "развитие",
          translationEn: "development",
        },
        { word: "ენერგია", translationRu: "энергия", translationEn: "energy" },
        { word: "ამინდი", translationRu: "погода", translationEn: "weather" },
        {
          word: "ვარჯიში",
          translationRu: "упражнение",
          translationEn: "exercise",
        },
        {
          word: "ფესტივალი",
          translationRu: "фестиваль",
          translationEn: "festival",
        },
        { word: "ხელოვნება", translationRu: "искусство", translationEn: "art" },
        {
          word: "მეცნიერება",
          translationRu: "наука",
          translationEn: "science",
        },
        { word: "ფილმი", translationRu: "фильм", translationEn: "film" },
        { word: "წიგნი", translationRu: "книга", translationEn: "book" },
        {
          word: "მასწავლებელი",
          translationRu: "учитель",
          translationEn: "teacher",
        },
        { word: "მოსწავლე", translationRu: "ученик", translationEn: "student" },
        { word: "ქალაქი", translationRu: "город", translationEn: "city" },
        { word: "სოფელი", translationRu: "деревня", translationEn: "village" },
      ],
    };
    return dicts[language] ?? dicts.fi;
  } catch {
    return [];
  }
}
