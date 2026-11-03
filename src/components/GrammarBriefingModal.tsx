import React from 'react';
import {
  BookOpen,
  Volume2,
  X,
  Lightbulb,
  ShieldAlert,
  ArrowRight,
  GraduationCap,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Scenario } from '../types';
import { GermanSpeechSynthesizer } from '../utils/speechUtils';

interface GrammarBriefingModalProps {
  scenario: Scenario | null;
  isOpen: boolean;
  onClose: () => void;
  onStartScenario: (scenario: Scenario) => void;
  onOpenGrammarAcademy: (level: string) => void;
  isSlowAudio: boolean;
}

export const GrammarBriefingModal: React.FC<GrammarBriefingModalProps> = ({
  scenario,
  isOpen,
  onClose,
  onStartScenario,
  onOpenGrammarAcademy,
  isSlowAudio,
}) => {
  if (!isOpen || !scenario) return null;

  const synth = GermanSpeechSynthesizer.getInstance();

  // Curated scenario grammar blueprints
  const getGrammarBlueprint = (sc: Scenario) => {
    switch (sc.id) {
      case 'a1-bakery':
        return {
          coreRule: 'Polite Ordering with Konjunktiv II & Akkusativ Objects',
          blueprint: 'Position 1 (Subject / Greeting) → Position 2 (hätte gerne / möchte) → Object in Akkusativ',
          explanation: 'In German bakeries, do not translate "Can I have...?" literally ("Kann ich haben?"). Instead, use "Ich hätte gerne..." (I would like to have). Note that masculine items shift in Akkusativ: der Kaffee → einen Kaffee.',
          examples: [
            { de: 'Ich hätte gerne zwei Brötchen und eine Brezel, bitte.', en: 'I would like two rolls and a pretzel, please.', note: 'Polite request with hätte gerne' },
            { de: 'Einen großen Cappuccino zum Mitnehmen, bitte.', en: 'A large cappuccino to take away, please.', note: 'Masculine Akkusativ: der Cappuccino → einen Cappuccino' },
          ],
          pitfall: 'Never say "Kann ich haben ein Kaffee". Use "Ich hätte gerne einen Kaffee".',
        };
      case 'a1-train-ticket':
        return {
          coreRule: 'Masculine Direct Objects in Akkusativ (der → den / einen)',
          blueprint: 'Subject + Verb + [einen / den + Masculine Noun] + Directional Preposition (nach + City)',
          explanation: 'When buying tickets, the ticket is the direct object (Akkusativ). "Die Fahrkarte" (fem) stays "eine", but "der Fahrschein" (masc) shifts to "einen Fahrschein". Cities take "nach": "nach München".',
          examples: [
            { de: 'Ich brauche eine Fahrkarte nach München, einfach bitte.', en: 'I need a ticket to Munich, one-way please.', note: 'Direction with "nach"' },
            { de: 'Fährt dieser Zug direkt oder muss ich umsteigen?', en: 'Does this train go directly or must I transfer?', note: 'Modal verb + infinitive' },
          ],
          pitfall: 'Don\'t say "zu München". In German, traveling to cities or countries without article uses "nach München".',
        };
      case 'a2-restaurant':
        return {
          coreRule: 'Dativ Indirect Objects & Separable Verbs',
          blueprint: 'Verb in Position 2 + Dativ pronoun (uns/mir) + Separable prefix at the very end',
          explanation: 'When asking for the check or recommendations, the receiver is Dativ: "Bringen Sie uns die Rechnung" (Bring to us the bill). When splitting the bill, use the separable construction: "getrennt zahlen".',
          examples: [
            { de: 'Könnten Sie uns bitte die Speisekarte bringen?', en: 'Could you please bring us the menu?', note: 'Dativ pronoun "uns" (to us)' },
            { de: 'Wir möchten bitte getrennt zahlen.', en: 'We would like to pay separately, please.', note: 'Modal verb möchten + infinitive at end' },
          ],
          pitfall: 'In Germany, service staff expect you to say "Zusammen oder getrennt?" (Together or split?). Split is standard!',
        };
      case 'a2-doctor':
        return {
          coreRule: 'Bodily Ailments with Dativ (Mir tut der... weh)',
          blueprint: 'Dativ Personal Pronoun (Mir / Ihm) + tut + [Singular Body Part] + weh',
          explanation: 'German does NOT say "I have a sore throat". Instead, the body part acts as subject and affects you in Dativ: "Mir tut der Hals weh" (To me hurts the neck) or "Ich habe Halsschmerzen".',
          examples: [
            { de: 'Mir tut der Hals seit drei Tagen sehr weh.', en: 'My throat has been hurting for three days.', note: 'Dativ "mir" + verb "weh tun"' },
            { de: 'Können Sie mir eine Krankschreibung für die Arbeit ausstellen?', en: 'Can you issue me a sick note for work?', note: 'Modal verb + infinitive' },
          ],
          pitfall: 'Don\'t say "Mein Hals schmerzt mich". The natural native phrasing is "Mir tut der Hals weh".',
        };
      case 'b1-apartment-viewing':
        return {
          coreRule: 'Two-Way Prepositions (Wechselpräpositionen) & Subordinate Clauses (weil)',
          blueprint: 'Main Clause + , weil (because) + Subject + ... + Verb kicked to the end',
          explanation: 'When discussing rental properties, prepositions like "in" take Dativ for location ("in der Wohnung", "im ersten Stock"). Reasons with "weil" kick the conjugated verb to the end of the clause.',
          examples: [
            { de: 'Sind die Heizkosten bereits in der Warmmiete enthalten?', en: 'Are heating costs already included in the warm rent?', note: 'Static location in Dativ: in der Warmmiete' },
            { de: 'Ich suche eine neue Wohnung, weil meine jetzige zu laut ist.', en: 'I am looking for a new flat because my current one is too loud.', note: 'Verb-kick: "ist" at the end after "weil"' },
          ],
          pitfall: 'Remember that "Kaution" (security deposit) and "Warmmiete" (rent with heating) are distinct in German lease law.',
        };
      case 'b1-train-delay':
        return {
          coreRule: 'Subordinate Conjunctions (weil, da, obwohl) & Passenger Rights',
          blueprint: 'Subordinate clause kicks verb to end: "...weil mein Anschlusszug ausgefallen ist."',
          explanation: 'When explaining why you missed a connection, the past auxiliary "ist" or modal "muss" must go to the very end of the subordinate clause.',
          examples: [
            { de: 'Mein Zug hatte 45 Minuten Verspätung, sodass ich den Anschluss verpasst habe.', en: 'My train had 45 minutes delay, so that I missed the connection.', note: 'Consecutive connector sodass' },
            { de: 'Ist die Zugbindung für mein Sparpreis-Ticket jetzt aufgehoben?', en: 'Is the ticket restriction for my discount ticket now lifted?', note: 'Passive state construction' },
          ],
          pitfall: 'Do NOT say "weil mein Zug ist verspätet". The verb goes to the end: "weil mein Zug Verspätung hatte".',
        };
      case 'b2-job-interview':
        return {
          coreRule: 'Konjunktiv II for Professional Fluency & Two-Part Connectors',
          blueprint: 'Hätte / Wäre / Würde + Infinitiv for diplomatic, confident tone',
          explanation: 'In German job interviews, avoid blunt or passive formulations. Use two-part connectors (*sowohl ... als auch*, *nicht nur ... sondern auch*) to structure your experience convincingly.',
          examples: [
            { de: 'Ich bringe sowohl mehrjährige Führungserfahrung als auch technische Expertise mit.', en: 'I bring both multiple years of leadership experience and technical expertise.', note: 'Two-part connector sowohl... als auch' },
            { de: 'Gerne würde ich mein Wissen in diesem innovativen Umfeld einbringen.', en: 'I would gladly contribute my knowledge in this innovative environment.', note: 'Konjunktiv II: würde einbringen' },
          ],
          pitfall: 'German CVs and interviews value factual competence over exaggerated self-praise.',
        };
      case 'c1-ai-ethics-panel':
        return {
          coreRule: 'Modal Particles, Nominal Style (Nominalstil) & Multi-Clause Connectors',
          blueprint: 'Discourse Marker (Wenngleich / Infolgedessen / Nichtsdestotrotz) + Complex Clauses',
          explanation: 'At C1, German shifts into the "Nominalstil" (using noun compounds rather than verb chains) and deploys modal particles (*doch, mal, halt, eben, wohl*) to regulate rhetorical temperature.',
          examples: [
            { de: 'Wenngleich erhebliche Bedenken bestehen, ist dies nichtsdestotrotz ein technologischer Meilenstein.', en: 'Even though substantial concerns exist, this is nonetheless a technological milestone.', note: 'High-register discourse markers' },
            { de: 'Da muss man doch eine klare Grenze zwischen Assistenz und Entscheidungskompetenz ziehen.', en: 'Surely one must draw a clear line between assistance and decision competence.', note: 'Modal particle "doch"' },
          ],
          pitfall: 'At C1 level, avoid simplistic coordination (und, aber, weil). Use sophisticated connectors like "infolgedessen", "wenngleich", and "nichtsdestotrotz".',
        };
      default:
        return {
          coreRule: sc.grammarFocus || 'Key Sentence Structures & Word Order',
          blueprint: 'Position 1 (Topic) → Position 2 (Conjugated Verb) → Objects & Modifiers',
          explanation: sc.englishSpeakerTip || 'Pay attention to verb position and correct noun cases.',
          examples: [
            { de: sc.turns[0]?.suggestedPhrases[0]?.de || 'Guten Tag!', en: sc.turns[0]?.suggestedPhrases[0]?.en || 'Good day!', note: 'Key opening phrase' },
          ],
          pitfall: 'Keep an eye on noun gender (der/die/das) and the Verb-Second rule.',
        };
    }
  };

  const blueprint = getGrammarBlueprint(scenario);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20 flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Pre-Practice Grammar Briefing</span>
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700">
              Level {scenario.level}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Grammar Tutorial: {scenario.title}
          </h2>
          <p className="text-xs text-slate-300">
            Study these grammar mechanics before stepping into the conversational scenario.
          </p>
        </div>

        {/* Core Grammar Rule */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Target Grammar Pattern:</span>
          </span>
          <h3 className="text-base font-extrabold text-white">
            {blueprint.coreRule}
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {blueprint.explanation}
          </p>

          <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 mt-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Sentence Blueprint:</span>
            <p className="text-xs font-mono text-emerald-400 font-semibold">{blueprint.blueprint}</p>
          </div>
        </div>

        {/* English Speaker Trap Warning */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 space-y-1.5">
          <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>English Speaker Common Mistake:</span>
          </span>
          <p className="text-xs text-red-200 leading-relaxed">
            {blueprint.pitfall}
          </p>
        </div>

        {/* Key Model Sentences with Audio */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Model Sentences for this Scenario (Listen & Pronounce):
          </span>
          <div className="space-y-2">
            {blueprint.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">"{ex.de}"</p>
                  <p className="text-[11px] text-slate-400 italic">"{ex.en}"</p>
                  {ex.note && <span className="text-[10px] text-amber-400 block font-mono">{ex.note}</span>}
                </div>
                <button
                  onClick={() => synth.speak(ex.de, undefined, isSlowAudio)}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors shrink-0"
                  title="Listen in German"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onClose();
              onOpenGrammarAcademy(scenario.level);
            }}
            className="text-xs text-slate-400 hover:text-amber-300 font-medium transition-colors"
          >
            ← Open Full Unit {scenario.level} Grammar Masterclass
          </button>

          <button
            onClick={() => {
              onClose();
              onStartScenario(scenario);
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Ready! Start Dialogue Practice</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
