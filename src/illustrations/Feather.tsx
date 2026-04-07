import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Feather({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M50,160 Q100,60 160,40" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1={65 + i * 20} y1={140 - i * 22}
            x2={85 + i * 20} y2={120 - i * 22}
            stroke={dark} strokeWidth="2" opacity="0.5" strokeLinecap="round"
          />
        ))}
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <path d="M55,155 Q110,80 155,45" fill="none" stroke={complementary} strokeWidth="1.5" strokeDasharray="4 6" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="160" cy="40" r="6" fill={complementary} opacity="0.6" />
      </g>
    </svg>
  );
}