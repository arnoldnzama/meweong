// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien (sauf si c'est un parent de dropdown)
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && n.parentElement.classList.contains('dropdown')) {
        // Sur mobile, on toggle le dropdown au lieu de fermer le menu
        e.preventDefault();
        n.parentElement.classList.toggle('active');
    } else {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}));

// Navigation fluide
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar behavior on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Slider des témoignages
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.temoignage-card');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Masquer tous les slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Afficher le slide actuel
    slides[index].classList.add('active');
    dots[index].classList.add('active');
}

function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play du slider
setInterval(() => {
    changeSlide(1);
}, 5000);

// Animation au scroll
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

// Observer les éléments à animer
document.querySelectorAll('.mission-card, .action-card, .projet-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Compteurs animés
function animateCounters() {
    const counters = document.querySelectorAll('.impact-number');

    counters.forEach(counter => {
        const text = counter.textContent;
        const target = parseInt(text.replace(/[^\d]/g, ''));
        const suffix = text.replace(/[\d]/g, '');
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target.toLocaleString() + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current).toLocaleString() + suffix;
            }
        }, stepTime);
    });
}

// Observer pour les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

const statsBar = document.querySelector('.stats-bar');
if (statsBar) {
    counterObserver.observe(statsBar);
}

// Formulaire newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = e.target.querySelector('input[type="email"]').value;

        // Simulation d'envoi
        const button = e.target.querySelector('button');
        const originalText = button.innerHTML;

        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
        button.disabled = true;

        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Inscrit !';
            button.style.background = '#51b0e8';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = '';
                button.disabled = false;
                e.target.reset();
            }, 2000);
        }, 1500);
    });
}

// Effet parallax léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Bouton scroll vers le bas dans le hero
const heroScroll = document.querySelector('.hero-scroll');
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const missionSection = document.querySelector('#mission');
        if (missionSection) {
            missionSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Gestion des boutons CTA
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Lazy loading des images
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';

            img.onload = () => {
                img.style.opacity = '1';
            };

            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    // Si l'image est déjà chargée, on ne l'observe pas et on s'assure qu'elle est visible
    if (img.complete) {
        img.style.opacity = '1';
    } else {
        imageObserver.observe(img);
    }
});

// Gestion responsive du menu
function handleResize() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Splash Screen Management
    const splashScreen = document.getElementById('splash-screen');
    if (splashScreen) {
        document.body.style.overflow = 'hidden'; // Lock scrolling

        setTimeout(() => {
            splashScreen.classList.add('hidden');
            document.body.style.overflow = ''; // Unlock scrolling
        }, 3000); // 3 seconds precisely
    }

    // Animation d'entrée pour le hero
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 3500); // Appear after splash
    }
});

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function () {
        this.style.display = 'none';
        console.warn('Image non trouvée:', this.src);
    });
});

// Performance: Debounce pour le scroll
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

// Appliquer le debounce au scroll
const debouncedScroll = debounce(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Video Modal Logic
const videoModal = document.getElementById('video-modal');
const playButton = document.getElementById('play-speech');
const closeButton = document.querySelector('.video-modal-close');
const overlay = document.querySelector('.video-modal-overlay');
const videoIframe = document.getElementById('video-iframe');
const youtubeUrl = "https://www.youtube.com/embed/9y8cgILvex4?autoplay=1";

if (playButton && videoModal) {
    playButton.addEventListener('click', () => {
        videoIframe.src = youtubeUrl;
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    const closeModal = () => {
        videoModal.classList.remove('active');
        videoIframe.src = ''; // Stop video
        document.body.style.overflow = ''; // Restore scrolling
    };

    closeButton.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeModal();
        }
    });
}
