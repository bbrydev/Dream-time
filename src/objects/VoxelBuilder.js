import * as THREE from 'three';

/**
 * Utility class for building voxel-based objects
 */
export class VoxelBuilder {
    constructor() {
        this.voxels = [];
        this.defaultSize = 0.5;
    }

    /**
     * Add a voxel block at the specified position
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {number} z - Z position
     * @param {THREE.Material} material - Material for this voxel
     * @param {number} size - Size of the voxel (default: 0.5)
     */
    addBlock(x, y, z, material, size = this.defaultSize) {
        this.voxels.push({
            position: new THREE.Vector3(x * size, y * size, z * size),
            material,
            size
        });
        return this;
    }

    /**
     * Add multiple blocks in a line
     */
    addLine(x1, y1, z1, x2, y2, z2, material, size = this.defaultSize) {
        const dx = Math.sign(x2 - x1);
        const dy = Math.sign(y2 - y1);
        const dz = Math.sign(z2 - z1);

        let x = x1, y = y1, z = z1;

        while (x !== x2 + dx || y !== y2 + dy || z !== z2 + dz) {
            this.addBlock(x, y, z, material, size);
            if (x !== x2) x += dx;
            if (y !== y2) y += dy;
            if (z !== z2) z += dz;
        }

        return this;
    }

    /**
     * Add a filled box of voxels
     */
    addBox(x1, y1, z1, x2, y2, z2, material, size = this.defaultSize) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
                    this.addBlock(x, y, z, material, size);
                }
            }
        }
        return this;
    }

    /**
     * Add a hollow box (only edges)
     */
    addHollowBox(x1, y1, z1, x2, y2, z2, material, size = this.defaultSize) {
        for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
            for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
                for (let z = Math.min(z1, z2); z <= Math.max(z1, z2); z++) {
                    // Only add voxels on the surface
                    if (x === x1 || x === x2 || y === y1 || y === y2 || z === z1 || z === z2) {
                        this.addBlock(x, y, z, material, size);
                    }
                }
            }
        }
        return this;
    }

    /**
     * Build and return the final mesh group
     */
    build() {
        const group = new THREE.Group();
        const geometry = new THREE.BoxGeometry(1, 1, 1);

        this.voxels.forEach(voxel => {
            const mesh = new THREE.Mesh(geometry, voxel.material);
            mesh.position.copy(voxel.position);
            mesh.scale.setScalar(voxel.size);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            group.add(mesh);
        });

        return group;
    }

    /**
     * Clear all voxels
     */
    clear() {
        this.voxels = [];
        return this;
    }
}
