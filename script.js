// Animate numbers on scroll
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        element.textContent = Math.floor(easeOutQuart * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Initialize stat counters
const initCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const counterElements = document.querySelectorAll('.counter');

    // Animate main stats
    statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target'));
        animateValue(stat, 0, target, 2000);
    });

    // Animate floating card counter
    counterElements.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        animateValue(counter, 0, target, 2500);
    });
};

// Parallax effect for floating cards
const initParallax = () => {
    const cards = document.querySelectorAll('.floating-card');
    const visual = document.querySelector('.hero-visual');

    if (!visual) return;

    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const xPos = (clientX / innerWidth - 0.5) * 2;
        const yPos = (clientY / innerHeight - 0.5) * 2;

        cards.forEach((card, index) => {
            const intensity = (index + 1) * 10;
            const x = xPos * intensity;
            const y = yPos * intensity;

            card.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};

// Smooth reveal on scroll
const initScrollReveal = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        observer.observe(el);
    });
};

// Navbar background on scroll
const initNavbar = () => {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.8)';
        }

        lastScroll = currentScroll;
    });
};

// Button ripple effect
const initRipple = () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach((button) => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple animation to stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Magnetic button effect
const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.btn-primary');

    buttons.forEach((button) => {
        button.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
};

// Initialize all effects
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure CSS animations complete first
    setTimeout(() => {
        initCounters();
    }, 800);

    initParallax();
    initScrollReveal();
    initNavbar();
    initRipple();
    initMagneticButtons();

    // Add loaded class to body for potential CSS hooks
    document.body.classList.add('loaded');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }
    });
});
