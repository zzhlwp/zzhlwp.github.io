const backgrounds = [
    // 本地图片
    'images/backgrounds/ironman-1.jpg',    // 钢铁侠图片
    'images/backgrounds/ironman-2.jpg',    // 钢铁侠图片2
    'images/backgrounds/spiderman.jpg',    // 蜘蛛侠图片
    'images/backgrounds/car-1.jpg',        // 跑车图片
    
    // 在线高清图片（备选）
    'https://images.hdqwalls.com/download/iron-man-4k-2020-ix-3840x2160.jpg',
    'https://images.hdqwalls.com/download/spiderman-miles-morales-4k-2020-game-3840x2160.jpg',
    'https://images.hdqwalls.com/download/mclaren-765lt-2020-4k-ru-3840x2160.jpg',
    'https://images.hdqwalls.com/download/cyberpunk-2077-porsche-911-turbo-4k-u0-3840x2160.jpg'
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const selectedBg = backgrounds[randomIndex];
    
    const img = new Image();
    img.src = selectedBg;
    
    img.onload = function() {
        document.body.style.backgroundImage = `url(${selectedBg})`;
        document.body.classList.add('background-fade');
        
        setTimeout(() => {
            document.body.classList.remove('background-loading');
        }, 500);
    };
    
    img.onerror = function() {
        console.error('图片加载失败:', selectedBg);
        // 如果在线图片加载失败，尝试使用本地图片
        const localImages = backgrounds.filter(bg => bg.startsWith('images/'));
        if (localImages.length > 0) {
            const randomLocal = localImages[Math.floor(Math.random() * localImages.length)];
            document.body.style.backgroundImage = `url(${randomLocal})`;
        }
    };
    
    document.body.classList.add('background-loading');
}

// 预加载所有背景图片
function preloadImages() {
    backgrounds.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground();
    preloadImages();
    
    const changeButton = document.getElementById('change-bg');
    if (changeButton) {
        changeButton.addEventListener('click', setRandomBackground);
    }
}); 