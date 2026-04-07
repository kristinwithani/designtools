import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordSlowDown({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="88" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="14" fill={dark} opacity="0.4" letterSpacing="8">SLOW</text>
      <text x="100" y="125" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="38" fill={dark} letterSpacing="-1">DOWN</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M45,155 Q100,170 155,155" fill="none" stroke={primary} strokeWidth="2" opacity="0.2" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="35" cy="50" r="6" fill={complementary} opacity="0.2" />
      </g>
    </svg>
  );
}