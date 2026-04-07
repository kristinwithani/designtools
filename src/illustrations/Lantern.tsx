import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Lantern({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <rect x="70" y="50" width="60" height="90" rx="12" fill={primary} opacity="0.5" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
          <line
            key={angle}
            x1="100" y1="95"
            x2={100 + 55 * Math.cos(angle * Math.PI / 180)}
            y2={95 + 55 * Math.sin(angle * Math.PI / 180)}
            stroke={dark} strokeWidth="1.5" opacity="0.3"
          />
        ))}
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="100" cy="95" r="15" fill={complementary} opacity="0.6" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <rect x="85" y="48" width="30" height="6" rx="3" fill={dark} />
      </g>
    </svg>
  );
}