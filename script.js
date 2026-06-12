// 1. Data Matrix for Excerpt Drawer
const excerptDatabase = {
    fluff: {
        title: "Ball of Fluff",
        paragraphs: [
            "The ambient fluorescent hum of the pet store felt small against the backdrop of the quiet city outside. He walked past rows of glass terrariums, his breath catching slightly behind his mask.",
            "Then he saw it—a small, dynamic ball of gray fluff sitting resolutely in the corner of an oversized cage. The cat didn't meow; it just stared back with deep amber eyes.",
            "\"He doesn't like most people,\" the store associate noted quietly. But as David reached out, a tiny paw met the glass cleanly."
        ]
    },
    storyteller: {
        title: "Storyteller",
        paragraphs: [
            "Ink bleeds out across the crisp white lines of a notebook pad, catching the shadows left behind by sleepless nights.",
            "To build an architectural palace inside an unstable mind requires a foundation built entirely on unfiltered truth. Every phrase is a mirror; every cadence is a step toward dynamic resilience.",
            "We are all just narrators chasing an elusive light through the crowded grid of memory lines."
        ]
    },
    frat: {
        title: "Frat Boy",
        paragraphs: [
            "Jared adjusted the collar of his fraternity crest polo shirt, checking his reflection in the mirrored glass of the student union lobby. Status was security.",
            "But standing at the edge of the campus protest square, watching Monica Rodriguez speak fiercely without notes, the old security rules felt strangely fragile.",
            "She looked directly into the crowd, and for a fleeting, unstable moment, her gaze locked right onto his. The system suddenly looked entirely different from the inside out."
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Custom Cursor Physics (Desktop Only)
    const dot = document.querySelector('.cursor-dot');
    const outline = document.querySelector('.cursor-outline');
    const hoverTargets = document.querySelectorAll('.hover-target');

    if (window.matchMedia("(pointer: fine)").matches && dot && outline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;
            // Add a slight delay to the outline for a fluid dragging effect
            outline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
        });

        hoverTargets.forEach(target => {
            target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hovering'));
            target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hovering'));
        });
    }

    // 3. Magnetic Button Effect
    const magneticBtns = document.querySelectorAll('.magnetic');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px) scale(1)`;
        });
    });

    // 4. 3D Tilt Hover Effect for Cards
    const tiltElements = document.querySelectorAll('.interactive-tilt');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
        });
    });

    // 5. 3D Hero Deck Mouse Parallax
    const heroDeck = document.getElementById('heroDeck');
    if (heroDeck) {
        window.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.clientX) / 50;
            const y = (window.innerHeight / 2 - e.clientY) / 50;
            heroDeck.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
        });
    }

    // 6. Interactive Excerpt Drawer
    const initializeExcerptDrawer = () => {
        const deckCards = document.querySelectorAll('.deck-card');
        const overlayDrawer = document.getElementById('excerptDrawer');
        const closeDrawerBtn = document.querySelector('.close-drawer');
        const drawerBody = document.getElementById('excerptBody');

        deckCards.forEach(card => {
            card.addEventListener('click', () => {
                const bookKey = card.getAttribute('data-book');
                const dataObj = excerptDatabase[bookKey];
                if (dataObj) {
                    drawerBody.innerHTML = `
                        <h3>${dataObj.title}</h3>
                        ${dataObj.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    `;
                    overlayDrawer.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });

        const closeDrawerAction = () => {
            overlayDrawer.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawerAction);
        if (overlayDrawer) {
            overlayDrawer.addEventListener('click', (e) => {
                if (e.target === overlayDrawer) closeDrawerAction();
            });
        }
    };

    // 7. Event Timeline Automation
    const evaluateTimelineDates = () => {
        const liveEvents = document.querySelectorAll('.timeline-card.live-event');
        const pastSection = document.getElementById('pastSection');
        const systemTime = new Date();

        liveEvents.forEach(eventCard => {
            const rawTargetDate = eventCard.getAttribute('data-event-date');
            if (rawTargetDate) {
                const eventTime = new Date(rawTargetDate + 'T23:59:59');
                if (systemTime > eventTime) {
                    eventCard.classList.replace('live-event', 'past-event');
                    const badge = eventCard.querySelector('.badge-live');
                    if (badge) badge.remove();
                    if (pastSection) pastSection.appendChild(eventCard);
                }
            }
        });
    };

    // 8. Smooth Reveal Observer
    const initializeScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('[data-fade]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            observer.observe(el);
        });
    };

    evaluateTimelineDates();
    initializeExcerptDrawer();
    initializeScrollAnimations();
});