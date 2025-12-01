import { VoxelBuilder } from './VoxelBuilder.js';
import { createFabricMaterial, createVoxelMaterial } from '../utils/materials.js';

export function createSofa() {
    const builder = new VoxelBuilder();

    const sofaColor = 0xb8a89a; // Warm beige/taupe
    const cushionColor = 0xa89888;

    const fabricMat = createFabricMaterial(sofaColor);
    const cushionMat = createFabricMaterial(cushionColor);

    // Base/seat
    builder.addBox(-3, 0, -1, 3, 1, 1, fabricMat);

    // Backrest
    builder.addBox(-3, 1, -1, 3, 3, -1, fabricMat);

    // Armrests
    builder.addBox(-3, 0, -1, -3, 2, 1, fabricMat); // Left
    builder.addBox(3, 0, -1, 3, 2, 1, fabricMat);   // Right

    // Cushions (decorative)
    builder.addBlock(-2, 2, 0, cushionMat, 0.4);
    builder.addBlock(0, 2, 0, cushionMat, 0.4);
    builder.addBlock(2, 2, 0, cushionMat, 0.4);

    const sofa = builder.build();
    sofa.position.set(-4, 0.5, 3);

    return sofa;
}
