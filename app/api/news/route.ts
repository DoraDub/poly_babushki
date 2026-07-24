import { NextRequest, NextResponse } from "next/server";
import { fetchNewsFromRSS } from "@/lib/rss";
import { getMockNews } from "@/lib/mock-data";
import { getDefaultLanguage, getLanguageByCode } from "@/lib/config";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const languageParam = searchParams.get("language");

  let selectedLanguage = getDefaultLanguage().code;

  if (languageParam && getLanguageByCode(languageParam)) {
    selectedLanguage = languageParam;
  }

  const fallback = getMockNews(selectedLanguage).slice(0, 20);

  try {
    const rssArticles = await fetchNewsFromRSS(selectedLanguage);
    if (rssArticles.length > 0) {
      return NextResponse.json({ articles: rssArticles });
    }
  } catch {
    // RSS недоступен — используем мок-данные
  }

  return NextResponse.json({ articles: fallback });
}
