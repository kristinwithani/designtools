import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Glasses({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="72" cy="100" r="28" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="128" cy="100" r="28" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <path d="M100,100 Q100,92 100,100" fill="none" stroke={dark} strokeWidth="2" />
        <line x1="44" y1="95" x2="30" y2="88" stroke={dark} strokeWidth="2" strokeLinecap="round" />
        <line x1="156" y1="95" x2="170" y2="88" stroke={dark} strokeWidth="2" strokeLinecap="round" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="72" cy="100" r="12" fill={complementary} opacity="0.15" />
        <circle cx="128" cy="100" r="12" fill={complementary} opacity="0.15" />
      </g>
    </svg>
  );
}