/**
 * David Alejandro - Modern Architectural Event Portfolio & Excerpt Matrix Engine
 */

// 1. Data Matrix Storage for Premium Dynamic Interactive Text-Excerpt Drawer Module
const excerptDatabase = {
    fluff: {
        title: "Ball of Fluff",
        sub: "Chapter Extract Preview",
        paragraphs: [
            "The ambient fluorescent hum of the pet store felt small against the backdrop of the quiet city outside. He walked past rows of glass terrariums, his breath catching slightly behind his mask.",
            "Then he saw it—a small, dynamic ball of gray fluff sitting resolutely in the corner of an oversized cage. The cat didn't meow; it just stared back with deep amber eyes that seemed to understand the heavy weight of isolation.",
            "\"He doesn't like most people,\" the store associate noted quietly from the aisle corridor. But as David reached out his hand, a tiny paw met the glass cleanly."
        ]
    },
    storyteller: {
        title: "Storyteller",
        sub: "Selected Poetic Stanzas",
        paragraphs: [
            "Ink bleeds out across the crisp white lines of a notebook pad, catching the shadows left behind by sleepless nights.",
            "To build an architectural palace inside an unstable mind requires a foundation built entirely on unfiltered truth. Every phrase is a mirror; every cadence is a step toward dynamic resilience.",
            "We are all just narrators chasing an elusive light through the crowded grid of memory lines."
        ]
    },
    frat: {
        title: "Frat Boy",
        sub: "Chapter 1 Opening Sequence",
        paragraphs: [
            "Jared adjusted the collar of his fraternity crest polo shirt, checking his reflection in the mirrored glass of the student union building lobby. Status was security. He had memorized that rule growing up watching his mother struggle.",
            "But standing at the edge of the campus protest square, watching Monica Rodriguez speak fiercely without notes, the old security rules felt strangely fragile.",
            "She looked directly into the crowd, and for a fleeting, unstable moment, her gaze locked right onto his. The system suddenly looked entirely different from the inside out."
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    
    // 2. Automated Event Timeline Archive Logic Engine
    const evaluateTimelineDates = () => {
        const liveEvents = document.querySelectorAll('.timeline-card.live-event');
        const pastSection = document.getElementById('pastSection');
        
        // Accurate real-time date evaluation wrapper instantiation
        const systemCurrentTime = new Date();

        liveEvents.forEach(eventCard => {
            const rawTargetDate = eventCard.getAttribute('data-event-date');
            if (rawTargetDate) {
                const eventTargetTime = new Date(rawTargetDate + 'T23:59:59');
                
                // Switch DOM positioning if event target timeframe has elapsed
                if (systemCurrentTime > eventTargetTime) {
                    eventCard.classList.remove('live-event');
                    eventCard.classList.add('past-event');
                    
                    // Strip modern upcoming display UI component items cleanly
                    const liveBadge = eventCard.querySelector('.badge-live');
                    if (liveBadge) liveBadge.remove();
                    
                    // Append beautifully down into historic archives pipeline
                    if (pastSection) {
                        pastSection.appendChild(eventCard);
                    }
                }
            }
        });
    };

    // 3. Interactive Reading Intro UI Controller Actions
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
                    // Inject beautiful markup arrays dynamically into viewport container
                    drawerBody.innerHTML = `
                        <h3>${dataObj.title}</h3>
                        <h5>${dataObj.sub}</h5>
                        ${dataObj.paragraphs.map(p => `<p>${p}</p>`).join('')}
                    `;
                    
                    // Activate structural interactive presentation display modes
                    overlayDrawer.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Lock background scrolling
                }
            });
        });

        // Interactive Interface Safe Closures Mapping
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

    // 4. Subtle Intersect Viewport Smooth Entrance Transition Animation Engine
    const initializeScrollAnimations = () => {
        const animatedElements = document.querySelectorAll('[data-fade]');
        
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    elementObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            // Setup static layout initial states safely before animation runs
            el.style.opacity = '0';
            el.style.transform = 'translateY(25px)';
            el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            elementObserver.observe(el);
        });
    };

    // Initialize all modular scripts sequentially
    evaluateTimelineDates();
    initializeExcerptDrawer();
    initializeScrollAnimations();
});