import { Cat } from '../characters/Cat.js';
import { Mouse } from '../characters/Mouse.js';

/**
 * Scene 2: Hiding scene
 */
export class Scene2Hiding {
    constructor() {
        this.duration = 5000; // 5 seconds
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

        const progress = sceneTime / this.duration;

        // Draw cheese with mouse hole
        this.drawCheese(svg, 400, 350);

        // Mouse hiding in cheese (only peek out after 2 seconds)
        if (sceneTime > 2000) {
            const peekAmount = Math.min((sceneTime - 2000) / 500, 1);
            this.mouse.setPosition(400 + peekAmount * 30, 380).setScale(0.6);
            svg.appendChild(this.mouse.createSVG());
        }

        // Cat looking around
        const catX = 150 + Math.sin(progress * Math.PI * 2) * 50;
        this.cat.setPosition(catX, 400);
        svg.appendChild(this.cat.createSVG());

        // Question marks above cat's head
        if (sceneTime > 1000) {
            this.addQuestionMarks(svg, catX, 280);
        }
    }

    createBackground() {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '1024');
        rect.setAttribute('height', '576');
        rect.setAttribute('fill', '#F0E68C');
        return rect;
    }

    drawCheese(svg, x, y) {
        // Cheese block
        const cheese = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        cheese.setAttribute('points', `${x - 60},${y} ${x + 60},${y} ${x + 40},${y - 80} ${x - 40},${y - 80}`);
        cheese.setAttribute('fill', '#FFD700');
        cheese.setAttribute('stroke', '#000');
        cheese.setAttribute('stroke-width', '3');
        svg.appendChild(cheese);

        // Holes in cheese
        const holes = [
            [x - 20, y - 40, 12],
            [x + 10, y - 50, 15],
            [x + 30, y - 30, 10],
            [x - 30, y - 20, 8]
        ];

        holes.forEach(([cx, cy, r]) => {
            const hole = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            hole.setAttribute('cx', cx);
            hole.setAttribute('cy', cy);
            hole.setAttribute('r', r);
            hole.setAttribute('fill', '#DAA520');
            hole.setAttribute('stroke', '#000');
            hole.setAttribute('stroke-width', '2');
            svg.appendChild(hole);
        });

        // Mouse hole
        const mouseHole = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        mouseHole.setAttribute('cx', x);
        mouseHole.setAttribute('cy', y);
        mouseHole.setAttribute('rx', '25');
        mouseHole.setAttribute('ry', '30');
        mouseHole.setAttribute('fill', '#333');
        mouseHole.setAttribute('stroke', '#000');
        mouseHole.setAttribute('stroke-width', '2');
        svg.appendChild(mouseHole);
    }

    addQuestionMarks(svg, x, y) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y);
        text.setAttribute('font-size', '48');
        text.setAttribute('font-weight', 'bold');
        text.setAttribute('fill', '#2C3E50');
        text.textContent = '?';
        svg.appendChild(text);
    }
}
