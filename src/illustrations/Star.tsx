import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Star({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30) * Math.PI / 180;
          return (
            <line
              key={i}
              x1="100" y1="100"
              x2={100 + 60 * Math.cos(angle)}
              y2={100 + 60 * Math.sin(angle)}
              stroke={primary} strokeWidth="1.5" opacity="0.4"
            />
          );
        })}
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon
          points={Array.from({ length: 6 }, (_, i) => {
            const a = (i * 60 - 90) * Math.PI / 180;
            return `${100 + 35 * Math.cos(a)},${100 + 35 * Math.sin(a)}`;
          }).join(' ')}
          fill="none" stroke={dark} strokeWidth="2"
        />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="100" r="10" fill={complementary} opacity="0.5" />
      </g>
    </svg>
  );
}