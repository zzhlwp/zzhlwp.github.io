const backgrounds = [
    // 钢铁侠系列
    'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=1920&q=80', // 钢铁侠展览
    'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=1920&q=80', // 钢铁侠盔甲
    
    // 漫威英雄系列
    'https://images.unsplash.com/photo-1556707752-481d500a2c58?w=1920&q=80', // 复仇者联盟
    'https://images.unsplash.com/photo-1580751647664-5f5fe6bb2c51?w=1920&q=80', // 蜘蛛侠
    
    // 科技感场景
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    'https://images.unsplash.com/photo-1484950763426-56b5bf172dbb?w=1920&q=80',
    
    // 高质量人物肖像
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1920&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1920&q=80'
];

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const selectedBg = backgrounds[randomIndex];
    
    // 预加载图片
    const img = new Image();
    img.src = selectedBg;
    
    img.onload = function() {
        document.body.style.backgroundImage = `url(${selectedBg})`;
        document.body.classList.add('background-fade');
        
        // 添加加载动画
        setTimeout(() => {
            document.body.classList.remove('background-loading');
        }, 500);
    };
    
    document.body.classList.add('background-loading');
}

// 页面加载时设置随机背景
document.addEventListener('DOMContentLoaded', () => {
    setRandomBackground();
    
    // 点击换背景按钮时更换背景
    const changeButton = document.getElementById('change-bg');
    if (changeButton) {
        changeButton.addEventListener('click', setRandomBackground);
    }
}); 