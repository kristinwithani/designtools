import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Plant({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="145" r="28" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="100" cy="105" r="20" fill={primary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="72" r="14" fill={dark} opacity="0.3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="48" r="8" fill={complementary} opacity="0.6" />
      </g>
      <line x1="100" y1="40" x2="100" y2="173" stroke={dark} strokeWidth="1.5" opacity="0.15" />
    </svg>
  );
}