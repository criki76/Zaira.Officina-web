# Zaira Officina — Documentazione Progetto

## Struttura file

```
zaira-officina/
│
├── index.html              ← HTML della pagina (solo struttura, niente stili inline)
│
├── css/
│   ├── variables.css       ← 🎨 DESIGN TOKENS — colori, font, spaziature
│   ├── base.css            ← Reset CSS, body, overlay rumore, utility globali
│   ├── nav.css             ← Barra di navigazione fissa
│   ├── hero.css            ← Prima sezione (titolo animato + stat-blocks)
│   ├── components.css      ← Bottoni, form, elementi riutilizzabili
│   ├── sections.css        ← Tutte le sezioni: strip, manifesto, processo,
│   │                          prezzi, recensioni, contatti, footer
│   ├── animations.css      ← @keyframes + classe .is-visible per scroll-in
│   └── responsive.css      ← Media queries (tablet < 900px, mobile < 600px)
│
└── js/
    └── main.js             ← Form handler + animazioni scroll via IntersectionObserver
```

---

## Modifiche comuni

### Cambiare un colore
Apri `css/variables.css` e modifica la variabile corrispondente.
Tutti i file CSS usano `var(--nome)` — basta cambiare il valore in un posto solo.

```css
/* Prima */
--accent: #e8a227;

/* Dopo */
--accent: #3b82f6;  /* blu, ad esempio */
```

### Cambiare email o numero WhatsApp
Cerca `✏️` in `index.html` — ogni punto modificabile è segnalato.

```html
<a href="mailto:ciao@zaira-officina.it">ciao@zaira-officina.it</a>
<a href="https://wa.me/39XXXXXXXXXX">+39 XXX XXX XXXX</a>
```

### Aggiungere una voce di menu
In `index.html`, dentro `<ul class="nav-links">`:
```html
<li><a href="#nuova-sezione">Nuova voce</a></li>
```

### Aggiungere una recensione
Duplica un blocco `<article class="review-card">` in `index.html`.
La griglia si adatta automaticamente (fino a 3 colonne su desktop).

### Cambiare un prezzo
Trova `<div class="price-tag">` nella sezione prezzi di `index.html` e aggiorna il testo.

### Collegare il form a un backend reale
Apri `js/main.js` e sostituisci il blocco `setTimeout` con una chiamata `fetch`:

```javascript
fetch('/api/contatti', { method: 'POST', body: new FormData(form) })
  .then(res => res.ok ? onSuccess() : onError())
  .catch(onError);
```

### Aggiungere un principio al Manifesto
Duplica un `<article class="manifesto-card">` nella sezione `#manifesto`.

### Modificare lo status disponibilità
Nel footer della sezione contatti:
```html
<!-- Disponibili -->
<span class="contact-status-dot">●</span> Accettiamo nuovi progetti

<!-- Non disponibili — cambia colore in CSS/variables se serve -->
<span>○</span> Lista d'attesa aperta
```

---

## Animazioni scroll-in
Gli elementi con `opacity: 0` nelle CSS ricevono la classe `.is-visible` quando
entrano nel viewport. La lista degli elementi animati si trova in `js/main.js`:

```javascript
const ANIMATED_SELECTORS = [
  '.manifesto-card',
  '.step',
  '.review-card',
  '.price-card',
];
```

Per aggiungere un nuovo elemento animato: aggiungi il suo selettore qui,
e in `css/sections.css` aggiungi al suo stile base:
```css
.nuovo-elemento {
  opacity: 0;
  transform: translateY(30px);
}
```

---

## Ordine dei CSS (non modificare)
L'ordine di `<link>` in `index.html` è importante:
1. `variables.css` — deve essere primo (gli altri dipendono dalle variabili)
2. `base.css`
3. Componenti specifici
4. `animations.css` — deve venire dopo `sections.css` (`.is-visible` sovrascrive `opacity:0`)
5. `responsive.css` — deve essere ultimo (sovrascrive tutto)
