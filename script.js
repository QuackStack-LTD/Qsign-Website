/* ================================================
   QSIGN — INTERACTIVE SCRIPTS
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------
    // 1. NAVBAR SCROLL EFFECT
    // ----------------------------------------
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    const handleNavScroll = () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ----------------------------------------
    // 2. MOBILE NAV TOGGLE
    // ----------------------------------------
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // ----------------------------------------
    // 3. SCROLL REVEAL ANIMATIONS
    // ----------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay based on sibling index
                const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
                let siblingIndex = 0;
                siblings.forEach((sib, i) => {
                    if (sib === entry.target) siblingIndex = i;
                });

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, siblingIndex * 80);

                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        scrollObserver.observe(el);
    });

    // ----------------------------------------
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // ----------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = navbar.offsetHeight;
                const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
                window.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ----------------------------------------
    // 5. ACTIVE NAV LINK TRACKING
    // ----------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link:not(.nav-link-cta)');

    const updateActiveNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.style.color = 'var(--accent-blue)';
                    } else {
                        link.style.color = '';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });

    // ----------------------------------------
    // 6. PARALLAX EFFECT ON HERO SVG
    // ----------------------------------------
    const heroVisual = document.querySelector('.hero-doc-container');

    if (heroVisual && window.innerWidth > 768) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 12;
            const y = (e.clientY / window.innerHeight - 0.5) * 12;
            heroVisual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
        });
    }

    // ----------------------------------------
    // 7. COUNTER ANIMATION ON COMPLIANCE BADGES
    // ----------------------------------------
    const counterBadge = document.querySelector('.compliance-badge strong');
    // Simple entrance — already handled by scroll observer

    // ----------------------------------------
    // 8. FEATURE CARD HOVER GLOW TRACKING
    // ----------------------------------------
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--glow-x', `${x}px`);
            card.style.setProperty('--glow-y', `${y}px`);
        });
    });

});
