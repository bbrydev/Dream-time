import * as THREE from 'three';
import { createVoxelMaterial } from '../utils/materials.js';

export function createRug() {
    const geometry = new THREE.PlaneGeometry(6, 4);

    // Create a patterned texture
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');

    // Base color
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(0, 0, 128, 128);

    // Pattern
    ctx.fillStyle = '#A0522D';
    for (let i = 0; i < 128; i += 16) {
        for (let j = 0; j < 128; j += 16) {
            if ((i + j) % 32 === 0) {
                ctx.fillRect(i, j, 16, 16);
            }
        }
    }

    // Border
    ctx.strokeStyle = '#6B3410';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, 120, 120);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 1,
        metalness: 0
    });

    const rug = new THREE.Mesh(geometry, material);
    rug.rotation.x = -Math.PI / 2;
    rug.position.set(0, 0.05, 0);
    rug.receiveShadow = true;

    return rug;
}
