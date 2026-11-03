import { UserProgress, CEFRLevel } from '../types';

const STORAGE_KEY = 'sprechendeutsch_user_progress_v1';

const DEFAULT_PROGRESS: UserProgress = {
  xp: 120,
  streakDays: 3,
  completedScenarios: [],
  learnedVocabIds: ['c1-1', 'mp-doch', 'ff-gift', 'cult-feierabend'],
  perfectPronunciations: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentLevel: 'A1',
};

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch (e) {
    console.error('Error loading user progress:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving user progress:', e);
  }
}
