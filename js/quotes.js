const quotes = [
    {
        text: "Driven by dreams, not by profit ✨",
        description: "用代码改变世界 ✨"
    },
    {
        text: "Stay hungry, stay foolish ✨",
        description: "保持饥饿，保持愚蠢 ✨"
    },
    {
        text: "Code is poetry ✨",
        description: "代码如诗 ✨"
    },
    {
        text: "Think different ✨",
        description: "不同凡响 ✨"
    },
    {
        text: "Make something wonderful ✨",
        description: "创造精彩 ✨"
    },
    {
        text: "Innovation distinguishes between a leader and a follower ✨",
        description: "创新区分领导者和跟随者 ✨"
    },
    {
        text: "The best way to predict the future is to create it ✨",
        description: "创造未来的最好方式就是创造它 ✨"
    },
    {
        text: "Code never lies, comments sometimes do ✨",
        description: "代码从不说谎，注释偶尔会 ✨"
    }
];

let currentQuoteIndex = 0;

// 打字机效果
function typeWriter(element, text, callback) {
    let i = 0;
    element.textContent = ''; // 清空内容
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            requestAnimationFrame(() => setTimeout(type, 100));
        } else if (callback) {
            callback();
        }
    }
    type();
}

// 更新页面上的名言
function updateQuote() {
    const quote = quotes[currentQuoteIndex];
    const titleElement = document.querySelector('.hero-content h1');
    const descriptionElement = document.querySelector('.hero-description');
    
    if (titleElement && descriptionElement) {
        // 先显示标题
        typeWriter(titleElement, quote.text, () => {
            // 标题打字完成后显示描述
            typeWriter(descriptionElement, quote.description, () => {
                // 等待一段时间后切换到下一条
                setTimeout(() => {
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                    updateQuote();
                }, 3000); // 显示3秒后切换
            });
        });
    }
}

// 页面加载时开始显示
document.addEventListener('DOMContentLoaded', () => {
    updateQuote();
}); 