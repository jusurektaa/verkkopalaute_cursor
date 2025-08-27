// Dripnord Admin-hallintapaneelin toiminnallisuus - Vain Dripnord-kyselyn tiedot

// Tarkista kirjautumistila
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') || localStorage.getItem('rememberLogin');
    if (!isLoggedIn) {
        window.location.href = 'kirjaudu.html';
        return;
    }
    
    // Tarkista että käyttäjä on Dripnord-admin
    const adminType = sessionStorage.getItem('adminType') || localStorage.getItem('adminType');
    if (adminType !== 'dripnord') {
        // Jos ei ole Dripnord-admin, ohjaa takaisin kirjautumissivulle
        logout();
        return;
    }
    
    // Näytä käyttäjän sähköposti
    const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    }
}

// Hae Dripnord palautteet localStorageesta
function getFeedbackData() {
    try {
        // Hae vain Dripnord palautteet localStorageesta
        const storedFeedback = JSON.parse(localStorage.getItem('dripnord_feedback') || '[]');
        
        if (storedFeedback.length > 0) {
            return storedFeedback;
        }
        
        // Jos ei ole palautteita localStorageessa, käytä demo-tietoja
        return [
            {
                id: 1,
                date: '2024-01-15',
                name: 'Dripnord User 1',
                email: 'dripnord1@example.com',
                company: 'Dripnord Inc',
                message: 'Great service! Very fast delivery.',
                status: 'new',
                rating: 5,
                timestamp: '2024-01-15T10:00:00Z'
            },
            {
                id: 2,
                date: '2024-01-14',
                name: 'Dripnord User 2',
                email: 'dripnord2@example.com',
                company: 'Dripnord Corp',
                message: 'Could be faster in replying.',
                status: 'read',
                rating: 4,
                timestamp: '2024-01-14T11:00:00Z'
            },
            {
                id: 3,
                date: '2024-01-13',
                name: 'Dripnord User 3',
                email: 'dripnord3@example.com',
                company: 'Dripnord Ltd',
                message: 'Problem solved quickly. Thank you!',
                status: 'replied',
                rating: 5,
                timestamp: '2024-01-13T12:00:00Z'
            },
            {
                id: 4,
                date: '2024-01-12',
                name: 'Dripnord User 4',
                email: 'dripnord4@example.com',
                company: 'Dripnord Group',
                message: 'Need more info about the product.',
                status: 'new',
                rating: 3,
                timestamp: '2024-01-12T13:00:00Z'
            },
            {
                id: 5,
                date: '2024-01-11',
                name: 'Dripnord User 5',
                email: 'dripnord5@example.com',
                company: 'Dripnord Alliance',
                message: 'Excellent customer service and fast delivery.',
                status: 'replied',
                rating: 5,
                timestamp: '2024-01-11T14:00:00Z'
            }
        ];
    } catch (error) {
        console.error('Virhe Dripnord palautteiden haussa:', error);
        return [];
    }
}

// Päivitä palautteet reaaliajassa
function refreshFeedbackData() {
    return getFeedbackData();
}

// Demo-lomakkeet
const DEMO_FORMS = [
    {
        id: 1,
        name: 'Dripnord - Asiakastyytyväisyys',
        description: 'Asiakastyytyväisyyskysely Dripnord-palveluista',
        submissions: 8,
        status: 'active'
    }
];

// Sidebar navigaatio
function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Poista aktiivinen luokka kaikilta
            document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));
            document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
            
            // Lisää aktiivinen luokka klikatulle linkille
            this.parentElement.classList.add('active');
            
            // Näytä vastaava osio
            const targetSection = this.getAttribute('data-section');
            document.getElementById(targetSection).classList.add('active');
        });
    });
}

// Lataa dashboard-tiedot
function loadDashboard() {
    const feedbackData = getFeedbackData();
    
    // Päivitä tilastot
    document.getElementById('totalFeedback').textContent = feedbackData.length;
    document.getElementById('activeForms').textContent = '1';
    
    // Lasketaan keskiarvo
    const avgRating = feedbackData.length > 0 ? 
        (feedbackData.reduce((sum, item) => sum + (parseInt(item.rating) || 0), 0) / feedbackData.length).toFixed(1) : '0.0';
    
    document.getElementById('avgRating').textContent = avgRating;
    
    // Tänään saadut palautteet
    const today = new Date().toDateString();
    const todayFeedback = feedbackData.filter(item => new Date(item.timestamp).toDateString() === today).length;
    document.getElementById('todayFeedback').textContent = todayFeedback;
    
    // Päivitä lomakkeiden tilastot
    updateFormStats();
    
    // Lataa viimeisimmät palautteet
    loadRecentFeedback();
}

// Päivitä lomakkeiden tilastot
function updateFormStats() {
    const feedbackData = getFeedbackData();
    
    // Dripnord tilastot
    document.getElementById('dripnordCount').textContent = feedbackData.length;
    const dripnordAvg = feedbackData.length > 0 ? 
        (feedbackData.reduce((sum, item) => sum + (parseInt(item.rating) || 0), 0) / feedbackData.length).toFixed(1) : '0.0';
    document.getElementById('dripnordAvg').textContent = dripnordAvg;
    
    const today = new Date().toDateString();
    const dripnordToday = feedbackData.filter(item => new Date(item.timestamp).toDateString() === today).length;
    document.getElementById('dripnordToday').textContent = dripnordToday;
}

// Näytä tietyn lomakkeen palautteet
function viewFormFeedback(formType) {
    if (formType === 'dripnord') {
        // Näytä Dripnord palautteet
        loadFeedbackTable();
        // Siirry palautteet-osioon
        document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
    }
}

// Näytä viimeisimmät palautteet
function loadRecentFeedback() {
    const recentFeedbackList = document.getElementById('recentFeedbackList');
    const feedbackData = getFeedbackData();
    const recentFeedback = feedbackData.slice(0, 3);
    
    if (recentFeedback.length === 0) {
        recentFeedbackList.innerHTML = '<div class="feedback-item"><p>Ei vielä palautteita</p></div>';
        return;
    }
    
    recentFeedbackList.innerHTML = recentFeedback.map(feedback => `
        <div class="feedback-item">
            <div class="feedback-content">
                <h4>${feedback.name}</h4>
                <p>${feedback.message.substring(0, 50)}${feedback.message.length > 50 ? '...' : ''}</p>
            </div>
            <div class="feedback-meta">
                <div>${formatDate(feedback.date)}</div>
                <div>${getStatusBadge(feedback.status)}</div>
            </div>
        </div>
    `).join('');
}

// Lataa palautteet taulukkoon
function loadFeedbackTable() {
    const feedbackData = getFeedbackData();
    const tableBody = document.getElementById('feedbackTableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    feedbackData.forEach(feedback => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${new Date(feedback.timestamp).toLocaleDateString('fi-FI')}</td>
            <td>${feedback.name}</td>
            <td>${feedback.email}</td>
            <td>${feedback.message.substring(0, 50)}${feedback.message.length > 50 ? '...' : ''}</td>
            <td><span class="status-badge ${feedback.status}">${getStatusText(feedback.status)}</span></td>
            <td>
                <button class="btn-secondary btn-sm" onclick="viewFeedback('dripnord', ${feedback.id})">Näytä</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    // Päivitä otsikko
    const sectionHeader = document.querySelector('#feedback .section-header h1');
    if (sectionHeader) {
        sectionHeader.textContent = 'Dripnord - Palautteet';
    }
}

// Näytä palaute yksityiskohtaisesti
function viewFeedback(formType, feedbackId) {
    let feedbackData;
    
    if (formType === 'dripnord') {
        feedbackData = getFeedbackData().find(item => item.id === feedbackId);
    }
    
    if (!feedbackData) return;
    
    // Näytä modal palautteen tiedoilla
    showFeedbackModal(feedbackData, formType);
}

// Näytä lomakkeet
function loadForms() {
    const formsGrid = document.getElementById('formsGrid');
    
    formsGrid.innerHTML = DEMO_FORMS.map(form => `
        <div class="form-card">
            <h3>${form.name}</h3>
            <p>${form.description}</p>
            <div class="form-stats">
                <div class="form-stat">
                    <div class="form-stat-number">${form.submissions}</div>
                    <div class="form-stat-label">Palautetta</div>
                </div>
                <div class="form-stat">
                    <div class="form-stat-number">${form.status === 'active' ? 'Aktiivinen' : 'Ei aktiivinen'}</div>
                    <div class="form-stat-label">Tila</div>
                </div>
            </div>
        </div>
    `).join('');
}

// Näytä palautteen tiedot modalissa
function showFeedbackModal(feedback, formType) {
    const modal = document.getElementById('feedbackModal');
    const modalBody = document.getElementById('feedbackModalBody');
    
    modalBody.innerHTML = `
        <div class="feedback-detail">
            <div class="detail-row">
                <strong>Nimi:</strong> ${feedback.name}
            </div>
            <div class="detail-row">
                <strong>Sähköposti:</strong> ${feedback.email}
            </div>
            <div class="detail-row">
                <strong>Yritys:</strong> ${feedback.company || 'Ei määritelty'}
            </div>
            <div class="detail-row">
                <strong>Päivämäärä:</strong> ${formatDate(feedback.date)}
            </div>
            <div class="detail-row">
                <strong>Arvosana:</strong> ${'⭐'.repeat(feedback.rating)} (${feedback.rating}/10)
            </div>
            <div class="detail-row">
                <strong>Viesti:</strong>
                <p>${feedback.message || 'Ei lisätietoja'}</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Sulje modal
function closeModal() {
    const modal = document.getElementById('feedbackModal');
    modal.style.display = 'none';
}

// Suodata palautteet
function initFilters() {
    const statusFilter = document.getElementById('statusFilter');
    const dateFilter = document.getElementById('dateFilter');
    
    statusFilter.addEventListener('change', filterFeedback);
    dateFilter.addEventListener('change', filterFeedback);
}

function filterFeedback() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    let filteredFeedback = getFeedbackData();
    
    // Suodata tilan mukaan
    if (statusFilter !== 'all') {
        filteredFeedback = filteredFeedback.filter(feedback => feedback.status === statusFilter);
    }
    
    // Suodata päivämäärän mukaan
    if (dateFilter !== 'all') {
        const today = new Date();
        const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const oneMonthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        
        switch (dateFilter) {
            case 'today':
                const todayStr = today.toISOString().split('T')[0];
                filteredFeedback = filteredFeedback.filter(feedback => feedback.date === todayStr);
                break;
            case 'week':
                filteredFeedback = filteredFeedback.filter(feedback => new Date(feedback.date) >= oneWeekAgo);
                break;
            case 'month':
                filteredFeedback = filteredFeedback.filter(feedback => new Date(feedback.date) >= oneMonthAgo);
                break;
        }
    }
    
    // Päivitä taulukko
    updateFeedbackTable(filteredFeedback);
}

function updateFeedbackTable(feedback) {
    const tableBody = document.getElementById('feedbackTableBody');
    
    tableBody.innerHTML = feedback.map(feedback => `
        <tr>
            <td>${formatDate(feedback.date)}</td>
            <td>${feedback.name}</td>
            <td>${feedback.email}</td>
            <td>${feedback.message.substring(0, 30)}${feedback.message.length > 30 ? '...' : ''}</td>
            <td>${getStatusBadge(feedback.status)}</td>
            <td>
                <button class="btn-view" onclick="viewFeedback(${feedback.id})">Katso</button>
            </td>
        </tr>
    `).join('');
}

// Apufunktiot
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI');
}

function getStatusBadge(status) {
    const statusTexts = {
        'new': 'Uusi',
        'read': 'Luettu',
        'replied': 'Vastattu'
    };
    
    return `<span class="status-badge status-${status}">${statusTexts[status]}</span>`;
}

function getStatusText(status) {
    const statusTexts = {
        'new': 'Uusi',
        'read': 'Luettu',
        'replied': 'Vastattu'
    };
    return statusTexts[status] || status;
}

// Kirjaudu ulos
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('adminType');
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('adminType');
    window.location.href = '../verkkopalaute/login.html';
}

// Tee logout-funktio globaalisti saatavilla
window.logout = logout;

// Tietojen vienti
function exportData() {
    const feedbackData = getFeedbackData();
    
    if (feedbackData.length === 0) {
        alert('Ei palautteita vientiin!');
        return;
    }
    
    const csvContent = "data:text/csv;charset=utf-8," 
        + "Päivämäärä,Nimi,Sähköposti,Yritys,Viesti,Arvosana,Tila\n"
        + feedbackData.map(feedback => 
            `${feedback.date},"${feedback.name}","${feedback.email}","${feedback.company || ''}","${feedback.message || ''}",${feedback.rating},${feedback.status}`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "dripnord_palautteet.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    initSidebar();
    loadDashboard();
    loadFeedbackTable();
    loadForms();
    initFilters();
    
    // Modal sulkeminen
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('feedbackModal');
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Kirjaudu ulos
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Tietojen vienti
    document.getElementById('exportBtn').addEventListener('click', exportData);
    
    // Päivitä palautteet
    document.getElementById('refreshBtn').addEventListener('click', function() {
        // Päivitä kaikki tiedot
        loadDashboard();
        loadFeedbackTable();
        loadForms();
        
        // Näytä viesti
        const button = this;
        const originalText = button.innerHTML;
        button.innerHTML = '✅ Päivitetty!';
        button.style.background = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    });
    
    // Lomakkeen luonti
    document.getElementById('createFormBtn').addEventListener('click', function() {
        alert('Lomakkeen luonti - tämä toiminto vaatii backend-toteutuksen');
    });
    
    // Modal-toiminnot
    document.getElementById('markAsReadBtn').addEventListener('click', function() {
        alert('Merkitse luetuksi - tämä toiminto vaatii backend-toteutuksen');
    });
    
    document.getElementById('replyBtn').addEventListener('click', function() {
        alert('Vastaa palautteeseen - tämä toiminto vaatii backend-toteutuksen');
    });
});
