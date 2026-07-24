import type { GrandmaProfile, FamilyMember } from "./config";

export type FamilyLoreStage = 0 | 1 | 2 | 3 | 4;

const STAGE_THRESHOLDS: { stage: FamilyLoreStage; minStreak: number }[] = [
  { stage: 4, minStreak: 30 },
  { stage: 3, minStreak: 20 },
  { stage: 2, minStreak: 10 },
  { stage: 1, minStreak: 5 },
  { stage: 0, minStreak: 0 },
];

export function getFamilyLoreStage(streak: number): FamilyLoreStage {
  for (const t of STAGE_THRESHOLDS) {
    if (streak >= t.minStreak) return t.stage;
  }
  return 0;
}

export function hasAffectionateNicknames(stage: FamilyLoreStage): boolean {
  return stage >= 4;
}

export interface AuntieNicknames {
  grandmaId: string;
  nicknames: string[];
  description: string;
}

const AFFECTIONATE_NICKNAMES: AuntieNicknames[] = [
  {
    grandmaId: "maria",
    nicknames: ["oma pikkuinen", "sydänkäpynen", "auringonpaiste", "murunen"],
    description:
      "очень ласковые обращения, более личные чем стандартные (rakas/kulta)",
  },
  {
    grandmaId: "grozdana",
    nicknames: ["dušo", "zlato", "srce"],
    description:
      "интимные обращения, более тёплые чем стандартные (sine/ćerko)",
  },
  {
    grandmaId: "ketevan",
    nicknames: ["chemi sikvaruli", "chem'o gulisatsvavi", "chem'o samoukro"],
    description:
      "очень личные обращения, более тёплые чем стандартные (джан/genatsvale)",
  },
];

export function getAuntieNicknames(grandmaId: string): AuntieNicknames | null {
  return AFFECTIONATE_NICKNAMES.find((n) => n.grandmaId === grandmaId) ?? null;
}

function getFamilyIntro(
  grandma: GrandmaProfile,
  stage: FamilyLoreStage
): string {
  const familyMembers = getFamilyMembersForStage(grandma, stage);
  if (familyMembers.length === 0) return "";

  if (stage === 1) {
    return `Иногда упоминай, что у тебя есть семья. Ты можешь вскользь сказать о: ${familyMembers.map((f) => `${f.name} (${f.relation})`).join(", ")}. Не углубляйся в детали.`;
  }

  if (stage === 2) {
    return `Ты иногда упоминаешь членов семьи по имени: ${familyMembers.map((f) => `${f.name} (${f.relation})`).join(", ")}. Расскажи короткие бытовые истории о них, когда это уместно.`;
  }

  if (stage >= 3) {
    return `Ты часто рассказываешь тёплые семейные истории. Члены твоей семьи: ${familyMembers.map((f) => `${f.name} (${f.relation}) — ${f.description}`).join(". ")}. Делись воспоминаниями и недавними событиями с ними.`;
  }

  return "";
}

export function getFamilyMembersForStage(
  grandma: GrandmaProfile,
  stage: FamilyLoreStage
): FamilyMember[] {
  const family = grandma.family;
  switch (stage) {
    case 0:
      return [];
    case 1:
      return family.length > 0 ? [family[0]] : [];
    case 2:
      return family.slice(0, 2);
    case 3:
    case 4:
      return family;
    default:
      return [];
  }
}

export function getFamilyLoreSystemPromptSection(
  grandma: GrandmaProfile,
  stage: FamilyLoreStage
): string {
  const parts: string[] = [];

  const familyIntro = getFamilyIntro(grandma, stage);
  if (familyIntro) parts.push(familyIntro);

  if (hasAffectionateNicknames(stage)) {
    const nickData = getAuntieNicknames(grandma.id);
    if (nickData) {
      parts.push(
        `Так как мы знакомы уже больше 30 дней, ты используешь ОЧЕНЬ ЛАСКОВЫЕ обращения: ${nickData.nicknames.join(", ")}. ${nickData.description}. Замени стандартные обращения на эти, более личные.`
      );
    }
  }

  return parts.join("\n");
}

const FAMILY_MOCK_MENTIONS: Record<
  string,
  Record<FamilyLoreStage, { openingExtra: string; followUpExtra: string }>
> = {
  maria: {
    0: { openingExtra: "", followUpExtra: "" },
    1: {
      openingExtra:
        " Muuten, minun pojanpoikani soittaa kitaraa — se on hänelle tärkeää.",
      followUpExtra:
        " Tiedätkö, pojanpoikani Mika on niin innoissaan kitaratunneista!",
    },
    2: {
      openingExtra:
        " Puhuin eilen Tuulin kanssa puutarhasta — hän on niin intohimoinen puutarhasuunnittelusta.",
      followUpExtra: " Mika soitti eilen uuden kappaleen, olin niin ylpeä!",
    },
    3: {
      openingExtra:
        " Viime viikolla Mika esiintyi koulunsa konsertissa — hän jännitti niin paljon, mutta soitti kauniisti! Ja Tuuli on suunnitellut upeaa puutarhaa naapureille.",
      followUpExtra:
        " Olen niin onnellinen, että saan kertoa sinulle perheestäni. Mika kysyi sinusta — sanoin että luemme uutisia yhdessä!",
    },
    4: {
      openingExtra:
        " Sydänkäpynen, minulla on niin paljon kerrottavaa! Mika — muistatko, hän soittaa kitaraa — hänen bändillään on ensimmäinen keikka ensi kuussa! Ja Tuuli on niin ylpeä uudesta puutarhaprojektistaan.",
      followUpExtra:
        " Auringonpaiste, on ihanaa, että voin jakaa perheeni tarinoita kanssasi. Haluaisitko kuulla lisää Tuulin puutarhasta?",
    },
  },
  grozdana: {
    0: { openingExtra: "", followUpExtra: "" },
    1: {
      openingExtra:
        " Ima mene toliku da ti kažem — moj sin Dragan je lekar u Nemačkoj.",
      followUpExtra:
        " Milo mi je da mogu s nekim da pričam. Moj Milorad stalno priča o svojim paradajzima!",
    },
    2: {
      openingExtra:
        " Milorad je baš srećan — njegovi paradajzi su najbolji u komšiluku! A Dragan me zvao juče iz Nemačke.",
      followUpExtra:
        " Znate, moja unuka Tijana je tako talentovana — studira umetnost!",
    },
    3: {
      openingExtra:
        " Slušaj, juče mi je Tijana donela svoj crtež na fakultet — tako sam ponosna! A Milorad, bogami, ceo dan u plasteniku. Dragan kaže da će doći za slavu. Šta kažeš, sine moj?",
      followUpExtra:
        " Tijana je pobedila na takmičenju crtanja! Milo moje, tako sam srećna što mogu ovo s tobom da podelim.",
    },
    4: {
      openingExtra:
        " Dušo, imam toliko novosti! Milorad bere paradajz, a Tijana je osvojila nagradu na izložbi! I Dragan dolazi za mesec dana — toliko mi nedostaje! Zrno moje, baš si mi dobar/ra što slušaš.",
      followUpExtra:
        " Srce, hoćeš li da ti ispričam kako smo se Milorad i ja upoznali? To je najlepša priča!",
    },
  },
  ketevan: {
    0: { openingExtra: "", followUpExtra: "" },
    1: {
      openingExtra:
        " Chemo, cig'ans shemidzlia vthkra — chemma Levani didi megobari akvs futbolshi.",
      followUpExtra:
        " Chemma Ninam mthkra, hotelshi axali stumrebi moavlian. Dzalian saintereso!",
    },
    2: {
      openingExtra:
        " Givi dzalian bednieri var — misi venakhi sauketeso damtavrda. Mori chai sadzrdi vinakho!",
      followUpExtra:
        " Ninas akhali kargi stumari mouyvania hotelshi. Chemo, shen gitsvia amaze?",
    },
    3: {
      openingExtra:
        " Givi guzhobt venakhs da Levans aswavlis vinakhs gaketebas. Ninas akhali proekti akvs hotelshi. Chemi gogona, ise mershvia, rom yvelaferi udzlieria!",
      followUpExtra:
        " Ra tqma, chemi samoukro, Levans chemsuli otsneba aqvs — unda gaxdes futbalisti! Chemo gulisatsvavi, ise amasatsolod vaarobt.",
    },
    4: {
      openingExtra:
        " Chemi sikvaruli, ramdeni siaxle mithkari! Givim itamada dzaghlebis shemodgomaze, Ninas hotelshi stumrebis sigarulia, da Levans futbolurshi pirveli adgili aqvs! Chem'o gulisatsvavi, sheni mosmena chemtvis dzalian dzvirfasia.",
      followUpExtra:
        " Chemi samoukro, ginda mithqra, rogori iyo Givi da chemi p'irveli shekhvedra? Chemo, es sauketes ambaria!",
    },
  },
};

function getFamilyMockMentions(
  grandmaId: string,
  stage: FamilyLoreStage
): { openingExtra: string; followUpExtra: string } | null {
  const grandmaMentions = FAMILY_MOCK_MENTIONS[grandmaId];
  if (!grandmaMentions) return null;
  return grandmaMentions[stage] ?? null;
}

export function getMockFamilyOpeningExtra(
  grandmaId: string,
  streak: number
): string {
  const stage = getFamilyLoreStage(streak);
  const mentions = getFamilyMockMentions(grandmaId, stage);
  return mentions?.openingExtra ?? "";
}

export function getMockFamilyFollowUpExtra(
  grandmaId: string,
  streak: number
): string {
  const stage = getFamilyLoreStage(streak);
  const mentions = getFamilyMockMentions(grandmaId, stage);
  return mentions?.followUpExtra ?? "";
}
