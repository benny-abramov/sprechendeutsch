import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Volume2,
  Send,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Award,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { Scenario, ScenarioTurn, ChatMessage } from '../types';
import { GermanSpeechSynthesizer, createGermanSpeechRecognizer, SpeechRecognitionHandler } from '../utils/speechUtils';
import { compareSpokenToTarget, WordMatch } from '../utils/levenshtein';

interface ScenarioPlayerProps {
  scenario: Scenario;
  isSlowAudio: boolean;
  onCompleteScenario: (scenarioId: string, earnedXp: number) => void;
  onBackToScenarios: () => void;
}

export const ScenarioPlayer: React.FC<ScenarioPlayerProps> = ({
  scenario,
  isSlowAudio,
  onCompleteScenario,
  onBackToScenarios,
}) => {
  const [currentTurnIndex, setCurrentTurnIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [typedInput, setTypedInput] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showSuggestedReplies, setShowSuggestedReplies] = useState(true);
  const [selectedPracticePhrase, setSelectedPracticePhrase] = useState<string | null>(null);
  const [lastSpeechEvaluation, setLastSpeechEvaluation] = useState<{
    score: number;
    wordMatches: WordMatch[];
    feedback: string;
    englishWarning?: string;
  } | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [turnCompleted, setTurnCompleted] = useState(false);
  const [scenarioFinished, setScenarioFinished] = useState(false);
  const [showGrammarBriefing, setShowGrammarBriefing] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const recognizerRef = useRef<SpeechRecognitionHandler | null>(null);
  const currentTurn: ScenarioTurn = scenario.turns[currentTurnIndex] || scenario.turns[0];
  const synth = GermanSpeechSynthesizer.getInstance();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize first turn
  useEffect(() => {
    setCurrentTurnIndex(0);
    setScenarioFinished(false);
    setTurnCompleted(false);
    setLastSpeechEvaluation(null);

    const initialMsg: ChatMessage = {
      id: `partner-${Date.now()}`,
      sender: 'partner',
      textDe: scenario.turns[0].partnerPromptDe,
      textEn: scenario.turns[0].partnerPromptEn,
      timestamp: Date.now(),
    };
    setMessages([initialMsg]);

    // Speak opening line automatically with a short gentle delay
    const timer = setTimeout(() => {
      synth.speak(scenario.turns[0].partnerPromptDe, undefined, isSlowAudio);
    }, 400);

    return () => clearTimeout(timer);
  }, [scenario.id]);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, lastSpeechEvaluation, isEvaluating]);

  // Set up speech recognition
  useEffect(() => {
    recognizerRef.current = createGermanSpeechRecognizer({
      onStart: () => {
        setIsListening(true);
        setErrorNotice(null);
      },
      onResult: (result) => {
        setTranscript(result.transcript);
        if (result.isFinal) {
          setIsListening(false);
          handleProcessUserSpeech(result.transcript);
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
  }, [currentTurnIndex, selectedPracticePhrase]);

  // Toggle voice recognition
  const toggleSpeechRecognition = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      setErrorNotice(null);
      setTranscript('');
      recognizerRef.current?.start();
    }
  };

  // Process user speech against expected target
  const handleProcessUserSpeech = async (spokenText: string) => {
    if (!spokenText.trim()) return;

    // Add user message to chat
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      textDe: spokenText,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsEvaluating(true);

    // Target comparison
    const targetPhrase = selectedPracticePhrase || currentTurn.suggestedPhrases[0].de;
    const localEval = compareSpokenToTarget(targetPhrase, spokenText);

    // Call server evaluation & dynamic roleplay response
    try {
      const evalRes = await fetch('/api/evaluate-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetText: targetPhrase,
          spokenText: spokenText,
          level: scenario.level,
        }),
      });

      const serverEval = await evalRes.json();
      const finalScore = serverEval.score || localEval.overallScore;

      setLastSpeechEvaluation({
        score: finalScore,
        wordMatches: localEval.wordMatches,
        feedback: serverEval.feedback || `Accuracy: ${finalScore}%. Good articulation!`,
        englishWarning: serverEval.englishSpeakerWarning || scenario.englishSpeakerTip,
      });

      setTurnCompleted(true);

      // Check if this was the last turn
      if (currentTurnIndex >= scenario.turns.length - 1) {
        setTimeout(() => {
          setScenarioFinished(true);
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
          onCompleteScenario(scenario.id, 50);
        }, 1200);
      }
    } catch (e) {
      console.error('Error evaluating speech:', e);
      setLastSpeechEvaluation({
        score: localEval.overallScore,
        wordMatches: localEval.wordMatches,
        feedback: `Phonetic accuracy: ${localEval.overallScore}%. Well done practicing!`,
        englishWarning: scenario.englishSpeakerTip,
      });
      setTurnCompleted(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Submit typed input
  const handleTypedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedInput.trim()) return;
    const text = typedInput.trim();
    setTypedInput('');
    handleProcessUserSpeech(text);
  };

  // Move to next turn
  const handleNextTurn = () => {
    if (currentTurnIndex < scenario.turns.length - 1) {
      const nextIndex = currentTurnIndex + 1;
      setCurrentTurnIndex(nextIndex);
      setTurnCompleted(false);
      setLastSpeechEvaluation(null);
      setSelectedPracticePhrase(null);
      setShowTranslation(false);

      const nextTurn = scenario.turns[nextIndex];
      const partnerMsg: ChatMessage = {
        id: `partner-${Date.now()}`,
        sender: 'partner',
        textDe: nextTurn.partnerPromptDe,
        textEn: nextTurn.partnerPromptEn,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, partnerMsg]);

      // Speak partner prompt
      synth.speak(nextTurn.partnerPromptDe, undefined, isSlowAudio);
    }
  };

  // Restart scenario
  const handleRestart = () => {
    setCurrentTurnIndex(0);
    setScenarioFinished(false);
    setTurnCompleted(false);
    setLastSpeechEvaluation(null);
    setSelectedPracticePhrase(null);
    setMessages([
      {
        id: `partner-${Date.now()}`,
        sender: 'partner',
        textDe: scenario.turns[0].partnerPromptDe,
        textEn: scenario.turns[0].partnerPromptEn,
        timestamp: Date.now(),
      },
    ]);
    synth.speak(scenario.turns[0].partnerPromptDe, undefined, isSlowAudio);
  };

  // Listen to a suggested phrase
  const playPhraseAudio = (phraseDe: string) => {
    setSelectedPracticePhrase(phraseDe);
    synth.speak(phraseDe, undefined, isSlowAudio);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-8.5rem)] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Scenario Top Bar */}
      <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToScenarios}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            ← Back
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">{scenario.partnerAvatar}</span>
              <h2 className="text-sm font-bold text-white">{scenario.title}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {scenario.level}
              </span>
            </div>
            <p className="text-xs text-slate-400">{scenario.location} • {scenario.partnerRole}</p>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono hidden sm:inline">
            Turn {currentTurnIndex + 1}/{scenario.turns.length}
          </span>
          <div className="flex gap-1">
            {scenario.turns.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i < currentTurnIndex
                    ? 'w-4 bg-emerald-500'
                    : i === currentTurnIndex
                    ? 'w-6 bg-amber-500'
                    : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Cultural & Grammar Context Ribbon */}
      <div className="bg-slate-800/40 border-b border-slate-800/80 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-300">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-slate-400">Mission:</span>
          <span className="font-medium text-slate-200">{currentTurn.expectedUserConceptEn}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGrammarBriefing(!showGrammarBriefing)}
            className={`flex items-center gap-1.5 text-xs font-black px-3 py-1.5 rounded-xl border transition-all shadow-sm ${
              showGrammarBriefing
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 border-amber-400'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showGrammarBriefing ? 'Close Grammar Tutorial' : '📖 Grammar Tutorial'}</span>
          </button>

          <button
            onClick={() => setShowTranslation(!showTranslation)}
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors"
          >
            {showTranslation ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
            <span>{showTranslation ? 'Hide English' : 'Show English'}</span>
          </button>
        </div>
      </div>

      {/* Expandable Grammar Briefing Drawer */}
      {showGrammarBriefing && (
        <div className="bg-slate-950/95 border-b border-amber-500/30 p-4 space-y-2 text-xs animate-fade-in shadow-inner">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Scenario Grammar Focus: {currentTurn.grammarFocus || scenario.grammarFocus}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Level {scenario.level}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-emerald-400 block">Grammar Pattern:</span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {currentTurn.grammarFocus || scenario.grammarFocus}
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-red-400 block">English Speaker Trap:</span>
              <p className="text-red-200 text-xs leading-relaxed">
                {scenario.englishSpeakerTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Messages Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-start gap-2 max-w-[85%]">
              {msg.sender === 'partner' && (
                <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg shrink-0 mt-1">
                  {scenario.partnerAvatar}
                </div>
              )}

              <div>
                <div
                  className={`p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none shadow-lg shadow-amber-500/10'
                      : 'bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/70 shadow-md'
                  }`}
                >
                  <p className="text-base font-semibold">{msg.textDe}</p>

                  {(showTranslation || msg.sender === 'user') && msg.textEn && (
                    <p className={`text-xs mt-1.5 pt-1.5 border-t ${msg.sender === 'user' ? 'border-amber-600/30 text-slate-900' : 'border-slate-700 text-slate-400'}`}>
                      {msg.textEn}
                    </p>
                  )}
                </div>

                {/* Audio replay button for partner message */}
                {msg.sender === 'partner' && (
                  <div className="flex items-center gap-2 mt-1 ml-1">
                    <button
                      onClick={() => synth.speak(msg.textDe, undefined, isSlowAudio)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition-colors"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Hear German</span>
                    </button>
                    {currentTurn.culturalNote && (
                      <span className="text-[11px] text-slate-400">
                        • {currentTurn.culturalNote}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Live speech transcription preview while user talks */}
        {isListening && (
          <div className="flex items-end justify-end">
            <div className="bg-amber-500/10 border border-amber-500/40 text-amber-200 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm animate-pulse flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>{transcript || 'Listening in German... Sprich jetzt!'}</span>
            </div>
          </div>
        )}

        {/* AI Speech Evaluation & Phonetic Breakdown Card */}
        {lastSpeechEvaluation && (
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-4 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    lastSpeechEvaluation.score >= 85
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : lastSpeechEvaluation.score >= 65
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {lastSpeechEvaluation.score}%
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Pronunciation & Fluency Evaluation</h4>
                  <p className="text-[11px] text-slate-400">{lastSpeechEvaluation.feedback}</p>
                </div>
              </div>

              {turnCompleted && !scenarioFinished && (
                <button
                  onClick={handleNextTurn}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Word-by-word visual phonetic match */}
            {lastSpeechEvaluation.wordMatches.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {lastSpeechEvaluation.wordMatches.map((wm, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-0.5 rounded font-mono font-medium ${
                      wm.status === 'correct'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : wm.status === 'near'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30 line-through'
                    }`}
                    title={wm.status === 'correct' ? 'Perfect match' : `Spoken: ${wm.matchedWith || 'missed'}`}
                  >
                    {wm.word}
                  </span>
                ))}
              </div>
            )}

            {/* English Speaker Trap Notice */}
            {lastSpeechEvaluation.englishWarning && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 flex items-start gap-2 text-xs text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-amber-300">English Speaker Trap: </span>
                  <span>{lastSpeechEvaluation.englishWarning}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Finished Scenario Celebration Screen */}
        {scenarioFinished && (
          <div className="bg-gradient-to-br from-amber-500/20 via-slate-800 to-slate-900 border border-amber-500/40 rounded-2xl p-6 text-center space-y-4 shadow-xl">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/30">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Szenario erfolgreich gemeistert!</h3>
              <p className="text-xs text-amber-300 font-medium mt-1">Scenario Successfully Completed • +50 XP Earned</p>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-2">
                You navigated authentic German dialogue with real-time speech recognition. Your conversational reflex and active vocabulary are growing!
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repeat Scenario</span>
              </button>
              <button
                onClick={onBackToScenarios}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-lg shadow-amber-500/20"
              >
                <span>Explore Next Scenario</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Responses & Speech Training Pills */}
      {!scenarioFinished && showSuggestedReplies && (
        <div className="bg-slate-950/70 border-t border-slate-800/90 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Native German Phrases to Say (Click audio to hear, then speak):</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {currentTurn.suggestedPhrases.map((phrase, idx) => (
              <button
                key={idx}
                onClick={() => playPhraseAudio(phrase.de)}
                className={`text-left p-2.5 rounded-xl border text-xs transition-all relative group ${
                  selectedPracticePhrase === phrase.de
                    ? 'bg-amber-500/15 border-amber-500/60 text-amber-100 ring-1 ring-amber-500/40'
                    : 'bg-slate-900 hover:bg-slate-800/80 border-slate-800 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <span className="font-semibold text-white group-hover:text-amber-300 transition-colors">
                    {phrase.de}
                  </span>
                  <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 shrink-0 mt-0.5" />
                </div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                  {phrase.en}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Speech Recognition & Input Bar */}
      {!scenarioFinished && (
        <div className="bg-slate-950 p-4 border-t border-slate-800">
          {errorNotice && (
            <div className="mb-2 p-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-center justify-between">
              <span>{errorNotice}</span>
              <button onClick={() => setErrorNotice(null)} className="text-red-400 hover:text-white ml-2">✕</button>
            </div>
          )}

          <div className="flex items-center gap-3">
            {/* Big Speech Recognition Button */}
            <button
              onClick={toggleSpeechRecognition}
              className={`relative flex items-center justify-center w-14 h-14 rounded-2xl transition-all shadow-lg shrink-0 ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-500/30 shadow-red-500/40'
                  : 'bg-gradient-to-br from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20'
              }`}
              title={isListening ? 'Listening... click to stop' : 'Click and speak German into your microphone'}
            >
              {isListening ? (
                <>
                  <Mic className="w-6 h-6 animate-bounce" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-400 animate-ping" />
                </>
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>

            {/* Typed fallback input form */}
            <form onSubmit={handleTypedSubmit} className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={typedInput}
                onChange={(e) => setTypedInput(e.target.value)}
                placeholder={
                  isListening
                    ? 'Listening... speak clearly in German!'
                    : 'Or type your German response here and hit enter...'
                }
                className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <button
                type="submit"
                disabled={!typedInput.trim()}
                className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-400 transition-colors"
                title="Send typed message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
          <p className="text-[11px] text-slate-400 text-center mt-2">
            Tip: Click a suggested German phrase above to hear authentic native pronunciation, then click the mic and speak!
          </p>
        </div>
      )}
    </div>
  );
};
