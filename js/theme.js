// 主题切换功能
class ThemeManager {
    constructor() {
        this.themeToggle = document.querySelector('.theme-toggle');
        this.theme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
    }

    applyTheme(theme) {
        // 设置主题
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // 更新图标
        if (this.themeToggle) {
            const moonIcon = '<i class="fas fa-moon"></i>';
            const sunIcon = '<i class="fas fa-sun"></i>';
            
            // 月亮图标对应亮色主题，太阳图标对应暗色主题
            this.themeToggle.innerHTML = theme === 'light' ? moonIcon : sunIcon;
            
            // 添加过渡动画
            this.themeToggle.style.transition = 'transform 0.3s ease, color 0.3s ease';
            
            // 根据主题设置图标颜色
            if (theme === 'light') {
                this.themeToggle.style.color = '#FFB300'; // 金色月亮
            } else {
                this.themeToggle.style.color = '#FDD835'; // 明亮的黄色太阳
            }
        }
        
        // 添加过渡动画
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        document.querySelector('header').style.transition = 'background-color 0.3s ease';
        
        setTimeout(() => {
            document.body.style.transition = '';
            document.querySelector('header').style.transition = '';
        }, 300);
    }
}

// 当 DOM 加载完成时初始化主题管理器
document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
}); 