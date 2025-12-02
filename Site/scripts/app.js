// Main application controller
class App {
    constructor() {
        this.currentPage = 'splash';
        this.init();
    }

    init() {
        this.bindEvents();
        this.showSplashScreen();
        this.setupVideo();
    }

    bindEvents() {
        // Start journey button
        const startBtn = document.getElementById('start-journey-btn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startJourney());
        }

        // Sound toggle button
        const soundBtn = document.getElementById('sound-toggle-btn');
        if (soundBtn) {
            soundBtn.addEventListener('click', () => this.toggleSound());
        }

        // Video play button
        const videoPlayBtn = document.getElementById('video-play-btn');
        if (videoPlayBtn) {
            videoPlayBtn.addEventListener('click', () => this.startVideo());
        }

        // Scroll to About Us button
        document.querySelectorAll('.scroll-to-about').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToAboutUs();
            });
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Check if it's the scroll-to-projects link
                if (link.classList.contains('scroll-to-projects')) {
                    this.scrollToProjects();
                    return;
                }
                
                const page = link.getAttribute('data-page');
                if (page) {
                    this.showPage(page);
                }
            });
        });

        // Logo click
        const logo = document.querySelector('.logo');
        if (logo) {
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('home');
            });
        }

        // Project cards (regular, mini, and large)
        document.querySelectorAll('.project-card, .project-card-mini, .large-project-card').forEach(card => {
            card.addEventListener('click', () => {
                const project = card.getAttribute('data-project');
                if (project) {
                    this.showProjectDetail(project);
                }
            });
        });

        // Back to projects buttons
        document.querySelectorAll('.back-to-projects').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showPage('projects');
            });
        });
    }

    showSplashScreen() {
        document.getElementById('splash-screen').classList.remove('hidden');
        document.querySelector('nav').classList.remove('show');
    }

    startJourney() {
        const splash = document.getElementById('splash-screen');
        const nav = document.querySelector('nav');
        const video = document.querySelector('.splash-video-background video');
        
        splash.classList.add('fade-out');
        
        setTimeout(() => {
            splash.classList.add('hidden');
            nav.classList.add('show');
            if (video) {
                video.pause();
            }
            this.showPage('home');
        }, 500);
    }

    setupVideo() {
        const video = document.querySelector('.splash-video-background video');
        const playOverlay = document.getElementById('video-play-overlay');
        const soundControls = document.getElementById('splash-controls');
        
        if (video) {
            // Tentar autoplay com som primeiro
            video.muted = false;
            video.play().then(() => {
                // Sucesso: mostrar controles de som
                if (soundControls) {
                    soundControls.style.display = 'block';
                }
            }).catch(() => {
                // Falhou: tentar sem som
                video.muted = true;
                video.play().then(() => {
                    // Autoplay silencioso funcionou
                    if (soundControls) {
                        soundControls.style.display = 'block';
                    }
                }).catch(() => {
                    // Autoplay totalmente bloqueado: mostrar botão
                    if (playOverlay) {
                        playOverlay.style.display = 'flex';
                    }
                });
            });
        }
    }

    startVideo() {
        const video = document.querySelector('.splash-video-background video');
        const playOverlay = document.getElementById('video-play-overlay');
        const soundBtn = document.getElementById('sound-toggle-btn');
        const soundControls = document.getElementById('splash-controls');
        
        if (video && playOverlay) {
            video.muted = false;
            video.play().then(() => {
                playOverlay.style.display = 'none';
                // Mostrar controles de som
                if (soundControls) {
                    soundControls.style.display = 'block';
                }
                if (soundBtn) {
                    soundBtn.textContent = '🔊';
                    soundBtn.title = 'Desativar som';
                }
            }).catch((error) => {
                console.log('Erro ao reproduzir vídeo:', error);
                // Se falhar com som, tentar sem som
                video.muted = true;
                video.play().then(() => {
                    playOverlay.style.display = 'none';
                    if (soundControls) {
                        soundControls.style.display = 'block';
                    }
                    if (soundBtn) {
                        soundBtn.textContent = '🔇';
                        soundBtn.title = 'Ativar som';
                    }
                });
            });
        }
    }

    toggleSound() {
        const video = document.querySelector('.splash-video-background video');
        const soundBtn = document.getElementById('sound-toggle-btn');
        
        if (video && soundBtn) {
            if (video.muted) {
                video.muted = false;
                soundBtn.textContent = '🔊';
                soundBtn.title = 'Desativar som';
            } else {
                video.muted = true;
                soundBtn.textContent = '🔇';
                soundBtn.title = 'Ativar som';
            }
        }
    }

    showPage(pageName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const page = document.getElementById(`${pageName}-page`);
        if (page) {
            page.classList.remove('hidden');
            this.currentPage = pageName;
        }

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });

        // Scroll to top
        window.scrollTo(0, 0);

        // Add fade in animation
        setTimeout(() => {
            if (page) {
                page.classList.add('fade-in-up');
            }
        }, 50);
    }

    showProjectDetail(projectName) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.add('hidden');
        });

        // Show project detail
        const projectPage = document.getElementById(`project-${projectName}`);
        if (projectPage) {
            projectPage.classList.remove('hidden');
        }

        // Clear active nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Scroll to top
        window.scrollTo(0, 0);
    }

    scrollToProjects() {
        // Make sure we're on the home page
        this.showPage('home');
        
        // Wait a moment for the page to load, then scroll to projects section
        setTimeout(() => {
            const projectsSection = document.getElementById('our-projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector('.scroll-to-projects').classList.add('active');
            }
        }, 100);
    }

    scrollToAboutUs() {
        // Make sure we're on the home page
        this.showPage('home');
        
        // Wait a moment for the page to load, then scroll to about section
        setTimeout(() => {
            const aboutSection = document.getElementById('about-us-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }

    initModuleNavigation() {
        // Module view buttons
        document.querySelectorAll('.view-module-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const moduleItem = btn.closest('.module-item');
                const moduleSlides = moduleItem.querySelector('.module-slides');
                
                if (moduleSlides.classList.contains('hidden')) {
                    // Hide all other module slides
                    document.querySelectorAll('.module-slides').forEach(slides => {
                        slides.classList.add('hidden');
                    });
                    // Show this module's slides
                    moduleSlides.classList.remove('hidden');
                    btn.textContent = '📖 Hide Module';
                } else {
                    moduleSlides.classList.add('hidden');
                    btn.textContent = '📖 View Module';
                }
            });
        });

        // Slide navigation buttons
        document.querySelectorAll('.slide-nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const moduleId = btn.getAttribute('data-module');
                const isNext = btn.classList.contains('next-slide');
                this.navigateSlide(moduleId, isNext);
            });
        });
    }

    navigateSlide(moduleId, isNext) {
        const moduleSlides = document.getElementById(`module-${moduleId}-slides`);
        const slides = moduleSlides.querySelectorAll('.slide');
        const currentSlide = moduleSlides.querySelector('.slide.active');
        const currentIndex = Array.from(slides).indexOf(currentSlide);
        
        let newIndex;
        if (isNext) {
            newIndex = currentIndex + 1;
        } else {
            newIndex = currentIndex - 1;
        }
        
        // Check bounds
        if (newIndex < 0 || newIndex >= slides.length) {
            return;
        }
        
        // Update slides
        currentSlide.classList.remove('active');
        slides[newIndex].classList.add('active');
        
        // Update counter
        const counter = moduleSlides.querySelector('.slide-counter');
        counter.textContent = `${newIndex + 1} / ${slides.length}`;
        
        // Update button states
        const prevBtn = moduleSlides.querySelector('.prev-slide');
        const nextBtn = moduleSlides.querySelector('.next-slide');
        
        prevBtn.disabled = newIndex === 0;
        nextBtn.disabled = newIndex === slides.length - 1;
    }
}

// Navigate to specific slide in presentation iframe
function navigateToSlide(slideNumber) {
    const iframe = document.getElementById('mooc-presentation-iframe');
    if (iframe) {
        // Update iframe src to specific slide
        const baseUrl = 'https://www.canva.com/design/DAG3rIPFsaY/o6KpPSDywzYF4yKySTwizw/view?embed';
        iframe.src = `${baseUrl}#${slideNumber}`;
        
        // Add visual feedback to the clicked module
        const moduleItems = document.querySelectorAll('.module-item');
        moduleItems.forEach(item => item.classList.remove('active'));
        
        // Find the clicked module and highlight it
        const clickedModule = document.querySelector(`[data-module="${getModuleFromSlide(slideNumber)}"]`);
        if (clickedModule) {
            clickedModule.classList.add('active');
        }
    }
}

// Helper function to get module number from slide number
function getModuleFromSlide(slideNumber) {
    const slideMap = {
        8: 1,   // Introduction to Digital Design
        34: 2,  // Design Thinking
        67: 3,  // Prototyping & Testing
        86: 4   // Advanced Technologies
    };
    return slideMap[slideNumber] || 1;
}

// Global function for project navigation
function navigateToProject(projectName) {
    if (window.app) {
        window.app.showProjectDetail(projectName);
    }
}

// Initialize app when DOM is loaded
let app; // Global variable
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
    app.initModuleNavigation();
    
    // Make app globally accessible
    window.app = app;
    
    // Initialize FAQ functionality
    initFAQs();
});

// FAQ functionality
function initFAQs() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });

    // FAQ button functionality
    document.querySelectorAll('.faqs-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Navigate to about page if not already there
            if (window.app) {
                window.app.showPage('about');
                
                // Scroll to FAQ section after a short delay
                setTimeout(() => {
                    const faqSection = document.getElementById('frequent-questions');
                    if (faqSection) {
                        faqSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }
        });
    });
}

// Module toggle functionality
function toggleModule(moduleNumber) {
    const moduleItem = document.querySelector(`.module-item[data-module="${moduleNumber}"]`);
    
    if (!moduleItem) return;
    
    const isCurrentlyExpanded = moduleItem.classList.contains('expanded');
    
    if (isCurrentlyExpanded) {
        // Collapse the module
        moduleItem.classList.remove('expanded');
        moduleItem.classList.add('collapsed');
    } else {
        // Expand the module (others stay visible)
        moduleItem.classList.remove('collapsed');
        moduleItem.classList.add('expanded');
    }
}