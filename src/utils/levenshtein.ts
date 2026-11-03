export function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  const s1 = a.toLowerCase().trim();
  const s2 = b.toLowerCase().trim();

  for (let i = 0; i <= s1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= s2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= s1.length; i++) {
    for (let j = 1; j <= s2.length; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[s1.length][s2.length];
}

export function cleanGermanText(str: string): string {
  return str
    .toLowerCase()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“»«]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface WordMatch {
  word: string;
  status: 'correct' | 'near' | 'missed';
  matchedWith?: string;
}

export function compareSpokenToTarget(target: string, spoken: string): {
  overallScore: number;
  wordMatches: WordMatch[];
  matchedCount: number;
  totalWords: number;
} {
  const cleanTargetWords = cleanGermanText(target).split(' ').filter(Boolean);
  const cleanSpokenWords = cleanGermanText(spoken).split(' ').filter(Boolean);

  if (cleanTargetWords.length === 0) {
    return { overallScore: 0, wordMatches: [], matchedCount: 0, totalWords: 0 };
  }

  const matches: WordMatch[] = [];
  let correctMatches = 0;

  cleanTargetWords.forEach((targetWord, index) => {
    const spokenWord = cleanSpokenWords[index];

    if (!spokenWord) {
      matches.push({ word: targetWord, status: 'missed' });
      return;
    }

    // Direct match
    if (targetWord === spokenWord) {
      matches.push({ word: targetWord, status: 'correct', matchedWith: spokenWord });
      correctMatches += 1;
      return;
    }

    // German phonetic equivalents: ss <-> ß, ae <-> ä, oe <-> ö, ue <-> ü
    const normalizedTarget = targetWord
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss');
    const normalizedSpoken = spokenWord
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss');

    if (normalizedTarget === normalizedSpoken) {
      matches.push({ word: targetWord, status: 'correct', matchedWith: spokenWord });
      correctMatches += 1;
      return;
    }

    const dist = levenshteinDistance(targetWord, spokenWord);
    if (dist <= 2 || (targetWord.length > 5 && dist <= 3)) {
      matches.push({ word: targetWord, status: 'near', matchedWith: spokenWord });
      correctMatches += 0.75;
    } else {
      matches.push({ word: targetWord, status: 'missed', matchedWith: spokenWord });
    }
  });

  const overallScore = Math.min(100, Math.round((correctMatches / cleanTargetWords.length) * 100));

  return {
    overallScore,
    wordMatches: matches,
    matchedCount: Math.round(correctMatches),
    totalWords: cleanTargetWords.length,
  };
}
