class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        
        // 设置画布样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '999';
        
        document.body.appendChild(this.canvas);
        this.init();
    }

    init() {
        // 设置画布大小
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // 创建新粒子
            for (let i = 0; i < 3; i++) {
                this.particles.push(new Particle(
                    this.mouse.x,
                    this.mouse.y,
                    Math.random() * 2 + 1,
                    this.getRandomColor()
                ));
            }
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    getRandomColor() {
        const colors = ['#64ffda', '#48d6ff', '#7c4dff', '#ff4081'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制所有粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);

            // 移除消失的粒子
            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // 限制粒子数量
        if (this.particles.length > 100) {
            this.particles = this.particles.slice(-100);
        }

        requestAnimationFrame(() => this.animate());
    }
}

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.alpha = 1;
        this.decay = 0.015; // 粒子消失速度
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= this.decay;
        this.size = Math.max(0, this.size - 0.1);
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
    new ParticleEffect();
}); 