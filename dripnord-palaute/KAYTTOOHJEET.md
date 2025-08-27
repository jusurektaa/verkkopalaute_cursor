# Dripnord - Käyttöohjeet

## 🚀 Sivuston käynnistys

1. **Avaa `index.html`** selaimessa
2. **Demo-tiedot ladataan automaattisesti** localStorage:een
3. **Sivusto on nyt käytettävissä** kaikilla ominaisuuksilla

## 📱 Sivuston ominaisuudet

### Etusivu (index.html)
- **Hero-osio**: Tervetuloviesti ja toimintopainikkeet
- **Palvelut**: Kolme pääpalvelua emoji-kuvakkeilla
- **Hinnat**: Kolme hintapakettia (Perus, Premium, Enterprise)
- **Responsiivinen design**: Toimii kaikilla laitteilla

### Palaute-lomake (palaute-lomake.html)
- **Pakolliset kentät**: Nimi, sähköposti, arvosana (1-10)
- **Valinnaiset kentät**: Yritys, viesti, uutiskirjeen tilaus
- **Arvosteluasteikko**: 10 painiketta 1-10 arvosanoille
- **Validointi**: Tarkistaa pakolliset kentät ennen lähetystä

### Kiitos-sivu (kiitos.html)
- **Palautteen yhteenveto**: Näyttää lähetetyn palautteen tiedot
- **Seuraavat askeleet**: Selittää mitä tapahtuu palautteen jälkeen
- **Google Maps -arvostelu**: Ohjaa Google-arvosteluihin
- **Toimintopainikkeet**: Palaa etusivulle tai ota yhteyttä

### Kirjaudu-sivu (kirjaudu.html)
- **Demo-tunnukset**:
  - Sähköposti: `admin@dripnord.fi`
  - Salasana: `admin123`
- **Automaattinen täyttö**: localhost-ympäristössä
- **Kirjautumistilan tallennus**: sessionStorage:ssa

### Hallintapaneeli (admin.html)
- **Dashboard**: Tilastot ja viimeisimmät palautteet
- **Palautteet**: Kaikki palautteet taulukossa
- **Yhteydenotot**: Kaikki yhteydenotot taulukossa
- **Analytiikka**: Graafit ja tilastot (kehitysvaiheessa)
- **Asetukset**: Hallintapaneelin konfiguraatio

### Yhteyslomake (ota-yhteytta.html)
- **Henkilötiedot**: Etunimi, sukunimi, sähköposti
- **Yritystiedot**: Yritys, puhelin
- **Viesti**: Aihe ja viestin sisältö
- **Validointi**: Tarkistaa pakolliset kentät

## 🔐 Kirjautuminen hallintapaneeliin

1. **Mene kirjaudu-sivulle** (`kirjaudu.html`)
2. **Syötä demo-tunnukset**:
   - Sähköposti: `admin@dripnord.fi`
   - Salasana: `admin123`
3. **Klikkaa "Kirjaudu sisään"**
4. **Ohjataan automaattisesti** hallintapaneeliin

## 📊 Hallintapaneelin käyttö

### Dashboard
- **Tilastot**: Palautteiden määrä, yhteydenotot, keskimääräinen arvosana
- **Viimeisimmät palautteet**: 5 uusinta palautetta aikajärjestyksessä

### Palautteet
- **Taulukko**: Kaikki palautteet päivämäärällä, nimellä, sähköpostilla
- **Suodatus**: Arvosanan, päivämäärän ja haun mukaan
- **Vientitoiminto**: CSV-muodossa kaikki palautteet

### Yhteydenotot
- **Taulukko**: Kaikki yhteydenotot henkilötiedoilla ja viesteillä
- **Vientitoiminto**: CSV-muodossa kaikki yhteydenotot

### Analytiikka
- **Arvosanojen jakauma**: Visuaalinen esitys palautteista
- **Kuukausittaiset tilastot**: Palautteiden määrä ajan funktiona

### Asetukset
- **Yrityksen tiedot**: Nimi ja yhteystiedot
- **Automaattinen vastaus**: Viesti, joka lähetetään automaattisesti

## 🛠️ Tekniset ominaisuudet

### Tietojen tallennus
- **localStorage**: Palautteet ja yhteydenotot
- **sessionStorage**: Kirjautumistila
- **Demo-tiedot**: Automaattisesti ladattu testausta varten

### Responsiivisuus
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

### Selaintuki
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🧪 Testaus

### Demo-tietojen käyttö
1. **Avaa selaimen konsoli** (F12)
2. **Käytä komentoja**:
   - `loadDemoData()` - Lataa demo-tiedot
   - `clearDemoData()` - Poistaa demo-tiedot
   - `reloadDemoData()` - Lataa demo-tiedot uudelleen

### Palautteen testaus
1. **Mene palaute-lomakkeelle**
2. **Täytä lomake** demo-tiedoilla
3. **Lähetä palaute**
4. **Tarkista kiitos-sivu**
5. **Kirjaudu hallintapaneeliin** nähdäksesi palautteen

### Yhteyslomakkeen testaus
1. **Mene yhteyslomakkeelle**
2. **Täytä lomake** demo-tiedoilla
3. **Lähetä viesti**
4. **Tarkista hallintapaneelissa** yhteydenotot

## 🔧 Ongelmien ratkaisu

### Sivusto ei avaudu
- **Tarkista tiedostopolut**: Kaikki tiedostot samassa kansiossa
- **Avaa selaimen konsoli**: Katso virheilmoitukset
- **Tarkista JavaScript**: Kaikki .js-tiedostot olemassa

### Palautteet eivät tallennu
- **Tarkista localStorage**: F12 → Application → Local Storage
- **Käytä demo-tietoja**: `loadDemoData()` konsolissa
- **Tarkista JavaScript-virheet**: Konsolissa punaisia virheitä

### Kirjautuminen ei onnistu
- **Tarkista tunnukset**: `admin@dripnord.fi` / `admin123`
- **Tyhjennä selain**: Poista cache ja evästeet
- **Käytä incognito-tilaa**: Testaa uudessa ikkunassa

### Kuvat eivät näy
- **Placeholder-kuvat**: Käytetään automaattisesti
- **Omat kuvat**: Laita `assets/`-kansioon
- **Tarkista tiedostonimet**: Täsmälläiset polut

## 📁 Tiedostorakenne

```
dripnord-palaute/
├── index.html              # Etusivu
├── palaute-lomake.html     # Palaute-lomake
├── kiitos.html             # Kiitos-sivu
├── kirjaudu.html           # Kirjaudu-sivu
├── admin.html              # Hallintapaneeli
├── ota-yhteytta.html       # Yhteyslomake
├── styles.css              # Päätyylit
├── palaute-lomake.css      # Palaute-lomakkeen tyylit
├── kiitos.css              # Kiitos-sivun tyylit
├── kirjaudu.css            # Kirjaudu-sivun tyylit
├── admin.css               # Hallintapaneelin tyylit
├── ota-yhteytta.css        # Yhteyslomakkeen tyylit
├── script.js               # Pääsivun JavaScript
├── palaute-lomake.js       # Palaute-lomakkeen JavaScript
├── kiitos.js               # Kiitos-sivun JavaScript
├── kirjaudu.js             # Kirjaudu-sivun JavaScript
├── admin.js                # Hallintapaneelin JavaScript
├── ota-yhteytta.js         # Yhteyslomakkeen JavaScript
├── demo-data.js            # Demo-tiedot
├── assets/                 # Kuvat ja media
│   ├── dripnord-logo.png   # Dripnord-logo (placeholder)
│   └── hero-image.jpg      # Etusivun hero-kuva (placeholder)
├── README.md               # Projektin kuvaus
└── KAYTTOOHJEET.md        # Tämä tiedosto
```

## 📞 Tuki

Jos kohtaat ongelmia:

1. **Tarkista selaimen konsoli** virheiden varalta
2. **Käytä demo-tietoja** testaamiseen
3. **Tarkista tiedostopolut** ja nimet
4. **Käytä incognito-tilaa** cache-ongelmien varalta

## 🚀 Kehitys

### Tulevat ominaisuudet
- [ ] Tietokanta-integraatio
- [ ] Sähköposti-ilmoitukset
- [ ] Analytics ja raportointi
- [ ] Monikielisyys
- [ ] API-rajapinta

### Mukauttaminen
- **Värit**: Muokkaa CSS-tiedostoja
- **Logo**: Vaihda `assets/dripnord-logo.png`
- **Tekstit**: Muokkaa HTML-tiedostoja
- **Toiminnallisuus**: Muokkaa JavaScript-tiedostoja

---

**Huomio**: Tämä on demo-versio, joka käyttää localStorage:ia tietojen tallennukseen. Tuotantokäytössä tarvitaan oikea backend-järjestelmä ja tietokanta.


