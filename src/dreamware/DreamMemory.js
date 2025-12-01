/**
 * DreamMemory - Stores and retrieves dream history
 * Implements 'Emotional Memory' - previous dreams affect future experiences
 */

export class DreamMemory {
  constructor() {
    this.storageKey = "dreamware_memory";
    this.dreams = this.loadDreams();
    this.emotionalTrail = [];
    this.maxDreams = 50;
  }

  /**
   * Store a new dream
   */
  storeDream(dreamData) {
    const dream = {
      id: Date.now(),
      timestamp: Date.now(),
      text: dreamData.text,
      emotions: dreamData.emotions,
      dominantEmotion: dreamData.dominantEmotion,
      colors: dreamData.colors,
      intensity: dreamData.intensity,
      aiNarration: dreamData.aiNarration,
    };

    this.dreams.unshift(dream);

    // Keep only the most recent dreams
    if (this.dreams.length > this.maxDreams) {
      this.dreams = this.dreams.slice(0, this.maxDreams);
    }

    // Update emotional trail
    this.emotionalTrail.push({
      emotion: dreamData.dominantEmotion,
      timestamp: dream.timestamp,
      intensity: dreamData.intensity,
    });

    this.saveDreams();
    return dream;
  }

  /**
   * Get all dreams
   */
  getAllDreams() {
    return this.dreams;
  }

  /**
   * Get dreams by emotion
   */
  getDreamsByEmotion(emotion) {
    return this.dreams.filter((dream) => dream.dominantEmotion === emotion);
  }

  /**
   * Get recent dreams (last N)
   */
  getRecentDreams(count = 5) {
    return this.dreams.slice(0, count);
  }

  /**
   * Get emotional trail - history of dominant emotions
   */
  getEmotionalTrail() {
    return this.emotionalTrail;
  }

  /**
   * Get dominant emotion across all dreams
   */
  getOverallDominantEmotion() {
    if (this.dreams.length === 0) return "wonder";

    const emotionCounts = {};
    this.dreams.forEach((dream) => {
      const emotion = dream.dominantEmotion;
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });

    let dominant = "wonder";
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(emotionCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominant = emotion;
      }
    }

    return dominant;
  }

  /**
   * Get emotional influence - how past dreams should affect current visualization
   */
  getEmotionalInfluence() {
    const recentDreams = this.getRecentDreams(5);
    if (recentDreams.length === 0) {
      return {
        intensity: 0.5,
        dominantEmotion: "wonder",
        colorShift: 0,
        timeDistortion: 1.0,
      };
    }

    // Calculate average intensity
    const avgIntensity =
      recentDreams.reduce((sum, dream) => sum + dream.intensity, 0) /
      recentDreams.length;

    // Get most common emotion
    const emotionCounts = {};
    recentDreams.forEach((dream) => {
      emotionCounts[dream.dominantEmotion] =
        (emotionCounts[dream.dominantEmotion] || 0) + 1;
    });

    let dominantEmotion = "wonder";
    let maxCount = 0;
    for (const [emotion, count] of Object.entries(emotionCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantEmotion = emotion;
      }
    }

    return {
      intensity: avgIntensity,
      dominantEmotion: dominantEmotion,
      colorShift: recentDreams.length * 5, // Hue rotation based on dream count
      timeDistortion: 1.0 + avgIntensity * 0.5, // Time moves differently based on intensity
      dreamCount: recentDreams.length,
    };
  }

  /**
   * Get formatted dreams for display
   */
  getFormattedDreams() {
    return this.dreams.map((dream) => ({
      ...dream,
      formattedDate: this.formatDate(dream.timestamp),
      preview: this.getPreview(dream.text),
      emotionLabel: this.getEmotionLabel(dream.dominantEmotion),
    }));
  }

  /**
   * Clear all dreams
   */
  clearAllDreams() {
    this.dreams = [];
    this.emotionalTrail = [];
    this.saveDreams();
  }

  /**
   * Delete a specific dream
   */
  deleteDream(dreamId) {
    this.dreams = this.dreams.filter((dream) => dream.id !== dreamId);
    this.saveDreams();
  }

  /**
   * Load dreams from localStorage
   */
  loadDreams() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        return data.dreams || [];
      }
    } catch (error) {
      console.error("Error loading dreams:", error);
    }
    return [];
  }

  /**
   * Save dreams to localStorage
   */
  saveDreams() {
    try {
      const data = {
        dreams: this.dreams,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving dreams:", error);
    }
  }

  /**
   * Format timestamp to readable date
   */
  formatDate(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  }

  /**
   * Get preview of dream text
   */
  getPreview(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  /**
   * Get emotion label
   */
  getEmotionLabel(emotion) {
    const labels = {
      fear: "😨 Fear",
      joy: "😊 Joy",
      sadness: "😢 Sadness",
      wonder: "✨ Wonder",
      anxiety: "😰 Anxiety",
      peace: "🕊️ Peace",
    };
    return labels[emotion] || "✨ Wonder";
  }

  /**
   * Export dreams as JSON
   */
  exportDreams() {
    return JSON.stringify(this.dreams, null, 2);
  }

  /**
   * Import dreams from JSON
   */
  importDreams(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        this.dreams = imported;
        this.saveDreams();
        return true;
      }
    } catch (error) {
      console.error("Error importing dreams:", error);
    }
    return false;
  }
}
