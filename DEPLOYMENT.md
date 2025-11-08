# Claude Code UI - Production Deployment Guide

This guide covers deploying Claude Code UI in a production environment with persistent settings and proper process management.

## Prerequisites

- **Node.js** v20 or higher
- **npm** (comes with Node.js)
- **PM2** (Process Manager 2) for production process management
- **Claude Code CLI** or **Cursor CLI** installed and configured

## Quick Start

### 1. Install PM2

```bash
npm install -g pm2
```

### 2. Clone and Setup Repository

```bash
# Clone your private fork
git clone git@github.com:crypticalmass/claudecodeui.git
cd claudecodeui

# Install dependencies
npm install
```

### 3. Configure Environment

Run the interactive setup script:

```bash
./scripts/setup-env.sh
```

Or manually create a `.env` file based on `.env.production.example`:

```bash
cp .env.production.example .env
# Edit .env with your configuration
```

**Important**: Generate a secure JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. Build Production Assets

```bash
npm run build
```

This creates the `dist/` directory with optimized production assets.

### 5. Global Installation

Install globally from the local directory:

```bash
npm install -g .
```

This makes `claude-code-ui` and `cloudcli` commands available system-wide.

### 6. Start with PM2

```bash
# Start the application
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

# Configure PM2 to start on system boot
pm2 startup
# Follow the instructions provided by the command
```

### 7. Verify Deployment

```bash
# Check PM2 status
pm2 list

# View logs
pm2 logs claude-code-ui

# Check application status
cloudcli status
```

Access the UI at `http://localhost:4001` (or your configured PORT).

## Configuration

### Environment Variables

Key environment variables (set in `.env`):

- **PORT**: Server port (default: 4001)
- **NODE_ENV**: Set to `production`
- **JWT_SECRET**: **REQUIRED** - Secure random string for JWT authentication
- **DATABASE_PATH**: Optional - Custom database location (default: `server/database/auth.db`)
- **CLAUDE_CLI_PATH**: Path to Claude CLI (default: `claude`)
- **CONTEXT_WINDOW**: Context window size (default: 160000)
- **OPENAI_API_KEY**: Optional - For Whisper transcription
- **LOG_LEVEL**: Logging level (default: `info`)

### Database Location

By default, the database is stored at:
```
<installation-directory>/server/database/auth.db
```

For production, consider setting `DATABASE_PATH` to a persistent location:

```bash
DATABASE_PATH=/var/lib/claude-code-ui/auth.db
```

Ensure the directory exists and has proper permissions:
```bash
sudo mkdir -p /var/lib/claude-code-ui
sudo chown $USER:$USER /var/lib/claude-code-ui
chmod 700 /var/lib/claude-code-ui
```

## PM2 Management

### Common Commands

```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop claude-code-ui

# Restart application
pm2 restart claude-code-ui

# View logs
pm2 logs claude-code-ui
pm2 logs claude-code-ui --lines 100  # Last 100 lines

# Monitor resources
pm2 monit

# View process information
pm2 describe claude-code-ui

# Delete process
pm2 delete claude-code-ui
```

### Auto-Start on Boot

After running `pm2 startup`, PM2 will automatically start your application when the system boots.

To disable auto-start:
```bash
pm2 unstartup
```

## Alternative: systemd Service

For VPS deployments, you can also use systemd. See `systemd/claude-code-ui.service` for an example service file.

Installation:
```bash
sudo cp systemd/claude-code-ui.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable claude-code-ui
sudo systemctl start claude-code-ui
```

## Updating the Application

### Update Process

1. **Pull latest changes**:
   ```bash
   git pull origin main
   ```

2. **Install dependencies** (if package.json changed):
   ```bash
   npm install
   ```

3. **Rebuild production assets**:
   ```bash
   npm run build
   ```

4. **Reinstall globally**:
   ```bash
   npm install -g .
   ```

5. **Restart PM2 process**:
   ```bash
   pm2 restart claude-code-ui
   ```

### Database Migrations

The application automatically handles database schema migrations. The `user_settings` table is created automatically if it doesn't exist.

## Backup Strategy

### Database Backup

The SQLite database contains:
- User authentication data
- API keys
- User credentials (GitHub tokens, etc.)
- **User settings** (persistent UI preferences)

**Regular Backup**:
```bash
# Create backup
cp /path/to/auth.db /backup/location/auth.db.$(date +%Y%m%d-%H%M%S)

# Or use SQLite backup command
sqlite3 /path/to/auth.db ".backup '/backup/location/auth.db.backup'"
```

**Automated Backup** (add to crontab):
```bash
0 2 * * * cp /var/lib/claude-code-ui/auth.db /backup/claude-code-ui/auth.db.$(date +\%Y\%m\%d)
```

### Configuration Backup

Backup your `.env` file:
```bash
cp .env .env.backup
```

**Important**: Never commit `.env` to git - it contains sensitive secrets.

## Troubleshooting

### Application Won't Start

1. **Check PM2 logs**:
   ```bash
   pm2 logs claude-code-ui --err
   ```

2. **Verify environment variables**:
   ```bash
   cloudcli status
   ```

3. **Check if port is in use**:
   ```bash
   lsof -i :4001
   # or
   netstat -tulpn | grep 4001
   ```

4. **Verify JWT_SECRET is set**:
   ```bash
   grep JWT_SECRET .env
   ```

### Database Issues

1. **Check database permissions**:
   ```bash
   ls -la /path/to/auth.db
   ```

2. **Verify database integrity**:
   ```bash
   sqlite3 /path/to/auth.db "PRAGMA integrity_check;"
   ```

3. **Check database location**:
   ```bash
   cloudcli status
   ```

### Settings Not Persisting

1. **Verify user_settings table exists**:
   ```bash
   sqlite3 /path/to/auth.db ".tables"
   # Should show: user_settings
   ```

2. **Check database write permissions**:
   ```bash
   ls -la /path/to/auth.db
   ```

3. **Review server logs** for database errors:
   ```bash
   pm2 logs claude-code-ui | grep -i "database\|settings"
   ```

### WebSocket Connection Issues

1. **Check firewall rules** - Ensure port 4001 is open
2. **Verify WebSocket URL** - Check browser console for connection errors
3. **Check reverse proxy configuration** (if using nginx/apache)

## Security Considerations

1. **JWT_SECRET**: Use a strong, random secret (64+ characters)
2. **Database Permissions**: Restrict access to database file (chmod 600)
3. **Environment Variables**: Never commit `.env` to version control
4. **Firewall**: Only expose port 4001 to trusted networks
5. **HTTPS**: Use a reverse proxy (nginx/apache) with SSL/TLS for production

## Monitoring

### PM2 Monitoring

```bash
# Real-time monitoring
pm2 monit

# Process information
pm2 describe claude-code-ui

# Memory usage
pm2 list
```

### Log Rotation

PM2 handles log rotation automatically. Logs are stored in `./logs/` directory:
- `pm2-error.log` - Error logs
- `pm2-out.log` - Standard output
- `pm2-combined.log` - Combined logs

## Performance Tuning

### Memory Limits

The PM2 config sets `max_memory_restart: '1G'`. Adjust in `ecosystem.config.js` if needed.

### Node.js Options

Current node_args: `--max-old-space-size=1024` (1GB heap). Adjust for your system.

## Support

For issues specific to this fork, check:
- `CUSTOMIZATIONS.md` - Custom changes from upstream
- `FORK_WORKFLOW.md` - Fork management workflow

For upstream issues, refer to:
- Original repository: https://github.com/siteboon/claudecodeui

