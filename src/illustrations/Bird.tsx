import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Bird({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M40,110 Q100,50 160,110" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M60,105 Q100,70 140,105" fill="none" stroke={dark} strokeWidth="1.5" strokeDasharray="5 4" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="95" r="12" fill={complementary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="100" y1="107" x2="100" y2="145" stroke={dark} strokeWidth="1.5" />
        <line x1="90" y1="145" x2="110" y2="145" stroke={dark} strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}