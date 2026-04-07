import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Diamond({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points="100,35 160,100 100,165 40,100" fill={primary} opacity="0.3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="100,55 142,100 100,145 58,100" fill="none" stroke={dark} strokeWidth="2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <line x1="100" y1="55" x2="100" y2="145" stroke={complementary} strokeWidth="1.5" opacity="0.4" />
        <line x1="58" y1="100" x2="142" y2="100" stroke={complementary} strokeWidth="1.5" opacity="0.4" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <polygon points="100,75 120,100 100,125 80,100" fill={dark} opacity="0.1" />
      </g>
    </svg>
  );
}