// Kiitos-sivun toiminnallisuus

// Näytä palautteen yhteenveto
function displayFeedbackSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const feedbackId = urlParams.get('id');
    const formType = urlParams.get('form') || 'verkkopalaute';
    
    if (!feedbackId) {
        document.getElementById('feedbackSummary').style.display = 'none';
        return;
    }
    
    let feedbackData;
    
    if (formType === 'dripnord') {
        // Hae Dripnord palaute
        const dripnordFeedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
        feedbackData = dripnordFeedback.find(item => item.id == feedbackId);
        
        // Päivitä otsikko
        document.querySelector('.thank-you-content h1').textContent = 'Kiitos palautteestasi, Dripnord!';
        document.querySelector('.thank-you-content p').textContent = 'Arvostamme palautettasi ja käytämme sitä palveluidemme kehittämiseen.';
        
    } else {
        // Hae Verkkopalaute palaute
        const verkkopalauteFeedback = JSON.parse(localStorage.getItem('feedback') || '[]');
        feedbackData = verkkopalauteFeedback.find(item => item.id == feedbackId);
    }
    
    if (feedbackData) {
        // Näytä palautteen tiedot
        document.getElementById('feedbackName').textContent = feedbackData.name;
        document.getElementById('feedbackEmail').textContent = feedbackData.email;
        document.getElementById('feedbackCompany').textContent = feedbackData.company || 'Ei määritelty';
        document.getElementById('feedbackRating').textContent = feedbackData.rating + '/10';
        document.getElementById('feedbackMessage').textContent = feedbackData.message;
        document.getElementById('feedbackDate').textContent = new Date(feedbackData.timestamp).toLocaleDateString('fi-FI');
        
        // Näytä palautteen yhteenveto
        document.getElementById('feedbackSummary').style.display = 'block';
    } else {
        document.getElementById('feedbackSummary').style.display = 'none';
    }
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
    displayFeedbackSummary();
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