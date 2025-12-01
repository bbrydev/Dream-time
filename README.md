# DreamTime

A small, friendly 3D dream visualization experience — initial project setup and scaffold. (https://dream-time-eight.vercel.app/)


> A gentle way to bring imagination to life

DreamTime is a project that turns written dreams into a calm and living 3D world. It begins in a small room that feels warm and familiar, almost like a peaceful living space with a sofa, a table, soft lighting, and even a little cartoon playing on the television. This space represents the real world we know.

But when you type your dream and press enter, the room slowly changes. The colors shift, the walls feel alive, and new objects appear based on the emotions and images in your writing. Fear might create darker lights and heavy sounds, while a peaceful dream can fill the room with soft colors and gentle movement.

## Why This Exists

Dreams fade so quickly after we wake up. I wanted to hold on to that fragile moment before they disappear. DreamTime is more than a tool—it is a gentle way to give shape to thoughts we usually forget, and to show how humans and technology can come together to create something emotional, personal, and meaningful.

## How It Works

The system reads your dream and finds the feelings inside it. It notices the colors and the actions you describe, and then uses that information to reshape the entire environment:

- **Dream Parser** - Analyzes your text to extract emotions, colors, objects, and movements
- **Visual Manifestation** - Builds light, shapes, and motion that match your story in real-time
- **Emotional Memory** - Saves every dream so you can look back and see how your feelings shift over time
- **Voice Response** - Speaks back to you with a message that feels like your own mind answering
- **Procedural Audio** - Creates sound that fits the mood of your dream
- **Temporal Effects** - When dreams become intense, the world reacts with shaking, bending, or slowing down as if time itself is changing

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Tips: After install, run the development server (`npm run dev`) and open http://localhost:5173 to begin experimenting with DreamTime.

## Usage

1. Type your dream in the text area—something like "floating through a purple sky while feeling calm and scared at the same time"
2. Press `Ctrl+Enter` or click "Manifest Dream"
3. Watch as the room fills with light and color, stars appear, soft sound plays, and the voice reflects your dream
4. Navigate the 3D space with mouse controls to explore your manifested dream
5. Press `H` to view your dream history
6. Press `ESC` to toggle the input interface

## What You'll Experience

When you enter a dream, the environment responds:

- **Fear** creates darker lights, purple fog, and heavy sounds
- **Peace** fills the room with soft colors, green tones, and gentle movement
- **Wonder** brings ethereal purple and pink light with shimmering sounds
- **Sadness** shifts to gray and blue tones with slow, melancholic ambiance
- **Joy** bursts with bright yellow light and uplifting sounds
- **Anxiety** adds red tones, tense sounds, and visual chaos

## Tech Stack

- **Three.js** - Creates the 3D space and visual rendering
- **Vite** - Ensures fast performance and smooth development
- **Web Audio API** - Generates procedural sound that matches the mood
- **Web Speech API** - Provides voice narration and responses
- **Vanilla JavaScript** - Pure, clean code for optimal performance
- **AI Integration** - Reads and interprets the emotional content of your dreams

## License

MIT



