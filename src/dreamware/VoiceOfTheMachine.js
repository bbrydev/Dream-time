/**
 * VoiceOfTheMachine - AI narration and reactive soundscapes
 * Implements 'Voice of the Machine' - system speaks back
 */

export class VoiceOfTheMachine {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.currentNarration = null;
    this.isSpeaking = false;
    this.soundscape = null;
    this.voiceEnabled = true;

    this.initAudioContext();
  }

  /**
   * Initialize Web Audio API
   */
  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      console.log("🔊 Audio system initialized");
    } catch (error) {
      console.warn("Audio not supported:", error);
    }
  }

  /**
   * Speak narration text (AI-like voice)
   */
  speak(text, emotion = "wonder") {
    if (!this.voiceEnabled || !text) return;

    // Use Web Speech API if available
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Configure voice based on emotion
      utterance.rate = this.getVoiceRate(emotion);
      utterance.pitch = this.getVoicePitch(emotion);
      utterance.volume = 0.7;

      // Try to find a suitable voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (voice) =>
          voice.name.includes("Google") ||
          voice.name.includes("Microsoft") ||
          voice.name.includes("Alex")
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        console.log("🗣️ Machine speaks:", text);
      };

      utterance.onend = () => {
        this.isSpeaking = false;
      };

      speechSynthesis.cancel(); // Cancel any ongoing speech
      speechSynthesis.speak(utterance);

      this.currentNarration = text;
    } else {
      console.log("🗣️ Machine would say:", text);
    }
  }

  /**
   * Get voice rate based on emotion
   */
  getVoiceRate(emotion) {
    const rates = {
      fear: 1.3,
      joy: 1.1,
      sadness: 0.8,
      wonder: 0.9,
      anxiety: 1.4,
      peace: 0.7,
    };
    return rates[emotion] || 1.0;
  }

  /**
   * Get voice pitch based on emotion
   */
  getVoicePitch(emotion) {
    const pitches = {
      fear: 0.7,
      joy: 1.3,
      sadness: 0.8,
      wonder: 1.0,
      anxiety: 1.2,
      peace: 0.9,
    };
    return pitches[emotion] || 1.0;
  }

  /**
   * Create reactive soundscape based on emotion
   */
  createSoundscape(emotion, intensity = 0.5) {
    if (!this.audioContext) return;

    this.stopSoundscape();

    const soundscapeType = this.getSoundscapeType(emotion);
    this.soundscape = this.generateSoundscape(soundscapeType, intensity);

    console.log(`🎵 Creating ${emotion} soundscape`);
  }

  /**
   * Get soundscape type for emotion
   */
  getSoundscapeType(emotion) {
    const types = {
      fear: "dark",
      joy: "bright",
      sadness: "melancholic",
      wonder: "ethereal",
      anxiety: "tense",
      peace: "ambient",
    };
    return types[emotion] || "ethereal";
  }

  /**
   * Generate procedural soundscape
   */
  generateSoundscape(type, intensity) {
    if (!this.audioContext) return null;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    // Configure based on soundscape type
    const configs = {
      dark: {
        type: "sawtooth",
        frequency: 55,
        filterFreq: 200,
        filterType: "lowpass",
      },
      bright: {
        type: "sine",
        frequency: 440,
        filterFreq: 2000,
        filterType: "highpass",
      },
      melancholic: {
        type: "triangle",
        frequency: 220,
        filterFreq: 500,
        filterType: "bandpass",
      },
      ethereal: {
        type: "sine",
        frequency: 330,
        filterFreq: 1000,
        filterType: "lowpass",
      },
      tense: {
        type: "square",
        frequency: 110,
        filterFreq: 300,
        filterType: "highpass",
      },
      ambient: {
        type: "sine",
        frequency: 165,
        filterFreq: 800,
        filterType: "lowpass",
      },
    };

    const config = configs[type] || configs.ethereal;

    oscillator.type = config.type;
    oscillator.frequency.value = config.frequency;

    filterNode.type = config.filterType;
    filterNode.frequency.value = config.filterFreq;

    gainNode.gain.value = intensity * 0.1; // Keep volume low

    // Connect nodes
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Start
    oscillator.start();

    return {
      oscillator,
      gainNode,
      filterNode,
      type,
    };
  }

  /**
   * Play interaction sound
   */
  playInteractionSound(type = "click") {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Configure based on interaction type
    const sounds = {
      click: { freq: 800, duration: 0.05 },
      hover: { freq: 600, duration: 0.03 },
      whoosh: { freq: 400, duration: 0.2 },
      chime: { freq: 1000, duration: 0.3 },
      pulse: { freq: 220, duration: 0.15 },
    };

    const sound = sounds[type] || sounds.click;

    oscillator.frequency.value = sound.freq;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + sound.duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + sound.duration);
  }

  /**
   * Create ambient whispers (textual, not audio)
   */
  generateWhisper(dreamData) {
    const whispers = [
      "The dream remembers...",
      "Reality shifts at the edges...",
      "What is real?",
      "Time flows backwards here...",
      "The machine dreams too...",
      "Your thoughts become tangible...",
      "Nothing is permanent...",
      "Everything changes...",
      "The void listens...",
      "Dreams within dreams...",
    ];

    return whispers[Math.floor(Math.random() * whispers.length)];
  }

  /**
   * React to user action with narration
   */
  reactToAction(action, context = {}) {
    const reactions = {
      dreamEntered: [
        "Processing your subconscious...",
        "Decoding dream patterns...",
        "Your dream takes form...",
        "Reality bends to your vision...",
      ],
      dreamVisualized: [
        "The dream manifests...",
        "Watch it come alive...",
        "Your imagination materializes...",
        "The space transforms...",
      ],
      historyOpened: [
        "Revisiting past dreams...",
        "Your emotional archive...",
        "Memories preserved in data...",
        "The trail of your subconscious...",
      ],
      timeShifted: [
        "Time distorts...",
        "Reality becomes unstable...",
        "The temporal fabric tears...",
        "Nothing stays fixed...",
      ],
    };

    const messages = reactions[action];
    if (messages) {
      const message = messages[Math.floor(Math.random() * messages.length)];
      return message;
    }

    return "The machine observes...";
  }

  /**
   * Stop current soundscape
   */
  stopSoundscape() {
    if (this.soundscape && this.soundscape.oscillator) {
      try {
        this.soundscape.oscillator.stop();
      } catch (e) {
        // Already stopped
      }
      this.soundscape = null;
    }
  }

  /**
   * Stop speaking
   */
  stopSpeaking() {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    this.isSpeaking = false;
  }

  /**
   * Toggle voice on/off
   */
  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    if (!this.voiceEnabled) {
      this.stopSpeaking();
    }
    return this.voiceEnabled;
  }

  /**
   * Update soundscape parameters in real-time
   */
  updateSoundscape(intensity, emotion) {
    if (!this.soundscape) return;

    const targetVolume = intensity * 0.1;
    this.soundscape.gainNode.gain.linearRampToValueAtTime(
      targetVolume,
      this.audioContext.currentTime + 0.5
    );

    // Modulate frequency based on emotion
    const emotionFreqs = {
      fear: 55,
      joy: 440,
      sadness: 220,
      wonder: 330,
      anxiety: 110,
      peace: 165,
    };

    const targetFreq = emotionFreqs[emotion] || 330;
    this.soundscape.oscillator.frequency.linearRampToValueAtTime(
      targetFreq,
      this.audioContext.currentTime + 1.0
    );
  }

  /**
   * Create typing sound effect
   */
  playTypingSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = 400 + Math.random() * 200;
    oscillator.type = "square";

    gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + 0.02
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.02);
  }

  /**
   * Clean up
   */
  dispose() {
    this.stopSoundscape();
    this.stopSpeaking();

    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
