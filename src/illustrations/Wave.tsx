import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Wave({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M30,90 Q65,55 100,90 Q135,125 170,90" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M30,110 Q65,75 100,110 Q135,145 170,110" fill="none" stroke={dark} strokeWidth="2" opacity="0.3" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <path d="M30,130 Q65,95 100,130 Q135,165 170,130" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.25" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="90" r="4" fill={dark} opacity="0.3" />
        <circle cx="100" cy="110" r="3" fill={complementary} opacity="0.3" />
      </g>
    </svg>
  );
}