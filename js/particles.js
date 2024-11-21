class ParticleEffect {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.lastMouse = { x: 0, y: 0 };
        this.isActive = false;

        // 设置画布样式
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '9999';

        document.body.appendChild(this.canvas);
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // 监听鼠标移动
        document.addEventListener('mousemove', (e) => {
            this.isActive = true;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // 降低粒子生成概率和数量
            if (Math.random() < 0.3) { // 降低到30%的概率生成粒子
                this.particles.push(new Particle(this.mouse.x, this.mouse.y));
            }
        });

        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.update();
            p.draw(this.ctx);

            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }

        // 限制最大粒子数量
        if (this.particles.length > 30) { // 减少最大粒子数量
            this.particles = this.particles.slice(-30);
        }

        // 只在粒子数量大于3时才连线
        if (this.particles.length > 3) {
            this.connectParticles();
        }

        requestAnimationFrame(() => this.animate());
    }

    connectParticles() {
        // 减少连线检测的频率
        for (let i = 0; i < this.particles.length; i += 3) {
            for (let j = i + 1; j < this.particles.length; j += 3) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 40) { // 减小连线距离
                    const opacity = (40 - distance) / 40 * 0.05; // 降低连线透明度
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.3; // 减小线条宽度
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 1.5 + 0.1; // 减小粒子大小
        this.speedX = Math.random() * 0.6 - 0.3; // 减小移动速度
        this.speedY = Math.random() * 0.6 - 0.3;
        this.alpha = 0.3; // 降低初始透明度
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.alpha})`; // 保持蓝色系
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.03; // 加快消失速度
        this.color = `hsla(${Math.random() * 60 + 200}, 100%, 70%, ${this.alpha})`;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', () => {
    new ParticleEffect();
}); 