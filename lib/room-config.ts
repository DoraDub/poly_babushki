export type TimeOfDay = "morning" | "day" | "evening" | "night";

export interface RoomBackgroundConfig {
  gradient: string;
  label: string;
  textClass: string;
  accentColor: string;
}

export interface CountryRoomConfig {
  backgrounds: Record<TimeOfDay, RoomBackgroundConfig>;
  name: string;
}

export function getTimeOfDay(hour?: number): TimeOfDay {
  const h = hour ?? new Date().getHours();
  if (h >= 6 && h < 11) return "morning";
  if (h >= 11 && h < 17) return "day";
  if (h >= 17 && h < 22) return "evening";
  return "night";
}

export function isNightTime(hour?: number): boolean {
  return getTimeOfDay(hour) === "night";
}

export const COUNTRY_ROOM_CONFIGS: Record<string, CountryRoomConfig> = {
  fi: {
    name: "Финляндия",
    backgrounds: {
      morning: {
        gradient:
          "linear-gradient(180deg, #fef3c7 0%, #fde68a 20%, #ffedd5 40%, #d4b896 70%, #c9a97e 100%)",
        label: "Huomenta — Утро в финском доме",
        textClass: "text-amber-900",
        accentColor: "amber",
      },
      day: {
        gradient:
          "linear-gradient(180deg, #e0f2fe 0%, #fef3c7 15%, #fef3c7 40%, #d4b896 70%, #c9a97e 100%)",
        label: "Päivää — День в финском доме",
        textClass: "text-amber-900",
        accentColor: "amber",
      },
      evening: {
        gradient:
          "linear-gradient(180deg, #fed7aa 0%, #fdba74 20%, #fcd34d 40%, #d4b896 70%, #bf9d6e 100%)",
        label: "Iltaa — Вечер в финском доме",
        textClass: "text-orange-900",
        accentColor: "orange",
      },
      night: {
        gradient:
          "linear-gradient(180deg, #1e1b4b 0%, #312e81 20%, #1e293b 50%, #0f172a 80%, #020617 100%)",
        label: "Öitä — Ночь в финском доме",
        textClass: "text-blue-100",
        accentColor: "indigo",
      },
    },
  },
  sr: {
    name: "Сербия",
    backgrounds: {
      morning: {
        gradient:
          "linear-gradient(180deg, #fef9c3 0%, #fde68a 20%, #ffedd5 40%, #d4a574 70%, #c4956a 100%)",
        label: "Jutro — Утро в сербском доме",
        textClass: "text-amber-900",
        accentColor: "amber",
      },
      day: {
        gradient:
          "linear-gradient(180deg, #e0f2fe 0%, #fef9c3 15%, #fef3c7 40%, #d4a574 70%, #c4956a 100%)",
        label: "Dan — День в сербском доме",
        textClass: "text-amber-900",
        accentColor: "amber",
      },
      evening: {
        gradient:
          "linear-gradient(180deg, #fecaca 0%, #fca5a5 20%, #fdba74 40%, #d4a574 70%, #b8845a 100%)",
        label: "Veče — Вечер в сербском доме",
        textClass: "text-red-900",
        accentColor: "red",
      },
      night: {
        gradient:
          "linear-gradient(180deg, #1e1b4b 0%, #4c1d95 20%, #1e293b 50%, #0f172a 80%, #020617 100%)",
        label: "Noć — Ночь в сербском доме",
        textClass: "text-blue-100",
        accentColor: "violet",
      },
    },
  },
  ka: {
    name: "Грузия",
    backgrounds: {
      morning: {
        gradient:
          "linear-gradient(180deg, #fef3c7 0%, #fbbf24 20%, #fde68a 40%, #d4a574 70%, #c4956a 100%)",
        label: "Dila mshvidobisa — Утро в грузинском доме",
        textClass: "text-amber-900",
        accentColor: "yellow",
      },
      day: {
        gradient:
          "linear-gradient(180deg, #e0f2fe 0%, #fef3c7 15%, #fef9c3 40%, #d4a574 70%, #c4956a 100%)",
        label: "Dghe — День в грузинском доме",
        textClass: "text-amber-900",
        accentColor: "amber",
      },
      evening: {
        gradient:
          "linear-gradient(180deg, #fbbf24 0%, #f59e0b 20%, #f97316 40%, #d4a574 70%, #b8845a 100%)",
        label: "Saghamo — Вечер в грузинском доме",
        textClass: "text-orange-900",
        accentColor: "orange",
      },
      night: {
        gradient:
          "linear-gradient(180deg, #1e1b4b 0%, #5b21b6 20%, #1e293b 50%, #0f172a 80%, #020617 100%)",
        label: "Ghame — Ночь в грузинском доме",
        textClass: "text-blue-100",
        accentColor: "indigo",
      },
    },
  },
};

export function getRoomConfig(countryCode: string = "fi"): CountryRoomConfig {
  return COUNTRY_ROOM_CONFIGS[countryCode] ?? COUNTRY_ROOM_CONFIGS.fi;
}

export function getBackgroundForTimeOfDay(
  countryCode: string,
  timeOfDay: TimeOfDay
): RoomBackgroundConfig {
  const config = getRoomConfig(countryCode);
  return config.backgrounds[timeOfDay];
}

export function getPngBackgroundUrl(
  countryCode: string,
  timeOfDay: TimeOfDay
): string {
  return `/assets/backgrounds/${countryCode}/${timeOfDay}.png`;
}
