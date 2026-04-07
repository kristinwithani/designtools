import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordCreateMore({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="160" cy="45" r="18" fill={complementary} opacity="0.25" />
      </g>
      <text x="100" y="105" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="28" fill={dark} letterSpacing="-0.5">CREATE</text>
      <text x="100" y="135" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="28" fill={dark} letterSpacing="-0.5">MORE</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <line x1="45" y1="155" x2="155" y2="155" stroke={primary} strokeWidth="2" opacity="0.3" />
      </g>
    </svg>
  );
}