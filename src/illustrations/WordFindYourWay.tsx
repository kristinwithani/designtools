import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordFindYourWay({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="82" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="16" fill={dark} opacity="0.5" letterSpacing="3">FIND</text>
      <text x="100" y="110" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="16" fill={dark} opacity="0.5" letterSpacing="3">YOUR</text>
      <text x="100" y="138" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="30" fill={dark} letterSpacing="-0.5">WAY</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M155,50 L170,35" stroke={complementary} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <path d="M162,50 L170,42" stroke={primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="40" cy="165" r="8" fill={primary} opacity="0.15" />
      </g>
    </svg>
  );
}