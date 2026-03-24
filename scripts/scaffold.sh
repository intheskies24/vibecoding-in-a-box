#!/usr/bin/env bash
# vibecoding-in-a-box — Scaffold Script
# Usage: ./scaffold.sh <config> <project-name> [output-dir]
#
# Examples:
#   ./scaffold.sh standard my-saas-app
#   ./scaffold.sh nano my-local-tool
#   ./scaffold.sh standard my-app ~/Projects

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ── Colors ──────────────────────────────────────────────────────────────────
BOLD='\033[1m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
RESET='\033[0m'

# ── Args ──────────────────────────────────────────────────────────────────────
CONFIG="${1:-}"
PROJECT_NAME="${2:-}"
OUTPUT_BASE="${3:-$(pwd)}"

VALID_CONFIGS=("nano" "micro" "standard" "pro" "mobile" "mobile-pro")

# ── Validate ──────────────────────────────────────────────────────────────────
if [[ -z "$CONFIG" ]]; then
  echo -e "${RED}Error: config name required.${RESET}"
  echo ""
  echo "Usage: $0 <config> <project-name>"
  echo ""
  echo "Available configs:"
  for c in "${VALID_CONFIGS[@]}"; do
    echo "  $c"
  done
  exit 1
fi

if [[ -z "$PROJECT_NAME" ]]; then
  echo -e "${RED}Error: project name required.${RESET}"
  echo "Usage: $0 <config> <project-name>"
  exit 1
fi

# Validate config name
valid=false
for c in "${VALID_CONFIGS[@]}"; do
  [[ "$CONFIG" == "$c" ]] && valid=true && break
done

if [[ "$valid" == false ]]; then
  echo -e "${RED}Error: unknown config '$CONFIG'.${RESET}"
  echo "Valid configs: ${VALID_CONFIGS[*]}"
  exit 1
fi

# Check template exists
TEMPLATE_PATH="$REPO_ROOT/templates/$CONFIG"
if [[ ! -d "$TEMPLATE_PATH" ]]; then
  echo -e "${YELLOW}The '$CONFIG' template is not yet available.${RESET}"
  echo "Available templates:"
  for d in "$REPO_ROOT/templates"/*/; do
    echo "  $(basename "$d")"
  done
  exit 1
fi

# Check destination doesn't already exist
DEST="$OUTPUT_BASE/$PROJECT_NAME"
if [[ -d "$DEST" ]]; then
  echo -e "${RED}Error: directory '$DEST' already exists.${RESET}"
  exit 1
fi

# ── Dart package name (snake_case, no hyphens) ────────────────────────────────
DART_NAME=$(echo "$PROJECT_NAME" | tr '-' '_' | tr '[:upper:]' '[:lower:]')

# ── Scaffold ──────────────────────────────────────────────────────────────────
echo ""
echo -e "${BOLD}${CYAN}Scaffolding '${PROJECT_NAME}' from template '${CONFIG}'...${RESET}"
echo ""

if [[ "$CONFIG" == "mobile" || "$CONFIG" == "mobile-pro" ]]; then
  # Flutter projects: use `flutter create` to generate the native shell,
  # then overlay our template's lib/, pubspec.yaml, and other source files.
  if ! command -v flutter &>/dev/null; then
    echo -e "${RED}Error: Flutter is not installed or not in PATH.${RESET}"
    echo "Install Flutter: https://docs.flutter.dev/get-started/install"
    exit 1
  fi

  echo -e "  Running ${BOLD}flutter create${RESET} to generate native project shell..."
  flutter create \
    --org com.vibecoding \
    --project-name "$DART_NAME" \
    --platforms ios,android \
    "$DEST" \
    > /dev/null 2>&1

  echo -e "  Overlaying vibecoding-in-a-box template files..."

  # Overlay lib/ (our Dart source replaces the generated placeholder)
  rm -rf "$DEST/lib"
  cp -r "$TEMPLATE_PATH/lib" "$DEST/lib"

  # Replace pubspec.yaml with our version (has correct deps)
  cp "$TEMPLATE_PATH/pubspec.yaml" "$DEST/pubspec.yaml"
  # Set the correct project name
  sed -i.bak "s/^name: .*/name: $DART_NAME/" "$DEST/pubspec.yaml"
  rm -f "$DEST/pubspec.yaml.bak"

  # Copy Supabase migrations and other non-native files
  for item in supabase .env.example .gitignore README.md; do
    if [[ -e "$TEMPLATE_PATH/$item" ]]; then
      cp -r "$TEMPLATE_PATH/$item" "$DEST/$item"
    fi
  done

else
  # Node/web projects: simple directory copy
  cp -r "$TEMPLATE_PATH" "$DEST"

  # Update package.json name field
  PKGJSON="$DEST/package.json"
  if [[ -f "$PKGJSON" ]]; then
    if command -v python3 &>/dev/null; then
      python3 -c "
import json
with open('$PKGJSON') as f:
    pkg = json.load(f)
pkg['name'] = '$PROJECT_NAME'
with open('$PKGJSON', 'w') as f:
    json.dump(pkg, f, indent=2)
    f.write('\n')
"
    elif command -v node &>/dev/null; then
      node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('$PKGJSON'));
pkg.name = '$PROJECT_NAME';
fs.writeFileSync('$PKGJSON', JSON.stringify(pkg, null, 2) + '\n');
"
    fi
  fi
fi

# ── Next Steps ────────────────────────────────────────────────────────────────
echo -e "${GREEN}✓ Scaffolded to: ${BOLD}$DEST${RESET}"
echo ""
echo -e "${BOLD}Next steps:${RESET}"
echo ""
echo "  cd $PROJECT_NAME"

case "$CONFIG" in
  nano)
    echo "  npm install"
    echo "  npm run dev"
    echo ""
    echo -e "  ${CYAN}Open http://localhost:5173 — no setup required.${RESET}"
    echo -e "  ${CYAN}Data is persisted to localStorage automatically.${RESET}"
    ;;
  micro)
    echo "  npm install"
    echo "  npm run dev"
    echo ""
    echo -e "  ${CYAN}To deploy: npx vercel${RESET}"
    ;;
  standard)
    echo "  cp .env.example .env.local"
    echo "  # Fill in your Supabase and Clerk credentials in .env.local"
    echo "  # Run supabase/migrations/001_tasks.sql in your Supabase SQL editor"
    echo "  npm install"
    echo "  npm run dev"
    echo ""
    echo -e "  ${CYAN}See README.md for the full setup guide.${RESET}"
    ;;
  pro)
    echo "  cp .env.example .env.local"
    echo "  # Fill in Supabase, Clerk, and Anthropic credentials"
    echo "  npm install"
    echo "  npm run dev"
    echo ""
    echo -e "  ${CYAN}See README.md for the full setup guide.${RESET}"
    ;;
  mobile | mobile-pro)
    echo "  cp .env.example .env"
    echo "  # Fill in SUPABASE_URL and SUPABASE_ANON_KEY"
    if [[ "$CONFIG" == "mobile-pro" ]]; then
      echo "  # Also fill in ANTHROPIC_API_KEY"
    fi
    echo "  # Run supabase/migrations/001_tasks.sql in your Supabase SQL editor"
    echo "  flutter pub get"
    echo "  flutter run"
    echo ""
    echo -e "  ${CYAN}See README.md for the full setup guide.${RESET}"
    ;;
esac

echo ""
echo -e "${BOLD}${GREEN}Happy vibecoding!${RESET}"
echo ""
