import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function WordBeStill({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <text x="100" y="90" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="18" fill={dark} opacity="0.4" letterSpacing="6">BE</text>
      <text x="100" y="125" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif" fontWeight="700" fontSize="34" fill={dark} letterSpacing="2">STILL</text>
      <g style={getShapeStyle(0, animationParams, animated)}>
        <line x1="55" y1="145" x2="145" y2="145" stroke={primary} strokeWidth="1.5" opacity="0.25" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <line x1="55" y1="152" x2="115" y2="152" stroke={complementary} strokeWidth="1" opacity="0.2" />
      </g>
    </svg>
  );
}