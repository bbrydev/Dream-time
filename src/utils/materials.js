import * as THREE from 'three';

/**
 * Shared material library for consistent voxel aesthetic
 */

export function createVoxelMaterial(color, options = {}) {
    const {
        roughness = 0.8,
        metalness = 0.1,
        flatShading = false
    } = options;

    return new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        flatShading
    });
}

export function createEmissiveMaterial(color, intensity = 1) {
    return new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: intensity,
        roughness: 0.5,
        metalness: 0
    });
}

export function createWoodMaterial() {
    return new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.9,
        metalness: 0
    });
}

export function createFabricMaterial(color = 0xcccccc) {
    return new THREE.MeshStandardMaterial({
        color,
        roughness: 1,
        metalness: 0
    });
}

export function createGlassMaterial() {
    return new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0,
        roughness: 0.1,
        transmission: 0.9,
        transparent: true,
        opacity: 0.5
    });
}
