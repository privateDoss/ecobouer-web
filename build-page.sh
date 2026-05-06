#!/usr/bin/env bash
# Assembles index.html from partials/*.html in order. Vercel still serves ./index.html only.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
OUT="$ROOT/index.html"
{
  for name in \
    00-head.html \
    01-header.html \
    02-intro.html \
    03-main-open.html \
    04-featured-services.html \
    05-about.html \
    06-services.html \
    07-projects.html \
    08-savings-calculator.html \
    09-clients.html \
    10-testimonials-team-commented.html \
    11-contact.html \
    12-main-close.html \
    13-footer.html \
    14-body-end.html
  do
    cat "$ROOT/partials/$name"
  done
} > "$OUT"
printf 'Wrote %s\n' "$OUT"
