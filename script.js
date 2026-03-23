// 平滑滚动到锚点
function smoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70, // 考虑导航栏高度
                behavior: 'smooth'
            });
        });
    });
}

// 滚动时高亮导航项
function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 添加响应式导航菜单
function addResponsiveNav() {
    const navbar = document.querySelector('.navbar');
    const container = document.querySelector('.navbar .container');
    
    // 创建汉堡菜单按钮
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    menuBtn.classList.add('menu-btn');
    container.appendChild(menuBtn);
    
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuBtn.innerHTML = navLinks.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// 使用Intersection Observer实现滚动动画
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为所有需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.skill-item, .experience-item, .project-card, .contact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 为技能条添加动态效果
function animateSkillBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.05)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1)';
        });
    });
}

// 添加项目卡片交互
function addProjectInteractions() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const link = card.querySelector('.project-link');
            link.style.transform = 'translateY(0)';
            link.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            const link = card.querySelector('.project-link');
            link.style.transform = 'translateY(10px)';
            link.style.opacity = '0';
        });
    });
}

// 初始化所有功能
document.addEventListener('DOMContentLoaded', () => {
    smoothScroll();
    highlightNavOnScroll();
    addResponsiveNav();
    addScrollAnimations();
    animateSkillBars();
    addProjectInteractions();
});

// 添加导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 添加图片加载效果
function addImageLoadEffect() {
    const avatar = document.querySelector('.avatar');
    
    avatar.addEventListener('load', () => {
        avatar.style.opacity = '1';
    });
    
    // 确保图片显示
    avatar.style.opacity = '1';
}

// 添加联系方式复制功能
function addCopyToClipboard() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const text = item.querySelector('p');
        if (text && (text.textContent.includes('@') || text.textContent.includes('github'))) {
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', () => {
                const content = text.textContent.replace(' (仅交流学习)', '').replace('github.com/', '');
                
                navigator.clipboard.writeText(content).then(() => {
                    // 显示复制成功提示
                    const tooltip = document.createElement('span');
                    tooltip.classList.add('tooltip');
                    tooltip.textContent = '已复制到剪贴板';
                    item.appendChild(tooltip);
                    
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            });
        }
    });
}

// 扩展功能
if (typeof document !== 'undefined') {
    addImageLoadEffect();
    addCopyToClipboard();
}

// 添加CSS样式以支持JavaScript效果
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #4a90e2;
        font-weight: 700;
    }
    
    .menu-btn {
        display: none;
        background: none;
        border: none;
        font-size: 24px;
        color: #333;
        cursor: pointer;
    }
    
    @media (max-width: 768px) {
        .menu-btn {
            display: block;
        }
        
        .nav-links {
            display: none;
            position: absolute;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: #fff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
        }
        
        .nav-links.show {
            display: flex;
        }
        
        .nav-links li {
            margin: 15px 0;
        }
    }
    
    .tooltip {
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: #fff;
        padding: 8px 15px;
        border-radius: 5px;
        font-size: 14px;
        white-space: nowrap;
        z-index: 1000;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px 5px 0;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.8) transparent transparent;
    }
    
    .contact-item {
        position: relative;
    }
`;
document.head.appendChild(style);