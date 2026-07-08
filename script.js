/**
 * ==========================================================================
 * CAMP ALPHA - COHESIVE VANILLA INTERACTION & ANIMATION CORE ENGINE
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    initPageLoader();
    initScrollProgressBar();
    initStickyHeader();
    initMobileNavigation();
    initParallaxEngine();
    initIntersectionObserverReveals();
    initPremiumCounters();
    initLightboxGallery();
    initTestimonialCarousel();
    initAccordions();
    initThemeEngine();
    initContactFormEngine();
    initCustomCursor();
    initCookieConsent();
    initBackToTop();
});

// 1. Page Loader Dismissal
function initPageLoader() {
    const loader = document.getElementById("page-loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 600);
        });
    }
}

// 2. Scroll Progress Bar
function initScrollProgressBar() {
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        window.addEventListener("scroll", () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }
}

// 3. Sticky Header State Mutation
function initStickyHeader() {
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
}

// 4. Mobile Navigation Overlay Toggle
function initMobileNavigation() {
    const trigger = document.getElementById("menu-trigger-btn");
    const overlay = document.getElementById("mobile-nav");
    if (trigger && overlay) {
        trigger.addEventListener("click", () => {
            overlay.classList.toggle("active");
            trigger.classList.toggle("open");
            // Simple micro-animation processing for accessibility states
            const expanded = trigger.getAttribute("aria-expanded") === "true" || false;
            trigger.setAttribute("aria-expanded", !expanded);
        });
    }
}

// 5. High-Performance Parallax Layer Engine
function initParallaxEngine() {
    const parallaxBg = document.querySelector(".hero-parallax-bg");
    if (parallaxBg && window.innerWidth > 1024) {
        window.addEventListener("scroll", () => {
            const offset = window.scrollY;
            // Native translation acceleration bounding layouts naturally
            parallaxBg.style.transform = `translateY(${offset * 0.4}px)`;
        });
    }
}

// 6. Intersection Observer Content Revealer
function initIntersectionObserverReveals() {
    const elements = document.querySelectorAll(".reveal-on-scroll");
    const options = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    elements.forEach(el => observer.observe(el));
}

// 7. Numerical Metrics Counter Systems
function initPremiumCounters() {
    const counters = document.querySelectorAll(".metric-value");
    if (counters.length === 0) return;

    const options = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseInt(target.getAttribute("data-target"), 10);
                let startVal = 0;
                const duration = 2000;
                const startTime = performance.now();

                function updateCounter(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quad formula execution
                    const currentVal = Math.floor(progress * (2 - progress) * endVal);
                    target.textContent = currentVal + (target.textContent.includes("+") ? "+" : "");
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        target.textContent = endVal + (target.getAttribute("data-target").includes("+") || target.textContent.includes("+") ? "+" : "");
                    }
                }
                requestAnimationFrame(updateCounter);
                observer.unobserve(target);
            }
        });
    }, options);

    counters.forEach(counter => observer.observe(counter));
}

// 8. Luxury Media Lightbox Component
function initLightboxGallery() {
    const items = document.querySelectorAll(".gallery-item");
    const overlay = document.getElementById("lightbox-overlay");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.getElementById("lightbox-close-btn");

    if (!overlay || !lightboxImg) return;

    items.forEach(item => {
        item.addEventListener("click", () => {
            const targetImg = item.querySelector("img");
            if (targetImg) {
                lightboxImg.src = targetImg.getAttribute("data-src") || targetImg.src;
                overlay.classList.add("active");
                document.body.style.overflow = "hidden";
            }
        });
    });

    const closeLightbox = () => {
        overlay.classList.remove("active");
        document.body.style.overflow = "";
    };

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeLightbox();
    });
}

// 9. Pure Slide Carousel For Client Testimonials
function initTestimonialCarousel() {
    const slides = document.querySelectorAll(".testimonial-slide");
    const dotsContainer = document.getElementById("carousel-dots-group");
    if (slides.length === 0 || !dotsContainer) return;

    let currentIndex = 0;
    dotsContainer.innerHTML = "";

    slides.forEach((_, idx) => {
        const dot = document.createElement("button");
        dot.classList.add("carousel-dot");
        if (idx === 0) dot.classList.add("active");
        dot.setAttribute("aria-label", `Navigate to slide ${idx + 1}`);
        dot.addEventListener("click", () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".carousel-dot");

    function goToSlide(index) {
        slides[currentIndex].classList.remove("active");
        dots[currentIndex].classList.remove("active");
        currentIndex = index;
        slides[currentIndex].classList.add("active");
        dots[currentIndex].classList.add("active");
    }

    // Auto-cycle configuration execution
    setInterval(() => {
        let nextIdx = (currentIndex + 1) % slides.length;
        goToSlide(nextIdx);
    }, 6000);
}

// 10. Generic Accordion Component Engine
function initAccordions() {
    const panels = document.querySelectorAll(".attraction-panel, .faq-node");
    panels.forEach(panel => {
        const trigger = panel.querySelector(".attraction-header, .faq-trigger-btn");
        if (trigger) {
            trigger.addEventListener("click", () => {
                const isActive = panel.classList.contains("active");
                // Reset parent container nodes if single display is required natively
                panel.parentNode.querySelectorAll(".active").forEach(activeNode => {
                    activeNode.classList.remove("active");
                });
                if (!isActive) {
                    panel.classList.add("active");
                }
            });
        }
    });
}

// 11. Luxury Interface Styling Engine (Dark/Light Context)
function initThemeEngine() {
    const toggle = document.getElementById("theme-toggle-btn");
    if (!toggle) return;

    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    toggle.addEventListener("click", () => {
        const activeTheme = document.documentElement.getAttribute("data-theme");
        const targetTheme = activeTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", targetTheme);
        localStorage.setItem("theme", targetTheme);
        updateThemeIcon(targetTheme);
    });

    function updateThemeIcon(theme) {
        toggle.innerHTML = theme === "dark" ? "☀️" : "🌙";
    }
}

// 12. Asynchronous Form Engine and Validations
function initContactFormEngine() {
    const form = document.getElementById("camp-alpha-booking-form");
    const modal = document.getElementById("success-modal");
    const closeBtn = document.getElementById("modal-close-btn");

    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // Comprehensive Field Evaluations 
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        
        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                if (modal) modal.classList.add("active");
                form.reset();
            } else {
                alert("An operational unexpected event occurred. Please initiate direct communications via WhatsApp.");
            }
        })
        .catch(() => {
            alert("Network pipeline transmission failure. Kindly use direct channels.");
        });
    });

    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => modal.classList.remove("active"));
    }
}

// 13. High-Fidelity Custom Floating Cursor Systems
function initCustomCursor() {
    const cursor = document.getElementById("custom-cursor");
    const backdrop = document.getElementById("custom-cursor-backdrop");

    if (!cursor || !backdrop || window.innerWidth <= 1024) return;

    window.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
        
        backdrop.animate({
            left: e.clientX + "px",
            top: e.clientY + "px"
        }, { duration: 500, fill: "forwards" });
    });

    // Hover interactive state augmentations
    document.querySelectorAll("a, button, .gallery-item").forEach(el => {
        el.addEventListener("mouseenter", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
            backdrop.style.transform = "translate(-50%, -50%) scale(0)";
        });
        el.addEventListener("mouseleave", () => {
            cursor.style.transform = "translate(-50%, -50%) scale(1)";
            backdrop.style.transform = "translate(-50%, -50%) scale(1)";
        });
    });
}

// 14. Performance Privacy Tracking Context Bar
function initCookieConsent() {
    const banner = document.getElementById("cookie-consent-banner");
    const acceptBtn = document.getElementById("cookie-accept-btn");

    if (!banner || !acceptBtn) return;

    if (!localStorage.getItem("cookie-consent-approved")) {
        setTimeout(() => banner.classList.add("active"), 2000);
    }

    acceptBtn.addEventListener("click", () => {
        localStorage.setItem("cookie-consent-approved", "true");
        banner.classList.remove("active");
    });
}

// 15. Smooth Back-To-Top Control Engine
function initBackToTop() {
    const topBtn = document.getElementById("back-to-top-btn");
    if (!topBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            topBtn.classList.add("visible");
        } else {
            topBtn.classList.remove("visible");
        }
    });
}
