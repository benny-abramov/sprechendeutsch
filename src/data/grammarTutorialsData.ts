import { GrammarTutorial } from '../types';

export const ALL_GRAMMAR_TUTORIALS: GrammarTutorial[] = [
  // ==========================================
  // UNIT 1: A1 BREAKTHROUGH FOUNDATIONS (RULES 1 - 8)
  // ==========================================
  {
    id: 'rule-1-v2',
    ruleNumber: 1,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 1: The Verb-Second (V2) Rule',
    summary: 'In any German main clause (declarative sentence), the conjugated verb is strictly anchored in Position 2.',
    englishContrast: 'English allows "Today I go to the cinema" (Time adverb + Subject + Verb). In German, this is wrong: the verb must be second: "Heute GEHE ich ins Kino".',
    ruleFormula: 'Position 1 (Time/Place/Topic) + Position 2 [CONJUGATED VERB] + Subject (Inversion) + Rest',
    explanation: 'No matter what element you start the sentence with (subject, time, location, or direct object), the conjugated verb MUST occupy Position 2. When you start with anything other than the subject, the subject flips behind the verb (*Inversion*).',
    examples: [
      { de: 'Heute gehe ich ins Kino.', en: 'Today I am going to the cinema.', note: 'Position 1 = Heute, Position 2 = gehe' },
      { de: 'In Berlin wohnt meine Schwester.', en: 'In Berlin lives my sister.', note: 'Position 1 = In Berlin, Position 2 = wohnt' },
      { de: 'Einen Kaffee trinke ich jeden Morgen.', en: 'A coffee I drink every morning.', note: 'Position 1 = Einen Kaffee, Position 2 = trinke' }
    ],
    pitfall: 'Never say "Morgen ich komme". The verb MUST be second: "Morgen komme ich".',
    targetVocab: [
      { word: 'heute', translation: 'today', type: 'Adverb' },
      { word: 'morgen', translation: 'tomorrow', type: 'Adverb' },
      { word: 'gestern', translation: 'yesterday', type: 'Adverb' },
      { word: 'jetzt', translation: 'now', type: 'Adverb' },
      { word: 'das Kino', translation: 'the cinema', type: 'Noun (das)' },
      { word: 'gehen', translation: 'to go / walk', type: 'Verb' },
      { word: 'wohnen', translation: 'to live / reside', type: 'Verb' },
      { word: 'fahren', translation: 'to travel / ride', type: 'Verb' }
    ],
    quiz: {
      question: 'Which sentence correctly follows the Verb-Second rule?',
      options: [
        'Am Montag ich habe frei.',
        'Am Montag habe ich frei.',
        'Am Montag ich frei habe.'
      ],
      correctIndex: 1,
      explanation: '"Am Montag" is in Position 1, so the conjugated verb "habe" must be in Position 2: "Am Montag habe ich frei".'
    }
  },
  {
    id: 'rule-2-conjugation',
    ruleNumber: 2,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 2: Subject-Verb Agreement & Regular Conjugation',
    summary: 'German verbs change their endings depending on the grammatical person (ich -e, du -st, er/sie/es -t, wir -en, ihr -t, sie/Sie -en).',
    englishContrast: 'English verbs barely change (only "he works" with -s). German requires distinct personal endings for all pronouns.',
    ruleFormula: 'Verb Stem + Personal Ending: ich [-e], du [-st], er/sie/es [-t], wir [-en], ihr [-t], sie/Sie [-en]',
    explanation: 'To conjugate a regular German verb like "lernen" (to learn), drop the "-en" infinitive ending to find the stem ("lern-") and add the appropriate personal ending.',
    examples: [
      { de: 'Ich lerne jeden Tag Deutsch.', en: 'I learn German every day.', note: 'ich + -e' },
      { de: 'Woher kommst du?', en: 'Where do you come from?', note: 'du + -st' },
      { de: 'Wir wohnen in Hamburg.', en: 'We live in Hamburg.', note: 'wir + -en' }
    ],
    pitfall: 'If the verb stem ends in -t or -d (like "arbeiten"), add an extra "e" before endings: "du arbeitest", "er arbeitet".',
    targetVocab: [
      { word: 'lernen', translation: 'to learn / study', type: 'Regular Verb' },
      { word: 'wohnen', translation: 'to live / reside', type: 'Regular Verb' },
      { word: 'arbeiten', translation: 'to work (stem in -t)', type: 'Regular Verb' },
      { word: 'kommen', translation: 'to come', type: 'Regular Verb' },
      { word: 'heißen', translation: 'to be named', type: 'Regular Verb' },
      { word: 'fragen', translation: 'to ask', type: 'Regular Verb' },
      { word: 'trinken', translation: 'to drink', type: 'Regular Verb' },
      { word: 'kaufen', translation: 'to buy', type: 'Regular Verb' }
    ],
    quiz: {
      question: 'What is the correct form: "Er _____ in Frankfurt" (wohnen)?',
      options: [
        'wohne',
        'wohnst',
        'wohnt'
      ],
      correctIndex: 2,
      explanation: 'The 3rd person singular pronoun "er" takes the ending "-t": "er wohnt".'
    }
  },
  {
    id: 'rule-3-vowel-change',
    ruleNumber: 3,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 3: Irregular Stem Vowel Changes (e → i/ie, a → ä)',
    summary: 'Strong verbs change their stem vowel in the present tense, but ONLY for "du" and "er/sie/es".',
    englishContrast: 'English irregular verbs only change in the past (swim/swam). German changes stem vowels in the present tense!',
    ruleFormula: 'e → i (sprechen → du sprichst, er spricht) | e → ie (sehen → du siehst, er sieht) | a → ä (fahren → du fährst, er fährt)',
    explanation: 'Many common German verbs have vowel shifts in the present tense. Note: "ich", "wir", "ihr", and "sie/Sie" remain completely regular!',
    examples: [
      { de: 'Sprichst du Deutsch?', en: 'Do you speak German?', note: 'sprechen: e → i for du' },
      { de: 'Er fährt jeden Tag mit dem Zug.', en: 'He travels every day by train.', note: 'fahren: a → ä for er' },
      { de: 'Sie sieht einen Film.', en: 'She is watching a movie.', note: 'sehen: e → ie for sie' }
    ],
    pitfall: '"Ihr" (plural informal you) does NOT change vowel: "ihr sprecht" (not "ihr spricht").',
    targetVocab: [
      { word: 'sprechen', translation: 'to speak (e -> i)', type: 'Strong Verb' },
      { word: 'fahren', translation: 'to drive/travel (a -> ä)', type: 'Strong Verb' },
      { word: 'sehen', translation: 'to see (e -> ie)', type: 'Strong Verb' },
      { word: 'lesen', translation: 'to read (e -> ie)', type: 'Strong Verb' },
      { word: 'essen', translation: 'to eat (e -> i)', type: 'Strong Verb' },
      { word: 'schlafen', translation: 'to sleep (a -> ä)', type: 'Strong Verb' },
      { word: 'helfen', translation: 'to help (e -> i)', type: 'Strong Verb' },
      { word: 'nehmen', translation: 'to take (e -> i)', type: 'Strong Verb' }
    ],
    quiz: {
      question: 'Complete: "Du _____ sehr schnell" (fahren).',
      options: [
        'fährst',
        'fahrst',
        'fahrt'
      ],
      correctIndex: 0,
      explanation: 'Fahren changes "a" to "ä" for du: "du fährst".'
    }
  },
  {
    id: 'rule-4-nominativ-akkusativ',
    ruleNumber: 4,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 4: The 4 Cases: Nominativ vs Akkusativ',
    summary: 'Nominativ is the subject doing the action. Akkusativ is the direct object receiving the action. In Akkusativ, ONLY masculine changes!',
    englishContrast: 'English only shows case in pronouns (he vs him). German applies cases to articles (der → den, ein → einen).',
    ruleFormula: 'Masculine: der/ein → DEN / EINEN | Feminine: die/eine (no change) | Neuter: das/ein (no change) | Plural: die (no change)',
    explanation: 'When a noun functions as the direct object of a transitive verb (haben, kaufen, bestellen, sehen, trinken), it moves into Akkusativ. Good news: Feminine, Neuter, and Plural remain completely unchanged!',
    examples: [
      { de: 'Der Mann (Nom) kauft den Computer (Akk).', en: 'The man buys the computer.', note: 'der Computer → den Computer' },
      { de: 'Ich hätte gerne einen großen Kaffee.', en: 'I would like a large coffee.', note: 'der Kaffee → einen Kaffee' },
      { de: 'Sie liest ein Buch und eine Zeitung.', en: 'She reads a book and a newspaper.', note: 'Neuter & Feminine: zero change' }
    ],
    pitfall: 'Don\'t say "Ich habe ein Hund". A dog is masculine ("der Hund"), so direct object is "einen Hund".',
    targetVocab: [
      { word: 'der Kaffee (einen)', translation: 'the coffee (masculine)', type: 'Noun (der)' },
      { word: 'der Tisch (einen)', translation: 'the table (masculine)', type: 'Noun (der)' },
      { word: 'der Computer (einen)', translation: 'the computer (masculine)', type: 'Noun (der)' },
      { word: 'die Fahrkarte', translation: 'the ticket (feminine)', type: 'Noun (die)' },
      { word: 'das Buch', translation: 'the book (neuter)', type: 'Noun (das)' },
      { word: 'das Wasser', translation: 'the water (neuter)', type: 'Noun (das)' },
      { word: 'haben', translation: 'to have (+ Akkusativ)', type: 'Transitive Verb' },
      { word: 'bestellen', translation: 'to order (+ Akkusativ)', type: 'Transitive Verb' }
    ],
    quiz: {
      question: 'Which article fits: "Ich suche _____ Bahnhof (der Bahnhof)"?',
      options: [
        'der',
        'den',
        'dem'
      ],
      correctIndex: 1,
      explanation: 'Bahnhof is masculine (der Bahnhof) and acts as the direct object (Akkusativ), shifting to "den".'
    }
  },
  {
    id: 'rule-5-genders-suffixes',
    ruleNumber: 5,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 5: Der, Die, Das Suffix Cheat Codes',
    summary: 'Never guess noun genders blindly. Suffixes (word endings) mathematically determine grammatical gender.',
    englishContrast: 'English has only "the". In German, memorizing 8 specific suffixes eliminates over 80% of gender confusion.',
    ruleFormula: 'DIE = -ung, -heit, -keit, -schaft, -tät, -tion | DAS = -chen, -lein, -ment, -um | DER = -ling, -or, -ismus',
    explanation: 'Every German noun ending in -ung (die Rechnung, die Zeitung) or -heit/-keit (die Freiheit, die Möglichkeit) is 100% feminine. Diminutives ending in -chen (das Brötchen, das Mädchen) are 100% neuter.',
    examples: [
      { de: 'die Wohnung, die Hoffnung, die Verspätung', en: 'the flat, the hope, the delay', note: '-ung is 100% feminine' },
      { de: 'das Brötchen, das Mädchen, das Dokument', en: 'the roll, the girl, the document', note: '-chen & -ment are 100% neuter' },
      { de: 'der Motor, der Optimismus, der Frühling', en: 'the engine, the optimism, the spring', note: '-or, -ismus, -ling are masculine' }
    ],
    pitfall: 'Compound nouns always inherit the gender of their LAST component: "der Schreibtisch" (der Tisch).',
    targetVocab: [
      { word: 'die Wohnung', translation: 'the flat / apartment (-ung)', type: 'Noun (die)' },
      { word: 'die Rechnung', translation: 'the bill / invoice (-ung)', type: 'Noun (die)' },
      { word: 'die Möglichkeit', translation: 'the possibility (-keit)', type: 'Noun (die)' },
      { word: 'die Gesundheit', translation: 'the health (-heit)', type: 'Noun (die)' },
      { word: 'das Brötchen', translation: 'the bread roll (-chen)', type: 'Noun (das)' },
      { word: 'das Mädchen', translation: 'the girl (-chen)', type: 'Noun (das)' },
      { word: 'der Motor', translation: 'the motor / engine (-or)', type: 'Noun (der)' },
      { word: 'der Optimismus', translation: 'the optimism (-ismus)', type: 'Noun (der)' }
    ],
    quiz: {
      question: 'What is the grammatical gender of "die Pünktlichkeit" (punctuality)?',
      options: [
        'der Pünktlichkeit',
        'die Pünktlichkeit',
        'das Pünktlichkeit'
      ],
      correctIndex: 1,
      explanation: 'Words ending in "-keit" or "-heit" are 100% feminine: DIE Pünktlichkeit.'
    }
  },
  {
    id: 'rule-6-negation',
    ruleNumber: 6,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 6: Negation: "nicht" vs "kein"',
    summary: 'Use "kein" to negate nouns with indefinite articles or no articles. Use "nicht" to negate verbs, adjectives, or specific items.',
    englishContrast: 'In English you say "I do not have money". In German you must say "Ich habe KEIN Geld" (not "nicht Geld").',
    ruleFormula: 'KEIN declines like "ein" (kein, keine, keinen, keinem) | NICHT negates verbs, adjectives, possessives, and entire clauses',
    explanation: 'If in English you could replace "not a" or "no [noun]", German strictly uses KEIN. For all other negations (verbs, adjectives, adverbs), use NICHT.',
    examples: [
      { de: 'Ich habe keine Zeit und kein Geld.', en: 'I have no time and no money.', note: 'Negating nouns → kein/keine' },
      { de: 'Ich verstehe das nicht.', en: 'I do not understand that.', note: 'Negating verb → nicht' },
      { de: 'Das Hotel ist nicht teuer.', en: 'The hotel is not expensive.', note: 'Negating adjective → nicht' }
    ],
    pitfall: 'Never say "Ich trinke nicht Kaffee". Say "Ich trinke KEINEN Kaffee".',
    targetVocab: [
      { word: 'kein / keine', translation: 'no / not any (for nouns)', type: 'Negation Article' },
      { word: 'nicht', translation: 'not (for verbs & adjectives)', type: 'Negation Particle' },
      { word: 'das Geld', translation: 'the money', type: 'Noun (das)' },
      { word: 'die Zeit', translation: 'the time', type: 'Noun (die)' },
      { word: 'müde', translation: 'tired', type: 'Adjective' },
      { word: 'teuer', translation: 'expensive', type: 'Adjective' },
      { word: 'das Problem', translation: 'the problem', type: 'Noun (das)' },
      { word: 'verstehen', translation: 'to understand', type: 'Verb' }
    ],
    quiz: {
      question: 'How do you say "I am not tired"?',
      options: [
        'Ich bin kein müde.',
        'Ich bin nicht müde.',
        'Ich bin nichts müde.'
      ],
      correctIndex: 1,
      explanation: '"Müde" (tired) is an adjective, so it must be negated with "nicht": "Ich bin nicht müde".'
    }
  },
  {
    id: 'rule-7-questions',
    ruleNumber: 7,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 7: Question Formation: W-Fragen vs Inversion',
    summary: 'Open questions start with a question word (W-Wort) with verb in Position 2. Yes/No questions place the verb in Position 1.',
    englishContrast: 'English requires auxiliary "do" ("Do you speak German?"). German never uses auxiliary do; simply put the verb first!',
    ruleFormula: 'W-Fragen: W-Wort + Verb (Pos 2) + Subject | Ja/Nein-Fragen: Verb (Pos 1) + Subject + Rest',
    explanation: 'Question words start with W: Wer (who), Was (what), Wo (where), Woher (where from), Wohin (where to), Wann (when), Wie (how), Warum (why). In Yes/No questions, the verb itself leads the sentence.',
    examples: [
      { de: 'Wann fährt der nächste Zug ab?', en: 'When does the next train depart?', note: 'W-Frage: Wann (1) + fährt (2)' },
      { de: 'Sprechen Sie Deutsch oder Englisch?', en: 'Do you speak German or English?', note: 'Ja/Nein: Sprechen (1) + Sie (2)' },
      { de: 'Trinken Sie gerne Kaffee?', en: 'Do you like to drink coffee?', note: 'Verb in Position 1' }
    ],
    pitfall: 'Never translate "Do you live here?" as "Tust du hier wohnen?". Simply say: "Wohnst du hier?".',
    targetVocab: [
      { word: 'Wer?', translation: 'Who?', type: 'Question Word' },
      { word: 'Was?', translation: 'What?', type: 'Question Word' },
      { word: 'Wo?', translation: 'Where? (static)', type: 'Question Word' },
      { word: 'Wohin?', translation: 'Where to? (movement)', type: 'Question Word' },
      { word: 'Woher?', translation: 'Where from? (origin)', type: 'Question Word' },
      { word: 'Wann?', translation: 'When?', type: 'Question Word' },
      { word: 'Wie?', translation: 'How?', type: 'Question Word' },
      { word: 'Warum?', translation: 'Why?', type: 'Question Word' }
    ],
    quiz: {
      question: 'Which question correctly asks "Do you have a table free?" in German?',
      options: [
        'Haben Sie einen Tisch frei?',
        'Sie haben einen Tisch frei?',
        'Tun Sie haben einen Tisch frei?'
      ],
      correctIndex: 0,
      explanation: 'Yes/No questions place the conjugated verb in Position 1: "Haben Sie einen Tisch frei?".'
    }
  },
  {
    id: 'rule-8-modals-present',
    ruleNumber: 8,
    unit: 'Unit 1: A1 Foundations',
    level: 'A1',
    title: 'Rule 8: Modal Verbs & The Infinitive Bracket',
    summary: 'Modal verbs (können, müssen, wollen, möchten, dürfen, sollen) take Position 2, kicking the main verb in infinitive form to the very end.',
    englishContrast: 'English keeps both verbs together ("I can speak German"). German brackets the sentence ("Ich KANN Deutsch SPRECHEN").',
    ruleFormula: 'Subject + Modal Verb (Position 2) + Middle Elements + [MAIN VERB INFINITIVE at the end]',
    explanation: 'Modal verbs form the famous German sentence bracket (*Satzklammer*). The conjugated modal verb goes in Position 2, and the second verb sits in full infinitive form at the very end.',
    examples: [
      { de: 'Ich kann gut Deutsch sprechen.', en: 'I can speak German well.', note: 'kann (Pos 2) ... sprechen (End)' },
      { de: 'Wir müssen heute lange arbeiten.', en: 'We have to work long hours today.', note: 'müssen (Pos 2) ... arbeiten (End)' },
      { de: 'Möchten Sie etwas trinken?', en: 'Would you like to drink something?', note: 'Möchten (Pos 1) ... trinken (End)' }
    ],
    pitfall: 'In singular, modal verbs have no ending for "ich" and "er/sie/es": "ich kann", "er kann" (never "er kannt").',
    targetVocab: [
      { word: 'können', translation: 'can / to be able to', type: 'Modal Verb' },
      { word: 'müssen', translation: 'must / to have to', type: 'Modal Verb' },
      { word: 'möchten', translation: 'would like to (polite)', type: 'Modal Verb' },
      { word: 'wollen', translation: 'to want to (intent)', type: 'Modal Verb' },
      { word: 'dürfen', translation: 'may / allowed to', type: 'Modal Verb' },
      { word: 'sollen', translation: 'should / ought to', type: 'Modal Verb' },
      { word: 'sprechen', translation: 'to speak (infinitive)', type: 'Main Verb' },
      { word: 'arbeiten', translation: 'to work (infinitive)', type: 'Main Verb' }
    ],
    quiz: {
      question: 'Where does the main verb go: "Ich muss morgen früh _____"? (aufstehen)',
      options: [
        'aufstehen (at the very end)',
        'aufstehe (in the middle)',
        'stehe auf (after muss)'
      ],
      correctIndex: 0,
      explanation: 'Modal verbs kick the accompanying main verb in full infinitive form to the very end: "aufstehen".'
    }
  },

  // ==========================================
  // UNIT 2: A2 CORE COMMUNICATION (RULES 9 - 16)
  // ==========================================
  {
    id: 'rule-9-dativ-basics',
    ruleNumber: 9,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 9: The Dativ Case (Indirect Objects & Special Verbs)',
    summary: 'Dativ marks the indirect receiver (to whom/for whom?). Special verbs like helfen, danken, gefallen, gehören strictly take Dativ.',
    englishContrast: 'English relies on word order ("I give the man a book") or "to". German changes the articles: der/das → dem, die → der, die (pl) → den + n.',
    ruleFormula: 'Dativ Articles: Masculine = DEM / EINEM | Neuter = DEM / EINEM | Feminine = DER / EINER | Plural = DEN (+n on noun)',
    explanation: 'When giving, sending, or showing something to someone, that person takes Dativ. Furthermore, verbs like "helfen" (to help), "danken" (to thank), and "passen" (to suit) always require Dativ.',
    examples: [
      { de: 'Ich gebe dem Kellner ein Trinkgeld.', en: 'I give the waiter a tip.', note: 'dem Kellner = Dativ receiver' },
      { de: 'Können Sie mir bitte helfen?', en: 'Can you please help me?', note: 'helfen strictly takes Dativ "mir"' },
      { de: 'Das Buch gehört meiner Schwester.', en: 'The book belongs to my sister.', note: 'gehören strictly takes Dativ' }
    ],
    pitfall: 'Never say "Ich helfe dich" (Akkusativ). It is strictly "Ich helfe DIR" (Dativ).',
    targetVocab: [
      { word: 'dem Kellner', translation: 'the waiter (Dativ masc)', type: 'Noun (Dativ)' },
      { word: 'der Schwester', translation: 'the sister (Dativ fem)', type: 'Noun (Dativ)' },
      { word: 'dem Kind', translation: 'the child (Dativ neuter)', type: 'Noun (Dativ)' },
      { word: 'den Freunden', translation: 'the friends (Dativ plural +n)', type: 'Noun (Dativ)' },
      { word: 'helfen', translation: 'to help (+ Dativ: hilft mir)', type: 'Verb' },
      { word: 'danken', translation: 'to thank (+ Dativ: dankt Ihnen)', type: 'Verb' },
      { word: 'gehören', translation: 'to belong to (+ Dativ: gehört mir)', type: 'Verb' },
      { word: 'passen', translation: 'to suit / fit (+ Dativ)', type: 'Verb' }
    ],
    quiz: {
      question: 'Complete: "Der Arzt hilft _____ Patienten (der Patient - masculine)".',
      options: [
        'den',
        'dem',
        'der'
      ],
      correctIndex: 1,
      explanation: '"Helfen" takes a Dativ object. Masculine Dativ article is "dem": "dem Patienten".'
    }
  },
  {
    id: 'rule-10-wechselpraepositionen',
    ruleNumber: 10,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 10: Two-Way Prepositions (Wechselpräpositionen)',
    summary: 'The 9 two-way prepositions take Akkusativ for movement towards a destination (Wohin?), and Dativ for stationary location (Wo?).',
    englishContrast: 'English uses "in" for both static and movement. German strictly distinguishes "in den Park" (entering) from "im Park" (inside).',
    ruleFormula: 'Wohin? (Movement / Destination) → AKKUSATIV | Wo? (Location / Static Position) → DATIV',
    explanation: 'The 9 prepositions are: an, auf, hinter, in, neben, über, unter, vor, zwischen. Ask: Is someone moving into a new place, or already resting there?',
    examples: [
      { de: 'Ich gehe in die Küche. (Wohin? → Akkusativ)', en: 'I am walking into the kitchen.', note: 'Movement from outside to inside' },
      { de: 'Ich koche in der Küche. (Wo? → Dativ)', en: 'I am cooking in the kitchen.', note: 'Static position inside the room' },
      { de: 'Er legt das Buch auf den Tisch. / Das Buch liegt auf dem Tisch.', en: 'He puts the book on the table / It lies on the table.', note: 'Akkusativ (laying) vs Dativ (lying)' }
    ],
    pitfall: 'Learn preposition contractions: in + dem = im, an + dem = am, in + das = ins, an + das = ans.',
    targetVocab: [
      { word: 'an (am / ans)', translation: 'at, on (vertical surface)', type: 'Two-Way Prep' },
      { word: 'auf (auf dem / auf den)', translation: 'on (horizontal surface)', type: 'Two-Way Prep' },
      { word: 'in (im / ins)', translation: 'in, into (interior)', type: 'Two-Way Prep' },
      { word: 'vor / hinter', translation: 'in front of / behind', type: 'Two-Way Prep' },
      { word: 'unter / über', translation: 'under / above, over', type: 'Two-Way Prep' },
      { word: 'neben / zwischen', translation: 'next to / between', type: 'Two-Way Prep' },
      { word: 'legen / liegen', translation: 'to lay (Akk) / to lie (Dat)', type: 'Verbs' },
      { word: 'stellen / stehen', translation: 'to stand upright (Akk / Dat)', type: 'Verbs' }
    ],
    quiz: {
      question: 'Choose the correct form: "Wir treffen uns _____ Bahnhof (der Bahnhof - meeting location)".',
      options: [
        'am (an dem)',
        'an den',
        'ans (an das)'
      ],
      correctIndex: 0,
      explanation: 'Meeting at a stationary location answers "Wo?" and takes Dativ: an + dem = am Bahnhof.'
    }
  },
  {
    id: 'rule-11-fixed-prepositions',
    ruleNumber: 11,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 11: Fixed Prepositions (Dativ-only & Akkusativ-only)',
    summary: 'Certain prepositions strictly require Dativ regardless of movement, while others strictly require Akkusativ.',
    englishContrast: 'English prepositions never change noun endings. German fixed prepositions dictate the exact grammatical case.',
    ruleFormula: 'Dativ Prepositions: aus, bei, mit, nach, seit, von, zu, gegenüber | Akkusativ Prepositions: durch, für, gegen, ohne, um',
    explanation: 'Memorize these two groups. Whenever you see "mit" or "zu", the noun is ALWAYS Dativ. Whenever you see "für" or "ohne", it is ALWAYS Akkusativ.',
    examples: [
      { de: 'Ich fahre mit dem Bus zur Arbeit.', en: 'I travel by bus to work.', note: 'mit + Dativ, zu + Dativ' },
      { de: 'Dieses Geschenk ist für meinen Bruder.', en: 'This present is for my brother.', note: 'für + Akkusativ' },
      { de: 'Ohne einen Regenschirm gehe ich nicht raus.', en: 'Without an umbrella I do not go out.', note: 'ohne + Akkusativ' }
    ],
    pitfall: '"Seit" (since/for) always takes Dativ and is used with present tense: "Ich wohne seit einem Jahr in Berlin".',
    targetVocab: [
      { word: 'mit (+ Dativ)', translation: 'with / by (vehicle)', type: 'Dativ Prep' },
      { word: 'zu / zur / zum (+ Dativ)', translation: 'to (destination/person)', type: 'Dativ Prep' },
      { word: 'aus (+ Dativ)', translation: 'out of / from (origin)', type: 'Dativ Prep' },
      { word: 'bei / beim (+ Dativ)', translation: 'at (someone’s place/work)', type: 'Dativ Prep' },
      { word: 'nach (+ Dativ)', translation: 'to (cities/countries) / after', type: 'Dativ Prep' },
      { word: 'für (+ Akkusativ)', translation: 'for', type: 'Akkusativ Prep' },
      { word: 'ohne (+ Akkusativ)', translation: 'without', type: 'Akkusativ Prep' },
      { word: 'um (+ Akkusativ)', translation: 'around / at (clock time)', type: 'Akkusativ Prep' }
    ],
    quiz: {
      question: 'Which case does "mit" (with) strictly require?',
      options: [
        'Always Akkusativ',
        'Always Dativ',
        'Depends on movement'
      ],
      correctIndex: 1,
      explanation: '"Mit" is a strictly Dativ preposition: "mit dem Freund", "mit der Familie".'
    }
  },
  {
    id: 'rule-12-separable-prefixes',
    ruleNumber: 12,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 12: Separable vs Inseparable Prefix Verbs',
    summary: 'Separable prefixes (auf-, ein-, mit-, ab-, an-) split in present tense and travel to the end. Inseparable prefixes (be-, ver-, ent-) never split.',
    englishContrast: 'English phrasal verbs ("turn on", "wake up") keep particles close. German separable verbs send prefixes to the very end of the sentence.',
    ruleFormula: 'Separable: Stem in Position 2 ... Prefix at the very end | Inseparable: Stays together (be-, ge-, er-, ver-, zer-, ent-, emp-, miss-)',
    explanation: 'To test if a prefix is separable, listen to the stress. If the prefix is STRESSED (ÁUF-stehen, ÉIN-kaufen), it separates. If the stem is stressed (ver-STÉHEN, be-KÓMMEN), it is inseparable.',
    examples: [
      { de: 'Der Zug fährt um 8 Uhr ab.', en: 'The train departs at 8 o\'clock.', note: 'abfahren: ab at the end' },
      { de: 'Ich lade dich zu meiner Party ein.', en: 'I invite you to my party.', note: 'einladen: ein at the end' },
      { de: 'Ich bezahle die Rechnung.', en: 'I pay the bill.', note: 'bezahlen is inseparable' }
    ],
    pitfall: 'Inseparable verbs do NOT add "ge-" in the past participle: "bezahlt" (not "gebezahlt"), "verstanden" (not "geverstanden").',
    targetVocab: [
      { word: 'abfahren', translation: 'to depart (fährt ab)', type: 'Separable Verb' },
      { word: 'ankommen', translation: 'to arrive (kommt an)', type: 'Separable Verb' },
      { word: 'einsteigen', translation: 'to board (steigt ein)', type: 'Separable Verb' },
      { word: 'aussteigen', translation: 'to get off (steigt aus)', type: 'Separable Verb' },
      { word: 'umsteigen', translation: 'to transfer (steigt um)', type: 'Separable Verb' },
      { word: 'aufstehen', translation: 'to get up (steht auf)', type: 'Separable Verb' },
      { word: 'einkaufen', translation: 'to shop (kauft ein)', type: 'Separable Verb' },
      { word: 'bezahlen', translation: 'to pay (inseparable)', type: 'Inseparable Verb' }
    ],
    quiz: {
      question: 'How do you conjugate "aufwachen" (to wake up) in present tense?',
      options: [
        'Ich aufwache um 7 Uhr.',
        'Ich wache um 7 Uhr auf.',
        'Ich wache auf um 7 Uhr.'
      ],
      correctIndex: 1,
      explanation: 'The verb stem "wache" takes Position 2, and the separable prefix "auf" goes to the very end of the clause.'
    }
  },
  {
    id: 'rule-13-past-perfekt',
    ruleNumber: 13,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 13: Conversational Past Tense: Das Perfekt (haben vs sein)',
    summary: 'In spoken German, 90% of past conversation uses the Perfekt: auxiliary (haben or sein) in Position 2 + Partizip II at the very end.',
    englishContrast: 'English uses simple past in conversation ("I went to Berlin"). Spoken German strictly prefers Perfekt ("Ich bin nach Berlin gefahren").',
    ruleFormula: 'Position 1 + Auxiliary [haben / sein] + Middle + [PARTIZIP II at the end (ge-...-t / ge-...-en)]',
    explanation: 'Use SEIN for verbs indicating movement from A to B (fahren, gehen, fliegen, kommen) or a change of state (aufwachen, einschlafen), plus sein/bleiben/werden. Use HABEN for all transitive and reflexive verbs.',
    examples: [
      { de: 'Wir haben gestern Pizza gegessen.', en: 'We ate pizza yesterday.', note: 'haben + Partizip II' },
      { de: 'Ich bin gestern nach Köln gefahren.', en: 'I traveled to Cologne yesterday.', note: 'Movement from A to B → sein' },
      { de: 'Was hast du am Wochenende gemacht?', en: 'What did you do at the weekend?', note: 'Standard spoken question' }
    ],
    pitfall: 'Regular verbs form Partizip II with ge- + stem + -t: "gekauft", "gemacht". Irregular verbs end in -en: "gesprochen", "gefahren".',
    targetVocab: [
      { word: 'haben (hat gehabt)', translation: 'to have (auxiliary for most verbs)', type: 'Auxiliary' },
      { word: 'sein (ist gewesen)', translation: 'to be (auxiliary for motion & state)', type: 'Auxiliary' },
      { word: 'gegangen (gehen)', translation: 'gone / walked', type: 'Partizip II' },
      { word: 'gefahren (fahren)', translation: 'driven / traveled', type: 'Partizip II' },
      { word: 'gekommen (kommen)', translation: 'come', type: 'Partizip II' },
      { word: 'gegessen (essen)', translation: 'eaten', type: 'Partizip II' },
      { word: 'getrunken (trinken)', translation: 'drunk', type: 'Partizip II' },
      { word: 'geblieben (bleiben)', translation: 'stayed (takes sein!)', type: 'Partizip II' }
    ],
    quiz: {
      question: 'Which auxiliary verb is used for "ankommen" (to arrive)?',
      options: [
        'Ich habe angekommen.',
        'Ich bin angekommen.',
        'Ich werde angekommen.'
      ],
      correctIndex: 1,
      explanation: 'Arrival indicates completing movement from A to B, requiring "sein": "Ich bin angekommen".'
    }
  },
  {
    id: 'rule-14-praeteritum-modals',
    ruleNumber: 14,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 14: Simple Past of Modals & Auxiliaries (war, hatte, konnte)',
    summary: 'Even in spoken German, "sein", "haben", and modal verbs are preferred in Simple Past (Präteritum) rather than Perfekt.',
    englishContrast: 'Instead of saying the clunky "Ich habe Zeit gehabt", Germans always say "Ich HATTE Zeit".',
    ruleFormula: 'sein → war | haben → hatte | können → konnte | müssen → musste | wollen → wollte | dürfen → durfte',
    explanation: 'While action verbs use Perfekt in spoken German, auxiliaries and modals use the clean, direct Präteritum: "Ich war müde", "Ich hatte keine Zeit", "Ich konnte nicht kommen".',
    examples: [
      { de: 'Gestern war ich den ganzen Tag zu Hause.', en: 'Yesterday I was at home all day.', note: 'war instead of bin gewesen' },
      { de: 'Ich hatte leider keine Zeit.', en: 'I unfortunately had no time.', note: 'hatte instead of habe gehabt' },
      { de: 'Er musste gestern lange im Büro bleiben.', en: 'He had to stay in the office late yesterday.', note: 'musste instead of hat gemusst' }
    ],
    pitfall: 'Notice that modal verbs in Präteritum drop their umlauts: können → konnte, müssen → musste, dürfen → durfte.',
    quiz: {
      question: 'What is the simple past of "Ich kann nicht kommen"?',
      options: [
        'Ich könte nicht kommen.',
        'Ich konnte nicht kommen.',
        'Ich habe gekonnt kommen.'
      ],
      correctIndex: 1,
      explanation: 'Können drops its umlaut in Präteritum: "Ich konnte nicht kommen".'
    }
  },
  {
    id: 'rule-15-reflexive-verbs',
    ruleNumber: 15,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 15: Reflexive Verbs & Pronouns (sich freuen, sich fühlen)',
    summary: 'Reflexive verbs describe actions reflecting back on the subject (mich/dich/sich/uns/euch/sich).',
    englishContrast: 'English rarely uses reflexive pronouns ("I am interested in..."). German strictly requires them: "Ich interessiere MICH für...".',
    ruleFormula: 'ich [mich], du [dich], er/sie/es [sich], wir [uns], ihr [euch], sie/Sie [sich]',
    explanation: 'Many core German verbs of emotion, grooming, and routine are strictly reflexive: sich freuen (to be happy), sich erinnern (to remember), sich setzen (to sit down), sich fühlen (to feel).',
    examples: [
      { de: 'Ich freue mich sehr auf das Wochenende.', en: 'I am really looking forward to the weekend.', note: 'sich freuen auf' },
      { de: 'Wie fühlst du dich heute?', en: 'How do you feel today?', note: 'sich fühlen' },
      { de: 'Setzen Sie sich bitte!', en: 'Please take a seat!', note: 'sich setzen' }
    ],
    pitfall: 'If you name a specific body part or direct object, the reflexive pronoun shifts to Dativ: "Ich wasche MIR die Hände".',
    quiz: {
      question: 'Complete: "Wir interessieren _____ sehr für Kunst."',
      options: [
        'sich',
        'uns',
        'euch'
      ],
      correctIndex: 1,
      explanation: 'The reflexive pronoun for "wir" is "uns": "Wir interessieren uns".'
    }
  },
  {
    id: 'rule-16-comparatives',
    ruleNumber: 16,
    unit: 'Unit 2: A2 Core Communication',
    level: 'A2',
    title: 'Rule 16: Comparative & Superlative of Adjectives',
    summary: 'Comparatives add -er (+ als). Superlatives add am ...-sten. Many short vowels take an umlaut (alt → älter).',
    englishContrast: 'English uses "more" for long words ("more expensive"). German ALWAYS adds -er (teurer), never "mehr teuer"!',
    ruleFormula: 'Base: schnell | Comparative: schneller als | Superlative: am schnellsten',
    explanation: 'To compare equality, use "so ... wie" (so schnell wie). For superiority, use "-er als" (schneller als). Common irregulars: gut → besser → am besten; viel → mehr → am meisten; gern → lieber → am liebsten.',
    examples: [
      { de: 'Der Zug ist schneller als der Bus.', en: 'The train is faster than the bus.', note: 'schneller als' },
      { de: 'Dieses Restaurant ist am besten.', en: 'This restaurant is the best.', note: 'am besten' },
      { de: 'Ich trinke lieber Tee als Kaffee.', en: 'I prefer drinking tea to coffee.', note: 'lieber als' }
    ],
    pitfall: 'Never say "mehr billig" or "mehr gut". German strictly uses "-er" suffixes: "billiger", "besser".',
    quiz: {
      question: 'What is the comparative of "gut" (good)?',
      options: [
        'guter',
        'mehr gut',
        'besser'
      ],
      correctIndex: 2,
      explanation: '"Gut" is irregular: gut → besser → am besten.'
    }
  },

  // ==========================================
  // UNIT 3: B1 INDEPENDENT FLUENCY (RULES 17 - 24)
  // ==========================================
  {
    id: 'rule-17-subordinate-kick',
    ruleNumber: 17,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 17: Subordinate Clauses & The Verb-Kick Rule (Nebensätze)',
    summary: 'Subordinate conjunctions (weil, dass, obwohl, wenn, damit, als, ob) kick the conjugated verb to the very end of the clause.',
    englishContrast: 'In English: "because I want to sleep" (verb next to subject). In German: "weil ich schlafen WILL" (verb kicked to end).',
    ruleFormula: 'Main Clause + , [Subordinate Conjunction] + Subject + ... + [CONJUGATED VERB AT THE VERY END]',
    explanation: 'The verb-kick is German\'s most defining sentence structure. Whenever you use weil (because), dass (that), obwohl (although), wenn (if/when), damit (so that), or ob (whether), place a comma and send the conjugated verb to the end.',
    examples: [
      { de: 'Ich lerne Deutsch, weil ich in München arbeiten möchte.', en: 'I learn German because I want to work in Munich.', note: 'möchte kicked to the end' },
      { de: 'Ich weiß, dass du morgen keine Zeit hast.', en: 'I know that you have no time tomorrow.', note: 'hast kicked to the end' },
      { de: 'Obwohl es regnet, gehen wir spazieren.', en: 'Although it rains, we go for a walk.', note: 'When Nebensatz comes first, main verb is Pos 2' }
    ],
    pitfall: 'If the subordinate clause comes FIRST, the main clause begins immediately with its conjugated verb: "Weil es regnet, BLEIBE ich zu Hause".',
    quiz: {
      question: 'Which sentence correctly translates "I stay home because I am sick"?',
      options: [
        'Ich bleibe zu Hause, weil ich bin krank.',
        'Ich bleibe zu Hause, weil ich krank bin.',
        'Ich bleibe zu Hause, weil bin ich krank.'
      ],
      correctIndex: 1,
      explanation: 'The subordinate conjunction "weil" kicks the conjugated verb "bin" to the end: "...weil ich krank bin".'
    }
  },
  {
    id: 'rule-18-aduso-conjunctions',
    ruleNumber: 18,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 18: Coordinating Conjunctions: ADUSO (Zero Position)',
    summary: 'The ADUSO conjunctions (aber, denn, und, sondern, oder) do NOT kick the verb! They occupy Position 0.',
    englishContrast: 'Unlike "weil", the conjunction "denn" means "because" but keeps standard Position 2 word order!',
    ruleFormula: 'Clause 1 + , [aber / denn / und / sondern / oder] (Position 0) + Subject (Position 1) + Verb (Position 2)',
    explanation: 'Remember the acronym ADUSO: Aber (but), Denn (because/for), Und (and), Sondern (rather/on the contrary), Oder (or). These words act as mathematical zero: normal word order follows them.',
    examples: [
      { de: 'Ich bleibe zu Hause, denn ich bin krank.', en: 'I stay home, because I am sick.', note: 'denn = Position 0, ich = 1, bin = 2' },
      { de: 'Er spricht Deutsch, aber er macht noch Fehler.', en: 'He speaks German, but he still makes mistakes.', note: 'aber = Position 0' },
      { de: 'Ich trinke keinen Kaffee, sondern ich trinke Tee.', en: 'I don\'t drink coffee, but rather I drink tea.', note: 'sondern used after negative' }
    ],
    pitfall: 'Compare: "weil ich krank BIN" (verb at end) vs "denn ich BIN krank" (verb in Position 2)!',
    quiz: {
      question: 'Complete with correct word order: "Ich gehe nicht ins Kino, denn _____."',
      options: [
        'ich habe keine Zeit',
        'ich keine Zeit habe',
        'habe ich keine Zeit'
      ],
      correctIndex: 0,
      explanation: '"Denn" is an ADUSO conjunction (Position 0), followed by standard word order: Subject (1) + Verb (2).'
    }
  },
  {
    id: 'rule-19-relative-clauses',
    ruleNumber: 19,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 19: Relative Clauses in All 4 Cases (Relativsätze)',
    summary: 'Relative pronouns (der, die, das, den, dem, dessen...) match the gender of the noun, but their case comes from their role in the clause.',
    englishContrast: 'English uses "who", "which", or "that" regardless of case. German declines the relative pronoun through Nominativ, Akkusativ, Dativ, and Genitiv.',
    ruleFormula: 'Noun + , [Relative Pronoun matching gender & clause case] + ... + [CONJUGATED VERB AT THE END]',
    explanation: 'Relative clauses are subordinate clauses: always precede them with a comma and send their verb to the end. The pronoun matches the gender of the preceding noun, but takes the case required by the action inside the relative clause.',
    examples: [
      { de: 'Das ist der Kollege, den ich gestern getroffen habe.', en: 'That is the colleague whom I met yesterday.', note: 'masculine + Akkusativ = den' },
      { de: 'Die Frau, der ich geholfen habe, ist sehr nett.', en: 'The woman whom I helped is very kind.', note: 'helfen requires Dativ: feminine = der' },
      { de: 'Das Kind, dessen Fahrrad gestohlen wurde, weint.', en: 'The child whose bicycle was stolen is crying.', note: 'Genitiv possessive: dessen' }
    ],
    pitfall: 'Dativ plural relative pronoun is "denen" (not "den"): "die Freunde, mit denen ich reise".',
    quiz: {
      question: 'Complete: "Der Mann, _____ dort drüben steht, ist mein Chef."',
      options: [
        'der',
        'den',
        'dem'
      ],
      correctIndex: 0,
      explanation: 'The man is the subject (Nominativ) of the relative clause "steht dort drüben", so the pronoun is "der".'
    }
  },
  {
    id: 'rule-20-adjective-endings',
    ruleNumber: 20,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 20: Adjective Endings Demystified (Adjektivdeklination)',
    summary: 'Adjectives before nouns take endings. With definite articles (der/die/das), endings are mostly -e or -en. With indefinite articles (ein), they reflect gender.',
    englishContrast: 'English adjectives never change ("a red car", "the red cars"). German adjectives decline with case and gender.',
    ruleFormula: 'Definite Article: Nom/Akk singular = mostly -e; all Dativ/Genitiv & Plural = strictly -en',
    explanation: 'A great shortcut: In Dativ, Genitiv, and ALL Plurals, adjective endings are ALWAYS -en (mit dem neuEN Auto, die altEN Freunde). With "ein", the adjective takes the missing article ending in Nominativ: ein altER Mann (masc -er), ein neuES Auto (neut -es).',
    examples: [
      { de: 'der nette Mann, die schöne Stadt, das neue Auto', en: 'the nice man, the beautiful city, the new car', note: 'Definite Nominativ takes -e' },
      { de: 'mit dem freundlichen Kellner', en: 'with the friendly waiter', note: 'Dativ always takes -en' },
      { de: 'ein guter Freund, eine kalte Nacht, ein warmes Brötchen', en: 'a good friend, a cold night, a warm roll', note: 'Indefinite reflects gender' }
    ],
    pitfall: 'Predicative adjectives after "sein" or "werden" take NO ending: "Das Auto ist neu" (not "neues").',
    quiz: {
      question: 'Which ending fits: "Ich trinke gern kalt_____ Wasser (das Wasser - Akkusativ without article)"?',
      options: [
        'kalte',
        'kaltes',
        'kalten'
      ],
      correctIndex: 1,
      explanation: 'Without an article, the adjective must signal neuter gender (-es): "kaltes Wasser".'
    }
  },
  {
    id: 'rule-21-infinitive-zu',
    ruleNumber: 21,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 21: Infinitives with "zu" (Infinitivsätze)',
    summary: 'When a second verb depends on an adjective, noun, or verb of intention, it is preceded by "zu" at the end of the clause.',
    englishContrast: 'English uses "to" right before the verb ("It is important to learn"). German sends "zu [Verb]" to the very end.',
    ruleFormula: 'Main Clause + , [es ist wichtig / ich habe Lust / ich hoffe] + ... + [zu + INFINITIVE at the end]',
    explanation: 'Infinitives with "zu" do not require a subject in the subordinate clause because the subject is already stated in the main clause. With separable verbs, "zu" is inserted in the middle: "einZUzahlen", "anZUkomen".',
    examples: [
      { de: 'Es ist wichtig, jeden Tag Deutsch zu üben.', en: 'It is important to practice German every day.', note: 'zu + üben at the end' },
      { de: 'Ich habe keine Zeit, ins Kino zu gehen.', en: 'I have no time to go to the cinema.', note: 'Noun + zu + Verb' },
      { de: 'Vergiss nicht, das Fenster zuzumachen.', en: 'Don\'t forget to close the window.', note: 'Separable verb: zu-zu-machen' }
    ],
    pitfall: 'Modal verbs (können, müssen, wollen) and perception verbs (sehen, hören) NEVER take "zu"!',
    quiz: {
      question: 'How do you say "I plan to arrive on Monday" using the separable verb "ankommen"?',
      options: [
        'Ich plane, am Montag ankommen zu.',
        'Ich plane, am Montag zu ankommen.',
        'Ich plane, am Montag anzukommen.'
      ],
      correctIndex: 2,
      explanation: 'Separable verbs sandwich "zu" between the prefix and stem: an + zu + kommen = anzukommen.'
    }
  },
  {
    id: 'rule-22-vorgangspassiv',
    ruleNumber: 22,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 22: The Passive Voice: Das Vorgangspassiv',
    summary: 'The passive voice shifts focus from the person acting to the action itself: werden (Position 2) + Partizip II (at the end).',
    englishContrast: 'English uses "to be" ("The car is repaired"). German strictly uses "WERDEN" ("Das Auto WIRD repariert").',
    ruleFormula: 'Subject + [werden conjugated in Position 2] + (von + Dativ for agent) + [PARTIZIP II at the end]',
    explanation: 'In German, the auxiliary for the active process of passive is WERDEN (wird, werden, wurde). If you want to name the agent performing the action, use "von + Dativ".',
    examples: [
      { de: 'Das Auto wird heute repariert.', en: 'The car is being repaired today.', note: 'wird + repariert' },
      { de: 'Das Haus wurde 1920 gebaut.', en: 'The house was built in 1920.', note: 'Past passive: wurde + gebaut' },
      { de: 'Die E-Mail wird vom Chef verschickt.', en: 'The email is sent by the boss.', note: 'von + dem = vom Chef' }
    ],
    pitfall: 'Never say "Das Haus ist gebaut" to describe the building action. "Ist gebaut" is Zustandspassiv (state); "wird gebaut" is the action.',
    quiz: {
      question: 'How do you say "The bills are paid" (as an action)?',
      options: [
        'Die Rechnungen sind bezahlt.',
        'Die Rechnungen werden bezahlt.',
        'Die Rechnungen haben bezahlt.'
      ],
      correctIndex: 1,
      explanation: 'The action of the passive voice uses "werden": "Die Rechnungen werden bezahlt".'
    }
  },
  {
    id: 'rule-23-genitiv-case',
    ruleNumber: 23,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 23: The Genitiv Case & Prepositions (wegen, während, trotz)',
    summary: 'Genitiv denotes possession (whose?) and is governed by prepositions like wegen (because of), während (during), trotz (in spite of).',
    englishContrast: 'English uses apostrophe-s ("the doctor\'s car") or "of". German changes articles: des (+s/es), der, des (+s/es), der.',
    ruleFormula: 'Articles: Masculine/Neuter = DES (+s/es on noun) | Feminine/Plural = DER | Prepositions: wegen, während, trotz, anstatt',
    explanation: 'Genitiv is common in formal writing, news, and official correspondence. Masculine and neuter nouns add an "-s" or "-es" ending: "des Tages", "des Jahres".',
    examples: [
      { de: 'Das ist das Auto des Chefs.', en: 'That is the boss\'s car.', note: 'des Chefs = possession' },
      { de: 'Wegen des schlechten Wetters fiel der Flug aus.', en: 'Because of the bad weather the flight was cancelled.', note: 'wegen + Genitiv' },
      { de: 'Während der Konferenz gab es viele Fragen.', en: 'During the conference there were many questions.', note: 'während + Genitiv' }
    ],
    pitfall: 'Short nouns ending in -s, -z, -sch add "-es" in Genitiv: "des Hauses", "des Arztes".',
    quiz: {
      question: 'Complete: "Trotz _____ Regens (der Regen) gingen wir spazieren."',
      options: [
        'dem',
        'des',
        'den'
      ],
      correctIndex: 1,
      explanation: '"Trotz" governs the Genitiv case. Masculine Genitiv is "des": "trotz des Regens".'
    }
  },
  {
    id: 'rule-24-praeteritum-narrative',
    ruleNumber: 24,
    unit: 'Unit 3: B1 Independence',
    level: 'B1',
    title: 'Rule 24: Narrative Written Past Tense (Das Präteritum)',
    summary: 'The simple past tense used in written texts, novels, newspapers, and biographies.',
    englishContrast: 'English uses simple past in both speech and writing. German reserves Präteritum mainly for formal written storytelling.',
    ruleFormula: 'Regular: Stem + -te, -test, -te, -ten, -tet, -ten (machte, lernte) | Irregular: Vowel change + no ending for ich/er (ging, fuhr, sah)',
    explanation: 'While you talk to friends using Perfekt ("Ich habe geschlafen"), newspapers and books will write: "Er schlief ein und träumte".',
    examples: [
      { de: 'Es war einmal ein König, der in einem Schloss lebte.', en: 'Once upon a time there was a king who lived in a castle.', note: 'Fairy tale narrative' },
      { de: 'Die Bundeskanzlerin reiste gestern nach Paris.', en: 'The Federal Chancellor traveled to Paris yesterday.', note: 'Journalistic report' },
      { de: 'Plötzlich ging das Licht aus.', en: 'Suddenly the light went out.', note: 'Novel narrative' }
    ],
    pitfall: 'Irregular verbs in Präteritum have ZERO ending for "ich" and "er/sie/es": "ich ging", "er ging" (never "ich gingte").',
    quiz: {
      question: 'What is the Präteritum of "sehen" for "er"?',
      options: [
        'er sehte',
        'er sah',
        'er saht'
      ],
      correctIndex: 1,
      explanation: '"Sehen" is irregular in Präteritum: er sah.'
    }
  },

  // ==========================================
  // UNIT 4: B2 WORKPLACE & VANTAGE (RULES 25 - 32)
  // ==========================================
  {
    id: 'rule-25-konjunktiv-polite',
    ruleNumber: 25,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 25: Konjunktiv II for Politeness & Hypotheticals',
    summary: 'Subjunctive formulas (hätte, wäre, würde + Infinitiv) used for diplomatic professional requests and unreal conditions.',
    englishContrast: 'English uses "would/could". In German, using direct imperative in business sounds rude; Konjunktiv II is required.',
    ruleFormula: 'könnten + Infinitiv (Polite request) | würde + Infinitiv (General hypothetical) | hätte / wäre (Subjunctive states)',
    explanation: 'In German workplace culture, direct commands ("Geben Sie mir das!") are avoided. Instead say: "Könnten Sie mir das bitte zusenden?" or "Ich hätte eine kurze Frage".',
    examples: [
      { de: 'Könnten Sie mir bitte kurz behilflich sein?', en: 'Could you kindly assist me for a moment?', note: 'Diplomatic workplace request' },
      { de: 'Wenn ich mehr Zeit hätte, würde ich öfter reisen.', en: 'If I had more time, I would travel more often.', note: 'Hypothetical condition' },
      { de: 'Ich wäre Ihnen sehr dankbar.', en: 'I would be very grateful to you.', note: 'Formal correspondence standard' }
    ],
    pitfall: 'Don\'t use "würde haben" or "würde sein". Use the direct forms "hätte" and "wäre".',
    quiz: {
      question: 'How do you politely ask a manager for a moment of their time?',
      options: [
        'Haben Sie Zeit für mich!',
        'Hätten Sie kurz Zeit für mich?',
        'Sie würden Zeit haben für mich.'
      ],
      correctIndex: 1,
      explanation: '"Hätten Sie kurz Zeit..." is the standard diplomatic professional request.'
    }
  },
  {
    id: 'rule-26-past-hypotheticals',
    ruleNumber: 26,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 26: Past Hypotheticals in Konjunktiv II (Unreal Past)',
    summary: 'Expressing past regrets or counterfactual conditions: hätte / wäre + Partizip II.',
    englishContrast: 'English says "If I had known, I would have come". German says "Hätte ich das gewusst, WÄRE ich GEKOMMEN".',
    ruleFormula: 'Wenn + Subject + ... + [Partizip II + hätte/wäre] + , + [wäre/hätte + Subject + Partizip II]',
    explanation: 'To discuss missed opportunities in negotiations or personal life, combine the Konjunktiv II of the auxiliary (hätte or wäre) with the past participle.',
    examples: [
      { de: 'Hätte ich das gewusst, wäre ich früher losgefahren.', en: 'Had I known that, I would have set off earlier.', note: 'Inversion conditional' },
      { de: 'Wir hätten das Projekt schneller abschließen können.', en: 'We could have finished the project faster.', note: 'Double infinitive with modal' },
      { de: 'Wenn du mich angerufen hättest, hätte ich dir geholfen.', en: 'If you had called me, I would have helped you.', note: 'Counterfactual past' }
    ],
    pitfall: 'Verbs of movement still use "wäre" (not "hätte"): "wäre gefahren", "wäre gekommen".',
    quiz: {
      question: 'Complete: "Wenn das Wetter besser gewesen wäre, _____ wir spazieren gegangen."',
      options: [
        'hätten',
        'wären',
        'würden'
      ],
      correctIndex: 1,
      explanation: 'Gehen is a verb of movement, requiring "wäre": "wären wir spazieren gegangen".'
    }
  },
  {
    id: 'rule-27-two-part-connectors',
    ruleNumber: 27,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 27: Two-Part Connectors (Doppelkonnektoren)',
    summary: 'Correlative connectors for elegant argumentation: sowohl...als auch, weder...noch, zwar...aber, nicht nur...sondern auch.',
    englishContrast: 'English uses "both...and" and "neither...nor". German requires precise correlative word ordering.',
    ruleFormula: 'sowohl X als auch Y (both X and Y) | weder X noch Y (neither X nor Y) | zwar X, aber Y (admittedly X, but Y)',
    explanation: 'Two-part connectors give structure to professional arguments, presentations, and written negotiations.',
    examples: [
      { de: 'Ich spreche sowohl Deutsch als auch Englisch fließend.', en: 'I speak both German and English fluently.', note: 'sowohl... als auch' },
      { de: 'Er trinkt weder Kaffee noch Tee.', en: 'He drinks neither coffee nor tea.', note: 'weder... noch negates both' },
      { de: 'Das Angebot ist zwar teuer, aber von hervorragender Qualität.', en: 'The offer is admittedly expensive, but of excellent quality.', note: 'zwar... aber concession' }
    ],
    pitfall: '"Weder ... noch" carries negative meaning by itself; do NOT add "nicht" or "kein"!',
    quiz: {
      question: 'Which connector means "not only ... but also"?',
      options: [
        'weder ... noch',
        'nicht nur ... sondern auch',
        'zwar ... aber'
      ],
      correctIndex: 1,
      explanation: '"Nicht nur ... sondern auch" expresses "not only ... but also".'
    }
  },
  {
    id: 'rule-28-zustandspassiv',
    ruleNumber: 28,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 28: Zustandspassiv vs Vorgangspassiv (State vs Process)',
    summary: 'Vorgangspassiv (werden + Partizip II) describes an action occurring. Zustandspassiv (sein + Partizip II) describes the resulting state.',
    englishContrast: 'English uses "The door is closed" for both. German strictly distinguishes "wird geschlossen" (action) from "ist geschlossen" (state).',
    ruleFormula: 'Action: Das Geschäft WIRD um 20 Uhr geschlossen | State: Das Geschäft IST geschlossen (it is already closed)',
    explanation: 'If a worker is actively locking the door, it is Vorgangspassiv (*wird geschlossen*). If you arrive at midnight and the door is locked, it is Zustandspassiv (*ist geschlossen*).',
    examples: [
      { de: 'Die Straße wird repariert. (Workers are actively paving it)', en: 'The road is being repaired.', note: 'Process / Action' },
      { de: 'Die Straße ist repariert. (The work is finished)', en: 'The road is repaired.', note: 'Completed State' },
      { de: 'Der Vertrag ist bereits unterschrieben.', en: 'The contract is already signed.', note: 'Resulting state' }
    ],
    pitfall: 'Don\'t mix them up in contracts: "Der Vertrag wird geschlossen" (is being made) vs "ist geschlossen" (is concluded).',
    quiz: {
      question: 'Which sentence describes a finished state?',
      options: [
        'Die Tür wird geöffnet.',
        'Die Tür ist geöffnet.',
        'Die Tür öffnet sich.'
      ],
      correctIndex: 1,
      explanation: '"Die Tür ist geöffnet" uses sein + Partizip II (Zustandspassiv), describing the state of being open.'
    }
  },
  {
    id: 'rule-29-passive-substitutes',
    ruleNumber: 29,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 29: Passive Substitutes (Passiversatzformen)',
    summary: 'Sophisticated alternatives to the passive voice: sein + zu + Infinitiv, sich lassen + Infinitiv, and adjectives in -bar/-lich.',
    englishContrast: 'English says "This problem can be solved". German workplace register prefers "Dieses Problem LÄSST SICH LÖSEN".',
    ruleFormula: 'sich lassen + Infinitiv = can be done | sein + zu + Infinitiv = must/can be done | Adjective in -bar = solvable/achievable',
    explanation: 'German technical and business texts avoid excessive "werden" by using passive substitutes: "Das lässt sich leicht einrichten" (That can easily be arranged).',
    examples: [
      { de: 'Das Problem lässt sich einfach lösen.', en: 'The problem can be solved simply.', note: 'sich lassen + Infinitiv' },
      { de: 'Der Bericht ist bis Freitag abzugeben.', en: 'The report must be handed in by Friday.', note: 'sein + zu + Infinitiv (obligation)' },
      { de: 'Diese Datei ist nicht lesbar.', en: 'This file is not readable.', note: '-bar suffix' }
    ],
    pitfall: '"Sein + zu + Infinitiv" implies duty or necessity: "Die Aufgaben sind zu erledigen" = must be done.',
    quiz: {
      question: 'What does "Das lässt sich machen" mean?',
      options: [
        'That must be made.',
        'That can be done / arranged.',
        'That makes itself.'
      ],
      correctIndex: 1,
      explanation: '"Sich lassen + Infinitiv" expresses feasibility/possibility: "That can be done".'
    }
  },
  {
    id: 'rule-30-nomen-verb-verbindungen',
    ruleNumber: 30,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 30: Noun-Verb Collocations (Nomen-Verb-Verbindungen)',
    summary: 'Fixed idiomatic pairings of an abstract noun and a functional verb that replace simple everyday verbs in business German.',
    englishContrast: 'English says "to consider". Business German prefers "in Betracht ziehen" rather than "überlegen".',
    ruleFormula: 'Abstract Noun with Preposition + Functional Verb (in Betracht ziehen, zur Verfügung stehen, eine Entscheidung treffen)',
    explanation: 'Mastering these collocations is what separates intermediate speakers from true professional communicators in Germany, Austria, and Switzerland.',
    examples: [
      { de: 'Wir müssen diese Option in Betracht ziehen.', en: 'We must take this option into consideration.', note: '= überlegen / prüfen' },
      { de: 'Ich stehe Ihnen für Fragen gerne zur Verfügung.', en: 'I am gladly at your disposal for questions.', note: 'Formal closing standard' },
      { de: 'Wir haben eine wichtige Entscheidung getroffen.', en: 'We made an important decision.', note: '= entscheiden' }
    ],
    pitfall: 'Do NOT translate literally: you "treffen" a decision (not "machen" a decision)!',
    quiz: {
      question: 'Which verb collocates with "zur Verfügung" (to be at disposal)?',
      options: [
        'haben',
        'stehen',
        'nehmen'
      ],
      correctIndex: 1,
      explanation: 'The fixed collocation is "zur Verfügung stehen" (to be available/at disposal).'
    }
  },
  {
    id: 'rule-31-participle-attributes',
    ruleNumber: 31,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 31: Participle Attributes as Adjectives (Partizip I & II)',
    summary: 'Turning verbs into descriptive adjectives: Partizip I (Infinitive + -d for ongoing action) and Partizip II (completed action).',
    englishContrast: 'English uses "-ing" ("the crying baby") and past participles ("the signed contract"). German declines both with adjective endings.',
    ruleFormula: 'Partizip I (active/ongoing): Infinitiv + d + Ending (das schlafende Kind) | Partizip II (completed): Partizip II + Ending (der unterschriebene Vertrag)',
    explanation: 'Partizip I is formed by taking the full infinitive and adding -d: schlafen → schlafend- → das schlafende Kind. Partizip II describes a completed process: reparieren → repariert- → das reparierte Auto.',
    examples: [
      { de: 'die steigenden Energiekosten', en: 'the rising energy costs', note: 'Partizip I (ongoing rise)' },
      { de: 'der soeben unterschriebene Arbeitsvertrag', en: 'the just-signed employment contract', note: 'Partizip II (completed action)' },
      { de: 'die überraschende Nachricht', en: 'the surprising news', note: 'Partizip I' }
    ],
    pitfall: 'Participle adjectives take full standard adjective endings: "mit steigendEN Preisen" (Dativ plural -en).',
    quiz: {
      question: 'How do you say "the working population" using Partizip I of "arbeiten"?',
      options: [
        'die gearbeitete Bevölkerung',
        'die arbeitende Bevölkerung',
        'die arbeitung Bevölkerung'
      ],
      correctIndex: 1,
      explanation: 'Partizip I takes the infinitive + d + feminine ending -e: "die arbeitende Bevölkerung".'
    }
  },
  {
    id: 'rule-32-prepositional-verbs',
    ruleNumber: 32,
    unit: 'Unit 4: B2 Workplace',
    level: 'B2',
    title: 'Rule 32: Verbs with Fixed Prepositional Objects',
    summary: 'Hundreds of German verbs require a specific preposition and a specific case (warten auf + Akk, sich interessieren für + Akk, teilnehmen an + Dat).',
    englishContrast: 'English says "to wait for". German says "warten auf + Akkusativ". English "to take part in" is German "teilnehmen an + Dativ".',
    ruleFormula: 'Verb + Fixed Preposition + Case (e.g. warten auf + Akk, sich freuen auf + Akk, sich ärgern über + Akk)',
    explanation: 'Never translate prepositions literally between English and German. Always learn verbs with their preposition and case: "warten auf (+Akk)", "denken an (+Akk)", "gehören zu (+Dat)".',
    examples: [
      { de: 'Ich warte seit einer Stunde auf den Bus.', en: 'I have been waiting for the bus for an hour.', note: 'warten auf + Akkusativ' },
      { de: 'Er nimmt an der Konferenz teil.', en: 'He is participating in the conference.', note: 'teilnehmen an + Dativ' },
      { de: 'Wir freuen uns über deinen Besuch.', en: 'We are delighted about your visit.', note: 'freuen über + Akkusativ (past/present event)' }
    ],
    pitfall: 'For things, use da-compounds: "Ich warte darauf" (I wait for it), "Ich denke daran" (I think of it).',
    quiz: {
      question: 'Which preposition and case does "warten" (to wait) require?',
      options: [
        'warten für + Akkusativ',
        'warten auf + Akkusativ',
        'warten nach + Dativ'
      ],
      correctIndex: 1,
      explanation: 'The fixed German structure is "warten auf + Akkusativ": "Ich warte auf dich".'
    }
  },

  // ==========================================
  // UNIT 5: C1 & C2 OPERATIONAL MASTERY (RULES 33 - 40)
  // ==========================================
  {
    id: 'rule-33-modal-particles',
    ruleNumber: 33,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 33: Modal Particles: The Secret to Native Fluency',
    summary: 'Untranslatable emotional nuance markers (doch, mal, halt, ja, eben, wohl, bloß, eh) that native Germans use in nearly every spoken sentence.',
    englishContrast: 'Grammatically correct German sounds cold or robotic without particles. Adding "mal" or "doch" injects warmth and natural stance.',
    ruleFormula: 'Particles sit in the middle of the sentence (Mittelfeld) and convey tone, obviousness, or consensus',
    explanation: 'Mastering particles is the single biggest indicator of near-native C1/C2 fluency: doch (reassurance/countering), halt/eben (stoic acceptance), ja (shared obviousness), mal (softening invitations).',
    examples: [
      { de: 'Das weißt du doch ganz genau!', en: 'You know that, surely! / But you already know that!', note: 'doch reminds of shared truth' },
      { de: 'Da kann man halt nichts machen.', en: 'That\'s just how it is, nothing can be done.', note: 'halt signals calm acceptance' },
      { de: 'Komm mal kurz her.', en: 'Just come over here for a second.', note: 'mal turns command into warm invitation' }
    ],
    pitfall: 'Particles are never stressed in spoken German. They blend smoothly into the rhythm of the sentence.',
    quiz: {
      question: 'Which particle softens a command into a friendly invitation?',
      options: [
        'nicht',
        'mal',
        'sehr'
      ],
      correctIndex: 1,
      explanation: '"mal" softens imperatives into friendly, polite requests: "Schau mal!".'
    }
  },
  {
    id: 'rule-34-nominal-style',
    ruleNumber: 34,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 34: The Nominal Style (Nominalstil)',
    summary: 'The signature register of German newspapers, law, politics, and technical business: compressing whole verbal clauses into compound nouns.',
    englishContrast: 'English prefers active verbs. High-register German replaces verbs with derived nouns, Genitive modifiers, and prepositions.',
    ruleFormula: 'Verbal: Weil X passierte... → Nominal: Aufgrund des Eintretens von X...',
    explanation: 'In academic papers and executive briefs, verbal style (*Verbalstil*) is considered colloquial. C1 writers condense clauses using nominalized verbs and prepositions like "aufgrund", "infolge", "zwecks", and "hinsichtlich".',
    examples: [
      { de: 'Verbal: Bevor wir abreisen, müssen wir prüfen... | Nominal: Vor unserer Abreise ist eine Prüfung erforderlich.', en: 'Before our departure, an inspection is required.', note: 'Concise nominal transformation' },
      { de: 'Aufgrund des rasanten Preisanstiegs sind Sparmaßnahmen unabdingbar.', en: 'Due to the rapid price increase, austerity measures are indispensable.', note: 'High-register business style' },
      { de: 'Zwecks Optimierung der Arbeitsabläufe...', en: 'For the purpose of optimizing workflows...', note: 'Formal administrative style' }
    ],
    pitfall: 'Do not use Nominalstil in casual spoken conversation—it will sound like you are reading a legal decree out loud!',
    quiz: {
      question: 'What is the nominal style equivalent of "weil die Nachfrage sinkt"?',
      options: [
        'Infolge der sinkenden Nachfrage',
        'Weil Nachfrage sinken tut',
        'Nachdem Nachfrage gesunken ist'
      ],
      correctIndex: 0,
      explanation: '"Infolge der sinkenden Nachfrage" compresses the subordinate causal clause into a prepositional noun phrase.'
    }
  },
  {
    id: 'rule-35-discourse-markers',
    ruleNumber: 35,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 35: High-Register Discourse Markers',
    summary: 'Precision argumentative connectors: infolgedessen, wenngleich, nichtsdestotrotz, geschweige denn, inwiefern, demnach.',
    englishContrast: 'Instead of repetitive "aber" or "und", C1 German utilizes subtle transitional logic markers.',
    ruleFormula: 'Adverbial connectors (nichtsdestotrotz, infolgedessen) take Position 1, triggering verb inversion in Position 2',
    explanation: 'These connectors are the lifeblood of high-level German intellectual debate. They establish nuanced relationships of concession (*wenngleich*), causality (*infolgedessen*), or impossibility (*geschweige denn*).',
    examples: [
      { de: 'Die Rahmenbedingungen waren schwierig; nichtsdestotrotz erreichten wir das Ziel.', en: 'Framework conditions were difficult; nonetheless we achieved the target.', note: 'Concessive connector' },
      { de: 'Er beherrscht nicht einmal die Grundlagen, geschweige denn komplexe Systeme.', en: 'He does not even master the basics, let alone complex systems.', note: 'geschweige denn = let alone' },
      { de: 'Wenngleich erhebliche Risiken verbleiben, überwiegen die Chancen.', en: 'Even though substantial risks remain, the opportunities outweigh them.', note: 'wenngleich + verb kick' }
    ],
    pitfall: 'Adverbs like "infolgedessen" trigger inversion: "Infolgedessen MÜSSEN wir..." (not "Infolgedessen wir müssen").',
    quiz: {
      question: 'Which connector translates to "let alone / not to mention"?',
      options: [
        'infolgedessen',
        'geschweige denn',
        'wenngleich'
      ],
      correctIndex: 1,
      explanation: '"Geschweige denn" means "let alone" or "not to mention".'
    }
  },
  {
    id: 'rule-36-konjunktiv-one',
    ruleNumber: 36,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 36: Konjunktiv I in Indirect Speech (Indirekte Rede)',
    summary: 'The grammatical mood used by journalists and news anchors to report statements neutrally without endorsing their truth.',
    englishContrast: 'English uses "He said that he was...". German uses Konjunktiv I ("Er sagte, er SEI...") to distance the reporter from the claim.',
    ruleFormula: 'Verb Stem + -e, -est, -e, -en, -et, -en (sein → er sei / haben → er habe / können → er könne)',
    explanation: 'When reading *Der Spiegel*, *Die Zeit*, or *FAZ*, you will constantly see Konjunktiv I. It signals: "These are the speaker\'s claims, not my verified facts."',
    examples: [
      { de: 'Der Minister erklärte, die Lage sei unter Kontrolle.', en: 'The minister explained that the situation was under control.', note: 'sei = Konjunktiv I of sein' },
      { de: 'Sie behauptete, sie habe von nichts gewusst.', en: 'She claimed she had known nothing about it.', note: 'habe = Konjunktiv I of haben' },
      { de: 'Der Sprecher betonte, man müsse die Reformen vorantreiben.', en: 'The spokesperson emphasized that reforms had to be pushed forward.', note: 'müsse = Konjunktiv I of müssen' }
    ],
    pitfall: 'If Konjunktiv I is identical to the indicative (like "sie haben"), replace it with Konjunktiv II ("sie hätten").',
    quiz: {
      question: 'What is the Konjunktiv I of "sein" for "er"?',
      options: [
        'er ist',
        'er wäre',
        'er sei'
      ],
      correctIndex: 2,
      explanation: 'The 3rd person singular Konjunktiv I of "sein" is "er sei".'
    }
  },
  {
    id: 'rule-37-extended-participles',
    ruleNumber: 37,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 37: Extended Participial Attributes (Erweiterte Partizipien)',
    summary: 'Nesting an entire complex descriptive phrase between an article and its noun.',
    englishContrast: 'English puts long descriptions behind the noun ("the contract, which was signed yesterday by both parties"). German puts it ALL between "the" and "contract"!',
    ruleFormula: 'Article + [Adverbs + Objects + Prepositions + Participle] + Noun',
    explanation: 'In German academic and legal prose, entire relative clauses are packed into the space between the article and noun: "der [gestern von beiden Vertragspartnern in Berlin unterzeichnete] Vertrag".',
    examples: [
      { de: 'die [für das gesamte Unternehmen richtungsweisende] Entscheidung', en: 'the decision, which is trend-setting for the entire company', note: 'Nested Partizip I attribute' },
      { de: 'der [im vergangenen Quartal sprunghaft gestiegene] Umsatz', en: 'the turnover, which leaped in the previous quarter', note: 'Nested Partizip II attribute' },
      { de: 'die [von der Regierung beschlossenen] Maßnahmen', en: 'the measures approved by the government', note: 'Standard bureaucratic formula' }
    ],
    pitfall: 'When translating, jump straight to the noun at the end of the bracket, then read backwards to understand the modifier.',
    quiz: {
      question: 'Where is the main noun located in an extended participial attribute?',
      options: [
        'Before the article',
        'Right at the end of the participial phrase',
        'In Position 2 of the sentence'
      ],
      correctIndex: 1,
      explanation: 'The main noun closes the attribute bracket at the end: "die [langsam steigenden] PREISE".'
    }
  },
  {
    id: 'rule-38-subjective-modals',
    ruleNumber: 38,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 38: Subjective Meanings of Modal Verbs (Epistemische Modalität)',
    summary: 'Using modal verbs to express degree of certainty, rumor (sollen), or unverified assertion (wollen).',
    englishContrast: 'English says "He claims to have won". German says "Er WILL gewonnen haben". English "He is said to be rich" is "Er SOLL reich sein".',
    ruleFormula: 'wollen + Perfekt Infinitiv (Subject claims something about himself) | sollen + Infinitiv (Rumor / Others claim about him)',
    explanation: 'Modal verbs do not just express ability or obligation. At C1/C2, they express epistemic modality: "Er dürfte gleich kommen" (He will probably arrive soon), "Sie will den Dieb gesehen haben" (She claims she saw the thief).',
    examples: [
      { de: 'Er will Millionär sein. (He claims it himself, but we doubt it)', en: 'He claims to be a millionaire.', note: 'wollen = subjective personal claim' },
      { de: 'Er soll sehr reich sein. (Rumor has it)', en: 'He is said to be very rich.', note: 'sollen = hearsay / rumor' },
      { de: 'Das dürfte kein Problem sein. (High probability)', en: 'That should likely be no problem.', note: 'dürfte = high probability' }
    ],
    pitfall: '"Er will es nicht gewusst haben" does not mean he did not want to know; it means "He claims he did not know".',
    quiz: {
      question: 'What does "Sie soll eine berühmte Schauspielerin sein" mean?',
      options: [
        'She must become an actress.',
        'Rumor has it she is a famous actress.',
        'She wants to be an actress.'
      ],
      correctIndex: 1,
      explanation: '"Sollen" in subjective meaning expresses hearsay: "She is said to be a famous actress".'
    }
  },
  {
    id: 'rule-39-tekamolo',
    ruleNumber: 39,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 39: The TeKaMoLo Word Order Rule',
    summary: 'The natural, native sequence of adverbials in complex German sentences: Temporal (When?) → Kausal (Why?) → Modal (How?) → Lokal (Where?).',
    englishContrast: 'English often puts location before time ("I went to Berlin yesterday"). German strictly prefers Time first: TeKaMoLo!',
    ruleFormula: 'Te (Temporal: When?) → Ka (Kausal: Why?) → Mo (Modal: How?) → Lo (Lokal: Where?)',
    explanation: 'When multiple adverbial phrases appear in the middle of a German sentence, arrange them according to the TeKaMoLo sequence to sound completely natural.',
    examples: [
      { de: 'Ich fahre [heute] (Te) [wegen des Streiks] (Ka) [mit dem Fahrrad] (Mo) [zur Arbeit] (Lo).', en: 'I am riding today because of the strike by bicycle to work.', note: 'Perfect TeKaMoLo sequence' },
      { de: 'Wir sind [letztes Jahr] (Te) [aus Freude] (Ka) [spontan] (Mo) [nach Italien] (Lo) gereist.', en: 'We traveled last year out of joy spontaneously to Italy.', note: 'Te-Ka-Mo-Lo' },
      { de: 'Er arbeitet [morgens] (Te) [konzentriert] (Mo) [im Büro] (Lo).', en: 'He works mornings with concentration in the office.', note: 'Te-Mo-Lo' }
    ],
    pitfall: 'Never put location before time in the middle of a sentence (avoid: "Ich fahre nach Berlin morgen"). Always: "Ich fahre morgen nach Berlin".',
    quiz: {
      question: 'In TeKaMoLo, which adverbial element comes first in sequence?',
      options: [
        'Lokal (Where)',
        'Temporal (When)',
        'Modal (How)'
      ],
      correctIndex: 1,
      explanation: 'Temporal (When?) comes first: Te → Ka → Mo → Lo.'
    }
  },
  {
    id: 'rule-40-false-friends-register',
    ruleNumber: 40,
    unit: 'Unit 5: C1 Nuance',
    level: 'C1',
    title: 'Rule 40: False Friends & Pragmatic Register Nuances',
    summary: 'Avoiding deceptive English-German false cognates and navigating formal (Siezen) vs informal (Duzen) register nuances.',
    englishContrast: 'English speakers frequently mistake Gift (poison), Chef (boss), bekommen (receive), spenden (donate), and aktuell (current).',
    ruleFormula: 'Watch out for deceptive historical cognates with completely flipped semantic meanings',
    explanation: 'At C1/C2, true fluency means avoiding embarrassing semantic traps: "Gift" is poison (not a present), "Chef" is your manager (not a restaurant cook), and "bekommen" means to get/receive (not to become).',
    examples: [
      { de: 'das Gift (poison / venom) ≠ das Geschenk (present)', en: 'Vorsicht vor dem tödlichen Gift!', note: 'Never say you brought a host "Gift"!' },
      { de: 'der Chef (boss / supervisor) ≠ der Koch (culinary chef)', en: 'Mein Chef hat das Projekt genehmigt.', note: 'Chef = company manager' },
      { de: 'bekommen (to receive) ≠ werden (to become)', en: 'Ich habe gestern eine E-Mail bekommen.', note: 'bekommen = receive' }
    ],
    pitfall: '"Aktuell" means "current / up to date" (never use it to mean "actual" or "real", which is "tatsächlich").',
    quiz: {
      question: 'How do you say "I am receiving a gift" without false friends?',
      options: [
        'Ich werde ein Gift.',
        'Ich bekomme ein Geschenk.',
        'Ich spende ein Gift.'
      ],
      correctIndex: 1,
      explanation: '"Bekommen" means receive, and "Geschenk" means gift: "Ich bekomme ein Geschenk".'
    }
  }
];
