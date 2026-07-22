import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, ChevronRight, ArrowLeft, Undo2, LayoutList, AlignLeft } from 'lucide-react';
import testData from './testData';

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
  const [currentMode, setCurrentMode] = useState('menu');
  const [selectedUnit, setSelectedUnit] = useState(5);
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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">英語Ⅴ 前期末テスト対策</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">UNIT 5〜8・模範解答と解説に準拠</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full">
        <label className="block text-sm font-bold text-gray-700 mb-3 text-center">教科書のUNITを選ぶ</label>
        <div className="flex justify-between gap-2 mb-6">
          {[5, 6, 7, 8].map(u => (
            <button
              key={u}
              onClick={() => setSelectedUnit(u)}
              className={`flex-1 py-3 rounded-xl font-bold transition-all ${selectedUnit === u ? 'bg-blue-600 text-white shadow-md transform scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              UNIT {u}
            </button>
          ))}
        </div>

        <p className="mb-5 rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-bold leading-6 text-blue-800">
          {testData[selectedUnit].title}
        </p>

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
