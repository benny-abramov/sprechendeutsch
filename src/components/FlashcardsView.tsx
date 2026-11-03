import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Layers,
  List,
  Volume2,
  CheckCircle,
  RotateCcw,
  Shuffle,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Sparkles,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Check,
  ShieldAlert,
  ArrowRight,
  PlusCircle,
  X,
  Wand2,
  BookOpen
} from 'lucide-react';
import { VocabWord, CEFRLevel } from '../types';
import { VOCABULARY_LIST, CURRICULUM_LEXICON_STATS } from '../data/vocabularyData';
import { GermanSpeechSynthesizer } from '../utils/speechUtils';

const STORAGE_CUSTOM_FLASHCARDS = 'sprechendeutsch_custom_flashcards_v1';

interface FlashcardsViewProps {
  learnedVocabIds: string[];
  onToggleLearned: (vocabId: string) => void;
  onAddXp: (amount: number) => void;
  isSlowAudio: boolean;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  learnedVocabIds,
  onToggleLearned,
  onAddXp,
  isSlowAudio,
}) => {
  const [viewMode, setViewMode] = useState<'flashcards' | 'word-list'>('flashcards');
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom generated cards loaded from localStorage
  const [customCards, setCustomCards] = useState<VocabWord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_CUSTOM_FLASHCARDS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Generator modal state
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [genLevel, setGenLevel] = useState<CEFRLevel>('B2');
  const [genTopic, setGenTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genNotice, setGenNotice] = useState<string | null>(null);

  // Flashcard interaction state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState<VocabWord[]>([]);
  const [masteredInSession, setMasteredInSession] = useState<string[]>([]);
  const [reviewLaterInSession, setReviewLaterInSession] = useState<string[]>([]);

  const synth = GermanSpeechSynthesizer.getInstance();

  // Combine static and custom cards
  const allAvailableCards = [...VOCABULARY_LIST, ...customCards];

  // Filter deck based on level, category, and search query
  useEffect(() => {
    const filtered = allAvailableCards.filter((w) => {
      const matchLevel = selectedLevel === 'ALL' || w.level === selectedLevel;
      const matchCategory = selectedCategory === 'ALL' || w.category === selectedCategory;
      const matchQuery =
        w.german.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.english.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchCategory && matchQuery;
    });

    setDeck(filtered.length > 0 ? filtered : allAvailableCards);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedLevel, selectedCategory, searchQuery, customCards]);

  const currentCard: VocabWord | undefined = deck[currentIndex] || deck[0];

  // Save custom cards to localStorage
  const saveCustomCards = (newCards: VocabWord[]) => {
    const updated = [...customCards, ...newCards];
    setCustomCards(updated);
    try {
      localStorage.setItem(STORAGE_CUSTOM_FLASHCARDS, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save custom cards:', e);
    }
  };

  // Flip card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Next / Previous
  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(deck.length - 1);
    }
  };

  // Shuffle deck
  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrentIndex(0);
  };

  // Mark got it right
  const handleMasterCard = (card: VocabWord) => {
    if (!learnedVocabIds.includes(card.id)) {
      onToggleLearned(card.id);
      onAddXp(15);
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 },
      });
    }
    setMasteredInSession((prev) => (prev.includes(card.id) ? prev : [...prev, card.id]));
    handleNext();
  };

  // Mark need review
  const handleReviewLater = (card: VocabWord) => {
    setReviewLaterInSession((prev) => (prev.includes(card.id) ? prev : [...prev, card.id]));
    handleNext();
  };

  // Play audio
  const playCardAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!currentCard) return;
    const phrase = currentCard.article ? `${currentCard.article} ${currentCard.german}` : currentCard.german;
    synth.speak(phrase, undefined, isSlowAudio);
  };

  // Generate new flashcard pack with Gemini API
  const handleGeneratePack = async (topicOverride?: string, levelOverride?: CEFRLevel) => {
    const topicToUse = topicOverride || genTopic || 'Beruf & Alltag';
    const levelToUse = levelOverride || genLevel;

    setIsGenerating(true);
    setGenNotice(null);

    try {
      const res = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: levelToUse,
          topic: topicToUse,
          count: 10,
        }),
      });

      const data = await res.json();
      if (data.cards && Array.isArray(data.cards) && data.cards.length > 0) {
        saveCustomCards(data.cards);
        setSelectedLevel(levelToUse);
        setIsGeneratorOpen(false);
        setGenTopic('');
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
        });
      } else {
        setGenNotice('Could not generate pack. Please try again.');
      }
    } catch (e: any) {
      console.error('Error generating flashcards:', e);
      setGenNotice('Failed to generate cards. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Export vocabulary list as CSV for Anki / study sheet
  const handleExportCSV = () => {
    const headers = ['German Word', 'Article', 'Level', 'Category', 'English Meaning', 'Example German', 'Example English', 'Literal Breakdown'];
    const rows = deck.map((w) => [
      `"${w.german}"`,
      `"${w.article || ''}"`,
      `"${w.level}"`,
      `"${w.category}"`,
      `"${w.english.replace(/"/g, '""')}"`,
      `"${w.exampleDe.replace(/"/g, '""')}"`,
      `"${w.exampleEn.replace(/"/g, '""')}"`,
      `"${(w.literalBreakdown || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SprechenDeutsch_Vocabulary_${selectedLevel}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Gender styling
  const getGenderColor = (article?: string) => {
    if (article === 'der') return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
    if (article === 'die') return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    if (article === 'das') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    return 'text-slate-400 bg-slate-800 border-slate-700';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Header & Scope Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/30 p-6 rounded-3xl border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-amber-500/10 text-amber-400 font-bold text-xs uppercase tracking-wider border border-amber-500/20">
              Complete Lexicon & Flashcard Deck
            </span>
            <span className="text-xs text-slate-400 font-mono">
              • {allAvailableCards.length} Cards in Deck ({CURRICULUM_LEXICON_STATS.totalDirectWords} Core + {CURRICULUM_LEXICON_STATS.c1TargetRange} C1 Scope)
            </span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            German Flashcards & Complete Word Master List
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Practice every word across A1 to C1 with 3D flip flashcards, native German audio, gender color coding (der/die/das), literal compound breakdowns, and spaced repetition.
          </p>
        </div>

        {/* View Toggle & Generator Trigger */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setIsGeneratorOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Flashcard Pack</span>
          </button>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setViewMode('flashcards')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'flashcards'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('word-list')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'word-list'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Full List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
        {/* Level Pills */}
        <div className="flex flex-wrap items-center gap-1">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedLevel === lvl
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white bg-slate-950/60'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Category & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="survival">Survival & Courtesy</option>
            <option value="numbers-time">Numbers, Calendar & Time</option>
            <option value="food">Food, Drinks & Dining</option>
            <option value="shopping">Shopping & Supermarket</option>
            <option value="travel">Travel, Transport & Directions</option>
            <option value="home">Home, Living & Appliances</option>
            <option value="people">People & Family</option>
            <option value="verbs">Core Everyday Verbs</option>
            <option value="adjectives">Adjectives & Descriptions</option>
            <option value="daily">Daily Routines & Chores</option>
            <option value="health">Healthcare & Medicine</option>
            <option value="technology">Technology & Digital</option>
            <option value="workplace">Workplace & Office</option>
            <option value="career">Career & Negotiations</option>
            <option value="connectors">Connectors & Discourse</option>
            <option value="compounds">Compounds (Komposita)</option>
            <option value="modal-particles">Modal Particles (C1)</option>
            <option value="cultural">Untranslatable Cultural Terms</option>
            <option value="false-friends">False Friends</option>
            <option value="idioms">Idioms & Nomen-Verb-Verbindungen</option>
          </select>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search words..."
              className="bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500 w-36 sm:w-48"
            />
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            title="Download vocabulary as CSV for Anki / Spreadsheets"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* ================= MODE 1: INTERACTIVE 3D FLASHCARDS ================= */}
      {viewMode === 'flashcards' && currentCard && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Deck Status Bar */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-2">
            <div className="flex items-center gap-2 font-mono">
              <span className="font-bold text-white">Card {currentIndex + 1}</span> of {deck.length} in this filter
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <Check className="w-3.5 h-3.5" />
                <span>{masteredInSession.length} Mastered</span>
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <RotateCcw className="w-3 h-3" />
                <span>{reviewLaterInSession.length} Review</span>
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / deck.length) * 100}%` }}
            />
          </div>

          {/* The Flashcard Container (Click to Flip) */}
          <div
            onClick={handleFlip}
            className="relative cursor-pointer min-h-[360px] sm:min-h-[400px] w-full rounded-3xl p-6 sm:p-8 border-2 border-slate-800 hover:border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 shadow-2xl flex flex-col justify-between transition-all select-none group"
          >
            {/* Front of Card */}
            {!isFlipped ? (
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {currentCard.article && (
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-lg border ${getGenderColor(currentCard.article)}`}>
                        {currentCard.article}
                      </span>
                    )}
                    <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-amber-400 border border-slate-700">
                      Level {currentCard.level}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
                      {currentCard.category}
                    </span>
                  </div>

                  <button
                    onClick={playCardAudio}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors shadow-sm"
                    title="Pronounce in German"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {/* German Target Word */}
                <div className="text-center space-y-2 py-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">German</span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-amber-200 transition-colors">
                    {currentCard.german}
                  </h2>
                  {currentCard.plural && (
                    <p className="text-xs text-slate-400 font-mono">
                      Plural: {currentCard.plural}
                    </p>
                  )}
                </div>

                {/* Example Sentence in German */}
                <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 text-center">
                  <p className="text-sm font-medium text-slate-200 leading-relaxed">
                    "{currentCard.exampleDe}"
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Click card to reveal English translation & breakdown</span>
                </div>
              </div>
            ) : (
              /* Back of Card */
              <div className="flex flex-col justify-between h-full space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    English Translation
                  </span>
                  <button
                    onClick={playCardAudio}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center space-y-2 py-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Meaning</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300">
                    {currentCard.english}
                  </h3>
                </div>

                {/* Literal Component Breakdown or False Friend warning */}
                {currentCard.literalBreakdown && (
                  <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider">
                      Compound Anatomy:
                    </span>
                    <p className="text-xs text-slate-200 font-mono">
                      {currentCard.literalBreakdown}
                    </p>
                  </div>
                )}

                {currentCard.englishFalseFriendNote && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-3 text-xs text-red-300 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{currentCard.englishFalseFriendNote}</span>
                  </div>
                )}

                {/* English Example */}
                <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-4 text-center">
                  <p className="text-xs text-slate-400 italic">
                    "{currentCard.exampleEn}"
                  </p>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 pt-2">
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Click card to flip back to German</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons: Spaced Repetition Review */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleReviewLater(currentCard)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs border border-slate-800 shadow-md transition-all"
            >
              <ThumbsDown className="w-4 h-4 text-amber-400" />
              <span>Review Again Later</span>
            </button>

            <button
              onClick={() => handleMasterCard(currentCard)}
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-all"
            >
              <ThumbsUp className="w-4 h-4" />
              <span>I Know This! (+15 XP)</span>
            </button>
          </div>

          {/* Navigation Controls: Previous / Shuffle / Next */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrevious}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleShuffle}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Shuffle the deck randomly"
            >
              <Shuffle className="w-4 h-4 text-amber-400" />
              <span>Shuffle Deck</span>
            </button>

            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ================= MODE 2: COMPLETE WORD MASTER LIST ================= */}
      {viewMode === 'word-list' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {deck.length} vocabulary entries in current filter</span>
            <span>Click any speaker icon to listen in Hochdeutsch</span>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Gender & Word</th>
                    <th className="py-3 px-3">Level</th>
                    <th className="py-3 px-4">English Meaning</th>
                    <th className="py-3 px-4 hidden md:table-cell">Example Sentence</th>
                    <th className="py-3 px-3 text-center">Audio</th>
                    <th className="py-3 px-4 text-right">Mastery</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {deck.map((word) => {
                    const isMastered = learnedVocabIds.includes(word.id);

                    return (
                      <tr
                        key={word.id}
                        className={`hover:bg-slate-800/50 transition-colors ${
                          isMastered ? 'bg-emerald-950/10' : ''
                        }`}
                      >
                        {/* German Word + Article */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {word.article && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getGenderColor(word.article)}`}>
                                {word.article}
                              </span>
                            )}
                            <div>
                              <span className="font-extrabold text-white text-sm block">
                                {word.german}
                              </span>
                              {word.plural && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  Pl: {word.plural}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Level */}
                        <td className="py-3.5 px-3">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                            {word.level}
                          </span>
                        </td>

                        {/* English Meaning + Notes */}
                        <td className="py-3.5 px-4 text-slate-200 font-medium">
                          <span>{word.english}</span>
                          {word.literalBreakdown && (
                            <span className="block text-[10px] text-amber-400/90 font-mono mt-0.5">
                              {word.literalBreakdown}
                            </span>
                          )}
                          {word.englishFalseFriendNote && (
                            <span className="block text-[10px] text-red-400 mt-0.5">
                              ⚠️ {word.englishFalseFriendNote}
                            </span>
                          )}
                        </td>

                        {/* Example Sentence */}
                        <td className="py-3.5 px-4 hidden md:table-cell text-slate-300">
                          <p className="line-clamp-1 text-slate-200">"{word.exampleDe}"</p>
                          <p className="line-clamp-1 text-slate-400 text-[11px] italic">"{word.exampleEn}"</p>
                        </td>

                        {/* Audio Button */}
                        <td className="py-3.5 px-3 text-center">
                          <button
                            onClick={() =>
                              synth.speak(
                                word.article ? `${word.article} ${word.german}` : word.german,
                                undefined,
                                isSlowAudio
                              )
                            }
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                            title="Play German Pronunciation"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </td>

                        {/* Mastery Toggle */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onToggleLearned(word.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                              isMastered
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{isMastered ? 'Mastered' : 'Mark Learned'}</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: GENERATE FLASHCARD PACK ================= */}
      {isGeneratorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setIsGeneratorOpen(false)}
              className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Wand2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Generate Flashcard Pack</h3>
                <p className="text-xs text-slate-400">Expand your deck with 10 new cards for any level & topic</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select CEFR Target Level:
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {(['A1', 'A2', 'B1', 'B2', 'C1'] as CEFRLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setGenLevel(lvl)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all ${
                        genLevel === lvl
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
                  Thematic Focus or Topic:
                </label>
                <input
                  type="text"
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  placeholder="e.g. Travel, Business, Healthcare, Tech & AI, Philosophy..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Quick Topic Presets */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-slate-400 block">Or pick a curated pack preset:</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { label: 'A1: Food & Supermarket', lvl: 'A1' as CEFRLevel, topic: 'Supermarkt, Lebensmittel & Kochen' },
                    { label: 'A2: Healthcare & Doctor', lvl: 'A2' as CEFRLevel, topic: 'Gesundheit, Arzt & Körper' },
                    { label: 'B1: Housing & Rental', lvl: 'B1' as CEFRLevel, topic: 'Wohnungssuche, Mietvertrag & Stadt' },
                    { label: 'B2: Corporate & Tech', lvl: 'B2' as CEFRLevel, topic: 'Arbeitswelt, Digitalisierung & Wirtschaft' },
                    { label: 'C1: Diplomacy & Debate', lvl: 'C1' as CEFRLevel, topic: 'Politik, Verhandlung & Philosophie' },
                    { label: 'C1: Cultural Compounds', lvl: 'C1' as CEFRLevel, topic: 'Komposita & deutsche Mentalität' },
                  ].map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleGeneratePack(p.topic, p.lvl)}
                      className="text-left p-2 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 text-[11px] text-slate-300 hover:text-amber-300 transition-colors"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {genNotice && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  {genNotice}
                </div>
              )}

              <button
                onClick={() => handleGeneratePack()}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:opacity-40 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isGenerating ? 'Generating 10 Flashcards...' : `Generate 10 ${genLevel} Flashcards`}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
