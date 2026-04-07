import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Anchor({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <line x1="100" y1="30" x2="100" y2="170" stroke={dark} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M50,120 A50,50 0 0,0 150,120" fill="none" stroke={primary} strokeWidth="2.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        {[0, 1, 2, 3].map(row => (
          [0, 1, 2].map(col => (
            <circle key={`${row}-${col}`} cx={130 + col * 14} cy={50 + row * 14} r="2.5" fill={complementary} opacity="0.4" />
          ))
        ))}
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="30" r="7" fill={primary} opacity="0.5" />
      </g>
    </svg>
  );
}