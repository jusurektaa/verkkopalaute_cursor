// Kirjautumislomakkeen käsittely
const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

// Demo-kirjautumistiedot (oikeassa sovelluksessa nämä olisivat tietokannassa)
const DEMO_CREDENTIALS = {
    'admin@verkkopalaute.fi': {
        password: 'admin123',
        adminType: 'verkkopalaute',
        redirectUrl: 'admin.html'
    },
    'admin@dripnord.fi': {
        password: 'dripnord123',
        adminType: 'dripnord',
        redirectUrl: 'dripnord-admin.html'
    }
};

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Näytä latausviesti
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Kirjaudutaan...';
    submitButton.disabled = true;
    
    // Simuloi kirjautumisen tarkistus (oikeassa sovelluksessa tässä olisi API-kutsu)
    setTimeout(() => {
        const userCredentials = DEMO_CREDENTIALS[email];
        
        if (userCredentials && password === userCredentials.password) {
            // Onnistunut kirjautuminen
            const adminType = userCredentials.adminType;
            const redirectUrl = userCredentials.redirectUrl;
            
            showMessage(`Kirjautuminen onnistui! Ohjataan ${adminType === 'verkkopalaute' ? 'Verkkopalaute' : 'Dripnord'}-hallintapaneeliin...`, 'success');
            
            // Tallenna kirjautumistiedot session storageen
            if (remember) {
                localStorage.setItem('rememberLogin', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('adminType', adminType);
            } else {
                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('adminType', adminType);
            }
            
            // Ohjaa oikeaan admin-hallintapaneeliin 2 sekunnin jälkeen
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000);
            
        } else {
            // Epäonnistunut kirjautuminen
            showMessage('Virheellinen sähköposti tai salasana. Yritä uudelleen.', 'error');
            
            // Palauta nappi alkuperäiseen tilaan
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 1500);
});

// Näytä viesti käyttäjälle
function showMessage(message, type) {
    loginMessage.textContent = message;
    loginMessage.className = `login-message ${type}`;
    loginMessage.style.display = 'block';
    
    // Piilota viesti 5 sekunnin jälkeen
    setTimeout(() => {
        loginMessage.style.display = 'none';
    }, 5000);
}

// Tarkista onko käyttäjä jo kirjautunut
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') || localStorage.getItem('rememberLogin');
    if (isLoggedIn) {
        const adminType = sessionStorage.getItem('adminType') || localStorage.getItem('adminType');
        const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
        
        if (adminType === 'verkkopalaute') {
            window.location.href = 'admin.html';
        } else if (adminType === 'dripnord') {
            window.location.href = 'dripnord-admin.html';
        }
    }
}

// Tarkista muista minut -valinta
function checkRememberMe() {
    const remembered = localStorage.getItem('rememberLogin');
    if (remembered) {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            document.getElementById('email').value = savedEmail;
            document.getElementById('remember').checked = true;
        }
    }
}

// Tarkista kirjautumistila sivun latauksen yhteydessä
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    checkRememberMe();
});

// Salasanan näyttäminen/piilottaminen (bonusominaisuus)
document.getElementById('password').addEventListener('input', function() {
    // Voi lisätä salasanan vahvuuden tarkistuksen tähän
});

// Enter-napin toiminta
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.tagName === 'INPUT' && activeElement.type !== 'checkbox') {
            const nextInput = activeElement.parentElement.nextElementSibling?.querySelector('input');
            if (nextInput) {
                nextInput.focus();
            } else {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    }
}); 