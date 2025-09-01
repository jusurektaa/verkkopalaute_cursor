// Dripnord Admin-hallintapaneelin toiminnallisuus - Vain Dripnord-kyselyn tiedot
document.addEventListener('DOMContentLoaded', function() {
    // Tarkista autentikaatio
    checkAuth();
    
    // Alusta hallintapaneeli
    initializeAdminPanel();
    
    // Lataa dashboard-tiedot
    loadDashboard();
    
    // Lataa palautteet
    loadFeedback();
    
    // Lataa lomakkeiden tilastot
    loadFormStats();
});

// Tarkista että käyttäjä on kirjautunut Dripnord-adminina
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const adminType = sessionStorage.getItem('adminType');
    
    if (!isLoggedIn || adminType !== 'dripnord') {
        // Ohjaa kirjautumissivulle
        window.location.href = 'login.html';
        return;
    }
    
    // Näytä käyttäjän sähköposti
    const userEmail = sessionStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    }
}

// Alusta hallintapaneeli
function initializeAdminPanel() {
    // Sidebar-navigaatio
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    const sections = document.querySelectorAll('.admin-section');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            
            // Poista aktiivinen luokka kaikilta
            sidebarLinks.forEach(l => l.parentElement.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Lisää aktiivinen luokka klikatulle
            this.parentElement.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Modaalin sulkeminen
    const modal = document.getElementById('editModal');
    const closeBtn = modal.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Lataa dashboard-tiedot
function loadDashboard() {
    const feedbackData = getFeedbackData();
    
    // Päivitä tilastot
    document.getElementById('totalFeedback').textContent = feedbackData.length;
    
    if (feedbackData.length > 0) {
        const avgRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
        document.getElementById('avgRating').textContent = avgRating.toFixed(1);
        
        // Kuukausittaiset palautteet
        const currentMonth = new Date().getMonth();
        const monthlyFeedback = feedbackData.filter(item => {
            const itemMonth = new Date(item.timestamp).getMonth();
            return itemMonth === currentMonth;
        });
        document.getElementById('monthlyFeedback').textContent = monthlyFeedback.length;
        
        // Viimeisimmät palautteet
        loadRecentFeedback(feedbackData.slice(-5));
    }
}

// Lataa palautteet
function loadFeedback() {
    const feedbackData = getFeedbackData();
    const tableBody = document.getElementById('feedbackTableBody');
    
    if (feedbackData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="7" class="no-data">Ei palautteita vielä</td></tr>';
        return;
    }
    
    tableBody.innerHTML = '';
    
    feedbackData.forEach((feedback, index) => {
        const row = document.createElement('tr');
        const date = new Date(feedback.timestamp).toLocaleDateString('fi-FI');
        
        row.innerHTML = `
            <td>${date}</td>
            <td>${feedback.name}</td>
            <td>${feedback.email}</td>
            <td>${feedback.company || '-'}</td>
            <td>
                <span class="rating-badge rating-${feedback.rating}">
                    ${feedback.rating}/10
                </span>
            </td>
            <td>${feedback.message || '-'}</td>
            <td>
                <button class="btn-small btn-view" onclick="viewFeedback(${index})">👁️</button>
                <button class="btn-small btn-delete" onclick="deleteFeedback(${index})">🗑️</button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Lataa lomakkeiden tilastot
function loadFormStats() {
    const feedbackData = getFeedbackData();
    
    if (feedbackData.length > 0) {
        const avgRating = feedbackData.reduce((sum, item) => sum + item.rating, 0) / feedbackData.length;
        
        document.getElementById('dripnordFeedbackCount').textContent = feedbackData.length;
        document.getElementById('dripnordAvgRating').textContent = avgRating.toFixed(1);
    }
}

// Lataa viimeisimmät palautteet
function loadRecentFeedback(recentFeedback) {
    const container = document.getElementById('recentFeedbackList');
    
    if (recentFeedback.length === 0) {
        container.innerHTML = '<p class="no-data">Ei palautteita vielä</p>';
        return;
    }
    
    container.innerHTML = '';
    
    recentFeedback.forEach(feedback => {
        const feedbackCard = document.createElement('div');
        feedbackCard.className = 'feedback-card-small';
        
        const date = new Date(feedback.timestamp).toLocaleDateString('fi-FI');
        const time = new Date(feedback.timestamp).toLocaleTimeString('fi-FI', { hour: '2-digit', minute: '2-digit' });
        
        feedbackCard.innerHTML = `
            <div class="feedback-header-small">
                <span class="feedback-name">${feedback.name}</span>
                <span class="feedback-rating">${feedback.rating}/10</span>
            </div>
            <div class="feedback-content-small">
                <p class="feedback-message-small">${feedback.message || 'Ei lisätietoja'}</p>
                <div class="feedback-meta">
                    <span class="feedback-company">${feedback.company || 'Ei yritystä'}</span>
                    <span class="feedback-time">${date} ${time}</span>
                </div>
            </div>
        `;
        
        container.appendChild(feedbackCard);
    });
}

// Hae palautteet Firebaseesta
async function getFeedbackData() {
    try {
        // Hae vain Dripnord palautteet Firebaseesta
        const result = await FirebaseService.getFeedbackBySource('dripnord');
        if (result.success) {
            return result.data;
        } else {
            console.error('Virhe palautteiden haussa:', result.error);
            return [];
        }
    } catch (error) {
        console.error('Virhe palautteiden haussa:', error);
        return [];
    }
}

// Näytä palaute yksityiskohtaisesti
function viewFeedback(index) {
    const feedbackData = getFeedbackData();
    const feedback = feedbackData[index];
    
    if (feedback) {
        alert(`Palautteen tiedot:\n\nNimi: ${feedback.name}\nSähköposti: ${feedback.email}\nYritys: ${feedback.company || 'Ei yritystä'}\nArvosana: ${feedback.rating}/10\nViesti: ${feedback.message || 'Ei lisätietoja'}\nPäivämäärä: ${new Date(feedback.timestamp).toLocaleDateString('fi-FI')}`);
    }
}

// Poista palaute
function deleteFeedback(index) {
    if (confirm('Haluatko varmasti poistaa tämän palautteen?')) {
        const feedbackData = getFeedbackData();
        feedbackData.splice(index, 1);
        localStorage.setItem('dripnord_feedback', JSON.stringify(feedbackData));
        
        // Päivitä näkymä
        loadDashboard();
        loadFeedback();
        loadFormStats();
    }
}

// Vie tiedot CSV-muodossa
async function exportData() {
    try {
        const feedbackData = await getFeedbackData();
        
        if (feedbackData.length === 0) {
            alert('Ei palautteita vientiin!');
            return;
        }
        
        // Luo CSV-sisältö
        let csvContent = 'Päivämäärä,Nimi,Sähköposti,Yritys,Arvosana,Viesti\n';
        
        feedbackData.forEach(feedback => {
            const date = new Date(feedback.timestamp).toLocaleDateString('fi-FI');
            const name = feedback.name.replace(/"/g, '""');
            const email = feedback.email;
            const company = (feedback.company || '').replace(/"/g, '""');
            const rating = feedback.rating;
            const message = (feedback.message || '').replace(/"/g, '""');
            
            csvContent += `"${date}","${name}","${email}","${company}",${rating},"${message}"\n`;
        });
        
        // Lataa tiedosto
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'dripnord_palautteet.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Virhe tietojen viennissä:', error);
        alert('Virhe tietojen viennissä. Yritä uudelleen.');
    }
}

// Muokkaa lomaketta
function editForm(formType) {
    const modal = document.getElementById('editModal');
    modal.style.display = 'block';
}

// Sulje modaali
function closeModal() {
    const modal = document.getElementById('editModal');
    modal.style.display = 'none';
}

// Tallenna lomakkeen muutokset
function saveFormChanges() {
    // Tässä voit tallentaa lomakkeen muutokset
    alert('Lomakkeen muutokset tallennettu!');
    closeModal();
}

// Tallenna asetukset
function saveSettings() {
    const notificationEmail = document.getElementById('notificationEmail').value;
    const autoResponse = document.getElementById('autoResponse').value;
    
    // Tallenna asetukset localStorageen
    localStorage.setItem('dripnord_notification_email', notificationEmail);
    localStorage.setItem('dripnord_auto_response', autoResponse);
    
    alert('Asetukset tallennettu!');
}

// Kirjaudu ulos
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('adminType');
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminType');
    
    // Ohjaa kirjautumissivulle
    window.location.href = 'login.html';
}

// Tee logout-funktio globaaliksi
window.logout = logout;
