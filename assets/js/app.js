document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       MOBILE NAVIGATION TOGGLE
       ========================================== */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                navToggle.classList.remove('active');
                const bars = navToggle.querySelectorAll('.bar');
                bars.forEach(bar => bar.style.transform = 'none');
                bars[1].style.opacity = '1';
            });
        });
    }

    /* ==========================================
       STICKY HEADER & SCROLL SECTIONS ACTIVE LINK
       ========================================== */
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Sticky Header shrink
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Nav Link highlighting
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
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
    });

    /* ==========================================
       MENU SEARCH & FILTER INTERACTIVITY
       ========================================== */
    const menuSearch = document.getElementById('menuSearch');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuGrid = document.getElementById('menuGrid');
    
    // Safety check that items exist
    if (menuGrid) {
        const menuItems = menuGrid.querySelectorAll('.menu-item-card');

        const filterMenu = () => {
            const searchQuery = menuSearch ? menuSearch.value.toLowerCase().trim() : '';
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

            menuItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const title = item.querySelector('.item-title').textContent.toLowerCase();
                const description = item.querySelector('.item-description').textContent.toLowerCase();
                
                const matchesSearch = title.includes(searchQuery) || description.includes(searchQuery);
                const matchesCategory = activeFilter === 'all' || category === activeFilter;

                if (matchesSearch && matchesCategory) {
                    item.style.display = 'flex';
                    // Trigger fade in animation by resetting opacity
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        // Filter button click
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterMenu();
            });
        });

        // Search keyup input event
        if (menuSearch) {
            menuSearch.addEventListener('input', filterMenu);
        }
    }

    /* ==========================================
       GALLERY IMAGES FILTERING
       ========================================== */
    const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterType = btn.getAttribute('data-gallery-filter');

            galleryItems.forEach(item => {
                const type = item.getAttribute('data-type');
                if (filterType === 'all' || type === filterType) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================
       LIGHTBOX POPUP FOR GALLERY
       ========================================== */
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentGalleryIndex = 0;
    // Map visible gallery images for clean browsing
    let activeImages = [];

    const updateActiveImages = () => {
        activeImages = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    };

    const showLightboxImage = (index) => {
        if (index < 0) {
            index = activeImages.length - 1;
        } else if (index >= activeImages.length) {
            index = 0;
        }
        currentGalleryIndex = index;
        
        const targetImg = activeImages[currentGalleryIndex].querySelector('.gallery-img');
        const captionText = activeImages[currentGalleryIndex].querySelector('.gallery-overlay span').textContent;

        lightboxImg.src = targetImg.src;
        lightboxImg.alt = targetImg.alt;
        lightboxCaption.textContent = captionText;
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateActiveImages();
            const activeIndex = activeImages.indexOf(item);
            
            if (activeIndex !== -1) {
                showLightboxImage(activeIndex);
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scrolling behind modal
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showLightboxImage(currentGalleryIndex + 1);
        });
    }

    // Close on click outside the image wrapper
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Keyboard support for Lightbox modal
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightboxModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            } else if (e.key === 'ArrowLeft') {
                showLightboxImage(currentGalleryIndex - 1);
            } else if (e.key === 'ArrowRight') {
                showLightboxImage(currentGalleryIndex + 1);
            }
        }
    });

    /* ==========================================
       REVIEW CAROUSEL TESTIMONIAL AUTOMATION
       ========================================== */
    const slides = document.querySelectorAll('.review-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let carouselInterval;

    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        showSlide(currentSlide + 1);
    };

    const startCarousel = () => {
        stopCarousel();
        carouselInterval = setInterval(nextSlide, 5000); // Auto shift every 5 seconds
    };

    const stopCarousel = () => {
        if (carouselInterval) clearInterval(carouselInterval);
    };

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startCarousel(); // Reset timer on manual click
        });
    });

    // Pause on hover
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        reviewsContainer.addEventListener('mouseenter', stopCarousel);
        reviewsContainer.addEventListener('mouseleave', startCarousel);
    }

    // Start on boot
    if (slides.length > 0) {
        startCarousel();
    }

    /* ==========================================
       CONTACT FORM INTERACTION
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulating API call response
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending Message...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // Clear inputs
                contactForm.reset();

                // Success response state
                formFeedback.textContent = 'Thank you for your message! We will get back to you shortly.';
                formFeedback.className = 'form-feedback success';
                
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;

                // Hide success message after 5 seconds
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);

            }, 1500);
        });
    }
});
