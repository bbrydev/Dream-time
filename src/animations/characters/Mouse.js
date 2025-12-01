/**
 * SVG Mouse character (Jerry-inspired)
 */
export class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.state = 'idle';
    }

    /**
     * Create SVG group for the mouse
     */
    createSVG() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${this.x}, ${this.y}) scale(${this.scale})`);

        // Body (smaller than cat)
        const body = this.createEllipse(0, 10, 18, 25, '#8B7765');
        g.appendChild(body);

        // Head
        const head = this.createCircle(0, -15, 18, '#A0867D');
        g.appendChild(head);

        // Large round ears
        const leftEar = this.createCircle(-15, -25, 10, '#D4A89A');
        const rightEar = this.createCircle(15, -25, 10, '#D4A89A');
        g.appendChild(leftEar);
        g.appendChild(rightEar);

        // Inner ear details
        const leftInner = this.createCircle(-15, -25, 6, '#E8C4B8');
        const rightInner = this.createCircle(15, -25, 6, '#E8C4B8');
        g.appendChild(leftInner);
        g.appendChild(rightInner);

        // Eyes
        const leftEye = this.createCircle(-6, -18, 4, '#2C3E50');
        const rightEye = this.createCircle(6, -18, 4, '#2C3E50');
        g.appendChild(leftEye);
        g.appendChild(rightEye);

        // Nose
        const nose = this.createCircle(0, -10, 3, '#E74C3C');
        g.appendChild(nose);

        // Whiskers (thin)
        const whiskers = this.createWhiskers();
        g.appendChild(whiskers);

        // Cute little paws
        const leftPaw = this.createCircle(-10, 30, 4, '#D4A89A');
        const rightPaw = this.createCircle(10, 30, 4, '#D4A89A');
        g.appendChild(leftPaw);
        g.appendChild(rightPaw);

        // Tail (thin and curvy)
        const tail = this.createPath(
            'M 15 20 Q 35 15 40 5 Q 43 -2 40 -8',
            '#8B7765',
            3
        );
        g.appendChild(tail);

        return g;
    }

    createEllipse(cx, cy, rx, ry, fill) {
        const ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
        ellipse.setAttribute('cx', cx);
        ellipse.setAttribute('cy', cy);
        ellipse.setAttribute('rx', rx);
        ellipse.setAttribute('ry', ry);
        ellipse.setAttribute('fill', fill);
        ellipse.setAttribute('stroke', '#000');
        ellipse.setAttribute('stroke-width', '2');
        return ellipse;
    }

    createCircle(cx, cy, r, fill) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
        circle.setAttribute('r', r);
        circle.setAttribute('fill', fill);
        circle.setAttribute('stroke', '#000');
        circle.setAttribute('stroke-width', '2');
        return circle;
    }

    createPath(d, stroke, strokeWidth) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', stroke);
        path.setAttribute('stroke-width', strokeWidth);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        return path;
    }

    createWhiskers() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

        // Thin whiskers
        const w1 = this.createPath('M -18 -12 L -30 -14', '#000', 1.5);
        const w2 = this.createPath('M -18 -10 L -30 -10', '#000', 1.5);
        const w3 = this.createPath('M 18 -12 L 30 -14', '#000', 1.5);
        const w4 = this.createPath('M 18 -10 L 30 -10', '#000', 1.5);

        g.appendChild(w1);
        g.appendChild(w2);
        g.appendChild(w3);
        g.appendChild(w4);

        return g;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    setScale(scale) {
        this.scale = scale;
        return this;
    }
}
