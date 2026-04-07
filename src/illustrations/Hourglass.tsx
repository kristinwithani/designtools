import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Hourglass({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <polygon points="60,40 140,40 100,100" fill={primary} opacity="0.6" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="60,160 140,160 100,100" fill={dark} opacity="0.4" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        {[55, 75, 95, 115, 135].map(y => (
          <line key={y} x1="45" y1={y} x2="155" y2={y} stroke={complementary} strokeWidth="1" opacity="0.3" />
        ))}
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="5" fill={complementary} />
      </g>
    </svg>
  );
}