import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordStartHere({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points="30,170 42,170 36,160" fill={complementary} opacity="0.35" />
      </g>
      <text x="100" y="95" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="26" fill={dark} letterSpacing="2">START</text>
      <text x="100" y="125" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="26" fill={dark} letterSpacing="2">HERE</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="165" cy="40" r="10" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.2" />
      </g>
    </svg>
  );
}