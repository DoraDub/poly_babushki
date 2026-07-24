"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, User, Settings, BookOpen, ChartBar as BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserData {
  id: string;
  email?: string;
}

export function AuthStatus() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (!res.ok) {
      toast.error("Ошибка при выходе");
      return;
    }
    setUser(null);
    router.push("/login");
    router.refresh();
  }

  if (loading) return null;

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-8 items-center justify-center rounded-md border border-input bg-background px-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
      >
        Войти
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/stats"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Статистика"
      >
        <BarChart3 className="size-4" />
        <span className="sr-only">Статистика</span>
      </Link>
      <Link
        href="/vocabulary"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Словарь"
      >
        <BookOpen className="size-4" />
        <span className="sr-only">Словарь</span>
      </Link>
      <Link
        href="/settings"
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        title="Настройки"
      >
        <Settings className="size-4" />
        <span className="sr-only">Настройки</span>
      </Link>
      <span className="hidden sm:inline text-sm text-muted-foreground">
        <User className="inline size-3.5 mr-1" />
        {user.email}
      </span>
      <Button variant="ghost" size="sm" onClick={handleLogout}>
        <LogOut className="size-4" />
        <span className="sr-only">Выйти</span>
      </Button>
    </div>
  );
}
