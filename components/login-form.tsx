"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Mail, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const endpoint =
      mode === "login" ? "/api/auth/login" : "/api/auth/register";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Произошла ошибка");
      return;
    }

    toast.success(mode === "login" ? "Добро пожаловать!" : "Аккаунт создан!");
    router.push("/");
    router.refresh();
  }

  async function handleMagicLink() {
    if (!email) {
      toast.error("Введите email");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      toast.error(data.error || "Ошибка при отправке ссылки");
      return;
    }

    setMagicLinkSent(true);
    toast.success("Магическая ссылка отправлена на почту!");
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{mode === "login" ? "Вход" : "Регистрация"}</CardTitle>
        <CardDescription>
          {mode === "login"
            ? "Войдите в свой аккаунт"
            : "Создайте новый аккаунт"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {mode === "login" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                autoComplete="current-password"
              />
            </div>
          )}
          {mode === "register" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Пароль
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {mode === "login" && (
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              )}
              <KeyRound className="size-4" />
              Войти с паролем
            </Button>
          )}
          {mode === "register" && (
            <Button className="w-full" disabled={loading}>
              {loading && (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              )}
              Зарегистрироваться
            </Button>
          )}
          {mode === "login" && !magicLinkSent && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              disabled={loading}
              onClick={handleMagicLink}
            >
              {loading ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <Mail className="size-4" />
              )}
              Войти по магической ссылке
            </Button>
          )}
          {magicLinkSent && (
            <p className="text-sm text-center text-muted-foreground">
              ✉️ Проверьте почту — ссылка для входа отправлена
            </p>
          )}
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => {
              setMode(mode === "login" ? "register" : "login");
              setPassword("");
              setMagicLinkSent(false);
            }}
          >
            {mode === "login"
              ? "Нет аккаунта? Зарегистрироваться"
              : "Уже есть аккаунт? Войти"}
          </button>
        </CardFooter>
      </form>
    </Card>
  );
}
