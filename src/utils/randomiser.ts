import { generateComposition } from './compositionGenerator';
import type { CompositionConfig } from '../illustrations/Generative';

export interface CardData {
  id: string;
  composition: CompositionConfig;
  name: string;
}

export function generateCards(count = 9): CardData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${Date.now()}-${i}`,
    composition: generateComposition(),
    name: `composition-${i + 1}`,
  }));
}