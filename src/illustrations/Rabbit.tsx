import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Rabbit({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="120" r="35" fill={primary} opacity="0.35" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <ellipse cx="82" cy="65" rx="10" ry="30" fill="none" stroke={dark} strokeWidth="2" />
        <ellipse cx="118" cy="65" rx="10" ry="30" fill="none" stroke={dark} strokeWidth="2" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <ellipse cx="82" cy="65" rx="5" ry="18" fill={complementary} opacity="0.3" />
        <ellipse cx="118" cy="65" rx="5" ry="18" fill={complementary} opacity="0.3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="90" cy="112" r="3" fill={dark} opacity="0.4" />
        <circle cx="110" cy="112" r="3" fill={dark} opacity="0.4" />
        <circle cx="100" cy="125" r="4" fill={complementary} opacity="0.5" />
      </g>
    </svg>
  );
}