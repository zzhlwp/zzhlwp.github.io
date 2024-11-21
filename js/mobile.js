/**
 * 移动端导航菜单管理
 * 处理移动端菜单的显示、隐藏和交互
 */
document.addEventListener('DOMContentLoaded', () => {
    // 获取DOM元素
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    /**
     * 切换菜单显示状态
     * 控制菜单的显示/隐藏和图标的变化
     */
    function toggleMenu() {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    /**
     * 关闭菜单
     * 隐藏菜单并恢复图标状态
     */
    function closeMenu() {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }

    // 事件监听器设置
    menuToggle.addEventListener('click', toggleMenu);

    // 点击导航链接时关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // 点击页面其他区域时关闭菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
            closeMenu();
        }
    });
}); 