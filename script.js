 // Preloader
        window.addEventListener('load', () => {
            setTimeout(() => {
                const preloader = document.getElementById('preloader');
                preloader.style.opacity = '0';
                preloader.style.pointerEvents = 'none';
                setTimeout(() => preloader.style.display = 'none', 500);
            }, 2000);
        });

        // Custom Cursor
        const cursor = document.getElementById('cursor');
        const cursorDot = document.getElementById('cursorDot');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .magnetic').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Magnetic Effect
        document.querySelectorAll('.magnetic').forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                this.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Feature Card Mouse Follow
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                this.style.setProperty('--mouse-x', x + '%');
                this.style.setProperty('--mouse-y', y + '%');
            });
        });

        // Navigation Scroll
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('nav');
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });

        // Mobile Menu
        const navToggle = document.getElementById('navToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Page Navigation
        function navigateToPage(pageId) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            const targetPage = document.getElementById('page-' + pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Close mobile menu
                mobileMenu.classList.remove('active');
                
                // Trigger reveal animations
                setTimeout(() => {
                    revealOnScroll();
                }, 100);
            }
        }

        // Page link clicks
        document.querySelectorAll('[data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                navigateToPage(page);
            });
        });

        // Create Particles
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }

        // Counter Animation
        const animateCounters = () => {
            document.querySelectorAll('.stat-value[data-count]').forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current) + '+';
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        };

        // Reveal on Scroll
        const revealOnScroll = () => {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                const elementVisible = 150;
                
                if (elementTop < windowHeight - elementVisible) {
                    el.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', () => {
            revealOnScroll();
            animateCounters();
        });

        // FAQ Accordion
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                item.classList.toggle('active');
            });
        });

        // Pricing Toggle
        document.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const billing = btn.getAttribute('data-billing');
                
                // Update prices
                document.querySelectorAll('.pricing-amount').forEach(price => {
                    const weekly = price.getAttribute('data-weekly');
                    const monthly = price.getAttribute('data-monthly');
                    const quarterly = price.getAttribute('data-quarterly');
                    
                    if (weekly) {
                        let newPrice, originalText;
                        const originalPrice = document.querySelector('.pricing-original');
                        
                        switch(billing) {
                            case 'weekly':
                                newPrice = weekly;
                                if (originalPrice) originalPrice.style.visibility = 'hidden';
                                break;
                            case 'monthly':
                                newPrice = monthly;
                                if (originalPrice) {
                                    originalPrice.textContent = 'Originally $' + weekly + '/hour';
                                    originalPrice.style.visibility = 'visible';
                                }
                                break;
                            case 'quarterly':
                                newPrice = quarterly;
                                if (originalPrice) {
                                    originalPrice.textContent = 'Originally $' + weekly + '/hour';
                                    originalPrice.style.visibility = 'visible';
                                }
                                break;
                        }
                        
                        price.textContent = '$' + newPrice;
                    }
                });
            });
        });

        // Contact Form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('successMessage').classList.add('show');
            e.target.reset();
            
            setTimeout(() => {
                document.getElementById('successMessage').classList.remove('show');
            }, 5000);
        });

        // GSAP Animations
        gsap.registerPlugin(ScrollTrigger);

        // Hero animation
        gsap.from('.hero-content', {
            opacity: 0,
            y: 50,
            duration: 1,
            delay: 2.2,
            ease: 'power3.out'
        });

        gsap.from('.hero-badge', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 2.4,
            ease: 'power3.out'
        });

        gsap.from('.hero-title', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 2.6,
            ease: 'power3.out'
        });

        gsap.from('.hero-subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 2.8,
            ease: 'power3.out'
        });

        gsap.from('.hero-stats', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: 3,
            ease: 'power3.out'
        });

        gsap.from('.hero-cta', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 3.2,
            ease: 'power3.out'
        });

        // Parallax effect on scroll
        gsap.to('.hero-grid', {
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 200,
            opacity: 0
        });
/* THEME TOGGLE LOGIC */
const themeToggleBtn = document.getElementById('themeToggle');
const htmlRoot = document.documentElement;

// 1. Check for saved theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlRoot.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
}

// 2. Toggle function
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
});

function updateIcon(theme) {
    themeToggleBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}
