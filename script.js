/* =============================================
   EVA SOLAR - Estilo Futurista
   script.js
   ============================================= */

// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFAQ();
    initContactForm();
    initScrollAnimations();
    initStatsCounter();
});

// ===== Navigation =====
function initNavigation() {
    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FAQ Accordion =====
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// ===== Contact Form =====
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('nombre') || document.querySelector('input[placeholder*="nombre"]')?.value || '';
            const phone = formData.get('telefono') || document.querySelector('input[type="tel"]')?.value || '';
            const email = formData.get('email') || document.querySelector('input[type="email"]')?.value || '';
            const service = formData.get('servicio') || document.querySelector('select')?.value || '';
            const message = formData.get('mensaje') || document.querySelector('textarea')?.value || '';
            
            // Build WhatsApp message
            let whatsappMessage = '¡Hola! Me interesa cotizar un sistema solar.%0A%0A';
            if (name) whatsappMessage += `*Nombre:* ${name}%0A`;
            if (phone) whatsappMessage += `*Teléfono:* ${phone}%0A`;
            if (email) whatsappMessage += `*Email:* ${email}%0A`;
            if (service) whatsappMessage += `*Servicio:* ${service}%0A`;
            if (message) whatsappMessage += `*Mensaje:* ${message}%0A`;
            
            // Open WhatsApp
            window.open(`https://wa.me/526677950481?text=${whatsappMessage}`, '_blank');
        });
    }
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .project-card, .testimonial-card, .team-card, .stats-card, .faq-item, .about-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// ===== Stats Counter Animation =====
function initStatsCounter() {
    const statsNumbers = document.querySelectorAll('.stats-number, .stat-number');
    
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsNumbers.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const hasK = text.includes('K');
    
    let endValue = parseFloat(text.replace(/[^0-9.]/g, ''));
    let suffix = '';
    
    if (hasK) {
        suffix = 'K';
    }
    if (hasPlus) {
        suffix += '+';
    }
    if (hasPercent) {
        suffix = '%';
    }
    
    let startValue = 0;
    const duration = 2000;
    const increment = endValue / (duration / 16);
    
    function updateCounter() {
        startValue += increment;
        if (startValue < endValue) {
            if (hasK || endValue < 10) {
                element.textContent = startValue.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(startValue) + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            if (hasK) {
                element.textContent = endValue.toFixed(1) + suffix;
            } else {
                element.textContent = Math.floor(endValue) + suffix;
            }
        }
    }
    
    updateCounter();
}

// ===== Utility Functions =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Parallax Effect (Optional) =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-visual, .glow-effect');
    
    window.addEventListener('scroll', throttle(function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 16));
}

// ===== Typing Effect (Optional) =====
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Preloader (Optional) =====
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
}

// Hide preloader when page loads
window.addEventListener('load', hidePreloader);

// ===== Form Validation =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]{10,}$/;
    return re.test(phone);
}

// ===== Console Easter Egg =====
console.log('%c⚡ EVA Solar', 'font-size: 24px; font-weight: bold; color: #00FF88;');
console.log('%cEnergía del Futuro', 'font-size: 14px; color: #00D4FF;');
console.log('%c¿Interesado en trabajar con nosotros? Contáctanos: evasolar.rgz@gmail.com', 'font-size: 12px; color: #8888A0;');
