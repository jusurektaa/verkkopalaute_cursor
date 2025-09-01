// Dripnord-palaute-lomakkeen toiminnallisuus
document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const ratingButtons = document.querySelectorAll('.rating-btn');
    const ratingInput = document.getElementById('rating');
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Arvosanan valinta
    ratingButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Poista aktiivinen luokka kaikilta napeilta
            ratingButtons.forEach(btn => btn.classList.remove('active'));
            
            // Lisää aktiivinen luokka klikatulle napille
            this.classList.add('active');
            
            // Aseta arvosana piilotettuun kenttään
            ratingInput.value = this.dataset.rating;
        });
    });

    // Lomakkeen lähetys
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Tarkista että arvosana on valittu
        if (!ratingInput.value) {
            showMessage('Valitse arvosana ennen lomakkeen lähettämistä.', 'error');
            return;
        }

        // Kerää lomakkeen tiedot
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            rating: parseInt(ratingInput.value),
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString(),
            source: 'dripnord'
        };

        // Tallenna palaute Firebaseen
        try {
            // Lisää lähdetyyppi
            formData.source = 'dripnord';
            formData.timestamp = new Date().toISOString();
            
            const result = await FirebaseService.saveFeedback(formData);
            
            if (result.success) {
                // Näytä viesti
                showMessage('Kiitos palautteestasi! Sinut ohjataan kiitos-sivulle.', 'success');
                
                // Ohjaa kiitos-sivulle
                setTimeout(() => {
                    window.location.href = 'dripnord-thanks.html?id=' + encodeURIComponent(JSON.stringify(formData));
                }, 2000);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.error('Virhe palautteen tallennuksessa:', error);
            showMessage('Virhe palautteen tallennuksessa. Yritä uudelleen.', 'error');
        }
    });

    // Tallenna palaute localStorageen
    function saveFeedback(feedback) {
        let existingFeedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
        existingFeedback.push(feedback);
        localStorage.setItem('dripnord_feedback', JSON.stringify(existingFeedback));
    }

    // Näytä viesti
    function showMessage(message, type) {
        feedbackMessage.textContent = message;
        feedbackMessage.className = 'feedback-message ' + type;
        feedbackMessage.style.display = 'block';
    }
});
