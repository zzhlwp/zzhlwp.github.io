// 主题切换功能
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // 确保初始主题正确应用
        this.applyTheme(this.theme);
        
        // 添加点击事件监听
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                console.log('Theme toggle clicked'); // 调试用
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        console.log('Switching to theme:', this.theme); // 调试用
        this.applyTheme(this.theme);
    }

    applyTheme(theme) {
        // 设置主题
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // 更新图标
        if (this.themeToggle) {
            const icon = theme === 'dark' ? 
                '<i class="fas fa-moon"></i>' : 
                '<i class="fas fa-sun"></i>';
            
            this.themeToggle.innerHTML = icon;
            
            // 设置图标颜色
            this.themeToggle.style.color = theme === 'dark' ? '#FFB300' : '#FDD835';
        }

        // 添加过渡效果
        document.body.style.transition = 'all 0.3s ease';
        
        // 移除过渡效果
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);

        console.log('Theme applied:', theme); // 调试用
    }
}

// 确保 DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
}); 