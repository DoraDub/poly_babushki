"use client";

import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageCircle, Send, Languages, Lightbulb, Loader as Loader2, Sparkles } from "lucide-react";
import { incrementLocalStreak } from "@/lib/local-streak";

interface ChatMessage {
  sessionId: string;
  createdAt: string;
  role: "user" | "assistant";
  content: string;
  translationRu?: string;
  translationEn?: string;
}

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleUrl: string;
  articleTitle: string;
  articleContent: string;
  language?: string;
}

export function ChatDialog({
  open,
  onOpenChange,
  articleUrl,
  articleTitle,
  articleContent,
  language,
}: ChatDialogProps) {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [translating, setTranslating] = useState<string | null>(null);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [hinting, setHinting] = useState(false);
  const [hint, setHint] = useState<string | null>(null);
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (open && !sessionId && !startedRef.current) {
      startedRef.current = true;
      setOfflineMessage(null);
      startChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function startChat() {
    setLoading(true);
    setOfflineMessage(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleUrl,
          articleTitle,
          articleContent: articleContent || articleTitle,
          language,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка начала диалога");
      }

      const data = await res.json();
      setSessionId(data.sessionId);
      setMessages(data.messages);
      incrementLocalStreak();
    } catch {
      setOfflineMessage(
        "Нет подключения к интернету. Диалог с бабушкой будет доступен, когда появится сеть."
      );
    } finally {
      setLoading(false);
    }
  }

  async function sendMessage() {
    if (!input.trim() || !sessionId) return;

    const userText = input.trim();
    setInput("");
    setHint(null);
    setTranslations({});
    setOfflineMessage(null);

    setMessages((prev) => [
      ...prev,
      {
        sessionId,
        createdAt: new Date().toISOString(),
        role: "user",
        content: userText,
      },
    ]);

    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: userText, language }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка отправки сообщения");
      }

      const data = await res.json();
      setMessages(data.messages);
      incrementLocalStreak();
    } catch {
      setOfflineMessage("Нет подключения к интернету. Ответ не отправлен.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleTranslation(msg: ChatMessage) {
    if (translations[msg.createdAt]) {
      setTranslations((prev) => {
        const next = { ...prev };
        delete next[msg.createdAt];
        return next;
      });
      return;
    }

    setTranslating(msg.createdAt);
    try {
      const res = await fetch("/api/chat/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: msg.content, language }),
      });

      if (!res.ok) throw new Error("Ошибка перевода");

      const data = await res.json();
      setTranslations((prev) => ({
        ...prev,
        [msg.createdAt]: data.translationRu || data.translationEn,
      }));
    } catch {
      setTranslations((prev) => ({
        ...prev,
        [msg.createdAt]:
          msg.translationRu ||
          msg.translationEn ||
          "(перевод недоступен офлайн)",
      }));
    } finally {
      setTranslating(null);
    }
  }

  async function getHint() {
    if (!sessionId) return;
    setHinting(true);
    try {
      const res = await fetch("/api/chat/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, language }),
      });

      if (!res.ok) throw new Error("Ошибка получения подсказки");

      const data = await res.json();
      setHint(data.hint);
    } catch {
      setOfflineMessage("Нет подключения к интернету. Подсказка недоступна.");
    } finally {
      setHinting(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-serif">
            <Sparkles className="size-4 text-amber-600" />
            Обсудить с бабушкой
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[50vh] pr-1 space-y-3">
          {loading && messages.length === 0 ? (
            <div className="flex flex-col gap-3 p-4">
              <Skeleton className="h-16 w-3/4 rounded-lg" />
              <Skeleton className="h-10 w-1/2 rounded-lg ml-auto" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground">
              <MessageCircle className="size-8 mb-2 text-amber-600/50" />
              <p className="text-sm italic">Mummo miettii...</p>
            </div>
          ) : (
            messages.map((msg) => {
              const isAssistant = msg.role === "assistant";
              const showTranslation = translations[msg.createdAt];

              return (
                <div
                  key={msg.createdAt}
                  className={`flex ${isAssistant ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      isAssistant
                        ? "bg-amber-100/80 border border-amber-200/50 text-amber-950"
                        : "bg-amber-700 text-white"
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">
                      {msg.content}
                    </p>
                    {showTranslation && (
                      <p className="mt-1.5 text-xs italic border-t border-amber-200/40 pt-1 text-amber-700/80">
                        {showTranslation}
                      </p>
                    )}
                    {isAssistant && (
                      <div className="flex gap-1.5 mt-1.5">
                        <button
                          onClick={() => toggleTranslation(msg)}
                          className="inline-flex items-center gap-1 text-[10px] text-amber-600/70 hover:text-amber-800 transition-colors"
                          disabled={translating === msg.createdAt}
                        >
                          {translating === msg.createdAt ? (
                            <Loader2 className="size-3 animate-spin" />
                          ) : (
                            <Languages className="size-3" />
                          )}
                          {showTranslation ? "piilota käännös" : "käännä"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
          {loading && messages.length > 0 && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-3 py-2 bg-amber-100/80 border border-amber-200/50">
                <div className="flex gap-1">
                  <div className="size-1.5 rounded-full bg-amber-500 animate-bounce" />
                  <div className="size-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.1s]" />
                  <div className="size-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {offlineMessage && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 text-xs text-amber-800 flex items-start gap-2">
            <span>{offlineMessage}</span>
          </div>
        )}

        {hint && (
          <div className="bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-2 text-xs text-amber-800 flex items-start gap-2">
            <Lightbulb className="size-3.5 mt-0.5 shrink-0 text-amber-600" />
            <span>{hint}</span>
            <button
              onClick={() => setHint(null)}
              className="text-amber-400 hover:text-amber-600 ml-auto shrink-0"
            >
              &times;
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 pt-2 border-t">
          <Button
            variant="outline"
            size="icon"
            onClick={getHint}
            disabled={hinting || loading || messages.length === 0}
            title="Помочь с ответом"
            className="shrink-0 size-9"
          >
            {hinting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Lightbulb className="size-4" />
            )}
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Kirjoita suomeksi..."
            disabled={loading || !sessionId}
            className="flex-1"
          />
          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading || !sessionId}
            className="shrink-0 size-9"
          >
            <Send className="size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
