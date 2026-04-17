import { cubeFaceColors } from "../utils/scenemath";

interface VoxelCubeProps {
  screenX: number;
  screenY: number;
  size: number;
  color: string;
  visible?: boolean;
  strokeWidth?: number;
  topLightness?: number;
  leftDarkness?: number;
  strokeDarkness?: number;
  strokeDesaturation?: number;
  flickerTransition?: number;
}

export default function VoxelCube({
  screenX, screenY, size, color, visible = true,
  strokeWidth = 0.5, topLightness = 12, leftDarkness = 12,
  strokeDarkness = 20, strokeDesaturation = 10, flickerTransition = 0.15,
}: VoxelCubeProps) {
  const colors = cubeFaceColors(color, topLightness, leftDarkness, strokeDarkness, strokeDesaturation);

  const w = size;
  const half = w / 2;

  // All 6 faces of the cube — 3 visible (top/left/right) + 3 hidden (bottom/back-left/back-right)
  // Each is a solid-filled quadrilateral. Hidden faces are coincident with visible ones in 2D iso projection,
  // so rendering them as solid backing ensures each cube has every side filled.
  const topFace = `${w / 2},0 ${w},${half / 2} ${w / 2},${half} 0,${half / 2}`;
  const leftFace = `0,${half / 2} ${w / 2},${half} ${w / 2},${half * 2} 0,${half + half / 2}`;
  const rightFace = `${w / 2},${half} ${w},${half / 2} ${w},${half + half / 2} ${w / 2},${half * 2}`;
  // Hidden faces (projected at same hexagon positions — solid-filled for completeness):
  const bottomFace = `0,${half + half / 2} ${w / 2},${half * 2} ${w},${half + half / 2} ${w / 2},${half}`;
  const backLeftFace = topFace;  // projects to same region; solid fill
  const backRightFace = topFace; // projects to same region; solid fill

  const silhouette = `${w / 2},0 ${w},${half / 2} ${w},${half + half / 2} ${w / 2},${half * 2} 0,${half + half / 2} 0,${half / 2}`;

  return (
    <svg
      className="absolute"
      style={{
        left: screenX,
        top: screenY,
        opacity: visible ? 1 : 0,
        transition: `opacity ${flickerTransition}s`,
      }}
      width={w}
      height={half * 2}
      viewBox={`0 0 ${w} ${half * 2}`}
      shapeRendering="geometricPrecision"
    >
      {/* Solid silhouette base — ensures entire cube footprint is filled */}
      <polygon points={silhouette} fill={colors.right} fillOpacity={1} />

      {/* Hidden 3 faces (solid-filled backing for a fully enclosed cube) */}
      <polygon points={bottomFace} fill={colors.left} fillOpacity={1} />
      <polygon points={backLeftFace} fill={colors.right} fillOpacity={1} />
      <polygon points={backRightFace} fill={colors.left} fillOpacity={1} />

      {/* Visible 3 faces — solid fills with outlined edges */}
      <polygon points={leftFace} fill={colors.left} fillOpacity={1} stroke={colors.stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points={rightFace} fill={colors.right} fillOpacity={1} stroke={colors.stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      <polygon points={topFace} fill={colors.top} fillOpacity={1} stroke={colors.stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}
