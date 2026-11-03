export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface ScenarioTurn {
  id: string;
  partnerPromptDe: string;
  partnerPromptEn: string;
  expectedUserConceptDe: string;
  expectedUserConceptEn: string;
  suggestedPhrases: { de: string; en: string }[];
  culturalNote?: string;
  grammarFocus?: string;
}

export interface Scenario {
  id: string;
  title: string;
  englishTitle: string;
  level: CEFRLevel;
  category: 'daily' | 'travel' | 'food' | 'work' | 'social' | 'advanced';
  icon: string;
  location: string;
  description: string;
  userRole: string;
  partnerRole: string;
  partnerAvatar: string;
  turns: ScenarioTurn[];
  vocabularyGoals: string[];
  grammarFocus: string;
  englishSpeakerTip: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'partner' | 'coach';
  textDe: string;
  textEn?: string;
  timestamp: number;
  accuracyScore?: number;
  grammarTip?: string;
  englishWarning?: string;
  audioPlaying?: boolean;
}

export interface VocabWord {
  id: string;
  german: string;
  article?: 'der' | 'die' | 'das';
  plural?: string;
  english: string;
  level: CEFRLevel;
  category: 'survival' | 'daily' | 'workplace' | 'compounds' | 'modal-particles' | 'idioms' | 'false-friends' | 'food' | 'travel' | 'people' | 'home' | 'verbs' | 'adjectives' | 'numbers-time' | 'shopping' | 'career' | 'cultural' | 'connectors' | 'health' | 'technology';
  exampleDe: string;
  exampleEn: string;
  literalBreakdown?: string;
  englishFalseFriendNote?: string;
  isLearned?: boolean;
}

export interface PronunciationDrill {
  id: string;
  title: string;
  targetSound: string;
  soundDescription: string;
  level: CEFRLevel;
  category: 'ch-sound' | 'umlauts' | 'vowels' | 'r-sound' | 'consonants' | 'tongue-twister';
  phraseDe: string;
  phraseEn: string;
  phoneticHint: string;
  englishSpeakerTrap: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  xp: number;
  streakDays: number;
  completedScenarios: string[];
  learnedVocabIds: string[];
  perfectPronunciations: number;
  lastActiveDate: string;
  currentLevel: CEFRLevel;
}

export interface GrammarTutorial {
  id: string;
  ruleNumber: number;
  unit: string;
  level: CEFRLevel;
  title: string;
  summary: string;
  englishContrast: string;
  ruleFormula: string;
  explanation: string;
  examples: { de: string; en: string; note?: string }[];
  pitfall: string;
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  targetVocab?: { word: string; translation: string; type: string }[];
}

