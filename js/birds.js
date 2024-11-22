class Bird {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = canvas.width + 50;
        this.y = Math.random() * (canvas.height * 0.4);
        this.size = Math.random() * 2 + 2;
        this.speed = Math.random() * 0.8 + 0.3;
        this.amplitude = Math.random() * 10 + 5;
        this.frequency = Math.random() * 0.01 + 0.005;
        this.angle = 0;
        this.color = `rgba(255, ${Math.random() * 20 + 120}, ${Math.random() * 20 + 200}, ${Math.random() * 0.2 + 0.4})`;
    }

    update() {
        this.x -= this.speed;
        this.y += Math.sin(this.angle) * this.amplitude * 0.02;
        this.angle += this.frequency;

        if (this.x < -50) {
            this.x = this.canvas.width + 50;
            this.y = Math.random() * (this.canvas.height * 0.4);
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        this.ctx.rotate(Math.sin(this.angle) * 0.1);
        
        const gradient = this.ctx.createLinearGradient(0, -8, 0, 8);
        gradient.addColorStop(0, 'rgba(255, 182, 193, 0.6)');
        gradient.addColorStop(1, this.color);
        
        this.ctx.fillStyle = gradient;
        this.ctx.strokeStyle = 'rgba(255, 192, 203, 0.5)';
        this.ctx.lineWidth = this.size * 0.8;
        
        this.ctx.beginPath();
        
        const wingOffset = Math.sin(this.angle * 3) * 3;
        
        this.ctx.moveTo(-8 * this.size, wingOffset);
        this.ctx.quadraticCurveTo(
            -5 * this.size, -8 * this.size + wingOffset,
            0, 0
        );
        
        this.ctx.moveTo(0, 0);
        this.ctx.quadraticCurveTo(
            5 * this.size, -8 * this.size - wingOffset,
            8 * this.size, wingOffset
        );
        
        this.ctx.moveTo(-3 * this.size, 0);
        this.ctx.quadraticCurveTo(
            -6 * this.size, 3 * this.size,
            -9 * this.size, 0
        );

        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.restore();
    }
}

class BirdAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.birds = [];
        
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        
        document.body.appendChild(this.canvas);
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        for (let i = 0; i < 4; i++) {
            this.birds.push(new Bird(this.canvas));
            this.birds[i].x = this.canvas.width + (i * 300);
        }

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.birds.forEach(bird => {
            bird.update();
            bird.draw();
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BirdAnimation();
}); 