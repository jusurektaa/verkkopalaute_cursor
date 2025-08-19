// Admin-hallintapaneelin toiminnallisuus

// Tarkista kirjautumistila
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') || localStorage.getItem('rememberLogin');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }
    
    // Näytä käyttäjän sähköposti
    const userEmail = sessionStorage.getItem('userEmail') || localStorage.getItem('userEmail');
    if (userEmail) {
        document.getElementById('userEmail').textContent = userEmail;
    }
}

// Hae palautteet localStorageesta
function getFeedbackData() {
    try {
        // Hae palautteet localStorageesta
        const storedFeedback = JSON.parse(localStorage.getItem('verkkopalaute_feedback') || '[]');
        
        if (storedFeedback.length > 0) {
            return storedFeedback;
        }
        
        // Jos ei ole palautteita localStorageessa, käytä demo-tietoja
        return [
            {
                id: 1,
                date: '2024-01-15',
                name: 'Matti Meikäläinen',
                email: 'matti@example.com',
                company: 'ABC Oy',
                message: 'Erinomainen palvelu! Sain nopeasti apua ongelmaani.',
                status: 'new',
                rating: 5
            },
            {
                id: 2,
                date: '2024-01-14',
                name: 'Liisa Virtanen',
                email: 'liisa@example.com',
                company: 'XYZ Ky',
                message: 'Hyvä palvelu, mutta voisi olla nopeampi vastata.',
                status: 'read',
                rating: 4
            },
            {
                id: 3,
                date: '2024-01-13',
                name: 'Pekka Korhonen',
                email: 'pekka@example.com',
                company: 'DEF Ab',
                message: 'Ongelma ratkaistu nopeasti. Kiitos!',
                status: 'replied',
                rating: 5
            },
            {
                id: 4,
                date: '2024-01-12',
                name: 'Anna Mäkinen',
                email: 'anna@example.com',
                company: 'GHI Oy',
                message: 'Tarvitsen lisätietoja tuotteesta.',
                status: 'new',
                rating: 3
            },
            {
                id: 5,
                date: '2024-01-11',
                name: 'Jussi Laaksonen',
                email: 'jussi@example.com',
                company: 'JKL Ky',
                message: 'Erinomainen asiakaspalvelu ja nopea toimitus.',
                status: 'replied',
                rating: 5
            }
        ];
    } catch (error) {
        console.error('Virhe palautteiden haussa:', error);
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
        name: 'Yleinen palaute',
        description: 'Yleinen palautelomake asiakkaille',
        submissions: 15,
        status: 'active'
    },
    {
        id: 2,
        name: 'Tuotepalaute',
        description: 'Tuotteiden palautelomake',
        submissions: 8,
        status: 'active'
    },
    {
        id: 3,
        name: 'Palvelupalaute',
        description: 'Palvelun laadun palautelomake',
        submissions: 12,
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

// Näytä tilastot dashboardissa
function loadDashboard() {
    const feedbackData = getFeedbackData();
    
    // Päivitä tilastot
    document.getElementById('totalFeedback').textContent = feedbackData.length;
    document.getElementById('activeForms').textContent = DEMO_FORMS.length;
    
    // Laske keskiarvo
    const totalRating = feedbackData.reduce((sum, feedback) => sum + feedback.rating, 0);
    const avgRating = feedbackData.length > 0 ? (totalRating / feedbackData.length).toFixed(1) : '0.0';
    document.getElementById('avgRating').textContent = avgRating;
    
    // Laske tänään saadut palautteet
    const today = new Date().toISOString().split('T')[0];
    const todayFeedback = feedbackData.filter(feedback => feedback.date === today).length;
    document.getElementById('todayFeedback').textContent = todayFeedback;
    
    // Näytä viimeisimmät palautteet
    loadRecentFeedback();
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

// Näytä kaikki palautteet taulukossa
function loadFeedbackTable() {
    const tableBody = document.getElementById('feedbackTableBody');
    const feedbackData = getFeedbackData();
    
    if (feedbackData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">Ei vielä palautteita</td></tr>';
        return;
    }
    
    tableBody.innerHTML = feedbackData.map(feedback => `
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
function viewFeedback(feedbackId) {
    const feedbackData = getFeedbackData();
    const feedback = feedbackData.find(f => f.id === feedbackId);
    if (!feedback) return;
    
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

// Kirjaudu ulos
function logout() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    localStorage.removeItem('rememberLogin');
    localStorage.removeItem('userEmail');
    window.location.href = 'login.html';
}

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
    link.setAttribute("download", "palautteet.csv");
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