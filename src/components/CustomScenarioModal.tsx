import React, { useState } from 'react';
import { Sparkles, X, Wand2, Compass } from 'lucide-react';
import { Scenario, CEFRLevel } from '../types';

interface CustomScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartCustomScenario: (scenario: Scenario) => void;
}

export const CustomScenarioModal: React.FC<CustomScenarioModalProps> = ({
  isOpen,
  onClose,
  onStartCustomScenario,
}) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<CEFRLevel>('B1');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    { title: 'Biergarten in München', level: 'A2' as CEFRLevel, topic: 'Ordering pretzels, Maß beer, and Obazda in a traditional Bavarian beer garden' },
    { title: 'KFZ-Werkstatt in Stuttgart', level: 'B1' as CEFRLevel, topic: 'Explaining strange brake noise and asking for a repair cost estimate for a car' },
    { title: 'Berliner Späti am Abend', level: 'A1' as CEFRLevel, topic: 'Buying drinks and snacks at a late-night Berlin kiosk' },
    { title: 'Startup-Pitch in Frankfurt', level: 'C1' as CEFRLevel, topic: 'Pitching an AI green-energy startup to German venture capital investors' },
  ];

  const handleGenerate = async (presetTopic?: string, presetLevel?: CEFRLevel) => {
    const selectedTopic = presetTopic || topic;
    const selectedLevel = presetLevel || level;

    if (!selectedTopic.trim()) {
      setErrorNotice('Please enter a scenario topic or select one of the presets.');
      return;
    }

    setIsGenerating(true);
    setErrorNotice(null);

    try {
      const res = await fetch('/api/generate-scenario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          level: selectedLevel,
        }),
      });

      const data = await res.json();

      // Format as full Scenario object
      const generatedScenario: Scenario = {
        id: data.id || `custom-${Date.now()}`,
        title: data.title || selectedTopic,
        englishTitle: data.englishTitle || selectedTopic,
        level: selectedLevel,
        category: 'daily',
        icon: 'Sparkles',
        location: data.setting || 'Berlin / DACH Region',
        description: data.setting || `Custom conversation generated for ${selectedTopic}`,
        userRole: data.userRole || 'Learner practicing German',
        partnerRole: data.partnerRole || 'German conversational partner',
        partnerAvatar: '🤖',
        vocabularyGoals: data.vocabularyGoal || ['die Aussprache', 'die Höflichkeit', 'das Gespräch'],
        grammarFocus: data.keyGrammarFocus || 'Natural conversational fluency',
        englishSpeakerTip: data.culturalTip || 'Keep an eye on V2 word order and clear vowel sounds.',
        turns: [
          {
            id: 'turn-1',
            partnerPromptDe: data.initialMessageDe || 'Hallo! Wie kann ich Ihnen heute weiterhelfen?',
            partnerPromptEn: data.initialMessageEn || 'Hello! How can I help you today?',
            expectedUserConceptDe: 'Freundlich antworten und Anliegen schildern',
            expectedUserConceptEn: 'Greet and explain your request',
            suggestedPhrases: [
              { de: 'Guten Tag! Ich hätte eine Frage dazu.', en: 'Good day! I would have a question about that.' },
              { de: 'Hallo! Könnten Sie mir bitte kurz behilflich sein?', en: 'Hello! Could you please briefly assist me?' },
              { de: 'Vielen Dank, ich suche nach weiteren Informationen.', en: 'Thank you very much, I am looking for further information.' },
            ],
            culturalNote: data.culturalTip || 'Polite greeting before jumping to business is standard in German.',
          },
        ],
      };

      onStartCustomScenario(generatedScenario);
      onClose();
    } catch (e: any) {
      console.error('Failed to generate scenario:', e);
      setErrorNotice('Could not generate scenario. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Create Custom Conversational Scenario</h3>
            <p className="text-xs text-slate-400">Powered by Gemini AI • Real-life German scenarios for any situation</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Target CEFR Difficulty Level:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(['A1', 'A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setLevel(lvl)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    level === lvl
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              What daily scenario would you like to practice?
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Inquiring about a rental bicycle in Hamburg, ordering food in Vienna, or discussing renewable energy..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Presets */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 block mb-2">Or choose a quick realistic preset:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setTopic(p.topic);
                    setLevel(p.level);
                  }}
                  className="text-left p-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 text-xs transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white group-hover:text-amber-300">{p.title}</span>
                    <span className="text-[10px] font-bold px-1.5 rounded bg-slate-800 text-amber-400">{p.level}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.topic}</p>
                </button>
              ))}
            </div>
          </div>

          {errorNotice && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
              {errorNotice}
            </div>
          )}

          <button
            onClick={() => handleGenerate()}
            disabled={isGenerating || !topic.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Wand2 className="w-4 h-4" />
            <span>{isGenerating ? 'Generating Scenario with Gemini...' : 'Generate & Start Roleplay'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
