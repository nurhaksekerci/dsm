// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Handling
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const email = formData.get('email');
    const district = formData.get('district');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !phone || !district || !message) {
        showNotification('Lütfen tüm zorunlu alanları doldurun.', 'error');
        return;
    }
    
    // Phone validation
    const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        showNotification('Lütfen geçerli bir telefon numarası girin.', 'error');
        return;
    }
    
    // Email validation (if provided)
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Lütfen geçerli bir e-posta adresi girin.', 'error');
            return;
        }
    }
    
    // Simulate form submission
    showNotification('Talebiniz alındı. En kısa sürede sizinle iletişime geçeceğiz.', 'success');
    
    // Create WhatsApp message
    const districtNames = {
        'zeytinburnu': 'Zeytinburnu',
        'bakirkoy': 'Bakırköy',
        'bahcelievler': 'Bahçelievler',
        'bayrampasa': 'Bayrampaşa',
        'beyoglu': 'Beyoğlu',
        'esenler': 'Esenler',
        'fatih': 'Fatih',
        'gungoren': 'Güngören'
    };
    
    const whatsappMessage = `Merhaba,
    
Haşere ilaçlama hizmeti almak istiyorum.

İletişim Bilgilerim:
• Ad Soyad: ${name}
• Telefon: ${phone}
• E-posta: ${email || 'Belirtilmemiş'}
• İlçe: ${districtNames[district]}

Mesaj: ${message}

Lütfen en kısa sürede benimle iletişime geçin.`;
    
    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/905453801834?text=${encodedMessage}`;
    
    // Redirect to WhatsApp after 2 seconds
    setTimeout(() => {
        window.open(whatsappURL, '_blank');
    }, 2000);
    
    // Reset form
    contactForm.reset();
});

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#38a169' : '#e53e3e'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        font-family: 'Poppins', sans-serif;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Animate elements on scroll
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .area-card, .feature-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Phone number formatting
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('90')) {
        value = value.substring(2);
    }
    
    if (value.startsWith('0')) {
        value = value.substring(1);
    }
    
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.substring(0, 3) + ' ' + value.substring(3);
        } else if (value.length <= 8) {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6);
        } else {
            value = value.substring(0, 3) + ' ' + value.substring(3, 6) + ' ' + value.substring(6, 8) + ' ' + value.substring(8, 10);
        }
        
        if (value.length > 13) {
            value = value.substring(0, 13);
        }
    }
    
    e.target.value = value;
});

// Click to call functionality
document.addEventListener('DOMContentLoaded', () => {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Track phone call click (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    'event_category': 'engagement',
                    'event_label': 'header_phone'
                });
            }
        });
    });
});

// Service area selection functionality
const areaCards = document.querySelectorAll('.area-card');
areaCards.forEach(card => {
    card.addEventListener('click', () => {
        const areaName = card.querySelector('h3').textContent;
        const districtSelect = document.getElementById('district');
        
        // Map display names to select values
        const areaMapping = {
            'Arnavutköy': 'arnavutkoy',
            'Avcılar': 'avcilar',
            'Bağcılar': 'bagcilar',
            'Bahçelievler': 'bahcelievler',
            'Bakırköy': 'bakirkoy',
            'Başakşehir': 'basaksehir',
            'Bayrampaşa': 'bayrampasa',
            'Beşiktaş': 'besiktas',
            'Beyoğlu': 'beyoglu',
            'Esenler': 'esenler',
            'Eyüp': 'eyup',
            'Fatih': 'fatih',
            'Gaziosmanpaşa': 'gaziosmanpasa',
            'Güngören': 'gungoren',
            'Kâğıthane': 'kagithane',
            'Küçükçekmece': 'kucukcekmece',
            'Sarıyer': 'sariyer',
            'Sultangazi': 'sultangazi',
            'Şişli': 'sisli',
            'Zeytinburnu': 'zeytinburnu'
        };
        
        if (areaMapping[areaName]) {
            districtSelect.value = areaMapping[areaName];
            
            // Scroll to contact form
            const contactSection = document.getElementById('contact');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = contactSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Highlight the form briefly
            const contactForm = document.getElementById('contactForm');
            contactForm.style.border = '2px solid #3182ce';
            setTimeout(() => {
                contactForm.style.border = 'none';
            }, 3000);
        }
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Preload critical resources
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero background image
    const heroImage = new Image();
    heroImage.src = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    
    // Preload about section image
    const aboutImage = new Image();
    aboutImage.src = 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Defer non-critical scripts
    const deferredScripts = [
        'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
    ];
    
    deferredScripts.forEach(src => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        document.head.appendChild(script);
    });
});

// Error handling for external resources
window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        // Replace broken images with placeholder
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkdvcnNlbCBZdWtsZW5lbWVkaQ==';
    }
});

// Service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}