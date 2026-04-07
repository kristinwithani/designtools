import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Butterfly({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <ellipse cx="75" cy="85" rx="28" ry="22" fill={primary} opacity="0.4" transform="rotate(-20 75 85)" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <ellipse cx="125" cy="85" rx="28" ry="22" fill={primary} opacity="0.4" transform="rotate(20 125 85)" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <ellipse cx="80" cy="115" rx="18" ry="15" fill={complementary} opacity="0.3" transform="rotate(-10 80 115)" />
        <ellipse cx="120" cy="115" rx="18" ry="15" fill={complementary} opacity="0.3" transform="rotate(10 120 115)" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="100" y1="70" x2="100" y2="140" stroke={dark} strokeWidth="2" />
        <circle cx="100" cy="70" r="3" fill={dark} opacity="0.5" />
      </g>
    </svg>
  );
}