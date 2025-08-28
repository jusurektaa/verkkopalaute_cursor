// Dripnord kiitos-sivun toiminnallisuus
document.addEventListener('DOMContentLoaded', function() {
    // Hae palautteen tiedot URL-parametreista
    const urlParams = new URLSearchParams(window.location.search);
    const feedbackId = urlParams.get('id');
    
    if (feedbackId) {
        try {
            const feedback = JSON.parse(decodeURIComponent(feedbackId));
            displayFeedbackSummary(feedback);
        } catch (error) {
            console.error('Virhe palautteen tietojen lukemisessa:', error);
        }
    }
    
    // Näytä palautteen yhteenveto
    function displayFeedbackSummary(feedback) {
        const summaryElement = document.getElementById('feedbackSummary');
        
        if (summaryElement && feedback) {
            const ratingText = getRatingText(feedback.rating);
            const timestamp = new Date(feedback.timestamp).toLocaleDateString('fi-FI');
            
            summaryElement.innerHTML = `
                <h3>Palautteesi yhteenveto:</h3>
                <div class="summary-details">
                    <p><strong>Nimi:</strong> ${feedback.name}</p>
                    <p><strong>Arvosana:</strong> ${feedback.rating}/10 - ${ratingText}</p>
                    ${feedback.company ? `<p><strong>Yritys:</strong> ${feedback.company}</p>` : ''}
                    ${feedback.message ? `<p><strong>Lisätietoja:</strong> ${feedback.message}</p>` : ''}
                    <p><strong>Päivämäärä:</strong> ${timestamp}</p>
                </div>
            `;
        }
    }
    
    // Muunna arvosana tekstiksi
    function getRatingText(rating) {
        if (rating >= 9) return 'Erinomainen';
        if (rating >= 7) return 'Hyvä';
        if (rating >= 5) return 'Tyydyttävä';
        if (rating >= 3) return 'Huono';
        return 'Erittäin huono';
    }
});
