"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { CATEGORIES, DEFAULT_CATEGORIES } from "@/lib/constants";
import type { CategoryId } from "@/lib/constants";
import { LANGUAGES } from "@/lib/config";
import type { LanguageConfig } from "@/lib/config";
import { toast } from "sonner";
import { Save } from "lucide-react";
import {
  getLocalPreferences,
  saveLocalPreferences,
  type LocalPreferences,
} from "@/lib/local-preferences";

export function SettingsForm() {
  const [preferences, setPreferences] = useState<LocalPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const saved = getLocalPreferences();
    if (saved) {
      setPreferences(saved);
    } else {
      setPreferences({
        language: "fi",
        categories: [...DEFAULT_CATEGORIES],
      });
    }
    setLoading(false);
  }, []);

  function toggleCategory(categoryId: CategoryId) {
    if (!preferences) return;
    const current = preferences.categories;
    const updated = current.includes(categoryId)
      ? current.filter((c) => c !== categoryId)
      : [...current, categoryId];
    setPreferences({ ...preferences, categories: updated });
  }

  function setLanguage(code: string) {
    if (!preferences) return;
    setPreferences({ ...preferences, language: code });
  }

  function handleSave() {
    if (!preferences) return;
    setSaving(true);
    const id = toast.loading("Сохраняем...");
    try {
      saveLocalPreferences({
        language: preferences.language,
        categories: preferences.categories,
      });
      toast.success("Настройки сохранены", { id });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка сохранения", {
        id,
      });
    } finally {
      setSaving(false);
    }
  }

  function selectAll() {
    if (!preferences) return;
    setPreferences({
      ...preferences,
      categories: CATEGORIES.map((c) => c.id),
    });
  }

  function deselectAll() {
    if (!preferences) return;
    setPreferences({ ...preferences, categories: [] });
  }

  if (loading) return null;

  if (!preferences) {
    return (
      <p className="text-sm text-muted-foreground">
        Не удалось загрузить настройки.
      </p>
    );
  }

  const allSelected = preferences.categories.length === CATEGORIES.length;
  const noneSelected = preferences.categories.length === 0;

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-lg font-medium">Изучаемый язык</h2>
        <p className="text-sm text-muted-foreground">
          Выберите язык, который хотите изучать
        </p>
        <RadioGroup
          value={preferences.language}
          onValueChange={setLanguage}
          className="grid gap-3"
        >
          {LANGUAGES.map((lang: LanguageConfig) => (
            <div key={lang.code} className="flex items-center gap-3">
              <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
              <Label
                htmlFor={`lang-${lang.code}`}
                className="cursor-pointer text-base"
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name} — {lang.nativeName}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-medium">Категории новостей</h2>
        <p className="text-sm text-muted-foreground">
          Выберите темы новостей, которые вас интересуют
        </p>
        <div className="space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">
              <Checkbox
                id={cat.id}
                checked={preferences.categories.includes(cat.id)}
                onCheckedChange={() => toggleCategory(cat.id)}
              />
              <Label htmlFor={cat.id} className="cursor-pointer text-base">
                {cat.label}
              </Label>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={allSelected ? deselectAll : selectAll}
          >
            {allSelected ? "Снять все" : "Выбрать все"}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          {noneSelected
            ? "Ни одна тема не выбрана"
            : `Выбрано ${preferences.categories.length} из ${CATEGORIES.length}`}
        </p>
      </section>

      <Button onClick={handleSave} disabled={saving}>
        <Save className="size-4 mr-2" />
        {saving ? "Сохранение..." : "Сохранить"}
      </Button>
    </div>
  );
}
