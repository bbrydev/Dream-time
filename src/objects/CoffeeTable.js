import { VoxelBuilder } from './VoxelBuilder.js';
import { createWoodMaterial } from '../utils/materials.js';

export function createCoffeeTable() {
    const builder = new VoxelBuilder();

    const woodMat = createWoodMaterial();
    const topMat = createWoodMaterial();

    // Table legs
    builder.addBox(-2, 0, -1, -2, 1, -1, woodMat);
    builder.addBox(2, 0, -1, 2, 1, -1, woodMat);
    builder.addBox(-2, 0, 1, -2, 1, 1, woodMat);
    builder.addBox(2, 0, 1, 2, 1, 1, woodMat);

    // Table top
    builder.addBox(-3, 2, -2, 3, 2, 2, topMat);

    const table = builder.build();
    table.position.set(0, 0.5, 0);

    return table;
}
