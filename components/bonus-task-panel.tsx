"use client";

import { useState } from "react";
import { Gift, Check, Sparkles, Search, Pencil } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { markTaskCompleted, type BonusTask } from "@/lib/bonus-tasks";

interface BonusTaskPanelProps {
  task: BonusTask;
  language: string;
  onCompleted: () => void;
}

export function BonusTaskPanel({
  task,
  language,
  onCompleted,
}: BonusTaskPanelProps) {
  const [completed, setCompleted] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  if (completed) return null;

  function handleFindWord() {
    setCompleted(true);
    markTaskCompleted(task.type, task.word);
    toast.success(`Задание выполнено! +${task.rewardBonus} баллов`, {
      icon: <Sparkles className="size-4 text-amber-500" />,
      duration: 4000,
    });
    onCompleted();
  }

  function handleMakeSentence() {
    const trimmed = inputValue.trim();
    const wordCount = trimmed.split(/\s+/).length;

    if (wordCount < 3) {
      setError("Нужно минимум 3 слова");
      return;
    }

    if (!trimmed.toLowerCase().includes(task.word.toLowerCase())) {
      setError(`Предложение должно содержать слово «${task.word}»`);
      return;
    }

    setError("");
    setCompleted(true);
    markTaskCompleted(task.type, task.word);
    toast.success(`Отличное предложение! +${task.rewardBonus} баллов`, {
      icon: <Sparkles className="size-4 text-amber-500" />,
      duration: 4000,
    });
    onCompleted();
  }

  const grandmaName =
    language === "fi" ? "Мария" : language === "sr" ? "Гроздана" : "Кетеван";

  return (
    <div className="rounded-xl border border-amber-200/60 bg-gradient-to-br from-amber-50/80 to-orange-50/80 p-4 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
          {task.type === "find_word" ? (
            <Search className="size-4" />
          ) : (
            <Pencil className="size-4" />
          )}
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <p className="text-xs font-medium text-amber-600">
              {grandmaName} даёт задание
            </p>
            <p className="text-sm text-foreground/90 mt-0.5">
              {task.description}
            </p>
          </div>

          {task.type === "find_word" ? (
            <Button
              onClick={handleFindWord}
              size="sm"
              className="gap-1.5 bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Check className="size-3.5" />
              Нашёл!
            </Button>
          ) : (
            <div className="space-y-2">
              <Input
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  if (error) setError("");
                }}
                placeholder={`Напиши предложение с «${task.word}»...`}
                className="border-amber-200/60 bg-white/80 text-sm"
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
              <Button
                onClick={handleMakeSentence}
                size="sm"
                className="gap-1.5 bg-amber-600 hover:bg-amber-700 text-white"
              >
                <Gift className="size-3.5" />
                Готово
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
