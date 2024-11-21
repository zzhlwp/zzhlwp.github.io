// 鼠标移动光效
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor-effect');
    if (!cursor) {
        const cursorDiv = document.createElement('div');
        cursorDiv.className = 'cursor-effect';
        document.body.appendChild(cursorDiv);
    }
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 页面滚动动画
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.post-card, .hero-content, .featured-posts h2').forEach((el) => {
    el.classList.add('animate-hidden');
    observer.observe(el);
});

// 导航栏滚动效果
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// 文字打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// 页面加载完成后的动画
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    const heroText = heroTitle.textContent;
    typeWriter(heroTitle, heroText);

    // 初始化 particles.js
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'js/particles-config.js');
    }
}); 