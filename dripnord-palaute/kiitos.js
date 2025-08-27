// Dripnord kiitos-sivun JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Näytä palautteen yhteenveto
    displayFeedbackSummary();
});

// Näytä palautteen yhteenveto
function displayFeedbackSummary() {
    const urlParams = new URLSearchParams(window.location.search);
    const feedbackId = urlParams.get('id');
    
    if (!feedbackId) {
        document.getElementById('feedbackSummary').style.display = 'none';
        return;
    }
    
    // Hae palaute localStorageesta
    const feedbackData = getDripnordFeedbackData();
    const feedback = feedbackData.find(item => item.id == feedbackId);
    
    if (feedback) {
        // Päivitä yhteenveto
        document.getElementById('summaryName').textContent = feedback.name;
        document.getElementById('summaryEmail').textContent = feedback.email;
        document.getElementById('summaryCompany').textContent = feedback.company || 'Ei määritelty';
        document.getElementById('summaryRating').textContent = `${feedback.rating}/10`;
        document.getElementById('summaryMessage').textContent = feedback.message;
        document.getElementById('summaryDate').textContent = new Date(feedback.timestamp).toLocaleDateString('fi-FI');
        
        // Näytä yhteenveto
        document.getElementById('feedbackSummary').style.display = 'block';
    } else {
        // Piilota yhteenveto jos palautetta ei löydy
        document.getElementById('feedbackSummary').style.display = 'none';
    }
}

// Hae Dripnord palautteet localStorageesta
function getDripnordFeedbackData() {
    try {
        const storedFeedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
        return storedFeedback;
    } catch (error) {
        console.error('Virhe Dripnord palautteiden haussa:', error);
        return [];
    }
}
