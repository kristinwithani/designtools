import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Book({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="45" y="55" width="55" height="90" rx="3" fill={primary} opacity="0.4" transform="rotate(-8 72 100)" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <rect x="100" y="55" width="55" height="90" rx="3" fill={dark} opacity="0.25" transform="rotate(8 127 100)" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        {[0, 1, 2, 3].map(i => (
          <line key={i} x1="60" y1={75 + i * 16} x2="88" y2={73 + i * 16} stroke={dark} strokeWidth="1" opacity="0.3" />
        ))}
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="100" y1="50" x2="100" y2="150" stroke={complementary} strokeWidth="2" />
      </g>
    </svg>
  );
}