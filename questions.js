// Shared question schema — loaded by both index.html and dashboard.html
// Likert scale: 5 = Helemaal eens ... 1 = Helemaal niet eens

const LIKERT_LABELS = ['Helemaal eens', 'Eens', 'Min of meer eens', 'Niet eens', 'Helemaal niet eens'];
const LIKERT_VALUES = [5, 4, 3, 2, 1];

const QUESTIONS = [
  // ── SECTION 1: Profiel ──────────────────────────────────────────────────
  {
    id: 'q1', label: 'V1', section: 1, type: 'radio',
    text: 'Wat is uw leeftijdscategorie?',
    options: [
      { v: 'a', l: '18-25 jaar' },
      { v: 'b', l: '26-35 jaar' },
      { v: 'c', l: '36-50 jaar' },
      { v: 'd', l: '51 jaar of ouder' }
    ]
  },
  {
    id: 'q2', label: 'V2', section: 1, type: 'radio',
    text: 'Hoe omschrijft u uw geslacht?',
    options: [
      { v: 'a', l: 'Man' },
      { v: 'b', l: 'Vrouw' },
      { v: 'c', l: 'Andere / geen voorkeur' }
    ]
  },
  {
    id: 'q3', label: 'V3', section: 1, type: 'radio',
    text: 'Hoe vaak kookt u thuis?',
    options: [
      { v: 'a', l: 'Bijna nooit (minder dan 1x/week)' },
      { v: 'b', l: 'Af en toe (1-3x/week)' },
      { v: 'c', l: 'Regelmatig (4-6x/week)' },
      { v: 'd', l: 'Elke dag' }
    ]
  },
  {
    id: 'q4', label: 'V4', section: 1, type: 'radio',
    text: 'Hoeveel geeft u maandelijks uit aan premium of artisanale voedingsproducten?',
    options: [
      { v: 'a', l: 'Minder dan \u20ac10' },
      { v: 'b', l: '\u20ac10-25' },
      { v: 'c', l: '\u20ac26-50' },
      { v: 'd', l: 'Meer dan \u20ac50' }
    ]
  },

  // ── SECTION 2: Aankoopgedrag ─────────────────────────────────────────────
  {
    id: 'q5', label: 'V5', section: 2, type: 'likert',
    text: 'Ik koop regelmatig speciale of artisanale sauzen en condimenten.'
  },
  {
    id: 'q6', label: 'V6', section: 2, type: 'likert',
    text: 'Bij de aankoop van sauzen is smaakkwaliteit voor mij belangrijker dan de prijs.'
  },
  {
    id: 'q7', label: 'V7', section: 2, type: 'likert',
    text: 'Ik betaal bewust meer voor een product met een duidelijk herkomstverhaal (bijv. gemaakt door een familiebedrijf).'
  },
  {
    id: 'q8', label: 'V8', section: 2, type: 'likert',
    text: 'Ik lees etiketten en zoek bewust naar informatie over de herkomst van een product.'
  },
  {
    id: 'q9', label: 'V9', section: 2, type: 'likert',
    text: 'Ik koop sauzen en condimenten het vaakst in een speciaalzaak of delicatessenwinkel.'
  },

  // ── SECTION 3: Smaakbeleving & umami ────────────────────────────────────
  {
    id: 'q10', label: 'V10', section: 3, type: 'likert',
    text: 'Ik eet graag pittige of scherpe gerechten.'
  },
  {
    id: 'q11', label: 'V11', section: 3, type: 'likert',
    text: 'Ik ben vertrouwd met de smaakterm "umami" en kan die herkennen in gerechten.'
  },
  {
    id: 'q12', label: 'V12', section: 3, type: 'likert',
    text: 'Een chilisaus met een diepe, hartige smaak (umami) spreekt mij meer aan dan een saus die enkel scherp is.'
  },
  {
    id: 'q13', label: 'V13', section: 3, type: 'likert',
    text: 'Ik koop regelmatig gefermenteerde producten (kimchi, miso, kombucha, gefermenteerde sauzen) omdat ik de smaak interessant vind.'
  },
  {
    id: 'q14', label: 'V14', section: 3, type: 'likert',
    text: 'Een saus met een complexe, gelaagde smaak is voor mij interessanter dan een saus met een eenvoudige smaak.'
  },

  // ── SECTION 4: Productperceptie ──────────────────────────────────────────
  {
    id: 'q15', label: 'V15', section: 4, type: 'likert',
    text: 'Een saus van een klein artisanaal familiebedrijf heeft voor mij meer waarde dan een merksaus uit de supermarkt.'
  },
  {
    id: 'q16', label: 'V16', section: 4, type: 'likert',
    text: 'Als een artisanale saus een duidelijke link heeft met een gerenommeerd merk (bijv. een brouwerij of wijndomein), wekt dat extra vertrouwen bij mij.'
  },
  {
    id: 'q17', label: 'V17', section: 4, type: 'likert',
    text: 'De verpakking en het ontwerp van een saus beinvloeden mijn beslissing om het te kopen.'
  },
  {
    id: 'q18', label: 'V18', section: 4, type: 'likert',
    text: 'Ik geef de voorkeur aan een saus met een beperkt aantal herkendbare ingredienten boven een saus met veel additieven.'
  },

  // ── SECTION 5: Betalingsbereidheid ──────────────────────────────────────
  {
    id: 'q19', label: 'V19', section: 5, type: 'likert',
    text: 'Ik ben bereid \u20ac8-10 te betalen voor een fles artisanale premium chilisaus als de kwaliteit uitzonderlijk is.'
  },
  {
    id: 'q20', label: 'V20', section: 5, type: 'likert',
    text: 'Ik zou een artisanale premium chilisaus kopen als een chef, restaurant of foodspecialist die aanbeveelt.'
  },
  {
    id: 'q21', label: 'V21', section: 5, type: 'price',
    text: 'U staat voor de keuze in de winkel. Welke optie kiest u voor een chilisaus van ca. 120 ml?',
    options: [
      { v: 'a', l: 'Standaard merksaus', sub: 'Gekend merk, supermarkt, klassiek pittig', price: '\u20ac3-4' },
      { v: 'b', l: 'Ambachtelijke Belgische saus', sub: 'Klein bedrijf, lokale ingredienten, speciaalzaak', price: '\u20ac6-8' },
      { v: 'c', l: 'Artisanale umami-chilisaus van een familiebedrijf', sub: 'Gefermenteerd, complex smaakprofiel, beperkte oplage, duidelijk herkomstverhaal', price: '\u20ac10-12' }
    ]
  },
  {
    id: 'q22', label: 'V22', section: 5, type: 'radio',
    text: 'Als u zou kiezen voor de artisanale umami-chilisaus, waar koopt u hem dan het liefst?',
    options: [
      { v: 'a', l: 'In een delicatessen- of speciaalzaak' },
      { v: 'b', l: 'Online, rechtstreeks bij de producent' },
      { v: 'c', l: 'In een kwaliteitssupermarkt (bijv. Delhaize, biologische winkels)' },
      { v: 'd', l: 'In een horecazaak of restaurant als meeneemsouvenirproduct' },
      { v: 'e', l: 'Ik zou dit product niet kopen' }
    ]
  },

  // ── SECTION 6: Koopintentie ──────────────────────────────────────────────
  {
    id: 'q23', label: 'V23', section: 6, type: 'likert',
    text: 'Ik zou een artisanale umami-chilisaus uitproberen als ik hem tegenkom in een speciaalzaak.'
  },
  {
    id: 'q24', label: 'V24', section: 6, type: 'likert',
    text: 'Ik zou een artisanale umami-chilisaus kopen als cadeau voor een foodliefhebber.'
  },
  {
    id: 'q25', label: 'V25', section: 6, type: 'likert',
    text: 'Als ik de saus lekker vind, zou ik hem aanbevelen aan vrienden of familie.'
  },
  {
    id: 'q26', label: 'V26', section: 6, type: 'likert',
    text: 'Als de saus mij bevalt, zou ik hem regelmatig (minstens 1x/maand) aankopen.'
  },
  {
    id: 'q27', label: 'V27', section: 6, type: 'likert',
    text: 'Ik zou een online bestelling plaatsen bij de producent als de saus niet in mijn buurt verkrijgbaar is.'
  }
];

const SECTIONS = [
  { num: 1, title: 'Uw profiel',                      desc: 'Enkele algemene vragen over uw achtergrond en voedingsgewoonten.' },
  { num: 2, title: 'Aankoopgedrag bij sauzen',         desc: 'In welke mate bent u het eens met de volgende stellingen over uw sauzen- en condimentenaankopen?' },
  { num: 3, title: 'Smaakbeleving en umami',           desc: 'Umami is de vijfde basissmaak: de diepe, hartige smaak van ingredienten zoals sojasaus, miso, gefermenteerde producten en gerijpte kazen.' },
  { num: 4, title: 'Productperceptie en merkpositionering', desc: 'In welke mate bent u het eens met de volgende stellingen over artisanale producten en merkidentiteit?' },
  { num: 5, title: 'Betalingsbereidheid',              desc: 'Deze sectie peilt naar de prijs die u bereid bent te betalen voor een artisanale premium chilisaus (fles van ca. 120 ml).' },
  { num: 6, title: 'Koopintentie',                     desc: 'In welke mate bent u het eens met de volgende stellingen over uw aankoopgedrag voor dit type product?' }
];
