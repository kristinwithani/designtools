import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Cat({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="105" r="40" fill={primary} opacity="0.35" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="70,70 60,40 85,65" fill={dark} opacity="0.3" />
        <polygon points="130,70 140,40 115,65" fill={dark} opacity="0.3" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="85" cy="95" r="4" fill={dark} opacity="0.5" />
        <circle cx="115" cy="95" r="4" fill={dark} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <path d="M60,130 Q100,160 140,130" fill="none" stroke={complementary} strokeWidth="2" opacity="0.4" />
      </g>
    </svg>
  );
}