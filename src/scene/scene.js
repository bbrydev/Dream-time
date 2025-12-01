import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();

    // Warm background color (soft cream/beige)
    scene.background = new THREE.Color(0xf5e6d3);

    // Subtle fog for depth
    scene.fog = new THREE.Fog(0xf5e6d3, 10, 50);

    return scene;
}
