import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Candle({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="82" y="60" width="36" height="100" rx="3" fill={primary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <ellipse cx="100" cy="55" rx="28" ry="18" fill="none" stroke={dark} strokeWidth="2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <polygon points="100,30 88,55 112,55" fill={complementary} opacity="0.6" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="82" y1="95" x2="118" y2="95" stroke={dark} strokeWidth="1" opacity="0.2" />
        <line x1="82" y1="115" x2="118" y2="115" stroke={dark} strokeWidth="1" opacity="0.2" />
        <line x1="82" y1="135" x2="118" y2="135" stroke={dark} strokeWidth="1" opacity="0.2" />
      </g>
    </svg>
  );
}