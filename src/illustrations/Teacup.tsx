import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Teacup({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M50,110 A50,50 0 0,0 150,110" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M60,75 Q80,55 100,75 Q120,55 140,75" fill="none" stroke={complementary} strokeWidth="2" opacity="0.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="70" cy="130" r="3" fill={dark} opacity="0.3" />
        <circle cx="100" cy="135" r="3" fill={dark} opacity="0.3" />
        <circle cx="130" cy="130" r="3" fill={dark} opacity="0.3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="50" y1="110" x2="150" y2="110" stroke={dark} strokeWidth="2" />
      </g>
    </svg>
  );
}