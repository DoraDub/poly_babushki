"use client";

import { useState } from "react";
import { ExternalLink, Newspaper, Bookmark, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsArticle } from "@/lib/newsapi";
import { CATEGORIES } from "@/lib/constants";
import { WordHighlighter } from "@/components/word-highlighter";
import { ChatDialog } from "@/components/chat-dialog";
import { BonusTaskPanel } from "@/components/bonus-task-panel";
import { RecipeDialog } from "@/components/recipe-dialog";
import type { RecipeData } from "@/lib/recipes";
import { pickTask, type BonusTask } from "@/lib/bonus-tasks";
import { incrementLocalStreak } from "@/lib/local-streak";
import { incrementNewsRead } from "@/lib/local-stats";

const CATEGORY_LABELS: Record<string, string> = {};
for (const cat of CATEGORIES) {
  CATEGORY_LABELS[cat.id] = cat.label;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function NewsCard({
  article,
  language,
}: {
  article: NewsArticle;
  language: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [bonusTask, setBonusTask] = useState<BonusTask | null>(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);
  const [recipeDialogOpen, setRecipeDialogOpen] = useState(false);

  async function checkRecipeUnlock() {
    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
      if (!res.ok) {
        if (res.status === 409 || res.status === 404) return;
        throw new Error("Ошибка");
      }
      const data = await res.json();
      if (data.recipeData) {
        setRecipeData(data.recipeData);
        setRecipeDialogOpen(true);
        toast.success(`${data.emoji} Бабушка поделилась рецептом!`, {
          description: `${data.title} — ${data.titleRu}`,
          action: {
            label: "Открыть",
            onClick: () => setRecipeDialogOpen(true),
          },
        });
      }
    } catch {
      // silently fail
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (open) {
          setTaskCompleted(false);
          const articleText = `${article.title} ${article.description ?? ""} ${article.content ?? ""}`;
          const picked = pickTask(language, articleText);
          setBonusTask(picked);
          incrementLocalStreak();
          const newStats = incrementNewsRead(language);
          if (newStats.newsRead > 0 && newStats.newsRead % 5 === 0) {
            checkRecipeUnlock();
          }
        }
      }}
    >
      <DialogTrigger className="text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 rounded-xl">
        <Card className="card-hover">
          <CardHeader className="p-3 pb-1">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-sm leading-snug line-clamp-2">
                {article.title}
              </CardTitle>
              {article.category && (
                <Badge
                  variant="secondary"
                  className="shrink-0 text-[10px] px-1.5 py-0"
                >
                  {CATEGORY_LABELS[article.category] ?? article.category}
                </Badge>
              )}
            </div>
            <CardDescription>
              <span className="text-xs text-muted-foreground">
                {article.source.name}
                {article.author ? ` — ${article.author}` : ""}
                {" · "}
                {formatDate(article.publishedAt)}
              </span>
            </CardDescription>
          </CardHeader>
          {article.description && (
            <CardContent className="p-3 pt-1">
              <p className="text-xs text-foreground/80 leading-relaxed line-clamp-2">
                {article.description}
              </p>
            </CardContent>
          )}
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg leading-snug">
            {article.title}
          </DialogTitle>
          <DialogDescription>
            <span className="text-xs text-muted-foreground">
              {article.source.name}
              {article.author ? ` — ${article.author}` : ""}
              {" · "}
              {formatDate(article.publishedAt)}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {article.description && (
            <p className="text-sm text-foreground/80 leading-relaxed">
              {article.description}
            </p>
          )}
          {article.content && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {article.content}
            </p>
          )}
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-amber-800 hover:text-amber-600 underline underline-offset-2"
          >
            <ExternalLink className="size-3.5" />
            Lue alkuperäinen artikkeli
          </a>
          <div className="border-t border-amber-200/50 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-medium text-amber-700 mb-1">
              <Bookmark className="size-3.5" />
              Sanastoa
            </div>
            <WordHighlighter
              text={`${article.title} ${article.description ?? ""} ${article.content ?? ""}`}
              language={language}
              articleUrl={article.url}
              articleTitle={article.title}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setChatOpen(true)}
            className="w-full gap-2 border-amber-300/50 text-amber-800 hover:bg-amber-100/80"
          >
            <MessageCircle className="size-4" />
            Обсудить с бабушкой
          </Button>
          {bonusTask && !taskCompleted && (
            <BonusTaskPanel
              task={bonusTask}
              language={language}
              onCompleted={() => setTaskCompleted(true)}
            />
          )}
        </div>
      </DialogContent>
      <ChatDialog
        open={chatOpen}
        onOpenChange={setChatOpen}
        articleUrl={article.url}
        articleTitle={article.title}
        articleContent={`${article.description ?? ""} ${article.content ?? ""}`}
        language={language}
      />
      {recipeData && (
        <RecipeDialog
          open={recipeDialogOpen}
          onOpenChange={setRecipeDialogOpen}
          recipe={recipeData}
          language={language}
        />
      )}
    </Dialog>
  );
}

export function NewsCatalogSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex items-start justify-between gap-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-20 shrink-0" />
            </div>
            <Skeleton className="h-3 w-1/2 mt-1" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mt-2" />
            <Skeleton className="h-4 w-4/6 mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function NewsCatalogEmpty({
  message = "Ei uutisia valituilla kategorioilla",
}: {
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-muted-foreground">
      <div className="rounded-full bg-muted p-4">
        <Newspaper className="size-8" />
      </div>
      <p className="text-sm italic">{message}</p>
    </div>
  );
}

export function NewsCatalog({
  articles,
  language = "fi",
  loading = false,
}: {
  articles: NewsArticle[];
  language?: string;
  loading?: boolean;
}) {
  if (loading) {
    return <NewsCatalogSkeleton />;
  }

  if (articles.length === 0) {
    return <NewsCatalogEmpty />;
  }

  return (
    <div className="flex flex-col gap-2">
      {articles.map((article) => (
        <NewsCard key={article.url} article={article} language={language} />
      ))}
    </div>
  );
}
