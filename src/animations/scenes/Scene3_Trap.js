import { Cat } from '../characters/Cat.js';
import { Mouse } from '../characters/Mouse.js';

/**
 * Scene 3: Trap setup
 */
export class Scene3Trap {
    constructor() {
        this.duration = 6000; // 6 seconds
        this.cat = new Cat();
        this.mouse = new Mouse();
        this.trapSprung = false;
    }

    render(svg, time, sceneTime) {
        // Clear previous content
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Background
        const bg = this.createBackground();
        svg.appendChild(bg);

        const progress = sceneTime / this.duration;

        // Mouse setting up trap (first 2 seconds)
        if (sceneTime < 2000) {
            this.mouse.setPosition(300, 400).setScale(0.8);
            svg.appendChild(this.mouse.createSVG());

            // Show rope and bucket
            this.drawTrap(svg, 600, 200, false);
        }
        // Cat approaches (2-4 seconds)
        else if (sceneTime < 4000) {
            const catProgress = (sceneTime - 2000) / 2000;
            this.cat.setPosition(100 + catProgress * 450, 400);
            svg.appendChild(this.cat.createSVG());

            this.drawTrap(svg, 600, 200, false);

            // Mouse hiding
            this.mouse.setPosition(800, 400).setScale(0.6);
            svg.appendChild(this.mouse.createSVG());
        }
        // Trap springs! (4+ seconds)
        else {
            this.cat.setPosition(600, 400);
            svg.appendChild(this.cat.createSVG());

            this.drawTrap(svg, 600, 200, true);

            // Mouse laughing
            this.mouse.setPosition(850, 400).setScale(0.7);
            svg.appendChild(this.mouse.createSVG());

            // Exclamation marks
            this.addExclamation(svg, 600, 280);
        }
    }

    createBackground() {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '1024');
        rect.setAttribute('height', '576');
        rect.setAttribute('fill', '#98D8C8');
        return rect;
    }

    drawTrap(svg, x, y, sprung) {
        // Rope
        const rope = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rope.setAttribute('x1', x);
        rope.setAttribute('y1', y);
        rope.setAttribute('x2', x);
        rope.setAttribute('y2', sprung ? 350 : y + 50);
        rope.setAttribute('stroke', '#8B4513');
        rope.setAttribute('stroke-width', '4');
        svg.appendChild(rope);

        // Bucket
        const bucket = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bucket.setAttribute('x', x - 25);
        bucket.setAttribute('y', sprung ? 350 : y + 50);
        bucket.setAttribute('width', '50');
        bucket.setAttribute('height', '40');
        bucket.setAttribute('fill', '#708090');
        bucket.setAttribute('stroke', '#000');
        bucket.setAttribute('stroke-width', '3');
        svg.appendChild(bucket);

        // Water splash if sprung
        if (sprung) {
            this.addSplash(svg, x, 380);
        }
    }

    addSplash(svg, x, y) {
        const splash = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const dropX = x + Math.cos(angle) * 40;
            const dropY = y + Math.sin(angle) * 30;

            const drop = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            drop.setAttribute('cx', dropX);
            drop.setAttribute('cy', dropY);
            drop.setAttribute('rx', '8');
            drop.setAttribute('ry', '12');
            drop.setAttribute('fill', '#4DA6FF');
            drop.setAttribute('opacity', '0.7');
            splash.appendChild(drop);
        }

        svg.appendChild(splash);
    }

    addExclamation(svg, x, y) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('font-size', '52');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#E74C3C');
        text.textContent = '!';
        svg.appendChild(text);
    }
}
