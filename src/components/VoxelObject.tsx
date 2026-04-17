import type { GeneratedObject, RenderConfig } from "../types";
import IsometricScene from "./IsometricScene";
import ExportMenu from "./ExportMenu";

interface VoxelObjectProps {
  object: GeneratedObject;
  cubeSize: number;
  sceneSize: number;
  animating?: boolean;
  rc?: Partial<RenderConfig>;
}

export default function VoxelObject({ object, cubeSize, sceneSize, animating, rc }: VoxelObjectProps) {
  const padding = rc?.cardPadding ?? 12;
  const radius = rc?.cardRadius ?? 12;
  const bgOp = rc?.cardBgOpacity ?? 0.05;
  const hoverOp = rc?.cardHoverOpacity ?? 0.08;

  return (
    <div
      className="relative group overflow-visible transition-colors"
      style={{
        padding,
        borderRadius: radius,
        background: `rgba(255,255,255,${bgOp})`,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = `rgba(255,255,255,${hoverOp})`)}
      onMouseLeave={(e) => (e.currentTarget.style.background = `rgba(255,255,255,${bgOp})`)}
    >
      <ExportMenu voxels={object.voxels} cubeSize={cubeSize} name={object.name} />
      <IsometricScene
        voxels={object.voxels}
        width={sceneSize}
        height={sceneSize}
        cubeSize={cubeSize}
        animating={animating}
        rc={rc}
      />
    </div>
  );
}
