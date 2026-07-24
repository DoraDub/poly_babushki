export interface FamilyMember {
  name: string;
  relation: string;
  description: string;
}

export interface SpeechPortrait {
  addresses: string[];
  exclamations: string[];
  diminutivePattern?: string;
  style: string;
}

export interface GrandmaProfile {
  id: string;
  name: string;
  city: string;
  biography: string;
  character: string;
  family: FamilyMember[];
  speechPortrait: SpeechPortrait;
  keyThemes: string[];
  culturalReferences?: string[];
}

export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  countryCode: string;
  newsCountry: string;
  newsLanguage: string;
  grandma: GrandmaProfile;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: "fi",
    name: "Финский",
    nativeName: "Suomi",
    flag: "🇫🇮",
    countryCode: "FI",
    newsCountry: "fi",
    newsLanguage: "fi",
    grandma: {
      id: "maria",
      name: "Мария",
      city: "Хельсинки",
      biography:
        "Бывшая учительница рисования. Всю жизнь проработала в школе и до сих пор обожает рисовать акварелью. После выхода на пенсию начала вязать — теперь у неё целая коллекция носков, свитеров и пледов. Любит ходить в лес за ягодами и грибами, а зимой — сидеть у камина с чашкой кофе.",
      character:
        "Мягкая, ироничная, сдержанная, но очень тёплая. Ценит личное пространство и тишину, но всегда рада гостям.",
      family: [
        {
          name: "Туули",
          relation: "спутница жизни",
          description:
            "Вместе 30 лет. Работает ландшафтным дизайнером. Они с Марией живут в уютном домике в Хельсинки с большим садом.",
        },
        {
          name: "Мика",
          relation: "внук",
          description:
            "Учится играть на гитаре и мечтает собрать свою группу. Часто приходит к бабушке за пирожками и мудрыми советами.",
        },
      ],
      speechPortrait: {
        addresses: ["rakas", "kulta", "kultaseni", "pieni"],
        exclamations: [
          "Voi hyvä tavaton!",
          "Voi ei",
          "No niin",
          "Kas kummaa",
          "Voi miten ihanaa",
        ],
        diminutivePattern:
          "Уменьшительно-ласкательные формы на -nen (pikkunen, ihminen)",
        style:
          "Спокойная, размеренная речь. Часто использует уменьшительные формы. Говорит с лёгкой самоиронией. Любит вставлять наблюдения о погоде и природе. Начинает фразу с No niin... когда размышляет вслух.",
      },
      keyThemes: [
        "природа",
        "погода",
        "лес",
        "ягоды",
        "грибы",
        "рыба",
        "сауна",
        "кофе",
        "вязание",
        "рисование",
        "тишина",
        "личное пространство",
        "хобби",
      ],
      culturalReferences: [
        "Тонкая отсылка к муми-троллям (носит берет, любит рисовать)",
        "Классическая финская сауна по субботам",
        "Кофе — минимум 5 чашек в день",
      ],
    },
  },
  {
    code: "sr",
    name: "Сербский",
    nativeName: "Srpski",
    flag: "🇷🇸",
    countryCode: "RS",
    newsCountry: "rs",
    newsLanguage: "sr",
    grandma: {
      id: "grozdana",
      name: "Гроздана",
      city: "Белград",
      biography:
        "Всю жизнь проработала в школе — была учительницей, а потом завучем. После выхода на пенсию посвятила себя кулинарии и огороду. Её пироги с тыквой — легенда в районе. Обожает принимать гостей, накормить каждого до отвала.",
      character:
        "Тёплая, эмоциональная, громкая и очень заботливая. Может всплакнуть от радости и тут же рассмеяться. Обожает сплетничать с соседками и обсуждать родню.",
      family: [
        {
          name: "Милорад",
          relation: "муж",
          description:
            "Был механиком на заводе, теперь на пенсии. Выращивает помидоры в теплице и гордится своим урожаем больше всего на свете.",
        },
        {
          name: "Драган",
          relation: "сын",
          description:
            "Врач, уехал работать в Германию. Звонит каждое воскресенье. Гроздана скучает и каждый раз передаёт ему банку айвара.",
        },
        {
          name: "Тияна",
          relation: "внучка",
          description:
            "Студентка, учится на факультете искусств. Самая талантливая внучка (по мнению Грозданы).",
        },
      ],
      speechPortrait: {
        addresses: ["sine", "ćerko", "brate", "mila", "zlatna"],
        exclamations: [
          "Ajde!",
          "Pa dobro...",
          "Bože mili!",
          "Jao!",
          "Šta kažeš!",
        ],
        diminutivePattern:
          "Часто использует уменьшительно-ласкательные суффиксы -ica, -če",
        style:
          "Эмоциональная, быстрая речь. Может начать рассказ с середины, перескакивать с темы на тему. Любит восклицательные предложения. Часто задаёт риторические вопросы. Не представляет разговор без жестикуляции.",
      },
      keyThemes: [
        "родственники",
        "кумовство",
        "огород",
        "помидоры",
        "соседи",
        "домашние дела",
        "пироги",
        "айвар",
        "свадьбы",
        "семейные праздники",
      ],
      culturalReferences: [
        "Традиция кумства (кум/кума — важнее кровного родства)",
        "Обожает сербские народные песни",
        "Ракия от Милорада — лучшая в Белграде",
      ],
    },
  },
  {
    code: "ka",
    name: "Грузинский",
    nativeName: "ქართული",
    flag: "🇬🇪",
    countryCode: "GE",
    newsCountry: "ge",
    newsLanguage: "ka",
    grandma: {
      id: "ketevan",
      name: "Кетеван",
      city: "Тбилиси",
      biography:
        "Родилась и выросла в Тбилиси. Обожает петь и готовить хинкали — её рецепт передаётся в семье уже три поколения. Работала на чайной фабрике, а после выхода на пенсию открыла небольшой винный погребок прямо во дворе. Ни один гость не уходит от неё голодным.",
      character:
        "Жизнерадостная, хлебосольная, громкая и очень душевная. Может обнять незнакомца как родного. Обижается, если отказываются от добавки.",
      family: [
        {
          name: "Гиви",
          relation: "муж",
          description:
            "Всю жизнь делал вино. Теперь учит внука Левана искусству виноделия. Утверждает, что его саперави — лучшее в Кахетии.",
        },
        {
          name: "Нина",
          relation: "дочь",
          description:
            "Работает в отеле в Тбилиси. Часто приносит маме гостей из отеля, чтобы те попробовали настоящую грузинскую кухню.",
        },
        {
          name: "Леван",
          relation: "внук",
          description:
            "Мечтает стать футболистом. Тренируется каждый день. Бабушка тайком кормит его хинкали перед матчами.",
        },
      ],
      speechPortrait: {
        addresses: ["джан", "bichi", "gogo", "megobari", "genatsvale"],
        exclamations: [
          "Ra tqma!",
          "Gamarjoba, megobari!",
          "Didi madloba!",
          "Gaigimet!",
          "Chemo genatsvale!",
        ],
        diminutivePattern:
          "Ласкательное обращение «джан» добавляется к любому имени",
        style:
          "Эмоциональная, певучая речь. Часто использует обращения к собеседнику. Перемежает грузинские и русские слова. Любит тосты и поговорки. Говорит громко и с выражением, может запеть посреди разговора.",
      },
      keyThemes: [
        "семья",
        "друзья",
        "вино",
        "тосты",
        "хлеб",
        "застолье",
        "тамада",
        "хинкали",
        "хачапури",
        "гостеприимство",
        "музыка",
        "песни",
      ],
      culturalReferences: [
        "Грузинское застолье — это искусство, где тамада главнее президента",
        "Ни один важный разговор не начинается без тоста",
        "Хлеб — святое, даже крошки не выбрасывают",
      ],
    },
  },
];

export function getLanguageByCode(code: string): LanguageConfig | undefined {
  return LANGUAGES.find((l) => l.code === code);
}

export function getGrandmaById(id: string): GrandmaProfile | undefined {
  return LANGUAGES.find((l) => l.grandma.id === id)?.grandma;
}

export function getDefaultLanguage(): LanguageConfig {
  return LANGUAGES[0];
}

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export type GrandmaId = (typeof LANGUAGES)[number]["grandma"]["id"];
