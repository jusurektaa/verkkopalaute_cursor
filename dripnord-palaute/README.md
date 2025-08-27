# Dripnord - Asiakaspalautteen keräys

Tämä on Dripnord-asiakkaalle suunniteltu ammattimainen asiakaspalautteen keräys -sivusto, joka on rakennettu HTML:llä, CSS:llä ja JavaScriptilla.

## 🚀 Ominaisuudet

- **Responsiivinen design** - toimii kaikilla laitteilla
- **Moderni käyttöliittymä** - ammattimainen ja käyttäjäystävällinen
- **Palaute-lomake** - 1-10 arvosteluasteikko ja tekstikentät
- **Kirjautumisjärjestelmä** - hallintapaneeliin pääsy
- **Hallintapaneeli** - palautteiden tarkastelu ja hallinta
- **Kiitos-sivu** - palautteen vastaanottovahvistus
- **Google Maps -arvostelu** - ohjaus Google-arvosteluihin

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
├── script.js               # Pääsivun JavaScript
├── palaute-lomake.js       # Palaute-lomakkeen JavaScript
├── kiitos.js               # Kiitos-sivun JavaScript
├── kirjaudu.js             # Kirjaudu-sivun JavaScript
├── admin.js                # Hallintapaneelin JavaScript
├── assets/                 # Kuvat ja media
│   ├── dripnord-logo.png   # Dripnord-logo
│   └── hero-image.jpg      # Etusivun hero-kuva
└── README.md               # Tämä tiedosto
```

## 🎨 Design-ominaisuudet

- **Väriteema**: Sininen ja kultainen (Dripnord-brändi)
- **Gradientit**: Modernit taustagradientit
- **Animaatiot**: Hover-efektit ja siirtymät
- **Responsiivisuus**: Mobiili-ensimmäinen suunnittelu
- **Typography**: Selkeä ja luettava fontti

## 🔐 Kirjautumistiedot (demo)

- **Sähköposti**: `admin@dripnord.fi`
- **Salasana**: `admin123`

## 🚀 Käyttöönotto

1. **Lataa tiedostot** tietokoneellesi
2. **Avaa `index.html`** selaimessa
3. **Testaa palaute-lomaketta** täyttämällä tiedot
4. **Kirjaudu hallintapaneeliin** demo-tunnuksilla
5. **Tarkastele palautteita** hallintapaneelissa

## 📱 Responsiivisuus

Sivusto on optimoitu seuraaville näytöille:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🛠️ Teknologiat

- **HTML5**: Semanttinen merkintäkieli
- **CSS3**: Modernit tyylit ja animaatiot
- **JavaScript (ES6+)**: Interaktiiviset ominaisuudet
- **LocalStorage**: Palaute-tietojen tallennus
- **SessionStorage**: Kirjautumistilan hallinta

## 📊 Palaute-järjestelmä

### Palaute-lomake
- Nimi ja sähköposti (pakolliset)
- Yrityksen nimi (valinnainen)
- 1-10 arvosteluasteikko
- Viestikenttä (valinnainen)
- Uutiskirjeen tilaus

### Hallintapaneeli
- Dashboard-tilastot
- Palaute-listaus
- Suodatus ja haku
- Tietojen vienti
- Asetukset

## 🔒 Tietoturva

- **Demo-tunnukset**: Vain kehitystä varten
- **LocalStorage**: Tietojen tallennus selaimessa
- **SessionStorage**: Kirjautumistilan hallinta
- **Validointi**: Lomakkeiden tietojen tarkistus

## 🌐 Selaintuki

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📈 Kehitys

### Lisätty ominaisuudet
- [x] Responsiivinen design
- [x] Palaute-lomake
- [x] Kirjautumisjärjestelmä
- [x] Hallintapaneeli
- [x] Kiitos-sivu
- [x] Google Maps -arvostelu

### Tulevat ominaisuudet
- [ ] Tietokanta-integraatio
- [ ] Sähköposti-ilmoitukset
- [ ] Analytics ja raportointi
- [ ] Monikielisyys
- [ ] API-rajapinta

## 📞 Yhteystiedot

- **Dripnord**: info@dripnord.fi
- **Puhelin**: +358 40 123 4567

## 📄 Lisenssi

© 2025 Dripnord. Kaikki oikeudet pidätetään.

---

**Huomio**: Tämä on demo-versio, joka käyttää localStorage:ia tietojen tallennukseen. Tuotantokäytössä tarvitaan oikea backend-järjestelmä ja tietokanta.

