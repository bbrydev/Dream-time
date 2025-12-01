/**
 * DreamParser - Analyzes dream text to extract emotions, objects, colors, and themes
 * Implements 'Voice of the Machine' by interpreting dreams
 */

export class DreamParser {
  constructor() {
    // Emotion keywords mapping
    this.emotionKeywords = {
      fear: [
        "afraid",
        "scary",
        "terrified",
        "nightmare",
        "dark",
        "shadow",
        "chase",
        "running",
        "escape",
        "panic",
        "danger",
      ],
      joy: [
        "happy",
        "laughing",
        "joy",
        "bright",
        "light",
        "dancing",
        "flying",
        "floating",
        "freedom",
        "smile",
        "bliss",
      ],
      sadness: [
        "sad",
        "crying",
        "tears",
        "alone",
        "lost",
        "empty",
        "gray",
        "rain",
        "melancholy",
        "grief",
      ],
      wonder: [
        "amazing",
        "beautiful",
        "surreal",
        "magical",
        "wonder",
        "awe",
        "strange",
        "mysterious",
        "dream",
        "ethereal",
      ],
      anxiety: [
        "worry",
        "stress",
        "late",
        "falling",
        "unprepared",
        "confused",
        "chaos",
        "overwhelmed",
        "dizzy",
      ],
      peace: [
        "calm",
        "peaceful",
        "serene",
        "quiet",
        "gentle",
        "soft",
        "warm",
        "comfort",
        "safe",
        "still",
      ],
    };

    // Color keywords
    this.colorKeywords = {
      purple: ["purple", "violet", "lavender", "lilac", "amethyst"],
      blue: ["blue", "azure", "cyan", "sapphire", "ocean", "sky"],
      red: ["red", "crimson", "scarlet", "blood", "ruby"],
      green: ["green", "emerald", "jade", "forest", "nature"],
      yellow: ["yellow", "gold", "golden", "sun", "amber"],
      pink: ["pink", "rose", "magenta", "fuchsia"],
      black: ["black", "dark", "shadow", "night", "void"],
      white: ["white", "bright", "light", "glow", "pale"],
    };

    // Object/environment keywords
    this.objectKeywords = {
      nature: [
        "tree",
        "flower",
        "garden",
        "forest",
        "plant",
        "leaf",
        "vine",
        "grass",
        "mountain",
        "river",
      ],
      sky: ["sky", "cloud", "star", "moon", "sun", "space", "cosmos", "heaven"],
      water: ["water", "ocean", "sea", "lake", "river", "rain", "wave", "pool"],
      abstract: [
        "shape",
        "form",
        "pattern",
        "geometric",
        "spiral",
        "circle",
        "sphere",
        "cube",
      ],
      creatures: [
        "bird",
        "fish",
        "animal",
        "creature",
        "dragon",
        "butterfly",
        "cat",
        "dog",
        "wolf",
      ],
      human: [
        "person",
        "people",
        "face",
        "hand",
        "eye",
        "figure",
        "silhouette",
        "shadow",
      ],
      architecture: [
        "building",
        "house",
        "door",
        "window",
        "wall",
        "tower",
        "stairs",
        "room",
      ],
    };

    // Movement/action keywords
    this.movementKeywords = {
      floating: ["float", "floating", "drift", "hover", "suspended"],
      flying: ["fly", "flying", "soar", "glide", "wings"],
      falling: ["fall", "falling", "drop", "plunge", "descend"],
      running: ["run", "running", "chase", "escape", "sprint"],
      walking: ["walk", "walking", "wander", "stroll"],
      morphing: [
        "change",
        "transform",
        "shift",
        "morph",
        "become",
        "melt",
        "dissolve",
      ],
    };
  }

  /**
   * Parse dream text and extract meaningful data
   */
  parse(dreamText) {
    const text = dreamText.toLowerCase();
    const words = text.split(/\s+/);

    return {
      text: dreamText,
      timestamp: Date.now(),
      emotions: this.detectEmotions(text),
      colors: this.detectColors(text),
      objects: this.detectObjects(text),
      movements: this.detectMovements(text),
      intensity: this.calculateIntensity(text),
      dominantEmotion: this.getDominantEmotion(text),
      wordCount: words.length,
      aiNarration: this.generateNarration(dreamText),
    };
  }

  /**
   * Detect emotions in dream text
   */
  detectEmotions(text) {
    const emotions = {};
    let totalScore = 0;

    for (const [emotion, keywords] of Object.entries(this.emotionKeywords)) {
      let score = 0;
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        const matches = text.match(regex);
        if (matches) {
          score += matches.length;
        }
      });

      if (score > 0) {
        emotions[emotion] = score;
        totalScore += score;
      }
    }

    // Normalize scores
    for (const emotion in emotions) {
      emotions[emotion] = emotions[emotion] / totalScore;
    }

    return emotions;
  }

  /**
   * Detect colors mentioned in dream
   */
  detectColors(text) {
    const colors = [];

    for (const [color, keywords] of Object.entries(this.colorKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          if (!colors.includes(color)) {
            colors.push(color);
          }
        }
      }
    }

    return colors;
  }

  /**
   * Detect objects and environments
   */
  detectObjects(text) {
    const objects = {};

    for (const [category, keywords] of Object.entries(this.objectKeywords)) {
      let count = 0;
      keywords.forEach((keyword) => {
        if (text.includes(keyword)) {
          count++;
        }
      });

      if (count > 0) {
        objects[category] = count;
      }
    }

    return objects;
  }

  /**
   * Detect movements and actions
   */
  detectMovements(text) {
    const movements = [];

    for (const [movement, keywords] of Object.entries(this.movementKeywords)) {
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          if (!movements.includes(movement)) {
            movements.push(movement);
          }
        }
      }
    }

    return movements;
  }

  /**
   * Calculate overall intensity of dream
   */
  calculateIntensity(text) {
    const intensityWords = [
      "very",
      "extremely",
      "intense",
      "overwhelming",
      "vivid",
      "powerful",
      "strong",
    ];
    let intensity = 0.5; // baseline

    intensityWords.forEach((word) => {
      if (text.includes(word)) {
        intensity += 0.1;
      }
    });

    return Math.min(intensity, 1.0);
  }

  /**
   * Get the dominant emotion
   */
  getDominantEmotion(text) {
    const emotions = this.detectEmotions(text);
    let dominant = "wonder";
    let maxScore = 0;

    for (const [emotion, score] of Object.entries(emotions)) {
      if (score > maxScore) {
        maxScore = score;
        dominant = emotion;
      }
    }

    return dominant;
  }

  /**
   * Generate AI-like narration based on dream content
   */
  generateNarration(dreamText) {
    const emotions = this.detectEmotions(dreamText.toLowerCase());
    const colors = this.detectColors(dreamText.toLowerCase());
    const movements = this.detectMovements(dreamText.toLowerCase());

    const narrations = {
      fear: [
        "The shadows whisper your name...",
        "Reality fractures at the edges...",
        "Something watches from beyond the dream...",
        "The darkness remembers you...",
      ],
      joy: [
        "Light dances in impossible patterns...",
        "The universe smiles with you...",
        "Your dream sings with color...",
        "Euphoria crystallizes into form...",
      ],
      sadness: [
        "Memories dissolve like rain...",
        "The dream mourns with you...",
        "Echoes of what was linger...",
        "Tears become stars...",
      ],
      wonder: [
        "Reality bends to your imagination...",
        "The impossible becomes tangible...",
        "Magic flows through the dreamspace...",
        "Mysteries unfold before you...",
      ],
      anxiety: [
        "Time fractures and reforms...",
        "The dream shifts beneath your feet...",
        "Uncertainty manifests in waves...",
        "Everything changes, nothing stays...",
      ],
      peace: [
        "Serenity flows through the space...",
        "The dream breathes with calm...",
        "Stillness holds infinite depth...",
        "Tranquility becomes visible...",
      ],
    };

    const dominant = this.getDominantEmotion(dreamText.toLowerCase());
    const options = narrations[dominant] || narrations.wonder;
    const narration = options[Math.floor(Math.random() * options.length)];

    return narration;
  }

  /**
   * Get color palette based on emotions
   */
  getEmotionalColorPalette(emotions) {
    const palettes = {
      fear: ["#1a0033", "#4a0066", "#8b00ff", "#000000"],
      joy: ["#ffeb3b", "#ff9800", "#ff5722", "#ffc107"],
      sadness: ["#263238", "#455a64", "#607d8b", "#90a4ae"],
      wonder: ["#8b5cf6", "#6366f1", "#ec4899", "#a78bfa"],
      anxiety: ["#ff1744", "#f50057", "#d500f9", "#651fff"],
      peace: ["#4caf50", "#81c784", "#aed581", "#c5e1a5"],
    };

    // Mix colors based on emotion weights
    let dominantPalette = palettes.wonder;
    let maxWeight = 0;

    for (const [emotion, weight] of Object.entries(emotions)) {
      if (weight > maxWeight && palettes[emotion]) {
        maxWeight = weight;
        dominantPalette = palettes[emotion];
      }
    }

    return dominantPalette;
  }

  /**
   * Export for potential AI API integration (Gemini/OpenAI)
   * This is a placeholder for future enhancement
   */
  async analyzeWithAI(dreamText, apiKey = null) {
    // Placeholder for AI API integration
    // For now, return local analysis
    console.log("AI analysis would be called here with:", dreamText);

    return {
      enhanced: this.parse(dreamText),
      suggestion: "Connect AI API (Gemini/OpenAI) for deeper dream analysis",
    };
  }
}
