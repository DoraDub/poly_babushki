import type { NewsArticle } from "@/lib/newsapi";
import type { CategoryId } from "./constants";

export type MockNewsArticle = NewsArticle;

export interface Service {
  id: string;
  name: string;
  description?: string;
  status: "active" | "inactive" | "deploying";
  url?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  userId: string;
  language: string;
  categories: CategoryId[];
  updatedAt: string;
}

export interface MockVocabularyItem {
  userId: string;
  sk: string;
  word: string;
  language: string;
  translationRu: string;
  translationEn: string;
  articleUrl?: string;
  articleTitle?: string;
  createdAt: string;
}

export const mockServices: Service[] = [
  {
    id: "mock-service-1",
    name: "API Gateway",
    description: "Шлюз для микросервисной архитектуры",
    status: "active",
    url: "https://api.example.com",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "mock-service-2",
    name: "Auth Service",
    description: "Сервис аутентификации и авторизации",
    status: "active",
    url: "https://auth.example.com",
    createdAt: new Date("2024-02-01").toISOString(),
    updatedAt: new Date("2024-02-01").toISOString(),
  },
  {
    id: "mock-service-3",
    name: "ML Pipeline",
    description: "Пайплайн для обработки данных с AI",
    status: "deploying",
    url: undefined,
    createdAt: new Date("2024-03-10").toISOString(),
    updatedAt: new Date("2024-03-10").toISOString(),
  },
];

export const mockUserPreferences: UserPreferences = {
  userId: "mock-user",
  language: "fi",
  categories: [
    "culture",
    "entertainment",
    "lifestyle",
    "science",
    "technology",
    "health",
    "education",
    "sports",
  ] as CategoryId[],
  updatedAt: new Date().toISOString(),
};

export const mockNewsArticles: MockNewsArticle[] = [
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Matti Virtanen",
    title: "Suomen hallitus esittää uutta koulutusohjelmaa",
    description:
      "Hallitus on julkistanut uuden koulutusohjelman, joka keskittyy digitaalisiin taitoihin ja kieltenopetukseen. Ohjelma saa osakseen sekä kiitosta että kritiikkiä.",
    url: "https://yle.fi/uutiset/example1",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "Hallitus on julkistanut uuden koulutusohjelman...",
    category: "education",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Leena Korhonen",
    title: "Suomi voitti jalkapallon MM-karsinnoissa",
    description:
      "Suomen jalkapallomaajoukkue otti tärkeän voiton MM-karsinnoissa. Ottelu päättyi 2-1 ja joukkue on nyt lähellä lopputurnausta.",
    url: "https://yle.fi/uutiset/example2",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "Suomen jalkapallomaajoukkue pelasi upean ottelun...",
    category: "sports",
  },
  {
    source: { id: "hs", name: "Helsingin Sanomat" },
    author: "Anna Nieminen",
    title: "Helsingin juhlaviikot houkuttelevat ennätysyleisöä",
    description:
      "Helsingin juhlaviikot ovat keränneet tänä vuonna ennätysmäärän kävijöitä. Ohjelmassa on teatteria, musiikkia ja kuvataidetta ympäri maailmaa.",
    url: "https://hs.fi/kulttuuri/example3",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: "Helsingin juhlaviikot ovat alkaneet...",
    category: "culture",
  },
  {
    source: { id: "il", name: "Iltalehti" },
    author: "Pekka Mäkelä",
    title: "Sääennuste: Lämmin viikonloppu edessä",
    description:
      "Ilmatieteen laitos ennustaa lämmintä ja aurinkoista viikonloppua koko maahan. Lämpötilat nousevat jopa 25 asteeseen etelässä.",
    url: "https://iltalehti.fi/saa/example4",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: "Suomeen on saapumassa lämmintä ilmaa...",
    category: "lifestyle",
  },
  {
    source: { id: "tekniikka", name: "Tekniikka & Talous" },
    author: "Satu Lehtonen",
    title: "Suomi panostaa vihreään siirtymään",
    description:
      "Uusi vihreän energian hanke saa merkittävän investointituen valtiolta. Hankkeen arvioidaan luovan satoja uusia työpaikkoja.",
    url: "https://tekniikkatalous.fi/example6",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: "Vihreä siirtymä etenee Suomessa...",
    category: "technology",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Juha Paananen",
    title: "Suomi kehittää uutta kvanttitietokone-teknologiaa",
    description:
      "Suomalainen tutkimusryhmä on saavuttanut läpimurron kvanttitietokoneiden kehityksessä. Uusi menetelmä voi nopeuttaa laskentaa merkittävästi.",
    url: "https://yle.fi/uutiset/example7",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 18000000).toISOString(),
    content: "Kvanttitietokoneet ovat askelta lähempänä...",
    category: "science",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Maria Jokinen",
    title: "Eduskunta keskustelee uudesta ilmastolaista",
    description:
      "Eduskunta aloittaa keskustelun uudesta ilmastolaista, joka kiristäisi Suomen päästötavoitteita. Lakiesitys on herättänyt vilkasta keskustelua.",
    url: "https://yle.fi/uutiset/example8",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 21600000).toISOString(),
    content: "Ilmastolaki on eduskunnan käsittelyssä...",
    category: "education",
  },
  {
    source: { id: "hs", name: "Helsingin Sanomat" },
    author: "Timo Laaksonen",
    title: "Suomalainen startup sai miljoonarahoituksen",
    description:
      "Helsinkiläinen tekoälystartup on kerännyt 10 miljoonan euron rahoituksen kansainvälisiltä sijoittajilta. Yritys laajentaa toimintaansa Eurooppaan.",
    url: "https://hs.fi/talous/example9",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 25200000).toISOString(),
    content: "Suomalainen startup-kenttä elää...",
    category: "lifestyle",
  },
  {
    source: { id: "il", name: "Iltalehti" },
    author: "Riikka Aaltonen",
    title: "Suomen jääkiekkoliitto panostaa nuoriin",
    description:
      "Jääkiekkoliitto on julkistanut uuden ohjelman nuorten pelaajien kehittämiseksi. Ohjelmaan kuuluu valmennusta ja turnauksia.",
    url: "https://iltalehti.fi/urheilu/example10",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 28800000).toISOString(),
    content: "Jääkiekkoliitto haluaa kehittää nuoria...",
    category: "sports",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Elina Keto",
    title: "Uusi musiikkifestivaali saapuu Turkuun",
    description:
      "Turku saa uuden kansainvälisen musiikkifestivaalin, joka kokoaa yhteen tunnettuja artisteja ympäri maailmaa. Festivaali järjestetään elokuussa.",
    url: "https://yle.fi/uutiset/example11",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 32400000).toISOString(),
    content: "Turun kulttuuritarjonta monipuolistuu...",
    category: "culture",
  },
  {
    source: { id: "hs", name: "Helsingin Sanomat" },
    author: "Antti Salonen",
    title: "Tutkimus: Liikunta parantaa muistia",
    description:
      "Tuore suomalaistutkimus osoittaa, että säännöllinen liikunta parantaa muistia ja kognitiivisia toimintoja. Tutkimus julkaistiin kansainvälisessä tiedelehdessä.",
    url: "https://hs.fi/terveys/example12",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 36000000).toISOString(),
    content: "Liikunnan hyödyt aivoille ovat kiistattomat...",
    category: "health",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Krista Kosonen",
    title: "Suomen kirjailijat menestyvät kansainvälisillä markkinoilla",
    description:
      "Suomalainen kirjallisuus on noussut maailmanlaajuiseen suosioon. Useita suomenkielisiä teoksia on käännetty kymmenille kielille.",
    url: "https://yle.fi/uutiset/example13",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 39600000).toISOString(),
    content: "Suomen kirjallisuus valloittaa maailmaa...",
    category: "culture",
  },
  {
    source: { id: "hs", name: "Helsingin Sanomat" },
    author: "Mikko Leppänen",
    title: "Uusi puisto avataan Helsingin keskustaan",
    description:
      "Helsinkiin on valmistunut uusi kaupunkipuisto, joka tarjoaa virkistysaluetta keskellä kaupunkia.",
    url: "https://hs.fi/kaupunki/example14",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 43200000).toISOString(),
    content: "Uusi puisto ilahduttaa helsinkiläisiä...",
    category: "lifestyle",
  },
  {
    source: { id: "il", name: "Iltalehti" },
    author: "Sari Mäkinen",
    title: "Suomi sijoittuu hyvin kansainvälisessä PISA-vertailussa",
    description:
      "Suomalaiset oppilaat ovat jälleen huipputasoa kansainvälisessä PISA-tutkimuksessa.",
    url: "https://iltalehti.fi/koulutus/example15",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 46800000).toISOString(),
    content: "PISA-tulokset julki...",
    category: "education",
  },
  {
    source: { id: "tekniikka", name: "Tekniikka & Talous" },
    author: "Jukka Nieminen",
    title: "5G-verkko laajenee koko Suomeen",
    description:
      "Suomen 5G-verkko kattaa nyt yli 90% väestöstä, mikä mahdollistaa uusia digitaalisia palveluita.",
    url: "https://tekniikkatalous.fi/example16",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 50400000).toISOString(),
    content: "5G-verkon laajennus etenee...",
    category: "technology",
  },
  {
    source: { id: "yle", name: "Yle Uutiset" },
    author: "Pasi Kivimäki",
    title: "Avaruustutkimus: Suomalainen satelliitti laukaistaan onnistuneesti",
    description:
      "Suomalainen tutkimussatelliitti on lähetetty avaruuteen, ja se kerää tietoa ilmakehän tilasta.",
    url: "https://yle.fi/uutiset/example17",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 54000000).toISOString(),
    content: "Satelliitti on nyt kiertoradalla...",
    category: "science",
  },
  {
    source: { id: "hs", name: "Helsingin Sanomat" },
    author: "Riitta Mäkelä",
    title: "Suomen hiihtäjät menestyvät maailmancupissa",
    description:
      "Suomen hiihtomaajoukkue on saavuttanut useita palkintosijoja maailmancupin osakilpailuissa.",
    url: "https://hs.fi/urheilu/example18",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 57600000).toISOString(),
    content: "Hiihtäjät ovat huippukunnossa...",
    category: "sports",
  },
  {
    source: { id: "il", name: "Iltalehti" },
    author: "Laura Lehtinen",
    title: "Uusi lääkehoito helpottaa allergioita",
    description:
      "Terveydenhuollossa on otettu käyttöön uusi lääkehoito, joka auttaa allergikoita ympäri vuoden.",
    url: "https://iltalehti.fi/terveys/example20",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 64800000).toISOString(),
    content: "Uusi allergialääke on osoittautunut tehokkaaksi...",
    category: "health",
  },
];

export const mockSerbianNews: MockNewsArticle[] = [
  {
    source: { id: "rts", name: "RTS" },
    author: "Jovana Petrović",
    title: "Novi program obrazovanja u Srbiji",
    description:
      "Ministarstvo prosvete predstavilo je novi program obrazovanja koji uključuje digitalne veštine i strane jezike od prvog razreda.",
    url: "https://rts.rs/example1",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "Novi program obrazovanja donosi značajne promene...",
    category: "education",
  },
  {
    source: { id: "b92", name: "B92" },
    author: "Marko Jovanović",
    title: "Srbija pobedila u kvalifikacijama za Evropsko prvenstvo",
    description:
      "Fudbalska reprezentacija Srbije ostvarila je važnu pobedu u kvalifikacijama i približila se plasmanu na Evropsko prvenstvo.",
    url: "https://b92.net/sport/example2",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: "Srbija je odigrala sjajan meč...",
    category: "sports",
  },
  {
    source: { id: "politika", name: "Politika" },
    author: "Mila Nedeljković",
    title: "Beogradski festival kulture privlači rekordnu publiku",
    description:
      "Beogradski letnji festival okupio je umetnike iz celog sveta. Program uključuje pozorište, muziku i izložbe.",
    url: "https://politika.rs/kultura/example3",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: "Festival kulture u Beogradu je počeo...",
    category: "culture",
  },
  {
    source: { id: "blic", name: "Blic" },
    author: "Ana Đorđević",
    title: "Zdrav život: Kako vežbanje poboljšava pamćenje",
    description:
      "Novo istraživanje pokazuje da redovna fizička aktivnost poboljšava pamćenje i kognitivne funkcije kod svih uzrasta.",
    url: "https://blic.rs/zdravlje/example4",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    content: "Vežbanje ima brojne benefite za mozak...",
    category: "health",
  },
  {
    source: { id: "nova", name: "Nova S" },
    author: "Stefan Popović",
    title: "Srpski IT sektor nastavlja da raste",
    description:
      "Informacione tehnologije su i dalje najbrže rastući sektor u Srbiji sa prosečnim rastom od 15% godišnje.",
    url: "https://nova.rs/tehnologija/example5",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: "IT sektor u Srbiji beleži kontinuirani rast...",
    category: "technology",
  },
  {
    source: { id: "rts", name: "RTS" },
    author: "Sofija Nikolić",
    title: "Prolećna prognoza: Topli dani pred nama",
    description:
      "Republički hidrometeorološki zavod najavljuje toplu i sunčanu nedelju sa temperaturama do 25 stepeni.",
    url: "https://rts.rs/vreme/example6",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: "Proleće je stiglo u Srbiju...",
    category: "lifestyle",
  },
  {
    source: { id: "b92", name: "B92" },
    author: "Nikola Stojanović",
    title: "Srpski naučnici razvijaju novu tehnologiju veštačke inteligencije",
    description:
      "Tim istraživača sa Univerziteta u Beogradu postigao je značajan napredak u razvoju AI sistema za medicinsku dijagnostiku.",
    url: "https://b92.net/nauka/example7",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: "Veštačka inteligencija iz Srbije...",
    category: "science",
  },
];

export const mockGeorgianNews: MockNewsArticle[] = [
  {
    source: { id: "ambebi", name: "Ambebi" },
    author: "ნინო მეფარიშვილი",
    title: "საქართველოში განათლების ახალი რეფორმა იწყება",
    description:
      "განათლების სამინისტრომ წარმოადგინა ახალი სასწავლო პროგრამა, რომელიც ციფრულ უნარებსა და ენების სწავლებას ეხება.",
    url: "https://ambebi.ge/example1",
    urlToImage: null,
    publishedAt: new Date().toISOString(),
    content: "ახალი რეფორმა განათლების სისტემაში...",
    category: "education",
  },
  {
    source: { id: "interpress", name: "Interpressnews" },
    author: "გიორგი ბერიანიძე",
    title: "საქართველოს ნაკრებმა მნიშვნელოვანი მატჩი მოიგო",
    description:
      "საქართველოს ეროვნულმა საფეხბურთო ნაკრებმა ევროპის ჩემპიონატის შესარჩევ მატჩში მნიშვნელოვანი გამარჯვება მოიპოვა.",
    url: "https://interpressnews.ge/sport/example2",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 1800000).toISOString(),
    content: "საქართველოს ნაკრებმა შესანიშნავი თამაში აჩვენა...",
    category: "sports",
  },
  {
    source: { id: "netgazeti", name: "Netgazeti" },
    author: "თამარ კაპანაძე",
    title: "თბილისის საერთაშორისო კინოფესტივალი იწყება",
    description:
      "თბილისის საერთაშორისო კინოფესტივალი წელს რეკორდული რაოდენობის ფილმებს წარადგენს მსოფლიოს სხვადასხვა ქვეყნიდან.",
    url: "https://netgazeti.ge/kultura/example3",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    content: "კინოფესტივალი თბილისში იწყება...",
    category: "culture",
  },
  {
    source: { id: "agenda", name: "Agenda.ge" },
    author: "მარიამ ჩხეიძე",
    title: "ჯანსაღი ცხოვრება: ვარჯიში აუმჯობესებს მეხსიერებას",
    description:
      "ახალი ქართული კვლევა ადასტურებს, რომ რეგულარული ვარჯიში მნიშვნელოვნად აუმჯობესებს მეხსიერებას და კოგნიტურ ფუნქციებს.",
    url: "https://agenda.ge/health/example4",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 5400000).toISOString(),
    content: "ვარჯიშის სარგებელი ტვინისთვის...",
    category: "health",
  },
  {
    source: { id: "forbes", name: "Forbes Georgia" },
    author: "ირაკლი ჭელიძე",
    title: "ქართული ტექნოლოგიური სტარტაპები იზრდებიან",
    description:
      "ქართული ტექნოლოგიური კომპანიები აგრძელებენ ზრდას და იზიდავენ უცხოურ ინვესტიციებს. IT სექტორი წელს 20%-ით გაიზარდა.",
    url: "https://forbes.ge/teq/example5",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    content: "ქართული IT სექტორი ზრდას აგრძელებს...",
    category: "technology",
  },
  {
    source: { id: "ambebi", name: "Ambebi" },
    author: "მაია გიორგაძე",
    title: "ამინდის პროგნოზი: თბილი კვირა გველის",
    description:
      "გარემოს ეროვნული სააგენტო თბილისსა და მთელ საქართველოში მზიან და თბილ ამინდს პროგნოზირებს ტემპერატურით 30 გრადუსამდე.",
    url: "https://ambebi.ge/amindi/example6",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    content: "თბილი ამინდი საქართველოში...",
    category: "lifestyle",
  },
  {
    source: { id: "interpress", name: "Interpressnews" },
    author: "დავით ბერიძე",
    title: "ქართველი მეცნიერები ავითარებენ კიბოს დიაგნოსტიკის ახალ მეთოდს",
    description:
      "თბილისის სახელმწიფო უნივერსიტეტის მეცნიერებმა შეიმუშავეს ინოვაციური მეთოდი კიბოს ადრეული დიაგნოსტიკისთვის.",
    url: "https://interpressnews.ge/meцn/example7",
    urlToImage: null,
    publishedAt: new Date(Date.now() - 14400000).toISOString(),
    content: "ახალი მეთოდი კიბოს დიაგნოსტიკაში...",
    category: "science",
  },
];

export const mockNewsByLanguage: Record<string, MockNewsArticle[]> = {
  fi: mockNewsArticles,
  sr: mockSerbianNews,
  ka: mockGeorgianNews,
};

export function getMockNews(language: string): MockNewsArticle[] {
  return mockNewsByLanguage[language] ?? mockNewsArticles;
}

export interface MockUserProfile {
  userId: string;
  name: string;
  gender: "male" | "female" | "neutral";
  language: string;
  updatedAt: string;
}

export const mockUserProfile: MockUserProfile = {
  userId: "mock-user",
  name: "Mikko",
  gender: "male",
  language: "fi",
  updatedAt: new Date().toISOString(),
};

export const mockVocabulary: MockVocabularyItem[] = [
  {
    userId: "mock-user",
    sk: "fi#hallitus",
    word: "hallitus",
    language: "fi",
    translationRu: "правительство",
    translationEn: "government",
    articleUrl: "https://yle.fi/uutiset/example1",
    articleTitle: "Suomen hallitus esittää uutta koulutusohjelmaa",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    userId: "mock-user",
    sk: "fi#koulutus",
    word: "koulutus",
    language: "fi",
    translationRu: "образование",
    translationEn: "education",
    articleUrl: "https://yle.fi/uutiset/example1",
    articleTitle: "Suomen hallitus esittää uutta koulutusohjelmaa",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    userId: "mock-user",
    sk: "fi#tutkimus",
    word: "tutkimus",
    language: "fi",
    translationRu: "исследование",
    translationEn: "research",
    articleUrl: "https://hs.fi/terveys/example12",
    articleTitle: "Tutkimus: Liikunta parantaa muistia",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    userId: "mock-user",
    sk: "fi#terveys",
    word: "terveys",
    language: "fi",
    translationRu: "здоровье",
    translationEn: "health",
    articleUrl: "https://hs.fi/terveys/example12",
    articleTitle: "Tutkimus: Liikunta parantaa muistia",
    createdAt: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    userId: "mock-user",
    sk: "fi#urheilu",
    word: "urheilu",
    language: "fi",
    translationRu: "спорт",
    translationEn: "sports",
    articleUrl: "https://iltalehti.fi/urheilu/example10",
    articleTitle: "Suomen jääkiekkoliitto panostaa nuoriin",
    createdAt: new Date(Date.now() - 259200000).toISOString(),
  },
];

export interface MockChatMessage {
  sessionId: string;
  createdAt: string;
  role: "user" | "assistant";
  content: string;
  translationRu: string;
  translationEn: string;
}

export interface MockUserStreak {
  userId: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  updatedAt: string;
}

export const mockUserStreak: MockUserStreak = {
  userId: "mock-user",
  currentStreak: 5,
  longestStreak: 12,
  lastActivityDate: new Date().toISOString().split("T")[0],
  updatedAt: new Date().toISOString(),
};

export interface MockUserStats {
  userId: string;
  wordsLearned: number;
  newsRead: number;
  currentStreak: number;
  totalStudyTime: number;
  newsReadByLanguage: Record<string, number>;
  wordsByLanguage: Record<string, number>;
  achievements: Record<string, string>;
  updatedAt: string;
}

export const mockUserStats: MockUserStats = {
  userId: "mock-user",
  wordsLearned: 5,
  newsRead: 12,
  currentStreak: 5,
  totalStudyTime: 180,
  newsReadByLanguage: { fi: 8, sr: 3, ka: 1 },
  wordsByLanguage: { fi: 5, sr: 0, ka: 0 },
  achievements: {
    first_news: new Date(Date.now() - 86400000).toISOString(),
    five_day_streak: new Date().toISOString(),
  },
  updatedAt: new Date().toISOString(),
};

export const mockChatMessages: MockChatMessage[] = [
  {
    sessionId: "mock-session-1",
    createdAt: new Date(Date.now() - 60000).toISOString(),
    role: "assistant",
    content:
      "Hei kultaseni! Luin juuri uutisen hallituksen uudesta koulutusohjelmasta. Mitä mieltä sinä olet tästä uudesta ohjelmasta?",
    translationRu:
      "Привет, золотко! Я только что прочитала новость о новой образовательной программе правительства. Что ты думаешь об этой новой программе?",
    translationEn:
      "Hi, sweety! I just read the news about the government's new education program. What do you think about this new program?",
  },
  {
    sessionId: "mock-session-1",
    createdAt: new Date(Date.now() - 30000).toISOString(),
    role: "user",
    content: "Se on hyvä idea, mutta tarvitsemme lisää rahoitusta.",
    translationRu: "Это хорошая идея, но нам нужно больше финансирования.",
    translationEn: "It's a good idea, but we need more funding.",
  },
];

export interface MockUserRecipe {
  userId: string;
  recipeId: string;
  language: string;
  title: string;
  titleRu: string;
  emoji: string;
  unlockedAt: string;
}

export const mockUserRecipes: MockUserRecipe[] = [
  {
    userId: "mock-user",
    recipeId: "fi#karjalanpaisti",
    language: "fi",
    title: "Karjalanpaisti",
    titleRu: "Карельское рагу",
    emoji: "🍖",
    unlockedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    userId: "mock-user",
    recipeId: "fi#lohikeitto",
    language: "fi",
    title: "Lohikeitto",
    titleRu: "Суп из лосося",
    emoji: "🐟",
    unlockedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];
