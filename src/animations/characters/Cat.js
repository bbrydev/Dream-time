/**
 * SVG Cat character (Tom-inspired)
 */
export class Cat {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.scale = 1;
        this.state = 'idle';
    }

    /**
     * Create SVG group for the cat
     */
    createSVG() {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('transform', `translate(${this.x}, ${this.y}) scale(${this.scale})`);

        // Body
        const body = this.createRect(-20, 0, 40, 50, '#8B7355');
        g.appendChild(body);

        // Head
        const head = this.createCircle(0, -10, 25, '#A0826D');
        g.appendChild(head);

        // Ears
        const leftEar = this.createPolygon([
            [-18, -28], [-25, -45], [-12, -35]
        ], '#8B7355');
        g.appendChild(leftEar);

        const rightEar = this.createPolygon([
            [18, -28], [25, -45], [12, -35]
        ], '#8B7355');
        g.appendChild(rightEar);

        // Face features
        const leftEye = this.createCircle(-10, -15, 5, '#2C3E50');
        const rightEye = this.createCircle(10, -15, 5, '#2C3E50');
        g.appendChild(leftEye);
        g.appendChild(rightEye);

        // Nose
        const nose = this.createPolygon([
            [0, -5], [-3, 0], [3, 0]
        ], '#E74C3C');
        g.appendChild(nose);

        // Whiskers
        const whiskers = this.createWhiskers();
        g.appendChild(whiskers);

        // Tail
        const tail = this.createPath(
            'M 20 40 Q 50 30 55 10 Q 58 -5 52 -10',
            '#8B7355',
            5
        );
        g.appendChild(tail);

        // Legs
        const leftLeg = this.createRect(-15, 50, 10, 25, '#A0826D');
        const rightLeg = this.createRect(5, 50, 10, 25, '#A0826D');
        g.appendChild(leftLeg);
        g.appendChild(rightLeg);

        return g;
    }

    createRect(x, y, width, height, fill) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x);
        rect.setAttribute('y', y);
        rect.setAttribute('width', width);
        rect.setAttribute('height', height);
        rect.setAttribute('fill', fill);
        rect.setAttribute('stroke', '#000');
        rect.setAttribute('stroke-width', '2');
        return rect;
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

    createPolygon(points, fill) {
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        const pointsStr = points.map(p => p.join(',')).join(' ');
        polygon.setAttribute('points', pointsStr);
        polygon.setAttribute('fill', fill);
        polygon.setAttribute('stroke', '#000');
        polygon.setAttribute('stroke-width', '2');
        return polygon;
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

        // Left whiskers
        const w1 = this.createPath('M -25 -10 L -45 -12', '#000', 2);
        const w2 = this.createPath('M -25 -5 L -45 -5', '#000', 2);
        const w3 = this.createPath('M -25 0 L -45 2', '#000', 2);

        // Right whiskers
        const w4 = this.createPath('M 25 -10 L 45 -12', '#000', 2);
        const w5 = this.createPath('M 25 -5 L 45 -5', '#000', 2);
        const w6 = this.createPath('M 25 0 L 45 2', '#000', 2);

        g.appendChild(w1);
        g.appendChild(w2);
        g.appendChild(w3);
        g.appendChild(w4);
        g.appendChild(w5);
        g.appendChild(w6);

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
