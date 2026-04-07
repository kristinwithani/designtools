import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Lighter({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="75" y="70" width="50" height="80" rx="8" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="82" y="72" width="36" height="20" rx="4" fill={dark} opacity="0.2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <path d="M95,70 Q92,50 100,40 Q108,50 105,70" fill={complementary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="120" r="3" fill={dark} opacity="0.2" />
        <line x1="88" y1="110" x2="112" y2="110" stroke={dark} strokeWidth="1" opacity="0.15" />
      </g>
    </svg>
  );
}