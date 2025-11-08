#!/bin/bash

# Claude Code UI Environment Setup Script
# This script helps you create a .env file with secure configuration

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
ENV_FILE="$PROJECT_ROOT/.env"
ENV_EXAMPLE="$PROJECT_ROOT/.env.production.example"

echo "Claude Code UI - Environment Setup"
echo "=================================="
echo ""

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
    echo "⚠️  .env file already exists at: $ENV_FILE"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted. Existing .env file preserved."
        exit 0
    fi
fi

# Generate secure JWT secret
echo "Generating secure JWT secret..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 2>/dev/null || openssl rand -hex 32)

# Default values
DEFAULT_PORT=4001
DEFAULT_DATABASE_PATH=""
DEFAULT_CLAUDE_CLI_PATH="claude"
DEFAULT_CONTEXT_WINDOW=160000

# Prompt for configuration
echo ""
echo "Configuration (press Enter for defaults):"
echo ""

read -p "Server Port [$DEFAULT_PORT]: " PORT
PORT=${PORT:-$DEFAULT_PORT}

read -p "Database Path (empty for default) [$DEFAULT_DATABASE_PATH]: " DATABASE_PATH
DATABASE_PATH=${DATABASE_PATH:-$DEFAULT_DATABASE_PATH}

read -p "Claude CLI Path [$DEFAULT_CLAUDE_CLI_PATH]: " CLAUDE_CLI_PATH
CLAUDE_CLI_PATH=${CLAUDE_CLI_PATH:-$DEFAULT_CLAUDE_CLI_PATH}

read -p "Context Window [$DEFAULT_CONTEXT_WINDOW]: " CONTEXT_WINDOW
CONTEXT_WINDOW=${CONTEXT_WINDOW:-$DEFAULT_CONTEXT_WINDOW}

read -p "OpenAI API Key (optional, press Enter to skip): " OPENAI_API_KEY

read -p "Log Level [info]: " LOG_LEVEL
LOG_LEVEL=${LOG_LEVEL:-info}

# Create .env file
cat > "$ENV_FILE" << EOF
# Claude Code UI Production Environment Configuration
# Generated on $(date)

# Server Configuration
PORT=$PORT
NODE_ENV=production

# Security - Auto-generated secure JWT secret
JWT_SECRET=$JWT_SECRET

# Database Configuration
EOF

if [ -n "$DATABASE_PATH" ]; then
    echo "DATABASE_PATH=$DATABASE_PATH" >> "$ENV_FILE"
else
    echo "# DATABASE_PATH=  # Using default location" >> "$ENV_FILE"
fi

cat >> "$ENV_FILE" << EOF

# Claude CLI Configuration
CLAUDE_CLI_PATH=$CLAUDE_CLI_PATH

# Context Window Size
CONTEXT_WINDOW=$CONTEXT_WINDOW
EOF

if [ -n "$OPENAI_API_KEY" ]; then
    echo "OPENAI_API_KEY=$OPENAI_API_KEY" >> "$ENV_FILE"
else
    echo "# OPENAI_API_KEY=" >> "$ENV_FILE"
fi

cat >> "$ENV_FILE" << EOF

# Log Level
LOG_LEVEL=$LOG_LEVEL
EOF

# Set secure permissions
chmod 600 "$ENV_FILE"

echo ""
echo "✅ .env file created successfully at: $ENV_FILE"
echo "   Permissions set to 600 (read/write owner only)"
echo ""
echo "⚠️  IMPORTANT: Keep your JWT_SECRET secure and never commit .env to git!"
echo ""
echo "Next steps:"
echo "  1. Review the .env file: cat $ENV_FILE"
echo "  2. Start the server: npm run start"
echo "  3. Or use PM2: pm2 start ecosystem.config.js"
echo ""

