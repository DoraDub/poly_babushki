"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sparkles, User, Loader as Loader2, Globe, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { saveLocalProfile } from "@/lib/local-profile";
import { saveLocalPreferences } from "@/lib/local-preferences";
import { LANGUAGES } from "@/lib/config";
import type { UserGender } from "@/lib/models";
import type { LanguageConfig } from "@/lib/config";
import { DEFAULT_CATEGORIES } from "@/lib/constants";

export function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState<"language" | "profile">("language");
  const [language, setLanguage] = useState<string>("fi");
  const [name, setName] = useState("");
  const [gender, setGender] = useState<UserGender>("neutral");
  const [saving, setSaving] = useState(false);

  const selectedLanguage: LanguageConfig | undefined = LANGUAGES.find(
    (l) => l.code === language
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    try {
      saveLocalProfile({ name: name.trim(), gender, language });
      saveLocalPreferences({
        language,
        categories: [...DEFAULT_CATEGORIES],
      });
      toast.success("Приятно познакомиться, " + name.trim() + "!");
      router.push("/");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  }

  if (step === "language") {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mb-4">
              <Globe className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-amber-900">
              Какой язык вы хотите учить?
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Выберите язык, и бабушка из этой страны станет вашей проводницей
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setStep("profile");
                }}
                className="w-full flex items-center gap-4 rounded-lg border p-4 text-left hover:bg-accent transition-colors cursor-pointer group"
              >
                <span className="text-3xl">{lang.flag}</span>
                <div className="flex-1">
                  <div className="font-medium text-base">{lang.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {lang.nativeName} — бабушка {lang.grandma.name}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 mb-4">
            <Sparkles className="h-8 w-8 text-amber-600" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-amber-900">
            Давайте познакомимся!
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            {selectedLanguage?.flag} {selectedLanguage?.name}. Бабушка{" "}
            {selectedLanguage?.grandma.name} хочет узнать, как к вам обращаться
          </p>
          <Button
            variant="link"
            size="sm"
            className="mt-1 text-xs text-muted-foreground"
            onClick={() => setStep("language")}
          >
            Сменить язык
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Как вас зовут?
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                className="pl-9"
                maxLength={100}
                autoFocus
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Как бабушке к вам обращаться?
            </Label>
            <RadioGroup
              value={gender}
              onValueChange={(v) => setGender(v as UserGender)}
            >
              <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
                <RadioGroupItem value="male" className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Мужской</div>
                  <div className="text-xs text-muted-foreground">
                    Бабушка будет обращаться ко мне в мужском роде
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
                <RadioGroupItem value="female" className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Женский</div>
                  <div className="text-xs text-muted-foreground">
                    Бабушка будет обращаться ко мне в женском роде
                  </div>
                </div>
              </label>
              <label className="flex items-start gap-3 rounded-lg border p-3 cursor-pointer hover:bg-accent transition-colors has-[:checked]:border-amber-500 has-[:checked]:bg-amber-50">
                <RadioGroupItem value="neutral" className="mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Нейтральный</div>
                  <div className="text-xs text-muted-foreground">
                    Бабушка будет использовать универсальные формы
                  </div>
                </div>
              </label>
            </RadioGroup>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!name.trim() || saving}
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Сохраняем...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Познакомиться
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
