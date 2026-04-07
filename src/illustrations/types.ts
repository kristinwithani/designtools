import type { AnimationParams } from '../utils/animationUtils';

export interface IllustrationProps {
  primary: string;
  dark: string;
  light: string;
  complementary: string;
  animated?: boolean;
  animationParams?: AnimationParams;
}