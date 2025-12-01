/**
 * AudioManager - Manages background music and sound effects for the dream experience
 */

export class AudioManager {
  constructor() {
    this.audioContext = null;
    this.backgroundMusic = null;
    this.currentMood = "calm";
    this.isMusicPlaying = false;
    this.masterVolume = 0.3;
    this.musicVolume = 0.2;
    this.sfxVolume = 0.4;

    // Initialize audio context on first user interaction
    this.initialized = false;
  }

  /**
   * Initialize audio context (must be called after user interaction)
   */
  initialize() {
    if (this.initialized) return;

    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      this.initialized = true;
      console.log("🎵 Audio system initialized");
    } catch (error) {
      console.error("Audio initialization failed:", error);
    }
  }

  /**
   * Play ambient background music based on mood
   */
  playBackgroundMusic(mood = "calm") {
    this.initialize();

    if (!this.audioContext) return;

    this.currentMood = mood;

    // Stop current music
    this.stopBackgroundMusic();

    // Create oscillators for ambient soundscape
    const now = this.audioContext.currentTime;

    // Base drone
    const bass = this.audioContext.createOscillator();
    const bassGain = this.audioContext.createGain();

    // Atmospheric pad
    const pad = this.audioContext.createOscillator();
    const padGain = this.audioContext.createGain();

    // High shimmer
    const shimmer = this.audioContext.createOscillator();
    const shimmerGain = this.audioContext.createGain();

    // Configure based on mood
    const moodConfig = this.getMoodConfig(mood);

    bass.type = "sine";
    bass.frequency.setValueAtTime(moodConfig.bassFreq, now);
    bassGain.gain.setValueAtTime(this.musicVolume * 0.3, now);

    pad.type = "triangle";
    pad.frequency.setValueAtTime(moodConfig.padFreq, now);
    padGain.gain.setValueAtTime(this.musicVolume * 0.2, now);

    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(moodConfig.shimmerFreq, now);
    shimmerGain.gain.setValueAtTime(this.musicVolume * 0.1, now);

    // Add LFO for modulation
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.setValueAtTime(moodConfig.lfoSpeed, now);
    lfoGain.gain.setValueAtTime(moodConfig.lfoDepth, now);

    // Connect nodes
    lfo.connect(lfoGain);
    lfoGain.connect(pad.frequency);

    bass.connect(bassGain);
    bassGain.connect(this.audioContext.destination);

    pad.connect(padGain);
    padGain.connect(this.audioContext.destination);

    shimmer.connect(shimmerGain);
    shimmerGain.connect(this.audioContext.destination);

    // Start oscillators
    bass.start();
    pad.start();
    shimmer.start();
    lfo.start();

    // Store references
    this.backgroundMusic = {
      bass,
      bassGain,
      pad,
      padGain,
      shimmer,
      shimmerGain,
      lfo,
      lfoGain,
    };

    this.isMusicPlaying = true;
    console.log(`🎶 Playing ${mood} ambient music`);
  }

  /**
   * Get mood configuration
   */
  getMoodConfig(mood) {
    const configs = {
      calm: {
        bassFreq: 55, // A1
        padFreq: 220, // A3
        shimmerFreq: 880, // A5
        lfoSpeed: 0.2,
        lfoDepth: 5,
      },
      mysterious: {
        bassFreq: 49, // G1
        padFreq: 196, // G3
        shimmerFreq: 784, // G5
        lfoSpeed: 0.3,
        lfoDepth: 10,
      },
      ethereal: {
        bassFreq: 65.41, // C2
        padFreq: 261.63, // C4
        shimmerFreq: 1046.5, // C6
        lfoSpeed: 0.15,
        lfoDepth: 15,
      },
      intense: {
        bassFreq: 46.25, // F#1
        padFreq: 185, // F#3
        shimmerFreq: 740, // F#5
        lfoSpeed: 0.5,
        lfoDepth: 20,
      },
      dreamy: {
        bassFreq: 58.27, // A#1
        padFreq: 233.08, // A#3
        shimmerFreq: 932.33, // A#5
        lfoSpeed: 0.1,
        lfoDepth: 8,
      },
    };

    return configs[mood] || configs.calm;
  }

  /**
   * Stop background music
   */
  stopBackgroundMusic() {
    if (!this.backgroundMusic) return;

    try {
      const now = this.audioContext.currentTime;

      // Fade out
      this.backgroundMusic.bassGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.5
      );
      this.backgroundMusic.padGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.5
      );
      this.backgroundMusic.shimmerGain.gain.exponentialRampToValueAtTime(
        0.001,
        now + 0.5
      );

      // Stop after fade
      setTimeout(() => {
        if (this.backgroundMusic) {
          this.backgroundMusic.bass.stop();
          this.backgroundMusic.pad.stop();
          this.backgroundMusic.shimmer.stop();
          this.backgroundMusic.lfo.stop();
          this.backgroundMusic = null;
        }
      }, 600);

      this.isMusicPlaying = false;
    } catch (error) {
      console.error("Error stopping music:", error);
    }
  }

  /**
   * Play a notification sound
   */
  playNotificationSound() {
    this.initialize();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);

    gain.gain.setValueAtTime(this.sfxVolume * 0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.2);
  }

  /**
   * Play message received sound
   */
  playMessageSound() {
    this.initialize();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(800, now + 0.05);

    gain.gain.setValueAtTime(this.sfxVolume * 0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  /**
   * Play typing sound
   */
  playTypingSound() {
    this.initialize();
    if (!this.audioContext) return;

    const now = this.audioContext.currentTime;

    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = "square";
    osc.frequency.setValueAtTime(200 + Math.random() * 100, now);

    gain.gain.setValueAtTime(this.sfxVolume * 0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Text-to-speech for AI responses
   */
  speak(text, options = {}) {
    if (!("speechSynthesis" in window)) {
      console.warn("Text-to-speech not supported");
      return;
    }

    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.9;
    utterance.pitch = options.pitch || 1.1;
    utterance.volume = this.sfxVolume;

    // Try to find a nice voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes("Google") ||
        v.name.includes("Female") ||
        v.name.includes("Samantha")
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);
  }

  /**
   * Stop all speech
   */
  stopSpeech() {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  }

  /**
   * Set master volume
   */
  setMasterVolume(volume) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  /**
   * Toggle music on/off
   */
  toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopBackgroundMusic();
    } else {
      this.playBackgroundMusic(this.currentMood);
    }
    return this.isMusicPlaying;
  }
}
