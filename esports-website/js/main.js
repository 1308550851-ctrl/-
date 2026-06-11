document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initParticles();
    initScrollAnimations();
    initGameCards();
    initNewsletter();
    initSmoothScroll();
});

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.borderBottom = '1px solid rgba(0, 245, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.borderBottom = '1px solid rgba(0, 245, 255, 0.1)';
        }
    });

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

function initParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 5 + 3 + 's';
        particle.style.animationDelay = Math.random() * 3 + 's';
        
        const gradient = Math.random() > 0.5 
            ? 'linear-gradient(135deg, #00f5ff, #7b00ff)' 
            : 'linear-gradient(135deg, #ff00ff, #00f5ff)';
        particle.style.background = gradient;
        
        heroParticles.appendChild(particle);
    }
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function initGameCards() {
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        card.addEventListener('click', function() {
            const gameName = this.querySelector('h3').textContent;
            showGameModal(gameName);
        });
    });
}

function showGameModal(gameName) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${gameName}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>正在加载${gameName}的详细信息...</p>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <span class="stat-num">100M+</span>
                        <span class="stat-text">活跃玩家</span>
                    </div>
                    <div class="modal-stat">
                        <span class="stat-num">24/7</span>
                        <span class="stat-text">在线服务</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            modal.remove();
            document.body.style.overflow = '';
        }
    });
}

function initNewsletter() {
    const newsletterForm = document.querySelector('.newsletter');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input');
        const email = emailInput.value;
        
        if (email) {
            showNotification('感谢订阅！我们会及时发送最新资讯到您的邮箱。');
            emailInput.value = '';
        }
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-count');
        }
    });
}, { threshold: 0.5 });

const statValues = document.querySelectorAll('.stat-value');
statValues.forEach(stat => {
    observer.observe(stat);
});

statValues.forEach(stat => {
    stat.addEventListener('animationstart', function() {
        const targetValue = this.textContent;
        const numericPart = targetValue.replace(/[^0-9]/g, '');
        const suffix = targetValue.replace(/[0-9]/g, '');
        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeOut * parseInt(numericPart));
            
            this.textContent = currentValue + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    });
});