import React from 'react';
import { Volume2, VolumeX, Flame, Zap, Snail, Rabbit, Sparkles, MessageSquare, Mic, BookOpen, ShieldAlert, Layers, GraduationCap } from 'lucide-react';
import { UserProgress } from '../types';

interface HeaderProps {
  activeTab: 'scenarios' | 'speech-lab' | 'flashcards' | 'vocab' | 'guide';
  setActiveTab: (tab: 'scenarios' | 'speech-lab' | 'flashcards' | 'vocab' | 'guide') => void;
  progress: UserProgress;
  isSlowAudio: boolean;
  setIsSlowAudio: (slow: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onOpenCustomScenario: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progress,
  isSlowAudio,
  setIsSlowAudio,
  isMuted,
  setIsMuted,
  onOpenCustomScenario,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-500 to-slate-900 shadow-md shadow-amber-500/20 text-white font-bold text-lg border border-amber-400/30">
              <span>DE</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900" title="Audio & Speech Recognition Ready" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white tracking-tight">SprechenDeutsch</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  A1 → C1 Fluency
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Interactive Daily Scenarios & Speech Coach for English Speakers
              </p>
            </div>
          </div>

          {/* Quick Stats & Controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Streak & XP */}
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 text-xs font-medium">
              <span className="flex items-center gap-1 text-amber-400" title="Daily Streak">
                <Flame className="w-4 h-4 fill-amber-400" />
                <span className="font-bold">{progress.streakDays}</span>d
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-yellow-400" title="Total Experience Points">
                <Zap className="w-4 h-4 fill-yellow-400" />
                <span className="font-bold">{progress.xp}</span> XP
              </span>
            </div>

            {/* Audio Speed Toggle (Normal vs Slow German for Beginners) */}
            <button
              onClick={() => setIsSlowAudio(!isSlowAudio)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                isSlowAudio
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-300'
              }`}
              title={isSlowAudio ? 'Slow audio enabled (0.75x) for learning' : 'Normal audio speed (1.0x)'}
            >
              {isSlowAudio ? (
                <>
                  <Snail className="w-4 h-4 text-amber-400" />
                  <span className="hidden md:inline">0.75x Tempo</span>
                </>
              ) : (
                <>
                  <Rabbit className="w-4 h-4 text-slate-400" />
                  <span className="hidden md:inline">1.0x Tempo</span>
                </>
              )}
            </button>

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                isMuted
                  ? 'bg-red-500/20 border-red-500/40 text-red-300'
                  : 'bg-slate-800 hover:bg-slate-700/80 border-slate-700 text-slate-300'
              }`}
              title={isMuted ? 'German TTS Sound Muted' : 'German TTS Sound Active'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* AI Custom Scenario Action Button */}
            <button
              onClick={onOpenCustomScenario}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Scenario</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-2 border-t border-slate-800/80 py-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'scenarios'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Interactive Scenarios</span>
          </button>

          <button
            onClick={() => setActiveTab('speech-lab')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'speech-lab'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Speech Recognition Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'flashcards'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards & Word List</span>
          </button>

          <button
            onClick={() => setActiveTab('vocab')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'vocab'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Vocabulary & C1 Guide</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === 'guide'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Grammar Tutorials (A1–C1)</span>
          </button>
        </div>
      </div>
    </header>
  );
};
