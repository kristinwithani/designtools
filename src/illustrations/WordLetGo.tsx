import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordLetGo({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="50" cy="50" r="22" fill={primary} opacity="0.15" />
      </g>
      <text x="100" y="105" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="20" fill={dark} letterSpacing="2">LET GO</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M70,130 Q100,145 130,130" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.3" />
      </g>
    </svg>
  );
}