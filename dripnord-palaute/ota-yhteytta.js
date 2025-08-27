// Contact form functionality
const contactForm = document.getElementById('contactForm');
const submitBtn = document.querySelector('.submit-btn');

// Handle contact form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString(),
        id: generateId()
    };
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    // Simulate form submission delay
    setTimeout(() => {
        // Save contact message to localStorage
        saveContactMessage(formData);
        
        // Show success message
        showMessage('Kiitos viestistäsi! Otamme sinuun yhteyttä pian.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Hide loading state
        setLoadingState(false);
        
        // Scroll to top to show success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
});

// Validate contact form
function validateContactForm(data) {
    // Remove existing error messages
    removeErrorMessages();
    
    let isValid = true;
    
    if (!data.firstName) {
        showError('firstName', 'Etunimi on pakollinen');
        isValid = false;
    }
    
    if (!data.lastName) {
        showError('lastName', 'Sukunimi on pakollinen');
        isValid = false;
    }
    
    if (!data.email) {
        showError('email', 'Sähköposti on pakollinen');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('email', 'Syötä kelvollinen sähköpostiosoite');
        isValid = false;
    }
    
    if (!data.subject) {
        showError('subject', 'Valitse aihe');
        isValid = false;
    }
    
    if (!data.message) {
        showError('message', 'Viesti on pakollinen');
        isValid = false;
    } else if (data.message.length < 10) {
        showError('message', 'Viestin tulee olla vähintään 10 merkkiä pitkä');
        isValid = false;
    }
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    // Insert error message after the field
    field.parentNode.appendChild(errorDiv);
    
    // Add error styling to field
    field.style.borderColor = '#dc3545';
}

// Show success/error message
function showMessage(message, type) {
    // Remove existing messages
    removeMessages();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    // Insert message before the form
    contactForm.parentNode.insertBefore(messageDiv, contactForm);
}

// Remove all error messages
function removeErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
    
    // Remove error styling from fields
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.style.borderColor = '#e9ecef';
    });
}

// Remove all messages
function removeMessages() {
    const messages = document.querySelectorAll('.success-message, .error-message');
    messages.forEach(msg => msg.remove());
}

// Set loading state
function setLoadingState(isLoading) {
    if (isLoading) {
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Lähetetään...';
        submitBtn.disabled = true;
    } else {
        submitBtn.classList.remove('loading');
        submitBtn.textContent = 'Lähetä viesti';
        submitBtn.disabled = false;
    }
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Save contact message to localStorage
function saveContactMessage(message) {
    // Get existing messages or create empty array
    const existingMessages = JSON.parse(localStorage.getItem('dripnordContactMessages') || '[]');
    
    // Add new message
    existingMessages.push(message);
    
    // Save back to localStorage
    localStorage.setItem('dripnordContactMessages', JSON.stringify(existingMessages));
}

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Focus on first name field when page loads
    document.getElementById('firstName').focus();
    
    // Add form field focus effects
    const formFields = document.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
            // Remove error styling on focus
            this.style.borderColor = '#1e3c72';
        });
        
        field.addEventListener('blur', function() {
            this.parentNode.classList.remove('focused');
        });
    });
    
    // Add enter key support for form submission
    formFields.forEach(field => {
        field.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                contactForm.dispatchEvent(new Event('submit'));
            }
        });
    });
    
    // Add character counter for message field
    const messageField = document.getElementById('message');
    const messageCounter = document.createElement('div');
    messageCounter.className = 'char-counter';
    messageCounter.style.cssText = 'text-align: right; font-size: 0.8rem; color: #666; margin-top: 0.5rem;';
    messageField.parentNode.appendChild(messageCounter);
    
    function updateCharCounter() {
        const currentLength = messageField.value.length;
        const minLength = 10;
        const remaining = minLength - currentLength;
        
        if (remaining > 0) {
            messageCounter.textContent = `${remaining} merkkiä jäljellä (minimi: ${minLength})`;
            messageCounter.style.color = '#dc3545';
        } else {
            messageCounter.textContent = `${currentLength} merkkiä`;
            messageCounter.style.color = '#28a745';
        }
    }
    
    messageField.addEventListener('input', updateCharCounter);
    updateCharCounter(); // Initial count
});

// Add some CSS for focus effects and loading state
const style = document.createElement('style');
style.textContent = `
    .form-group.focused label {
        color: #1e3c72;
        transform: translateY(-2px);
        transition: all 0.3s ease;
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: #1e3c72;
        box-shadow: 0 0 0 3px rgba(30, 60, 114, 0.1);
    }
    
    .form-group {
        transition: all 0.3s ease;
    }
    
    .form-group label {
        transition: all 0.3s ease;
    }
    
    .submit-btn.loading {
        background: #6c757d;
        cursor: not-allowed;
        position: relative;
    }
    
    .submit-btn.loading::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        top: 50%;
        left: 50%;
        margin-left: -10px;
        margin-top: -10px;
        border: 2px solid transparent;
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .char-counter {
        font-size: 0.8rem;
        color: #666;
        margin-top: 0.5rem;
        text-align: right;
        transition: color 0.3s ease;
    }
`;
document.head.appendChild(style);

