import * as THREE from 'three';
import { VoxelBuilder } from './VoxelBuilder.js';
import { createVoxelMaterial } from '../utils/materials.js';

export function createWallFrame(color = 0xffaa66) {
    const builder = new VoxelBuilder();

    const frameMat = createVoxelMaterial(0x654321);
    const artMat = createVoxelMaterial(color);

    // Frame border
    builder.addBox(-2, -2, 0, 2, -2, 0, frameMat, 0.2); // Bottom
    builder.addBox(-2, 2, 0, 2, 2, 0, frameMat, 0.2);   // Top
    builder.addBox(-2, -2, 0, -2, 2, 0, frameMat, 0.2); // Left
    builder.addBox(2, -2, 0, 2, 2, 0, frameMat, 0.2);   // Right

    // Art inside (simple colored square)
    builder.addBox(-1, -1, 0, 1, 1, 0, artMat, 0.15);

    return builder.build();
}
