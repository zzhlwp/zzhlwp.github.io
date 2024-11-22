document.addEventListener('DOMContentLoaded', function() {
    // 定义背景图片数组
    const backgrounds = [
        'images/backgrounds/avengers.jpg',
        'images/backgrounds/ironman.jpg',
        'images/backgrounds/ironman-2.jpg',
        'images/backgrounds/spiderman.jpg'
    ];

    // 从 localStorage 获取上一次的背景索引
    let lastIndex = parseInt(localStorage.getItem('lastBackgroundIndex') || '-1');
    let currentIndex;

    // 确保不重复使用上一次的背景
    do {
        currentIndex = Math.floor(Math.random() * backgrounds.length);
    } while (currentIndex === lastIndex && backgrounds.length > 1);

    // 保存当前背景索引
    localStorage.setItem('lastBackgroundIndex', currentIndex.toString());
    
    // 获取选中的背景
    const selectedBg = backgrounds[currentIndex];
    
    // 预加载背景图片
    const img = new Image();
    img.src = selectedBg;
    
    img.onload = function() {
        // 添加淡出效果
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            // 设置新背景
            document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${selectedBg}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center 15%';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundAttachment = 'fixed';
            
            // 添加淡入效果
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.5s ease-in';
        }, 100);
    };

    img.onerror = function() {
        console.error('背景图片加载失败');
        document.body.style.backgroundColor = '#1a1a1a';
    };
}); 