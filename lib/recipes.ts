export interface RecipeIngredient {
  name: string;
  amount?: string;
  translationRu: string;
  translationEn: string;
}

export interface RecipeData {
  recipeId: string;
  language: string;
  title: string;
  titleRu: string;
  emoji: string;
  description: string;
  descriptionRu: string;
  ingredients: RecipeIngredient[];
  instructions: string;
  instructionsRu: string;
  newWords: { word: string; translationRu: string; translationEn: string }[];
}

const FINNISH_RECIPES: RecipeData[] = [
  {
    recipeId: "fi#karjalanpaisti",
    language: "fi",
    title: "Karjalanpaisti",
    titleRu: "Карельское рагу",
    emoji: "🍖",
    description:
      "Perinteinen suomalainen lihapata, joka kypsyy hitaasti uunissa.",
    descriptionRu:
      "Традиционное финское мясное рагу, медленно томящееся в духовке.",
    ingredients: [
      {
        name: "naudanliha",
        amount: "500 g",
        translationRu: "говядина",
        translationEn: "beef",
      },
      {
        name: "sianliha",
        amount: "300 g",
        translationRu: "свинина",
        translationEn: "pork",
      },
      {
        name: "sipuli",
        amount: "2 kpl",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "porkkana",
        amount: "2 kpl",
        translationRu: "морковь",
        translationEn: "carrot",
      },
      {
        name: "laakerinlehti",
        amount: "3 kpl",
        translationRu: "лавровый лист",
        translationEn: "bay leaf",
      },
      {
        name: "mustapippuri",
        amount: "1 tl",
        translationRu: "чёрный перец",
        translationEn: "black pepper",
      },
      {
        name: "suola",
        amount: "1 tl",
        translationRu: "соль",
        translationEn: "salt",
      },
      {
        name: "vesi",
        amount: "5 dl",
        translationRu: "вода",
        translationEn: "water",
      },
    ],
    instructions:
      "Leikkaa liha kuutioiksi. Kuori ja pilko sipuli ja porkkana. Laita kaikki ainekset uunivuokaan. Lisää vesi, laakerinlehdet, suola ja pippuri. Kypsennä 150 asteessa noin 2-3 tuntia, kunnes liha on mureaa. Tarjoile perunamuusin tai keitettyjen perunoiden kanssa.",
    instructionsRu:
      "Нарежьте мясо кубиками. Очистите и нарежьте лук и морковь. Положите все ингредиенты в форму для запекания. Добавьте воду, лавровый лист, соль и перец. Запекайте при 150°C около 2-3 часов, пока мясо не станет мягким. Подавайте с картофельным пюре или отварным картофелем.",
    newWords: [
      { word: "liha", translationRu: "мясо", translationEn: "meat" },
      {
        word: "uunivuoka",
        translationRu: "форма для запекания",
        translationEn: "casserole dish",
      },
      {
        word: "kypsentää",
        translationRu: "готовить/запекать",
        translationEn: "to cook/roast",
      },
      {
        word: "murea",
        translationRu: "мягкий/нежный",
        translationEn: "tender",
      },
      {
        word: "tarjoilla",
        translationRu: "подавать",
        translationEn: "to serve",
      },
    ],
  },
  {
    recipeId: "fi#lohikeitto",
    language: "fi",
    title: "Lohikeitto",
    titleRu: "Суп из лосося",
    emoji: "🐟",
    description:
      "Kermainen lohikeitto — suomalaisten lempiruoka kylminä päivinä.",
    descriptionRu:
      "Сливочный суп из лосося — любимое блюдо финнов в холодные дни.",
    ingredients: [
      {
        name: "lohi",
        amount: "400 g",
        translationRu: "лосось",
        translationEn: "salmon",
      },
      {
        name: "peruna",
        amount: "4 kpl",
        translationRu: "картофель",
        translationEn: "potato",
      },
      {
        name: "porkkana",
        amount: "2 kpl",
        translationRu: "морковь",
        translationEn: "carrot",
      },
      {
        name: "sipuli",
        amount: "1 kpl",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "kerma",
        amount: "2 dl",
        translationRu: "сливки",
        translationEn: "cream",
      },
      {
        name: "tilli",
        amount: "1 nippu",
        translationRu: "укроп",
        translationEn: "dill",
      },
      {
        name: "kalaliemi",
        amount: "1 l",
        translationRu: "рыбный бульон",
        translationEn: "fish broth",
      },
      {
        name: "voi",
        amount: "2 rkl",
        translationRu: "сливочное масло",
        translationEn: "butter",
      },
    ],
    instructions:
      "Kuori ja kuutioi perunat ja porkkanat. Kuullota sipuli voissa kattilassa. Lisää kalaliemi, perunat ja porkkanat. Keitä 10 minuuttia. Leikkaa lohi kuutioiksi ja lisää kattilaan. Keitä 5 minuuttia. Lisää kerma ja hienonnettu tilli. Mausta suolalla ja pippurilla. Tarjoile heti ruisleivän kanssa.",
    instructionsRu:
      "Очистите и нарежьте кубиками картофель и морковь. Обжарьте лук на сливочном масле в кастрюле. Добавьте рыбный бульон, картофель и морковь. Варите 10 минут. Нарежьте лосось кубиками и добавьте в кастрюлю. Варите 5 минут. Добавьте сливки и мелко нарезанный укроп. Посолите и поперчите. Подавайте сразу с ржаным хлебом.",
    newWords: [
      { word: "keitto", translationRu: "суп", translationEn: "soup" },
      { word: "kerma", translationRu: "сливки", translationEn: "cream" },
      { word: "tilli", translationRu: "укроп", translationEn: "dill" },
      { word: "kattila", translationRu: "кастрюля", translationEn: "pot" },
      {
        word: "ruisleipä",
        translationRu: "ржаной хлеб",
        translationEn: "rye bread",
      },
    ],
  },
  {
    recipeId: "fi#korvapuusti",
    language: "fi",
    title: "Korvapuusti",
    titleRu: "Коричные булочки",
    emoji: "🥐",
    description: "Tuoksuvat korvapuustit — parasta kahvin kanssa.",
    descriptionRu: "Ароматные коричные булочки — лучше всего с кофе.",
    ingredients: [
      {
        name: "vehnäjauho",
        amount: "5 dl",
        translationRu: "пшеничная мука",
        translationEn: "wheat flour",
      },
      {
        name: "maito",
        amount: "2,5 dl",
        translationRu: "молоко",
        translationEn: "milk",
      },
      {
        name: "hiiva",
        amount: "25 g",
        translationRu: "дрожжи",
        translationEn: "yeast",
      },
      {
        name: "sokeri",
        amount: "1 dl",
        translationRu: "сахар",
        translationEn: "sugar",
      },
      {
        name: "voi",
        amount: "75 g",
        translationRu: "сливочное масло",
        translationEn: "butter",
      },
      {
        name: "kaneli",
        amount: "2 rkl",
        translationRu: "корица",
        translationEn: "cinnamon",
      },
      {
        name: "kananmuna",
        amount: "1 kpl",
        translationRu: "яйцо",
        translationEn: "egg",
      },
    ],
    instructions:
      "Liuota hiiva lämpimään maitoon. Lisää sokeri, jauhot ja voi. Vaivaa taikina tasaiseksi. Anna kohota 30 minuuttia. Kauli taikina levyksi. Levitä päälle voita, sokeria ja kanelia. Rullaa ja leikkaa paloiksi. Anna kohota 15 minuuttia. Voitele munalla ja paista 225 asteessa 10-12 minuuttia.",
    instructionsRu:
      "Растворите дрожжи в тёплом молоке. Добавьте сахар, муку и масло. Замесите тесто до однородности. Дайте подняться 30 минут. Раскатайте тесто в пласт. Нанесите масло, сахар и корицу. Сверните рулетом и нарежьте кусочками. Дайте подняться 15 минут. Смажьте яйцом и выпекайте при 225°C 10-12 минут.",
    newWords: [
      { word: "taikina", translationRu: "тесто", translationEn: "dough" },
      { word: "kaneli", translationRu: "корица", translationEn: "cinnamon" },
      {
        word: "kohota",
        translationRu: "подниматься (о тесте)",
        translationEn: "to rise",
      },
      {
        word: "kaulia",
        translationRu: "раскатывать",
        translationEn: "to roll out",
      },
      {
        word: "paistaa",
        translationRu: "печь/жарить",
        translationEn: "to bake/fry",
      },
    ],
  },
  {
    recipeId: "fi#mustikkapiirakka",
    language: "fi",
    title: "Mustikkapiirakka",
    titleRu: "Черничный пирог",
    emoji: "🫐",
    description: "Mehevä mustikkapiirakka — kesän paras herkku.",
    descriptionRu: "Сочный черничный пирог — лучшее летнее лакомство.",
    ingredients: [
      {
        name: "mustikka",
        amount: "4 dl",
        translationRu: "черника",
        translationEn: "blueberry",
      },
      {
        name: "vehnäjauho",
        amount: "3 dl",
        translationRu: "пшеничная мука",
        translationEn: "wheat flour",
      },
      {
        name: "sokeri",
        amount: "2 dl",
        translationRu: "сахар",
        translationEn: "sugar",
      },
      {
        name: "voi",
        amount: "100 g",
        translationRu: "сливочное масло",
        translationEn: "butter",
      },
      {
        name: "kananmuna",
        amount: "2 kpl",
        translationRu: "яйцо",
        translationEn: "egg",
      },
      {
        name: "maito",
        amount: "1 dl",
        translationRu: "молоко",
        translationEn: "milk",
      },
      {
        name: "vaniljasokeri",
        amount: "1 tl",
        translationRu: "ванильный сахар",
        translationEn: "vanilla sugar",
      },
    ],
    instructions:
      "Sekoita kuivat aineet. Nypi voi joukkoon. Lisää muna ja maito. Sekoita tasaiseksi. Kaada taikina voideltuun piirakkavuokaan. Ripottele mustikat päälle. Paista 200 asteessa 25-30 minuuttia. Tarjoile vaniljakastikkeen tai jäätelön kanssa.",
    instructionsRu:
      "Смешайте сухие ингредиенты. Вотрите масло. Добавьте яйцо и молоко. Перемешайте до однородности. Вылейте тесто в смазанную маслом форму для пирога. Посыпьте черникой сверху. Выпекайте при 200°C 25-30 минут. Подавайте с ванильным соусом или мороженым.",
    newWords: [
      {
        word: "mustikka",
        translationRu: "черника",
        translationEn: "blueberry",
      },
      { word: "piirakka", translationRu: "пирог", translationEn: "pie" },
      {
        word: "voidella",
        translationRu: "смазывать маслом",
        translationEn: "to grease",
      },
      {
        word: "ripotella",
        translationRu: "посыпать",
        translationEn: "to sprinkle",
      },
      {
        word: "vaniljakastike",
        translationRu: "ванильный соус",
        translationEn: "vanilla sauce",
      },
    ],
  },
];

const SERBIAN_RECIPES: RecipeData[] = [
  {
    recipeId: "sr#sarma",
    language: "sr",
    title: "Sarma",
    titleRu: "Сарма (голубцы)",
    emoji: "🥬",
    description: "Sarma od kiselog kupusa — pravo zimsko jelo.",
    descriptionRu: "Сарма из квашеной капусты — настоящее зимнее блюдо.",
    ingredients: [
      {
        name: "kiseli kupus",
        amount: "1 glavica",
        translationRu: "квашеная капуста",
        translationEn: "sauerkraut",
      },
      {
        name: "mleveno meso",
        amount: "500 g",
        translationRu: "фарш",
        translationEn: "minced meat",
      },
      {
        name: "pirinč",
        amount: "100 g",
        translationRu: "рис",
        translationEn: "rice",
      },
      {
        name: "crni luk",
        amount: "2 glavice",
        translationRu: "репчатый лук",
        translationEn: "onion",
      },
      {
        name: "suvo meso",
        amount: "200 g",
        translationRu: "копчёное мясо",
        translationEn: "smoked meat",
      },
      {
        name: "lovorov list",
        amount: "2 koma",
        translationRu: "лавровый лист",
        translationEn: "bay leaf",
      },
      {
        name: "mlevena paprika",
        amount: "1 kašika",
        translationRu: "молотая паприка",
        translationEn: "ground paprika",
      },
      {
        name: "biber",
        amount: "po ukusu",
        translationRu: "перец",
        translationEn: "pepper",
      },
    ],
    instructions:
      "Odvoji listove kupusa. Izmešaj mleveno meso, pirinč, seckani luk i začine. Stavi fil u svaki list i umotaj. Ređaj sarmu u lonac, između listova stavi suvo meso. Nalij vodu da pokrije. Kuvaj na laganoj vatri 2-3 sata. Posluži sa pavlakom.",
    instructionsRu:
      "Отделите листья капусты. Смешайте фарш, рис, нарезанный лук и специи. Положите начинку в каждый лист и заверните. Уложите голубцы в кастрюлю, между слоями положите копчёное мясо. Залейте водой, чтобы покрыло. Варите на медленном огне 2-3 часа. Подавайте со сметаной.",
    newWords: [
      { word: "kupus", translationRu: "капуста", translationEn: "cabbage" },
      { word: "fil", translationRu: "начинка", translationEn: "filling" },
      {
        word: "umotati",
        translationRu: "заворачивать",
        translationEn: "to wrap",
      },
      { word: "lonac", translationRu: "кастрюля", translationEn: "pot" },
      {
        word: "pavlaka",
        translationRu: "сметана",
        translationEn: "sour cream",
      },
    ],
  },
  {
    recipeId: "sr#cevapi",
    language: "sr",
    title: "Ćevapi",
    titleRu: "Чевапи",
    emoji: "🥩",
    description: "Ćevapi sa lukom i kajmakom — klasik balkanske kuhinje.",
    descriptionRu: "Чевапи с луком и каймаком — классика балканской кухни.",
    ingredients: [
      {
        name: "mleveno meso",
        amount: "500 g",
        translationRu: "фарш (говядина+баранина)",
        translationEn: "minced meat (beef+lamb)",
      },
      {
        name: "crni luk",
        amount: "1 glavica",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "beli luk",
        amount: "3 čena",
        translationRu: "чеснок",
        translationEn: "garlic",
      },
      {
        name: "so",
        amount: "1 kašičica",
        translationRu: "соль",
        translationEn: "salt",
      },
      {
        name: "biber",
        amount: "1/2 kašičice",
        translationRu: "перец",
        translationEn: "pepper",
      },
      {
        name: "soda bikarbona",
        amount: "1/2 kašičice",
        translationRu: "сода",
        translationEn: "baking soda",
      },
      {
        name: "kajmak",
        amount: "po ukusu",
        translationRu: "каймак",
        translationEn: "kaymak",
      },
      {
        name: "somun",
        amount: "4 koma",
        translationRu: "сомун (лепёшка)",
        translationEn: "flatbread",
      },
    ],
    instructions:
      "Izmešaj mleveno meso sa sitno seckanim lukom, belim lukom, solju, biberom i sodom. Dobro izmesi i ostavi u frižideru 1 sat. Oblikuj male kobasice. Peci na roštilju ili tiganju 8-10 minuta dok ne porumene. Posluži u somunu sa seckanim crnim lukom i kajmakom.",
    instructionsRu:
      "Смешайте фарш с мелко нарезанным луком, чесноком, солью, перцем и содой. Хорошо вымесите и оставьте в холодильнике на 1 час. Сформируйте небольшие колбаски. Жарьте на гриле или сковороде 8-10 минут до золотистой корочки. Подавайте в лепёшке с нарезанным луком и каймаком.",
    newWords: [
      { word: "roštilj", translationRu: "гриль", translationEn: "grill" },
      { word: "somun", translationRu: "лепёшка", translationEn: "flatbread" },
      { word: "kobasica", translationRu: "колбаска", translationEn: "sausage" },
      {
        word: "porumeneti",
        translationRu: "подрумяниться",
        translationEn: "to brown",
      },
      {
        word: "kajmak",
        translationRu: "каймак (сливочный продукт)",
        translationEn: "kaymak",
      },
    ],
  },
  {
    recipeId: "sr#pasulj",
    language: "sr",
    title: "Pasulj",
    titleRu: "Суп из фасоли",
    emoji: "🫘",
    description: "Pasulj sa suvim mesom — najbolja srpska čorbasta jela.",
    descriptionRu:
      "Фасолевый суп с копчёным мясом — лучшее сербское первое блюдо.",
    ingredients: [
      {
        name: "pasulj",
        amount: "400 g",
        translationRu: "фасоль",
        translationEn: "beans",
      },
      {
        name: "suvo meso",
        amount: "200 g",
        translationRu: "копчёное мясо",
        translationEn: "smoked meat",
      },
      {
        name: "crni luk",
        amount: "2 glavice",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "šargarepa",
        amount: "2 koma",
        translationRu: "морковь",
        translationEn: "carrot",
      },
      {
        name: "mlevena paprika",
        amount: "1 kašika",
        translationRu: "молотая паприка",
        translationEn: "ground paprika",
      },
      {
        name: "lovorov list",
        amount: "2 koma",
        translationRu: "лавровый лист",
        translationEn: "bay leaf",
      },
      {
        name: "ulje",
        amount: "3 kašike",
        translationRu: "растительное масло",
        translationEn: "oil",
      },
    ],
    instructions:
      "Potopi pasulj preko noći u vodi. Sledeći dan ocedi i isperi. Stavi pasulj u lonac, dodaj vodu i kuvaj 30 minuta. Prodinstaj seckani luk i šargarepu na ulju, dodaj mlevenu papriku. Dodaj u lonac sa suvim mesom i lovorovim listom. Kuvaj još 1 sat dok pasulj ne omekša. Posluži sa hlebom.",
    instructionsRu:
      "Замочите фасоль на ночь в воде. На следующий день слейте и промойте. Положите фасоль в кастрюлю, залейте водой и варите 30 минут. Обжарьте нарезанный лук и морковь на масле, добавьте молотую паприку. Добавьте в кастрюлю с копчёным мясом и лавровым листом. Варите ещё 1 час, пока фасоль не станет мягкой. Подавайте с хлебом.",
    newWords: [
      { word: "pasulj", translationRu: "фасоль", translationEn: "beans" },
      {
        word: "potopiti",
        translationRu: "замачивать",
        translationEn: "to soak",
      },
      {
        word: "prodinstati",
        translationRu: "обжаривать/пассеровать",
        translationEn: "to sauté",
      },
      {
        word: "omekšati",
        translationRu: "стать мягким",
        translationEn: "to soften",
      },
      {
        word: "čorbast",
        translationRu: "жидкий (о супе)",
        translationEn: "soupy",
      },
    ],
  },
  {
    recipeId: "sr#pita-sa-jabukama",
    language: "sr",
    title: "Pita sa jabukama",
    titleRu: "Пита с яблоками",
    emoji: "🥟",
    description: "Tanka i hrskava pita sa jabukama — omiljeni dezert.",
    descriptionRu: "Тонкий и хрустящий пирог с яблоками — любимый десерт.",
    ingredients: [
      {
        name: "kore za pitu",
        amount: "500 g",
        translationRu: "слоёное тесто",
        translationEn: "phyllo dough",
      },
      {
        name: "jabuka",
        amount: "1 kg",
        translationRu: "яблоки",
        translationEn: "apples",
      },
      {
        name: "šećer",
        amount: "100 g",
        translationRu: "сахар",
        translationEn: "sugar",
      },
      {
        name: "cimet",
        amount: "1 kašičica",
        translationRu: "корица",
        translationEn: "cinnamon",
      },
      {
        name: "orah",
        amount: "50 g",
        translationRu: "грецкие орехи",
        translationEn: "walnuts",
      },
      {
        name: "puter",
        amount: "100 g",
        translationRu: "сливочное масло",
        translationEn: "butter",
      },
      {
        name: "vanilin šećer",
        amount: "1 kesica",
        translationRu: "ванильный сахар",
        translationEn: "vanilla sugar",
      },
    ],
    instructions:
      "Izrendaj jabuke i pomešaj sa šećerom, cimetom i seckanim orasima. Istopi puter. Ređaj kore, svaku koru poprskaj puterom. Stavi fil od jabuka i umotaj. Ponovi dok ne potrošiš fil. Peci u rerni na 180°C 30-40 minuta dok ne porumeni. Pospi šećerom u prahu pre serviranja.",
    instructionsRu:
      "Натрите яблоки и смешайте с сахаром, корицей и нарезанными грецкими орехами. Растопите сливочное масло. Выкладывайте листы теста, каждый сбрызгивая маслом. Положите яблочную начинку и заверните. Повторяйте, пока не закончится начинка. Выпекайте в духовке при 180°C 30-40 минут до золотистого цвета. Посыпьте сахарной пудрой перед подачей.",
    newWords: [
      { word: "jabuka", translationRu: "яблоко", translationEn: "apple" },
      {
        word: "kora",
        translationRu: "корж/лист теста",
        translationEn: "dough sheet",
      },
      { word: "orah", translationRu: "грецкий орех", translationEn: "walnut" },
      { word: "rerna", translationRu: "духовка", translationEn: "oven" },
      {
        word: "šećer u prahu",
        translationRu: "сахарная пудра",
        translationEn: "powdered sugar",
      },
    ],
  },
];

const GEORGIAN_RECIPES: RecipeData[] = [
  {
    recipeId: "ka#khinkali",
    language: "ka",
    title: "ხინკალი (Khinkali)",
    titleRu: "Хинкали",
    emoji: "🥟",
    description: "წვნიანი ხინკალი — საქართველოს სიამაყე.",
    descriptionRu: "Сочные хинкали — гордость Грузии.",
    ingredients: [
      {
        name: "ფქვილი (ფქვილი)",
        amount: "500 გ",
        translationRu: "мука",
        translationEn: "flour",
      },
      {
        name: "წყალი",
        amount: "250 მლ",
        translationRu: "вода",
        translationEn: "water",
      },
      {
        name: "მარილი",
        amount: "1 ჩ/კ",
        translationRu: "соль",
        translationEn: "salt",
      },
      {
        name: "საქონლის ხორცი",
        amount: "400 გ",
        translationRu: "говядина",
        translationEn: "beef",
      },
      {
        name: "ღორის ხორცი",
        amount: "200 გ",
        translationRu: "свинина",
        translationEn: "pork",
      },
      {
        name: "ხახვი",
        amount: "2 ცალი",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "ქინძი",
        amount: "1 კონა",
        translationRu: "кинза",
        translationEn: "cilantro",
      },
      {
        name: "შავი პილპილი",
        amount: "1 ჩ/კ",
        translationRu: "чёрный перец",
        translationEn: "black pepper",
      },
    ],
    instructions:
      "მოზილეთ ცომი ფქვილის, წყლისა და მარილისგან. დააფარეთ და გააჩერეთ 30 წუთი. დაკუწეთ ხორცი წვრილად, დაუმატეთ დაჭრილი ხახვი, ქინძი, მარილი და პილპილი. გააკეთეთ წრეები ცომისგან, ჩაყარეთ შიგთავსი. მოხარშეთ მდუღარე წყალში 12-15 წუთი. მიირთვით ცხელი.",
    instructionsRu:
      "Замесите тесто из муки, воды и соли. Накройте и оставьте на 30 минут. Мелко нарубите мясо, добавьте нарезанный лук, кинзу, соль и перец. Сделайте кружочки из теста, положите начинку. Варите в кипящей воде 12-15 минут. Подавайте горячими.",
    newWords: [
      { word: "ცომი", translationRu: "тесто", translationEn: "dough" },
      { word: "შიგთავსი", translationRu: "начинка", translationEn: "filling" },
      { word: "მოზილეთ", translationRu: "замесить", translationEn: "to knead" },
      { word: "მოხარშეთ", translationRu: "сварить", translationEn: "to boil" },
      { word: "ცხელი", translationRu: "горячий", translationEn: "hot" },
    ],
  },
  {
    recipeId: "ka#khachapuri",
    language: "ka",
    title: "ხაჭაპური (Khachapuri)",
    titleRu: "Хачапури",
    emoji: "🧀",
    description: "ყველიანი ხაჭაპური — ქართული სამზარეულოს მეფე.",
    descriptionRu: "Хачапури с сыром — король грузинской кухни.",
    ingredients: [
      {
        name: "ფქვილი",
        amount: "500 გ",
        translationRu: "мука",
        translationEn: "flour",
      },
      {
        name: "იოგურტი",
        amount: "250 მლ",
        translationRu: "йогурт/мацони",
        translationEn: "yogurt/matsoni",
      },
      {
        name: "კარაქი",
        amount: "100 გ",
        translationRu: "сливочное масло",
        translationEn: "butter",
      },
      {
        name: "კვერცხი",
        amount: "2 ცალი",
        translationRu: "яйцо",
        translationEn: "egg",
      },
      {
        name: "ყველი (სულგუნი)",
        amount: "300 გ",
        translationRu: "сыр (сулугуни)",
        translationEn: "cheese (sulguni)",
      },
      {
        name: "საფუარი",
        amount: "1 ჩ/კ",
        translationRu: "дрожжи",
        translationEn: "yeast",
      },
      {
        name: "მარილი",
        amount: "1/2 ჩ/კ",
        translationRu: "соль",
        translationEn: "salt",
      },
    ],
    instructions:
      "გახსენით საფუარი თბილ იოგურტში. დაუმატეთ ფქვილი, მარილი და მოზილეთ ცომი. გააჩერეთ 1 საათი. გახეხეთ ყველი. გააბრტყელეთ ცომი, ჩაყარეთ ყველი. გამოაცხვეთ 200°C-ზე 20-25 წუთი. წაუსვით კარაქი ცხელს.",
    instructionsRu:
      "Растворите дрожжи в тёплом йогурте. Добавьте муку, соль и замесите тесто. Оставьте на 1 час. Натрите сыр. Раскатайте тесто, положите сыр. Выпекайте при 200°C 20-25 минут. Смажьте горячим маслом.",
    newWords: [
      { word: "ყველი", translationRu: "сыр", translationEn: "cheese" },
      {
        word: "იოგურტი",
        translationRu: "йогурт/мацони",
        translationEn: "yogurt",
      },
      { word: "გამოაცხვეთ", translationRu: "испечь", translationEn: "to bake" },
      { word: "გახეხეთ", translationRu: "натереть", translationEn: "to grate" },
      { word: "წაუსვით", translationRu: "смазать", translationEn: "to spread" },
    ],
  },
  {
    recipeId: "ka#mtsvadi",
    language: "ka",
    title: "მწვადი (Mtsvadi)",
    titleRu: "Мцвади (шашлык)",
    emoji: "🍢",
    description: "წვნიანი მწვადი ნახშირზე — ქართული დღესასწაულის გული.",
    descriptionRu: "Сочный мцвади на углях — сердце грузинского праздника.",
    ingredients: [
      {
        name: "ღორის ხორცი",
        amount: "1 კგ",
        translationRu: "свинина",
        translationEn: "pork",
      },
      {
        name: "ხახვი",
        amount: "3 ცალი",
        translationRu: "лук",
        translationEn: "onion",
      },
      {
        name: "ლიმონი",
        amount: "1 ცალი",
        translationRu: "лимон",
        translationEn: "lemon",
      },
      {
        name: "მარილი",
        amount: "1 ს/კ",
        translationRu: "соль",
        translationEn: "salt",
      },
      {
        name: "შავი პილპილი",
        amount: "1 ჩ/კ",
        translationRu: "чёрный перец",
        translationEn: "black pepper",
      },
      {
        name: "ქინძი",
        amount: "1 კონა",
        translationRu: "кинза",
        translationEn: "cilantro",
      },
      {
        name: "ნიორი",
        amount: "4 კბილი",
        translationRu: "чеснок",
        translationEn: "garlic",
      },
    ],
    instructions:
      "დაჭერით ხორცი დიდ ნაჭრებად. დაჭერით ხახვი რგოლებად. აურიეთ ხორცი, ხახვი, ლიმონის წვენი, მარილი, პილპილი და დაჭრილი ქინძი. გა�ერეთ მაცივარში 4-6 საათი. დააწყვეთ შამფურებზე. გამოაცხვეთ ნახშირზე 15-20 წუთი. მიირთვით ხახვის რგოლებთან და ლავაშთან ერთად.",
    instructionsRu:
      "Нарежьте мясо крупными кусками. Нарежьте лук кольцами. Смешайте мясо, лук, лимонный сок, соль, перец и нарезанную кинзу. Оставьте в холодильнике на 4-6 часов. Нанижите на шампуры. Жарьте на углях 15-20 минут. Подавайте с кольцами лука и лавашом.",
    newWords: [
      { word: "შამფური", translationRu: "шампур", translationEn: "skewer" },
      { word: "ნახშირი", translationRu: "уголь", translationEn: "charcoal" },
      {
        word: "დააწყვეთ",
        translationRu: "нанизать",
        translationEn: "to skewer",
      },
      {
        word: "გააჩერეთ",
        translationRu: "оставить/мариновать",
        translationEn: "to marinate",
      },
      { word: "ლავაში", translationRu: "лаваш", translationEn: "lavash" },
    ],
  },
  {
    recipeId: "ka#pkhali",
    language: "ka",
    title: "ფხალი (Pkhali)",
    titleRu: "Пхали",
    emoji: "🥗",
    description: "ფხალი — ბოსტნეულის საჭმელი ნიგვზიანი სოუზით.",
    descriptionRu: "Пхали — закуска из овощей с ореховым соусом.",
    ingredients: [
      {
        name: "ისპანახი",
        amount: "500 გ",
        translationRu: "шпинат",
        translationEn: "spinach",
      },
      {
        name: "ნიგოზი",
        amount: "100 გ",
        translationRu: "грецкие орехи",
        translationEn: "walnuts",
      },
      {
        name: "ნიორი",
        amount: "3 კბილი",
        translationRu: "чеснок",
        translationEn: "garlic",
      },
      {
        name: "ქინძი",
        amount: "1 კონა",
        translationRu: "кинза",
        translationEn: "cilantro",
      },
      {
        name: "ძმარი",
        amount: "2 ს/კ",
        translationRu: "уксус",
        translationEn: "vinegar",
      },
      {
        name: "მარილი",
        amount: "1 ჩ/კ",
        translationRu: "соль",
        translationEn: "salt",
      },
      {
        name: "ხმელი სუნელი",
        amount: "1 ჩ/კ",
        translationRu: "хмели-сунели",
        translationEn: "khmeli-suneli",
      },
    ],
    instructions:
      "მოხარშეთ ისპანახი 5 წუთი. გადაწურეთ და დაჭერით. დაჭერით ნიგოზი წვრილად. აურიეთ ისპანახი, ნიგოზი, დაჭრილი ნიორი, ქინძი, ძმარი, მარილი და ხმელი სუნელი. გააკეთეთ პატარა ბურთულები. გააჩერეთ მაცივარში 1 საათი. მიირთვით ბროწეულის მარცვლებთან ერთად.",
    instructionsRu:
      "Отварите шпинат 5 минут. Отожмите и мелко нарежьте. Измельчите грецкие орехи. Смешайте шпинат, орехи, измельчённый чеснок, кинзу, уксус, соль и хмели-сунели. Сформируйте маленькие шарики. Оставьте в холодильнике на 1 час. Подавайте с зёрнами граната.",
    newWords: [
      { word: "ისპანახი", translationRu: "шпинат", translationEn: "spinach" },
      {
        word: "ნიგოზი",
        translationRu: "грецкий орех",
        translationEn: "walnut",
      },
      { word: "ძმარი", translationRu: "уксус", translationEn: "vinegar" },
      {
        word: "ხმელი სუნელი",
        translationRu: "хмели-сунели",
        translationEn: "khmeli-suneli",
      },
      {
        word: "ბროწეული",
        translationRu: "гранат",
        translationEn: "pomegranate",
      },
    ],
  },
];

const RECIPES_BY_LANGUAGE: Record<string, RecipeData[]> = {
  fi: FINNISH_RECIPES,
  sr: SERBIAN_RECIPES,
  ka: GEORGIAN_RECIPES,
};

export function getRecipesByLanguage(language: string): RecipeData[] {
  return RECIPES_BY_LANGUAGE[language] ?? [];
}

export function getRecipeById(recipeId: string): RecipeData | undefined {
  for (const recipes of Object.values(RECIPES_BY_LANGUAGE)) {
    const found = recipes.find((r) => r.recipeId === recipeId);
    if (found) return found;
  }
  return undefined;
}

export function getNextRecipe(
  language: string,
  unlockedRecipeIds: string[]
): RecipeData | null {
  const langRecipes = getRecipesByLanguage(language);
  if (langRecipes.length === 0) return null;

  const unlockedInLang = unlockedRecipeIds.filter((id) =>
    id.startsWith(`${language}#`)
  );

  const nextIndex = unlockedInLang.length % langRecipes.length;
  return langRecipes[nextIndex];
}

export const ALL_RECIPES: RecipeData[] = [
  ...FINNISH_RECIPES,
  ...SERBIAN_RECIPES,
  ...GEORGIAN_RECIPES,
];
