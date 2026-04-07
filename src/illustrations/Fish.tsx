import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Fish({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <ellipse cx="95" cy="100" rx="50" ry="25" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="145,100 170,80 170,120" fill={dark} opacity="0.3" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="70" cy="95" r="5" fill={dark} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <path d="M85,85 Q95,80 105,85" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.5" />
        <path d="M85,115 Q95,120 105,115" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.5" />
      </g>
    </svg>
  );
}