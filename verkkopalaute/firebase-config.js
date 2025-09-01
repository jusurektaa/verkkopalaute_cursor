// Firebase-konfiguraatio
// Tämä tiedosto sisältää Firebase-projektin asetukset

// Firebase SDK:n konfiguraatio
const firebaseConfig = {
    apiKey: "AIzaSyAaiyXF6_mhWfjsFVWV6aTTj5PvadOicbM",
    authDomain: "verkkopalaute-551f8.firebaseapp.com",
    projectId: "verkkopalaute-551f8",
    storageBucket: "verkkopalaute-551f8.firebasestorage.app",
    messagingSenderId: "1079172282962",
    appId: "1:1079172282962:web:71a32e306ba936b306fd8b",
    measurementId: "G-HGQ7GP79NW"
};

// Firebase-palvelut
let app, db, analytics;

// Firebase-palvelut
const FirebaseService = {
    // Tallenna palaute Firestoreen
    async saveFeedback(feedback) {
        try {
            if (!db) {
                throw new Error('Firebase ei ole alustettu');
            }
            
            // Lisää timestamp jos ei ole
            if (!feedback.timestamp) {
                feedback.timestamp = new Date().toISOString();
            }
            
            // Tallenna palaute
            const docRef = await db.collection('feedback').add(feedback);
            console.log('Palaute tallennettu ID:llä:', docRef.id);
            
            return {
                success: true,
                id: docRef.id,
                message: 'Palaute tallennettu onnistuneesti!'
            };
        } catch (error) {
            console.error('Virhe palautteen tallentamisessa:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Hae kaikki palautteet
    async getAllFeedback() {
        try {
            if (!db) {
                throw new Error('Firebase ei ole alustettu');
            }
            
            const snapshot = await db.collection('feedback').orderBy('timestamp', 'desc').get();
            const feedback = [];
            
            snapshot.forEach(doc => {
                feedback.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return {
                success: true,
                data: feedback
            };
        } catch (error) {
            console.error('Virhe palautteiden hakemisessa:', error);
            return {
                success: false,
                error: error.message,
                data: []
            };
        }
    },

    // Hae palautteet lähdetyypin mukaan
    async getFeedbackBySource(source) {
        try {
            if (!db) {
                throw new Error('Firebase ei ole alustettu');
            }
            
            const snapshot = await db.collection('feedback')
                .where('source', '==', source)
                .orderBy('timestamp', 'desc')
                .get();
            
            const feedback = [];
            snapshot.forEach(doc => {
                feedback.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return {
                success: true,
                data: feedback
            };
        } catch (error) {
            console.error('Virhe palautteiden hakemisessa:', error);
            return {
                success: false,
                error: error.message,
                data: []
            };
        }
    },

    // Poista palaute
    async deleteFeedback(feedbackId) {
        try {
            if (!db) {
                throw new Error('Firebase ei ole alustettu');
            }
            
            await db.collection('feedback').doc(feedbackId).delete();
            console.log('Palaute poistettu:', feedbackId);
            
            return {
                success: true,
                message: 'Palaute poistettu onnistuneesti!'
            };
        } catch (error) {
            console.error('Virhe palautteen poistamisessa:', error);
            return {
                success: false,
                error: error.message
            };
        }
    },

    // Päivitä palaute
    async updateFeedback(feedbackId, updates) {
        try {
            if (!db) {
                throw new Error('Firebase ei ole alustettu');
            }
            
            await db.collection('feedback').doc(feedbackId).update(updates);
            console.log('Palaute päivitetty:', feedbackId);
            
            return {
                success: true,
                message: 'Palaute päivitetty onnistuneesti!'
            };
        } catch (error) {
            console.error('Virhe palautteen päivittämisessä:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Export Firebase-palvelut
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseService;
} else {
    window.FirebaseService = FirebaseService;
}

