import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const DEFAULT_FOV = 60;

export function createCamera(aspect) {
    const camera = new THREE.PerspectiveCamera(
        DEFAULT_FOV,
        aspect,
        0.1,
        1000
    );

    // Position camera to view the entire room
    camera.position.set(8, 6, 12);

    return camera;
}

export function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);

    // Smooth controls
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Limit vertical rotation
    controls.maxPolarAngle = Math.PI / 2 + 0.2;
    controls.minPolarAngle = Math.PI / 8;

    // Zoom limits
    controls.minDistance = 5;
    controls.maxDistance = 30;

    // Set target to center of room
    controls.target.set(0, 2, 0);

    return controls;
}
