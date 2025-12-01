import { SVGToTexture } from './SVGToTexture.js';
import { Scene1Chase } from './scenes/Scene1_Chase.js';
import { Scene2Hiding } from './scenes/Scene2_Hiding.js';
import { Scene3Trap } from './scenes/Scene3_Trap.js';
import { Scene4Reaction } from './scenes/Scene4_Reaction.js';

/**
 * Main cartoon episode controller
 * Manages timeline and scene transitions
 */
export class CartoonEpisode {
    constructor() {
        this.svgToTexture = new SVGToTexture(1024, 576);
        this.svg = this.svgToTexture.getSVG();

        // Initialize scenes
        this.scenes = [
            new Scene1Chase(),    // 5 seconds - chase
            new Scene2Hiding(),   // 5 seconds - hiding
            new Scene3Trap(),     // 6 seconds - trap
            new Scene4Reaction()  // 4 seconds - reaction
        ];

        this.currentSceneIndex = 0;
        this.sceneStartTime = 0;
        this.totalTime = 0;

        // Calculate total episode duration
        this.episodeDuration = this.scenes.reduce((sum, scene) => sum + scene.duration, 0);
    }

    /**
     * Update animation based on elapsed time
     * @param {number} deltaTime - Time since last update in milliseconds
     */
    update(deltaTime) {
        this.totalTime += deltaTime;

        // Loop the episode
        const episodeTime = this.totalTime % this.episodeDuration;

        // Find current scene
        let accumulatedTime = 0;
        for (let i = 0; i < this.scenes.length; i++) {
            const scene = this.scenes[i];
            if (episodeTime < accumulatedTime + scene.duration) {
                // This is the current scene
                if (this.currentSceneIndex !== i) {
                    this.currentSceneIndex = i;
                    this.sceneStartTime = accumulatedTime;
                }

                const sceneTime = episodeTime - accumulatedTime;
                scene.render(this.svg, this.totalTime, sceneTime);
                this.svgToTexture.updateTexture();
                break;
            }
            accumulatedTime += scene.duration;
        }
    }

    /**
     * Get the Three.js texture
     */
    getTexture() {
        return this.svgToTexture.getTexture();
    }

    /**
     * Cleanup
     */
    dispose() {
        this.svgToTexture.dispose();
    }
}
