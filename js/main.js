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
   22篇AI工具测评数据
   ======================================== */
const reviewsData = [
    {
        id: 'chatgpt-review',
        title: 'ChatGPT Review',
        icon: '🤖',
        rating: 9.2,
        badge: 'Featured',
        category: 'Chatbot',
        company: 'OpenAI',
        tags: ['GPT-4', 'Conversational AI', 'Content Creation'],
        description: 'The original AI chatbot that changed everything. How does it hold up against newer competitors?',
        lastUpdated: 'Jan 2026',
        url: 'guides/chatgpt-review.html'
    },
    {
        id: 'claude-ai-review',
        title: 'Claude AI Review',
        icon: '🧠',
        rating: 9.0,
        badge: 'New',
        category: 'Chatbot',
        company: 'Anthropic',
        tags: ['Claude 3', 'Long-form Content', 'Reasoning'],
        description: 'Anthropic\'s flagship model excels at long-form content and nuanced reasoning tasks.',
        lastUpdated: 'Jan 2026',
        url: 'guides/claude-ai-review.html'
    },
    {
        id: 'gemini-review',
        title: 'Gemini AI Review',
        icon: '✨',
        rating: 8.7,
        badge: null,
        category: 'Chatbot',
        company: 'Google',
        tags: ['Multimodal', 'Google Integration', 'Research'],
        description: 'Google\'s most capable AI model with native multimodal support and deep Google integration.',
        lastUpdated: 'Jan 2026',
        url: 'guides/gemini-review.html'
    },
    {
        id: 'perplexity-ai-review',
        title: 'Perplexity AI Review',
        icon: '🔍',
        rating: 8.5,
        badge: 'Best for Research',
        category: 'Chatbot',
        company: 'Perplexity',
        tags: ['Research', 'Citations', 'Real-time'],
        description: 'An AI-powered search engine that provides cited, real-time answers to complex questions.',
        lastUpdated: 'Jan 2026',
        url: 'guides/perplexity-ai-review.html'
    },
    {
        id: 'midjourney-review',
        title: 'Midjourney Review',
        icon: '🖼️',
        rating: 8.8,
        badge: 'Best Value',
        category: 'Image Generator',
        company: 'Midjourney',
        tags: ['Art', 'Text-to-Image', 'Creative'],
        description: 'The art community\'s favorite image generator. Stunning results but requires a subscription.',
        lastUpdated: 'Jan 2026',
        url: 'guides/midjourney-review.html'
    },
    {
        id: 'dalle-3-review',
        title: 'DALL-E 3 Review',
        icon: '🎨',
        rating: 8.6,
        badge: null,
        category: 'Image Generator',
        company: 'OpenAI',
        tags: ['Image Creation', 'Editing', 'Inpainting'],
        description: 'OpenAI\'s latest image generation model with improved accuracy and prompt following.',
        lastUpdated: 'Jan 2026',
        url: 'guides/dalle-3-review.html'
    },
    {
        id: 'stable-diffusion-review',
        title: 'Stable Diffusion Review',
        icon: '🌊',
        rating: 8.4,
        badge: 'Best Free',
        category: 'Image Generator',
        company: 'Stability AI',
        tags: ['Open Source', 'Customizable', 'Local Run'],
        description: 'The open-source favorite that can run locally. Highly customizable but steeper learning curve.',
        lastUpdated: 'Jan 2026',
        url: 'guides/stable-diffusion-review.html'
    },
    {
        id: 'jasper-ai-review',
        title: 'Jasper AI Review',
        icon: '✍️',
        rating: 8.3,
        badge: null,
        category: 'AI Writing',
        company: 'Jasper',
        tags: ['Content Creation', 'Marketing', 'Templates'],
        description: 'Enterprise-grade AI writing tool with extensive templates for marketing and content teams.',
        lastUpdated: 'Jan 2026',
        url: 'guides/jasper-ai-review.html'
    },
    {
        id: 'copy-ai-review',
        title: 'Copy.ai Review',
        icon: '📝',
        rating: 8.1,
        badge: null,
        category: 'AI Writing',
        company: 'Copy.ai',
        tags: ['Copywriting', 'Sales', 'Social Media'],
        description: 'Fast-paced AI copywriting tool perfect for sales teams and social media managers.',
        lastUpdated: 'Jan 2026',
        url: 'guides/copy-ai-review.html'
    },
    {
        id: 'grammarly-ai-review',
        title: 'Grammarly AI Review',
        icon: '✅',
        rating: 9.0,
        badge: 'Editor's Choice',
        category: 'AI Writing',
        company: 'Grammarly',
        tags: ['Grammar', 'Writing Assistant', 'Plagiarism'],
        description: 'The gold standard for AI-powered writing assistance with real-time grammar and style suggestions.',
        lastUpdated: 'Jan 2026',
        url: 'guides/grammarly-ai-review.html'
    },
    {
        id: 'cursor-ai-review',
        title: 'Cursor AI Review',
        icon: '💻',
        rating: 8.9,
        badge: 'New',
        category: 'Code Assistant',
        company: 'Cursor',
        tags: ['IDE', 'Code Completion', 'Pair Programming'],
        description: 'AI-first code editor built for pair programming. Strong features for modern developers.',
        lastUpdated: 'Jan 2026',
        url: 'guides/cursor-ai-review.html'
    },
    {
        id: 'github-copilot-review',
        title: 'GitHub Copilot Review',
        icon: '⚡',
        rating: 8.9,
        badge: 'Popular',
        category: 'Code Assistant',
        company: 'Microsoft',
        tags: ['Coding', 'Autocomplete', 'IDE Integration'],
        description: 'Your AI pair programmer for faster development. Industry-leading code completion.',
        lastUpdated: 'Jan 2026',
        url: 'guides/github-copilot-review.html'
    },
    {
        id: 'replit-ai-review',
        title: 'Replit AI Review',
        icon: '🚀',
        rating: 8.2,
        badge: null,
        category: 'Code Assistant',
        company: 'Replit',
        tags: ['Cloud IDE', 'Deployment', 'Beginners'],
        description: 'AI-powered cloud IDE with instant deployment. Great for learning and rapid prototyping.',
        lastUpdated: 'Jan 2026',
        url: 'guides/replit-ai-review.html'
    },
    {
        id: 'runway-ml-review',
        title: 'Runway ML Review',
        icon: '🎬',
        rating: 8.5,
        badge: null,
        category: 'AI Video',
        company: 'Runway',
        tags: ['Video Generation', 'Editing', 'Motion'],
        description: 'Cutting-edge AI video creation and editing platform for creators and filmmakers.',
        lastUpdated: 'Jan 2026',
        url: 'guides/runway-ml-review.html'
    },
    {
        id: 'synthesia-review',
        title: 'Synthesia Review',
        icon: '🎭',
        rating: 8.6,
        badge: 'Best for Video',
        category: 'AI Video',
        company: 'Synthesia',
        tags: ['AI Avatar', 'Text-to-Video', 'Training'],
        description: 'Create professional videos with AI avatars. Perfect for training and marketing content.',
        lastUpdated: 'Jan 2026',
        url: 'guides/synthesia-review.html'
    },
    {
        id: 'notion-ai-review',
        title: 'Notion AI Review',
        icon: '📓',
        rating: 8.4,
        badge: null,
        category: 'AI Productivity',
        company: 'Notion',
        tags: ['Notes', 'Workspace', 'Writing Assistant'],
        description: 'AI assistant built into your workspace. Summarize, brainstorm, and write faster.',
        lastUpdated: 'Jan 2026',
        url: 'guides/notion-ai-review.html'
    },
    {
        id: 'otter-ai-review',
        title: 'Otter.ai Review',
        icon: '🎙️',
        rating: 8.3,
        badge: null,
        category: 'AI Productivity',
        company: 'Otter',
        tags: ['Transcription', 'Meeting Notes', 'Collaboration'],
        description: 'AI-powered meeting transcription and note-taking. Real-time collaboration features.',
        lastUpdated: 'Jan 2026',
        url: 'guides/otter-ai-review.html'
    }
];

/* ========================================
   测评对比文章数据
   ======================================== */
const guidesData = [
    {
        id: 'chatgpt-vs-claude',
        title: 'ChatGPT vs Claude',
        icon: '⚔️',
        badge: 'Popular',
        category: 'Comparison',
        tags: ['Chatbot', 'OpenAI', 'Anthropic'],
        description: 'The ultimate showdown between OpenAI\'s ChatGPT and Anthropic\'s Claude.',
        lastUpdated: 'Jan 2026',
        url: 'guides/chatgpt-vs-claude-comparison.html'
    },
    {
        id: 'midjourney-vs-dalle',
        title: 'Midjourney vs DALL-E',
        icon: '⚔️',
        badge: null,
        category: 'Comparison',
        tags: ['Image Gen', 'Midjourney', 'OpenAI'],
        description: 'Compare the two most popular AI image generators side by side.',
        lastUpdated: 'Jan 2026',
        url: 'guides/midjourney-vs-dalle-comparison.html'
    },
    {
        id: 'cursor-vs-copilot',
        title: 'Cursor vs GitHub Copilot',
        icon: '⚔️',
        badge: 'New',
        category: 'Comparison',
        tags: ['Code Assistant', 'Cursor', 'Copilot'],
        description: 'Which AI coding assistant is right for you? We compare Cursor and Copilot.',
        lastUpdated: 'Jan 2026',
        url: 'guides/cursor-vs-copilot-comparison.html'
    },
    {
        id: 'ai-writing-tools-comparison',
        title: 'Best AI Writing Tools',
        icon: '✍️',
        badge: 'Guide',
        category: 'Comparison',
        tags: ['Writing', 'Content', 'Marketing'],
        description: 'A comprehensive comparison of the top AI writing tools in 2025.',
        lastUpdated: 'Jan 2026',
        url: 'guides/ai-writing-tools-comparison.html'
    },
    {
        id: 'best-free-ai-tools-2025',
        title: 'Best Free AI Tools 2025',
        icon: '🆓',
        badge: 'Essential',
        category: 'Guide',
        tags: ['Free', 'Budget', 'Top Picks'],
        description: 'Our curated list of the best free AI tools you should be using this year.',
        lastUpdated: 'Jan 2026',
        url: 'guides/best-free-ai-tools-2025.html'
    }
];

/* ========================================
   动态渲染测评卡片（首页用）
   ======================================== */
function renderFeaturedReviews(containerId, count = 4) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const allReviews = [...reviewsData, ...guidesData];
    const featured = allReviews.slice(0, count);
    
    container.innerHTML = featured.map(review => `
        <article class="review-card">
            ${review.badge ? `<div class="review-badge">${review.badge}</div>` : ''}
            <div class="review-header">
                <div class="review-icon">${review.icon}</div>
                <div class="review-meta">
                    <span class="review-rating">⭐ ${review.rating || '8.5'}/10</span>
                    <span class="review-date">Updated ${review.lastUpdated}</span>
                </div>
            </div>
            <h3>${review.title}</h3>
            <p>${review.description}</p>
            <div class="review-tags">
                ${review.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <a href="${review.url}" class="review-link">Read Review →</a>
        </article>
    `).join('');
}

// 如果在首页且有指定容器，自动渲染
if (document.getElementById('featured-reviews-grid')) {
    renderFeaturedReviews('featured-reviews-grid', 6);
}
