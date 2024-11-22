const particlesConfig = {
    particles: {
        number: {
            value: 180,          // 增加粒子数量
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ffffff"     // 使用白色使粒子更明显
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.8,          // 增加不透明度
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.5, // 提高最小不透明度
                sync: false
            }
        },
        size: {
            value: 4,            // 增加粒子大小
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 2,     // 增加最小尺寸
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",    // 使用白色使连线更明显
            opacity: 0.8,        // 增加连线不透明度
            width: 2            // 增加连线宽度
        },
        move: {
            enable: true,
            speed: 3,           // 适当的移动速度
            direction: "none",
            random: false,
            straight: false,
            out_mode: "bounce", // 使用反弹模式
            bounce: true
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"    // 鼠标悬停时的效果
            },
            onclick: {
                enable: true,
                mode: "push"    // 点击时添加粒子
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 200,  // 增加抓取距离
                line_linked: {
                    opacity: 0.9 // 增加悬停时连线不透明度
                }
            },
            push: {
                particles_nb: 6 // 点击时添加更多粒子
            }
        }
    },
    retina_detect: true
};

// 初始化粒子效果
document.addEventListener('DOMContentLoaded', function() {
    if(typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
}); 