import * as THREE from 'three';
import { createVoxelMaterial } from '../utils/materials.js';

export function createRoom() {
    const room = new THREE.Group();

    const floorMat = createVoxelMaterial(0xd4a574);
    const wallMat = createVoxelMaterial(0xe8dcc4);
    const ceilingMat = createVoxelMaterial(0xf5f5dc);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 16);
    const floor = new THREE.Mesh(floorGeometry, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    room.add(floor);

    // Back wall
    const backWallGeometry = new THREE.PlaneGeometry(20, 8);
    const backWall = new THREE.Mesh(backWallGeometry, wallMat);
    backWall.position.set(0, 4, -8);
    backWall.receiveShadow = true;
    room.add(backWall);

    // Left wall
    const leftWallGeometry = new THREE.PlaneGeometry(16, 8);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-10, 4, 0);
    leftWall.receiveShadow = true;
    room.add(leftWall);

    // Right wall
    const rightWall = new THREE.Mesh(leftWallGeometry, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(10, 4, 0);
    rightWall.receiveShadow = true;
    room.add(rightWall);

    // Ceiling
    const ceilingGeometry = new THREE.PlaneGeometry(20, 16);
    const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 8;
    ceiling.receiveShadow = true;
    room.add(ceiling);

    return room;
}
