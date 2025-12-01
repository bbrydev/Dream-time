import * as THREE from "three";

/**
 * TemporalEffects - Makes time behave strangely
 * Implements 'Temporal Shifts' - objects decay, colors shift, reality unstable
 */

export class TemporalEffects {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.time = 0;
    this.timeScale = 1.0;
    this.decayingObjects = [];
    this.shiftingObjects = [];
    this.temporalAnchors = [];
    this.realityStability = 1.0; // 1.0 = stable, 0.0 = chaotic
  }

  /**
   * Apply temporal effects based on emotional influence
   */
  applyTemporalInfluence(influence) {
    this.timeScale = influence.timeDistortion || 1.0;
    this.realityStability = Math.max(0.3, 1.0 - influence.intensity * 0.5);

    // More intense dreams = more reality distortion
    if (influence.intensity > 0.7) {
      this.enableChaosMode();
    }
  }

  /**
   * Enable chaos mode - extreme temporal distortion
   */
  enableChaosMode() {
    console.log("⏰ Reality destabilizes...");
    this.realityStability = 0.3;
  }

  /**
   * Make an object decay over time
   */
  addDecayingObject(object, decayRate = 0.001) {
    object.userData.decayRate = decayRate;
    object.userData.originalOpacity = object.material.opacity || 1.0;
    object.userData.decayTime = 0;
    this.decayingObjects.push(object);
  }

  /**
   * Make an object shift position/rotation over time
   */
  addShiftingObject(object, shiftSpeed = 0.001) {
    object.userData.shiftSpeed = shiftSpeed;
    object.userData.originalPosition = object.position.clone();
    object.userData.originalRotation = object.rotation.clone();
    this.shiftingObjects.push(object);
  }

  /**
   * Create temporal anchor - a point where reality is more stable
   */
  createTemporalAnchor(position) {
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    const anchor = new THREE.Mesh(geometry, material);
    anchor.position.copy(position);
    anchor.userData.isTemporal = true;
    anchor.userData.pulseSpeed = 0.002;

    this.scene.add(anchor);
    this.temporalAnchors.push(anchor);

    return anchor;
  }

  /**
   * Apply chromatic aberration effect (simulated)
   */
  applyChromaticAberration(intensity = 0.5) {
    // This would be better with post-processing, but we can simulate with fog
    const aberrationColor = new THREE.Color().setHSL(
      (this.time * 0.001) % 1.0,
      intensity,
      0.5
    );

    if (this.scene.fog) {
      this.scene.fog.color.lerp(aberrationColor, 0.01);
    }
  }

  /**
   * Make objects phase in and out of existence
   */
  phaseObject(object, phaseSpeed = 0.003) {
    if (!object.material) return;

    const phase = Math.sin(this.time * phaseSpeed) * 0.5 + 0.5;
    object.material.opacity = phase * 0.8 + 0.2;
    object.visible = phase > 0.1;
  }

  /**
   * Distort time for specific objects
   */
  distortObjectTime(object, distortionAmount = 1.0) {
    const distortedTime = this.time * this.timeScale * distortionAmount;

    // Apply various time-based distortions
    object.rotation.x += Math.sin(distortedTime * 0.001) * 0.01;
    object.rotation.y += Math.cos(distortedTime * 0.0015) * 0.01;

    // Scale pulsing
    const scale = 1 + Math.sin(distortedTime * 0.002) * 0.1 * distortionAmount;
    object.scale.set(scale, scale, scale);

    // Position drift
    object.position.x +=
      Math.sin(distortedTime * 0.0005) * 0.001 * distortionAmount;
    object.position.z +=
      Math.cos(distortedTime * 0.0007) * 0.001 * distortionAmount;
  }

  /**
   * Create time ripples emanating from a point
   */
  createTimeRipple(origin, strength = 1.0) {
    const rippleGeometry = new THREE.RingGeometry(0.1, 2, 32);
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
    });

    const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ripple.position.copy(origin);
    ripple.rotation.x = -Math.PI / 2;

    ripple.userData.isRipple = true;
    ripple.userData.creationTime = this.time;
    ripple.userData.strength = strength;
    ripple.userData.maxRadius = 10;

    this.scene.add(ripple);

    return ripple;
  }

  /**
   * Update temporal effects
   */
  update(deltaTime) {
    this.time += deltaTime * this.timeScale;

    // Update decaying objects
    this.decayingObjects.forEach((obj) => {
      if (!obj.material) return;

      obj.userData.decayTime += deltaTime * obj.userData.decayRate;
      const opacity =
        obj.userData.originalOpacity * (1 - obj.userData.decayTime);

      if (opacity <= 0) {
        this.scene.remove(obj);
        this.decayingObjects = this.decayingObjects.filter((o) => o !== obj);
      } else {
        obj.material.opacity = opacity;
      }
    });

    // Update shifting objects
    this.shiftingObjects.forEach((obj) => {
      const shift =
        Math.sin(this.time * obj.userData.shiftSpeed) *
        (1 - this.realityStability);

      obj.position.x = obj.userData.originalPosition.x + shift * 2;
      obj.position.y =
        obj.userData.originalPosition.y +
        Math.cos(this.time * obj.userData.shiftSpeed * 1.3) * shift;
      obj.position.z =
        obj.userData.originalPosition.z +
        Math.sin(this.time * obj.userData.shiftSpeed * 0.7) * shift * 2;

      obj.rotation.y = obj.userData.originalRotation.y + shift * Math.PI;
    });

    // Update temporal anchors
    this.temporalAnchors.forEach((anchor) => {
      const pulse =
        Math.sin(this.time * anchor.userData.pulseSpeed) * 0.5 + 0.5;
      anchor.scale.setScalar(1 + pulse * 0.3);
      anchor.material.opacity = 0.2 + pulse * 0.3;
    });

    // Update time ripples
    this.scene.children.forEach((child) => {
      if (child.userData.isRipple) {
        const age = (this.time - child.userData.creationTime) * 0.001;
        const radius = Math.min(age * 5, child.userData.maxRadius);

        child.scale.setScalar(radius);
        child.material.opacity = Math.max(0, 0.5 - age * 0.1);

        if (child.material.opacity <= 0) {
          this.scene.remove(child);
        }
      }
    });

    // Apply reality instability effects
    if (this.realityStability < 0.7) {
      this.applyChromaticAberration(1 - this.realityStability);

      // Camera shake
      const shake = (1 - this.realityStability) * 0.05;
      this.camera.position.x += (Math.random() - 0.5) * shake;
      this.camera.position.y += (Math.random() - 0.5) * shake;
      this.camera.position.z += (Math.random() - 0.5) * shake;
    }
  }

  /**
   * Apply time distortion to scene lighting
   */
  distortSceneLighting() {
    this.scene.children.forEach((child) => {
      if (child.isLight) {
        child.intensity = 0.5 + Math.sin(this.time * 0.001) * 0.5;

        if (child.color) {
          const hue = (this.time * 0.0001 * (1 - this.realityStability)) % 1.0;
          child.color.setHSL(hue, 0.5, 0.5);
        }
      }
    });
  }

  /**
   * Freeze time momentarily
   */
  freezeTime(duration = 2000) {
    const originalTimeScale = this.timeScale;
    this.timeScale = 0.01;

    setTimeout(() => {
      this.timeScale = originalTimeScale;
    }, duration);
  }

  /**
   * Accelerate time
   */
  accelerateTime(multiplier = 3.0, duration = 3000) {
    const originalTimeScale = this.timeScale;
    this.timeScale *= multiplier;

    setTimeout(() => {
      this.timeScale = originalTimeScale;
    }, duration);
  }

  /**
   * Reverse time (visually)
   */
  reverseTime(duration = 2000) {
    this.timeScale = -1.0;

    setTimeout(() => {
      this.timeScale = 1.0;
    }, duration);
  }

  /**
   * Reset temporal effects
   */
  reset() {
    this.time = 0;
    this.timeScale = 1.0;
    this.realityStability = 1.0;

    this.decayingObjects = [];
    this.shiftingObjects = [];

    this.temporalAnchors.forEach((anchor) => {
      this.scene.remove(anchor);
    });
    this.temporalAnchors = [];
  }

  /**
   * Get current temporal state
   */
  getTemporalState() {
    return {
      time: this.time,
      timeScale: this.timeScale,
      realityStability: this.realityStability,
      isStable: this.realityStability > 0.7,
      isChaotic: this.realityStability < 0.5,
      decayingObjectCount: this.decayingObjects.length,
      shiftingObjectCount: this.shiftingObjects.length,
    };
  }
}
