import { CategoryId } from "@/lib/constants";

export interface NewsArticle {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  category?: CategoryId;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

const NEWSAPI_CATEGORY_MAP: Partial<Record<CategoryId, string>> = {
  sports: "sports",
  culture: "entertainment",
  entertainment: "entertainment",
  science: "science",
  technology: "technology",
  health: "health",
  lifestyle: "general",
  education: "general",
};

const NEWSAPI_KEYWORDS: Partial<Record<CategoryId, string[]>> = {
  lifestyle: ["elämäntapa", "hyvinvointi", "arki", "ruoka", "matkailu"],
  education: [
    "koulutus",
    "oppiminen",
    "koulu",
    "yliopisto",
    "opiskelu",
    "tutkinto",
  ],
};

function assignCategory(
  article: NewsArticle,
  categories: CategoryId[]
): NewsArticle {
  for (const cat of categories) {
    const mapped = NEWSAPI_CATEGORY_MAP[cat];
    if (mapped) {
      const sourceCategory = (article as unknown as Record<string, unknown>)
        .category;
      if (
        sourceCategory === mapped ||
        article.title?.toLowerCase().includes(cat)
      ) {
        return { ...article, category: cat };
      }
    }
    const keywords = NEWSAPI_KEYWORDS[cat];
    if (keywords) {
      const text =
        `${article.title} ${article.description ?? ""}`.toLowerCase();
      if (keywords.some((kw) => text.includes(kw))) {
        return { ...article, category: cat };
      }
    }
  }
  return { ...article, category: categories[0] };
}

const NEWSAPI_COUNTRY_MAP: Record<string, string> = {
  fi: "fi",
  sr: "rs",
  ka: "ge",
};

export async function fetchNewsFromNewsAPI(
  categories: CategoryId[],
  language: string = "fi"
): Promise<NewsArticle[]> {
  const apiKey = process.env.NEWSAPI_KEY;
  if (!apiKey) {
    throw new Error("NEWSAPI_KEY is not configured");
  }

  const url = new URL("https://newsapi.org/v2/top-headlines");
  const country = NEWSAPI_COUNTRY_MAP[language] ?? "fi";
  url.searchParams.set("country", country);
  url.searchParams.set("pageSize", "50");
  url.searchParams.set("apiKey", apiKey);

  const response = await fetch(url.toString(), {
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(`NewsAPI error: ${response.status} ${response.statusText}`);
  }

  const data: NewsApiResponse = await response.json();

  return data.articles
    .filter((a) => a.title && a.title !== "[Removed]")
    .slice(0, 20)
    .map((article) => assignCategory(article, categories));
}

export function filterArticlesByCategory(
  articles: NewsArticle[],
  selectedCategories: CategoryId[]
): NewsArticle[] {
  if (selectedCategories.length === 0) return articles;
  return articles.filter(
    (a) => a.category && selectedCategories.includes(a.category)
  );
}
