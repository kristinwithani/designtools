import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Envelope({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points="100,50 150,100 100,150 50,100" fill={primary} opacity="0.4" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="100,70 135,100 100,130 65,100" fill="none" stroke={dark} strokeWidth="2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <line x1="40" y1="100" x2="160" y2="100" stroke={complementary} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="6" fill={dark} opacity="0.3" />
      </g>
    </svg>
  );
}