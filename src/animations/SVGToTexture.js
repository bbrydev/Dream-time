import * as THREE from 'three';

/**
 * Converts SVG animation to Three.js texture
 */
export class SVGToTexture {
    constructor(width = 1024, height = 576) {
        this.width = width;
        this.height = height;

        // Create SVG element
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.svg.setAttribute('width', width);
        this.svg.setAttribute('height', height);
        this.svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        this.svg.style.position = 'absolute';
        this.svg.style.left = '-9999px';
        document.body.appendChild(this.svg);

        // Create canvas for rasterization
        this.canvas = document.createElement('canvas');
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext('2d');

        // Create Three.js texture
        this.texture = new THREE.CanvasTexture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.magFilter = THREE.LinearFilter;
    }

    /**
     * Update texture from current SVG content
     */
    updateTexture() {
        // Convert SVG to data URL
        const svgData = new XMLSerializer().serializeToString(this.svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        // Load into image
        const img = new Image();
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.width, this.height);
            this.ctx.drawImage(img, 0, 0);
            this.texture.needsUpdate = true;
            URL.revokeObjectURL(url);
        };
        img.src = url;
    }

    /**
     * Get the SVG element for direct manipulation
     */
    getSVG() {
        return this.svg;
    }

    /**
     * Get the Three.js texture
     */
    getTexture() {
        return this.texture;
    }

    /**
     * Cleanup
     */
    dispose() {
        if (this.svg.parentNode) {
            this.svg.parentNode.removeChild(this.svg);
        }
        this.texture.dispose();
    }
}
