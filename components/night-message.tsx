"use client";

import { Moon } from "lucide-react";

export function NightMessage() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="rounded-full bg-indigo-900/40 p-4">
        <Moon className="size-8 text-indigo-200" />
      </div>
      <p className="text-lg font-medium text-blue-100">Ой, ты чего не спишь?</p>
      <p className="text-sm text-blue-200/70">
        Давай завтра, уже поздно… Бабушке пора отдыхать.
      </p>
    </div>
  );
}
