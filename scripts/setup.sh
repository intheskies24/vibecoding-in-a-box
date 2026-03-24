#!/usr/bin/env bash
# vibecoding-in-a-box — Interactive Setup Wizard
# Asks questions about your project and recommends the right stack config.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# ── Colors ──────────────────────────────────────────────────────────────────
BOLD='\033[1m'
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RESET='\033[0m'

# ── Helpers ──────────────────────────────────────────────────────────────────
print_header() {
  echo ""
  echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
  echo -e "${BOLD}${CYAN}  vibecoding-in-a-box — Setup Wizard${RESET}"
  echo -e "${BOLD}${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
  echo ""
  echo "  Answer a few questions and I'll recommend the right"
  echo "  stack for your project, then scaffold it for you."
  echo ""
}

ask() {
  local question="$1"
  shift
  local options=("$@")

  echo -e "${BOLD}$question${RESET}"
  for i in "${!options[@]}"; do
    echo "  $((i+1))) ${options[$i]}"
  done
  echo ""

  while true; do
    read -rp "  Enter number: " choice
    if [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= ${#options[@]} )); then
      echo "${options[$((choice-1))]}"
      return
    fi
    echo "  Please enter a number between 1 and ${#options[@]}"
  done
}

ask_yn() {
  local question="$1"
  echo -e "${BOLD}$question${RESET}"
  echo "  1) Yes"
  echo "  2) No"
  echo ""
  while true; do
    read -rp "  Enter number: " choice
    case "$choice" in
      1) echo "yes"; return ;;
      2) echo "no"; return ;;
      *) echo "  Please enter 1 or 2" ;;
    esac
  done
}

# ── Main ──────────────────────────────────────────────────────────────────────
print_header

# Q1 — Platform
echo -e "${CYAN}Q1 of 7 — Platform${RESET}"
platform=$(ask "Are you building a web app, a mobile app (iOS/Android), or both?" \
  "Web app" \
  "Mobile app (iOS/Android)" \
  "Both web and mobile")
echo ""

# Q2 — Hosting (skip if mobile)
hosting="hosted"
if [[ "$platform" == "Web app" ]]; then
  echo -e "${CYAN}Q2 of 7 — Hosting${RESET}"
  hosting=$(ask "Will this run locally on your machine only, or be hosted/deployed?" \
    "Local only (runs on my machine)" \
    "Hosted/deployed (accessible via URL)")
  echo ""
fi

# Q3 — Database
echo -e "${CYAN}Q3 of 7 — Database${RESET}"
database=$(ask_yn "Do you need to store and query structured data? (e.g. user records, task lists)")
echo ""

# Q4 — Auth
echo -e "${CYAN}Q4 of 7 — Auth${RESET}"
auth=$(ask_yn "Do you need user accounts and authentication? (sign-up, login, sessions)")
echo ""

# Q5 — Storage
echo -e "${CYAN}Q5 of 7 — File Storage${RESET}"
storage=$(ask_yn "Do you need to store files, images, or media?")
echo ""

# Q6 — AI Integration
echo -e "${CYAN}Q6 of 7 — AI Integration${RESET}"
ai=$(ask_yn "Will your app itself call an AI/LLM API? (e.g. Claude, GPT — for generating content, chat features)")
echo ""

# Q7 — Scale
echo -e "${CYAN}Q7 of 7 — Scale${RESET}"
scale=$(ask "Who is this for?" \
  "Just me / personal tool" \
  "Small team (internal tool)" \
  "Public-facing product")
echo ""

# ── Decision Logic ─────────────────────────────────────────────────────────
config=""

if [[ "$platform" == "Mobile app (iOS/Android)" || "$platform" == "Both web and mobile" ]]; then
  if [[ "$ai" == "yes" ]]; then
    config="mobile-pro"
  else
    config="mobile"
  fi
elif [[ "$hosting" == "Local only (runs on my machine)" ]]; then
  config="nano"
elif [[ "$ai" == "yes" ]]; then
  config="pro"
elif [[ "$database" == "yes" || "$auth" == "yes" ]]; then
  config="standard"
else
  config="micro"
fi

# ── Stack Descriptions ──────────────────────────────────────────────────────
declare -A STACK_DESC
STACK_DESC[nano]="Vite + React + Zustand (localStorage) — no server, no deployment"
STACK_DESC[micro]="Next.js + Tailwind + Vercel — simple hosted web app, no DB"
STACK_DESC[standard]="Next.js + Supabase + Clerk + Vercel — full-stack with auth and DB"
STACK_DESC[pro]="Next.js + Supabase + Clerk + Claude SDK + Vercel AI SDK — AI-powered full-stack"
STACK_DESC[mobile]="Flutter + Supabase — cross-platform iOS/Android"
STACK_DESC[mobile-pro]="Flutter + Supabase + Claude SDK — AI-powered mobile app"

# ── Recommendation ──────────────────────────────────────────────────────────
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "${BOLD}${GREEN}  Recommended: ${config}${RESET}"
echo -e "${BOLD}${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${STACK_DESC[$config]}"
echo ""

# Show extra notes for storage if selected
if [[ "$storage" == "yes" && "$config" == "standard" ]]; then
  echo -e "  ${YELLOW}Note: Supabase Storage is included in the standard stack.${RESET}"
  echo -e "  ${YELLOW}Enable it in your Supabase dashboard after setup.${RESET}"
  echo ""
fi

if [[ "$platform" == "Both web and mobile" ]]; then
  echo -e "  ${YELLOW}Tip: For web+mobile, start with the mobile template for your${RESET}"
  echo -e "  ${YELLOW}Supabase backend, then build the web frontend using 'standard'.${RESET}"
  echo ""
fi

# Check if template exists
template_path="$REPO_ROOT/templates/$config"
if [[ ! -d "$template_path" ]]; then
  echo -e "  ${YELLOW}Note: The '$config' template is coming in a future phase.${RESET}"
  echo -e "  ${YELLOW}Available now: nano, standard${RESET}"
  echo ""
  echo "  In the meantime, the closest available template is:"
  if [[ "$config" == "pro" ]]; then
    echo -e "  ${BOLD}standard${RESET} — add the Claude SDK manually after scaffolding"
    config="standard"
  elif [[ "$config" == "micro" ]]; then
    echo -e "  ${BOLD}nano${RESET} — or clone a blank Next.js app with: npx create-next-app@latest"
    config="nano"
  else
    echo "  scaffold manually or wait for the next release."
    exit 0
  fi
  echo ""
fi

# ── Project Name ─────────────────────────────────────────────────────────────
read -rp "  Project name (e.g. my-app): " project_name
project_name="${project_name:-my-app}"
# Sanitize: lowercase, hyphens only
project_name=$(echo "$project_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g')
echo ""

# ── Confirm ──────────────────────────────────────────────────────────────────
echo -e "  Ready to scaffold ${BOLD}$project_name${RESET} using the ${BOLD}$config${RESET} template."
echo ""
read -rp "  Proceed? (y/N): " confirm
echo ""

if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
  echo "  Cancelled."
  exit 0
fi

# ── Scaffold ─────────────────────────────────────────────────────────────────
bash "$SCRIPT_DIR/scaffold.sh" "$config" "$project_name"
