#!/usr/bin/env bash
# Quick Start Guide for Testing Infrastructure

echo "==================================="
echo "Testing Infrastructure Quick Start"
echo "==================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Install Dependencies
echo -e "${BLUE}Step 1: Installing dependencies...${NC}"
npm install
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Dependencies installed${NC}"
else
  echo -e "${RED}❌ Failed to install dependencies${NC}"
  exit 1
fi

echo ""

# Step 2: Install Playwright Browsers
echo -e "${BLUE}Step 2: Installing Playwright browsers...${NC}"
npx playwright install --with-deps
if [ $? -eq 0 ]; then
  echo -e "${GREEN}✅ Playwright browsers installed${NC}"
else
  echo -e "${RED}❌ Failed to install Playwright browsers${NC}"
  exit 1
fi

echo ""

# Step 3: Verify Project Structure
echo -e "${BLUE}Step 3: Verifying project structure...${NC}"
if [ -d "tests/features" ] && [ -d "tests/steps" ] && [ -f "scripts/generate-report.js" ]; then
  echo -e "${GREEN}✅ Project structure verified${NC}"
else
  echo -e "${RED}❌ Project structure incomplete${NC}"
  exit 1
fi

echo ""

# Step 4: Ready to Test
echo -e "${BLUE}Step 4: Ready to test!${NC}"
echo ""
echo "Run the following commands:"
echo ""
echo "  # Start the Angular server in one terminal:"
echo "  npm start"
echo ""
echo "  # In another terminal, run tests:"
echo "  npm run test:cucumber"
echo ""
echo "  # View HTML report:"
echo "  open reports/cucumber-report.html"
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
