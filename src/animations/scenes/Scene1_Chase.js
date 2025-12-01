import { Cat } from '../characters/Cat.js';
import { Mouse } from '../characters/Mouse.js';

/**
 * Scene 1: Chase sequence
 */
export class Scene1Chase {
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

        // Calculate animation progress (0 to 1)
        const progress = sceneTime / this.duration;

        // Mouse runs from left to right
        const mouseX = 100 + progress * 800;
        const mouseY = 400;

        // Cat chases behind
        const catX = mouseX - 150;
        const catY = 400;

        // Add running animation (bob up and down)
        const bobOffset = Math.sin(sceneTime * 0.01) * 10;

        this.mouse.setPosition(mouseX, mouseY + bobOffset);
        this.cat.setPosition(catX, catY + bobOffset);

        svg.appendChild(this.mouse.createSVG());
        svg.appendChild(this.cat.createSVG());

        // Add motion lines
        this.addMotionLines(svg, mouseX, mouseY, catX, catY);
    }

    createBackground() {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('width', '1024');
        rect.setAttribute('height', '576');
        rect.setAttribute('fill', '#87CEEB');
        return rect;
    }

    addMotionLines(svg, mouseX, mouseY, catX, catY) {
        // Speed lines behind mouse
        for (let i = 0; i < 3; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', mouseX - 60 - i * 20);
            line.setAttribute('y1', mouseY - 20 + i * 10);
            line.setAttribute('x2', mouseX - 40 - i * 20);
            line.setAttribute('y2', mouseY - 20 + i * 10);
            line.setAttribute('stroke', '#ccc');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }

        // Speed lines behind cat
        for (let i = 0; i < 3; i++) {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', catX - 60 - i * 20);
            line.setAttribute('y1', catY - 20 + i * 10);
            line.setAttribute('x2', catX - 40 - i * 20);
            line.setAttribute('y2', catY - 20 + i * 10);
            line.setAttribute('stroke', '#ccc');
            line.setAttribute('stroke-width', '3');
            line.setAttribute('stroke-linecap', 'round');
            svg.appendChild(line);
        }
    }
}
