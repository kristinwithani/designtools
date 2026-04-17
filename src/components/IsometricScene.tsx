import { useMemo, useState, useEffect } from "react";
import type { Voxel, RenderConfig } from "../types";
import VoxelCube from "./VoxelCube";
import { computeSceneLayout } from "../utils/scenemath";

interface IsometricSceneProps {
  voxels: Voxel[];
  width: number;
  height: number;
  cubeSize: number;
  animating?: boolean;
  rc?: Partial<RenderConfig>;
}

export default function IsometricScene({ voxels, width, height, cubeSize, animating = false, rc }: IsometricSceneProps) {
  const flickerInterval = rc?.flickerInterval ?? 150;
  const flickerFraction = rc?.flickerFraction ?? 0.18;

  const [hiddenSet, setHiddenSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (!animating) {
      setHiddenSet(new Set());
      return;
    }
    const interval = setInterval(() => {
      const count = voxels.length;
      const hideCount = Math.floor(count * flickerFraction);
      const newHidden = new Set<number>();
      for (let i = 0; i < hideCount; i++) {
        newHidden.add(Math.floor(Math.random() * count));
      }
      setHiddenSet(newHidden);
    }, flickerInterval);
    return () => clearInterval(interval);
  }, [animating, voxels.length, flickerInterval, flickerFraction]);

  const layout = useMemo(
    () => computeSceneLayout(voxels, cubeSize, width, height),
    [voxels, width, height, cubeSize]
  );

  if (!layout) return <div style={{ width, height }} />;

  const { projected, offsetX, offsetY } = layout;

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      {projected.map(({ v, sx, sy, origIdx }, i) => (
        <VoxelCube
          key={i}
          screenX={sx + offsetX}
          screenY={sy + offsetY - cubeSize / 2}
          size={cubeSize}
          color={v.color}
          visible={!hiddenSet.has(origIdx)}
          strokeWidth={rc?.strokeWidth}
          topLightness={rc?.topLightness}
          leftDarkness={rc?.leftDarkness}
          strokeDarkness={rc?.strokeDarkness}
          strokeDesaturation={rc?.strokeDesaturation}
          flickerTransition={rc?.flickerTransition}
        />
      ))}
    </div>
  );
}
