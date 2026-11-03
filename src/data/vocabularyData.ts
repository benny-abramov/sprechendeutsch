import { VocabWord, CEFRLevel } from '../types';
import { A1_FULL_VOCABULARY } from './a1CoreVocab';
import { A2_FULL_VOCABULARY } from './a2CoreVocab';
import { B1_FULL_VOCABULARY } from './b1CoreVocab';
import { B2_FULL_VOCABULARY } from './b2CoreVocab';
import { C1_FULL_VOCABULARY } from './c1CoreVocab';

export interface CEFRMilestoneInfo {
  level: CEFRLevel;
  title: string;
  wordCountTarget: string;
  exactTargetNumber: number;
  description: string;
  pedagogicalFocus: string;
  advancedRequirementsSummary?: string[];
  samplePhrases: string[];
}

export interface CurriculumVocabularyStats {
  totalDirectWords: number;
  compoundMultiplierAccessible: number;
  passiveComprehensionTarget: number;
  c1TargetRange: string;
  levelMilestones: {
    level: CEFRLevel;
    title: string;
    directLessonWords: number;
    cumulativeActiveWords: number;
    cumulativePassiveWords: number;
    scenarioHighlights: string[];
    canDoStatement: string;
  }[];
}

export const CURRICULUM_LEXICON_STATS: CurriculumVocabularyStats = {
  totalDirectWords: 1250,
  compoundMultiplierAccessible: 4500,
  passiveComprehensionTarget: 8500,
  c1TargetRange: '8,000 – 10,000 words',
  levelMilestones: [
    {
      level: 'A1',
      title: 'Durchstarter (Breakthrough)',
      directLessonWords: 350,
      cumulativeActiveWords: 350,
      cumulativePassiveWords: 800,
      scenarioHighlights: ['Beim Bäcker (Bakery ordering)', 'Am Fahrkartenschalter (Train tickets)', 'Erstes Kennenlernen'],
      canDoStatement: 'Order bread & coffee, purchase regional DB tickets, ask prices, state your name, origin, and time.'
    },
    {
      level: 'A2',
      title: 'Alltagsheld (Waystage)',
      directLessonWords: 450,
      cumulativeActiveWords: 800,
      cumulativePassiveWords: 1800,
      scenarioHighlights: ['Im Restaurant / Biergarten', 'Beim Arzt in der Praxis', 'Wegbeschreibung in der Stadt'],
      canDoStatement: 'Navigate restaurant menus & bill splitting, describe bodily symptoms to doctors, ask and understand directions.'
    },
    {
      level: 'B1',
      title: 'Freischwimmer (Threshold / Independent)',
      directLessonWords: 700,
      cumulativeActiveWords: 1500,
      cumulativePassiveWords: 3200,
      scenarioHighlights: ['Wohnungsbesichtigung in München', 'Deutsche Bahn Zugausfall & Verspätung', 'Smalltalk auf WG-Party'],
      canDoStatement: 'Handle tenancy viewings, Warmmiete & Kaution, manage train disruptions, explain opinions using subordinate clauses (weil, obwohl).'
    },
    {
      level: 'B2',
      title: 'Wortgewandt (Vantage / Workplace)',
      directLessonWords: 1200,
      cumulativeActiveWords: 2700,
      cumulativePassiveWords: 5500,
      scenarioHighlights: ['Bewerbungsgespräch (Job Interview)', 'Termin beim Bürgeramt (Anmeldung)', 'Projektbesprechung'],
      canDoStatement: 'Lead job interviews, negotiate bureaucratic processes, resolve workplace priority disagreements using Konjunktiv II & connectors.'
    },
    {
      level: 'C1',
      title: 'Sprachprofi (Operational Mastery / Advanced)',
      directLessonWords: 2500,
      cumulativeActiveWords: 5200,
      cumulativePassiveWords: 8500,
      scenarioHighlights: ['Podiumsdiskussion: KI & Gesellschaft', 'Gehalts- & Konditionsverhandlung', 'Kultur- & Feierabendphilosophie'],
      canDoStatement: 'Deconstruct complex compound nouns on the fly, deploy subtle modal particles (doch, mal, halt), and debate complex philosophical/business topics effortlessly.'
    }
  ]
};

export const CEFR_ROADMAP: Record<CEFRLevel, CEFRMilestoneInfo> = {
  A1: {
    level: 'A1',
    title: 'Durchstarter (Breakthrough)',
    wordCountTarget: '600 – 1,000 words',
    exactTargetNumber: 800,
    description: 'Basic everyday survival expressions, numbers, greetings, ordering food, and immediate personal details.',
    pedagogicalFocus: 'Subject-Verb agreement, Nominativ & Akkusativ, V2 word order in main clauses.',
    samplePhrases: ['Ich heiße...', 'Ich hätte gern einen Kaffee.', 'Wie viel kostet das?']
  },
  A2: {
    level: 'A2',
    title: 'Alltagsheld (Waystage)',
    wordCountTarget: '1,500 – 2,000 words',
    exactTargetNumber: 1800,
    description: 'Routine interactions, basic shopping, family background, local geography, and employment.',
    pedagogicalFocus: 'Dativ case, separable prefix verbs (aufstehen, einkaufen), modal verbs, Perfekt past tense.',
    samplePhrases: ['Mir tut der Kopf weh.', 'Gestern habe ich gearbeitet.', 'Können wir getrennt zahlen?']
  },
  B1: {
    level: 'B1',
    title: 'Freischwimmer (Threshold / Independent)',
    wordCountTarget: '2,500 – 3,500 words',
    exactTargetNumber: 3000,
    description: 'Independent navigation of travel, housing, expressing opinions, describing dreams, events, and reasons.',
    pedagogicalFocus: 'Subordinate clauses (weil, dass, obwohl, wenn), Präteritum modal verbs, relative clauses, passive voice introduction.',
    samplePhrases: ['Ich ziehe um, weil die Wohnung zu klein ist.', 'Könnten Sie mir bitte sagen, ob der Zug pünktlich ist?']
  },
  B2: {
    level: 'B2',
    title: 'Wortgewandt (Vantage / Upper Intermediate)',
    wordCountTarget: '4,000 – 5,500 words',
    exactTargetNumber: 5000,
    description: 'Fluid conversation with native speakers, professional technical discussions, nuanced arguments, and complex articles.',
    pedagogicalFocus: 'Konjunktiv II (hypothetical & politeness), Passiv (Vorgangs- & Zustandspassiv), two-part connectors (weder ... noch, zwar ... aber).',
    samplePhrases: ['Hätte ich das gewusst, wäre ich früher losgefahren.', 'Das lässt sich nicht ohne Weiteres verallgemeinern.']
  },
  C1: {
    level: 'C1',
    title: 'Sprachprofi (Effective Operational Proficiency / Advanced)',
    wordCountTarget: '8,000 – 10,000 words',
    exactTargetNumber: 8500,
    description: 'Fluent, spontaneous expression without searching for words. Full command of idioms, subtle modal particles, complex compounds, and academic/professional discourse.',
    pedagogicalFocus: 'Nuanced discourse markers (nichtsdestotrotz, infolgedessen, geschweige denn), compound noun generation, nominal style (Nominalstil), idiomatic mastery.',
    advancedRequirementsSummary: [
      '8,000 to 10,000 active & passive lexical items (Goethe-Institut & Telc C1 standard).',
      'Compound Nouns (Komposita): Deconstructing and constructing multi-tier technical/cultural terms (e.g. die Zukunftsfähigkeit, das Fingerspitzengefühl).',
      'Modal Particles (Modalpartikeln): Inherent mastery of emotional nuance markers (doch, mal, halt, ja, eben, wohl, bloß, eh) that have no direct English translation.',
      'Bildungssprache & Fachsprache: Professional register, political/academic debate, diplomacy, abstract analysis.',
      'Idioms (Redewendungen) & Metaphors: Deep intuitive grasp of German figures of speech and cultural references.'
    ],
    samplePhrases: ['Wenngleich gravierende Hürden bestehen, ist dies nichtsdestotrotz ein beispielloser Fortschritt.', 'Da hat er wohl den Nagel auf den Kopf getroffen.']
  }
};

export const VOCABULARY_LIST: VocabWord[] = [
  ...A1_FULL_VOCABULARY,
  ...A2_FULL_VOCABULARY,
  ...B1_FULL_VOCABULARY,
  ...B2_FULL_VOCABULARY,
  ...C1_FULL_VOCABULARY,
];
