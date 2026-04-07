import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function CrystalBall({ primary, dark, light, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <circle cx="100" cy="100" r="55" fill="none" stroke={primary} strokeWidth="2.5" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M75,80 Q90,60 105,80 Q120,100 100,115 Q80,100 75,80" fill="none" stroke={dark} strokeWidth="1.5" opacity="0.5" />
        <path d="M95,90 Q110,75 120,95" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.4" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="80" cy="75" r="3" fill={complementary} opacity="0.5" />
        <circle cx="115" cy="90" r="2.5" fill={complementary} opacity="0.4" />
        <circle cx="90" cy="110" r="2" fill={dark} opacity="0.3" />
        <circle cx="110" cy="70" r="1.5" fill={complementary} opacity="0.3" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <rect x="72" y="155" width="56" height="8" rx="4" fill={dark} opacity="0.3" />
      </g>
    </svg>
  );
}