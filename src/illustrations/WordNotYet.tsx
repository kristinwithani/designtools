import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordNotYet({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="108" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="42" fill={dark} letterSpacing="-1">NOT YET</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <line x1="35" y1="68" x2="165" y2="68" stroke={primary} strokeWidth="1" opacity="0.2" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="150" y="135" width="14" height="14" rx="2" fill={complementary} opacity="0.2" transform="rotate(15 157 142)" />
      </g>
    </svg>
  );
}