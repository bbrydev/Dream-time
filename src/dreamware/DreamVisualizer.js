import * as THREE from "three";

/**
 * DreamVisualizer - Creates 3D manifestations of dreams in the room
 * Implements 'Metamorphic Media' - nothing stays static, everything morphs
 */

export class DreamVisualizer {
  constructor(scene) {
    this.scene = scene;
    this.dreamObjects = [];
    this.particles = [];
    this.floatingTexts = [];
    this.activeEffects = [];
    this.time = 0;
  }

  /**
   * Visualize a dream based on parsed data
   */
  visualize(dreamData) {
    // Clear previous dream objects
    this.clearDream();

    const { emotions, colors, objects, movements, intensity, text } = dreamData;

    console.log("🎨 Visualizing dream with objects:", objects);

    // Create ambient effects based on emotions
    this.createEmotionalAmbience(emotions, intensity);

    // Create floating dream text fragments
    this.createDreamTextFragments(text);

    // Create objects based on dream content
    if (objects.nature && objects.nature > 0) {
      console.log("✨ Creating nature elements");
      this.createNatureElements(colors, movements);
    }
    if (objects.sky && objects.sky > 0) {
      console.log("🌟 Creating sky elements");
      this.createSkyElements(colors);
    }
    if (objects.water && objects.water > 0) {
      console.log("💧 Creating water effects");
      this.createWaterEffects(colors);
    }
    if (objects.abstract && objects.abstract > 0) {
      console.log("🔮 Creating abstract shapes");
      this.createAbstractShapes(colors, movements, intensity);
    }
    if (objects.creatures && objects.creatures > 0) {
      console.log("🦋 Creating creature essences");
      this.createCreatureEssences(colors, movements);
    }

    // If no specific objects detected, create abstract shapes as fallback
    const hasObjects = Object.keys(objects).length > 0;
    if (!hasObjects) {
      console.log(
        "🌀 No specific objects detected, creating abstract visualization"
      );
      this.createAbstractShapes(colors, movements, intensity);
    }

    // Create particle system based on emotions
    this.createEmotionalParticles(emotions, colors);

    // Modify room lighting based on dream
    this.modifyLighting(emotions, colors, intensity);

    return {
      objectCount: this.dreamObjects.length,
      particleCount: this.particles.length,
      detectedObjects: objects,
    };
  }

  /**
   * Create emotional ambience - color shifts and fog
   */
  createEmotionalAmbience(emotions, intensity) {
    // Add fog based on dominant emotion
    const fogColor = this.getEmotionColor(emotions);
    this.scene.fog = new THREE.FogExp2(fogColor, 0.015 * intensity);

    // Create ambient light sphere
    const ambienceGeometry = new THREE.SphereGeometry(15, 32, 32);
    const ambienceMaterial = new THREE.MeshBasicMaterial({
      color: fogColor,
      transparent: true,
      opacity: 0.1 * intensity,
      side: THREE.BackSide,
    });

    const ambienceSphere = new THREE.Mesh(ambienceGeometry, ambienceMaterial);
    ambienceSphere.position.set(0, 3, 0);
    ambienceSphere.userData.isDream = true;
    ambienceSphere.userData.type = "ambience";
    this.scene.add(ambienceSphere);
    this.dreamObjects.push(ambienceSphere);
  }

  /**
   * Create floating text fragments from dream
   */
  createDreamTextFragments(text) {
    const words = text.split(" ").filter((w) => w.length > 3);
    const selectedWords = words.sort(() => 0.5 - Math.random()).slice(0, 8);

    selectedWords.forEach((word, index) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 512;
      canvas.height = 128;

      context.fillStyle = "rgba(0, 0, 0, 0)";
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = "bold 60px Space Grotesk, sans-serif";
      context.fillStyle = "#8b5cf6";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(word, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.6,
      });

      const sprite = new THREE.Sprite(material);
      const angle = (index / selectedWords.length) * Math.PI * 2;
      const radius = 5 + Math.random() * 3;

      sprite.position.set(
        Math.cos(angle) * radius,
        2 + Math.random() * 4,
        Math.sin(angle) * radius
      );
      sprite.scale.set(2, 0.5, 1);

      sprite.userData.isDream = true;
      sprite.userData.type = "text";
      sprite.userData.floatSpeed = 0.0005 + Math.random() * 0.001;
      sprite.userData.floatOffset = Math.random() * Math.PI * 2;

      this.scene.add(sprite);
      this.floatingTexts.push(sprite);
      this.dreamObjects.push(sprite);
    });
  }

  /**
   * Create nature-inspired elements
   */
  createNatureElements(colors, movements) {
    const count = 5 + Math.floor(Math.random() * 5);

    for (let i = 0; i < count; i++) {
      // Create vine-like structures
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(Math.random() * 4 - 2, 0, Math.random() * 4 - 2),
        new THREE.Vector3(Math.random() * 4 - 2, 2, Math.random() * 4 - 2),
        new THREE.Vector3(Math.random() * 4 - 2, 4, Math.random() * 4 - 2),
        new THREE.Vector3(Math.random() * 4 - 2, 6, Math.random() * 4 - 2),
      ]);

      const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
      const material = new THREE.MeshPhongMaterial({
        color: colors.length > 0 ? this.getColorHex(colors[0]) : 0x4ecdc4,
        emissive: 0x2a7a6f,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7,
      });

      const vine = new THREE.Mesh(geometry, material);
      vine.userData.isDream = true;
      vine.userData.type = "nature";
      this.scene.add(vine);
      this.dreamObjects.push(vine);
    }
  }

  /**
   * Create sky-related elements (stars, moons, etc.)
   */
  createSkyElements(colors) {
    const starCount = 30;
    const starGeometry = new THREE.SphereGeometry(0.15, 8, 8);

    // Create stars
    for (let i = 0; i < starCount; i++) {
      const starColor =
        colors.length > 0
          ? this.getColorHex(colors[Math.floor(Math.random() * colors.length)])
          : 0xffffff;
      const material = new THREE.MeshBasicMaterial({
        color: starColor,
        transparent: true,
        opacity: 0.8,
      });

      const star = new THREE.Mesh(starGeometry, material);
      star.position.set(
        Math.random() * 16 - 8,
        3 + Math.random() * 4,
        Math.random() * 16 - 8
      );

      star.userData.isDream = true;
      star.userData.type = "sky";
      star.userData.twinkleSpeed = 0.5 + Math.random() * 1.5;
      star.userData.twinkleOffset = Math.random() * Math.PI * 2;

      this.scene.add(star);
      this.dreamObjects.push(star);
    }

    // Create moon/celestial sphere
    const moonGeometry = new THREE.SphereGeometry(1, 32, 32);
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: colors.length > 0 ? this.getColorHex(colors[0]) : 0xffffcc,
      emissive: colors.length > 0 ? this.getColorHex(colors[0]) : 0xffffcc,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.7,
    });

    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(5, 6, -5);
    moon.userData.isDream = true;
    moon.userData.type = "sky";
    moon.userData.isOrb = true;

    this.scene.add(moon);
    this.dreamObjects.push(moon);

    // Add glow around moon
    const glowGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: colors.length > 0 ? this.getColorHex(colors[0]) : 0xffffcc,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });

    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.copy(moon.position);
    glow.userData.isDream = true;
    glow.userData.type = "sky";
    glow.userData.isGlow = true;

    this.scene.add(glow);
    this.dreamObjects.push(glow);
  }

  /**
   * Create water-like effects
   */
  createWaterEffects(colors) {
    const geometry = new THREE.PlaneGeometry(12, 12, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      wireframe: true,
    });

    const water = new THREE.Mesh(geometry, material);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.1;

    water.userData.isDream = true;
    water.userData.type = "water";
    water.userData.isWave = true;

    this.scene.add(water);
    this.dreamObjects.push(water);
  }

  /**
   * Create abstract morphing shapes
   */
  createAbstractShapes(colors, movements, intensity) {
    const shapes = ["sphere", "box", "torus", "octahedron"];
    const count = 3 + Math.floor(intensity * 5);

    for (let i = 0; i < count; i++) {
      const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
      let geometry;

      switch (shapeType) {
        case "sphere":
          geometry = new THREE.SphereGeometry(0.5, 16, 16);
          break;
        case "box":
          geometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
          break;
        case "torus":
          geometry = new THREE.TorusGeometry(0.4, 0.15, 16, 32);
          break;
        case "octahedron":
          geometry = new THREE.OctahedronGeometry(0.5, 0);
          break;
      }

      const color =
        colors.length > 0
          ? this.getColorHex(colors[Math.floor(Math.random() * colors.length)])
          : 0x8b5cf6;
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7,
        wireframe: Math.random() > 0.5,
      });

      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        Math.random() * 12 - 6,
        1 + Math.random() * 5,
        Math.random() * 12 - 6
      );

      shape.userData.isDream = true;
      shape.userData.type = "abstract";
      shape.userData.morphSpeed = 0.001 + Math.random() * 0.003;
      shape.userData.rotateSpeed = 0.01 + Math.random() * 0.02;
      shape.userData.floatSpeed = 0.0003 + Math.random() * 0.0007;

      this.scene.add(shape);
      this.dreamObjects.push(shape);
    }
  }

  /**
   * Create creature essence particles
   */
  createCreatureEssences(colors, movements) {
    const particleCount = 30;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 12 - 6;
      positions[i * 3 + 1] = Math.random() * 6;
      positions[i * 3 + 2] = Math.random() * 12 - 6;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0xec4899,
      size: 0.15,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    particles.userData.isDream = true;
    particles.userData.type = "creatures";
    particles.userData.velocities = velocities;

    this.scene.add(particles);
    this.dreamObjects.push(particles);
  }

  /**
   * Create emotional particle system
   */
  createEmotionalParticles(emotions, colors) {
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = Math.random() * 20 - 10;
      positions[i * 3 + 1] = Math.random() * 8;
      positions[i * 3 + 2] = Math.random() * 20 - 10;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const color = this.getEmotionColor(emotions);
    const material = new THREE.PointsMaterial({
      color: color,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    particleSystem.userData.isDream = true;
    particleSystem.userData.type = "particles";

    this.scene.add(particleSystem);
    this.particles.push(particleSystem);
    this.dreamObjects.push(particleSystem);
  }

  /**
   * Modify room lighting based on dream
   */
  modifyLighting(emotions, colors, intensity) {
    const emotionColor = this.getEmotionColor(emotions);

    // Add dream-specific lights
    const dreamLight = new THREE.PointLight(emotionColor, intensity * 2, 20);
    dreamLight.position.set(0, 5, 0);
    dreamLight.userData.isDream = true;
    dreamLight.userData.type = "light";

    this.scene.add(dreamLight);
    this.dreamObjects.push(dreamLight);
  }

  /**
   * Update dream visualization (called each frame)
   */
  update(deltaTime) {
    this.time += deltaTime * 0.001;

    // Update floating texts
    this.floatingTexts.forEach((text) => {
      text.position.y +=
        Math.sin(
          this.time * text.userData.floatSpeed * 1000 +
            text.userData.floatOffset
        ) * 0.01;
      text.rotation.z = Math.sin(this.time * 0.5) * 0.1;
      text.material.opacity = 0.4 + Math.sin(this.time * 2) * 0.2;
    });

    // Update abstract shapes (morphing)
    this.dreamObjects.forEach((obj) => {
      if (obj.userData.type === "abstract") {
        obj.rotation.x += obj.userData.rotateSpeed;
        obj.rotation.y += obj.userData.rotateSpeed * 1.5;
        obj.position.y +=
          Math.sin(this.time * obj.userData.floatSpeed * 1000) * 0.01;

        // Morphing scale
        const scale =
          1 + Math.sin(this.time * obj.userData.morphSpeed * 1000) * 0.3;
        obj.scale.set(scale, scale, scale);
      }

      if (obj.userData.type === "sky") {
        // Twinkling stars
        if (!obj.userData.isOrb && !obj.userData.isGlow) {
          obj.material.opacity =
            0.5 +
            Math.sin(
              this.time * obj.userData.twinkleSpeed + obj.userData.twinkleOffset
            ) *
              0.3;
        }

        // Rotate moon
        if (obj.userData.isOrb) {
          obj.rotation.y += 0.001;
        }

        // Pulse glow
        if (obj.userData.isGlow) {
          const scale = 1 + Math.sin(this.time * 0.5) * 0.1;
          obj.scale.set(scale, scale, scale);
          obj.material.opacity = 0.1 + Math.sin(this.time * 0.5) * 0.1;
        }
      }

      if (obj.userData.type === "water" && obj.userData.isWave) {
        // Animate water waves
        const positions = obj.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
          const x = positions.getX(i);
          const y = positions.getY(i);
          positions.setZ(
            i,
            Math.sin(x * 2 + this.time) * 0.1 +
              Math.cos(y * 2 + this.time * 0.7) * 0.1
          );
        }
        positions.needsUpdate = true;
      }

      if (obj.userData.type === "ambience") {
        obj.rotation.y += 0.0005;
        obj.material.opacity = 0.05 + Math.sin(this.time * 0.5) * 0.05;
      }

      if (obj.userData.type === "nature") {
        obj.rotation.z = Math.sin(this.time * 0.5) * 0.1;
      }
    });

    // Update particles
    this.particles.forEach((particleSystem) => {
      particleSystem.rotation.y += 0.0003;
    });
  }

  /**
   * Clear all dream objects
   */
  clearDream() {
    this.dreamObjects.forEach((obj) => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (obj.material.map) obj.material.map.dispose();
        obj.material.dispose();
      }
      this.scene.remove(obj);
    });

    this.dreamObjects = [];
    this.particles = [];
    this.floatingTexts = [];
    this.scene.fog = null;
  }

  /**
   * Helper: Get color from emotion
   */
  getEmotionColor(emotions) {
    const emotionColors = {
      fear: 0x4a0066,
      joy: 0xffeb3b,
      sadness: 0x607d8b,
      wonder: 0x8b5cf6,
      anxiety: 0xff1744,
      peace: 0x4caf50,
    };

    let dominantEmotion = "wonder";
    let maxWeight = 0;

    for (const [emotion, weight] of Object.entries(emotions)) {
      if (weight > maxWeight) {
        maxWeight = weight;
        dominantEmotion = emotion;
      }
    }

    return emotionColors[dominantEmotion] || 0x8b5cf6;
  }

  /**
   * Helper: Convert color name to hex
   */
  getColorHex(colorName) {
    const colorMap = {
      purple: 0x8b5cf6,
      blue: 0x4a90e2,
      red: 0xff1744,
      green: 0x4caf50,
      yellow: 0xffeb3b,
      pink: 0xec4899,
      black: 0x1a1a2e,
      white: 0xffffff,
    };

    return colorMap[colorName] || 0x8b5cf6;
  }
}
