import * as THREE from "three";
import { createScene } from "./scene/scene.js";
import { createCamera, createControls } from "./scene/camera.js";
import { createRenderer } from "./scene/renderer.js";
import { createLighting } from "./lighting/lighting.js";

// Furniture
import { createRoom } from "./objects/Room.js";
import { createSofa } from "./objects/Sofa.js";
import { createCoffeeTable } from "./objects/CoffeeTable.js";
import { createBookshelf } from "./objects/Bookshelf.js";
import { createPlant } from "./objects/Plant.js";
import { createRug } from "./objects/Rug.js";
import { createTVUnit } from "./objects/TVUnit.js";
import { createCeilingLight } from "./objects/CeilingLight.js";
import { createWallFrame } from "./objects/WallFrame.js";

// Animation
import { CartoonEpisode } from "./animations/CartoonEpisode.js";

// DreamWare Systems
import { DreamParser } from "./dreamware/DreamParser.js";
import { DreamVisualizer } from "./dreamware/DreamVisualizer.js";
import { DreamMemory } from "./dreamware/DreamMemory.js";
import { TemporalEffects } from "./dreamware/TemporalEffects.js";
import { VoiceOfTheMachine } from "./dreamware/VoiceOfTheMachine.js";
import { DreamConversation } from "./dreamware/DreamConversation.js";
import { AudioManager } from "./dreamware/AudioManager.js";

/**
 * Main application - DreamWare Experience
 */
class VoxelLivingRoom {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.loadingScreen = document.getElementById("loading");

    this.init();
    this.setupFurniture();
    this.setupAnimation();
    this.setupDreamWare();
    this.setupUI();
    this.animate();

    // Hide loading screen and show dream interface
    setTimeout(() => {
      this.loadingScreen.classList.add("hidden");
    }, 1000);
  }

  init() {
    // Create scene
    this.scene = createScene();

    // Create camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = createCamera(aspect);

    // Create renderer
    this.renderer = createRenderer(this.canvas);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create controls
    this.controls = createControls(this.camera, this.canvas);

    // Create lighting
    this.lights = createLighting(this.scene);

    // Handle window resize
    window.addEventListener("resize", () => this.onResize());

    // Track time
    this.clock = new THREE.Clock();
    this.lastTime = 0;
  }

  setupFurniture() {
    // Add room
    const room = createRoom();
    this.scene.add(room);

    // Add furniture
    const sofa = createSofa();
    this.scene.add(sofa);

    const coffeeTable = createCoffeeTable();
    this.scene.add(coffeeTable);

    const bookshelf = createBookshelf();
    this.scene.add(bookshelf);

    const plant = createPlant();
    this.scene.add(plant);

    const rug = createRug();
    this.scene.add(rug);

    // Add TV unit (save reference for texture updates)
    this.tvUnit = createTVUnit();
    this.scene.add(this.tvUnit);

    // Add ceiling lights
    const light1 = createCeilingLight(new THREE.Vector3(-3, 6, 0));
    const light2 = createCeilingLight(new THREE.Vector3(3, 6, 2));
    this.scene.add(light1);
    this.scene.add(light2);

    // Add wall frames
    const frame1 = createWallFrame(0xff6b6b);
    frame1.position.set(-7, 4, -7.8);
    this.scene.add(frame1);

    const frame2 = createWallFrame(0x4ecdc4);
    frame2.position.set(7, 4, -7.8);
    this.scene.add(frame2);

    const frame3 = createWallFrame(0xffe66d);
    frame3.position.set(-9.8, 4, 2);
    frame3.rotation.y = Math.PI / 2;
    this.scene.add(frame3);
  }

  setupAnimation() {
    // Create cartoon episode
    this.cartoon = new CartoonEpisode();

    // Apply texture to TV screen
    const screen = this.tvUnit.userData.screen;
    if (screen) {
      screen.material.map = this.cartoon.getTexture();
      screen.material.emissive = new THREE.Color(0x222222);
      screen.material.emissiveIntensity = 0.8;
      screen.material.needsUpdate = true;
    }
  }

  setupDreamWare() {
    // Initialize DreamWare systems
    this.dreamParser = new DreamParser();
    this.dreamVisualizer = new DreamVisualizer(this.scene);
    this.dreamMemory = new DreamMemory();
    this.temporalEffects = new TemporalEffects(this.scene, this.camera);
    this.voiceOfTheMachine = new VoiceOfTheMachine();
    this.dreamConversation = new DreamConversation();
    this.audioManager = new AudioManager();

    // Apply emotional influence from past dreams
    const influence = this.dreamMemory.getEmotionalInfluence();
    this.temporalEffects.applyTemporalInfluence(influence);

    console.log("🌙 DreamWare systems initialized");
  }

  setupUI() {
    // Get UI elements
    this.chatInterface = document.getElementById("chat-interface");
    this.chatMessages = document.getElementById("chat-messages");
    this.chatInput = document.getElementById("chat-input");
    this.sendBtn = document.getElementById("send-btn");
    this.toggleMusicBtn = document.getElementById("toggle-music-btn");
    this.newDreamBtn = document.getElementById("new-dream-btn");
    this.settingsBtn = document.getElementById("settings-btn");

    this.dreamStatus = document.getElementById("dream-status");

    // Initialize AI with hardcoded key
    const apiKey = "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";
    this.initializeAI(apiKey); // Chat input handlers
    this.sendBtn.addEventListener("click", () => {
      this.sendMessage();
    });

    this.chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });

    this.chatInput.addEventListener("input", () => {
      // Auto-resize textarea
      this.chatInput.style.height = "auto";
      this.chatInput.style.height =
        Math.min(this.chatInput.scrollHeight, 120) + "px";

      // Typing sound
      if (Math.random() > 0.8) {
        this.audioManager.playTypingSound();
      }
    });

    // Music toggle
    this.toggleMusicBtn.addEventListener("click", () => {
      const isPlaying = this.audioManager.toggleMusic();
      this.toggleMusicBtn.textContent = isPlaying ? "🎵" : "🔇";
      this.audioManager.playNotificationSound();
    });

    // New dream button
    this.newDreamBtn.addEventListener("click", () => {
      this.startNewDream();
    });

    // Settings button - now just resets conversation
    this.settingsBtn.addEventListener("click", () => {
      this.startNewDream();
    });

    // Button hover sounds
    [
      this.sendBtn,
      this.toggleMusicBtn,
      this.newDreamBtn,
      this.settingsBtn,
    ].forEach((btn) => {
      btn.addEventListener("mouseenter", () => {
        if (Math.random() > 0.5) {
          this.audioManager.playTypingSound();
        }
      });
    });
  }

  initializeAI(apiKey) {
    try {
      this.dreamConversation.initializeGroq(apiKey);
      this.chatInterface.classList.remove("hidden");

      // Start ambient music
      setTimeout(() => {
        this.audioManager.playBackgroundMusic("dreamy");
      }, 500);

      // Show welcome message
      this.addMessageToChat(
        "ai",
        "Welcome, dreamer... I sense you've entered the dream space. Tell me, what visions dance through your mind?"
      );

      // Speak welcome
      setTimeout(() => {
        this.audioManager.speak(
          "Welcome to the dream space. I'm here to explore your dreams with you."
        );
      }, 1000);
    } catch (error) {
      throw new Error("Failed to initialize AI: " + error.message);
    }
  }

  async sendMessage() {
    const message = this.chatInput.value.trim();

    if (!message) return;

    // Clear input
    this.chatInput.value = "";
    this.chatInput.style.height = "auto";

    // Add user message
    this.addMessageToChat("user", message);
    this.audioManager.playNotificationSound();

    // Show typing indicator
    this.showTypingIndicator();

    // Disable send button
    this.sendBtn.disabled = true;

    try {
      // Get AI response
      const response = await this.dreamConversation.sendMessage(message);

      // Remove typing indicator
      this.removeTypingIndicator();

      // Parse dream data for visualization
      const dreamData = this.dreamParser.parse(message);

      // Visualize if it's a dream description
      if (
        dreamData.wordCount > 5 &&
        (dreamData.emotions || Object.keys(dreamData.objects).length > 0)
      ) {
        this.dreamVisualizer.visualize(dreamData);
        this.dreamMemory.storeDream(dreamData);

        // Update music based on dream emotion
        if (dreamData.dominantEmotion) {
          const moodMap = {
            fear: "mysterious",
            joy: "ethereal",
            sadness: "calm",
            wonder: "dreamy",
            anxiety: "intense",
            peace: "calm",
          };
          this.audioManager.playBackgroundMusic(
            moodMap[dreamData.dominantEmotion] || "dreamy"
          );
        }
      }

      // Add AI response
      this.addMessageToChat("ai", response.response);
      this.audioManager.playMessageSound();

      // Speak response
      setTimeout(() => {
        this.audioManager.speak(response.response);
      }, 300);
    } catch (error) {
      this.removeTypingIndicator();
      this.addMessageToChat(
        "ai",
        "The dream connection flickers... " + error.message
      );
      console.error("Chat error:", error);
    } finally {
      this.sendBtn.disabled = false;
      this.chatInput.focus();
    }
  }

  addMessageToChat(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${role}`;

    const contentDiv = document.createElement("div");
    contentDiv.className = "message-content";
    contentDiv.textContent = content;

    const timeDiv = document.createElement("div");
    timeDiv.className = "message-time";
    const now = new Date();
    timeDiv.textContent = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    messageDiv.appendChild(contentDiv);
    messageDiv.appendChild(timeDiv);

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "typing-indicator";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.className = "typing-dot";
      indicator.appendChild(dot);
    }

    this.chatMessages.appendChild(indicator);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  startNewDream() {
    this.dreamConversation.resetConversation();
    this.dreamVisualizer.clearDream();
    this.chatMessages.innerHTML = "";
    this.addMessageToChat(
      "ai",
      "The dream space resets... I'm here when you're ready to explore new visions."
    );
    this.audioManager.playNotificationSound();
  }

  showStatus(message, duration = 3000) {
    const statusContent = this.dreamStatus.querySelector(".status-content");
    statusContent.textContent = message;
    this.dreamStatus.classList.remove("hidden");

    setTimeout(() => {
      this.dreamStatus.classList.add("hidden");
    }, duration);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const time = this.clock.getElapsedTime() * 1000;
    const deltaTime = time - this.lastTime;
    this.lastTime = time;

    // Update cartoon animation
    if (this.cartoon) {
      this.cartoon.update(deltaTime);
    }

    // Update dream visualizer
    if (this.dreamVisualizer) {
      this.dreamVisualizer.update(deltaTime);
    }

    // Update temporal effects
    if (this.temporalEffects) {
      this.temporalEffects.update(deltaTime);
    }

    // Update controls
    if (this.controls) {
      this.controls.update();
    }

    // Render scene
    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

// Provide a programmatic entry point and keep the same auto-start behavior
export function createApp() {
  return new VoxelLivingRoom();
}

// Start the application in browser contexts
if (typeof window !== "undefined") {
  createApp();
}
