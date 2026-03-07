/**
 * =============================================================================
 * ZAIRA OFFICINA — main.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Responsabilità:
 *   1. Hamburger menu mobile (toggle overlay)
 *   2. Gestione invio form contatti (feedback visivo)
 *   3. Animazioni scroll-in via IntersectionObserver
 *
 * ✏️  Per aggiungere nuovi elementi animati al scroll:
 *     Aggiungi il selettore all'array ANIMATED_SELECTORS.
 * ✏️  Per collegare il form a un backend reale:
 *     Sostituisci il blocco "TODO: invio reale" in handleContactForm().
 * =============================================================================
 */

'use strict';

/* ─── CONFIGURAZIONE ────────────────────────────────────────────────────── */

const ANIMATED_SELECTORS = [
  '.manifesto-card',
  '.step',
  '.review-card',
  '.price-card',
  '.pricing-bundle',
  '.portfolio-card',
];

const OBSERVER_OPTIONS = {
  threshold: 0.12,
};

const FORM_RESET_DELAY = 3000;


/* ─── HAMBURGER MENU ────────────────────────────────────────────────────── */

/**
 * Inizializza il toggle del menu mobile.
 * Aggiunge/rimuove .is-open su .hamburger e .nav-mobile-menu.
 * Chiude automaticamente quando si clicca un link interno.
 */
function initHamburger() {
  const hamburger   = document.querySelector('.hamburger');
  const mobileMenu  = document.querySelector('.nav-mobile-menu');

  if (!hamburger || !mobileMenu) return;

  // Toggle aperto/chiuso
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    mobileMenu.classList.toggle('is-open', isOpen);

    // Blocca lo scroll del body quando il menu è aperto
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Accessibilità
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Chiudi cliccando un link del menu
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Chiudi premendo ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  function closeMenu() {
    hamburger.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  }
}


/* ─── FORM CONTATTI ─────────────────────────────────────────────────────── */

function handleContactForm(event) {
  event.preventDefault();

  const form = event.target;
  const btn  = form.querySelector('.form-submit');

  if (!btn) return;

  btn.disabled    = true;
  btn.textContent = 'Invio in corso…';

  // ── VERCEL SERVERLESS FUNCTION ─────────────────────────────────────────
  // Chiama api/contatti.js che gira su Vercel e invia la mail via Resend.
  // Nessuna configurazione qui — tutto si gestisce nelle env variables di Vercel.
  // ──────────────────────────────────────────────────────────────────────
  const data = {
    attivita: form.attivita?.value  || '',
    contatto: form.contatto?.value  || '',
    tipo:     form.tipo?.value      || '',
    messaggio: form.messaggio?.value || '',
  };

  fetch('/api/contatti', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  })
    .then((res) => res.ok ? onSuccess() : onError())
    .catch(onError);

  function onSuccess() {
    btn.classList.add('is-sent');
    btn.textContent = '✓ Messaggio inviato!';

    setTimeout(() => {
      btn.classList.remove('is-sent');
      btn.textContent = 'Invia messaggio →';
      btn.disabled    = false;
      form.reset();
    }, FORM_RESET_DELAY);
  }

  function onError() {
    btn.disabled    = false;
    btn.textContent = 'Errore — riprova';
    btn.style.background = '#8b2020';
    btn.style.color      = '#fff';

    setTimeout(() => {
      btn.style.background = '';
      btn.style.color      = '';
      btn.textContent      = 'Invia messaggio →';
    }, FORM_RESET_DELAY);
  }
}


/* ─── ANIMAZIONI SCROLL-IN ──────────────────────────────────────────────── */

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, OBSERVER_OPTIONS);

  ANIMATED_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      observer.observe(el);
    });
  });
}


/* ─── BANNER COOKIE ─────────────────────────────────────────────────────── */

function initCookieBanner() {
  const banner  = document.querySelector('#cookie-banner');
  const btnOk   = document.querySelector('#cookie-accept');
  const btnNo   = document.querySelector('#cookie-reject');

  if (!banner) return;

  // Se l'utente ha già scelto, non mostrare il banner
  if (localStorage.getItem('cookie_consent')) return;

  // Mostra il banner con piccolo ritardo per evitare flash all'avvio
  setTimeout(() => banner.classList.add('is-visible'), 600);

  function dismiss(choice) {
    localStorage.setItem('cookie_consent', choice);
    banner.classList.remove('is-visible');
    // Rimuove dal DOM dopo la transizione
    setTimeout(() => banner.remove(), 400);
  }

  if (btnOk) btnOk.addEventListener('click', () => dismiss('accepted'));
  if (btnNo) btnNo.addEventListener('click', () => dismiss('rejected'));
}


/* ─── INIT ──────────────────────────────────────────────────────────────── */

function init() {
  // Anno dinamico nel footer
  const footerYear = document.querySelector('#footer-year');
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Hamburger menu mobile
  initHamburger();

  // Form contatti
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactForm);
  }

  // Animazioni scroll
  initScrollAnimations();

  // Banner cookie GDPR
  initCookieBanner();
}

document.addEventListener('DOMContentLoaded', init);
