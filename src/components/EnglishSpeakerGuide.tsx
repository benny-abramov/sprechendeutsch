import React, { useState } from 'react';
import {
  ShieldAlert,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Volume2,
  Check,
  X,
  Layers,
  Lightbulb,
  Zap
} from 'lucide-react';
import { GermanSpeechSynthesizer } from '../utils/speechUtils';

interface EnglishSpeakerGuideProps {
  isSlowAudio: boolean;
}

export const EnglishSpeakerGuide: React.FC<EnglishSpeakerGuideProps> = ({ isSlowAudio }) => {
  const [activeSection, setActiveSection] = useState<'word-order' | 'false-friends' | 'genders' | 'particles'>('word-order');
  const synth = GermanSpeechSynthesizer.getInstance();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/30 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-1">
          <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20">
            Targeted for English Native Speakers
          </span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          The English Speaker’s Survival & Fluency Guide
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          German and English are Germanic cousins, but key structural divergence points cause 90% of English-speaker errors. Master these four pillars to sound instantly natural.
        </p>

        {/* Section Selector */}
        <div className="flex flex-wrap gap-2 mt-5">
          {[
            { id: 'word-order', label: '1. Word Order & The Verb-Kick' },
            { id: 'false-friends', label: '2. The "False Friends" Hazard Zone' },
            { id: 'genders', label: '3. Der / Die / Das Cheat Codes' },
            { id: 'particles', label: '4. Modal Particles (The Fluency Secret)' },
          ].map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeSection === sec.id
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-950/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= 1. WORD ORDER & THE VERB-KICK ================= */}
      {activeSection === 'word-order' && (
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Rule 1: The Verb is ALWAYS in Position 2 in Main Clauses (V2 Rule)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              In English, if you start a sentence with a time or place adverb, the subject stays before the verb: <em>"Today I go to the cinema."</em>
              In German, the conjugated verb is obsessively anchored in the <strong>second position</strong>. If you begin with "Heute", the verb must immediately follow!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5">
                  <X className="w-4 h-4" />
                  <span>The English Literal Trap (INCORRECT in German):</span>
                </span>
                <p className="font-mono text-sm text-red-300">Heute ich gehe ins Kino. ❌</p>
                <p className="text-xs text-slate-400">English brains instinctively put "ich" before "gehe".</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4" />
                  <span>Native German V2 Order (CORRECT):</span>
                </span>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-emerald-300 font-bold">Heute gehe ich ins Kino. ✅</p>
                  <button
                    onClick={() => synth.speak('Heute gehe ich ins Kino.', undefined, isSlowAudio)}
                    className="p-1 rounded text-emerald-400 hover:text-white"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-400">Position 1 = Heute • Position 2 = GEHE • Position 3 = ich.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-amber-400" />
              <span>Rule 2: The "Verb-Kick" in Subordinate Clauses (Nebensätze)</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              When using conjunctions like <strong className="text-amber-300">weil (because), dass (that), obwohl (although), wenn (if/when), damit (so that)</strong>, German kicks the conjugated verb all the way to the <strong>very end of the sentence</strong>!
            </p>

            <div className="space-y-3 pt-1">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-400 font-mono font-bold">weil</span>: "Ich lerne Deutsch, weil ich in Berlin arbeiten <strong className="text-emerald-400 underline">möchte</strong>."
                  <span className="text-slate-400 block text-[11px] mt-0.5">(Because I want to work in Berlin – 'möchte' kicked to the end!)</span>
                </div>
                <button
                  onClick={() => synth.speak('Ich lerne Deutsch, weil ich in Berlin arbeiten möchte.', undefined, isSlowAudio)}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-amber-400 font-mono font-bold">obwohl</span>: "Wir gehen spazieren, obwohl es stark <strong className="text-emerald-400 underline">regnet</strong>."
                  <span className="text-slate-400 block text-[11px] mt-0.5">(We go for a walk, although it is raining heavily – 'regnet' kicked to the end!)</span>
                </div>
                <button
                  onClick={() => synth.speak('Wir gehen spazieren, obwohl es stark regnet.', undefined, isSlowAudio)}
                  className="p-1.5 rounded bg-slate-800 text-slate-300 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. FALSE FRIENDS ================= */}
      {activeSection === 'false-friends' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <h3 className="text-base font-extrabold text-white">The "False Friends" Hazard Zone (Falsche Freunde)</h3>
          </div>
          <p className="text-xs text-slate-300">
            These German words sound or look identical to English words, but have wildly different (and sometimes embarrassing) meanings!
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {[
              {
                de: 'das Gift',
                enSound: 'gift',
                actualDeMeaning: 'POISON / VENOM',
                realEnglishGift: 'das Geschenk',
                alert: 'Never say you brought a German host "ein Gift"!',
              },
              {
                de: 'der Chef',
                enSound: 'chef',
                actualDeMeaning: 'BOSS / MANAGER',
                realEnglishGift: 'der Koch / Küchenchef',
                alert: 'In German offices, "der Chef" is your supervisor, not the cook.',
              },
              {
                de: 'bekommen',
                enSound: 'become',
                actualDeMeaning: 'TO RECEIVE / TO GET',
                realEnglishGift: 'werden (to become)',
                alert: '"Ich bekomme ein Kind" means "I am having a baby", not "becoming a child"!',
              },
              {
                de: 'aktuell',
                enSound: 'actual',
                actualDeMeaning: 'CURRENT / UP TO DATE',
                realEnglishGift: 'tatsächlich / wirklich',
                alert: '"Die aktuelle Version" means latest version, not actual version.',
              },
              {
                de: 'spenden',
                enSound: 'spend',
                actualDeMeaning: 'TO DONATE',
                realEnglishGift: 'Geld ausgeben (to spend)',
                alert: '"Ich spende Geld" means you gave to charity, not bought shopping!',
              },
              {
                de: 'brav',
                enSound: 'brave',
                actualDeMeaning: 'WELL-BEHAVED / OBEDIENT',
                realEnglishGift: 'mutig / tapfer',
                alert: 'Calling a German warrior "brav" implies he followed house rules like a good boy.',
              },
              {
                de: 'die Rente',
                enSound: 'rent',
                actualDeMeaning: 'PENSION / RETIREMENT',
                realEnglishGift: 'die Miete (housing rent)',
                alert: '"In Rente gehen" means retiring from your job.',
              },
              {
                de: 'der Rat',
                enSound: 'rat',
                actualDeMeaning: 'ADVICE / COUNCIL',
                realEnglishGift: 'die Ratte (rodent)',
                alert: 'Asking for "ein guter Rat" means you want sound guidance.',
              },
              {
                de: 'der Mist',
                enSound: 'mist',
                actualDeMeaning: 'MANURE / DARN IT / RUBBISH',
                realEnglishGift: 'der Nebel (weather mist)',
                alert: 'Morning mist is "Nebel". Saying "So ein Mist!" means "What a load of crap!".',
              },
            ].map((ff, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-base text-amber-400">{ff.de}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-300 border border-red-500/30">
                    ≠ English "{ff.enSound}"
                  </span>
                </div>
                <div className="text-xs space-y-1">
                  <p className="text-white font-semibold">
                    Actually means: <span className="text-emerald-400">{ff.actualDeMeaning}</span>
                  </p>
                  <p className="text-slate-400">
                    Real English "{ff.enSound}": <span className="text-slate-200">{ff.realEnglishGift}</span>
                  </p>
                  <p className="text-[11px] text-amber-300/80 italic pt-1">{ff.alert}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= 3. GENDER CODES ================= */}
      {activeSection === 'genders' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">Der / Die / Das Cheat Codes</h3>
          </div>
          <p className="text-xs text-slate-300">
            Never memorize genders blindly! In German, noun <strong>word endings (suffixes)</strong> dictate grammatical gender with up to 100% mathematical certainty.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {/* DIE */}
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-rose-400">DIE (Feminine)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300">~46% of nouns</span>
              </div>
              <p className="text-xs text-slate-300">100% Guaranteed feminine endings:</p>
              <ul className="text-xs space-y-1.5 text-slate-200">
                <li><strong className="text-rose-400">-ung</strong>: die Zeitung, die Wohnung, die Hoffnung</li>
                <li><strong className="text-rose-400">-heit / -keit</strong>: die Freiheit, die Möglichkeit</li>
                <li><strong className="text-rose-400">-schaft</strong>: die Freundschaft, die Wirtschaft</li>
                <li><strong className="text-rose-400">-tät / -tion</strong>: die Universität, die Nation</li>
                <li><strong className="text-rose-400">-ei</strong>: die Bäckerei, die Datei</li>
              </ul>
            </div>

            {/* DAS */}
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-emerald-400">DAS (Neuter)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">~20% of nouns</span>
              </div>
              <p className="text-xs text-slate-300">100% Guaranteed neuter endings:</p>
              <ul className="text-xs space-y-1.5 text-slate-200">
                <li><strong className="text-emerald-400">-chen / -lein</strong> (diminutives): das Mädchen, das Brötchen</li>
                <li><strong className="text-emerald-400">-ment</strong>: das Dokument, das Experiment</li>
                <li><strong className="text-emerald-400">-um</strong>: das Museum, das Zentrum</li>
                <li><strong className="text-emerald-400">Infinitives as nouns</strong>: das Essen, das Leben, das Trinken</li>
                <li><strong className="text-emerald-400">English loanwords ending in -ing</strong>: das Meeting, das Training</li>
              </ul>
            </div>

            {/* DER */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-blue-400">DER (Masculine)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">~34% of nouns</span>
              </div>
              <p className="text-xs text-slate-300">Reliable masculine patterns:</p>
              <ul className="text-xs space-y-1.5 text-slate-200">
                <li><strong className="text-blue-400">-ling</strong>: der Schmetterling, der Lehrling</li>
                <li><strong className="text-blue-400">-or / -ist</strong>: der Motor, der Optimist</li>
                <li><strong className="text-blue-400">-er</strong> (agents/occupations): der Bäcker, der Lehrer</li>
                <li><strong className="text-blue-400">Days, months, seasons</strong>: der Montag, der Juli, der Sommer</li>
                <li><strong className="text-blue-400">Weather phenomena</strong>: der Regen, der Schnee, der Wind</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ================= 4. MODAL PARTICLES ================= */}
      {activeSection === 'particles' && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-extrabold text-white">The Secret of German Modal Particles (Modalpartikeln)</h3>
          </div>
          <p className="text-xs text-slate-300 max-w-4xl leading-relaxed">
            Foreigners often speak grammatically perfect German that sounds cold or robotic. Native Germans sprinkle tiny, untranslatable mood words called <em>Modalpartikeln</em> into nearly every sentence to express warmth, obviousness, or gentle persuasion.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-amber-400">doch</span>
                <button
                  onClick={() => synth.speak('Das weißt du doch!', undefined, isSlowAudio)}
                  className="p-1 rounded text-slate-400 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white font-semibold">"Das weißt du doch!"</p>
              <p className="text-xs text-slate-300">
                English translation: <em>"You know that, surely! / But you already know that!"</em>
              </p>
              <p className="text-[11px] text-slate-400">
                Use <strong>doch</strong> to remind someone of a shared fact, or to urge someone warmly ("Komm doch rein!" = "Do come on in!").
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-amber-400">mal</span>
                <button
                  onClick={() => synth.speak('Schau mal hier kurz.', undefined, isSlowAudio)}
                  className="p-1 rounded text-slate-400 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white font-semibold">"Schau mal hier kurz."</p>
              <p className="text-xs text-slate-300">
                English translation: <em>"Just take a quick look here."</em>
              </p>
              <p className="text-[11px] text-slate-400">
                Without <strong>mal</strong>, German imperatives sound like military orders ("Schau hier!"). Adding <strong>mal</strong> softens commands into friendly invitations.
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-amber-400">halt / eben</span>
                <button
                  onClick={() => synth.speak('So ist das Leben halt.', undefined, isSlowAudio)}
                  className="p-1 rounded text-slate-400 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white font-semibold">"So ist das Leben halt."</p>
              <p className="text-xs text-slate-300">
                English translation: <em>"That’s just the way life is (c'est la vie)."</em>
              </p>
              <p className="text-[11px] text-slate-400">
                Indicates calm philosophical acceptance of an unchangeable situation (e.g. train delays, bad weather).
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-base text-amber-400">ja</span>
                <button
                  onClick={() => synth.speak('Das ist ja eine Überraschung!', undefined, isSlowAudio)}
                  className="p-1 rounded text-slate-400 hover:text-amber-400"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-white font-semibold">"Das ist ja eine tolle Überraschung!"</p>
              <p className="text-xs text-slate-300">
                English translation: <em>"Well that really is a wonderful surprise!"</em>
              </p>
              <p className="text-[11px] text-slate-400">
                Used inside the middle of a sentence (not as "yes" at the start) to signal genuine surprise or shared obviousness.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
