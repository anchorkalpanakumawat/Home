// ===================================
// NAVIGATION & ACTIVE MENU SYSTEM
// ===================================

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const nav = document.getElementById('navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});

// ===================================
// ACTIVE SECTION DETECTION & MENU HIGHLIGHTING
// ===================================

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

function setActiveNav() {
    const scrollPosition = window.scrollY + 100; // Offset for better detection
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to current section's nav link
            const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
    
    // Special case for home section at the top
    if (window.scrollY < 100) {
        navItems.forEach(item => item.classList.remove('active'));
        const homeLink = document.querySelector('.nav-link[href="#home"]');
        if (homeLink) homeLink.classList.add('active');
    }
}

// Call on scroll with debounce for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        setActiveNav();
    }, 50);
});

// Initialize on page load
window.addEventListener('load', setActiveNav);

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// ===================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ===================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ===================================
// SMOOTH SCROLL FOR ALL INTERNAL LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = nav.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// HORIZONTAL SCROLL FUNCTIONS FOR VIDEOS
// ===================================

function scrollVideos(direction) {
    const container = document.querySelector('.videos-grid');
    if (!container) return;
    
    const scrollAmount = 500;
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// ===================================
// HORIZONTAL SCROLL FUNCTIONS FOR GALLERY
// ===================================

function scrollGallery(direction) {
    const container = document.querySelector('.gallery-grid');
    if (!container) return;
    
    const scrollAmount = 450;
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// ===================================
// TOUCH/SWIPE SUPPORT FOR MOBILE
// ===================================

let touchStartX = 0;
let touchEndX = 0;

function handleVideoSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        scrollVideos('right');
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        scrollVideos('left');
    }
}

function handleGallerySwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        scrollGallery('right');
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        scrollGallery('left');
    }
}

const videosGrid = document.querySelector('.videos-grid');
if (videosGrid) {
    videosGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    videosGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleVideoSwipe();
    });
}

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    galleryGrid.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    galleryGrid.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleGallerySwipe();
    });
}

// ===================================
// HIDE SCROLL INDICATORS AFTER FIRST INTERACTION
// ===================================

const hideScrollIndicators = () => {
    document.querySelectorAll('.scroll-indicator').forEach(indicator => {
        indicator.style.opacity = '0';
        indicator.style.transition = 'opacity 0.5s ease';
    });
};

if (videosGrid) {
    videosGrid.addEventListener('scroll', hideScrollIndicators, { once: true });
}
if (galleryGrid) {
    galleryGrid.addEventListener('scroll', hideScrollIndicators, { once: true });
}

// ===================================
// STATS COUNTER ANIMATION
// ===================================

const statsNumbers = document.querySelectorAll('.stat-number');

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                if (num.textContent === '0') {
                    animateCounter(num);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector("#stats");
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===================================
// FORM SUBMISSION HANDLER
// ===================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send form data to backend
        // fetch('/submit-form', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
    });
}

// ===================================
// PERFORMANCE OPTIMIZATION: DEBOUNCE FUNCTION
// ===================================

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

// Apply debounce to scroll event
const debouncedSetActiveNav = debounce(setActiveNav, 100);
window.addEventListener('scroll', debouncedSetActiveNav);

// ===================================
// PRELOAD CRITICAL IMAGES
// ===================================

window.addEventListener('load', () => {
    const images = ['main.jpg', 'sub_main.jpg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// ===================================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // Allow Escape key to close mobile menu
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        if (menuToggle) {
            const icon = menuToggle.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }
});

// ===================================
// ADVANCED VIDEO HANDLING - SHORTS & REGULAR
// ===================================

// Detect when YouTube iframe fails to load (for Shorts)
document.addEventListener('DOMContentLoaded', () => {
    const videoCards = document.querySelectorAll('[data-video-type="short"]');
    
    videoCards.forEach(card => {
        const wrapper = card.querySelector('.video-wrapper');
        const iframe = wrapper.querySelector('.video-iframe');
        const fallbackLink = wrapper.querySelector('.video-link-overlay');
        
        if (iframe && fallbackLink) {
            // Try to detect if iframe fails to load
            iframe.addEventListener('load', () => {
                // Check if iframe loaded successfully
                try {
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    // If we can't access it, it might have loaded
                    // Keep iframe visible
                } catch (e) {
                    // Cross-origin restriction - video is probably loading
                }
            });
            
            // Fallback after 3 seconds if iframe seems blocked
            setTimeout(() => {
                // Check if user has interacted with iframe
                if (!iframe.getAttribute('data-interacted')) {
                    // YouTube Shorts often don't allow embed
                    // Show fallback link instead
                    iframe.style.display = 'none';
                    fallbackLink.style.display = 'block';
                }
            }, 3000);
            
            // Mark as interacted if user clicks
            iframe.addEventListener('click', () => {
                iframe.setAttribute('data-interacted', 'true');
            });
        }
    });
});

// Better error handling for all video iframes
const allIframes = document.querySelectorAll('.video-wrapper iframe');
allIframes.forEach(iframe => {
    iframe.addEventListener('error', () => {
        const wrapper = iframe.closest('.video-wrapper');
        const fallback = wrapper.querySelector('.video-link-overlay');
        if (fallback) {
            iframe.style.display = 'none';
            fallback.style.display = 'block';
        }
    });
});

// ===================================
// VIDEO LAZY LOADING
// ===================================

const videoCards = document.querySelectorAll('.video-card');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const iframe = entry.target.querySelector('iframe');
            if (iframe && !iframe.src) {
                const dataSrc = iframe.getAttribute('data-src');
                if (dataSrc) {
                    iframe.src = dataSrc;
                }
            }
            videoObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

videoCards.forEach(card => {
    videoObserver.observe(card);
});

// ===================================
// GALLERY IMAGE MODAL (LIGHTBOX)
// ===================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'image-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                </div>
            `;
            document.body.appendChild(modal);
            document.body.style.overflow = 'hidden';
            
            // Close modal
            const closeBtn = modal.querySelector('.close-modal');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = '';
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }
            });
        }
    });
});

// ===================================
// SCROLL TO TOP BUTTON (OPTIONAL)
// ===================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.style.display = 'none';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// CONSOLE LOG FOR DEBUGGING
// ===================================

console.log('✅ Website Initialized Successfully');
console.log('✅ Active Menu Highlighting: Enabled');
console.log('✅ Smooth Scrolling: Enabled');
console.log('✅ Mobile Menu: Enabled');
console.log('✅ Animations: Enabled');
