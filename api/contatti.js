/**
 * =============================================================================
 * ZAIRA OFFICINA — api/contatti.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Vercel Serverless Function — riceve il form contatti e invia la mail
 * tramite Resend (https://resend.com).
 *
 * SETUP (una volta sola):
 *   1. Vai su resend.com → crea account gratuito
 *   2. Dashboard → API Keys → "Create API Key"
 *   3. Su Vercel → Settings → Environment Variables → aggiungi:
 *        Nome:  RESEND_API_KEY
 *        Valore: re_xxxxxxxxxxxx  (la chiave che ti ha dato Resend)
 *   4. Su Vercel → Settings → Environment Variables → aggiungi:
 *        Nome:  CONTACT_EMAIL
 *        Valore: richieste.zairaoficina@gmail.com
 *   5. Redeploy — fatto.
 *
 * In locale per testare:
 *   Crea un file .env.local nella root con:
 *     RESEND_API_KEY=re_xxxxxxxxxxxx
 *     CONTACT_EMAIL=richieste.zairaoficina@gmail.com
 * =============================================================================
 */

export default async function handler(req, res) {

  // ── Solo POST ──────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metodo non consentito' });
  }

  // ── Leggi i campi dal body ─────────────────────────────────────────────
  const { attivita, contatto, tipo, messaggio } = req.body;

  // Validazione minima
  if (!attivita || !contatto) {
    return res.status(400).json({ error: 'Campi obbligatori mancanti' });
  }

  // Mappa il valore del select in testo leggibile
  const tipoLabel = {
    'nuovo':       'Sito nuovo da zero',
    'rifacimento': 'Rifacimento sito esistente',
    'ecommerce':   'E-commerce',
    'non-so':      'Non so ancora — parliamone',
  }[tipo] || 'Non specificato';

  // ── Componi la mail ────────────────────────────────────────────────────
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #111008; color: #f0ede6; padding: 2rem; border-radius: 4px;">
      
      <div style="border-bottom: 2px solid #e8a227; padding-bottom: 1rem; margin-bottom: 1.5rem;">
        <h2 style="color: #e8a227; margin: 0; font-size: 1.4rem; letter-spacing: 0.05em;">
          ZAIRA<span style="color:#f0ede6">.</span>OFFICINA
        </h2>
        <p style="color: #6b6858; margin: 0.3rem 0 0; font-size: 0.8rem; letter-spacing: 0.15em; text-transform: uppercase;">
          Nuova richiesta dal sito
        </p>
      </div>

      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #6b6858; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; width: 35%;">Attività</td>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #f0ede6; font-size: 0.95rem;">${escapeHtml(attivita)}</td>
        </tr>
        <tr>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #6b6858; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Contatto</td>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #e8a227; font-size: 0.95rem;">${escapeHtml(contatto)}</td>
        </tr>
        <tr>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #6b6858; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Tipo</td>
          <td style="padding: 0.8rem 0; border-bottom: 1px solid #2a2820; color: #f0ede6; font-size: 0.95rem;">${escapeHtml(tipoLabel)}</td>
        </tr>
        ${messaggio ? `
        <tr>
          <td style="padding: 0.8rem 0; color: #6b6858; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top; padding-top: 1rem;">Messaggio</td>
          <td style="padding: 0.8rem 0; color: #f0ede6; font-size: 0.95rem; line-height: 1.6; padding-top: 1rem;">${escapeHtml(messaggio).replace(/\n/g, '<br>')}</td>
        </tr>` : ''}
      </table>

      <div style="margin-top: 2rem; padding: 1rem; background: #1a1a12; border-left: 3px solid #e8a227;">
        <p style="margin: 0; color: #6b6858; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">Ricevuta il</p>
        <p style="margin: 0.3rem 0 0; color: #f0ede6; font-size: 0.85rem;">${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}</p>
      </div>

    </div>
  `;

  // ── Invia con Resend ───────────────────────────────────────────────────
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type':  'application/json',
      },
      body: JSON.stringify({
        from:    'Zaira Officina <noreply@zairaofficina.it>',
        to:      [process.env.CONTACT_EMAIL || 'richieste.zairaoficina@gmail.com'],
        subject: `Nuova richiesta da ${attivita}`,
        html:    emailHtml,
        // Reply-to: se il contatto è una mail, rispondi direttamente al cliente
        reply_to: contatto.includes('@') ? contatto : undefined,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Errore invio mail' });
    }

    return res.status(200).json({ ok: true });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Errore server' });
  }
}

// Sanitizzazione HTML base per evitare XSS nel corpo della mail
function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
