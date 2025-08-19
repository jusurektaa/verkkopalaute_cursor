// Mobiilivalikon avaus/sulku
const menuIcon = document.getElementById('menuIcon');
const navLinks = document.getElementById('navLinks');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Sulje mobiilivalikko kun klikataan linkkiä
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Yhteydenottolomakkeen käsittely
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Näytä latausviesti
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Lähetetään...';
    submitButton.disabled = true;
    
    // Simuloi lähetys (oikeassa sovelluksessa tässä olisi API-kutsu)
    setTimeout(() => {
        formMessage.textContent = 'Kiitos viestistäsi! Otamme yhteyttä mahdollisimman pian.';
        formMessage.style.display = 'block';
        contactForm.reset();
        
        // Palauta nappi alkuperäiseen tilaan
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Piilota viesti 5 sekunnin jälkeen
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }, 1500);
});

// Pehmeä vieritys linkeille
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbarin taustan muutos vierityksen yhteydessä
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Animoidut numerot hinnat-osioon
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Tarkkaile hinta-kortteja
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Tarkkaile ominaisuus-kortteja
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
}); 