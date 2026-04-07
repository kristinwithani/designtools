import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordExplore({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="25" y="55" width="4" height="90" rx="2" fill={primary} opacity="0.25" />
      </g>
      <text x="100" y="112" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="32" fill={dark} letterSpacing="4">EXPLORE</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="170" cy="155" r="5" fill={complementary} opacity="0.35" />
        <circle cx="155" cy="162" r="3" fill={complementary} opacity="0.2" />
      </g>
    </svg>
  );
}