
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const menuToggle = document.querySelector('.menu-toggle');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');

        const isOpen = nav.classList.contains('active');
        menuToggle.textContent = isOpen ? '✕' : '☰';
        menuToggle.setAttribute('aria-expanded', isOpen);
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');

        if (!targetId || !targetId.startsWith('#')) return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            e.preventDefault();

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            nav.classList.remove('active');

            if (menuToggle) {
                menuToggle.textContent = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }

            // Update active link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });

            this.classList.add('active');

            history.replaceState(null, '', targetId);
        }
    });
});

function updateActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop - 150 &&
            window.scrollY < sectionTop + sectionHeight - 150) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');

        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

const revealElements = document.querySelectorAll(
    '.home-content, .home-img, .heading, .project-card, .education-card, .about-content'
);

revealElements.forEach(element => {
    element.classList.add('reveal');
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach(element => {
    observer.observe(element);
});
