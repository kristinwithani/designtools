import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Pencil({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="90" y="40" width="20" height="100" rx="2" fill={primary} opacity="0.45" transform="rotate(15 100 90)" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <polygon points="96,140 104,140 100,160" fill={dark} opacity="0.4" transform="rotate(15 100 150)" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <rect x="90" y="38" width="20" height="12" rx="1" fill={complementary} opacity="0.5" transform="rotate(15 100 44)" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <line x1="95" y1="60" x2="95" y2="130" stroke={dark} strokeWidth="1" opacity="0.15" transform="rotate(15 95 95)" />
        <line x1="105" y1="60" x2="105" y2="130" stroke={dark} strokeWidth="1" opacity="0.15" transform="rotate(15 105 95)" />
      </g>
    </svg>
  );
}