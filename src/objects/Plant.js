import { VoxelBuilder } from './VoxelBuilder.js';
import { createVoxelMaterial } from '../utils/materials.js';

export function createPlant() {
    const builder = new VoxelBuilder();

    const potMat = createVoxelMaterial(0x8B4513);
    const soilMat = createVoxelMaterial(0x3d2817);
    const leafMat = createVoxelMaterial(0x2d8659);
    const stemMat = createVoxelMaterial(0x4a7c59);

    // Pot
    builder.addBox(-1, 0, -1, 1, 1, 1, potMat);

    // Soil
    builder.addBox(-1, 2, -1, 1, 2, 1, soilMat, 0.4);

    // Stem
    builder.addBox(0, 2, 0, 0, 4, 0, stemMat);

    // Leaves (cluster at top)
    builder.addBlock(-1, 4, 0, leafMat);
    builder.addBlock(1, 4, 0, leafMat);
    builder.addBlock(0, 4, -1, leafMat);
    builder.addBlock(0, 4, 1, leafMat);
    builder.addBlock(0, 5, 0, leafMat);
    builder.addBlock(-1, 5, -1, leafMat, 0.4);
    builder.addBlock(1, 5, 1, leafMat, 0.4);

    const plant = builder.build();
    plant.position.set(-6, 0.5, -4);

    return plant;
}
