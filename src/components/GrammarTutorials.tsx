import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  Volume2,
  Check,
  X,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  BookOpen,
  ListOrdered,
  Code2,
  ArrowRight,
  Layers
} from 'lucide-react';
import { ALL_GRAMMAR_TUTORIALS } from '../data/grammarTutorialsData';
import { VOCABULARY_LIST } from '../data/vocabularyData';
import { GermanSpeechSynthesizer } from '../utils/speechUtils';
import { CEFRLevel } from '../types';

interface GrammarTutorialsProps {
  isSlowAudio: boolean;
}

export const GrammarTutorials: React.FC<GrammarTutorialsProps> = ({ isSlowAudio }) => {
  const [selectedUnit, setSelectedUnit] = useState<CEFRLevel>('A1');
  const [activeTutorialId, setActiveTutorialId] = useState<string>('rule-1-v2');
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});
  const [showFullSyllabus, setShowFullSyllabus] = useState(false);
  const [showUnitLexicon, setShowUnitLexicon] = useState(false);

  const synth = GermanSpeechSynthesizer.getInstance();

  // Filter tutorials for selected unit (8 rules per unit)
  const filteredTutorials = ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === selectedUnit);
  const currentTutorial =
    ALL_GRAMMAR_TUTORIALS.find((t) => t.id === activeTutorialId) ||
    filteredTutorials[0] ||
    ALL_GRAMMAR_TUTORIALS[0];

  // Unit vocabulary list from vocabularyData
  const unitVocab = VOCABULARY_LIST.filter((w) => w.level === selectedUnit);

  const handleSelectQuizOption = (optionIndex: number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [currentTutorial.id]: optionIndex,
    }));
  };

  const handleJumpToRule = (ruleId: string, level: CEFRLevel) => {
    setSelectedUnit(level);
    setActiveTutorialId(ruleId);
    setShowFullSyllabus(false);
  };

  // Group all 40 rules by level for the complete syllabus overview
  const syllabusByLevel: Record<CEFRLevel, typeof ALL_GRAMMAR_TUTORIALS> = {
    A1: ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === 'A1'),
    A2: ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === 'A2'),
    B1: ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === 'B1'),
    B2: ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === 'B2'),
    C1: ALL_GRAMMAR_TUTORIALS.filter((t) => t.level === 'C1'),
  };

  const levelTitles: Record<CEFRLevel, string> = {
    A1: 'Unit 1: A1 Foundations (8 Rules)',
    A2: 'Unit 2: A2 Core Communication (8 Rules)',
    B1: 'Unit 3: B1 Independence & Clauses (8 Rules)',
    B2: 'Unit 4: B2 Vantage & Workplace (8 Rules)',
    C1: 'Unit 5: C1 Nuance & Stylistic Mastery (8 Rules)',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/30 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>German Grammar Academy</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">
              • All 40 Core Rules across Units A1–C1
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Complete German Grammar Tutorials (8 Rules per Unit)
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
            Every CEFR unit contains 8 full grammatical masterclasses (40 total rules). Each tutorial provides the sentence blueprint formula, English-speaker pitfall contrast, spoken native audio models, and an interactive validation quiz.
          </p>
        </div>

        {/* Action: Open Full Syllabus & Unit Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => {
              setShowFullSyllabus(!showFullSyllabus);
              if (showUnitLexicon) setShowUnitLexicon(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold border border-amber-500/30 transition-all"
          >
            <ListOrdered className="w-3.5 h-3.5 text-amber-400" />
            <span>{showFullSyllabus ? 'Hide 40-Rule Map' : 'View Full 40-Rule Syllabus'}</span>
          </button>

          <button
            onClick={() => {
              setShowUnitLexicon(!showUnitLexicon);
              if (showFullSyllabus) setShowFullSyllabus(false);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
              showUnitLexicon
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-extrabold'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Unit {selectedUnit} Lexicon ({unitVocab.length} Words)</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  setSelectedUnit(lvl);
                  const firstInUnit = ALL_GRAMMAR_TUTORIALS.find((t) => t.level === lvl);
                  if (firstInUnit) setActiveTutorialId(firstInUnit.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedUnit === lvl
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 font-extrabold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Unit {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Expandable Complete 40-Rule Syllabus Map */}
      {showFullSyllabus && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">
                All 40 German Grammar Tutorials (8 Rules in Each of the 5 Units)
              </h3>
            </div>
            <button
              onClick={() => setShowFullSyllabus(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Click any rule below to immediately jump into its detailed tutorial, sentence formula, native audio examples, and quiz:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 pt-2">
            {(['A1', 'A2', 'B1', 'B2', 'C1'] as const).map((lvl) => (
              <div key={lvl} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                  <span className="text-xs font-black text-amber-400 font-mono">Unit {lvl}</span>
                  <span className="text-[10px] text-slate-400 font-bold px-1.5 py-0.5 rounded bg-slate-900">
                    8 Rules
                  </span>
                </div>
                <div className="space-y-1.5 pt-1">
                  {syllabusByLevel[lvl].map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleJumpToRule(r.id, lvl)}
                      className={`w-full text-left p-2 rounded-lg text-[11px] transition-all flex items-start gap-1.5 ${
                        activeTutorialId === r.id
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-semibold'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <span className="text-amber-400 font-mono font-bold shrink-0">
                        R{r.ruleNumber}:
                      </span>
                      <span className="line-clamp-1 leading-snug">{r.title.replace(/^Rule \d+:\s*/, '')}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expandable Unit Lexicon Word Bank */}
      {showUnitLexicon && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-extrabold text-white">
                Unit {selectedUnit} Lexicon & Word Bank ({unitVocab.length} Words)
              </h3>
            </div>
            <button
              onClick={() => setShowUnitLexicon(false)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Here are the foundational vocabulary words that accompany Unit {selectedUnit}. Click any speaker icon to hear native pronunciation:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
            {unitVocab.map((w) => (
              <div
                key={w.id}
                className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-2"
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center gap-1.5">
                    {w.article && (
                      <span
                        className={`text-[9px] font-bold px-1 rounded ${
                          w.article === 'der'
                            ? 'bg-blue-500/20 text-blue-400'
                            : w.article === 'die'
                            ? 'bg-rose-500/20 text-rose-400'
                            : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                      >
                        {w.article}
                      </span>
                    )}
                    <span className="text-xs font-bold text-white font-mono truncate">{w.german}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">{w.english}</p>
                </div>
                <button
                  onClick={() => synth.speak(w.german, undefined, isSlowAudio)}
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-400 transition-colors shrink-0"
                  title="Listen"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Tutorials Navigation in Current Unit (All 8 Rules) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {levelTitles[selectedUnit]}:
            </span>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              {filteredTutorials.length} / 8 Rules Available
            </span>
          </div>

          <div className="space-y-2">
            {filteredTutorials.map((tut) => {
              const isActive = tut.id === currentTutorial.id;
              const hasAnsweredQuiz = quizAnswers[tut.id] !== undefined && quizAnswers[tut.id] !== null;

              return (
                <button
                  key={tut.id}
                  onClick={() => setActiveTutorialId(tut.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isActive
                      ? 'bg-slate-900 border-amber-500/60 shadow-lg ring-1 ring-amber-500/30'
                      : 'bg-slate-950/70 hover:bg-slate-900/80 border-slate-800'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono">
                        Rule {tut.ruleNumber}
                      </span>
                      <span className="text-xs font-bold text-white line-clamp-1">
                        {tut.title.replace(/^Rule \d+:\s*/, '')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {tut.summary}
                    </p>
                  </div>

                  {hasAnsweredQuiz ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  ) : (
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 ${isActive ? 'text-amber-400' : 'text-slate-600'}`} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Tutorial Content */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
          {/* Header & Title */}
          <div className="space-y-2 border-b border-slate-800 pb-5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {currentTutorial.unit}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                Rule #{currentTutorial.ruleNumber} of 40
              </span>
              <span className="text-xs text-slate-400 font-medium">Core Grammar Rule</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {currentTutorial.title}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentTutorial.summary}
            </p>
          </div>

          {/* Rule Formula Blueprint Card */}
          <div className="bg-slate-950 border border-amber-500/30 rounded-2xl p-4 sm:p-5 space-y-2 shadow-inner">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>Sentence Formula & Structural Blueprint:</span>
            </span>
            <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 font-bold overflow-x-auto">
              {currentTutorial.ruleFormula}
            </div>
          </div>

          {/* Target Rule Vocabulary Card */}
          {currentTutorial.targetVocab && currentTutorial.targetVocab.length > 0 && (
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Rule Target Vocabulary (Click to Hear Authentic Audio):</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">
                  {currentTutorial.targetVocab.length} Lexical Items
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {currentTutorial.targetVocab.map((v, vIdx) => (
                  <button
                    key={vIdx}
                    onClick={() => synth.speak(v.word, undefined, isSlowAudio)}
                    className="bg-slate-950 p-3 rounded-xl border border-slate-800 hover:border-amber-500/40 text-left transition-all group flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 group-hover:text-amber-400">
                        {v.type}
                      </span>
                      <Volume2 className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <div className="mt-2">
                      <p className="text-xs font-bold text-white group-hover:text-amber-300 font-mono transition-colors">
                        {v.word}
                      </p>
                      <p className="text-[11px] text-slate-400 line-clamp-1">
                        {v.translation}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* English Native Speaker Contrast Trap */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 space-y-1.5">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4" />
              <span>English Native Speaker Contrast & Divergence:</span>
            </span>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentTutorial.englishContrast}
            </p>
          </div>

          {/* Detailed Grammar Rule Explanation */}
          <div className="space-y-3 pt-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Grammatical Mechanics & Structure:
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
              {currentTutorial.explanation}
            </p>
          </div>

          {/* High-Fidelity Spoken German Model Sentences */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Spoken German Models (Click to Hear Authentic Pronunciation):
              </h3>
              <span className="text-[10px] text-amber-400 font-mono">
                {isSlowAudio ? '0.75x Slow Tempo' : '1.0x Normal Tempo'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentTutorial.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all flex items-start justify-between gap-3 group"
                >
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-bold text-white font-mono group-hover:text-amber-300 transition-colors">
                      {ex.de}
                    </p>
                    <p className="text-[11px] text-slate-400">{ex.en}</p>
                    {ex.note && (
                      <span className="inline-block text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-medium">
                        💡 {ex.note}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => synth.speak(ex.de, undefined, isSlowAudio)}
                    className="p-2 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 border border-slate-800 transition-all shrink-0"
                    title="Listen to German Pronunciation"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Common Pitfall Box */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 space-y-1.5">
            <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Common Trap to Avoid:</span>
            </span>
            <p className="text-xs text-red-200 leading-relaxed font-mono">
              {currentTutorial.pitfall}
            </p>
          </div>

          {/* Interactive Check-Your-Understanding Quiz */}
          {currentTutorial.quiz && (
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 pt-4 mt-6 shadow-inner">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Check Your Understanding (Mini-Quiz)
                </h4>
              </div>

              <p className="text-xs font-semibold text-slate-200">
                {currentTutorial.quiz.question}
              </p>

              <div className="space-y-2">
                {currentTutorial.quiz.options.map((opt, idx) => {
                  const userAnswer = quizAnswers[currentTutorial.id];
                  const hasAnswered = userAnswer !== undefined && userAnswer !== null;
                  const isSelected = userAnswer === idx;
                  const isCorrect = idx === currentTutorial.quiz!.correctIndex;

                  let buttonStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                  if (hasAnswered) {
                    if (isCorrect) {
                      buttonStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-red-500/20 border-red-500 text-red-300';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectQuizOption(idx)}
                      disabled={hasAnswered}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt}</span>
                      {hasAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                      {hasAnswered && isSelected && !isCorrect && <X className="w-4 h-4 text-red-400" />}
                    </button>
                  );
                })}
              </div>

              {quizAnswers[currentTutorial.id] !== undefined && quizAnswers[currentTutorial.id] !== null && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1 animate-fade-in">
                  <span className="font-bold text-amber-400 block">Explanation:</span>
                  <p>{currentTutorial.quiz.explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
