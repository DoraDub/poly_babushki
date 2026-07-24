import { RoomScene } from "@/components/room-scene";
import type { NewsArticle } from "@/lib/newsapi";
import { getMockNews } from "@/lib/mock-data";
import { fetchNewsFromRSS } from "@/lib/rss";
import { getDefaultLanguage, getLanguageByCode } from "@/lib/config";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

async function getNews(): Promise<{
  articles: NewsArticle[];
  language: string;
}> {
  let selectedLanguage = getDefaultLanguage().code;

  const cookieStore = await cookies();
  const langCookie = cookieStore.get("language_preference")?.value;
  if (langCookie && getLanguageByCode(langCookie)) {
    selectedLanguage = langCookie;
  }

  let articles: NewsArticle[];
  try {
    articles = await fetchNewsFromRSS(selectedLanguage);
  } catch {
    articles = getMockNews(selectedLanguage).slice(0, 20);
  }

  return { articles, language: selectedLanguage };
}

export default async function HomePage() {
  const { articles, language } = await getNews();

  return <RoomScene articles={articles} language={language} />;
}
