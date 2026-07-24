export const CATEGORIES = [
  { id: "culture", label: "Культура" },
  { id: "entertainment", label: "Развлечения" },
  { id: "lifestyle", label: "Образ жизни" },
  { id: "science", label: "Наука" },
  { id: "technology", label: "Технологии" },
  { id: "health", label: "Здоровье" },
  { id: "education", label: "Образование" },
  { id: "sports", label: "Спорт" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const DEFAULT_CATEGORIES: CategoryId[] = [
  "culture",
  "entertainment",
  "lifestyle",
  "science",
  "technology",
  "health",
  "education",
  "sports",
];
