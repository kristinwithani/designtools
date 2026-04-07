import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Spiral({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M100,100 Q120,80 130,100 Q140,130 110,135 Q70,140 65,105 Q60,60 100,55 Q150,50 155,100 Q160,160 100,165" fill="none" stroke={primary} strokeWidth="2.5" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="100" cy="100" r="6" fill={complementary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="165" r="4" fill={dark} opacity="0.3" />
      </g>
    </svg>
  );
}