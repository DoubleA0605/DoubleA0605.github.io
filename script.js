/**
 * Main JavaScript file for Andy Wong's Portfolio
 * Currently handles basic initialization.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio successfully loaded.');
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!expanded));
            navMenu.classList.toggle('open');
            navToggle.classList.toggle('open');
        });
    }

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            navMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }));

    // Scroll spy - highlight active section link
    const sections = document.querySelectorAll('section[id]');
    function onScroll() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            const id = sec.getAttribute('id');
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollPos >= top && scrollPos < bottom) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Certification search and filter functionality
    const certSearch = document.getElementById('certSearch');
    if (certSearch) {
        certSearch.addEventListener('keyup', () => {
            filterCertifications();
        });

        // Also trigger on input for better mobile support
        certSearch.addEventListener('input', () => {
            filterCertifications();
        });
    }

    function filterCertifications() {
        const searchInput = document.getElementById('certSearch');
        const searchTerm = searchInput.value.toLowerCase().trim();
        const certCards = document.querySelectorAll('.cert-card');
        let visibleCount = 0;

        certCards.forEach(card => {
            const certData = card.getAttribute('data-cert').toLowerCase();
            const cardTitle = card.querySelector('h3').textContent.toLowerCase();
            const cardIssuer = card.querySelector('p').textContent.toLowerCase();
            const cardSkills = card.querySelectorAll('.skill-tag');
            let skillsText = '';
            cardSkills.forEach(skill => {
                skillsText += skill.textContent.toLowerCase() + ' ';
            });

            // Search in title, issuer, skills, and data-cert attribute
            const searchableText = cardTitle + ' ' + cardIssuer + ' ' + skillsText + ' ' + certData;
            
            if (searchableText.includes(searchTerm) || searchTerm === '') {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update cert count
        const certCount = document.getElementById('certCount');
        if (certCount) {
            certCount.textContent = visibleCount;
        }
    }
});