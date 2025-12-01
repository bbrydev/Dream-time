import { VoxelBuilder } from './VoxelBuilder.js';
import { createEmissiveMaterial, createVoxelMaterial } from '../utils/materials.js';

export function createCeilingLight(position) {
    const builder = new VoxelBuilder();

    const frameMat = createVoxelMaterial(0x8B8680);
    const bulbMat = createEmissiveMaterial(0xffe4b5, 2);

    // Fixture frame
    builder.addBox(-1, 0, -1, 1, 0, 1, frameMat, 0.3);

    // Bulb
    builder.addBlock(0, -1, 0, bulbMat, 0.4);

    const light = builder.build();
    light.position.copy(position);

    return light;
}
