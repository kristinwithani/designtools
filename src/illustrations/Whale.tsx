import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export default function Whale({ primary, dark, complementary, animated = false, animationParams = DEFAULT_ANIMATION_PARAMS }: IllustrationProps) {
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <g style={getShapeStyle(0, animationParams, animated)}>
        <path d="M40,100 Q100,55 160,100 Q100,140 40,100 Z" fill={primary} opacity="0.35" />
      </g>
      <g style={getShapeStyle(1, animationParams, animated)}>
        <path d="M155,95 Q175,75 170,100 Q175,125 155,105" fill={dark} opacity="0.25" />
      </g>
      <g style={getShapeStyle(2, animationParams, animated)}>
        <circle cx="65" cy="95" r="4" fill={dark} opacity="0.5" />
      </g>
      <g style={getShapeStyle(3, animationParams, animated)}>
        <path d="M85,70 Q88,55 92,62" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
        <path d="M95,67 Q98,52 102,58" fill="none" stroke={complementary} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
      </g>
    </svg>
  );
}