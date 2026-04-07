import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Key({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="70" cy="80" r="30" fill="none" stroke={primary} strokeWidth="3" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polyline points="100,80 130,80 140,70 150,80 160,70 170,80" fill="none" stroke={dark} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <rect x="120" y="110" width="8" height="8" fill={complementary} opacity="0.6" />
        <rect x="140" y="120" width="6" height="6" fill={complementary} opacity="0.4" />
        <rect x="155" y="105" width="10" height="10" fill={complementary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <circle cx="70" cy="80" r="12" fill={dark} opacity="0.15" />
      </g>
    </svg>
  );
}