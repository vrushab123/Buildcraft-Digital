// BUILDCRAFT - Premium Agency Landing Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbarScroll();
    initTiltEffect();
    initParallax();
    initTestimonialSlider();
    initDepthTestimonials();
    initSmoothScroll();
    initFormEffects();
    initScrollReveal();
    initZAxisServices();
});

// Custom Cursor Glow
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        cursorX += dx * 0.1;
        cursorY += dy * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 3D Tilt Effect
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        const intensity = parseFloat(element.dataset.tiltIntensity) || 10;

        element.addEventListener('mouseenter', () => {
            element.style.transition = 'transform 0.1s ease-out';
        });

        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -intensity;
            const rotateY = ((x - centerX) / centerX) * intensity;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        element.addEventListener('mouseleave', () => {
            element.style.transition = 'transform 0.5s ease-out';
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

// Parallax Scroll Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = parseFloat(element.dataset.speed) || 0.5;
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            const offset = (scrollY - elementTop) * speed;

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.transform = `translateY(${offset}px)`;
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateParallax);
    });
}

// Testimonial Slider
function initTestimonialSlider() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    function autoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            showSlide(nextIndex);
        }, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlay();
    }

    if (cards.length > 0) {
        autoPlay();
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Effects
function initFormEffects() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                form.reset();
            }, 2000);
        }, 1500);
    });
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.service-card, .work-card, .stat, .section-header');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Z-Axis Services Scroll Animation
function initZAxisServices() {
    const servicesSection = document.querySelector('.services-z');
    const cards = document.querySelectorAll('.service-z-card');
    const progressBar = document.querySelector('.services-z-progress .progress-bar');

    if (!servicesSection || cards.length === 0) return;

    // Show first card by default
    if (cards[0]) {
        cards[0].classList.add('active');
    }

    function updateServicesOnScroll() {
        const rect = servicesSection.getBoundingClientRect();
        const sectionHeight = servicesSection.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Only start animation when section top reaches viewport top
        // This means the section is now "pinned"
        if (rect.top > 0) {
            // Haven't reached the section yet - show first card
            cards.forEach((card, index) => {
                card.classList.remove('active', 'behind', 'far-behind');
                if (index === 0) card.classList.add('active');
            });
            if (progressBar) progressBar.style.width = '0%';
            return;
        }

        if (rect.bottom < viewportHeight) {
            // Past the section - show last card
            cards.forEach((card, index) => {
                card.classList.remove('active', 'behind', 'far-behind');
                if (index === cards.length - 1) card.classList.add('active');
                else if (index === cards.length - 2) card.classList.add('behind');
                else card.classList.add('far-behind');
            });
            if (progressBar) progressBar.style.width = '100%';
            return;
        }

        // Calculate scroll progress within the services section
        // Progress is 0 when section top hits viewport top
        // Progress is 1 when section bottom hits viewport bottom
        const scrollableDistance = sectionHeight - viewportHeight;
        const scrolled = Math.abs(rect.top);
        const scrollProgress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Update progress bar
        if (progressBar) {
            progressBar.style.width = `${scrollProgress * 100}%`;
        }

        // Calculate which card should be active based on scroll
        const totalCards = cards.length;
        const activeCardIndex = Math.min(Math.floor(scrollProgress * totalCards), totalCards - 1);

        cards.forEach((card, index) => {
            card.classList.remove('active', 'behind', 'far-behind');

            if (index === activeCardIndex) {
                card.classList.add('active');
            } else if (index === activeCardIndex - 1) {
                card.classList.add('behind');
            } else if (index < activeCardIndex - 1) {
                card.classList.add('far-behind');
            }
        });
    }

    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateServicesOnScroll);
    });

    // Initial call
    updateServicesOnScroll();
}

// Depth Testimonials Slider
function initDepthTestimonials() {
    const cards = document.querySelectorAll('.testimonial-depth-card');
    const dots = document.querySelectorAll('.depth-nav-dot');
    let currentIndex = 0;
    let autoPlayInterval;

    if (cards.length === 0) return;

    function showSlide(index) {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentIndex = index;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetAutoPlay();
        });
    });

    function autoPlay() {
        autoPlayInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % cards.length;
            showSlide(nextIndex);
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        autoPlay();
    }

    autoPlay();
}

