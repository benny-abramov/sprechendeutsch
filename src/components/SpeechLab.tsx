import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  Volume2,
  Sparkles,
  Award,
  AlertTriangle,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Flame,
  Gauge
} from 'lucide-react';
import { PronunciationDrill, CEFRLevel } from '../types';
import { PRONUNCIATION_DRILLS } from '../data/pronunciationDrills';
import { GermanSpeechSynthesizer, createGermanSpeechRecognizer, SpeechRecognitionHandler } from '../utils/speechUtils';
import { compareSpokenToTarget, WordMatch } from '../utils/levenshtein';

interface SpeechLabProps {
  isSlowAudio: boolean;
  onAddXp: (amount: number) => void;
}

export const SpeechLab: React.FC<SpeechLabProps> = ({ isSlowAudio, onAddXp }) => {
  const [selectedDrill, setSelectedDrill] = useState<PronunciationDrill>(PRONUNCIATION_DRILLS[0]);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('ALL');
  const [isListening, setIsListening] = useState(false);
  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [phoneticResult, setPhoneticResult] = useState<{
    score: number;
    wordMatches: WordMatch[];
  } | null>(null);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);
  const [highestScore, setHighestScore] = useState<Record<string, number>>({});

  const synth = GermanSpeechSynthesizer.getInstance();
  const recognizerRef = useRef<SpeechRecognitionHandler | null>(null);

  // Filter drills by level
  const filteredDrills = PRONUNCIATION_DRILLS.filter((drill) => {
    if (selectedLevelFilter === 'ALL') return true;
    return drill.level === selectedLevelFilter;
  });

  useEffect(() => {
    recognizerRef.current = createGermanSpeechRecognizer({
      onStart: () => {
        setIsListening(true);
        setErrorNotice(null);
      },
      onResult: (res) => {
        setSpokenTranscript(res.transcript);
        if (res.isFinal) {
          setIsListening(false);
          evaluatePronunciation(res.transcript);
        }
      },
      onError: (err) => {
        setIsListening(false);
        setErrorNotice(err);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    return () => {
      recognizerRef.current?.abort();
    };
  }, [selectedDrill]);

  const toggleMic = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      setSpokenTranscript('');
      setPhoneticResult(null);
      setErrorNotice(null);
      recognizerRef.current?.start();
    }
  };

  const evaluatePronunciation = (transcript: string) => {
    if (!transcript.trim()) return;
    const comparison = compareSpokenToTarget(selectedDrill.phraseDe, transcript);
    setPhoneticResult({
      score: comparison.overallScore,
      wordMatches: comparison.wordMatches,
    });

    // Track highest score
    setHighestScore((prev) => {
      const currentHigh = prev[selectedDrill.id] || 0;
      if (comparison.overallScore > currentHigh) {
        return { ...prev, [selectedDrill.id]: comparison.overallScore };
      }
      return prev;
    });

    // Award XP
    if (comparison.overallScore >= 90) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      onAddXp(30);
    } else if (comparison.overallScore >= 70) {
      onAddXp(15);
    }
  };

  const playDrillAudio = (slow: boolean = false) => {
    synth.speak(selectedDrill.phraseDe, undefined, slow || isSlowAudio);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 p-6 rounded-2xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20">
              Phonetics & Speech Lab
            </span>
            <span className="text-xs text-slate-400">• German Sounds for English Speakers</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Aussprache-Studio (German Pronunciation Coach)
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Master the Ich-Laut [ç], the Ach-Laut [x], the umlauts (ä, ö, ü), consonant flips (W=[v], V=[f], Z=[ts]), and fast tongue twisters (*Zungenbrecher*).
          </p>
        </div>

        {/* Level filter tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevelFilter(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedLevelFilter === lvl
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Drill Selector List */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[700px] overflow-y-auto pr-1">
          <div className="flex items-center justify-between px-1 text-xs text-slate-400 font-medium">
            <span>Select Phonetic Target ({filteredDrills.length} drills)</span>
            <span>CEFR Level</span>
          </div>

          {filteredDrills.map((drill) => {
            const isSelected = selectedDrill.id === drill.id;
            const high = highestScore[drill.id];

            return (
              <button
                key={drill.id}
                onClick={() => {
                  setSelectedDrill(drill);
                  setPhoneticResult(null);
                  setSpokenTranscript('');
                }}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/50 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/90 hover:bg-slate-800/80 border-slate-800'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{drill.title}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                      {drill.targetSound}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 italic">
                    "{drill.phraseDe}"
                  </p>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {drill.level}
                  </span>
                  {high !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        high >= 90
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : high >= 70
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      Best: {high}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Active Workout Console */}
        <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-2xl flex flex-col justify-between space-y-6">
          {/* Top Drill Target */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Target Sound: {selectedDrill.targetSound}
                </span>
                <span className="text-xs text-slate-400">Level {selectedDrill.level}</span>
              </div>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                selectedDrill.difficulty === 'hard' ? 'bg-red-500/20 text-red-300' :
                selectedDrill.difficulty === 'medium' ? 'bg-amber-500/20 text-amber-300' :
                'bg-emerald-500/20 text-emerald-300'
              }`}>
                {selectedDrill.difficulty}
              </span>
            </div>

            {/* Phonetic Instruction Card for English Speakers */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mouth & Tongue Mechanics (for English Speakers):</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedDrill.soundDescription}
              </p>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedDrill.englishSpeakerTrap}</span>
              </div>
            </div>

            {/* Target German Phrase with IPA */}
            <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 space-y-2 text-center">
              <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
                German Target Phrase
              </span>
              <p className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed">
                "{selectedDrill.phraseDe}"
              </p>
              <p className="text-xs font-mono text-amber-300/80">
                {selectedDrill.phoneticHint}
              </p>
              <p className="text-xs text-slate-400">
                "{selectedDrill.phraseEn}"
              </p>

              {/* Audio Playback Buttons */}
              <div className="flex items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => playDrillAudio(false)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-600 transition-colors shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span>Normal Speed (1.0x)</span>
                </button>
                <button
                  onClick={() => playDrillAudio(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-600 transition-colors shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <span>Slow Audio (0.75x)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Evaluation Result */}
          {phoneticResult && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`text-sm font-extrabold px-3 py-1 rounded-lg ${
                      phoneticResult.score >= 90
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : phoneticResult.score >= 70
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'bg-red-500/20 text-red-300 border border-red-500/40'
                    }`}
                  >
                    {phoneticResult.score}% Accuracy
                  </div>
                  <span className="text-xs font-semibold text-white">
                    {phoneticResult.score >= 90
                      ? 'Ausgezeichnet! (Flawless German articulation)'
                      : phoneticResult.score >= 70
                      ? 'Sehr gut! (Clear and understandable)'
                      : 'Übung macht den Meister! (Keep practicing the target sound)'}
                  </span>
                </div>
              </div>

              {/* Word by word breakdown */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {phoneticResult.wordMatches.map((wm, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2.5 py-1 rounded font-mono font-medium ${
                      wm.status === 'correct'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : wm.status === 'near'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30 line-through'
                    }`}
                  >
                    {wm.word}
                  </span>
                ))}
              </div>

              {spokenTranscript && (
                <p className="text-xs text-slate-400">
                  <span className="text-slate-500">Recognized speech: </span>
                  <span className="italic text-slate-300">"{spokenTranscript}"</span>
                </p>
              )}
            </div>
          )}

          {errorNotice && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              {errorNotice}
            </div>
          )}

          {/* Microphone Recording Trigger */}
          <div className="pt-2 text-center space-y-2">
            <button
              onClick={toggleMic}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm shadow-xl transition-all ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30 shadow-red-500/40'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/25'
              }`}
            >
              <Mic className={`w-5 h-5 ${isListening ? 'animate-bounce' : ''}`} />
              <span>{isListening ? 'Listening in German... Click to Stop' : 'Click to Speak & Test Pronunciation'}</span>
            </button>
            <p className="text-[11px] text-slate-400">
              Speak clearly in standard German (Hochdeutsch) into your microphone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
