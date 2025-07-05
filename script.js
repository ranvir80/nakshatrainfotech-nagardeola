// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init("XeABwb0dhjirgZNxm");
    }
})();

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitButton = document.querySelector('.submit-button');

// Mobile Navigation Toggle
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href').substring(1); // Remove #
        scrollToSection(targetId);
        
        // Update active link
        updateActiveNavLink(`#${targetId}`);
    });
});

// Update active navigation link based on scroll position
function updateActiveNavLink(activeId = null) {
    if (activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
        return;
    }
    
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active link on scroll
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    
    // Navbar background effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
    }
});

// Study Materials Button
function openStudyMaterials() {
    window.open('https://edudrivehub32.vercel.app/', '_blank', 'noopener,noreferrer');
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name').trim();
        const email = formData.get('email').trim();
        const phone = formData.get('phone').trim();
        const course = formData.get('course');
        const message = formData.get('message').trim();
        
        // Basic validation
        if (!name || !email || !message) {
            showFormStatus('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        setSubmitButtonLoading(true);
        hideFormStatus();
        
        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS is not available');
            }
            
            // Send email using EmailJS
            const response = await emailjs.send(
                'service_oklb3ik',
                'template_zs8ebfi',
                {
                    from_name: name,
                    from_email: email,
                    phone: phone,
                    course: course,
                    message: message,
                    to_name: 'Nakshatra Infotech Computer Classes'
                }
            );
            
            if (response.status === 200) {
                showFormStatus('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('EmailJS Error:', error);
            showFormStatus('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            setSubmitButtonLoading(false);
        }
    });
}

// Form validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form status message
function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideFormStatus();
            }, 5000);
        }
    }
}

// Hide form status message
function hideFormStatus() {
    if (formStatus) {
        formStatus.style.display = 'none';
    }
}

// Set submit button loading state
function setSubmitButtonLoading(isLoading) {
    if (submitButton) {
        submitButton.disabled = isLoading;
        
        if (isLoading) {
            submitButton.classList.add('loading');
        } else {
            submitButton.classList.remove('loading');
        }
    }
}

// Course card hover effects and animations
function initializeAnimations() {
    const courseCards = document.querySelectorAll('.course-card');
    const featureCards = document.querySelectorAll('.feature-card');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Add hover effects to cards
    [...courseCards, ...featureCards, ...statCards].forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.course-card, .feature-card, .stat-card, .feature-item, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Navigate with arrow keys when focused on nav links
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedElement = document.activeElement;
        const navLinksArray = Array.from(navLinks);
        const currentIndex = navLinksArray.indexOf(focusedElement);
        
        if (currentIndex !== -1) {
            e.preventDefault();
            let nextIndex;
            
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % navLinksArray.length;
            } else {
                nextIndex = (currentIndex - 1 + navLinksArray.length) % navLinksArray.length;
            }
            
            navLinksArray[nextIndex].focus();
        }
    }
});

// Handle form input focus for better UX
function initializeFormInteractions() {
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Performance optimization: Debounce scroll events
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

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Error handling for EmailJS
window.addEventListener('error', (e) => {
    if (e.message.includes('emailjs')) {
        console.error('EmailJS Error:', e);
        if (formStatus) {
            showFormStatus('Email service is temporarily unavailable. Please contact us directly.', 'error');
        }
    }
});

// Accessibility improvements
function initializeAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Enhance keyboard navigation for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, textarea, select');
    interactiveElements.forEach(element => {
        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && element.tagName === 'BUTTON') {
                element.click();
            }
        });
    });
    
    // Add aria-labels to social links and external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', `${link.textContent} (opens in new tab)`);
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize form interactions
    initializeFormInteractions();
    
    // Initialize accessibility features
    initializeAccessibility();
    
    // Add loading states to external links
    const externalLinks = document.querySelectorAll('a[href^="https://edudrivehub32.vercel.app"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const originalText = link.textContent;
            link.textContent = 'Opening...';
            link.style.opacity = '0.7';
            
            setTimeout(() => {
                link.textContent = originalText;
                link.style.opacity = '1';
            }, 2000);
        });
    });
    
    console.log('Nakshatra Infotech website initialized successfully!');
});

// Handle page visibility change for performance
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        // Pause animations when page is not visible
        document.body.style.animationPlayState = 'paused';
    } else {
        // Resume animations when page becomes visible
        document.body.style.animationPlayState = 'running';
    }
});

// Smooth scrolling polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Add polyfill for smooth scrolling
    function smoothScroll(target, duration = 500) {
        const targetPosition = target.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Override scrollToSection for older browsers
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            smoothScroll(section);
        }
    };
}