import * as THREE from 'three';

export function createLighting(scene) {
    const lights = [];

    // Warm ambient light (base illumination)
    const ambientLight = new THREE.AmbientLight(0xffcc99, 0.4);
    scene.add(ambientLight);
    lights.push(ambientLight);

    // Main ceiling light (warm white)
    const ceilingLight1 = new THREE.PointLight(0xffe4b5, 0.8, 20, 2);
    ceilingLight1.position.set(-3, 5.5, 0);
    ceilingLight1.castShadow = true;
    ceilingLight1.shadow.mapSize.width = 1024;
    ceilingLight1.shadow.mapSize.height = 1024;
    ceilingLight1.shadow.bias = -0.0001;
    scene.add(ceilingLight1);
    lights.push(ceilingLight1);

    // Second ceiling light
    const ceilingLight2 = new THREE.PointLight(0xffe4b5, 0.8, 20, 2);
    ceilingLight2.position.set(3, 5.5, 2);
    ceilingLight2.castShadow = true;
    ceilingLight2.shadow.mapSize.width = 1024;
    ceilingLight2.shadow.mapSize.height = 1024;
    ceilingLight2.shadow.bias = -0.0001;
    scene.add(ceilingLight2);
    lights.push(ceilingLight2);

    // Directional light for global illumination (subtle)
    const directionalLight = new THREE.DirectionalLight(0xfff5e6, 0.3);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -15;
    directionalLight.shadow.camera.right = 15;
    directionalLight.shadow.camera.top = 15;
    directionalLight.shadow.camera.bottom = -15;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.bias = -0.0001;
    scene.add(directionalLight);
    lights.push(directionalLight);

    // TV glow (dynamic, will be updated based on TV content)
    const tvGlow = new THREE.PointLight(0x6699ff, 0.3, 8, 2);
    tvGlow.position.set(0, 2.5, -5.8);
    scene.add(tvGlow);
    lights.push(tvGlow);

    return {
        ambientLight,
        ceilingLight1,
        ceilingLight2,
        directionalLight,
        tvGlow,
        all: lights
    };
}

// Small factory helper for consistent point lights used across the scene
export function createPointLight(color = 0xffffff, intensity = 1, distance = 10, decay = 2) {
    const light = new THREE.PointLight(color, intensity, distance, decay);
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;
    light.shadow.bias = -0.0001;
    return light;
}
