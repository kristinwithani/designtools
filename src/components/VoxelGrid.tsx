import { useMemo } from "react";
import type { GeneratedObject, RenderConfig } from "../types";
import VoxelObject from "./VoxelObject";

interface VoxelGridProps {
  objects: GeneratedObject[];
  cols: number;
  animating?: boolean;
  rc?: Partial<RenderConfig>;
}

function computeSceneSize(cols: number): number {
  if (cols <= 2) return 250;
  if (cols <= 3) return 200;
  if (cols <= 4) return 160;
  return 130;
}

function computeMaxCubeSize(objects: GeneratedObject[], sceneSize: number, fitFactor: number, maxCube: number): number {
  let smallest = maxCube;

  for (const obj of objects) {
    if (obj.voxels.length === 0) continue;

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;
    for (const v of obj.voxels) {
      if (v.x < minX) minX = v.x;
      if (v.x > maxX) maxX = v.x;
      if (v.y < minY) minY = v.y;
      if (v.y > maxY) maxY = v.y;
      if (v.z < minZ) minZ = v.z;
      if (v.z > maxZ) maxZ = v.z;
    }

    const extX = maxX - minX + 1;
    const extY = maxY - minY + 1;
    const extZ = maxZ - minZ + 1;

    const projW = (extX + extZ) * 0.5;
    const projH = (extX + extZ) * 0.25 + extY * 0.5;

    const sizeFromW = (sceneSize * fitFactor) / projW;
    const sizeFromH = (sceneSize * fitFactor) / projH;
    const fits = Math.floor(Math.min(sizeFromW, sizeFromH));

    if (fits < smallest) smallest = fits;
  }

  return Math.max(4, smallest);
}

export default function VoxelGrid({ objects, cols, animating, rc }: VoxelGridProps) {
  const gridGap = rc?.gridGap ?? 16;
  const fitFactor = rc?.fitFactor ?? 0.8;
  const maxCube = rc?.maxCubeSize ?? 40;

  const sceneSize = computeSceneSize(cols);
  const cubeSize = useMemo(
    () => computeMaxCubeSize(objects, sceneSize, fitFactor, maxCube),
    [objects, sceneSize, fitFactor, maxCube]
  );

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: gridGap }}
    >
      {objects.map((obj, i) => (
        <VoxelObject key={i} object={obj} cubeSize={cubeSize} sceneSize={sceneSize} animating={animating} rc={rc} />
      ))}
    </div>
  );
}
