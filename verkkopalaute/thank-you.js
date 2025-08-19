// Kiitos-sivun toiminnallisuus

// Näytä palautteen yhteenveto
function loadFeedbackSummary() {
    const feedbackSummary = document.getElementById('feedbackSummary');
    
    // Hae palaute URL-parametreista tai session storagesta
    const urlParams = new URLSearchParams(window.location.search);
    const feedbackId = urlParams.get('id');
    
    if (feedbackId) {
        // Jos on ID URL:ssa, hae palaute localStorageesta
        const storedFeedback = JSON.parse(localStorage.getItem('verkkopalaute_feedback') || '[]');
        const feedback = storedFeedback.find(f => f.id == feedbackId);
        
        if (feedback) {
            displayFeedbackSummary(feedback);
        } else {
            showGenericThankYou();
        }
    } else {
        // Jos ei ole ID:tä, näytä yleinen kiitos
        showGenericThankYou();
    }
}

// Näytä palautteen yhteenveto
function displayFeedbackSummary(feedback) {
    const feedbackSummary = document.getElementById('feedbackSummary');
    
    feedbackSummary.innerHTML = `
        <h3>Palautteesi yhteenveto</h3>
        <div class="feedback-detail">
            <strong>Nimi:</strong>
            <span>${feedback.name}</span>
        </div>
        <div class="feedback-detail">
            <strong>Sähköposti:</strong>
            <span>${feedback.email}</span>
        </div>
        <div class="feedback-detail">
            <strong>Yritys:</strong>
            <span>${feedback.company || 'Ei määritelty'}</span>
        </div>
        <div class="feedback-detail">
            <strong>Arvosana:</strong>
            <div class="rating-display">
                <span class="rating-stars">${'⭐'.repeat(feedback.rating)}</span>
                <span class="rating-number">${feedback.rating}/10</span>
            </div>
        </div>
        ${feedback.message ? `
        <div class="feedback-detail">
            <strong>Lisätietoja:</strong>
            <span>${feedback.message}</span>
        </div>
        ` : ''}
        <div class="feedback-detail">
            <strong>Päivämäärä:</strong>
            <span>${formatDate(feedback.date)}</span>
        </div>
    `;
}

// Näytä yleinen kiitos ilman palautteen tietoja
function showGenericThankYou() {
    const feedbackSummary = document.getElementById('feedbackSummary');
    
    feedbackSummary.innerHTML = `
        <h3>Palautteesi on vastaanotettu</h3>
        <p>Kiitos että otit aikaa antaa palautetta palvelustamme. Vastauksesi on tallennettu ja tiimimme käsittelee sen huolellisesti.</p>
    `;
}



// Mobiilivalikon toiminta
function initMobileMenu() {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.querySelector('.nav-links');
    
    menuIcon.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
    
    // Sulje mobiilivalikko kun klikataan linkkiä
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Pehmeä vieritys sisäisiin linkkeihin
function initSmoothScrolling() {
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
}

// Apufunktiot
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Tarkista onko sivu avattu mobiililaitteella
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Lisää mobiilioptimointeja
function addMobileOptimizations() {
    if (isMobileDevice()) {
        // Lisää mobiilioptimointeja tarvittaessa
        console.log('Mobiililaitteella avattu');
    }
}

// Sivun latauksen yhteydessä
document.addEventListener('DOMContentLoaded', function() {
    loadFeedbackSummary();
    initMobileMenu();
    initSmoothScrolling();
    addMobileOptimizations();
    
    // Lisää CSS-tyylit mobiilioptimointeihin
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .thank-you-card {
                margin: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
});

// Näytä tallennetut palautteet konsolissa (debug-tarkoituksessa)
function showStoredFeedback() {
    const feedback = JSON.parse(localStorage.getItem('verkkopalaute_feedback') || '[]');
    console.log('Tallennetut palautteet:', feedback);
    return feedback;
}

// Varmista että palautteet tallentuvat oikein
window.addEventListener('beforeunload', function() {
    const feedback = JSON.parse(localStorage.getItem('verkkopalaute_feedback') || '[]');
    console.log('Sivun sulkemisen yhteydessä tallennetut palautteet:', feedback);
}); 