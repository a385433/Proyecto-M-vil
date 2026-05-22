#!/usr/bin/env bash
set -euo pipefail

# Script para generar docs/SRS.pdf a partir de docs/SRS.md
# Requisitos (opcionales): pandoc, wkhtmltopdf o una distribución TeX (xelatex), mermaid-cli (mmdc) para renderizar .mmd

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRS_MD="$ROOT_DIR/docs/SRS.md"
OUT_PDF="$ROOT_DIR/docs/SRS.pdf"

echo "Generando PDF desde $SRS_MD → $OUT_PDF"

# Intentar renderizar diagramas Mermaid a SVG si mmdc está disponible
DIAGRAMS_DIR="$ROOT_DIR/docs/diagrams"
if command -v mmdc >/dev/null 2>&1; then
  echo "Renderizando archivos .mmd a SVG con mmdc"
  for f in "$DIAGRAMS_DIR"/*.mmd; do
    [ -e "$f" ] || continue
    out_svg="${f%.mmd}.svg"
    mmdc -i "$f" -o "$out_svg" || true
  done
else
  echo "mmdc no encontrado: se omite renderizado automático de diagramas. Puedes instalar mermaid-cli si quieres renders automáticos."
fi

# Usar pandoc si está disponible
if command -v pandoc >/dev/null 2>&1; then
  echo "Usando pandoc para convertir Markdown a PDF"
  # Preferir wkhtmltopdf si está instalado, sino xelatex
  if command -v wkhtmltopdf >/dev/null 2>&1; then
    pandoc "$SRS_MD" -s -o "$OUT_PDF" --pdf-engine=wkhtmltopdf
  else
    pandoc "$SRS_MD" -s -o "$OUT_PDF" --pdf-engine=xelatex || pandoc "$SRS_MD" -s -o "$OUT_PDF"
  fi
  echo "PDF generado: $OUT_PDF"
else
  echo "pandoc no está instalado. Instálalo y reintenta: e.g., 'sudo apt install pandoc'"
  exit 1
fi
