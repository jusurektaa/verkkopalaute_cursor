// Dripnord lomakesivun toiminnallisuus - identtinen Verkkopalaute-kyselyn kanssa

// Arvosananappien toiminta
function initRatingButtons() {
    const ratingButtons = document.querySelectorAll('.rating-btn');
    const ratingInput = document.getElementById('rating');
    
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            
            // Poista valinta kaikilta napeilta
            ratingButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Lisää valinta klikatulle napille
            this.classList.add('selected');
            
            // Aseta arvosana piilotettuun kenttään
            ratingInput.value = rating;
            
            // Näytä valittu arvosana
            showRatingFeedback(rating);
        });
    });
}

// Näytä arvosanan palaute
function showRatingFeedback(rating) {
    const ratingLabels = document.querySelector('.rating-labels');
    
    // Poista vanhat palauteviestit
    const existingFeedback = ratingLabels.querySelector('.rating-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Lisää uusi palauteviesti
    const feedback = document.createElement('div');
    feedback.className = 'rating-feedback';
    feedback.style.cssText = 'text-align: center; margin-top: 0.5rem; font-weight: 600; color: #007bff;';
    
    let feedbackText = '';
    if (rating >= 9) {
        feedbackText = '🎉 Erinomainen!';
        feedback.style.color = '#28a745';
    } else if (rating >= 7) {
        feedbackText = '👍 Hyvä!';
        feedback.style.color = '#17a2b8';
    } else if (rating >= 5) {
        feedbackText = '😐 Keskinkertainen';
        feedback.style.color = '#ffc107';
    } else if (rating >= 3) {
        feedbackText = '😕 Huono';
        feedback.style.color = '#fd7e14';
    } else {
        feedbackText = '😞 Erittäin huono';
        feedback.style.color = '#dc3545';
    }
    
    feedback.textContent = feedbackText;
    ratingLabels.appendChild(feedback);
}

// Lomakkeen lähetys
function initFeedbackForm() {
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackMessage = document.getElementById('feedbackMessage');
    
    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Tarkista onko arvosana valittu
        const rating = document.getElementById('rating').value;
        if (!rating) {
            showMessage('Valitse arvosana ennen lähettämistä.', 'error');
            return;
        }
        
        // Kerää lomakkeen tiedot
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            rating: parseInt(rating),
            message: document.getElementById('message').value,
            date: new Date().toISOString().split('T')[0],
            status: 'new'
        };
        
        // Näytä latausviesti
        const submitButton = this.querySelector('.btn-submit');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Lähetetään...';
        submitButton.disabled = true;
        
        // Tallenna palaute localStorageen
        try {
            const savedFeedback = saveFeedback(formData);
            
            // Näytä onnistumisviesti
            showMessage('Kiitos palautteestasi! Ohjataan kiitos-sivulle...', 'success');
            
            // Ohjaa kiitos-sivulle 2 sekunnin jälkeen
            setTimeout(() => {
                window.location.href = `kiitos.html?id=${savedFeedback.id}`;
            }, 2000);
        } catch (error) {
            console.error('Virhe palautteen tallennuksessa:', error);
            showMessage('Virhe palautteen tallennuksessa. Yritä uudelleen.', 'error');
            
            // Palauta nappi alkuperäiseen tilaan
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Tallenna palaute localStorageen
function saveFeedback(feedback) {
    // Hae olemassa olevat palautteet
    let existingFeedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
    
    // Lisää uusi palaute
    feedback.id = Date.now(); // Yksinkertainen ID
    existingFeedback.push(feedback);
    
    // Tallenna takaisin localStorageen
    localStorage.setItem('dripnord_feedback', JSON.stringify(existingFeedback));
    
    console.log('Palaute tallennettu:', feedback);
    
    // Palauta tallennettu palaute
    return feedback;
}

// Näytä viesti käyttäjälle
function showMessage(message, type) {
    const feedbackMessage = document.getElementById('feedbackMessage');
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message ${type}`;
    feedbackMessage.style.display = 'block';
}

// Tarkista lomakkeen validiteetti reaaliajassa
function initFormValidation() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const ratingInput = document.getElementById('rating');
    
    // Nimen validointi
    nameInput.addEventListener('input', function() {
        if (this.value.length < 2) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
    
    // Sähköpostin validointi
    emailInput.addEventListener('input', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.value)) {
            this.style.borderColor = '#dc3545';
        } else {
            this.style.borderColor = '#e9ecef';
        }
    });
    
    // Arvosanan validointi
    ratingInput.addEventListener('change', function() {
        if (this.value) {
            document.querySelector('.rating-group').style.borderColor = '#e9ecef';
        } else {
            document.querySelector('.rating-group').style.borderColor = '#dc3545';
        }
    });
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

// Sivun latauksen yhteydessä
document.addEventListener('DOMContentLoaded', function() {
    initRatingButtons();
    initFeedbackForm();
    initFormValidation();
    initMobileMenu();
    initSmoothScrolling();
    
    // Lisää CSS-tyylit arvosanan palauteviesteille
    const style = document.createElement('style');
    style.textContent = `
        .rating-feedback {
            animation: fadeIn 0.3s ease-in;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Näytä tallennetut palautteet konsolissa (debug-tarkoituksessa)
function showStoredFeedback() {
    const feedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
    console.log('Tallennetut palautteet:', feedback);
    return feedback;
}

// Varmista että palautteet tallentuvat oikein
window.addEventListener('beforeunload', function() {
    const feedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
    console.log('Sivun sulkemisen yhteydessä tallennetut palautteet:', feedback);
});
