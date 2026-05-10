/* ========================================
   aihunttools.com - JavaScript 主文件
   处理导航、搜索、移动端菜单等交互
   ======================================== */

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSearch();
    initSmoothScroll();
    initScrollEffects();
    initNavbarScroll();
});

/* ========================================
   移动端汉堡菜单
   ======================================== */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // 点击导航链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // 点击页面其他地方关闭菜单
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/* ========================================
   搜索功能
   ======================================== */
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    if (!searchInput) return;
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value.trim();
            if (query) {
                // 跳转到reviews列表页并传递搜索参数
                window.location.href = `guides/?search=${encodeURIComponent(query)}`;
            }
        }
    });
}

/* ========================================
   平滑滚动
   ======================================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ========================================
   导航栏滚动效果
   ======================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/* ========================================
   滚动效果 - 元素进入视口动画
   ======================================== */
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // 为卡片添加动画
    document.querySelectorAll('.category-card, .review-card, .why-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

/* ========================================
   AI工具数据（用于动态渲染）
   ======================================== */
const aiToolsData = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        icon: '🤖',
        rating: 9.2,
        category: 'Chatbot',
        company: 'OpenAI',
        tags: ['GPT-4', 'Conversational AI', 'Content Creation'],
        description: 'The original AI chatbot that changed everything.',
        lastUpdated: 'Jan 2026'
    },
    {
        id: 'claude',
        name: 'Claude',
        icon: '🧠',
        rating: 9.0,
        category: 'Chatbot',
        company: 'Anthropic',
        tags: ['Claude 3', 'Long-form Content', 'Reasoning'],
        description: 'Anthropic\'s flagship model excels at nuanced reasoning.',
        lastUpdated: 'Jan 2026'
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        icon: '🖼️',
        rating: 8.8,
        category: 'Image Generator',
        company: 'Midjourney',
        tags: ['Art', 'Text-to-Image', 'Creative'],
        description: 'The art community\'s favorite image generator.',
        lastUpdated: 'Jan 2026'
    },
    {
        id: 'gemini',
        name: 'Gemini',
        icon: '✨',
        rating: 8.7,
        category: 'Chatbot',
        company: 'Google',
        tags: ['Multimodal', 'Google Integration', 'Research'],
        description: 'Google\'s most capable AI model yet.',
        lastUpdated: 'Jan 2026'
    },
    {
        id: 'copilot',
        name: 'GitHub Copilot',
        icon: '💻',
        rating: 8.9,
        category: 'Code Assistant',
        company: 'Microsoft',
        tags: ['Coding', 'Autocomplete', 'IDE Integration'],
        description: 'Your AI pair programmer for faster development.',
        lastUpdated: 'Jan 2026'
    },
    {
        id: 'dall-e',
        name: 'DALL-E 3',
        icon: '🎨',
        rating: 8.6,
        category: 'Image Generator',
        company: 'OpenAI',
        tags: ['Image Creation', 'Editing', 'Inpainting'],
        description: 'OpenAI\'s latest image generation model.',
        lastUpdated: 'Jan 2026'
    }
];

/* ========================================
   工具函数
   ======================================== */

// 获取URL参数
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// 格式化日期
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// 生成分数显示HTML
function renderRatingStars(rating) {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let html = '';
    for (let i = 0; i < fullStars; i++) html += '★';
    if (halfStar) html += '½';
    for (let i = 0; i < emptyStars; i++) html += '☆';
    
    return html;
}

/* ========================================
   导出数据供其他脚本使用
   ======================================== */
if (typeof window !== 'undefined') {
    window.aiHuntTools = {
        data: aiToolsData,
        helpers: {
            getUrlParam,
            formatDate,
            renderRatingStars
        }
    };
}
