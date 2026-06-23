/**
 * Main JavaScript file for Andy Wong's Portfolio
 * Handles mobile menu, scroll spy, and certifications filter.
 * Language switching is handled via separate directories (/en/, /hk/, /cn/).
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio successfully loaded.');
    
    // Prevent horizontal overscroll on mobile devices
    let touchStartX = 0;
    let touchStartY = 0; 
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX;
        touchStartY = e.touches[0].pageY; 
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
        const deltaX = Math.abs(e.touches[0].pageX - touchStartX);
        const deltaY = Math.abs(e.touches[0].pageY - touchStartY); 
        // If primarily horizontal swipe, prevent it
        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
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
        // Debounced search for better performance
        let debounceTimer;
        const debouncedFilter = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(filterCertifications, 150);
        };
        
        certSearch.addEventListener('keyup', debouncedFilter);
        certSearch.addEventListener('input', debouncedFilter);
        // Allow clearing with Escape key
        certSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                certSearch.value = '';
                filterCertifications();
            }
        });

        // Initialize count on page load
        filterCertifications();
    }

    function filterCertifications() {
        const searchInput = document.getElementById('certSearch');
        if (!searchInput) return;
        
        const searchTerm = searchInput.value.toLowerCase().trim();
        const certCards = document.querySelectorAll('.cert-card');
        let visibleCount = 0;

        certCards.forEach(card => {
            const certData = card.getAttribute('data-cert');
            if (!certData) {
                card.classList.remove('hidden');
                visibleCount++;
                return;
            }
            
            const cardTitleEl = card.querySelector('h3');
            const cardIssuerEl = card.querySelector('p');
            const cardTitle = cardTitleEl ? cardTitleEl.textContent.toLowerCase() : '';
            const cardIssuer = cardIssuerEl ? cardIssuerEl.textContent.toLowerCase() : '';
            const cardSkills = card.querySelectorAll('.skill-tag');
            let skillsText = '';
            cardSkills.forEach(skill => {
                skillsText += skill.textContent.toLowerCase() + ' ';
            });

            // Search in title, issuer, skills, and data-cert attribute
            const searchableText = cardTitle + ' ' + cardIssuer + ' ' + skillsText + ' ' + certData.toLowerCase();
            
            if (searchTerm === '' || searchableText.includes(searchTerm)) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });

        // Update cert count with aria-live for accessibility
        const certCount = document.getElementById('certCount');
        if (certCount) {
            certCount.textContent = visibleCount;
            // Update aria-live region for screen readers
            const certFilterInfo = document.querySelector('.cert-filter-info');
            if (certFilterInfo && searchTerm !== '') {
                certFilterInfo.setAttribute('aria-live', 'polite');
            }
        }
    }
});