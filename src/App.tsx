import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, ChevronRight, ArrowLeft, Undo2, LayoutList, AlignLeft, Music } from 'lucide-react';

const testData = {
  // UNIT 1
  1: {
    wr2: [
      { q: "Sundar Pichai 氏の役職", a: 2, options: [1, 2, 3, 4, 8, 13] },
      { q: "GoogleのAI 原則に関するブログ投稿を執筆した人物", a: 4, options: [2, 4, 6, 8, 10, 12] },
      { q: "就任直後の Trump 大統領の行動", a: 8, options: [3, 5, 8, 11, 13, 14] },
      { q: "Google の最初のAI原則が公表された経緯", a: 13, options: [1, 9, 10, 11, 13, 14] }
    ],
    wr3: {
      text: "Google chief executive Sundar Pichai had previously stated that the company would not design or deploy AI for [weapons] intended to harm people, or for surveillance that violates internationally accepted norms. That [wording] was removed when Google updated its AI principles on February 4, 2025-just weeks after Pichai and other tech [titans] attended the inauguration of US President Donald Trump. When asked by AFP about the change, a Google [spokesperson] referred to a blog post outlining the company's AI principles, which made no [mention] of the promises Pichai had made.",
      jp: "Googleの最高経営責任者スンダー・ピチャイ氏は以前、人を傷つけることを目的とした兵器や、国際的規範に反する監視のためにAIを設計・展開しないと述べていた。その文言は2025年2月4日のAI原則更新時に削除された。それはピチャイ氏らがトランプ大統領の就任式に出席したわずか数週間後のことだった。AFPの取材に対しGoogleの広報担当者は同社のAI原則をまとめたブログ投稿に言及したが、そこにはピチャイ氏がした約束への言及はなかった。"
    },
    wr5: [
      { q: "The inauguration of US President Donald Trump took place in early February 2025.", a: "F", jp: "米国のドナルド・トランプ大統領の就任式は2025年2月上旬に行われた。", reason: "第2段落。原則が2月4日に更新されており、その「数週間前」に就任式があったため。" },
      { q: "US President Trump was unlikely to have supported the policy that required AI safety practices.", a: "T", jp: "米国のトランプ大統領がAIの安全対策を義務づける政策を支持していた可能性は低い。", reason: "第8段落。「就任直後にその大統領令を撤回した（rescinded）」とあるため。" },
      { q: "AI companies in the United States faced more obligations in the past.", a: "T", jp: "過去には、米国のAI企業により多くの義務が課されていた。", reason: "第9段落。「現在は守るべき義務が減った（now have fewer obligations）」とあるため。" },
      { q: "Some Google employees did not want to be involved in a Pentagon research project.", a: "T", jp: "一部のGoogle社員は、ペンタゴンの研究プロジェクトに関わりたいと思っていなかった。", reason: "第13段落。「従業員の反発（employee backlash）」から合致。" }
    ],
    ar1: [
      { jp: "その会社は人工知能に関して、その原則を更新した。", words: ["it", "to", "when", "comes", "updated", "its principles"], correct: ["updated", "its principles", "when", "it", "comes", "to"], head: "The company ", tail: " artificial intelligence." },
      { jp: "Googleは監視にその技術を利用しないという誓いを削除した。", words: ["to", "for", "not", "use", "vows", "the technology"], correct: ["vows", "not", "to", "use", "the technology", "for"], head: "Google removed ", tail: " surveillance." },
      { jp: "これらの価値観を共有している政府は世界的な成長を促す AIの創造に協力すべきだ。", words: ["AI", "to", "work", "create", "should", "together"], correct: ["should", "work", "together", "to", "create", "AI"], head: "Governments sharing these values ", tail: " that promotes global growth." },
      { jp: "企業は重大なリスクを示す試験結果の共有を求められている。", words: ["to", "are", "share", "required", "indicating", "test results"], correct: ["are", "required", "to", "share", "test results", "indicating"], head: "Companies ", tail: " serious risks." }
    ],
    ar2: [
      { word: "surveillance", jp: "監視", def: "the act of carefully watching a person suspected of a crime or a place where a crime may be committed" },
      { word: "deploy", jp: "展開する、利用する", def: "to use something for a particular purpose, especially ideas, arguments, etc." },
      { word: "gather", jp: "集める", def: "to get things from different places and put them together in one place" },
      { word: "predecessor", jp: "前任者", def: "someone who had your job before you started doing it" },
      { word: "backlash", jp: "反発", def: "a strong negative reaction by a number of people against recent events, especially against political or social developments" },
      { word: "involvement", jp: "関与、参加", def: "the act of taking part in an activity or event, or the way in which you take part in it" }
    ]
  },
  // UNIT 2
  2: {
    wr2: [
      { q: "大阪府の短期留学制度導入の目的", a: 1, options: [1, 2, 3, 5, 6, 7] },
      { q: "大阪府の全日制府立高校の数", a: 4, options: [2, 3, 4, 5, 6, 7] },
      { q: "留学する生徒に支給される助成金の額", a: 5, options: [3, 4, 5, 6, 7] },
      { q: "2027年度の予算見積額", a: 7, options: [3, 4, 5, 6, 7] }
    ],
    wr3: {
      text: "The Osaka prefectural government plans to have all [prefecture]-run high schools sign sister-school agreements with schools abroad, enabling about [20] students from each school to study overseas for a short period. Each student will receive a [subsidy] of ¥100,000 and will cover any remaining expenses themselves. The aim is to help high school students [improve] their English abilities. Since students will be interacting with their sister schools during the day, the prefectural government is considering countries such as Australia and the Philippines because they are in [similar] time zones to Japan.",
      jp: "大阪府は、すべての府立高校に海外の学校と姉妹校提携を結ばせ、各校から約20人の生徒が短期間海外留学できるようにする計画である。各生徒は10万円の補助金を受け取り、残りの費用は自己負担となる。目的は高校生の英語力向上を支援することである。生徒は日中に姉妹校と交流するため、府は日本と時差が似ているオーストラリアやフィリピンなどの国を検討している。"
    },
    wr5: [
      { q: "Many prefectural governments have introduced study-abroad programs that include some students from all public high schools.", a: "F", jp: "多くの県では、全ての公立高校の生徒を対象とする海外留学プログラムを導入している。", reason: "第3段落。「異例のケースである（an unusual case）」とあるため誤り。" },
      { q: "About one-third of Osaka Prefecture's full-time high schools have sister-school agreements with schools abroad.", a: "T", jp: "大阪府の全日制高校の約3分の1が、海外の学校と姉妹校提携を結んでいる。", reason: "第4段落。「148校のうち49校（49 out of 148）」であり、ほぼ1/3に該当する。" },
      { q: "Under the initiative, a total of more than 5,000 high school students can join the study-abroad programs.", a: "F", jp: "この取り組みにより、合計で5,000人以上の高校生が海外留学プログラムに参加できる。", reason: "第1段落・第4段落。148校×約20人＝約2,960人なので、5,000人以上は誤り。" },
      { q: "Under the initiative, about 100 prefectural high schools in Osaka will need to find their own sister schools in about three years.", a: "T", jp: "この取り組みのもとで、大阪の約100校の府立高校は、およそ3年以内にそれぞれ姉妹校を見つける必要がある。", reason: "第4・7段落。現在49校が提携済みで、全148校から引くと残り約100校が2027年度(約3年後)までに見つける必要がある。" }
    ],
    ar1: [
      { jp: "姉妹校における語学研修プログラムの実施が困難になってきている。", words: ["at", "to", "become", "difficult", "implement", "language training programs"], correct: ["become", "difficult", "to", "implement", "language training programs", "at"], head: "It has ", tail: " sister schools." },
      { jp: "教育委員会は、生徒が海外留学できるようにするための提案を取りまとめた。", words: ["to", "to", "allow", "compiled", "students", "a proposal"], correct: ["compiled", "a proposal", "to", "allow", "students", "to"], head: "The board of education has ", tail: " study abroad." },
      { jp: "生徒は残りの費用を自己負担する。", words: ["of", "out", "pay", "will", "pocket", "the remaining costs"], correct: ["will", "pay", "the remaining costs", "out", "of", "pocket"], head: "Students ", tail: "." },
      { jp: "府はこの取り組みに約2億6,000万円の予算を充てることを目指している。", words: ["of", "to", "aims", "allocate", "a budget", "about ¥260 million"], correct: ["aims", "to", "allocate", "a budget", "of", "about ¥260 million"], head: "The prefectural government ", tail: " for the initiative." }
    ],
    ar2: [
      { word: "initiative", jp: "取り組み、新計画", def: "an important new plan or process to achieve a particular aim or to solve a particular problem" },
      { word: "adjustment", jp: "調整", def: "a small change made to something in order to correct or improve it" },
      { word: "subsidize", jp: "補助金を出す", def: "to give money to somebody or an organization to help pay for something" },
      { word: "budget", jp: "予算", def: "the money that is available to an organization or person, or a plan of how it will be spent" },
      { word: "compile", jp: "まとめる、編集する", def: "to make a book, list, record, etc., using different pieces of information, music, etc." },
      { word: "allocate", jp: "割り当てる", def: "to use something for a particular purpose, give something to a particular person, etc., especially after an official decision has been made" }
    ]
  },
  // UNIT 3
  3: {
    wr2: [
      { q: "Carlito Cernal 氏の役職", a: 2, options: [1, 2, 3, 5, 7, 8] },
      { q: "世界保健機関による2023年のフィリピンのデング熱に関する評価", a: 7, options: [4, 5, 7, 8, 9, 10] },
      { q: "2025年2月1日時点でのフィリピンのデング熱感染者数", a: 9, options: [6, 7, 8, 9, 10, 11] },
      { q: "デング熱の流行を宣言したフィリピンの自治体の数", a: 10, options: [7, 8, 9, 10, 11, 12] }
    ],
    wr3: {
      text: "The World Health Organization ranked the Philippines as the country most affected by dengue in the Western Pacific region in [2023], with 167,355 cases and 575 deaths. The country has seen an [unusual] rise in cases in 2025, with 28,200 patients recorded as of February 1, and five cities and municipalities having declared [outbreaks]. In response, Addition Hills, a village in central Manila, has offered a bounty for mosquitoes. The village [captain] said this awareness-raising initiative could have a significant impact on curbing the spread of the tropical [disease] when combined with local clean-up efforts.",
      jp: "世界保健機関は、2023年にフィリピンを西太平洋地域で最もデング熱の影響を受けた国とし、167,355件の症例と575人の死者を出したと位置づけた。同国では2025年に異常な症例の増加が見られ、2月1日時点で28,200人の患者が記録され、5つの都市や自治体が大流行を宣言している。これを受け、マニラ中心部のアディッション・ヒルズ村は蚊に報奨金を出している。村長は、この啓発活動は地域の清掃活動と組み合わせることで、この熱帯病の蔓延抑制に大きな影響を与える可能性があると述べた。"
    },
    wr5: [
      { q: "Residents of Addition Hills receive two pesos when they bring in ten dead mosquitoes to the village hall.", a: "T", jp: "Addition Hills の住民は、村役場に死んだ蚊を10匹持ち込むと2ペソをもらえる。", reason: "第1段落。生死を問わず5匹で1ペソなので、10匹なら2ペソで合致。" },
      { q: "The Philippines was more severely affected by dengue in 2023 than many other countries in the Western Pacific region.", a: "T", jp: "2023年、フィリピンは西太平洋地域の他の多くの国々よりも深刻にデング熱の影響を受けた。", reason: "第7段落。「最も影響を受けた国（the country most affected）」とあるため合致。" },
      { q: "The fatality rate of dengue is high.", a: "F", jp: "デング熱の致死率は高い。", reason: "第8段落。「命にかかわることはまれ（rarely fatal）」とあるため誤り。" },
      { q: "As of February 1, 2024, more than 20,000 people had been infected with dengue in the Philippines.", a: "F", jp: "2024年2月1日時点で、フィリピンでは2万人以上がデング熱に感染していた。", reason: "第9段落。28,200人が記録されたのは2024年ではなく「今年（2025年）」であるため誤り。" }
    ],
    ar1: [
      { jp: "Addition Hillsの住民たちは、蚊にかけられた懸賞金を得るために列を作った。", words: ["to", "up", "for", "lined", "collect", "a bounty"], correct: ["lined", "up", "to", "collect", "a bounty", "for"], head: "Residents in Addition Hills ", tail: " mosquitoes." },
      { jp: "彼が努力して得たお金は貯金箱に入れることになるだろう。", words: ["go", "he", "for", "got", "would", "his efforts"], correct: ["he", "got", "for", "his efforts", "would", "go"], head: "The money ", tail: " into a piggy bank." },
      { jp: "広報担当は住民に長袖(の服)で身を守るよう呼びかけた。", words: ["to", "with", "urged", "protect", "residents", "themselves"], correct: ["urged", "residents", "to", "protect", "themselves", "with"], head: "The spokesperson ", tail: " long sleeves." },
      { jp: "一部の住民は小銭目当てで蚊を育て、問題を悪化させる可能性がある。", words: ["by", "might", "exacerbate", "mosquitoes", "cultivating", "the problem"], correct: ["might", "exacerbate", "the problem", "by", "cultivating", "mosquitoes"], head: "Some residents ", tail: " for coins." }
    ],
    ar2: [
      { word: "resident", jp: "住民", def: "a person who lives in a particular place or who has their home there" },
      { word: "bounty", jp: "報奨金、懸賞金", def: "an amount of money that is given to someone by the government as a reward for doing something, especially catching or killing a criminal" },
      { word: "curb", jp: "抑制する", def: "to control or limit something in order to prevent it from having a harmful effect" },
      { word: "enthusiasm", jp: "熱意", def: "a strong feeling of interest and enjoyment about something and an eagerness to be involved in it" },
      { word: "pail", jp: "バケツ", def: "a metal or wooden container with a handle, used for carrying liquids" },
      { word: "gland", jp: "腺（リンパ腺など）", def: "an organ of the body which produces a substance that the body needs, such as hormones, sweat, or saliva" }
    ]
  },
  // UNIT 4
  4: {
    wr2: [
      { q: "2023年度末時点の民泊施設の数", a: 2, options: [1, 2, 3, 4, 5, 6] },
      { q: "法律上の民泊施設の種類", a: 4, options: [2, 3, 4, 5, 6, 7] },
      { q: "住宅宿泊事業法が施行された年", a: 6, options: [3, 4, 5, 6, 7, 8] },
      { q: "ビアレストラン 「えんや」がオープンさせた民泊施設の名前", a: 8, options: [5, 6, 7, 8, 9, 10] }
    ],
    wr3: {
      text: "Minpaku private lodging services using vacant houses and [vacation] homes have been expanding in Tochigi Prefecture, with the number of such lodgings more than tripling over the past five years. As of the end of fiscal 2023, [359] minpaku lodgings had been registered under the Private Lodging [Business] Law. The number is particularly high in Nasu and Nikko, both of which are home to major tourist [attractions]. This increase is attributed to growing awareness of minpaku services and rising demand from [inbound] tourists, partly driven by the weak yen.",
      jp: "空き家や別荘を利用した民泊サービスが栃木県で拡大しており、そのような宿泊施設の数は過去5年間で3倍以上になっている。2023年度末時点で359件の民泊が住宅宿泊事業法に登録されていた。その数は主要な観光地がある那須や日光で特に高い。この増加は、民泊サービスの認知度向上と、一部には円安によるインバウンド観光客からの需要増に起因している。"
    },
    wr5: [
      { q: "The weak yen makes it easier for foreigners to travel to Japan.", a: "T", jp: "円安により、外国人が日本を訪れやすくなっている。", reason: "第2段落。「円安の影響もあって訪日観光客の需要が高まっている」とあるため。" },
      { q: "Tochigi Prefecture knows how many special zone private lodgings there are.", a: "T", jp: "栃木県は特区民泊の数を把握している。", reason: "第5段落。「県内に特区民泊はない（there are no special zone private lodgings）」と0件であることを把握している。" },
      { q: "Dragon Inn Nikko has been open for over three years.", a: "F", jp: "Dragon Inn Nikko は開業してから3年以上になる。", reason: "第8段落。「昨年8月にオープンした（opened ... in August last year）」ため、3年以上は誤り。" },
      { q: "Many foreigners are more used to using bathtubs than shower rooms.", a: "F", jp: "多くの外国人は、シャワールームよりも浴槽を使い慣れている。", reason: "第10段落。「シャワールームは外国人により馴染みがある（more familiar to foreigners）」とあるため誤り。" }
    ],
    ar1: [
      { jp: "民泊は宿泊料金を安く提供しやすくする。", words: ["it", "to", "make", "offer", "easier", "low room rates"], correct: ["make", "it", "easier", "to", "offer", "low room rates"], head: "Minpaku accommodations ", tail: "." },
      { jp: "ビアレストランえんやは、昨年8月にDragon Inn Nikko という民泊施設を開業した。", words: ["in", "named", "launched", "Beer Restaurant Enya", "Dragon Inn Nikko", "a minpaku lodging facility"], correct: ["Beer Restaurant Enya", "launched", "a minpaku lodging facility", "named", "Dragon Inn Nikko", "in"], head: "", tail: " August last year." },
      { jp: "それぞれの客室には4~6名まで泊まることができる。", words: ["of", "to", "can", "four", "accommodate", "the rooms"], correct: ["of", "the rooms", "can", "accommodate", "four", "to"], head: "Each ", tail: " six people." },
      { jp: "その宿泊施設では、外国人宿泊客が日本文化の一端を体験できる。", words: ["of", "to", "allow", "experience", "a taste", "foreign guests"], correct: ["allow", "foreign guests", "to", "experience", "a taste", "of"], head: "The lodgings ", tail: " Japanese culture." }
    ],
    ar2: [
      { word: "condominium", jp: "分譲マンション", def: "one apartment in a building with several apartments, each of which is owned by the people living in it" },
      { word: "inn", jp: "旅館、小さな宿", def: "a small hotel or pub, especially an old one in the countryside" },
      { word: "renovate", jp: "改装する", def: "to repair and improve something, especially a building, so that it is in good condition again" },
      { word: "accommodate", jp: "収容する、宿泊させる", def: "to provide somebody with a room or place to sleep, live, or sit" },
      { word: "maximum", jp: "最大", def: "the greatest amount, size, speed, etc., that is possible, recorded or allowed" },
      { word: "autumn", jp: "秋", def: "the season of the year between summer and winter, when leaves change color and the weather becomes cooler" }
    ]
  }
};

const musicData = {
  healTheWorld: [
    { q: "And this place [   ] be much brighter than tomorrow.", a: "could", options: ["could", "would", "should", "might"], jp: "そこは明日よりもずっと明るい場所かもしれない" },
    { q: "In this place you'll feel there's no [   ] or sorrow.", a: "hurt", options: ["hurt", "pain", "fear", "hate"], jp: "そこできみは感じるだろう痛みや悲しみなんてないことを" },
    { q: "There are ways to get there if you [   ] enough for the living.", a: "care", options: ["care", "love", "look", "think"], jp: "あらゆる生命に慈しみを持てばそこへ行く道は見つかる" },
    { q: "Make it a better place for you and for me and the entire [   ] race.", a: "human", options: ["human", "living", "people", "world"], jp: "世界をもっといい場所にするんだ 君と僕とそしてすべての人類のために" },
    { q: "If you want to know why there's a love that cannot [   ].", a: "lie", options: ["lie", "die", "cry", "hide"], jp: "理由を知りたければ人を欺くことができない愛というものがある" },
    { q: "[   ] it feels that always love's enough for us growing.", a: "Then", options: ["Then", "When", "And", "But"], jp: "すると、愛は僕たちが成長するのに十分あるって感じるようになるんだ" },
    { q: "And the dream we were conceived in will [   ] a joyful face.", a: "reveal", options: ["reveal", "show", "make", "keep"], jp: "僕らが心に描いてきた夢が喜びに満ちた顔を現し" },
    { q: "Why do we keep strangling life, wound this earth, crucify its [   ]?", a: "soul", options: ["soul", "heart", "life", "world"], jp: "どうして僕らは息苦しいのだろうか なぜこの地球を傷つけ その魂を苦しめるのだろうか" },
    { q: "[   ] it's play to see this world is heavenly.", a: "Though", options: ["Though", "Since", "Because", "If"], jp: "この世が素晴らしいものだってことは簡単にわかるのに" },
    { q: "Let our spirits never [   ].", a: "die", options: ["die", "cry", "fall", "stop"], jp: "僕たちの魂が死ぬことのないようにしよう" }
  ],
  imagine: [
    { q: "Imagine there's no [   ].", a: "heaven", options: ["heaven", "countries", "hell", "religion"], jp: "天国なんてない、と想像してみよう" },
    { q: "No hell [   ] us.", a: "below", options: ["below", "under", "beneath", "around"], jp: "下には地獄もない" },
    { q: "[   ] us, only sky.", a: "Above", options: ["Above", "Over", "Beyond", "High"], jp: "上にあるのは空だけ" },
    { q: "Imagine there's no [   ].", a: "countries", options: ["countries", "borders", "fights", "wars"], jp: "国なんてない、と想像してみよう" },
    { q: "And no [   ] too.", a: "religion", options: ["religion", "reason", "possession", "problem"], jp: "そして宗教もない" },
    { q: "You [   ] say I'm a dreamer.", a: "may", options: ["may", "will", "can", "might"], jp: "ぼくは夢想家だと言うかもしれない" },
    { q: "I [   ] someday you'll join us.", a: "hope", options: ["hope", "wish", "think", "know"], jp: "いつの日にかあなたも仲間になってくれるといいな" },
    { q: "I [   ] if you can.", a: "wonder", options: ["wonder", "know", "doubt", "ask"], jp: "あなたにはできるかな" },
    { q: "No need for greed or [   ].", a: "hunger", options: ["hunger", "anger", "danger", "power"], jp: "欲や飢餓の必要もない" },
    { q: "[   ] all the world, you-hu-hu.", a: "Sharing", options: ["Sharing", "Living", "Loving", "Helping"], jp: "世界を共有することを想像してみよう" },
    { q: "And the world [   ] live as one.", a: "will", options: ["will", "can", "may", "should"], jp: "そしたら世界の人々は一つになって生きていける" }
  ]
};

const grammarData = {
  rules: [
    { title: "名詞が入る場所", points: ["a / an / the の後ろ", "in / of / for など前置詞の後ろ", "his / their / Google's など所有格の後ろ"] },
    { title: "形容詞が入る場所", points: ["名詞の直前で名詞を説明する", "be動詞などの後ろで補語 C になる"] },
    { title: "副詞が入る場所", points: ["動詞の近くで動作を説明する", "形容詞の直前で程度や様子を説明する", "文の最初や最後で文全体を説明する"] }
  ],
  posQuestions: [
    {
      unit: 1,
      text: "... for surveillance violating ( international / internationally ) accepted norms.",
      answer: "internationally",
      pos: "副詞",
      explanation: "accepted という過去分詞を修飾するので、副詞 internationally が入ります。"
    },
    {
      unit: 1,
      text: "There's a ( globe / global ) competition taking place for AI leadership.",
      answer: "global",
      pos: "形容詞",
      explanation: "competition という名詞を直前から修飾するので、形容詞 global が入ります。"
    },
    {
      unit: 2,
      text: "The Osaka ( prefecture / prefectural ) government plans to have all prefecture-run high schools sign...",
      answer: "prefectural",
      pos: "形容詞",
      explanation: "government という名詞を修飾するので、形容詞 prefectural が入ります。"
    },
    {
      unit: 3,
      text: "... explaining how he ( strategic / strategically ) chose a darkly lit fire station...",
      answer: "strategically",
      pos: "副詞",
      explanation: "chose という動詞を修飾するので、副詞 strategically が入ります。"
    },
    {
      unit: 3,
      text: "... where he used a cup to ( manual / manually ) trap the insects against a wall.",
      answer: "manually",
      pos: "副詞",
      explanation: "trap という動詞を修飾するので、副詞 manually が入ります。to 不定詞の中に副詞が入る形です。"
    },
    {
      unit: 3,
      text: "The country has seen an ( usual / unusual ) rise in cases this year.",
      answer: "unusual",
      pos: "形容詞",
      explanation: "rise という名詞を修飾するので形容詞。文脈は「異常な増加」なので unusual です。"
    },
    {
      unit: 4,
      text: "Minpaku lodging services ( rapid / rapidly ) expanding in Tochigi Prefecture...",
      answer: "rapidly",
      pos: "副詞",
      explanation: "expanding という動詞の働きをする語を修飾するので、副詞 rapidly が入ります。"
    },
    {
      unit: 4,
      text: "The increase can be attributed to growing ( aware / awareness ) of minpaku services...",
      answer: "awareness",
      pos: "名詞",
      explanation: "growing に修飾され、of minpaku services につながる名詞が必要なので awareness です。"
    }
  ],
  wordFamilies: [
    { meaning: "世界(の)", noun: "globe", verb: "-", adjective: "global", adverb: "globally" },
    { meaning: "国(の)", noun: "nation", verb: "-", adjective: "national", adverb: "nationwide" },
    { meaning: "最初(の)", noun: "origin", verb: "originate", adjective: "original", adverb: "originally" },
    { meaning: "関与(する)", noun: "involvement", verb: "involve", adjective: "involved", adverb: "-" },
    { meaning: "要求(する)", noun: "requirement", verb: "require", adjective: "required", adverb: "-" },
    { meaning: "気づき", noun: "awareness", verb: "-", adjective: "aware", adverb: "-" },
    { meaning: "戦略(的な)", noun: "strategy", verb: "-", adjective: "strategic", adverb: "strategically" },
    { meaning: "急速(な)", noun: "rapidity", verb: "-", adjective: "rapid", adverb: "rapidly" },
    { meaning: "異常(な)", noun: "-", verb: "-", adjective: "unusual", adverb: "unusually" }
  ],
  patternRules: [
    { pattern: "SV", name: "主語 + 動詞", check: "目的語や補語がなくても文が成立する。前置詞句は M として外す。" },
    { pattern: "SVC", name: "主語 + 動詞 + 補語", check: "S = C の関係になる。be 動詞の後ろの形容詞は C になりやすい。" },
    { pattern: "SVO", name: "主語 + 動詞 + 目的語", check: "動詞の後ろに「何を」が来る。S と O は同じものではない。" },
    { pattern: "SVOO", name: "主語 + 動詞 + 目的語 + 目的語", check: "give / send / offer などで「人に物を」。本文の receive a subsidy は目的語1つなので SVO。" },
    { pattern: "SVOC", name: "主語 + 動詞 + 目的語 + 補語", check: "O = C、または O が C する関係。make / allow / rank ... as が狙われやすい。" }
  ],
  patternQuestions: [
    {
      unit: 1,
      sentence: "The company updated its principles when it comes to artificial intelligence.",
      answer: "SVO",
      breakdown: "S = The company / V = updated / O = its principles / when 以下は M"
    },
    {
      unit: 2,
      sentence: "The aim is to help high school students improve their English abilities.",
      answer: "SVC",
      breakdown: "S = The aim / V = is / C = to help ...。目的そのものを説明しているので C"
    },
    {
      unit: 2,
      sentence: "Students will pay the remaining costs out of pocket.",
      answer: "SVO",
      breakdown: "S = Students / V = will pay / O = the remaining costs / out of pocket は M"
    },
    {
      unit: 2,
      sentence: "Students will be interacting with their sister schools during the day.",
      answer: "SV",
      breakdown: "S = Students / V = will be interacting / with ... と during ... は M"
    },
    {
      unit: 3,
      sentence: "The World Health Organization ranked the Philippines as the country most affected by dengue.",
      answer: "SVOC",
      breakdown: "S = WHO / V = ranked / O = the Philippines / C = as the country ...。O を C と位置づけている"
    },
    {
      unit: 4,
      sentence: "The number is particularly high in Nasu and Nikko.",
      answer: "SVC",
      breakdown: "S = The number / V = is / C = high / particularly と in ... は M"
    },
    {
      unit: 4,
      sentence: "The weak yen makes it easier for foreigners to travel to Japan.",
      answer: "SVOC",
      breakdown: "S = The weak yen / V = makes / O = it / C = easier。make O C の形"
    },
    {
      unit: 4,
      sentence: "The lodgings allow foreign guests to experience a taste of Japanese culture.",
      answer: "SVOC",
      breakdown: "S = The lodgings / V = allow / O = foreign guests / C = to experience ...。O が行う内容を C と見る"
    }
  ]
};

export default function TestApp() {
  const [currentMode, setCurrentMode] = useState('menu'); // menu, wr2, wr3, wr5, ar1, ar2, wordList, grammar, music_heal, music_imagine
  const [selectedUnit, setSelectedUnit] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  
  // 状態管理
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [availableWords, setAvailableWords] = useState([]); 
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // フラッシュカード用
  const [revealedBlanks, setRevealedBlanks] = useState([]);

  const startMode = (mode) => {
    setCurrentMode(mode);
    setQIndex(0);
    setShowResult(false);
    setShowHint(false);
    setIsFlipped(false);
    setRevealedBlanks([]);
    
    if (mode === 'wr2') setQuestions(testData[selectedUnit].wr2);
    if (mode === 'wr3') setQuestions([testData[selectedUnit].wr3]);
    if (mode === 'wr5') setQuestions(testData[selectedUnit].wr5);
    if (mode === 'ar2' || mode === 'wordList') setQuestions(testData[selectedUnit].ar2);
    if (mode === 'ar1') {
      const qs = testData[selectedUnit].ar1;
      setQuestions(qs);
      setupOrderQuestion(qs[0]);
    }
    if (mode === 'music_heal') setQuestions(musicData.healTheWorld);
    if (mode === 'music_imagine') setQuestions(musicData.imagine);
  };

  const setupOrderQuestion = (q) => {
    setSelectedOptions([]);
    const shuffled = [...q.words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
  };

  const checkAnswerWR25 = (answer) => {
    const correct = questions[qIndex].a;
    setIsCorrect(answer === correct);
    setShowResult(true);
  };

  const handleWordClick = (word, fromAvailable, index) => {
    if (showResult) return;
    if (fromAvailable) {
      setSelectedOptions([...selectedOptions, word]);
      setAvailableWords(availableWords.filter((_, i) => i !== index));
    } else {
      setAvailableWords([...availableWords, word]);
      setSelectedOptions(selectedOptions.filter((_, i) => i !== index));
    }
  };

  const checkOrderAnswer = () => {
    const correctArr = questions[qIndex].correct;
    const isOk = JSON.stringify(selectedOptions) === JSON.stringify(correctArr);
    setIsCorrect(isOk);
    setShowResult(true);
  };

  const nextQuestion = () => {
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      setShowResult(false);
      setShowHint(false);
      setIsFlipped(false);
      setRevealedBlanks([]);
      if (currentMode === 'ar1') {
        setupOrderQuestion(questions[qIndex + 1]);
      }
    } else {
      setCurrentMode('menu'); 
    }
  };

  const MainMenu = () => (
    <div className="flex flex-col items-center justify-center space-y-6 w-full px-4 py-8 max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">総合テスト対策アプリ</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">公式資料に完全準拠</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
        <label className="block text-sm font-bold text-gray-700 mb-3 text-center">教科書のUNITを選ぶ</label>
        <div className="flex justify-between gap-2 mb-6">
          {[1, 2, 3, 4].map(u => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedUnit === u ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              UNIT {u}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <button onClick={() => startMode('wr2')} className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><BookOpen size={20} /> 内容検索 (While reading 2)</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('wr3')} className="w-full flex items-center justify-between p-4 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><BookOpen size={20} /> 要約穴埋め (While reading 3)</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('wr5')} className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><CheckCircle size={20} /> 内容一致 T/F (While reading 5)</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('ar1')} className="w-full flex items-center justify-between p-4 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><LayoutList size={20} /> 並べ替え英作文 (After reading 1)</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('ar2')} className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><Undo2 size={20} /> 単語フラッシュカード (After reading 2)</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('wordList')} className="w-full flex items-center justify-between p-4 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><AlignLeft size={20} /> 単語・定義一覧表</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('grammar')} className="w-full flex items-center justify-between p-4 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><LayoutList size={20} /> 品詞・文型対策</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* 洋楽エリア */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
        <label className="block text-sm font-bold text-gray-700 mb-3 text-center">洋楽 穴埋めクイズ</label>
        <div className="space-y-3">
          <button onClick={() => startMode('music_heal')} className="w-full flex items-center justify-between p-4 bg-pink-50 hover:bg-pink-100 text-pink-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><Music size={20} /> Heal the World</span>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => startMode('music_imagine')} className="w-full flex items-center justify-between p-4 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 rounded-xl transition-colors font-medium">
            <span className="flex items-center gap-3"><Music size={20} /> Imagine</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );

  const WR2Mode = () => {
    const q = questions[qIndex];
    return (
      <div className="w-full max-w-md mx-auto px-4">
        <div className="mb-6">
          <span className="text-sm font-bold text-indigo-600 mb-2 block">While reading 2 - UNIT {selectedUnit} ({qIndex + 1}/{questions.length})</span>
          <h2 className="text-xl font-bold text-gray-800 leading-relaxed">「{q.q}」が述べられている段落は？</h2>
        </div>
        
        {!showResult ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {q.options.map(opt => (
              <button key={opt} onClick={() => checkAnswerWR25(opt)} className="py-4 bg-white border-2 border-indigo-100 rounded-xl text-xl font-bold text-indigo-700 hover:border-indigo-500 hover:bg-indigo-50 transition-colors shadow-sm">
                第 {opt} 段落
              </button>
            ))}
          </div>
        ) : (
          <ResultPanel reason={`正解は 第 ${q.a} 段落 です。`} />
        )}
      </div>
    );
  };

  const WR3Mode = () => {
    const q = questions[0];
    if (!q) return null;

    let blankIndex = -1;
    const blankPattern = new RegExp('(\\[[^\\]]+\\])', 'g');
    const exactBlankPattern = new RegExp('^\\[([^\\]]+)\\]$');
    const parts = q.text.split(blankPattern);
    const blankCount = (q.text.match(blankPattern) || []).length;
    const allBlankIndexes = Array.from({ length: blankCount }, (_, i) => i);
    const isAllRevealed = revealedBlanks.length === blankCount;
    const hideWord = (word) => `${word.charAt(0)}${'_'.repeat(Math.max(word.length - 1, 0))}`;
    const toggleBlank = (index) => {
      setRevealedBlanks(
        revealedBlanks.includes(index)
          ? revealedBlanks.filter(i => i !== index)
          : [...revealedBlanks, index]
      );
    };

    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-6">
        <div className="mb-5">
          <span className="text-sm font-bold text-rose-600 mb-2 block">While reading 3 (要約穴埋め) - UNIT {selectedUnit}</span>
          <h2 className="text-2xl font-bold text-gray-800">要約穴埋め</h2>
        </div>

        <div className="bg-white p-5 md:p-7 rounded-2xl border border-rose-100 shadow-sm">
          <p className="text-lg md:text-xl leading-9 text-gray-800 font-medium">
            {parts.map((part, i) => {
              const match = part.match(exactBlankPattern);
              if (!match) return <React.Fragment key={i}>{part}</React.Fragment>;

              blankIndex += 1;
              const index = blankIndex;
              const word = match[1];
              const isRevealed = revealedBlanks.includes(index);

              return (
                <button
                  key={i}
                  onClick={() => toggleBlank(index)}
                  className={`mx-1 inline-flex min-w-[4.5rem] items-center justify-center rounded-lg border px-2 py-1 font-bold transition-colors align-baseline ${
                    isRevealed
                      ? 'border-rose-300 bg-rose-100 text-rose-700'
                      : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {isRevealed ? word : hideWord(word)}
                </button>
              );
            })}
          </p>

          {showHint && (
            <p className="mt-5 border-t border-rose-100 pt-5 text-base leading-8 text-gray-700 font-medium">
              {q.jp}
            </p>
          )}
        </div>

        <div className="sticky bottom-0 -mx-4 mt-6 border-t border-gray-200 bg-gray-50/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2">
            <button
              onClick={() => setRevealedBlanks(allBlankIndexes)}
              disabled={isAllRevealed}
              className={`rounded-xl py-3 text-sm font-bold shadow-sm transition-colors ${isAllRevealed ? 'bg-gray-200 text-gray-400' : 'bg-rose-600 text-white hover:bg-rose-700'}`}
            >
              全て表示
            </button>
            <button
              onClick={() => setRevealedBlanks([])}
              disabled={revealedBlanks.length === 0}
              className={`rounded-xl py-3 text-sm font-bold shadow-sm transition-colors ${revealedBlanks.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              隠す
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="rounded-xl bg-white py-3 text-sm font-bold text-rose-700 shadow-sm border border-rose-100 hover:bg-rose-50 transition-colors"
            >
              {showHint ? '和訳を隠す' : '和訳を見る'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const WR5Mode = () => {
    const q = questions[qIndex];
    return (
      <div className="w-full max-w-lg mx-auto px-4">
        <div className="mb-6">
          <span className="text-sm font-bold text-emerald-600 mb-2 block">While reading 5 (T/F) - UNIT {selectedUnit} ({qIndex + 1}/{questions.length})</span>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">{q.q}</p>
            {showHint && <p className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600 font-medium">{q.jp}</p>}
          </div>
          {!showResult && !showHint && (
            <button onClick={() => setShowHint(true)} className="mt-4 text-sm text-emerald-600 font-bold hover:underline">
              和訳のヒントを見る
            </button>
          )}
        </div>
        
        {!showResult ? (
          <div className="flex gap-4">
            <button onClick={() => checkAnswerWR25('T')} className="flex-1 py-6 bg-white border-2 border-emerald-200 rounded-2xl text-2xl font-bold text-emerald-600 hover:bg-emerald-50 transition-colors shadow-sm">
              True (T)
            </button>
            <button onClick={() => checkAnswerWR25('F')} className="flex-1 py-6 bg-white border-2 border-rose-200 rounded-2xl text-2xl font-bold text-rose-500 hover:bg-rose-50 transition-colors shadow-sm">
              False (F)
            </button>
          </div>
        ) : (
          <ResultPanel reason={q.reason} jp={q.jp} />
        )}
      </div>
    );
  };

  const AR1Mode = () => {
    const q = questions[qIndex];
    return (
      <div className="w-full max-w-xl mx-auto px-4">
        <div className="mb-6">
          <span className="text-sm font-bold text-amber-600 mb-2 block">After reading 1 (並べ替え) - UNIT {selectedUnit} ({qIndex + 1}/{questions.length})</span>
          <p className="text-gray-800 font-medium bg-amber-100/50 p-4 rounded-xl text-base">{q.jp}</p>
        </div>

        <div className="min-h-[100px] bg-white border-2 border-dashed border-gray-300 rounded-2xl p-5 flex flex-wrap items-center gap-2 mb-8 shadow-inner">
          <span className="text-gray-700 font-medium">{q.head}</span>
          {selectedOptions.map((word, i) => (
            <button key={i} onClick={() => handleWordClick(word, false, i)} className="px-3 py-2 bg-blue-100 text-blue-800 rounded-lg font-bold shadow-sm hover:bg-blue-200 transition-colors">
              {word}
            </button>
          ))}
          {selectedOptions.length === 0 && <span className="text-gray-400 text-sm font-medium">単語をタップして配置</span>}
          <span className="text-gray-700 font-medium">{q.tail}</span>
        </div>

        {!showResult ? (
          <>
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {availableWords.map((word, i) => (
                <button key={i} onClick={() => handleWordClick(word, true, i)} className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:border-gray-400 transition-colors active:scale-95">
                  {word}
                </button>
              ))}
            </div>
            <button 
              onClick={checkOrderAnswer}
              disabled={availableWords.length > 0}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-colors shadow-md ${availableWords.length === 0 ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              解答する
            </button>
          </>
        ) : (
          <ResultPanel 
            reason={
              <div>
                <p className="font-bold text-gray-700 mb-2">【正解の英文】</p>
                <p className="text-blue-800 font-medium text-lg bg-blue-50 p-3 rounded-lg">{q.head} {q.correct.join(' ')} {q.tail}</p>
              </div>
            }
          />
        )}
      </div>
    );
  };

  const MusicMode = () => {
    const isHeal = currentMode === 'music_heal';
    const songTitle = isHeal ? 'Heal the World' : 'Imagine';
    const isAllRevealed = revealedBlanks.length === questions.length;
    const allBlankIndexes = questions.map((_, i) => i);
    const hideWord = (word) => '_'.repeat(word.length);
    const toggleBlank = (index) => {
      setRevealedBlanks(
        revealedBlanks.includes(index)
          ? revealedBlanks.filter(i => i !== index)
          : [...revealedBlanks, index]
      );
    };

    return (
      <div className="w-full max-w-2xl mx-auto px-4 pb-6">
        <div className="mb-5">
          <span className={`text-sm font-bold mb-2 block ${isHeal ? 'text-pink-600' : 'text-cyan-600'}`}>
            洋楽 穴埋め - {songTitle}
          </span>
          <h2 className="text-2xl font-bold text-gray-800">{songTitle}</h2>
        </div>

        <div className={`bg-white p-5 md:p-7 rounded-2xl border shadow-sm ${isHeal ? 'border-pink-100' : 'border-cyan-100'}`}>
          <div className="space-y-4">
            {questions.map((q, index) => {
              const isRevealed = revealedBlanks.includes(index);
              const [head, tail] = q.q.split('[   ]');

              return (
                <div key={`${q.a}-${index}`} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-lg md:text-xl leading-9 text-gray-800 font-medium">
                    {head}
                    <button
                      onClick={() => toggleBlank(index)}
                      className={`mx-1 inline-flex min-w-[4.25rem] items-center justify-center rounded-lg border px-2 py-1 font-bold transition-colors align-baseline ${
                        isRevealed
                          ? isHeal
                            ? 'border-pink-300 bg-pink-100 text-pink-700'
                            : 'border-cyan-300 bg-cyan-100 text-cyan-700'
                          : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isRevealed ? q.a : hideWord(q.a)}
                    </button>
                    {tail}
                  </p>
                  {showHint && (
                    <p className={`mt-2 text-sm md:text-base leading-7 font-medium ${isHeal ? 'text-pink-700' : 'text-cyan-700'}`}>
                      {q.jp}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 -mx-4 mt-6 border-t border-gray-200 bg-gray-50/95 px-4 py-4 backdrop-blur">
          <div className="mx-auto grid max-w-2xl grid-cols-3 gap-2">
            <button
              onClick={() => setRevealedBlanks(allBlankIndexes)}
              disabled={isAllRevealed}
              className={`rounded-xl py-3 text-sm font-bold shadow-sm transition-colors ${
                isAllRevealed
                  ? 'bg-gray-200 text-gray-400'
                  : isHeal
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-cyan-600 text-white hover:bg-cyan-700'
              }`}
            >
              全て表示
            </button>
            <button
              onClick={() => setRevealedBlanks([])}
              disabled={revealedBlanks.length === 0}
              className={`rounded-xl py-3 text-sm font-bold shadow-sm transition-colors ${revealedBlanks.length === 0 ? 'bg-gray-200 text-gray-400' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
            >
              隠す
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className={`rounded-xl bg-white py-3 text-sm font-bold shadow-sm border transition-colors ${
                isHeal
                  ? 'border-pink-100 text-pink-700 hover:bg-pink-50'
                  : 'border-cyan-100 text-cyan-700 hover:bg-cyan-50'
              }`}
            >
              {showHint ? '和訳を隠す' : '和訳を見る'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AR2Mode = () => {
    const q = questions[qIndex];
    return (
      <div className="w-full max-w-lg mx-auto px-4 flex flex-col items-center">
        <div className="w-full mb-4">
          <span className="text-sm font-bold text-purple-600 mb-1 block">After reading 2 (英英単語) - UNIT {selectedUnit}</span>
          <div className="flex justify-between text-xs font-bold text-gray-400">
            <span>タップして意味を確認</span>
            <span>{qIndex + 1} / {questions.length}</span>
          </div>
        </div>

        <div 
          className="relative w-full aspect-[4/3] sm:aspect-[3/2] cursor-pointer mb-8"
          style={{ perspective: '1000px' }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1)', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
            
            <div className="absolute w-full h-full bg-white border-2 border-gray-100 rounded-2xl shadow-lg flex flex-col p-6 sm:p-10" style={{ backfaceVisibility: 'hidden' }}>
              <div className="text-xs font-bold text-gray-400 tracking-wider mb-2 uppercase">Definition</div>
              <div className="flex-1 flex items-center justify-center text-center">
                <p className="text-lg sm:text-2xl text-gray-700 font-medium leading-relaxed">
                  "{q.def}"
                </p>
              </div>
              <div className="text-center text-gray-400 text-sm mt-4 flex items-center justify-center gap-2">
                <Undo2 size={16} /> タップして答えを見る
              </div>
            </div>

            <div className="absolute w-full h-full bg-purple-50 border-2 border-purple-200 rounded-2xl shadow-lg flex flex-col p-6 sm:p-10" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <div className="text-xs font-bold text-purple-400 tracking-wider mb-2 uppercase">Answer</div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <h2 className="text-4xl sm:text-5xl font-bold text-purple-800 mb-4">{q.word}</h2>
                <p className="text-xl sm:text-2xl text-purple-600 font-bold mb-4">{q.jp}</p>
              </div>
              <div className="text-center text-purple-400 text-sm mt-4">
                タップして戻す
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={(e) => { e.stopPropagation(); nextQuestion(); }}
          className="w-full max-w-xs py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-md"
        >
          {qIndex + 1 < questions.length ? '次の単語へ' : 'メニューに戻る'}
        </button>
      </div>
    );
  };

  const WordListMode = () => (
    <div className="w-full max-w-2xl mx-auto px-4 pb-8 flex flex-col items-center">
      <div className="w-full mb-6 text-center">
        <span className="text-sm font-bold text-sky-600 mb-1 block">Word List - UNIT {selectedUnit}</span>
        <h2 className="text-2xl font-bold text-gray-800">単語・定義一覧表</h2>
      </div>
      <div className="w-full space-y-4 mb-8">
        {questions.map((q, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-4 md:items-center">
            <div className="md:w-1/3">
              <h3 className="text-2xl font-bold text-sky-700">{q.word}</h3>
              <p className="text-base font-bold text-gray-700 mt-1">{q.jp}</p>
            </div>
            <div className="md:w-2/3 text-sm text-gray-600 bg-sky-50 p-4 rounded-xl border border-sky-100 font-medium">
              {q.def}
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setCurrentMode('menu')} className="w-full max-w-xs py-4 bg-gray-800 text-white rounded-xl font-bold shadow-md">
        メニューに戻る
      </button>
    </div>
  );

  const GrammarMode = () => {
    const posIds = grammarData.posQuestions.map((_, i) => `pos-${i}`);
    const patternIds = grammarData.patternQuestions.map((_, i) => `pattern-${i}`);
    const allIds = [...posIds, ...patternIds];
    const isAllRevealed = allIds.every(id => revealedBlanks.includes(id));
    const toggleAnswer = (id) => {
      setRevealedBlanks(
        revealedBlanks.includes(id)
          ? revealedBlanks.filter(item => item !== id)
          : [...revealedBlanks, id]
      );
    };

    return (
      <div className="w-full max-w-3xl mx-auto px-4 pb-8">
        <div className="mb-5">
          <span className="text-sm font-bold text-teal-600 mb-2 block">Grammar - UNIT 1〜4</span>
          <h2 className="text-2xl font-bold text-gray-800">品詞・文型対策</h2>
        </div>

        <div className="space-y-5">
          <section className="bg-white p-5 md:p-6 rounded-2xl border border-teal-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">鉄則：空欄の前後を見る</h3>
            <div className="grid gap-3 md:grid-cols-3">
              {grammarData.rules.map(rule => (
                <div key={rule.title} className="rounded-xl bg-teal-50 p-4 border border-teal-100">
                  <p className="font-bold text-teal-800 mb-2">{rule.title}</p>
                  <div className="space-y-2">
                    {rule.points.map(point => (
                      <p key={point} className="text-sm leading-6 text-gray-700 font-medium">・{point}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 md:p-6 rounded-2xl border border-teal-100 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">本文抜き出し：品詞チェック</h3>
              <button
                onClick={() => setRevealedBlanks(isAllRevealed ? [] : allIds)}
                className="shrink-0 rounded-lg bg-teal-600 px-3 py-2 text-sm font-bold text-white hover:bg-teal-700 transition-colors"
              >
                {isAllRevealed ? '全部隠す' : '全部表示'}
              </button>
            </div>

            <div className="space-y-3">
              {grammarData.posQuestions.map((q, i) => {
                const id = `pos-${i}`;
                const isOpen = revealedBlanks.includes(id);

                return (
                  <div key={id} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-teal-600 mb-1">UNIT {q.unit}</p>
                        <p className="text-base md:text-lg leading-8 font-medium text-gray-800">{q.text}</p>
                      </div>
                      <button
                        onClick={() => toggleAnswer(id)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isOpen ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {isOpen ? '隠す' : '答え'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mt-3 rounded-lg bg-teal-50 p-3 text-sm md:text-base leading-7 text-gray-700 font-medium">
                        <p><span className="font-bold text-teal-800">正解：</span>{q.answer}（{q.pos}）</p>
                        <p className="mt-1">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white p-5 md:p-6 rounded-2xl border border-teal-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">文型の見抜き方</h3>
            <div className="grid gap-3 md:grid-cols-2">
              {grammarData.patternRules.map(rule => (
                <div key={rule.pattern} className="rounded-xl border border-gray-200 p-4">
                  <p className="font-bold text-gray-800"><span className="text-teal-700">{rule.pattern}</span>：{rule.name}</p>
                  <p className="mt-2 text-sm leading-6 text-gray-600 font-medium">{rule.check}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white p-5 md:p-6 rounded-2xl border border-teal-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">本文から出る文型チェック</h3>
            <div className="space-y-3">
              {grammarData.patternQuestions.map((q, i) => {
                const id = `pattern-${i}`;
                const isOpen = revealedBlanks.includes(id);

                return (
                  <div key={id} className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold text-teal-600 mb-1">UNIT {q.unit}</p>
                        <p className="text-base md:text-lg leading-8 font-medium text-gray-800">{q.sentence}</p>
                      </div>
                      <button
                        onClick={() => toggleAnswer(id)}
                        className={`shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition-colors ${isOpen ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {isOpen ? '隠す' : '文型'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="mt-3 rounded-lg bg-teal-50 p-3 text-sm md:text-base leading-7 text-gray-700 font-medium">
                        <p><span className="font-bold text-teal-800">文型：</span>{q.answer}</p>
                        <p className="mt-1">{q.breakdown}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-white p-5 md:p-6 rounded-2xl border border-teal-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">重要単語の派生語ファミリー</h3>
            <div className="-mx-2 overflow-x-auto px-2">
              <table className="w-full min-w-[680px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-3 pr-3 font-bold">意味</th>
                    <th className="py-3 pr-3 font-bold">名詞</th>
                    <th className="py-3 pr-3 font-bold">動詞</th>
                    <th className="py-3 pr-3 font-bold">形容詞</th>
                    <th className="py-3 font-bold">副詞</th>
                  </tr>
                </thead>
                <tbody>
                  {grammarData.wordFamilies.map(row => (
                    <tr key={row.meaning} className="border-b border-gray-100 last:border-b-0">
                      <td className="py-3 pr-3 font-bold text-gray-800">{row.meaning}</td>
                      <td className="py-3 pr-3 text-gray-700">{row.noun}</td>
                      <td className="py-3 pr-3 text-gray-700">{row.verb}</td>
                      <td className="py-3 pr-3 text-gray-700">{row.adjective}</td>
                      <td className="py-3 text-gray-700">{row.adverb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  };

  const ResultPanel = ({ reason, jp }) => (
    <div className={`p-6 md:p-8 rounded-2xl border-2 shadow-sm ${isCorrect ? 'bg-blue-50 border-blue-200' : 'bg-red-50 border-red-200'} animate-in fade-in slide-in-from-bottom-4`}>
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? <CheckCircle className="text-blue-500" size={32} /> : <XCircle className="text-red-500" size={32} />}
        <h3 className={`text-2xl font-bold ${isCorrect ? 'text-blue-700' : 'text-red-700'}`}>
          {isCorrect ? '正解！' : '不正解...'}
        </h3>
      </div>
      {jp && <p className="text-gray-700 font-medium text-base mb-3 bg-white p-3 rounded-lg">{jp}</p>}
      <div className="text-gray-700 font-medium mb-8 leading-relaxed">{reason}</div>
      <button onClick={nextQuestion} className="w-full py-4 bg-gray-800 text-white rounded-xl font-bold text-lg hover:bg-gray-700 transition-colors shadow-md">
        {qIndex + 1 < questions.length ? '次の問題へ' : 'メニューに戻る'}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-6 font-sans flex flex-col">
      {currentMode !== 'menu' && (
        <div className="px-4 max-w-2xl mx-auto w-full mb-6">
          <button onClick={() => setCurrentMode('menu')} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors font-bold text-sm shadow-sm">
            <ArrowLeft size={18} /> メニューに戻る
          </button>
        </div>
      )}
      
      <div className="flex-1 flex items-center justify-center">
        {currentMode === 'menu' && <MainMenu />}
        {currentMode === 'wr2' && <WR2Mode />}
        {currentMode === 'wr3' && <WR3Mode />}
        {currentMode === 'wr5' && <WR5Mode />}
        {currentMode === 'ar1' && <AR1Mode />}
        {currentMode === 'ar2' && <AR2Mode />}
        {currentMode === 'wordList' && <WordListMode />}
        {currentMode === 'grammar' && <GrammarMode />}
        {(currentMode === 'music_heal' || currentMode === 'music_imagine') && <MusicMode />}
      </div>
    </div>
  );
}
