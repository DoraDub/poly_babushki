import type { NewsArticle } from "@/lib/newsapi";

const RSS_FEEDS: Record<string, string> = {
  fi: "https://yle.fi/uutiset/rss/uutiset.rss",
  sr: "https://www.rts.rs/rss/",
  ka: "https://www.ambebi.ge/rss/",
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const match = xml.match(regex);
  return match ? match[1].trim() : "";
}

function extractCData(xml: string, tag: string): string {
  const cdataRegex = new RegExp(
    `<${tag}[^>]*>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*</${tag}>`,
    "i"
  );
  const cdataMatch = xml.match(cdataRegex);
  if (cdataMatch) return cdataMatch[1].trim();
  return extractTag(xml, tag);
}

function extractAttribute(xml: string, tag: string, attr: string): string {
  const regex = new RegExp(
    `<${tag}[^>]*\\s${attr}\\s*=\\s*["']([^"']*)["']`,
    "i"
  );
  const match = xml.match(regex);
  return match ? match[1] : "";
}

function parseItems(xml: string): string[] {
  const itemRegex = /<item[\s>]([\s\S]*?)<\/item>/gi;
  const items: string[] = [];
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    items.push(match[1]);
  }
  return items;
}

function itemToArticle(item: string, sourceName: string): NewsArticle | null {
  const title = stripHtml(extractCData(item, "title"));
  if (!title) return null;

  const link = extractCData(item, "link") || extractTag(item, "guid");
  const description =
    stripHtml(extractCData(item, "description")) ||
    stripHtml(extractCData(item, "content:encoded"));
  const pubDate =
    extractCData(item, "pubDate") || extractCData(item, "dc:date");

  let urlToImage: string | null = null;
  const enclosureUrl = extractAttribute(item, "enclosure", "url");
  if (enclosureUrl) {
    urlToImage = enclosureUrl;
  } else {
    const mediaContent = extractAttribute(item, "media:content", "url");
    if (mediaContent) {
      urlToImage = mediaContent;
    } else {
      const imgMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (imgMatch) {
        urlToImage = imgMatch[1];
      }
    }
  }

  const descriptionText = stripHtml(description);

  return {
    source: { id: null, name: sourceName },
    author: extractCData(item, "dc:creator") || null,
    title,
    description: descriptionText || null,
    url: link || "",
    urlToImage,
    publishedAt: pubDate
      ? new Date(pubDate).toISOString()
      : new Date().toISOString(),
    content: descriptionText || null,
  };
}

export async function fetchNewsFromRSS(
  language: string
): Promise<NewsArticle[]> {
  const feedUrl = RSS_FEEDS[language];
  if (!feedUrl) {
    throw new Error(`No RSS feed configured for language: ${language}`);
  }

  const response = await fetch(feedUrl, {
    headers: {
      "User-Agent": "SuomiKoti/1.0 (RSS Reader)",
      Accept: "application/rss+xml, application/xml, text/xml",
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error(
      `RSS fetch error for ${feedUrl}: ${response.status} ${response.statusText}`
    );
  }

  const xml = await response.text();
  const items = parseItems(xml);

  const sourceNames: Record<string, string> = {
    fi: "Yle Uutiset",
    sr: "RTS",
    ka: "Ambebi",
  };

  const articles: NewsArticle[] = [];
  for (const item of items) {
    const article = itemToArticle(item, sourceNames[language] ?? "RSS");
    if (article) {
      articles.push(article);
    }
    if (articles.length >= 20) break;
  }

  return articles;
}
