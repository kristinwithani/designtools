import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Lock({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="65" y="95" width="70" height="55" rx="6" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M78,95 L78,72 Q78,50 100,50 Q122,50 122,72 L122,95" fill="none" stroke={dark} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="118" r="8" fill={dark} opacity="0.3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="100" y1="122" x2="100" y2="135" stroke={complementary} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}