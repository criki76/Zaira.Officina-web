#!/usr/bin/env bash
#
# build-css.sh — genera css/main.min.css concatenando e minificando i sorgenti.
#
# index.html carica un solo foglio di stile (css/main.min.css): questo script
# e' l'unico modo corretto di aggiornarlo. Non modificare mai main.min.css a mano.
#
# L'ORDINE dei file e' significativo: le regole piu' in basso vincono a parita'
# di specificita'. In particolare responsive.css deve restare per ultimo, perche'
# contiene le media query che sovrascrivono tutto il resto.
#
# Uso:  ./build-css.sh
#
set -euo pipefail

cd "$(dirname "$0")/css"

# I 12 sorgenti che compongono main.min.css, in ordine di concatenazione.
# NB: analisi-economica.css e sito-attivo.css sono esclusi di proposito:
# vengono caricati singolarmente dalle rispettive pagine, non dalla home.
SOURCES=(
    fonts.css         # @font-face — devono venire per primi
    variables.css     # custom properties :root (design system)
    base.css          # reset e tipografia di base
    nav.css           # navigazione desktop + mobile
    components.css    # bottoni, form, elementi riusabili
    hero.css          # sezione hero della home
    sections.css      # sezioni della home (processo, portfolio, manifesto...)
    pricing.css       # sezione prezzi (.pz-*)
    service-page.css  # pagine servizio (.gb-*)
    animations.css    # keyframes e stati di animazione
    cookie.css        # banner cookie
    responsive.css    # media query — SEMPRE per ultimo
)

# Verifica che tutti i sorgenti esistano prima di scrivere l'output,
# cosi' un refuso nel nome non produce un CSS monco.
for f in "${SOURCES[@]}"; do
    if [[ ! -f "$f" ]]; then
        echo "build-css.sh: sorgente mancante: css/$f" >&2
        exit 1
    fi
done

python3 - "${SOURCES[@]}" <<'PYTHON' > main.min.css.tmp
import re
import sys


def minify(css):
    """Minificazione conservativa: toglie commenti e spazi non significativi."""
    # 1. commenti /* ... */ (anche multiriga)
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
    # 2. qualsiasi sequenza di spazi/a capo diventa un singolo spazio
    css = re.sub(r'\s+', ' ', css)
    # 3. via lo spazio attorno ai separatori strutturali
    css = re.sub(r'\s*([{}:;,>])\s*', r'\1', css)
    return css.strip()


sys.stdout.write(''.join(minify(open(f, encoding='utf-8').read()) for f in sys.argv[1:]))
PYTHON

mv main.min.css.tmp main.min.css

echo "css/main.min.css rigenerato — $(wc -c < main.min.css | tr -d ' ') byte da ${#SOURCES[@]} sorgenti"
