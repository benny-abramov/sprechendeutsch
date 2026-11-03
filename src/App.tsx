import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Mic,
  BookOpen,
  ShieldAlert,
  Flame,
  Zap,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Users,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Layers,
  GraduationCap
} from 'lucide-react';
import { Header } from './components/Header';
import { ScenarioPlayer } from './components/ScenarioPlayer';
import { SpeechLab } from './components/SpeechLab';
import { FlashcardsView } from './components/FlashcardsView';
import { VocabRoadmap } from './components/VocabRoadmap';
import { GrammarTutorials } from './components/GrammarTutorials';
import { CustomScenarioModal } from './components/CustomScenarioModal';
import { GrammarBriefingModal } from './components/GrammarBriefingModal';
import { Scenario, CEFRLevel, UserProgress } from './types';
import { SCENARIOS } from './data/scenariosData';
import { loadUserProgress, saveUserProgress } from './utils/storage';
import { GermanSpeechSynthesizer } from './utils/speechUtils';

export default function App() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'speech-lab' | 'flashcards' | 'vocab' | 'guide'>('scenarios');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [grammarBriefingScenario, setGrammarBriefingScenario] = useState<Scenario | null>(null);
  const [scenarioFilterLevel, setScenarioFilterLevel] = useState<string>('ALL');
  const [scenarioSearch, setScenarioSearch] = useState('');
  const [isSlowAudio, setIsSlowAudio] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCustomScenarioOpen, setIsCustomScenarioOpen] = useState(false);
  const [allScenarios, setAllScenarios] = useState<Scenario[]>(SCENARIOS);
  const [progress, setProgress] = useState<UserProgress>(loadUserProgress());

  const synth = GermanSpeechSynthesizer.getInstance();

  // Sync mute with synthesizer
  useEffect(() => {
    synth.setMuted(isMuted);
  }, [isMuted]);

  // Sync slow audio with synthesizer rate
  useEffect(() => {
    synth.setRate(isSlowAudio ? 0.72 : 0.95);
  }, [isSlowAudio]);

  // Save progress when it changes
  useEffect(() => {
    saveUserProgress(progress);
  }, [progress]);

  const handleCompleteScenario = (scenarioId: string, earnedXp: number) => {
    setProgress((prev) => {
      const alreadyCompleted = prev.completedScenarios.includes(scenarioId);
      const nextCompleted = alreadyCompleted
        ? prev.completedScenarios
        : [...prev.completedScenarios, scenarioId];
      return {
        ...prev,
        xp: prev.xp + earnedXp,
        completedScenarios: nextCompleted,
      };
    });
  };

  const handleAddXp = (amount: number) => {
    setProgress((prev) => ({
      ...prev,
      xp: prev.xp + amount,
    }));
  };

  const handleToggleLearnedVocab = (vocabId: string) => {
    setProgress((prev) => {
      const isLearned = prev.learnedVocabIds.includes(vocabId);
      const nextLearned = isLearned
        ? prev.learnedVocabIds.filter((id) => id !== vocabId)
        : [...prev.learnedVocabIds, vocabId];
      const xpDelta = isLearned ? -10 : 10;
      return {
        ...prev,
        xp: Math.max(0, prev.xp + xpDelta),
        learnedVocabIds: nextLearned,
      };
    });
  };

  const handleStartCustomScenario = (scenario: Scenario) => {
    setAllScenarios((prev) => [scenario, ...prev]);
    setActiveScenario(scenario);
  };

  // Filter scenarios
  const filteredScenarios = allScenarios.filter((sc) => {
    const matchesLevel = scenarioFilterLevel === 'ALL' || sc.level === scenarioFilterLevel;
    const matchesSearch =
      sc.title.toLowerCase().includes(scenarioSearch.toLowerCase()) ||
      sc.englishTitle.toLowerCase().includes(scenarioSearch.toLowerCase()) ||
      sc.location.toLowerCase().includes(scenarioSearch.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setActiveScenario(null);
        }}
        progress={progress}
        isSlowAudio={isSlowAudio}
        setIsSlowAudio={setIsSlowAudio}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onOpenCustomScenario={() => setIsCustomScenarioOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {/* If user is actively playing a scenario */}
        {activeScenario ? (
          <div className="pt-4 px-2 sm:px-4">
            <ScenarioPlayer
              scenario={activeScenario}
              isSlowAudio={isSlowAudio}
              onCompleteScenario={handleCompleteScenario}
              onBackToScenarios={() => setActiveScenario(null)}
            />
          </div>
        ) : (
          <>
            {/* TAB: Interactive Scenarios */}
            {activeTab === 'scenarios' && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
                {/* Hero / Motivation Banner */}
                <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                  <div className="space-y-3 z-10 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Speech-Driven Daily Scenarios</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      Speak Real German in Daily Life
                    </h1>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      Practice speaking out loud from day 1 with instant speech recognition. From ordering bread at a Berlin bakery to executive salary negotiations and philosophical debates on AI at C1 level.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Real-time voice accuracy</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        <span>English false-friend alerts</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span>CEFR A1 → C1 progression</span>
                      </div>
                    </div>
                  </div>

                  <div className="z-10 shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                    <button
                      onClick={() => setIsCustomScenarioOpen(true)}
                      className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Create AI Scenario with Gemini</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('flashcards')}
                      className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all flex items-center justify-center gap-2"
                    >
                      <Layers className="w-4 h-4 text-amber-400" />
                      <span>Study Flashcards & Word List</span>
                    </button>
                  </div>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* CEFR Level Tabs */}
                  <div className="flex flex-wrap items-center gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
                    {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => setScenarioFilterLevel(lvl)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          scenarioFilterLevel === lvl
                            ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {lvl === 'ALL' ? 'All Levels' : lvl}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="text"
                      value={scenarioSearch}
                      onChange={(e) => setScenarioSearch(e.target.value)}
                      placeholder="Search scenario or location..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>

                {/* Level Grammar Quick-Banner (Shows when a specific level is selected) */}
                {scenarioFilterLevel !== 'ALL' && (
                  <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">
                          Level {scenarioFilterLevel} Grammar Tutorials (Study Before Practicing)
                        </span>
                        <span className="text-[11px] text-slate-300">
                          Review sentence blueprints, noun cases, and English-speaker divergence points for {scenarioFilterLevel}.
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTab('guide')}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-amber-500/30 transition-all shrink-0 flex items-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open Unit {scenarioFilterLevel} Grammar Tutorials</span>
                    </button>
                  </div>
                )}

                {/* Scenarios Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredScenarios.map((sc) => {
                    const isCompleted = progress.completedScenarios.includes(sc.id);

                    return (
                      <div
                        key={sc.id}
                        className={`bg-slate-900/90 rounded-2xl border p-5 shadow-lg flex flex-col justify-between transition-all group hover:border-slate-700 hover:shadow-xl ${
                          isCompleted
                            ? 'border-emerald-500/40 bg-gradient-to-b from-slate-900 to-emerald-950/20'
                            : 'border-slate-800'
                        }`}
                      >
                        <div className="space-y-3">
                          {/* Top Tag & Status */}
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                              Level {sc.level}
                            </span>
                            {isCompleted ? (
                              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Completed</span>
                              </span>
                            ) : (
                              <span className="text-[11px] text-slate-400 font-mono">
                                {sc.turns.length} Dialog Turns
                              </span>
                            )}
                          </div>

                          {/* Avatar & Title */}
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl shrink-0 group-hover:scale-105 transition-transform">
                              {sc.partnerAvatar}
                            </div>
                            <div>
                              <h3 className="text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                                {sc.title}
                              </h3>
                              <p className="text-xs text-slate-400 font-medium">
                                {sc.englishTitle}
                              </p>
                            </div>
                          </div>

                          {/* Location & Role */}
                          <div className="flex items-center gap-3 text-xs text-slate-400">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-amber-400" />
                              <span className="truncate max-w-[160px]">{sc.location}</span>
                            </span>
                            <span>•</span>
                            <span className="truncate">{sc.partnerRole}</span>
                          </div>

                          {/* Grammar Blueprint Pill */}
                          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px]">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="font-semibold truncate">Grammar: {sc.grammarFocus}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                            {sc.description}
                          </p>

                          {/* Vocabulary preview pills */}
                          <div className="pt-1">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                              Target Vocabulary:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {sc.vocabularyGoals.slice(0, 4).map((vocab, i) => (
                                <span
                                  key={i}
                                  className="text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                                >
                                  {vocab}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons: Grammar Prep & Start Dialogue */}
                        <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setGrammarBriefingScenario(sc)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition-colors"
                            title="Study grammar tutorial before practicing"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            <span>Grammar Prep</span>
                          </button>

                          <button
                            onClick={() => setActiveScenario(sc)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all shrink-0"
                          >
                            <span>{isCompleted ? 'Practice Again' : 'Start Dialogue'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB: Speech Lab */}
            {activeTab === 'speech-lab' && (
              <SpeechLab isSlowAudio={isSlowAudio} onAddXp={handleAddXp} />
            )}

            {/* TAB: Flashcards & Word Master List */}
            {activeTab === 'flashcards' && (
              <FlashcardsView
                learnedVocabIds={progress.learnedVocabIds}
                onToggleLearned={handleToggleLearnedVocab}
                onAddXp={handleAddXp}
                isSlowAudio={isSlowAudio}
              />
            )}

            {/* TAB: Vocabulary & C1 Guide */}
            {activeTab === 'vocab' && (
              <VocabRoadmap
                learnedVocabIds={progress.learnedVocabIds}
                onToggleLearned={handleToggleLearnedVocab}
                isSlowAudio={isSlowAudio}
              />
            )}

            {/* TAB: Grammar Tutorials (A1 to C1) */}
            {activeTab === 'guide' && (
              <GrammarTutorials isSlowAudio={isSlowAudio} />
            )}
          </>
        )}
      </main>

      {/* Custom AI Scenario Modal */}
      <CustomScenarioModal
        isOpen={isCustomScenarioOpen}
        onClose={() => setIsCustomScenarioOpen(false)}
        onStartCustomScenario={handleStartCustomScenario}
      />

      {/* Pre-Practice Grammar Briefing Modal */}
      <GrammarBriefingModal
        scenario={grammarBriefingScenario}
        isOpen={Boolean(grammarBriefingScenario)}
        onClose={() => setGrammarBriefingScenario(null)}
        onStartScenario={(sc) => {
          setGrammarBriefingScenario(null);
          setActiveScenario(sc);
        }}
        onOpenGrammarAcademy={(lvl) => {
          setGrammarBriefingScenario(null);
          setActiveTab('guide');
        }}
        isSlowAudio={isSlowAudio}
      />
    </div>
  );
}
