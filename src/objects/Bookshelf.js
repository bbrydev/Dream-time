import { VoxelBuilder } from './VoxelBuilder.js';
import { createWoodMaterial, createVoxelMaterial } from '../utils/materials.js';

export function createBookshelf() {
    const builder = new VoxelBuilder();

    const shelfMat = createWoodMaterial();

    // Frame
    builder.addBox(-2, 0, 0, -2, 8, 0, shelfMat); // Left side
    builder.addBox(2, 0, 0, 2, 8, 0, shelfMat);   // Right side
    builder.addBox(-2, 8, 0, 2, 8, 0, shelfMat);  // Top

    // Shelves
    builder.addBox(-2, 0, 0, 2, 0, 0, shelfMat);
    builder.addBox(-2, 3, 0, 2, 3, 0, shelfMat);
    builder.addBox(-2, 6, 0, 2, 6, 0, shelfMat);

    // Books (colorful)
    const bookColors = [0xff6b6b, 0x4ecdc4, 0xffe66d, 0x95e1d3, 0xf38181, 0xaa96da];

    // Bottom shelf books
    for (let i = 0; i < 4; i++) {
        const color = bookColors[i % bookColors.length];
        const bookMat = createVoxelMaterial(color);
        builder.addBox(-1 + i, 1, 0, -1 + i, 2, 0, bookMat, 0.4);
    }

    // Middle shelf books
    for (let i = 0; i < 3; i++) {
        const color = bookColors[(i + 2) % bookColors.length];
        const bookMat = createVoxelMaterial(color);
        builder.addBox(-1 + i, 4, 0, -1 + i, 5, 0, bookMat, 0.4);
    }

    // Top shelf books
    for (let i = 0; i < 4; i++) {
        const color = bookColors[(i + 4) % bookColors.length];
        const bookMat = createVoxelMaterial(color);
        builder.addBox(-1 + i, 7, 0, -1 + i, 7, 0, bookMat, 0.4);
    }

    const bookshelf = builder.build();
    bookshelf.position.set(6, 0.5, -4);
    bookshelf.rotation.y = Math.PI / 2;

    return bookshelf;
}
