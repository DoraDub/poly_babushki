import type { UserGender } from "./models";

export function getAddressForm(
  gender: UserGender,
  male: string,
  female: string,
  neutral: string
): string {
  switch (gender) {
    case "male":
      return male;
    case "female":
      return female;
    case "neutral":
      return neutral;
  }
}

export function applyGenderToText(
  text: string,
  userName: string,
  gender: UserGender
): string {
  let result = text.replace(/\{name\}/g, userName);

  result = result.replace(/\{sine\|\ćerko\|brate\}/g, () =>
    getAddressForm(gender, "sine", "ćerko", "brate")
  );
  result = result.replace(/\{bio\|\la\}/g, () =>
    getAddressForm(gender, "bio", "la", "bio/la")
  );
  result = result.replace(/\{išao\|\išla\}/g, () =>
    getAddressForm(gender, "išao", "išla", "išao/la")
  );
  result = result.replace(/\{gledao\|\la\}/g, () =>
    getAddressForm(gender, "gledao", "gledala", "gledao/la")
  );
  result = result.replace(/\{bichi\|gogo\|джан\}/g, () =>
    getAddressForm(gender, "bichi", "gogo", "джан")
  );
  result = result.replace(/\{došao\|\došla\}/g, () =>
    getAddressForm(gender, "došao", "došla", "došao/la")
  );

  return result;
}

export function getGenderSystemPromptSuffix(
  userName: string,
  gender: UserGender
): string {
  const genderRule =
    gender === "male"
      ? "Käytä maskuliinisia puhuttelumuotoja (poika, mies)."
      : gender === "female"
        ? "Käytä feminiinisiä puhuttelumuotoja (tyttö, nainen)."
        : "Käytä universaaleja, sukupuolineutraaleja puhuttelumuotoja.";

  return `\n\nKäyttäjän nimi on ${userName}. Kutsu häntä AINA nimellä tervehdyksissä, kehuissa ja lohdutuksissa.\n${genderRule}`;
}

export function getGenderLabel(gender: UserGender, langCode: string): string {
  switch (gender) {
    case "male":
      return langCode === "fi" ? "poika" : langCode === "sr" ? "sin" : "bichi";
    case "female":
      return langCode === "fi" ? "tyttö" : langCode === "sr" ? "ćerko" : "gogo";
    case "neutral":
      return "";
  }
}
