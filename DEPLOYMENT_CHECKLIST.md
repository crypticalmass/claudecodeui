# Deployment Checklist

Use this checklist to ensure all steps are completed for production deployment.

## Pre-Deployment

- [x] Archive old repository
- [x] Create environment configuration files
- [x] Update port references (3001 → 4001)
- [x] Create PM2 ecosystem config
- [x] Create deployment documentation
- [x] Create fork workflow documentation
- [x] Document customizations

## Build & Installation

- [ ] **Build production assets**:
  ```bash
  npm run build
  ```
  Verify `dist/` directory is created.

- [ ] **Create .env file**:
  ```bash
  # Option 1: Use setup script
  ./scripts/setup-env.sh
  
  # Option 2: Manual
  cp .env.production.example .env
  # Edit .env with your values
  ```

- [ ] **Generate secure JWT_SECRET**:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Add to .env file.

- [ ] **Test global installation**:
  ```bash
  npm link
  cloudcli status
  cloudcli version
  ```

- [ ] **Install globally**:
  ```bash
  npm install -g .
  ```

## PM2 Deployment

- [ ] **Install PM2** (if not already installed):
  ```bash
  npm install -g pm2
  ```

- [ ] **Start with PM2**:
  ```bash
  pm2 start ecosystem.config.js
  ```

- [ ] **Save PM2 process list**:
  ```bash
  pm2 save
  ```

- [ ] **Configure auto-start**:
  ```bash
  pm2 startup
  # Follow the instructions provided
  ```

- [ ] **Verify PM2 status**:
  ```bash
  pm2 list
  pm2 logs claude-code-ui
  ```

## Verification

- [ ] **Access UI**: http://localhost:4001
- [ ] **Test authentication**: Login works
- [ ] **Test settings persistence**: 
  - Change a setting in UI
  - Restart server
  - Verify setting persists
- [ ] **Check database location**: `cloudcli status`
- [ ] **Verify logs**: `pm2 logs claude-code-ui`

## Git Operations

- [ ] **Stage all changes**:
  ```bash
  git add .
  ```

- [ ] **Commit changes**:
  ```bash
  git commit -m "feat(deployment): add production deployment configuration

  - Add PM2 ecosystem config
  - Change default port to 4001
  - Add persistent settings documentation
  - Create deployment guides
  - Add environment setup script"
  ```

- [ ] **Push to private fork**:
  ```bash
  git push origin main
  ```

## Post-Deployment

- [ ] **Document database location** (if custom)
- [ ] **Set up backup strategy** (see DEPLOYMENT.md)
- [ ] **Configure firewall** (if needed)
- [ ] **Set up monitoring** (optional)
- [ ] **Test backup/restore** (optional)

## Rollback Plan

If issues occur:

1. Stop PM2: `pm2 stop claude-code-ui`
2. Uninstall global: `npm uninstall -g @siteboon/claude-code-ui`
3. Run from source: `cd /path/to/claudecodeui && npm run start`
4. Database is preserved (no data loss)

## Notes

- The `.env` file is gitignored - never commit it
- Database is automatically migrated on first run
- PM2 logs are in `./logs/` directory
- Use `cloudcli status` to verify configuration

