import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordTrustIt({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="155" cy="75" r="15" fill="none" stroke={primary} strokeWidth="1.5" opacity="0.2" />
      </g>
      <text x="100" y="112" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="28" fill={dark} letterSpacing="3">TRUST IT</text>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <line x1="55" y1="135" x2="145" y2="135" stroke={complementary} strokeWidth="1.5" opacity="0.25" />
        <circle cx="55" cy="135" r="2.5" fill={complementary} opacity="0.35" />
      </g>
    </svg>
  );
}