import type { ChatMessage } from "./models";
import {
  getLanguageByCode,
  getDefaultLanguage,
  type LanguageConfig,
  type GrandmaProfile,
} from "./config";
import {
  getFamilyLoreStage,
  hasAffectionateNicknames,
  getAuntieNicknames,
  getFamilyMembersForStage,
  getMockFamilyOpeningExtra,
  getMockFamilyFollowUpExtra,
} from "./family-lore";
import { applyGenderToText, getGenderSystemPromptSuffix } from "./gender-utils";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

function isOpenAIConfigured(): boolean {
  return !!OPENAI_API_KEY;
}

function getLanguageAndGrandma(languageCode?: string): {
  lang: LanguageConfig;
  code: string;
} {
  const lang =
    (languageCode ? getLanguageByCode(languageCode) : null) ??
    getDefaultLanguage();
  return { lang, code: lang.code };
}

function buildSystemFamilyLoreSection(
  grandma: GrandmaProfile,
  streak: number
): string {
  const stage = getFamilyLoreStage(streak);
  if (stage === 0) return "";

  const parts: string[] = [];

  const familyMembers = getFamilyMembersForStage(grandma, stage);

  if (stage === 1 && familyMembers.length > 0) {
    const names = familyMembers
      .map((f) => `${f.name} (${f.relation})`)
      .join(", ");
    parts.push(
      `7. Mainitset joskus perheesi olemassaolon: ${names}. Älä mene yksityiskohtiin.`
    );
  }

  if (stage === 2 && familyMembers.length > 0) {
    const names = familyMembers
      .map((f) => `${f.name} (${f.relation})`)
      .join(", ");
    parts.push(
      `7. Mainitset perheenjäseniä toisinaan nimeltä: ${names}. Kerro lyhyitä arkisia tarinoita heistä, kun se on luontevaa.`
    );
  }

  if (stage >= 3 && familyMembers.length > 0) {
    const desc = familyMembers
      .map((f) => `${f.name} (${f.relation})`)
      .join(", ");
    parts.push(
      `7. Kerrot usein lämpimiä tarinoita perheestäsi: ${desc}. Jaa muistoja ja viimeaikaisia tapahtumia, joissa he ovat mukana.`
    );
  }

  if (hasAffectionateNicknames(stage)) {
    const nickData = getAuntieNicknames(grandma.id);
    if (nickData) {
      parts.push(
        `8. Koska olemme tunteneet yli 30 päivää, käytät ERITTÄIN HELLITTELYTAVOITTELEVIA puhutteluja: ${nickData.nicknames.join(", ")}. ${nickData.description}. Korvaa tavalliset puhuttelusi näillä henkilökohtaisemmilla.`
      );
    }
  }

  return parts.join("\n");
}

function buildSystemPrompt(
  articleTitle: string,
  articleContent: string,
  languageCode?: string,
  streak?: number,
  userName?: string,
  userGender?: string
): string {
  const { lang } = getLanguageAndGrandma(languageCode);
  const g = lang.grandma;

  const addresses = g.speechPortrait.addresses.join(", ");
  const exclamations = g.speechPortrait.exclamations.join(", ");
  const themes = g.keyThemes.join(", ");
  const familyDesc = g.family
    .map((f) => `${f.name} (${f.relation}) — ${f.description}`)
    .join(". ");

  const loreStage = streak !== undefined ? getFamilyLoreStage(streak) : 0;
  const loreSection = buildSystemFamilyLoreSection(g, loreStage);

  return `Olet ${g.name}, ${g.city}issa asuva mummo. ${g.biography}
Olet luonteeltasi: ${g.character}

Perheesi: ${familyDesc}

Puhetyylisi: ${g.speechPortrait.style}
Käytät usein näitä ilmauksia: ${exclamations}
Käytät näitä puhutteluja: ${addresses}
${g.speechPortrait.diminutivePattern ? `Käytät paljon hellittelymuotoja: ${g.speechPortrait.diminutivePattern}` : ""}
Puhut mielelläsi näistä aiheista: ${themes}

Keskustelet nyt uutisesta: "${articleTitle}"

Uutisen sisältö: ${articleContent}

Tärkeimmät säännöt:
1. Puhut aina NYT-valitulla kielellä (${g.city}n kotikieli), et koskaan venäjää tai englantia
2. Käytät puheessasi uutisen avainsanoja
3. Puhut kuin oikea ${g.name} - käytä tunnusomaisia ilmauksiasi ja puhuttelujasi
4. Kysyt kysymyksiä, jotka kannustavat käyttäjää puhumaan kohdekielellä
5. Olet kannustava ja ymmärtäväinen, kuten oikea mummo
6. Vastaat lyhyesti, 2-3 lausetta kerrallaan
${loreSection}${userName && userGender ? getGenderSystemPromptSuffix(userName, userGender as "male" | "female" | "neutral") : ""}`;
}

function buildHintPrompt(
  articleTitle: string,
  lastMessage: string,
  languageCode?: string
): string {
  const { lang } = getLanguageAndGrandma(languageCode);
  const g = lang.grandma;
  const langName = lang.nativeName;

  return `Olet ${langName}n kielen opettaja. Autat oppilasta vastaamaan ${g.name}-mummon viestiin ${langName}ksi.

Uutinen: "${articleTitle}"
${g.name}n viimeisin viesti: "${lastMessage}"

Anna lyhyt ehdotus (1-2 lausetta ${langName}ksi), mitä oppilas voisi vastata mummolle. 
Kirjoita ehdotus KOHDEKIELELLÄ (${langName}). Lisää sitten suluissa lyhyt selitys venäjäksi.`;
}

function buildTranslationPrompt(text: string, languageCode?: string): string {
  const { lang } = getLanguageAndGrandma(languageCode);
  const langName = lang.nativeName;

  return `Käännä seuraava ${langName}nkielinen teksti venäjäksi ja englanniksi. 
Vastaa ainoastaan JSON-muodossa: {"translationRu": "...", "translationEn": "..."}

Teksti: "${text}"`;
}

interface GrandmaMockData {
  grandmaId: string;
  responses: Record<string, string>;
  followUps: string[];
}

const MOCK_GRANDMA_DATA: GrandmaMockData[] = [
  {
    grandmaId: "maria",
    responses: {
      culture:
        "Voi miten ihanaa, kultaseni! Helsingin juhlaviikot on niin kaunis asia. Muistan kun kävin siellä viimeksi Tuulin kanssa — se oli elämyksellistä! Oletko sinä käynyt koskaan?",
      sports:
        "No niin, Suomi voitti taas! Kas kummaa, aina se ilahduttaa. Minä en itse urheilua paljon seuraa, mutta välillä katselen kun Tuuli katsoo jääkiekkoa. Seurasyitkö sinä ottelua, kulta?",
      entertainment:
        "Oi, mitä kaikkea kulttuuria! Minusta on niin hienoa, että nuoret ihmiset järjestävät tapahtumia. Itse tykkään lukea kirjoja ja katsella luontoa. Mitä sinä tykkäät tehdä vapaa-ajallasi?",
      lifestyle:
        "Voi hyvä tavaton! Lämmin viikonloppu on tulossa. Minä ajattelin mennä metsään poimimaan mustikoita, jos jaksan. Tykkäätkö sinä marjastaa, kultaseni?",
      technology:
        "Voi miten jännittävää! Tästä teknologiasta en minä paljon ymmärrä, mutta on se hienoa että nuoret keksivät. Minä osaan just ja just lähettää viestejä. Osaatko sinä käyttää tällaisia juttuja?",
      science:
        "Sepä kiinnostavaa! Tutkimus on tärkeää. Muistan kun opetin koulussa — aina sanoin oppilaille, että uteliaisuus on tärkein asia. Oletko sinä utelias ihminen, rakas?",
      health:
        "Liikunta on tosi tärkeää, pieni. Minä kävelen joka päivä lenkin meren rannassa, vaikka sataisi. Tuuli sanoo että olen itsepäinen. Mikä on sinun lempitapasi liikkua?",
      education:
        "Kuule, kulta! Luin juuri tämän uutisen koulutuksesta. Koulutus on niin tärkeää — sen minä tiedän kokemuksesta! Mitä mieltä sinä olet tästä uudesta ohjelmasta?",
    },
    followUps: [
      "Aivan niin! Se on viisas ajatus, kultaseni. Kerro vielä lisää — minua kiinnostaa!",
      "Niinpä niin. Tämä on tärkeä asia. Mitä muuta ajattelet tästä?",
      "Voi, sepä mielenkiintoista! Olen samaa mieltä kanssasi. Mitäs sitten?",
      "Kyllä, kulta. Sinulla on hyvä näkökulma. Haluaisitko tietää lisää tästä aiheesta?",
      "Sepä hyvä! Minusta on ihanaa, että luet uutisia ja mietit asioita. Jatketaan keskustelua!",
      "No niin, ymmärrän kyllä. On monenlaisia mielipiteitä. Mikä sinusta tuntuu?",
    ],
  },
  {
    grandmaId: "grozdana",
    responses: {
      culture:
        "Ajde, sine/ćerko! Baš lepa vest o kulturi! Beogradski festival je nešto najlepše. Sećam se kad sam išla sa Miloradom — bilo je divno. Da li si ti išla/ išao?",
      sports:
        "Jao, Bože mili! Srbija pobedila! Slava Bogu! Nisam baš ljubitelj sporta, ali kad naši igraju, srce mi brine. Jesi li gledao/la?",
      entertainment:
        "Pa dobro… lepo je kad ima zabave i kulture. Ja najviše volim kad dođu gosti pa pevamo. Voliš li ti da pevaš, zlatna?",
      lifestyle:
        "Šta kažeš! Lepo vreme dolazi. Milorad će biti srećan — njegove paradajz sadnice će procvetati. Voliš li ti baštu, sine?",
      technology:
        "Bože, ove nove tehnologije… sine moj, ja jedva znam telefon da koristim! Ali drago mi je što mladi napreduju. Razumeš li ti ovo bolje od mene?",
      science:
        "Pa dobro, nauka je važna! Moj sin Dragan je lekar — on uvek priča o novim otkrićima. Jesi li ti zainteresovan/a za nauku, mila?",
      health:
        "Jao, zdravlje je najvažnije! Ja svaki dan hodam po kraju i dišem svež vazduh. Milorad kaže da sam kao mlada devojka. Kako ti brineš o zdravlju, ćerko?",
      education:
        "Ajde da vidimo! Obrazovanje je svetinja. Ja uvek kažem — učenje nema kraja. Šta ti misliš o ovoj novoj reformi obrazovanja, brate?",
    },
    followUps: [
      "Tako je! Pametno razmišljaš, sine. Pričaj mi još — baš me interesuje tvoje mišljenje!",
      "Pa dobro, to je istina. Šta još misliš o ovome?",
      "Jao, kako si pametan/na! Baš sam ponosna na tebe! I šta onda?",
      "Šta kažeš! Imaš pravo, mila. Znaš li još nešto o ovoj temi?",
      "Ajde, baš mi je drago što čitamo zajedno. Nastavimo razgovor!",
    ],
  },
  {
    grandmaId: "ketevan",
    responses: {
      culture:
        "Gamarjoba, megobari! თბილისის კინოფესტივალი მშვენიერია! მე ძალიან მიყვარს ქართული კინო. ყოფილხარ?",
      sports:
        "Ra tqma, gogo! საქართველომ მოიგო! ჩვენი ბიჭებისთვის! მე არ ვარ სპორტის დიდი გულშემატკივარი, მაგრამ ლევანს ვუჭერ მხარს. უყურე მატჩს, ჩემო?",
      entertainment:
        "Gaigimet! კარგი ამბავია. მე მიყვარს, როცა სტუმრები მოდიან და ვმღერით. შენ გიყვარს სიმღერა, ჯან?",
      lifestyle:
        "Didi madloba! თბილი ამინდია! გივი ბედნიერია — მის ვენახს კარგი წელი ექნება. გიყვარს ბუნებაში სიარული, bichi?",
      technology:
        "Ra tqma! ტექნოლოგიები… მე ვერაფერს ვიგებ, მაგრამ მიხარია, რომ ქართველები წინ მიდიან. მეტი იცი ამაზე, megobari?",
      science:
        "ძალიან კარგია! მეცნიერება მნიშვნელოვანია. ჩემმა ქმარმა გივიმ ყოველთვის თქვა, რომ სწავლას დასასრული არ აქვს. რას ფიქრობ, ჩემო გენაცვალე?",
      health:
        "Jano, ჯანმრთელობა ყველაფერია! მე ყოველ დილით ვსეირნობ ბაღში და ვსუნთქავ სუფთა ჰაერს. როგორ ზრუნავ შენს ჯანმრთელობაზე, ჯან?",
      education:
        "Gamarjoba! განათლება ძალიან მნიშვნელოვანია. ჩემი ნინა ბევრს სწავლობდა. რას ფიქრობ ამ რეფორმაზე, ჩემო?",
    },
    followUps: [
      "ასეა! ძალიან ჭკვიანი აზრია, ჩემო. მოყევი კიდევ — მაინტერესებს!",
      "Ra tqma, მართალი ხარ. კიდევ რას ფიქრობ?",
      "Gaigimet! ძალიან მიხარია, რომ ასე ფიქრობ! მერე რა?",
      "Didi madloba, ჯან! სწორი აზრი გაქვს. იცი კიდევ რამე ამ თემაზე?",
      "ჩემო გენაცვალე, მიხარია ერთად კითხვა. გავაგრძელოთ საუბარი!",
    ],
  },
];

function getGrandmaMock(grandmaId: string): GrandmaMockData | null {
  return MOCK_GRANDMA_DATA.find((d) => d.grandmaId === grandmaId) ?? null;
}

function findCategory(_title: string, content: string): string {
  const lower = content.toLowerCase();
  const patterns: Record<string, string[]> = {
    culture: [
      "kulttuuri",
      "festivaali",
      "juhla",
      "teatteri",
      "taide",
      "kulttuur",
      "kino",
      "film",
      "festival",
      "pozorište",
      "umetnost",
      "კულტურა",
      "ფესტივალი",
      "კინო",
    ],
    sports: [
      "urheilu",
      "jalkapallo",
      "jääkiekko",
      "sport",
      "fudbal",
      "košarka",
      "სპორტი",
      "ფეხბურთი",
    ],
    entertainment: [
      "viihde",
      "musiikki",
      "konsertti",
      "zabava",
      "muzika",
      "koncert",
      "გასართობი",
      "მუსიკა",
      "კონცერტი",
    ],
    lifestyle: [
      "sää",
      "ilmatieteen",
      "elämäntapa",
      "vreme",
      "život",
      "ამინდი",
      "ცხოვრება",
    ],
    technology: [
      "teknologia",
      "tietokone",
      "kvantti",
      "startup",
      "tehnologija",
      "računar",
      "ტექნოლოგია",
      "კომპიუტერი",
    ],
    health: [
      "terveys",
      "liikunta",
      "muisti",
      "zdravlje",
      "vežbanje",
      "ჯანმრთელობა",
      "ვარჯიში",
    ],
    education: [
      "koulutus",
      "opetus",
      "koulu",
      "obrazovanje",
      "škola",
      "განათლება",
      "სკოლა",
    ],
  };

  for (const [category, keywords] of Object.entries(patterns)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }
  return "culture";
}

function generateMockTranslation(text: string): {
  translationRu: string;
  translationEn: string;
} {
  return {
    translationRu: `[Перевод] ${text}`,
    translationEn: `[Translation] ${text}`,
  };
}

function getMockBabushkaReply(
  articleTitle: string,
  articleContent: string,
  _userMessage: string,
  messages: ChatMessage[],
  languageCode?: string,
  streak?: number,
  userName?: string,
  userGender?: string
): { content: string; translationRu: string; translationEn: string } {
  const { lang } = getLanguageAndGrandma(languageCode);
  const g = lang.grandma;
  const mockData = getGrandmaMock(g.id);
  let baseMsg: string;
  const currentStreak = streak ?? 0;
  const name = userName ?? "";
  const gender = (userGender ?? "neutral") as "male" | "female" | "neutral";

  if (mockData) {
    const category = findCategory(articleTitle, articleContent);
    baseMsg =
      mockData.responses[category] ??
      (lang.code === "fi"
        ? "Oi, mitä mielenkiintoista! Kerro lisää, kultaseni. Mitä mieltä sinä olet tästä asiasta?"
        : lang.code === "sr"
          ? "Pa dobro, baš interesantno! Pričaj mi još, {sine|ćerko|brate}. Šta ti misliš o ovome?"
          : "Ra tqma, ძალიან საინტერესოა! მომიყევი კიდევ, ჩემო. რას ფიქრობ?");
  } else {
    baseMsg =
      "Oi, mitä mielenkiintoista! Kerro lisää, kultaseni. Mitä mieltä sinä olet tästä asiasta?";
  }

  baseMsg = applyGenderToText(baseMsg, name, gender);

  const familyExtra = getMockFamilyFollowUpExtra(g.id, currentStreak);
  const t = generateMockTranslation(baseMsg + familyExtra);

  if (messages.length <= 1) {
    return {
      content: baseMsg + familyExtra,
      translationRu: t.translationRu,
      translationEn: t.translationEn,
    };
  }

  const followUps = mockData?.followUps ?? [
    "Aivan, ymmärrän! Se on viisas ajatus, kultaseni. Kerro vielä lisää!",
    "Niinpä niin. Tämä on tärkeä asia. Mitä muuta ajattelet tästä?",
    "Voi, sepä mielenkiintoista! Olen samaa mieltä kanssasi. Mitäs sitten?",
    "Kyllä, kulta. Sinulla on hyvä näkökulma. Haluaisitko tietää lisää tästä aiheesta?",
    "Sepä hyvä! Minusta on ihanaa, että luet uutisia. Jatketaan keskustelua!",
  ];

  const idx =
    messages.filter((m) => m.role === "assistant").length % followUps.length;
  let followUp = followUps[idx];
  followUp = applyGenderToText(followUp, name, gender);
  const t2 = generateMockTranslation(followUp + familyExtra);

  return {
    content: followUp + familyExtra,
    translationRu: t2.translationRu,
    translationEn: t2.translationEn,
  };
}

function getMockOpening(
  articleTitle: string,
  articleContent: string,
  languageCode?: string,
  streak?: number,
  userName?: string,
  userGender?: string
): { content: string; translationRu: string; translationEn: string } {
  const { lang } = getLanguageAndGrandma(languageCode);
  const g = lang.grandma;
  const mockData = getGrandmaMock(g.id);
  let msg: string;
  const currentStreak = streak ?? 0;
  const name = userName ?? "";
  const gender = (userGender ?? "neutral") as "male" | "female" | "neutral";

  if (mockData) {
    const category = findCategory(articleTitle, articleContent);
    msg =
      mockData.responses[category] ??
      (lang.code === "fi"
        ? "Tervetuloa, {name}! Olen juuri lukenut mielenkiintoisen uutisen. Mitä mieltä sinä olet?"
        : lang.code === "sr"
          ? "Dobro{došao|došla}, {sine|ćerko|brate}! Baš sam čitala zanimljivu vest. Šta ti misliš?"
          : "Gamarjoba, megobari! ახლახან წავიკითხე საინტერესო ამბავი. რას ფიქრობ?");
  } else {
    msg =
      "Tervetuloa, {name}! Olen juuri lukenut mielenkiintoisen uutisen. Mitä mieltä sinä olet?";
  }

  msg = applyGenderToText(msg, name, gender);

  const familyExtra = getMockFamilyOpeningExtra(g.id, currentStreak);
  const t = generateMockTranslation(msg + familyExtra);
  return {
    content: msg + familyExtra,
    translationRu: t.translationRu,
    translationEn: t.translationEn,
  };
}

async function callOpenAI(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>
): Promise<string> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 200,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content ?? "";
}

async function callOpenAIJSON<T>(
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>
): Promise<T> {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages,
      max_tokens: 300,
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${errorBody}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? "{}";
  return JSON.parse(content) as T;
}

export async function getBabushkaOpening(
  articleTitle: string,
  articleContent: string,
  languageCode?: string,
  streak?: number,
  userName?: string,
  userGender?: string
): Promise<{ content: string; translationRu: string; translationEn: string }> {
  if (!isOpenAIConfigured()) {
    return getMockOpening(
      articleTitle,
      articleContent,
      languageCode,
      streak,
      userName,
      userGender
    );
  }

  const messages = [
    {
      role: "system" as const,
      content: buildSystemPrompt(
        articleTitle,
        articleContent,
        languageCode,
        streak,
        userName,
        userGender
      ),
    },
    {
      role: "user" as const,
      content:
        "Aloita keskustelu tästä uutisesta. Kysy minulta mielipidettäni.",
    },
  ];

  const content = await callOpenAI(messages);
  const t = await translateText(content, languageCode);
  return {
    content,
    translationRu: t.translationRu,
    translationEn: t.translationEn,
  };
}

export async function getBabushkaReply(
  articleTitle: string,
  articleContent: string,
  userMessage: string,
  history: ChatMessage[],
  languageCode?: string,
  streak?: number,
  userName?: string,
  userGender?: string
): Promise<{ content: string; translationRu: string; translationEn: string }> {
  if (!isOpenAIConfigured()) {
    return getMockBabushkaReply(
      articleTitle,
      articleContent,
      userMessage,
      history,
      languageCode,
      streak,
      userName,
      userGender
    );
  }

  const messages: Array<{
    role: "system" | "user" | "assistant";
    content: string;
  }> = [
    {
      role: "system",
      content: buildSystemPrompt(
        articleTitle,
        articleContent,
        languageCode,
        streak,
        userName,
        userGender
      ),
    },
  ];

  for (const msg of history) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  if (
    history.length === 0 ||
    history[history.length - 1].content !== userMessage
  ) {
    messages.push({ role: "user", content: userMessage });
  }

  const content = await callOpenAI(messages);
  const t = await translateText(content, languageCode);
  return {
    content,
    translationRu: t.translationRu,
    translationEn: t.translationEn,
  };
}

export async function translateText(
  text: string,
  languageCode?: string
): Promise<{ translationRu: string; translationEn: string }> {
  if (!isOpenAIConfigured()) {
    return generateMockTranslation(text);
  }

  const messages = [
    {
      role: "system" as const,
      content: buildTranslationPrompt(text, languageCode),
    },
    { role: "user" as const, content: text },
  ];

  try {
    const result = await callOpenAIJSON<{
      translationRu: string;
      translationEn: string;
    }>(messages);
    return result;
  } catch {
    return generateMockTranslation(text);
  }
}

export async function getReplyHint(
  articleTitle: string,
  lastMessage: string,
  languageCode?: string
): Promise<string> {
  if (!isOpenAIConfigured()) {
    return getMockHint(articleTitle, lastMessage, languageCode);
  }

  const messages = [
    {
      role: "system" as const,
      content: buildHintPrompt(articleTitle, lastMessage, languageCode),
    },
    {
      role: "user" as const,
      content: `Anna minulle ehdotus, mitä voisin vastata mummon viestiin: "${lastMessage}"`,
    },
  ];

  return callOpenAI(messages);
}

function getMockHint(
  _articleTitle: string,
  _lastMessage: string,
  languageCode?: string
): string {
  const { lang } = getLanguageAndGrandma(languageCode);
  switch (lang.code) {
    case "sr":
      return "Slažem se! (Я согласен/согласна!) To je dobar argument. (Это хороший аргумент.) Mislim da... (Я думаю, что...)";
    case "ka":
      return "ვეთანხმები! (Я согласен/согласна!) კარგი აზრია. (Хорошая мысль.) მგონია, რომ... (Я думаю, что...)";
    default:
      return "Samaa mieltä! (Я согласен/согласна!) Se on hyvä pointti. (Это хорошая мысль.) Luulen, että... (Я думаю, что...)";
  }
}
