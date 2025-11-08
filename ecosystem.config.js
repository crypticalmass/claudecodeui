/**
 * PM2 Ecosystem Configuration for Claude Code UI
 * 
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 save
 *   pm2 startup  # Configure auto-start on system boot
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
function loadEnvFile() {
  const envPath = join(__dirname, '.env');
  try {
    const envFile = readFileSync(envPath, 'utf8');
    const env = {};
    envFile.split('\n').forEach(line => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
    return env;
  } catch (error) {
    console.warn('Warning: Could not load .env file:', error.message);
    return {};
  }
}

const envVars = loadEnvFile();

export default {
  apps: [{
    name: 'claude-code-ui',
    script: './server/index.js',
    interpreter: 'node',
    instances: 1,
    exec_mode: 'fork',
    
    // Environment variables
    env: {
      NODE_ENV: 'production',
      PORT: envVars.PORT || '4001',
      DATABASE_PATH: envVars.DATABASE_PATH || '',
      JWT_SECRET: envVars.JWT_SECRET || '',
      CLAUDE_CLI_PATH: envVars.CLAUDE_CLI_PATH || 'claude',
      CONTEXT_WINDOW: envVars.CONTEXT_WINDOW || '160000',
      OPENAI_API_KEY: envVars.OPENAI_API_KEY || '',
      LOG_LEVEL: envVars.LOG_LEVEL || 'info',
    },
    
    // Auto-restart configuration
    autorestart: true,
    watch: false, // Set to true for development, false for production
    max_memory_restart: '1G',
    
    // Logging
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_file: './logs/pm2-combined.log',
    time: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    
    // Process management
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    
    // Kill timeout
    kill_timeout: 5000,
    
    // Node options
    node_args: '--max-old-space-size=1024',
  }]
};

