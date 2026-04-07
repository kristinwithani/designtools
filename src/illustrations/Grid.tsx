import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Grid({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        {[0, 1, 2, 3].map(row =>
          [0, 1, 2, 3].map(col => (
            <rect
              key={`${row}-${col}`}
              x={50 + col * 28}
              y={50 + row * 28}
              width="22"
              height="22"
              rx="3"
              fill={primary}
              opacity={(row + col) % 2 === 0 ? 0.35 : 0.15}
            />
          ))
        )}
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x={50 + 0 * 28} y={50 + 0 * 28} width="22" height="22" rx="3" fill={complementary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <rect x={50 + 3 * 28} y={50 + 3 * 28} width="22" height="22" rx="3" fill={dark} opacity="0.3" />
      </g>
    </svg>
  );
}