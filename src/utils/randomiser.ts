import { illustrations, type IllustrationDef } from '../illustrations';

const WORDS = [
  'CREATE MORE', 'EXPLORE', 'PATIENCE', 'WONDER', 'WARMTH',
  'ACCESS', 'FREEDOM', 'FIND YOUR WAY', 'DREAM BIG', 'GROUND',
  'DISCOVER', 'CLARITY', 'CONNECT', 'GROW', 'TIME',
  'CAPTURE', 'WISDOM', 'MYSTERY', 'PROTECT', 'IGNITE',
  'RADIATE', 'BALANCE', 'FOCUS', 'BLOOM', 'ASPIRE',
  'REFLECT', 'UNLOCK', 'SHINE', 'BREATHE', 'IMAGINE',
];

export interface CardData {
  id: string;
  illustration: IllustrationDef;
  word: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateCards(count = 9): CardData[] {
  const shuffledIllustrations = shuffle(illustrations);
  const shuffledWords = shuffle(WORDS);
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    illustration: shuffledIllustrations[i % shuffledIllustrations.length],
    word: shuffledWords[i % shuffledWords.length],
  }));
}