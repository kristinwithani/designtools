import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Heart({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="78" cy="82" r="30" fill={primary} opacity="0.45" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <circle cx="122" cy="82" r="30" fill={primary} opacity="0.45" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <polygon points="100,150 55,95 145,95" fill={dark} opacity="0.15" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="100" cy="95" r="8" fill={complementary} opacity="0.6" />
      </g>
    </svg>
  );
}