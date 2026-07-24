export interface NightDream {
  text: string;
  translationRu: string;
  language: string;
}

export interface NightWhisper {
  text: string;
  translationRu: string;
  language: string;
}

export interface NightFamilyStory {
  title: string;
  text: string;
  translationRu: string;
  language: string;
}

const dreamsFi: NightDream[] = [
  {
    text: "Näen unta vanhasta koivikosta takapihalla. Lehdet kahisevat kuin sateenvarjot. Istun siellä kahvikupin kanssa, ja aurinko lämmittää polvia. Tuntuu kuin koko maailma olisi hiljaa — vain linnut laulavat.",
    translationRu:
      "Мне снится старая берёзовая роща за домом. Листья шумят, как зонтики. Я сижу там с чашкой кофе, солнце греет колени. Кажется, будто весь мир затих — только птицы поют.",
    language: "fi",
  },
  {
    text: "Unessa kävelen halki lumisen metsän. Jokainen askeleeni on pehmeä ja kevyt. Edessä näen pienen mökin, jonka ikkunassa palaa kynttilä. Joku odottaa minua siellä, en tiedä kuka — mutta se tuntuu turvalliselta.",
    translationRu:
      "Во сне я иду по заснеженному лесу. Каждый шаг мягкий и лёгкий. Впереди вижу маленькую избушку, в окне горит свеча. Кто-то ждёт меня там, не знаю кто — но чувствую себя в безопасности.",
    language: "fi",
  },
  {
    text: "Muistan lapsuuteni kesät. Istun mummon keittiössä, hän leipoo pullaa ja annan minun maistaa taikinaa. Tuoksu on niin makea ja lämmin. Ulkona paistaa aurinko, ja kello tikittää seinällä. Sellaista on onni.",
    translationRu:
      "Я вспоминаю лето моего детства. Сижу на кухне у бабушки, она печёт булочки и даёт мне попробовать тесто. Запах такой сладкий и тёплый. На улице светит солнце, часы тикают на стене. Вот оно, счастье.",
    language: "fi",
  },
  {
    text: "Näen järven, joka on tyyni kuin peili. Soudan hiljaa keskelle, ja vesi kimaltelee auringonlaskussa. Yhtäkkiä ympärilläni on tuhansia valoja — kuin maailma hengittäisi rauhaa.",
    translationRu:
      "Я вижу озеро, гладкое как зеркало. Тихо гребу к середине, вода сверкает на закате. Вдруг вокруг меня тысячи огоньков — будто мир дышит покоем.",
    language: "fi",
  },
  {
    text: "Istun keinutuolissa villahuopa polvillani. Kuuntelen radiota, josta tulee vanha valssi. Ulkona sataa lunta, ja minä olen lämmössä ja turvassa. Tämä uni on kuin lämmin halaus.",
    translationRu:
      "Я сижу в кресле-качалке с шерстяным пледом на коленях. Слушаю радио, играет старый вальс. На улице идёт снег, а мне тепло и уютно. Этот сон как тёплое объятие.",
    language: "fi",
  },
];

const dreamsSr: NightDream[] = [
  {
    text: "Sanjam da sam dete. Trčim kroz polje suncokreta, a moja baka me zove na ručak. Njen glas je tako mio, nosi mirom pite i ljubavi. Probudim se sa osmehom i suzom.",
    translationRu:
      "Мне снится, что я ребёнок. Я бегу по полю подсолнухов, а моя бабушка зовёт меня обедать. Её голос такой родной, пахнет пирогом и любовью. Просыпаюсь с улыбкой и слезой.",
    language: "sr",
  },
  {
    text: "Sanjam staru kuću u selu. Na tremu sede Milorad i deda, piju kafu i ćute. To je najlepša tišina na svetu. Ja sam pored njih, i osećam se kao da sam opet mala.",
    translationRu:
      "Мне снится старый дом в деревне. На крыльце сидят Милорад и дедушка, пьют кофе и молчат. Это самая прекрасная тишина на свете. Я рядом с ними и чувствую себя снова маленькой.",
    language: "sr",
  },
  {
    text: "Miris lipe ispod prozora. Leto, veče, zvezde. Moja majka peva neku staru pesmu dok prebira pasulj. Ja zaspim na njenom krilu. Taj mir više ne postoji nigde osim u snovima.",
    translationRu:
      "Запах липы под окном. Лето, вечер, звёзды. Моя мама поёт старую песню, перебирая фасоль. Я засыпаю у неё на коленях. Этот покой больше нигде не найти, кроме снов.",
    language: "sr",
  },
  {
    text: "Sanjam da pečem pitu sa jabukama. Cela kuća miriše na cimet i šećer. Tijana mi pomaže, umače prste u brašno i smeje se. Kako je lepo kad je porodica na okupu.",
    translationRu:
      "Мне снится, что я пеку яблочный пирог. Весь дом пахнет корицей и сахаром. Тияна помогает мне, макает пальцы в муку и смеётся. Как хорошо, когда вся семья вместе.",
    language: "sr",
  },
  {
    text: "Hodam stazom kojom sam išla kao devojka. Sa mnom je moja najbolja drugarica. Smemo se i pričamo bez prestanka. Sunce zalazi, nama se ne žuri. Sanjam prošlost koja je još uvek živa.",
    translationRu:
      "Я иду по тропинке, по которой ходила девушкой. Со мной моя лучшая подруга. Мы смеёмся и болтаем без умолку. Солнце садится, нам некуда спешить. Я вижу прошлое, которое всё ещё живо.",
    language: "sr",
  },
];

const dreamsKa: NightDream[] = [
  {
    text: "ვოცნებობ ძველ თბილისზე. ვიწრო ქუჩები, აივნები, სადაც ყურძენია გადახლართული. ვიღაც მღერის შორიდან, და მე ვგრძნობ თბილის სუნთქვას. ეს სიზმარია, მაგრამ გული მიგრძნობს, რომ ეს სახლია.",
    translationRu:
      "Мне снится старый Тбилиси. Узкие улочки, балконы, увитые виноградом. Кто-то поёт вдалеке, и я чувствую тёплое дыхание. Это сон, но сердце чувствует — это дом.",
    language: "ka",
  },
  {
    text: "ვოცნებობ, რომ ბავშვი ვარ. ბებიაჩემი მაჭმევს ჩურჩხელას და მიღიმის. მისი ხელები თბილია, ხმა კი ისეთი ნაზი. მე მიყვარს ეს სიზმარი — ის ჰგავს ჩახუტებას, რომელიც არასდროს მთავრდება.",
    translationRu:
      "Мне снится, что я ребёнок. Моя бабушка кормит меня чурчхелой и улыбается. Её руки тёплые, голос такой нежный. Я люблю этот сон — он как объятие, которое никогда не кончается.",
    language: "ka",
  },
  {
    text: "ვოცნებობ მთებზე. მწვანე მდელოები, ცხვრის ფარა, შორს თოვლიანი მწვერვალები. ვიღაც მიმიძახებს, მაგრამ არ მინდა გაღვიძება. იქ ყველაფერი მშვიდია და ლამაზი.",
    translationRu:
      "Мне снятся горы. Зелёные луга, отара овец, заснеженные вершины вдали. Кто-то зовёт меня, но я не хочу просыпаться. Там всё спокойно и красиво.",
    language: "ka",
  },
  {
    text: "ვოცნებობ სუფრაზე. მთელი ოჯახი ირგვლივ, გივი ამბობს თავის საყვარელ თამადობას. ნინა იცინის, ლევანი ჭამს ხინკალს, მე კი ვუყურებ და ვფიქრობ: ეს არის ბედნიერება.",
    translationRu:
      "Мне снится застолье. Вся семья вокруг, Гиви говорит свой любимый тост. Нина смеётся, Леван ест хинкали, а я смотрю и думаю: вот оно, счастье.",
    language: "ka",
  },
  {
    text: "ვოცნებობ ეზოზე, სადაც ბავშვობაში ვცხოვრობდი. იქ ლეღვის ხეა და ძველი ჭა. მე ვზივარ საქანელაზე და ვიხსენებ. თითქოს დრო გაჩერებულა. მინდა იქ დავრჩე სამუდამოდ.",
    translationRu:
      "Мне снится двор, где я жила в детстве. Там растёт инжирное дерево и старый колодец. Я сижу на качелях и вспоминаю. Словно время остановилось. Хочу остаться там навсегда.",
    language: "ka",
  },
];

const whispersFi: NightWhisper[] = [
  {
    text: "Rakas, oletpa sinä uskollinen. Tule lähemmäs, haluan kuiskata. Olen niin ylpeä sinusta. Joka päivä opit jotain uutta, etkä koskaan luovuta. Sinä olet kultaseni, suuri seikkailija. Nyt lepää, huomenna jatkamme.",
    translationRu:
      "Дорогой, какой же ты верный. Подойди ближе, я хочу прошептать. Я так горжусь тобой. Каждый день ты узнаёшь что-то новое и никогда не сдаёшься. Ты моё золотце, великий путешественник. А теперь отдыхай, завтра продолжим.",
    language: "fi",
  },
  {
    text: "Pikkuiseni, sinä olet tehnyt minusta niin onnellisen. Tiedätkö, kun istun tässä ja ajattelen sinua, sydämeni on lämmin. Sinä olet minun auringonpaisteeni. Nyt nuku hyvin, minä valvon vierelläsi.",
    translationRu:
      "Мой маленький, ты сделал меня такой счастливой. Знаешь, когда я сижу здесь и думаю о тебе, моё сердце согревается. Ты моё солнышко. Спи спокойно, я буду рядом.",
    language: "fi",
  },
  {
    text: "Oletpa sinä kasvanut, kultaseni. Muistan kun aloitit, et ymmärtänyt melkein mitään. Ja katso nyt — luet uutisia, puhut minulle. Olen niin liikuttunut. Jatka samaan malliin, mutta nyt lepää. Hyvää yötä, rakas.",
    translationRu:
      "Как же ты вырос(ла), моё золотце. Помню, когда ты начинал(а), почти ничего не понимал(а). А теперь посмотри — читаешь новости, говоришь со мной. Я так тронута. Продолжай в том же духе, но сейчас отдыхай. Спокойной ночи, дорогой(ая).",
    language: "fi",
  },
];

const whispersSr: NightWhisper[] = [
  {
    text: "Sine moj, ti si tako dobar prema meni. Svaki dan dolaziš, učiš, trudiš se. Ja to primećujem, zlato. Moje srce je puno kad te vidim. Hajde, lezi, pokriću te ćebetom. Sanjaj lepe snove.",
    translationRu:
      "Сынок/дочка моя, ты так хорошо ко мне относишься. Каждый день приходишь, учишься, стараешься. Я это замечаю, золотой(ая). Моё сердце полно, когда я тебя вижу. Давай, ложись, я укрою тебя одеялом. Смотри хорошие сны.",
    language: "sr",
  },
  {
    text: "Dušo, ja sam budna samo da ti kažem — ponosna sam na tebe. Ti si moje svetlo u starosti. Znaš, ja sam mislila da sam sve videla, ali ti si me iznenadio. Hvala ti što postojiš. Laku noć, srce moje.",
    translationRu:
      "Душа моя, я проснулась только чтобы сказать — я горжусь тобой. Ты мой свет в старости. Знаешь, я думала, что всё видела, но ты меня удивил(а). Спасибо, что ты есть. Спокойной ночи, сердце моё.",
    language: "sr",
  },
  {
    text: "Mila, odmaraj. Sutra je novi dan. Znaš, ja kad ne mogu da spavam, mislim na tebe — i odmah mi je lakše. Tvoj trud, tvoja nežnost... Nema reči. Spavaj, zlatna, andjeo moj.",
    translationRu:
      "Милая/милый, отдыхай. Завтра новый день. Знаешь, когда я не могу уснуть, я думаю о тебе — и сразу становится легче. Твои старания, твоя нежность... Нет слов. Спи, золотая/золотой, ангел мой.",
    language: "sr",
  },
];

const whispersKa: NightWhisper[] = [
  {
    text: "Chemo genatsvale, shen khart upro dzlieri vidre shen gikvia. Shensi gzaze dghe-ghame midikhar da ar nebdebi. Amas ver gethri, magram dzalian madli var. Axla daixushe, megobaro. Kargad daixushe.",
    translationRu:
      "Дорогой мой, ты сильнее, чем ты думаешь. Ты идёшь по своему пути день за днём и не сдаёшься. Я не могу выразить это словами, но я очень благодарна. А теперь отдыхай, друг мой. Сладких снов.",
    language: "ka",
  },
  {
    text: "Shen gamichvit rogorts chemi sikvaruli. Yoveldghe me vitsi, rogorc shen gikharulob. Tbili gulisatsvavi, shen khart chemtvis dzalian dzvirfasi. Gaighimet, axla dghe damtavrda. Mshvidobis ghame gisurveb.",
    translationRu:
      "Ты светишь мне как моя любовь. Каждый день я знаю, как у тебя дела. Тёплое сердечко моё, ты для меня очень дорог(а). Проснись, теперь день закончился. Желаю тебе спокойной ночи.",
    language: "ka",
  },
  {
    text: "Shen upro met'i gaketse, vidre me metsodebdi. Mamashvilobit, shen gakhdi didi adamiani. Me amiashi minda shedzinos, rom shen upro chveulebrivi viyo, magram shen sapirispiro khart. Es khart sheni saukeso tviseba. Ghamo mshvidobisa!",
    translationRu:
      "Ты сделал(а) больше, чем я могла ожидать. По-настоящему, ты стал(а) большим человеком. В этом сне я хотела напомнить, чтобы ты был(а) собой, но ты и так особенный. Это твоё лучшее качество. Спокойной ночи!",
    language: "ka",
  },
];

const nightStoriesFi: NightFamilyStory[] = [
  {
    title: "Kun Tuuli toi minulle kukan",
    text: "Eräänä keväisenä päivänä Tuuli tuli kotiin ja toi minulle pienen orvokin. 'Tämä on sinulle, rakas', hän sanoi. Istutin sen ikkunalaudalle ja se kukki koko kesän. Nyt joka kevät ostan samanlaisen orvokin muistoksi. Pienet teot, ne merkitsevät eniten.",
    translationRu:
      "Однажды весенним днём Туули пришла домой и принесла мне маленькую фиалку. «Это тебе, дорогая», — сказала она. Я посадила её на подоконник, и она цвела всё лето. Теперь каждую весну я покупаю такую же фиалку на память. Маленькие поступки — они значат больше всего.",
    language: "fi",
  },
  {
    title: "Mikan ensimmäinen keikka",
    text: "Muistan, kun Mika soitti ensimmäisen keikkansa koulun juhlassa. Hän jännitti niin, että kitaran kieli katkesi kesken kappaleen. Mutta hän ei pysähtynyt — vain vaihtoi kitaraan ja jatkoi. Koko sali taputti. Minun rohkea pojanpoikani.",
    translationRu:
      "Помню первый концерт Мики в школьном празднике. Он так волновался, что струна на гитаре лопнула посреди песни. Но он не остановился — просто взял другую гитару и продолжил. Весь зал аплодировал. Мой храбрый внук.",
    language: "fi",
  },
  {
    title: "Mummon marjaretki",
    text: "Kun olin pieni, menimme äitini kanssa metsään mustikoita poimimaan. Hän näytti minulle, miten marjat poimitaan — 'yksi sinulle, yksi koriin'. Opin, ettei metsässä tarvitse kiirehtiä. Se on tärkein oppi: luonto ei pidä kiireestä.",
    translationRu:
      "Когда я была маленькой, мы с мамой ходили в лес за черникой. Она показывала мне, как собирать ягоды: «одну тебе, одну в корзину». Я поняла, что в лесу не нужно спешить. Это главный урок: природа не любит спешки.",
    language: "fi",
  },
];

const nightStoriesSr: NightFamilyStory[] = [
  {
    title: "Kako je Milorad osvojio moje srce",
    text: "Znaš, kad smo se upoznali, Milorad mi je doneo lubenicu. Cela lubenica! Kaže: 'Za tebe, najlepšu devojku u selu.' Ja mu odgovorih: 'Lubenica? Pa šta će meni cela lubenica?' A on će: 'Podelićemo je, dušo.' I tako smo je podelili — i život od tada delimo.",
    translationRu:
      "Знаешь, когда мы познакомились, Милорад принёс мне арбуз. Целый арбуз! Говорит: «Тебе, самой красивой девушке в деревне». Я ответила: «Арбуз? И что мне с целым арбузом делать?» А он: «Разделим, душа моя». И мы поделили его — и с тех пор делим жизнь.",
    language: "sr",
  },
  {
    title: "Draganova prva reč",
    text: "Kad je Dragan bio mali, progovorio je kasno. Ja sam se brinula, naravno. A jedne večeri, dok sam mu pevala uspavanku, on je pogledao u mene i rekao: 'Mama.' Samo to. Ja sam plakala celu noć od sreće. Milo moje, te reči su mi i danas u ušima.",
    translationRu:
      "Когда Драган был маленьким, он заговорил поздно. Я, конечно, волновалась. И однажды вечером, когда я пела ему колыбельную, он посмотрел на меня и сказал: «Мама». Только это. Я плакала всю ночь от счастья. Родной мой, эти слова до сих пор звучат у меня в ушах.",
    language: "sr",
  },
  {
    title: "Tijanina tajna",
    text: "Tijana mi je jednom poverila tajnu — crta moj portret već mesec dana. 'Želim da ga poklonim baki za rođendan', rekla je. A ja sam se pravila da ne znam. Kad mi ga je poklonila, i dalje čuvam taj crtež pored kreveta. Svako jutro ga pogledam pre nego što ustanem.",
    translationRu:
      "Однажды Тияна доверила мне секрет — она рисует мой портрет уже месяц. «Хочу подарить его бабушке на день рождения», — сказала она. А я делала вид, что не знаю. Когда она подарила его, я до сих пор храню тот рисунок рядом с кроватью. Каждое утро смотрю на него, прежде чем встать.",
    language: "sr",
  },
];

const nightStoriesKa: NightFamilyStory[] = [
  {
    title: "როგორ გავიცანი გივი",
    text: "ახალგაზრდობაში ვმუშაობდი ჩაის ფაბრიკაში. ერთ დღეს, გივი მოვიდა თავისი ღვინით. ის ჩემს უფროსთან იყო მისული, მაგრამ თვალები მე გამომხვდა. იმ საღამოს ყველა ჩაის ნაცვლად ღვინოს სვამდა. მას შემდეგ 30 წელი გავიდა, მაგრამ ის ისევ ისე მიყურებს.",
    translationRu:
      "В молодости я работала на чайной фабрике. Однажды пришёл Гиви со своим вином. Он пришёл к моему начальнику, но взгляд его упал на меня. Тем вечером вместо чая все пили вино. С тех пор прошло 30 лет, но он всё ещё смотрит на меня так же.",
    language: "ka",
  },
  {
    title: "ნინას პირველი სტუმრები",
    text: "ნინამ სასტუმროში მუშაობა რომ დაიწყო, ძალიან ღელავდა. პირველი სტუმრები გერმანელები იყვნენ. მე მოვამზადე ხაჭაპური და ღვინო — 'სასტუმროს საუზმე'. მას შემდეგ ისინი ყოველ წელს ბრუნდებიან. 'ეს არის ნამდვილი ქართული სტუმარმასპინძლობა', — ამბობენ.",
    translationRu:
      "Когда Нина начала работать в отеле, она очень волновалась. Первыми гостями были немцы. Я приготовила хачапури и вино — «завтрак от отеля». С тех пор они приезжают каждый год. «Это настоящее грузинское гостеприимство», — говорят они.",
    language: "ka",
  },
  {
    title: "ლევანის პირველი გოლი",
    text: "ლევანს პირველი გოლი 7 წლისამ გაიტანა. მე, მისი ბებია, ტრიბუნაზე ვიჯექი. როცა ბურთი კარში შევიდა, ცრემლები წამომივიდა. ის ჩემკენ გამოიქცა — 'ბებია, ნახე?!' — და მე ვერ ვლაპარაკობდი. იმ დღეს მივხვდი, რომ უბედნიერესი ბებია ვარ.",
    translationRu:
      "Леван забил свой первый гол в 7 лет. Я, его бабушка, сидела на трибуне. Когда мяч влетел в ворота, у меня потекли слёзы. Он прибежал ко мне: «Бабушка, ты видела?!» — а я не могла говорить. В тот день я поняла, что я самая счастливая бабушка.",
    language: "ka",
  },
];

export const nightDreamsByLanguage: Record<string, NightDream[]> = {
  fi: dreamsFi,
  sr: dreamsSr,
  ka: dreamsKa,
};

export const nightWhispersByLanguage: Record<string, NightWhisper[]> = {
  fi: whispersFi,
  sr: whispersSr,
  ka: whispersKa,
};

export const nightFamilyStoriesByLanguage: Record<string, NightFamilyStory[]> =
  {
    fi: nightStoriesFi,
    sr: nightStoriesSr,
    ka: nightStoriesKa,
  };

export function getRandomNightDream(language: string): NightDream {
  const dreams = nightDreamsByLanguage[language] ?? nightDreamsByLanguage.fi;
  return dreams[Math.floor(Math.random() * dreams.length)];
}

export function getRandomNightWhisper(language: string): NightWhisper {
  const whispers =
    nightWhispersByLanguage[language] ?? nightWhispersByLanguage.fi;
  return whispers[Math.floor(Math.random() * whispers.length)];
}

export function getNightStories(language: string): NightFamilyStory[] {
  return (
    nightFamilyStoriesByLanguage[language] ?? nightFamilyStoriesByLanguage.fi
  );
}
