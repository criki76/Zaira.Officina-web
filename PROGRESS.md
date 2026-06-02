# PROGRESS.md — Zaira Officina
# Aggiornato: Giugno 2026
# Leggi CONTEXT.md per il quadro completo del progetto.

---

## ⏸ IN ATTESA — ATTIVAZIONE P.IVA

Queste modifiche vanno fatte **dopo conferma di Loris Ricci** con numero P.IVA reale.

| File | Cosa fare | Dove |
|------|-----------|------|
| `pages/fornitura-termini.html` | Sostituire footer disclaimer "prestazione occasionale art. 2222 c.c." con "Zaira Officina — P.IVA [numero] — Regime forfettario L. 190/2014" | `<div class="footer-disclaimer">` |
| `pages/privacy.html` | Aggiornare riga "Regime fiscale" in tabella titolare | `<td>Regime fiscale</td>` |
| `pages/sito-attivo-termini.html` | Aggiungere Art. 19 — Regime fiscale e fatturazione (testo già pronto nel documento v1.6) | Dopo `<!-- Art. 19 — SOSPESO -->` |
| `index.html` (footer) | Aggiornare footer sito principale con P.IVA | Da verificare |

---

## ✅ COMPLETATO — Giugno 2026

### `pages/fornitura-termini.html`
- [x] Bug `getElementById('progress')` — verificato, elemento presente a riga 695
- [x] **s06** — aggiunto silenzio-assenso (7 giorni lavorativi per bozze)
- [x] **s09** — aggiunta manleva del cliente per contenuti forniti
- [x] **s12** — aggiunto cap responsabilità (importo corrispettivi pagati, no danni indiretti)
- [x] **s07** — aggiunto `<p class="consegna-disclaimer">` sotto ogni card tempi; stile in `css/components.css`

### `pages/privacy.html`
- [x] Email uniformata da `richieste.zairaofficina@gmail.com` → `info@zairaofficina.it` (tutte le occorrenze)
- [x] **Sezione 05** — aggiunto Resend Inc. (USA) come terza parte con link privacy policy

### `pages/sito-attivo-termini.html` — v1.6 (31 articoli)
- [x] Versione aggiornata da 1.1 → 1.6, articoli 26 → 31
- [x] Sidebar aggiornato a 31 voci
- [x] **Art. 03** — Perimetro del sito incluso (nuovo)
- [x] **Art. 08** — Tempi di consegna e obblighi del cliente (nuovo)
- [x] **Art. 09** — Approvazione e silenzio-assenso (nuovo)
- [x] **Art. 10** — Modalità di accettazione (nuovo)
- [x] **Art. 02** — aggiunto: condizioni economiche variabili, prevale accordo individuale
- [x] **Art. 07** — aggiunto: sub-responsabili su richiesta, paragrafo dominio già esistente
- [x] **Art. 15** — aggiunta manleva esplicita del cliente
- [x] **Art. 18** — aggiunta riga fatturazione secondo regime fiscale applicabile
- [x] **Art. 20** — aggiunta: sospensione non = rinuncia canoni periodo minimo
- [x] **Art. 21** — corretto riferimento Art. 4 → Art. 5; recesso ZO con 60 giorni espliciti
- [x] **Art. 24** — cap responsabilità completo (12 mesi canoni, esclusione danni indiretti)
- [x] **Art. 25** — aggiunto: form/email transazionale, approvazione privacy via PEC
- [x] **Art. 27** — aggiunta PEC `cristianvitali@pec.it` tra i canali ufficiali
- [x] **Art. 30** — aggiunto impegno Zaira a non pubblicare info riservate
- [x] Blocco firme aggiunto (prima firma + doppia firma artt. 1341–1342 c.c., 15 clausole)
- [x] CSS `.firma-*` aggiunto nel `<style>` della pagina, responsive mobile

---

## 🔲 BACKLOG — Da fare (nessuna dipendenza da P.IVA)

### Spazio Séi — spazioseiterapie.it
- [ ] Pannello admin locale per inserire nuovi "Pensieri"
  - Form HTML → genera blocco JSON + pagina statica
  - Stack: XAMPP `http://localhost/spaziosei2.0/`

### Le Bolle
- [ ] Preventivo da formalizzare: €1.200 + €149 att. + €49/mese
- [ ] Sito da avviare (selettore profumi ~200 fragranze, filtri URL, hero AI, WhatsApp flow)

### Generali
- [ ] Verificare con Loris Ricci: ATECO web design e apertura P.IVA — data prevista?
- [ ] Controllare footer `index.html` — contiene ancora "prestazione occasionale"?
- [ ] Aggiornare `hero-meta` in `fornitura-termini.html` (Versione: Aprile 2026 → valutare aggiornamento data)
