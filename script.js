// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 移动端菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// 点击导航链接时关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 数字动画效果
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = stat.innerText;
        const hasPlus = target.includes('+');
        const hasPercent = target.includes('%');
        const hasMs = target.includes('ms');

        let numericValue = parseFloat(target);
        let isZero = numericValue === 0;

        if (!isZero) {
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }

                let displayValue = Math.floor(current);
                if (hasPlus) {
                    stat.innerText = displayValue + '+';
                } else if (hasPercent) {
                    stat.innerText = displayValue.toFixed(1) + '%';
                } else if (hasMs) {
                    stat.innerText = '0ms';
                } else {
                    stat.innerText = displayValue;
                }
            }, 20);
        }
    });
}

// 滚动触发动画
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('stats')) {
                animateNumbers();
                observer.unobserve(entry.target);
            }

            // 淡入动画
            if (entry.target.classList.contains('feature-card') ||
                entry.target.classList.contains('scenario-card') ||
                entry.target.classList.contains('step')) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'all 0.6s ease';

                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.stats').forEach(el => observer.observe(el));
document.querySelectorAll('.feature-card').forEach(el => observer.observe(el));
document.querySelectorAll('.scenario-card').forEach(el => observer.observe(el));
document.querySelectorAll('.step').forEach(el => observer.observe(el));

// 浮动卡片交互效果
document.querySelectorAll('.floating-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// 打字机效果
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerText = '';

    function type() {
        if (i < text.length) {
            element.innerText += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// 页面加载时的打字机效果
window.addEventListener('load', function() {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.innerText;
        typeWriter(heroTitle, originalText, 150);
    }
});

// 添加加载动画
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 功能卡片悬停效果
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// 添加粒子背景效果
function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = 'rgba(255, 255, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '1';

    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;

    particle.style.left = startX + 'px';
    particle.style.top = startY + 'px';

    document.body.appendChild(particle);

    const duration = Math.random() * 3000 + 2000;
    const horizontalMovement = (Math.random() - 0.5) * 100;

    particle.animate([
        {
            transform: `translate(0, 0) scale(0)`,
            opacity: 0
        },
        {
            transform: `translate(0, -20px) scale(1)`,
            opacity: 1,
            offset: 0.1
        },
        {
            transform: `translate(${horizontalMovement}px, -${window.innerHeight + 20}px) scale(0)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'ease-out'
    }).onfinish = () => particle.remove();
}

// 定期创建粒子
setInterval(createParticle, 300);

// 添加主题切换功能
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;

    if (isDarkMode) {
        document.documentElement.style.setProperty('--text-dark', '#f9fafb');
        document.documentElement.style.setProperty('--text-light', '#d1d5db');
        document.documentElement.style.setProperty('--bg-light', '#1f2937');
        document.documentElement.style.setProperty('--bg-white', '#111827');
    } else {
        document.documentElement.style.setProperty('--text-dark', '#1f2937');
        document.documentElement.style.setProperty('--text-light', '#6b7280');
        document.documentElement.style.setProperty('--bg-light', '#f9fafb');
        document.documentElement.style.setProperty('--bg-white', '#ffffff');
    }
}

// 性能优化：节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化滚动事件
window.addEventListener('scroll', throttle(function() {
    // 滚动相关的操作已经优化
}, 100));