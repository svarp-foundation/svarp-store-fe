#!/usr/bin/env bash

# ==============================================================================
# SVARP Store Frontend Deployment Script
# Target Server Location: /var/www/svarp-store-fe
# ==============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

FE_DIR="${FE_DIR:-/var/www/svarp-store-fe}"
BRANCH="${BRANCH:-dev}"

echo -e "${CYAN}========================================================================${NC}"
echo -e "${CYAN}                Deploying SVARP Store Frontend                          ${NC}"
echo -e "${CYAN}========================================================================${NC}"

if [ -d "$FE_DIR" ]; then
  cd "$FE_DIR"
fi

echo -e "${YELLOW}➜ Pulling latest frontend code (origin/${BRANCH})...${NC}"
git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull origin "$BRANCH"

if [ -f "package.json" ]; then
  echo -e "${YELLOW}➜ Installing node dependencies...${NC}"
  if [ -f "package-lock.json" ]; then
    npm ci
  else
    npm install
  fi
fi

echo -e "${YELLOW}➜ Building production static assets (npm run build)...${NC}"
npm run build

echo -e "${GREEN}✓ Frontend deployment successful!${NC}"
