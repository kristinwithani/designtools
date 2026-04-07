import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordWonder({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="112" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="36" fill={dark} letterSpacing="-1">WONDER</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="170" cy="65" r="4" fill={complementary} opacity="0.4" />
        <circle cx="160" cy="55" r="2.5" fill={complementary} opacity="0.25" />
        <circle cx="175" cy="52" r="1.5" fill={primary} opacity="0.3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <line x1="40" y1="135" x2="90" y2="135" stroke={primary} strokeWidth="1.5" opacity="0.2" />
      </g>
    </svg>
  );
}