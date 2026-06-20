# CONTEXT.md — Zaira Officina
# Leggi questo file prima di fare qualsiasi modifica al progetto.
# Aggiornato: Giugno 2026

---

## CHI SEI E CON CHI LAVORI

Stai lavorando con **Cristian Vitali** — artigiano digitale, Forlimpopoli (FC).
- Email: criki76@gmail.com — PEC: cristianvitali@pec.it
- Attività: **Zaira Officina** (zairaofficina.it) — siti web per attività locali (artigiani, ristoranti, negozi, professionisti), provincia Forlì-Cesena
- Stack: HTML/CSS/JS vanilla, Vercel (deploy), Aruba (DNS/domini), Resend API (form email)
- P.IVA attiva: **04871150407** — Cristian Vitali — ATECO 62.10.00 — regime forfettario — inizio attività 15/06/2026 — commercialista: Loris Ricci

---

## REGOLE OPERATIVE — NON NEGOZIABILI

1. **CSS mai inline** — sempre in stylesheet separati
2. **Una property CSS per riga** — no dichiarazioni compatte
3. **Codice sempre commentato** — blocchi puliti e finali
4. **Indicare sempre il nome del file** su cui si lavora
5. **Massima sincerità** — errori dichiarati subito, mai inventare dati
6. **Prima di affermare prezzi o funzionalità di piattaforme esterne** — verificare sempre
7. **Prima di consegnare un file** — verificare struttura HTML completa, nessun placeholder rimasto
8. **Risposte brevi e dirette** — niente giri di parole

---

## DESIGN SYSTEM ZAIRA OFFICINA

```css
/* Palette principale */
--bg:       #111008;
--bg2:      #181510;
--accent:   #e8a227;
--text:     #e8e4d9;
--muted:    #7a7567;
--border:   rgba(232, 162, 39, 0.18);

/* Font */
/* Display:  Barlow Condensed 900 — titoli, label, button */
/* Body:     Barlow 300/400 — testi */
/* Mono:     Courier Prime — label tecnici, meta, codice */
```

**Filosofia UI:** bellezza al servizio della conversione. Se un elemento è bello ma non aiuta l'utente a compiere un'azione, va tolto.

---

## FILOSOFIA ZAIRA OFFICINA (10 punti manifesto)

1. Semplice è professionale
2. La velocità è rispetto
3. Mobile prima di tutto
4. Ogni pagina ha uno scopo
5. Chiarezza: cosa offri, quanto costa, come contattarti, dove trovarti
6. Design trasmette fiducia, non ego
7. Bellezza senza conversione è arredamento digitale
8. Tecnologia leggera, controllo totale
9. Il cliente deve poter gestire il sito senza paura
10. Fatto bene una volta, dura anni

---

## CHECKLIST VELOCITÀ (obbligatoria ogni sito)

- Font self-hosted in `/fonts/` con `@font-face swap`, solo pesi usati
- CSS: un solo file in produzione
- Immagini: AVIF+WebP, hero `fetchpriority=high` + preload, lazy + w/h espliciti, hero ≤150KB, content ≤80KB, srcset mobile
- JS: `defer` o fine body, no jQuery/Bootstrap
- Maps: lazy
- Go-live: PageSpeed Mobile ≥90, Desktop ≥95

---

## PREZZI ATTIVI (Giugno 2026)

### Servizio Sito Attivo (abbonamento)
- Attivazione: €149 una tantum
- Canone standard: €49/mese
- Canone complesso (es. editoriale): €79/mese
- Durata minima: 12 mesi
- Credito rent-to-own: €10/mese → riscatto finale a €360

### Piani una tantum
- Sito Vetrina: €690 (consegna 5–7gg lavorativi)
- Sito per Farti Scegliere: €990 (consegna 7–10gg lavorativi)
- Bundle Sito + Google Business: €1.190 (consegna 7–10gg lavorativi)
- Visibilità Locale (solo Google Business): €390 (consegna 48–72h)
- Manutenzione post-consegna opzionale: €29/mese

---

## DOCUMENTI LEGALI — STATO ATTUALE

### Termini e Condizioni Sito Attivo
- **Versione corrente: v1.6** (file: `termini-condizioni-v1.6.docx`)
- 31 articoli, doppia firma artt. 1341-1342 c.c. su 15 clausole
- Art. 08: tempi consegna variabili per piano, decorrono dalla ricezione materiali
- Art. 17: regime forfettario L. 190/2014
- Art. 24: cap responsabilità ai 12 mesi di canone, esclusi danni indiretti

### Nomina Responsabile Trattamento (GDPR art. 28)
- **Versione corrente: v1.1** (file: `nomina-responsabile-trattamento-v1.1.docx`)
- Sub-responsabili dichiarati: Vercel, Aruba, Resend (ove utilizzati)
- Trasferimenti extra-UE: SCC + misure supplementari artt. 44 ss. GDPR
- Audit: preavviso 15gg lavorativi, modalità ragionevoli, costi extra a carico Titolare

### Informativa Privacy Cliente (GDPR art. 13)
- **Versione corrente: v1.1** (file: `informativa-privacy-cliente-v1.1.docx`)
- Trattamento dati del cliente come controparte contrattuale
- Conservazione: 10 anni per dati fiscali, 12 mesi per contatti senza esito

---

## FILE HTML SUL SITO — MODIFICHE PENDENTI

### `pages/fornitura-termini.html` — Condizioni fornitura una tantum

**Bug noto:**
- `getElementById('progress')` — elemento `.scroll-progress` presente nel CSS ma potrebbe mancare nell'HTML → verificare

**Modifiche da fare:**

1. **Footer disclaimer** — rimuovere quando P.IVA attiva:
   ```
   "Collaborazioni svolte come prestazione occasionale ai sensi dell'art. 2222 c.c."
   ```
   Sostituire con:
   ```
   "Zaira Officina — P.IVA [numero] — Regime forfettario L. 190/2014"
   ```

2. **Sezione s06 (Revisioni)** — aggiungere silenzio-assenso:
   > Bozze, grafiche e versioni intermedie inviate al cliente si intendono approvate se non vengono formulate osservazioni scritte entro 7 giorni lavorativi dall'invio. L'approvazione tacita non esonera il cliente dalla responsabilità per errori nei contenuti di propria competenza.

3. **Sezione s09 (Contenuti del cliente)** — aggiungere manleva:
   > Il cliente si impegna a manlevare e tenere indenne Zaira Officina da qualsiasi richiesta, sanzione, danno o contestazione di terzi derivante da contenuti, immagini, marchi, testi o dati personali forniti dal cliente stesso.

4. **Sezione s12 (Responsabilità)** — aggiungere cap:
   > Salvo dolo o colpa grave, la responsabilità complessiva di Zaira Officina non potrà eccedere l'importo dei corrispettivi effettivamente pagati dal cliente per il progetto in questione. Sono esclusi danni indiretti, perdita di profitto, perdita di chance e danni reputazionali.

5. **Sezione s07 (Tempi di consegna)** — aggiungere sotto ogni card:
   ```html
   <p class="consegna-disclaimer">// salvo disponibilità materiali dal cliente</p>
   ```

### `pages/privacy.html` — Privacy Policy sito

**Modifiche da fare:**

1. **Tabella titolare (sezione 01)** — riga "Regime fiscale":
   - Attuale: `"Prestazione occasionale ai sensi dell'art. 2222 c.c."`
   - Sostituire con: `"Regime forfettario ai sensi dell'art. 1, L. 190/2014"` (quando P.IVA attiva)

2. **Email di contatto** — attualmente usa `richieste.zairaofficina@gmail.com`
   - Valutare se uniformare a `info@zairaofficina.it`
   - Verificare con Cristian quale email vuole esporre per le richieste privacy

3. **Sezione 05 (Condivisione dati con terze parti)** — aggiungere Resend:
   ```html
   <li><strong>Resend Inc. (USA)</strong> — servizio email transazionale utilizzato per
   il recapito dei messaggi inviati tramite il modulo di contatto.
   I dati inseriti nel form vengono trasmessi tramite Resend esclusivamente
   per la consegna del messaggio al destinatario.
   Consulta la <a href="https://resend.com/legal/privacy-policy"
   target="_blank" rel="noopener">Privacy Policy di Resend</a></li>
   ```

---

## CLIENTI ATTIVI (progetti in corso)

### Spazio Séi — spazioseiterapie.it
- Terapiste: Chiara Baldassarri, Silvia Cesario, Laura De Marsiliis, Simonetta Guaglione, Stefania Mainolfi, Mariana Marquez Inostroza
- Email: spazioseiterapie@gmail.com — Sede: Viale Risorgimento 19, Forlì (primo piano)
- Stack locale: XAMPP `http://localhost/spaziosei2.0/`
- Deploy: Vercel
- CSS modulare: `variables.css → base.css → components.css → sections.css`
- Palette: `--cream`, `--terracotta #2D6E6E`, `--sage`, `--blush`, `--dark`
- Font: Cormorant Garamond + DM Sans 300
- **Pendente:** pannello admin locale per inserire nuovi "Pensieri" (form HTML → blocco JSON + pagina statica)

### Le Bolle — negozio sfuso Forlimpopoli
- Account Vercel separato (non Pro)
- Features: selettore profumi con ricerca live (~200 fragranze), filtri URL per categoria, hero AI full-width, WhatsApp order flow
- Preventivo: €1.200 una tantum + €149 attivazione + €49/mese

---

## INFRASTRUTTURA TECNICA

- **Hosting/Deploy:** Vercel (account separato per ogni cliente)
- **DNS/Domini:** Aruba
- **Form email:** Resend API
- **Email Zaira:** info@zairaofficina.it (ImprovMX + Gmail SMTP)
- **Gmail operativo:** richieste.zairaofficina@gmail.com (singola "f" in "officina")
- **Pipeline:** VSCode → GitHub → Vercel

---

## NOTE FISCALI (IMPORTANTE)

- P.IVA attiva: 04871150407 — Cristian Vitali — regime forfettario
- ATECO: 62.10.00 (Programmazione informatica)
- Data inizio attività: 15/06/2026
- Commercialista: Loris Ricci
- I contratti vanno firmati con P.IVA, non più con nome/CF
- Footer sito, privacy.html, fornitura-termini.html, sito-attivo-termini.html già aggiornati (16/06/2026)

---

## COME LAVORARE CON QUESTO PROGETTO

1. Leggi sempre questo file prima di modificare qualsiasi cosa
2. Per ogni modifica: indica il file, mostra solo il blocco da cambiare, non riscrivere tutto
3. Se una modifica tocca la parte legale: segnala sempre che va verificata con Loris Ricci
4. Mai modificare `main.min.css` direttamente — lavorare sui CSS sorgente
5. Testa sempre su mobile prima di dichiarare una modifica completata
