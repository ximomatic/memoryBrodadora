export interface GameScore {
  id: string;
  nickname: string;
  pairs: number;
  time: number;
  score: number;
  date: string;
}

export interface Card {
  id: string;
  imageIndex: number;
  isFlipped: boolean;
  isMatched: boolean;
}

/**
 * Baraja un array usando el algoritmo Fisher-Yates
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...(array ?? [])];
  for (let i = (shuffled?.length ?? 0) - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j] ?? shuffled[i], shuffled[i] ?? shuffled[j]];
  }
  return shuffled;
}

/**
 * Genera las cartas del juego
 */
export function generateCards(numPairs: number): Card[] {
  const pairs = Math.min(Math.max(numPairs ?? 2, 2), 20);
  const cards: Card[] = [];
  
  for (let i = 0; i < pairs; i++) {
    const imageIndex = i + 1;
    cards.push(
      {
        id: `card-${i}-a`,
        imageIndex,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `card-${i}-b`,
        imageIndex,
        isFlipped: false,
        isMatched: false,
      }
    );
  }
  
  return shuffleArray(cards);
}

/**
 * Calcula la puntuación basándose en parejas y tiempo
 * Fórmula: (parejas × 100) - tiempo_en_segundos
 * Mínimo: 0
 */
export function calculateScore(pairs: number, timeInSeconds: number): number {
  const basePairs = pairs ?? 0;
  const baseTime = timeInSeconds ?? 0;
  const baseScore = basePairs * 100;
  const timePenalty = baseTime;
  const finalScore = Math.max(baseScore - timePenalty, 0);
  return finalScore;
}

/**
 * Formatea segundos a MM:SS
 */
export function formatTime(seconds: number): string {
  const secs = seconds ?? 0;
  const minutes = Math.floor(secs / 60);
  const remainingSeconds = secs % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

/**
 * Guarda una puntuación en localStorage
 */
export function saveScore(score: GameScore): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingScoresJson = localStorage?.getItem('memoryGameScores') ?? '[]';
    const existingScores: GameScore[] = JSON.parse(existingScoresJson);
    const scores = Array.isArray(existingScores) ? existingScores : [];
    
    scores.push(score);
    scores.sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0));
    
    localStorage?.setItem('memoryGameScores', JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving score:', error);
  }
}

/**
 * Obtiene todas las puntuaciones del localStorage
 */
export function getScores(): GameScore[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const scoresJson = localStorage?.getItem('memoryGameScores') ?? '[]';
    const scores = JSON.parse(scoresJson);
    return Array.isArray(scores) ? scores : [];
  } catch (error) {
    console.error('Error loading scores:', error);
    return [];
  }
}

/**
 * Obtiene el top N de puntuaciones
 */
export function getTopScores(limit: number = 10): GameScore[] {
  const scores = getScores();
  return scores?.slice(0, limit) ?? [];
}

/**
 * Genera un ID único
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
