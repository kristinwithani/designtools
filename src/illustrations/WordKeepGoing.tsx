import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordKeepGoing({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="95" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="16" fill={dark} opacity="0.45" letterSpacing="5">KEEP</text>
      <text x="100" y="128" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="28" fill={dark} letterSpacing="1">GOING</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <line x1="140" y1="60" x2="165" y2="48" stroke={complementary} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        <line x1="150" y1="65" x2="170" y2="56" stroke={primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="30" y="150" width="18" height="4" rx="2" fill={primary} opacity="0.2" />
      </g>
    </svg>
  );
}