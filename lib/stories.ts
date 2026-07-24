export interface CulturalStory {
  text: string;
  translationRu: string;
  language: string;
}

const finnishStories: CulturalStory[] = [
  {
    text: "Pekka soittaa lääkärille: 'Tohtori, tohtori, käteni tärisee koko ajan.' Lääkäri kysyy: 'Juotko paljon kahvia?' 'En', Pekka vastaa. Lääkäri sanoo: 'Noanko sitten vielä joskus tärisee, kun juot?'",
    translationRu:
      "Пекка звонит врачу: «Доктор, доктор, у меня всё время дрожит рука». Врач спрашивает: «Много кофе пьёшь?» — «Нет», — отвечает Пекка. Врач говорит: «Ну когда-нибудь ещё дрожит, когда пьёшь?»",
    language: "fi",
  },
  {
    text: "Kaksi suomalaista seisoo pysäkillä. Toinen sanoo: 'Onpa lämmin.' Toinen vastaa: 'Joo.' Kolmen tunnin päästä ensimmäinen sanoo: 'Olisko pitänyt ottaa vettä mukaan.'",
    translationRu:
      "Двое финнов стоят на остановке. Один говорит: «Жарковато». Второй отвечает: «Ага». Через три часа первый говорит: «Надо было воду с собой взять».",
    language: "fi",
  },
  {
    text: "Mitä eroa on suomalaisella ja norjalaisella? Norjalainen sanoo 'Kyllä, kiitos' ja tarkoittaa sitä. Suomalainen sanoo 'Ehkä' ja tarkoittaa 'Ei'.",
    translationRu:
      "Какая разница между финном и норвежцем? Норвежец говорит «Да, спасибо» и имеет это в виду. Финн говорит «Может быть» и имеет в виду «Нет».",
    language: "fi",
  },
  {
    text: "Suomalainen tulee kotiin ja vaimo kysyy: 'Oliko hyvä päivä töissä?' Mies miettii viisi minuuttia ja sanoo: 'Ihan ok.' Se on suomalainen suuri intohimo.",
    translationRu:
      "Финн приходит домой, жена спрашивает: «Хороший день на работе?» Муж думает пять минут и говорит: «Нормально». Это финская великая страсть.",
    language: "fi",
  },
  {
    text: "Suomalainen menee baariin ja tilaa oluen. Tarjoilija tuo oluen. Tunnin päästä suomalainen sanoo: 'Se on kylmä.' Tarjoilija vastaa: 'Niin on.' Suomalainen sanoo: 'No hyvä.'",
    translationRu:
      "Финн заходит в бар и заказывает пиво. Официант приносит пиво. Через час финн говорит: «Холодное». Официант отвечает: «Да». Финн говорит: «Ну хорошо».",
    language: "fi",
  },
  {
    text: "Mikä on suomalaisen mielestä paras asia saunassa? Se, ettei kenenkään tarvitse puhua.",
    translationRu:
      "Что финн считает лучшим в сауне? То, что никому не нужно разговаривать.",
    language: "fi",
  },
  {
    text: "Suomalainen sanoo hymyillen. Ei, se on liian epärealistinen aloitus edes vitsille.",
    translationRu:
      "Финн говорит с улыбкой. Нет, это слишком нереалистичное начало даже для шутки.",
    language: "fi",
  },
  {
    text: "Kun suomalainen sanoo: 'Puhutaan myöhemmin', se tarkoittaa ensi viikkoa. Kun hän sanoo: 'Soitellaan', se tarkoittaa ensi kuuta. Kun hän sanoo: 'Nähdään joskus', se tarkoittaa ei koskaan.",
    translationRu:
      "Когда финн говорит: «Поговорим позже», это значит на следующей неделе. Когда он говорит: «Позвоню», это значит в следующем месяце. Когда он говорит: «Увидимся когда-нибудь», это значит никогда.",
    language: "fi",
  },
];

const serbianStories: CulturalStory[] = [
  {
    text: "Dođe čovek kod lekara i kaže: 'Doktore, boli me glava.' Kaže lekar: 'Pijte čaj od kamilice.' 'Hvala vam, doktore.' Posle nedelju dana, čovek se vrati: 'Doktore, i dalje me boli glava, pio sam čaj.' Kaže lekar: 'Čaj od kamilice?' 'Pa da.' 'A koliko šoljica dnevno?' 'Četiri-pet. Uz rakiju.'",
    translationRu:
      "Приходит человек к врачу и говорит: «Доктор, у меня голова болит». Врач говорит: «Пейте ромашковый чай». «Спасибо, доктор». Через неделю человек возвращается: «Доктор, голова всё ещё болит, я пил чай». Врач спрашивает: «Ромашковый чай?» — «Ну да». — «А сколько чашек в день?» — «Четыре-пять. С ракией».",
    language: "sr",
  },
  {
    text: "Sedeli baka i deka na klupi. Baka kaže: 'Milorade, hoćeš da ti skuvam kafu?' 'Hoću.' 'Hoćeš da ti napravim sendvič?' 'Hoću.' 'Hoćeš li da prošetaš?' 'Hoću, ali bez brige, ja ću i bez tebe.'",
    translationRu:
      "Сидят бабушка и дедушка на скамейке. Бабушка говорит: «Милорад, хочешь сварю тебе кофе?» «Хочу». «Хочешь сделаю бутерброд?» «Хочу». «Хочешь прогуляться?» «Хочу, но не волнуйся, я и без тебя».",
    language: "sr",
  },
  {
    text: "Pita pitalica: Šta je najtiše na svetu? Odgovor: Srbin koji ćuti. A šta je još tiše? Dvojica Srbina koji ćute.",
    translationRu:
      "Загадка: Что самое тихое в мире? Ответ: Серб, который молчит. А что ещё тише? Двое сербов, которые молчат.",
    language: "sr",
  },
  {
    text: "Kaže Baka: 'Sine, dođi, napravila sam ti pitu.' 'Hvala, baka, nemam vremena.' 'Kako nemaš vremena za pitu?! Pa to je nepravda prema familiji!'",
    translationRu:
      "Говорит бабушка: «Сынок, приходи, я испекла тебе питу». «Спасибо, бабушка, у меня нет времени». «Как это нет времени на питу?! Да это несправедливо по отношению к семье!»",
    language: "sr",
  },
  {
    text: "Ide Srbin ulicom i vidi prijatelja sa velikom lubenicom. Pita ga: 'Brate, šta će ti to?' Ovaj kaže: 'Doneo sam kući zetu.' Prvi se začudi: 'Pa to je lubenica!' Drugi odgovori: 'Ja znam, ali zet misli da je dinja.'",
    translationRu:
      "Идёт серб по улице и видит друга с большим арбузом. Спрашивает: «Брат, зачем тебе это?» Тот говорит: «Несу домой зятю». Первый удивляется: «Так это же арбуз!» Второй отвечает: «Я знаю, но зять думает, что это дыня».",
    language: "sr",
  },
  {
    text: "Vic: Zašto Srbi piju kafu iz malih šoljica? Zato što velike nisu dovoljno male za rakiju.",
    translationRu:
      "Шутка: Почему сербы пьют кофе из маленьких чашек? Потому что большие недостаточно малы для ракии.",
    language: "sr",
  },
  {
    text: "Razgovaraju dva komšije: 'Čuješ, je l' ti znaš onog novog u zgradi?' 'Znam.' 'Kakav je čovek?' 'Pa... kako da ti kažem... normalan.' 'Hvala bogu, bar jedan normalan u celoj zgradi!'",
    translationRu:
      "Разговаривают два соседа: «Слышь, ты знаешь того нового в здании?» «Знаю». «Что за человек?» «Ну... как тебе сказать... нормальный». «Слава богу, хоть один нормальный во всём доме!»",
    language: "sr",
  },
  {
    text: "Kaže ćerkica baki: 'Baka, zašto ti je lice tako lepo?' Baka se nasmeje: 'Zato što sam puno smejala u životu, mila.' 'A zašto su ti onda ruke tako grube?' 'Zato što su mnogo radile da bi ti imala šta da jedeš, zlatna.'",
    translationRu:
      "Говорит внучка бабушке: «Бабушка, почему у тебя такое красивое лицо?» Бабушка смеётся: «Потому что я много смеялась в жизни, милая». «А почему тогда у тебя такие грубые руки?» «Потому что они много работали, чтобы тебе было что есть, золотая».",
    language: "sr",
  },
];

const georgianStories: CulturalStory[] = [
  {
    text: "ხუმრობა: ერთი ქართველი ზის ქეიფზე. მეორე ეკითხება: 'რატომ არ სვამ?' პირველი პასუხობს: 'ექიმმა ამიკრძალა.' მეორე: 'ექიმმა?! შენ ექიმს უსმენ?!'",
    translationRu:
      "Шутка: Сидит один грузин на застолье. Другой спрашивает: «Почему не пьёшь?» Первый отвечает: «Врач запретил». Второй: «Врач?! Ты врача слушаешь?!»",
    language: "ka",
  },
  {
    text: "ქართული ანდაზა: სტუმარი ღმერთია. თუ სტუმარი გყავს, ყველაფერი გადადე, სანამ ის არაა ნაჭამი და ნასვამი.",
    translationRu:
      "Грузинская пословица: Гость — это бог. Если у тебя гость, отложи всё, пока он не наелся и не напился.",
    language: "ka",
  },
  {
    text: "კაცი შედის რესტორანში და ამბობს: 'მაპატიეთ, რამდენი ღირს ხინკალი?' მიმტანი პასუხობს: 'ერთი ხინკალი 3 ლარი.' კაცი: 'მოიყვანეთ 50!' მიმტანი: '50?! მარტო?' კაცი: 'მე მარტო ვარ, მაგრამ ხინკალი მარტო არ უნდა ჭამო!'",
    translationRu:
      "Мужчина заходит в ресторан и говорит: «Извините, сколько стоит хинкали?» Официант отвечает: «Один хинкали — 3 лари». Мужчина: «Принесите 50!» Официант: «50?! Одному?» Мужчина: «Я один, но хинкали в одиночку есть нельзя!»",
    language: "ka",
  },
  {
    text: "ქართული ტრადიცია: როცა ქართველი ამბობს 'ცოტა ხნით ჩამოვალ', ეს ნიშნავს, რომ ის დარჩება მინიმუმ სამი დღე. თუ ამბობს 'ერთი ჭიქა ღვინოს დავლევ', ეს ნიშნავს, რომ მთელი ქვევრი ცარიელი დარჩება.",
    translationRu:
      "Грузинская традиция: Когда грузин говорит «зайду ненадолго», это значит, что он останется минимум на три дня. Если говорит «выпью один бокал вина», это значит, что весь кувшин опустеет.",
    language: "ka",
  },
  {
    text: "შეხვდებიან ორი მეგობარი. ერთი ამბობს: 'როგორ ხარ?' მეორე: 'კარგად, მაგრამ ცოლი მეუბნება, რომ ძალიან ბევრს ვლაპარაკობ.' 'და მართლა?' 'დიახ! მე ვამბობ, რომ ყველაფერი კარგადაა, ის კი ფიქრობს, რომ ეს ცოტაა!'",
    translationRu:
      "Встречаются два друга. Один говорит: «Как дела?» Второй: «Хорошо, но жена говорит, что я слишком много говорю». — «И правда?» — «Да! Я говорю, что всё хорошо, а она считает, что этого мало!»",
    language: "ka",
  },
  {
    text: "კითხვა: რატომ არ შეიძლება ქართველს ჩუმად ჯდომა? პასუხი: იმიტომ, რომ ის ყოველთვის ფიქრობს, რომ რაღაც თქმა ავიწყდება.",
    translationRu:
      "Вопрос: Почему грузин не может сидеть молча? Ответ: Потому что он всё время думает, что забыл что-то сказать.",
    language: "ka",
  },
  {
    text: "თქვენ იცით, რატომ არის ქართული ღვინო საუკეთესო? იმიტომ, რომ ქართველი ყურძენს ელაპარაკება. ყურძენი კი გრძნობს, რომ უყვართ და ტკბილი ხდება.",
    translationRu:
      "Знаете, почему грузинское вино лучшее? Потому что грузин разговаривает с виноградом. А виноград чувствует, что его любят, и становится сладким.",
    language: "ka",
  },
  {
    text: "ქართული სუფრის წესი: ჭიქა ღვინო ხელში გიჭირავს, მაგრამ თუ თამადამ ჯერ არ უთქვამს სადღეგრძელო, მაშინ ღვინო ჯერ არ არის ღვინო — ის უბრალოდ ტკბილი წვენია.",
    translationRu:
      "Правило грузинского стола: у тебя в руке бокал вина, но если тамада ещё не сказал тост, то вино ещё не вино — это просто сладкий сок.",
    language: "ka",
  },
];

export const storiesByLanguage: Record<string, CulturalStory[]> = {
  fi: finnishStories,
  sr: serbianStories,
  ka: georgianStories,
};

export function getRandomStory(language: string): CulturalStory | null {
  const stories = storiesByLanguage[language] ?? finnishStories;
  if (stories.length === 0) return null;
  const index = Math.floor(Math.random() * stories.length);
  return stories[index];
}
