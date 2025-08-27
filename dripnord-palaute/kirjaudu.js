// Dripnord Admin kirjautumisen logiikka
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    
    // Tarkista onko käyttäjä jo kirjautunut
    if (sessionStorage.getItem('dripnordLoggedIn') === 'true') {
        window.location.href = 'admin.html';
        return;
    }
    
    // Tarkista muistetut tunnukset
    const rememberedEmail = localStorage.getItem('dripnordRememberedEmail');
    if (rememberedEmail) {
        emailInput.value = rememberedEmail;
        rememberCheckbox.checked = true;
    }
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validoi lomake
        if (!validateForm(email, password)) {
            return;
        }
        
        // Tarkista tunnukset
        if (authenticateUser(email, password)) {
            // Kirjaudu sisään
            loginUser(email, rememberCheckbox.checked);
        } else {
            showError('Virheellinen sähköposti tai salasana');
        }
    });
    
    // Lomakkeen validointi
    function validateForm(email, password) {
        if (!email) {
            showError('Syötä sähköpostiosoite');
            return false;
        }
        
        if (!isValidEmail(email)) {
            showError('Syötä kelvollinen sähköpostiosoite');
            return false;
        }
        
        if (!password) {
            showError('Syötä salasana');
            return false;
        }
        
        return true;
    }
    
    // Sähköpostin validointi
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Käyttäjän autentikointi
    function authenticateUser(email, password) {
        // Dripnord admin-tunnukset
        const validCredentials = {
            'admin@dripnord.fi': 'dripnord123'
        };
        
        return validCredentials[email] === password;
    }
    
    // Kirjaa käyttäjä sisään
    function loginUser(email, remember) {
        // Tallenna kirjautumistila
        sessionStorage.setItem('dripnordLoggedIn', 'true');
        sessionStorage.setItem('dripnordUser', email);
        
        if (remember) {
            localStorage.setItem('dripnordRememberedEmail', email);
        } else {
            localStorage.removeItem('dripnordRememberedEmail');
        }
        
        // Ohjaa admin-paneeliin
        window.location.href = 'admin.html';
    }
    
    // Näytä virheviesti
    function showError(message) {
        // Poista vanhat virheviestit
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Luo uusi virheviesti
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Lisää virheviesti lomakkeen alkuun
        loginForm.insertBefore(errorDiv, loginForm.firstChild);
        
        // Poista virheviesti 5 sekunnin kuluttua
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Lisää loading-tila lomakkeelle
    loginForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('.btn-login');
        submitBtn.textContent = 'Kirjaudutaan...';
        submitBtn.disabled = true;
        
        // Palauta nappi normaaliksi 3 sekunnin kuluttua (jos kirjautuminen epäonnistuu)
        setTimeout(() => {
            submitBtn.textContent = 'Kirjaudu sisään';
            submitBtn.disabled = false;
        }, 3000);
    });
});
