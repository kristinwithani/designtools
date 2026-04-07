import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Clock({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="100" r="55" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
          <line
            key={angle}
            x1={100 + 48 * Math.cos(angle * Math.PI / 180)}
            y1={100 + 48 * Math.sin(angle * Math.PI / 180)}
            x2={100 + 52 * Math.cos(angle * Math.PI / 180)}
            y2={100 + 52 * Math.sin(angle * Math.PI / 180)}
            stroke={dark} strokeWidth={angle % 90 === 0 ? 2.5 : 1} opacity="0.4"
          />
        ))}
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <line x1="100" y1="100" x2="100" y2="62" stroke={dark} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="100" y1="100" x2="128" y2="100" stroke={complementary} strokeWidth="2" strokeLinecap="round" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="100" r="4" fill={dark} opacity="0.4" />
      </g>
    </svg>
  );
}