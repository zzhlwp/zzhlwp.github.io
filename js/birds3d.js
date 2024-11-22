class Birds3D {
    constructor() {
        this.container = document.getElementById('bird-container');
        this.birds = null;
        this.init();
    }

    init() {
        // 创建场景
        this.scene = new THREE.Scene();
        
        // 创建相机
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 30;

        // 创建渲染器
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        // 创建鸟群
        const BIRDS = 20;
        const Bird = new THREE.Bird({
            wingspan: 30,
            speedLimit: 5,
            separation: 20,
            alignment: 20,
            cohesion: 20,
            scene: this.scene
        });

        this.birds = new THREE.BirdGeometry(BIRDS);
        
        // 设置材质
        const material = new THREE.MeshBasicMaterial({
            color: 0xff3f81,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8
        });

        // 创建鸟群网格
        this.birdMesh = new THREE.Mesh(this.birds, material);
        this.scene.add(this.birdMesh);

        // 添加动画
        this.animate();

        // 响应窗口大小变化
        window.addEventListener('resize', () => this.onWindowResize(), false);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // 更新鸟群位置
        this.birds.update();
        
        // 渲染场景
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new Birds3D();
}); 