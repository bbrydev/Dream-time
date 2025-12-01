import * as THREE from 'three';

export function createRenderer(canvas) {
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false
    });

    // Enable shadows
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Tone mapping for warm aesthetic
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Output encoding
    renderer.outputEncoding = THREE.sRGBEncoding;

    // Small helper: configure reasonable pixel ratio for varied devices
    renderer.setDefaultPixelRatio = (ratio = window.devicePixelRatio) => {
        renderer.setPixelRatio(Math.min(ratio || 1, 2));
    };

    return renderer;
}
