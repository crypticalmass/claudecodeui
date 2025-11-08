# Deployment Checkpoint - Production Migration Complete

**Date**: November 8, 2025  
**Version**: 1.11.0  
**Commit**: `e4b969d` (feat(deployment): complete migration to PM2 with port 4001)

## Overview

This checkpoint documents the successful migration from upstream Claude Code UI to our customized production deployment with persistent settings, PM2 process management, and port 4001 configuration.

## Migration Summary

### What Was Migrated

1. **Stopped Old Service**
   - Terminated upstream version running on port 3001
   - Process ID: 93180 (old instance)

2. **Port Configuration**
   - Changed default port: **3001 → 4001**
   - Updated `.env`: `PORT=4001`
   - Updated all code references:
     - `server/index.js` (line 1439)
     - `vite.config.js` (proxy configuration)
     - `server/cli.js` (status output)
     - `src/utils/websocket.js` (API fallback)
     - `src/components/Shell.jsx` (API fallback)

3. **Database Persistence**
   - **Database**: `server/database/auth.db`
   - **Tables**: `users`, `api_keys`, `user_credentials`, `user_settings`
   - **Settings Stored**: 7 entries (codeEditorTheme, codeEditorWordWrap, etc.)
   - **Schema**: Fully initialized with foreign keys and indexes
   - **API**: `/api/settings` (database-backed via `settingsDb`)

4. **PM2 Configuration**
   - **Config File**: `ecosystem.config.cjs` (converted from .js for CommonJS compatibility)
   - **Service Name**: `claude-code-ui`
   - **Status**: Online, auto-restart enabled
   - **Process ID**: 43311
   - **Memory**: ~120MB
   - **Logs**: `logs/pm2-error.log`, `logs/pm2-out.log`, `logs/pm2-combined.log`

5. **Global Installation**
   - **Location**: `/opt/homebrew/bin/claude-code-ui`
   - **Package**: `@siteboon/claude-code-ui@1.11.0`
   - **Status**: Customized version installed (replaced upstream)
   - **Code Path**: `/Users/alialnuaimi/projects/dev/claude/CCUI/claudecodeui`

6. **Frontend Build**
   - **Build Output**: `dist/` directory
   - **Status**: Production build complete
   - **Size**: ~2MB total (gzipped: ~600KB)

## Customizations Deployed

### 1. Persistent User Settings System

**Location**: `server/database/db.js`, `server/routes/settings.js`, `server/routes/user-settings.js`

**Features**:
- Database-backed storage for all user preferences
- JSON storage for complex setting values
- Automatic table creation on initialization
- Fallback to localStorage if database unavailable

**API Endpoints**:
- `GET /api/settings` - Get all settings
- `GET /api/settings/:key` - Get specific setting
- `POST /api/settings/:key` - Save a setting
- `POST /api/settings` - Save multiple settings
- `DELETE /api/settings/:key` - Delete a setting

**Database Schema**:
```sql
CREATE TABLE user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, setting_key)
);
```

### 2. Port 4001 Configuration

**Rationale**: Port 3001 is commonly used by other applications. Port 4001 reduces conflicts.

**Files Modified**:
- `server/index.js`: Default PORT constant
- `vite.config.js`: Proxy defaults
- `server/cli.js`: Status output
- `src/utils/websocket.js`: API fallback
- `src/components/Shell.jsx`: API fallback
- `.env`: Environment variable

### 3. PM2 Process Management

**Configuration**: `ecosystem.config.cjs`

**Features**:
- Auto-restart on failure
- Memory limit: 1GB
- Log rotation
- Environment variable loading from `.env`
- Production mode optimization

**Commands**:
```bash
pm2 start ecosystem.config.cjs    # Start service
pm2 stop claude-code-ui            # Stop service
pm2 restart claude-code-ui         # Restart service
pm2 logs claude-code-ui            # View logs
pm2 save                           # Save configuration
```

## Verification Results

### Database Status
```
✅ Tables: api_keys, user_credentials, user_settings, users
✅ Settings stored: 7 entries
✅ Schema: Complete with indexes and foreign keys
```

### Service Status
```
✅ Service: Online (PM2 managed)
✅ Port: 4001 (LISTENING)
✅ Process ID: 43311
✅ Memory: ~120MB
✅ Uptime: Stable
```

### Code Deployment
```
✅ Global install: /opt/homebrew/bin/claude-code-ui
✅ Running from: /Users/alialnuaimi/projects/dev/claude/CCUI/claudecodeui
✅ Frontend: Built and deployed
✅ All customizations: Active
```

## Access Information

- **Web UI**: http://localhost:4001
- **PM2 Status**: `pm2 list`
- **PM2 Logs**: `pm2 logs claude-code-ui`
- **PM2 Monitor**: `pm2 monit`
- **Database**: `server/database/auth.db`

## Files Changed in This Migration

### New Files
- `ecosystem.config.cjs` - PM2 configuration (converted from .js)
- `DEPLOYMENT.md` - Production deployment guide
- `DEPLOYMENT_CHECKPOINT.md` - This file

### Modified Files
- `server/index.js` - Port 4001, route registration
- `vite.config.js` - Port 4001 proxy configuration
- `server/cli.js` - Port 4001 status output
- `src/utils/websocket.js` - Port 4001 API fallback
- `src/components/Shell.jsx` - Port 4001 API fallback
- `.env` - PORT=4001
- `DEPLOYMENT.md` - Updated with .cjs references

### Removed Files
- `ecosystem.config.js` - Replaced with .cjs version

## Git Commits

1. **e4b969d** - `feat(deployment): complete migration to PM2 with port 4001`
   - Convert ecosystem.config.js to .cjs for PM2 compatibility
   - Update DEPLOYMENT.md with correct .cjs file references
   - Service successfully running on port 4001 via PM2
   - Global installation updated to customized version
   - PM2 configuration saved for auto-start

2. **316d7c9** - `docs(governance): add task management system and agent guidance`
   - Task management system
   - Agent guidance files

3. **72c61fb** - `feat(deployment): complete production deployment and governance setup`
   - Initial deployment setup
   - Governance documentation

## Next Steps

### Optional Enhancements
1. **Auto-start on Boot**: Run `pm2 startup` to configure system-level auto-start
2. **Monitoring**: Set up PM2 monitoring dashboard
3. **Backup**: Configure database backup strategy
4. **SSL/TLS**: Add HTTPS support for production
5. **Reverse Proxy**: Configure nginx/Apache if needed

### Maintenance
- Monitor PM2 logs regularly
- Check database size and performance
- Review settings persistence
- Update dependencies as needed

## Rollback Procedure

If rollback is needed:

```bash
# Stop PM2 service
pm2 stop claude-code-ui
pm2 delete claude-code-ui

# Reinstall upstream version (if needed)
npm install -g @siteboon/claude-code-ui

# Or restore from backup
# (database backup should be maintained separately)
```

## Notes

- **Private Fork**: This is a private fork. Never push to upstream.
- **Database**: SQLite database at `server/database/auth.db`
- **Environment**: All configuration via `.env` file
- **Logs**: PM2 logs in `logs/` directory
- **Port**: Service accessible on port 4001

## Related Documentation

- `DEPLOYMENT.md` - Full deployment guide
- `CUSTOMIZATIONS.md` - Customization details
- `FORK_WORKFLOW.md` - Private fork workflow
- `DOCUMENTATION_INDEX.md` - Documentation index

---

**Checkpoint Created**: November 8, 2025  
**Status**: ✅ Production deployment complete and verified  
**All systems operational**: Database persistence, PM2 management, Port 4001

