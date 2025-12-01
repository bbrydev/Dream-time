import * as THREE from 'three';
import { VoxelBuilder } from './VoxelBuilder.js';
import { createWoodMaterial, createVoxelMaterial } from '../utils/materials.js';

export function createTVUnit() {
    const builder = new VoxelBuilder();

    const woodMat = createWoodMaterial();

    // TV stand base
    builder.addBox(-3, 0, 0, 3, 0, 1, woodMat);
    builder.addBox(-3, 1, 0, 3, 1, 1, woodMat);

    // TV stand legs
    builder.addBox(-3, 0, 0, -2, 0, 1, woodMat);
    builder.addBox(2, 0, 0, 3, 0, 1, woodMat);

    const stand = builder.build();
    stand.position.set(0, 0.5, -5.5);

    // TV screen (separate mesh for texture mapping)
    const screenGeometry = new THREE.PlaneGeometry(3, 1.7);
    const screenMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: 0x333333,
        emissiveIntensity: 0.5,
        roughness: 0.3,
        metalness: 0.5
    });

    const screen = new THREE.Mesh(screenGeometry, screenMaterial);
    screen.position.set(0, 2.5, -5.8);
    screen.castShadow = false;
    screen.receiveShadow = false;

    // TV frame (voxel border)
    const frameMat = createVoxelMaterial(0x1a1a1a);
    const frame = new VoxelBuilder()
        .addBox(-3, 3, 0, 3, 3, 0, frameMat, 0.3)  // Top
        .addBox(-3, 1, 0, 3, 1, 0, frameMat, 0.3)  // Bottom
        .addBox(-3, 1, 0, -3, 3, 0, frameMat, 0.3) // Left
        .addBox(3, 1, 0, 3, 3, 0, frameMat, 0.3)   // Right
        .build();
    frame.position.set(0, 0.5, -5.9);

    const tvGroup = new THREE.Group();
    tvGroup.add(stand);
    tvGroup.add(screen);
    tvGroup.add(frame);

    // Store screen reference for texture updates
    tvGroup.userData.screen = screen;

    return tvGroup;
}
