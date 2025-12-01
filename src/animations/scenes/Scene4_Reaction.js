import { Cat } from '../characters/Cat.js';
import { Mouse } from '../characters/Mouse.js';

/**
 * Scene 4: Reaction shots
 */
export class Scene4Reaction {
    constructor() {
        this.duration = 4000; // 4 seconds
        this.cat = new Cat();
        this.mouse = new Mouse();
    }

    render(svg, time, sceneTime) {
        // Clear previous content
        while (svg.firstChild) {
            svg.removeChild(svg.firstChild);
        }

        // Background
        const bg = this.createBackground();
        svg.appendChild(bg);

        // Cat dizzy on left
        this.cat.setPosition(300, 350);
        svg.appendChild(this.cat.createSVG());

        // Dizzy stars
        this.addStars(svg, 300, 250, sceneTime);

        // Mouse celebrating on right
        this.mouse.setPosition(700, 350).setScale(0.9);
        svg.appendChild(this.mouse.createSVG());

        // Victory pose - add hearts
        this.addHearts(svg, 700, 280);

        // "THE END" text fades in
        if (sceneTime > 2000) {
            const opacity = Math.min((sceneTime - 2000) / 1000, 1);
            this.addEndText(svg, opacity);
        }
    }

    createBackground() {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '1024');
        rect.setAttribute('height', '576');
        rect.setAttribute('fill', '#FFA07A');
        return rect;
    }

    addStars(svg, x, y, time) {
        const starPositions = [
            [x - 40, y - 20],
            [x, y - 50],
            [x + 40, y - 20]
        ];

        const rotation = (time * 0.2) % 360;

        starPositions.forEach(([sx, sy]) => {
            const star = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            star.setAttribute('x', sx);
            star.setAttribute('y', sy);
            star.setAttribute('font-size', '36');
            star.setAttribute('fill', '#FFD700');
            star.setAttribute('transform', `rotate(${rotation}, ${sx}, ${sy})`);
            star.textContent = '★';
            svg.appendChild(star);
        });
    }

    addHearts(svg, x, y) {
        const heart = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        heart.setAttribute('x', x - 20);
        heart.setAttribute('y', y);
        heart.setAttribute('font-size', '32');
        heart.setAttribute('fill', '#E74C3C');
        heart.textContent = '♥';
        svg.appendChild(heart);
    }

    addEndText(svg, opacity) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '512');
        text.setAttribute('y', '150');
        text.setAttribute('font-size', '64');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#2C3E50');
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('opacity', opacity);
        text.textContent = 'THE END';
        svg.appendChild(text);

        // Shadow
        const shadow = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        shadow.setAttribute('x', '514');
        shadow.setAttribute('y', '152');
        shadow.setAttribute('font-size', '64');
        shadow.setAttribute('font-weight', 'bold');
        shadow.setAttribute('fill', '#95A5A6');
        shadow.setAttribute('text-anchor', 'middle');
        shadow.setAttribute('opacity', opacity * 0.5);
        shadow.textContent = 'THE END';
        svg.insertBefore(shadow, text);
    }
}
