import Groq from "groq-sdk";

/**
 * DreamConversation - AI-powered dream analysis and conversation using Groq
 * The AI acts as a mystical dream interpreter and companion
 */

export class DreamConversation {
  constructor() {
    this.groq = null;
    this.apiKey = null;
    this.conversationHistory = [];
    this.systemPrompt = `You are a mystical dream interpreter and companion living in a virtual voxel room. You have a deep understanding of dreams, psychology, symbolism, and the subconscious mind. 

Your personality:
- Mystical and enchanting, but warm and friendly
- You speak poetically but clearly
- You're genuinely curious about dreams and their meanings
- You offer insights without being prescriptive
- You ask follow-up questions to understand dreams deeper
- You sometimes reference symbolism, archetypes, and emotions

Your responses should be:
- Conversational and engaging (2-4 sentences usually)
- Thoughtful and insightful
- Encouraging of further exploration
- Sometimes playful or mysterious
- Always supportive and non-judgmental

You can discuss dreams, their meanings, emotions, symbolism, or just chat about the dream experience itself.`;
  }

  /**
   * Initialize AI with API key
   */
  initializeGroq(apiKey) {
    if (!apiKey || apiKey.trim() === "") {
      throw new Error("System initialization failed");
    }

    this.apiKey = apiKey;
    this.groq = new Groq({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true, // Enable browser usage
    });

    this.conversationHistory = [
      {
        role: "system",
        content: this.systemPrompt,
      },
      {
        role: "assistant",
        content:
          "Welcome, dreamer... I sense you've entered the dream space. Tell me, what visions dance through your mind?",
      },
    ];

    console.log("🤖 AI Dream companion ready");
    return true;
  }

  /**
   * Check if AI is initialized
   */
  isInitialized() {
    return this.groq !== null;
  }

  /**
   * Send a message and get AI response
   */
  async sendMessage(userMessage) {
    if (!this.isInitialized()) {
      throw new Error("AI system not initialized.");
    }

    // Add user message to history
    this.conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    try {
      // Get AI response
      const completion = await this.groq.chat.completions.create({
        messages: this.conversationHistory,
        model: "llama-3.3-70b-versatile", // Fast and powerful model
        temperature: 0.8, // More creative responses
        max_tokens: 300, // Keep responses concise
        top_p: 0.9,
        stream: false,
      });

      const aiResponse =
        completion.choices[0]?.message?.content ||
        "I sense the dream fading... tell me more.";

      // Add AI response to history
      this.conversationHistory.push({
        role: "assistant",
        content: aiResponse,
      });

      // Keep history manageable (last 20 messages)
      if (this.conversationHistory.length > 22) {
        // Keep system prompt + last 20 messages
        this.conversationHistory = [
          this.conversationHistory[0], // System prompt
          ...this.conversationHistory.slice(-20),
        ];
      }

      return {
        response: aiResponse,
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error("AI API error:", error);

      // Provide helpful error message
      if (
        error.message?.includes("401") ||
        error.message?.includes("API key")
      ) {
        throw new Error("Authentication failed. Please try again.");
      } else if (error.message?.includes("rate_limit")) {
        throw new Error(
          "Too many requests. Please wait a moment and try again."
        );
      } else {
        throw new Error("Connection error: " + error.message);
      }
    }
  }

  /**
   * Get initial greeting for dream analysis
   */
  async analyzeDream(dreamText) {
    const analysisPrompt = `I just had this dream: "${dreamText}"\n\nWhat insights can you share about this dream?`;
    return await this.sendMessage(analysisPrompt);
  }

  /**
   * Reset conversation
   */
  resetConversation() {
    this.conversationHistory = [
      {
        role: "system",
        content: this.systemPrompt,
      },
      {
        role: "assistant",
        content:
          "The dream space resets... I'm here when you're ready to explore new visions.",
      },
    ];
  }

  /**
   * Get conversation history for display
   */
  getHistory() {
    return this.conversationHistory.filter((msg) => msg.role !== "system");
  }

  /**
   * Export conversation
   */
  exportConversation() {
    return {
      timestamp: Date.now(),
      messages: this.conversationHistory.filter((msg) => msg.role !== "system"),
    };
  }
}
