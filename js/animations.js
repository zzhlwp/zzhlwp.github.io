class FlyingCreatures {
    constructor() {
        this.creatures = [];
        this.maxCreatures = 3;
        this.init();
    }

    init() {
        this.createCreatures();
        this.animate();
    }

    createCreatures() {
        for (let i = 0; i < this.maxCreatures; i++) {
            const creature = document.createElement('div');
            creature.className = 'flying-creature';
            document.body.appendChild(creature);
            this.creatures.push({
                element: creature,
                x: -100,
                y: Math.random() * window.innerHeight,
                speed: 1 + Math.random() * 2,
                wobble: Math.random() * 2 - 1
            });
        }
    }

    animate() {
        this.creatures.forEach(creature => {
            creature.x += creature.speed;
            creature.y += Math.sin(creature.x / 50) * creature.wobble;
            
            if (creature.x > window.innerWidth + 100) {
                creature.x = -100;
                creature.y = Math.random() * window.innerHeight;
            }

            creature.element.style.transform = `translate(${creature.x}px, ${creature.y}px) rotate(${Math.sin(creature.x / 30) * 20}deg)`;
        });

        requestAnimationFrame(() => this.animate());
    }
}

// 初始化飞行动物
document.addEventListener('DOMContentLoaded', () => {
    new FlyingCreatures();
}); 