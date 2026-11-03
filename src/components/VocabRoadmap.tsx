import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Info,
  Search,
  Filter,
  Layers,
  ArrowRight,
  ShieldAlert,
  Zap,
  ExternalLink
} from 'lucide-react';
import { VocabWord, CEFRLevel } from '../types';
import { CEFR_ROADMAP, VOCABULARY_LIST, CURRICULUM_LEXICON_STATS } from '../data/vocabularyData';
import { GermanSpeechSynthesizer } from '../utils/speechUtils';

interface VocabRoadmapProps {
  learnedVocabIds: string[];
  onToggleLearned: (vocabId: string) => void;
  isSlowAudio: boolean;
}

export const VocabRoadmap: React.FC<VocabRoadmapProps> = ({
  learnedVocabIds,
  onToggleLearned,
  isSlowAudio,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [explainerWord, setExplainerWord] = useState('');
  const [explainerResult, setExplainerResult] = useState<any | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  const synth = GermanSpeechSynthesizer.getInstance();

  const filteredVocab = VOCABULARY_LIST.filter((item) => {
    const matchesLevel = selectedLevel === 'ALL' || item.level === selectedLevel;
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesQuery =
      item.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.english.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesCategory && matchesQuery;
  });

  const handleExplainWord = async (wordToExplain?: string) => {
    const target = wordToExplain || explainerWord;
    if (!target.trim()) return;
    setIsExplaining(true);
    setExplainerResult(null);

    try {
      const res = await fetch('/api/explain-vocab', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word: target }),
      });
      const data = await res.json();
      setExplainerResult(data);
    } catch (e) {
      console.error('Failed to explain word:', e);
    } finally {
      setIsExplaining(false);
    }
  };

  const c1Milestone = CEFR_ROADMAP['C1'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* ================= SPECIAL ADVANCED VOCABULARY ANSWER & SHOWCASE ================= */}
      <section className="bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 rounded-3xl border-2 border-amber-500/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-sm">
                Advanced Level Target
              </span>
              <span className="text-xs text-amber-300 font-semibold">CEFR C1 Standard Requirements</span>
            </div>
            <div className="text-right">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">8,000 – 10,000</span>
              <span className="text-xs text-slate-400 block font-mono">Required Lexical Words for C1</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What is the Required Vocabulary for Advanced Level (C1)?
            </h1>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-4xl">
              According to the <strong className="text-amber-300 font-bold">Goethe-Institut, Telc, and the Common European Framework of Reference (CEFR)</strong>, achieving conversational and professional fluency at the Advanced (C1) level requires an active and passive vocabulary of <strong className="text-white font-bold">8,000 to 10,000 words</strong> (or lemmas).
            </p>
          </div>

          {/* The 5 Key Pillars of C1 German for English Speakers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>1. Compound Noun Architecture</span>
              </span>
              <p className="text-xs text-slate-300">
                You do not memorize every long word in isolation; you learn the morphological engine to decompose and build compounds on the fly (*die Zukunftsfähigkeit*, *das Fingerspitzengefühl*).
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>2. Emotional Modal Particles</span>
              </span>
              <p className="text-xs text-slate-300">
                True conversational nuance comes from mastering untranslatable particles (*doch, mal, halt, ja, eben, wohl, bloß, eh*) that express stance, warmth, and implicit consensus.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>3. Bildungssprache (Academic Register)</span>
              </span>
              <p className="text-xs text-slate-300">
                Elevated vocabulary for executive discussions, political debate, economics, and abstract philosophy (*der Paradigmenwechsel*, *unumgänglich*, *in Betracht ziehen*).
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ArrowRight className="w-4 h-4" />
                <span>4. High-Level Connectors</span>
              </span>
              <p className="text-xs text-slate-300">
                Connecting multi-clause arguments with precision discourse markers (*infolgedessen, wenngleich, nichtsdestotrotz, geschweige denn*).
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>5. Idiomatic Fluency (Redewendungen)</span>
              </span>
              <p className="text-xs text-slate-300">
                Spontaneous use and comprehension of German idioms (*den Nagel auf den Kopf treffen*, *die Kirche im Dorf lassen*, *ins Fettnäpfchen treten*).
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>Coverage Benchmark</span>
              </span>
              <p className="text-xs text-slate-300">
                At 8,000–10,000 words, you comprehend <strong className="text-white">98% of any authentic German text or conversation</strong>, including national newspapers (FAZ, Die Zeit) and TV debates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM VOCABULARY SIZE DASHBOARD ================= */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Curriculum Output</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Your Vocabulary Size After Finishing All Lessons
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              When you complete all dialogue scenarios, pronunciation drills, and vocabulary modules in SprechenDeutsch, your vocabulary grows across three layers:
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 shrink-0">
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-2xl font-black text-emerald-400 font-mono">1,250+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">Active Speech Words</span>
            </div>
            <div className="bg-slate-950/80 border border-amber-500/30 p-3 rounded-2xl text-center">
              <span className="text-2xl font-black text-amber-400 font-mono">4,500+</span>
              <span className="text-[10px] uppercase font-bold text-amber-300/80 block mt-0.5">Compound Multiplier</span>
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl text-center">
              <span className="text-2xl font-black text-white font-mono">8,500+</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 block mt-0.5">C1 Passive Lexicon</span>
            </div>
          </div>
        </div>

        {/* Milestone-by-Milestone Progression Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Level-by-Level Curriculum Progression
            </h3>
            <span className="text-[11px] text-amber-400 font-mono">Click level to view skills & active vocabulary</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {CURRICULUM_LEXICON_STATS.levelMilestones.map((m) => {
              const isSelected = selectedLevel === m.level;

              return (
                <button
                  key={m.level}
                  onClick={() => setSelectedLevel(m.level)}
                  className={`text-left p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-500 shadow-lg ring-1 ring-amber-500/50'
                      : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xl font-black text-white">{m.level}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                        +{m.directLessonWords} words
                      </span>
                    </div>

                    <div className="space-y-1 mb-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Active words:</span>
                        <span className="font-bold text-emerald-400 font-mono">{m.cumulativeActiveWords}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Passive reach:</span>
                        <span className="font-bold text-white font-mono">{m.cumulativePassiveWords}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 line-clamp-2 italic border-t border-slate-800/60 pt-2">
                    "{m.canDoStatement}"
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Compounding Multiplier Explained */}
        <div className="bg-slate-950/90 rounded-2xl border border-slate-800 p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>The German Compound Multiplier Secret</span>
            </span>
            <h4 className="text-base font-extrabold text-white">
              Why 1,250 Learned Words Equals 4,500+ Usable Vocabulary
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In German, words act like Lego bricks (*Komposita*). When you learn one root word like <strong className="text-amber-300 font-mono">der Zug</strong> (train) and compounding elements, you instantly understand and produce 6+ new words without opening a dictionary!
            </p>
          </div>

          <div className="lg:col-span-7 bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Example in Practice: 1 Root Word → 6 Real-World Words
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">der Zugausfall</span>
                <span className="text-[10px] text-slate-400">train cancellation</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">die Zugverspätung</span>
                <span className="text-[10px] text-slate-400">train delay</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">die Zugbindung</span>
                <span className="text-[10px] text-slate-400">fixed ticket binding</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">der Anschlusszug</span>
                <span className="text-[10px] text-slate-400">connection train</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">die Zugfahrt</span>
                <span className="text-[10px] text-slate-400">train journey</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800/80">
                <span className="font-bold text-white block">der Nahverkehrszug</span>
                <span className="text-[10px] text-slate-400">commuter train</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CEFR MILESTONE PROGRESSION TRACKER ================= */}
      <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold text-white">CEFR Vocabulary Milestone Ladder</h2>
            <p className="text-xs text-slate-400">Total vocabulary target for each milestone from Beginner to Advanced</p>
          </div>
          <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 self-start">
            Learned words: {learnedVocabIds.length} in this app
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
          {(['A1', 'A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).map((level) => {
            const info = CEFR_ROADMAP[level];
            const isSelected = selectedLevel === level;

            return (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-amber-500/20 border-amber-500/80 shadow-md ring-1 ring-amber-500/50'
                    : 'bg-slate-950/70 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-black text-amber-400">{level}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {info.wordCountTarget}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1">{info.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {info.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Level Reset to ALL */}
        {selectedLevel !== 'ALL' && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <span className="text-xs text-amber-300">
              Filtering vocabulary for: <strong>Level {selectedLevel}</strong>
            </span>
            <button
              onClick={() => setSelectedLevel('ALL')}
              className="text-xs text-slate-400 hover:text-white underline"
            >
              Show all levels (ALL)
            </button>
          </div>
        )}
      </section>

      {/* ================= PEDAGOGICAL GUIDE: HOW TO LEARN ALL WORDS OF EACH LEVEL ================= */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20 rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-5 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              How Does a Student Learn All 600–1,000 Words in A1 and Reach 10,000 in C1?
            </h2>
            <p className="text-xs text-slate-400">
              Understanding the connection between Grammar Tutorials, Flashcards, Scenarios, and German Compounding
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono border border-amber-500/30">1</span>
              <span>Grammar Tutorials + Lexicon</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Grammar tutorials teach the <strong>8 structural blueprints</strong> per level. Each tutorial now includes its dedicated <strong>Target Rule Vocabulary</strong> with audio models so you learn functional words in context.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono border border-amber-500/30">2</span>
              <span>Thematic Core Word Bank</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Study the <strong>140+ foundational A1 words</strong> below and in the Flashcards tab. Grouped into 11 daily survival themes (Food, Transport, Home, Family, Core Verbs, Adjectives, Numbers & Time).
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono border border-amber-500/30">3</span>
              <span>The Compound Multiplier</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              German is famous for compounding roots. Knowing <strong>300 roots</strong> unlocks <strong>1,000+ words</strong>! E.g. <em>Fahrt</em> (trip) + <em>Karte</em> (ticket) = <em>die Fahrkarte</em>; <em>Krank</em> + <em>Haus</em> = <em>das Krankenhaus</em>.
            </p>
          </div>

          <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-[10px] font-mono border border-amber-500/30">4</span>
              <span>Spoken Scenarios & AI Packs</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Words stick 5x faster when spoken out loud in daily dialogues (bakeries, train stations, doctor clinics). You can also use the <strong>AI Flashcard Generator</strong> to build custom packs for any topic!
            </p>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE COMPOUND & VOCAB EXPLAINER ================= */}
      <section className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white">German Compound Noun Deconstructor & Lexicon</h2>
        </div>
        <p className="text-xs text-slate-400 max-w-2xl">
          Enter any German word (e.g. *Schadenfreude*, *Feierabend*, *Kummerspeck*, *Fingerspitzengefühl*, *Zugverspätung*) to deconstruct its roots, uncover noun gender, and verify English false friends.
        </p>

        <div className="flex gap-2 max-w-xl">
          <input
            type="text"
            value={explainerWord}
            onChange={(e) => setExplainerWord(e.target.value)}
            placeholder="e.g. Fingerspitzengefühl, Kummerspeck, Feierabend..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            onClick={() => handleExplainWord()}
            disabled={isExplaining || !explainerWord.trim()}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-slate-950 font-bold text-xs transition-colors flex items-center gap-1.5"
          >
            <span>{isExplaining ? 'Analyzing...' : 'Deconstruct'}</span>
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px]">Popular compound gems:</span>
          {['Schadenfreude', 'Feierabend', 'Kummerspeck', 'Fingerspitzengefühl', 'Kopfkino', 'Zugverspätung'].map((preset) => (
            <button
              key={preset}
              onClick={() => {
                setExplainerWord(preset);
                handleExplainWord(preset);
              }}
              className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Breakdown Card */}
        {explainerResult && (
          <div className="bg-slate-950 rounded-xl p-5 border border-amber-500/30 space-y-3 mt-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                  explainerResult.article === 'der' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                  explainerResult.article === 'die' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                  'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}>
                  {explainerResult.article}
                </span>
                <span className="text-lg font-extrabold text-white">{explainerResult.word}</span>
                <button
                  onClick={() => synth.speak(`${explainerResult.article} ${explainerResult.word}`, undefined, isSlowAudio)}
                  className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                  title="Pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
                {explainerResult.level || 'C1'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">English Translation:</span>
                <span className="text-slate-100 font-semibold">{explainerResult.englishMeaning}</span>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block font-mono text-[10px] uppercase">Compound Structure:</span>
                <span className="text-amber-300 font-mono">
                  {Array.isArray(explainerResult.components) ? explainerResult.components.join(' + ') : explainerResult.literalTranslation}
                </span>
              </div>
            </div>

            {explainerResult.exampleSentence && (
              <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
                <p className="text-white font-medium">"{explainerResult.exampleSentence}"</p>
                <p className="text-slate-400 italic">"{explainerResult.englishExample}"</p>
              </div>
            )}

            {explainerResult.falseFriendAlert && (
              <div className="bg-red-500/10 border border-red-500/30 p-2.5 rounded-lg text-xs text-red-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{explainerResult.falseFriendAlert}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* ================= CURATED VOCABULARY EXPLORER ================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-white">Curated German Vocabulary Bank</h2>
            <span className="text-xs text-slate-400">({filteredVocab.length} words shown)</span>
          </div>

          {/* Search bar & Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search German or English..."
                className="bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              <option value="survival">Survival & Courtesy</option>
              <option value="numbers-time">Numbers, Calendar & Time</option>
              <option value="food">Food, Drinks & Dining</option>
              <option value="shopping">Shopping & Supermarket</option>
              <option value="travel">Travel, Transport & Directions</option>
              <option value="home">Home, Living & Appliances</option>
              <option value="people">People, Family & Identity</option>
              <option value="verbs">Core Everyday Verbs</option>
              <option value="adjectives">Adjectives & Descriptions</option>
              <option value="daily">Daily Routines & Chores</option>
              <option value="health">Healthcare & Medicine</option>
              <option value="technology">Technology & Digital</option>
              <option value="workplace">Workplace & Office</option>
              <option value="career">Career & Negotiations</option>
              <option value="connectors">Connectors & Discourse</option>
              <option value="compounds">Compounds (Komposita)</option>
              <option value="modal-particles">Modal Particles (C1)</option>
              <option value="cultural">Untranslatable Cultural Terms</option>
              <option value="false-friends">False Friends</option>
              <option value="idioms">Idioms & Nomen-Verb-Verbindungen</option>
            </select>
          </div>
        </div>

        {/* Word Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredVocab.map((item) => {
            const isLearned = learnedVocabIds.includes(item.id);

            // Gender coloring standard for German pedagogics: der = blue, die = red, das = green
            const genderBadgeClass =
              item.article === 'der'
                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                : item.article === 'die'
                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                : item.article === 'das'
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : 'bg-slate-800 text-slate-400 border-slate-700';

            return (
              <div
                key={item.id}
                className={`bg-slate-900/90 rounded-xl p-4 border transition-all flex flex-col justify-between space-y-3 ${
                  isLearned
                    ? 'border-emerald-500/30 shadow-sm'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      {item.article && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${genderBadgeClass}`}>
                          {item.article}
                        </span>
                      )}
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                        {item.level}
                      </span>
                    </div>

                    <button
                      onClick={() => onToggleLearned(item.id)}
                      className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded transition-colors ${
                        isLearned
                          ? 'bg-emerald-500/20 text-emerald-400 font-bold'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={isLearned ? 'Marked as mastered' : 'Click to mark as mastered'}
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isLearned ? 'Mastered' : 'Learn'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-white">{item.german}</h3>
                    <button
                      onClick={() =>
                        synth.speak(
                          item.article ? `${item.article} ${item.german}` : item.german,
                          undefined,
                          isSlowAudio
                        )
                      }
                      className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-amber-400 transition-colors"
                      title="Listen in German"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 font-medium mt-1">{item.english}</p>

                  {item.literalBreakdown && (
                    <div className="bg-slate-950/60 rounded px-2.5 py-1 text-[11px] text-amber-300/90 font-mono mt-2">
                      {item.literalBreakdown}
                    </div>
                  )}

                  {item.englishFalseFriendNote && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-[11px] text-red-300 mt-2">
                      ⚠️ {item.englishFalseFriendNote}
                    </div>
                  )}
                </div>

                <div className="bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 text-[11px] space-y-1">
                  <p className="text-slate-200">"{item.exampleDe}"</p>
                  <p className="text-slate-400 italic">"{item.exampleEn}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
