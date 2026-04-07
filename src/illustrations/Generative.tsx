import type { IllustrationProps } from './types';
import { getShapeStyle, DEFAULT_ANIMATION_PARAMS } from '../utils/animationUtils';

export interface ShapeConfig {
  type: string;
  props: Record<string, unknown>;
}

export interface CompositionConfig {
  shapes: ShapeConfig[];
  text?: { content: string; fontSize: number; y: number; lines?: string[] };
}

// --- Shape primitives ---

function renderShape(
  shape: ShapeConfig,
  colors: { primary: string; dark: string; light: string; complementary: string; tertiary: string }
) {
  const { type, props } = shape;
  const colorMap: Record<string, string> = {
    primary: colors.primary,
    dark: colors.dark,
    light: colors.light,
    complementary: colors.complementary,
    tertiary: colors.tertiary,
  };
  const resolve = (v: unknown) => (typeof v === 'string' && v in colorMap ? colorMap[v] : v);

  switch (type) {
    case 'circle':
      return <circle cx={props.cx as number} cy={props.cy as number} r={props.r as number} fill={resolve(props.fill) as string} stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />;
    case 'ring':
      return <circle cx={props.cx as number} cy={props.cy as number} r={props.r as number} fill="none" stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} strokeDasharray={props.dash as string} />;
    case 'rect':
      return <rect x={props.x as number} y={props.y as number} width={props.w as number} height={props.h as number} rx={props.rx as number} fill={resolve(props.fill) as string} opacity={props.opacity as number} transform={props.transform as string} />;
    case 'line':
      return <line x1={props.x1 as number} y1={props.y1 as number} x2={props.x2 as number} y2={props.y2 as number} stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} strokeLinecap="round" />;
    case 'triangle':
      return <polygon points={props.points as string} fill={resolve(props.fill) as string} opacity={props.opacity as number} />;
    case 'arc':
      return <path d={props.d as string} fill="none" stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />;
    case 'dots': {
      const dots = props.dots as { cx: number; cy: number; r: number }[];
      return <>{dots.map((d, i) => <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill={resolve(props.fill) as string} opacity={props.opacity as number} />)}</>;
    }
    case 'polygon':
      return <polygon points={props.points as string} fill={resolve(props.fill) as string} stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />;
    case 'cross':
      return <>
        <line x1={props.cx as number} y1={(props.cy as number) - (props.size as number)} x2={props.cx as number} y2={(props.cy as number) + (props.size as number)} stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />
        <line x1={(props.cx as number) - (props.size as number)} y1={props.cy as number} x2={(props.cx as number) + (props.size as number)} y2={props.cy as number} stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />
      </>;
    case 'wave':
      return <path d={props.d as string} fill="none" stroke={resolve(props.stroke) as string} strokeWidth={props.strokeWidth as number} opacity={props.opacity as number} />;
    default:
      return null;
  }
}

interface GenerativeProps extends IllustrationProps {
  composition: CompositionConfig;
  tertiary: string;
  useTertiary: boolean;
}

export default function Generative({
  primary, dark, light, complementary,
  animated = false, animationParams = DEFAULT_ANIMATION_PARAMS,
  composition,
  tertiary,
  useTertiary,
}: GenerativeProps) {
  // When tertiary is disabled, tertiary shapes fall back to complementary
  const resolvedTertiary = useTertiary ? tertiary : complementary;
  const colors = { primary, dark, light, complementary, tertiary: resolvedTertiary };

  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {composition.shapes.map((shape, i) => (
        <g key={i} style={getShapeStyle(i, animationParams, animated)}>
          {renderShape(shape, colors)}
        </g>
      ))}
      {composition.text && (
        composition.text.lines ? (
          composition.text.lines.map((line, i) => (
            <text
              key={i}
              x="100"
              y={composition.text!.y + i * (composition.text!.fontSize * 1.2)}
              textAnchor="middle"
              fontFamily="'Space Grotesk', sans-serif"
              fontWeight="700"
              fontSize={composition.text!.fontSize}
              fill={dark}
              letterSpacing={composition.text!.fontSize > 24 ? '-0.5' : '2'}
            >
              {line}
            </text>
          ))
        ) : (
          <text
            x="100"
            y={composition.text.y}
            textAnchor="middle"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="700"
            fontSize={composition.text.fontSize}
            fill={dark}
            letterSpacing={composition.text.fontSize > 24 ? '-0.5' : '2'}
          >
            {composition.text.content}
          </text>
        )
      )}
    </svg>
  );
}