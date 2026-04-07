import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordDreamBig({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points="35,40 50,40 42.5,28" fill={primary} opacity="0.3" />
      </g>
      <text x="100" y="95" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="22" fill={dark} letterSpacing="1">DREAM</text>
      <text x="100" y="130" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="40" fill={dark} letterSpacing="-1">BIG</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="165" cy="160" r="12" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.3" />
      </g>
    </svg>
  );
}