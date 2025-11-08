# Customizations from Upstream

This document tracks all customizations made to Claude Code UI in this private fork.

## Overview

This fork maintains custom features and configurations that are not part of the upstream repository. We do not submit PRs to upstream - all customizations are maintained independently.

## Custom Features

### 1. Persistent User Settings System

**Location**: `server/database/db.js`, `server/database/init.sql`, `server/routes/user-settings.js`

**Description**: Database-backed persistent storage for user settings and preferences.

**Implementation**:
- New `user_settings` table in SQLite database
- `settingsDb` API for CRUD operations on user settings
- REST API endpoints at `/api/user-settings`
- Automatic table creation on database initialization
- JSON storage for complex setting values

**Database Schema**:
```sql
CREATE TABLE IF NOT EXISTS user_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    setting_key TEXT NOT NULL,
    setting_value TEXT NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(user_id, setting_key)
);
```

**API Endpoints**:
- `GET /api/user-settings` - Get all settings for current user
- `GET /api/user-settings/:key` - Get specific setting
- `POST /api/user-settings/:key` - Save a setting
- `POST /api/user-settings` - Save multiple settings
- `DELETE /api/user-settings/:key` - Delete a setting

**Files Modified**:
- `server/database/db.js` (lines 298-360): `settingsDb` operations
- `server/database/init.sql` (lines 52-63): Table schema
- `server/routes/user-settings.js`: API routes (new file)
- `server/index.js`: Route registration

### 2. Default Port Change

**Changed From**: 3001  
**Changed To**: 4001

**Rationale**: Port 3001 is commonly used by other applications. Port 4001 reduces conflicts.

**Files Modified**:
- `server/index.js`: Default PORT constant (line 1435)
- `vite.config.js`: Proxy defaults (lines 14, 16, 20)
- `server/cli.js`: Help text (line 112)
- `README.md`: Port references (lines 70, 180)
- `src/utils/websocket.js`: Development port fallback (lines 45-46, 52-53)
- `src/components/Shell.jsx`: Development port fallback (lines 406-407, 412-413)

**Shell WebSocket Port**: Also updated from 3002 to 4002 for consistency.

### 3. Production Deployment Configuration

**New Files**:
- `ecosystem.config.js`: PM2 process manager configuration
- `DEPLOYMENT.md`: Comprehensive deployment guide
- `FORK_WORKFLOW.md`: Fork management workflow
- `CUSTOMIZATIONS.md`: This file
- `.env.production.example`: Environment variable template
- `scripts/setup-env.sh`: Interactive environment setup script

**PM2 Configuration**:
- Auto-restart on failure
- Log management
- Environment variable loading from `.env`
- Memory limits
- Process monitoring

### 4. Enhanced Documentation

**Additions**:
- Production deployment guide
- Fork workflow documentation
- Customization tracking
- Environment setup automation

## Database Enhancements

### Automatic Migration

The `user_settings` table is automatically created if it doesn't exist when the database initializes. This ensures backward compatibility with existing databases.

**Code Location**: `server/database/db.js` (lines 64-77)

```javascript
// Ensure user_settings table exists (for existing databases)
db.exec(`
  CREATE TABLE IF NOT EXISTS user_settings (
    ...
  );
`);
```

## Configuration Changes

### Environment Variables

New/adjusted defaults:
- `PORT`: 4001 (was 3001)
- `DATABASE_PATH`: Configurable (was fixed)
- `JWT_SECRET`: Required (was optional with weak default)

### Build Configuration

No changes to build process - uses standard Vite build.

## Backward Compatibility

### Database Migration

Existing databases are automatically upgraded:
- Old databases without `user_settings` table → Table created automatically
- No data loss
- No manual migration required

### API Compatibility

All upstream API endpoints remain unchanged. New endpoints are additive:
- `/api/user-settings/*` - New endpoints, don't conflict with upstream

## Version History

### v1.11.0 (Current)
- Persistent settings system
- Port change to 4001
- PM2 deployment configuration
- Enhanced documentation

## Maintenance Notes

### When Syncing from Upstream

1. **Check for conflicts** in:
   - `server/database/db.js` (settingsDb section)
   - `server/database/init.sql` (user_settings table)
   - `server/index.js` (route registration)
   - Port references (if upstream changes ports)

2. **Preserve customizations**:
   - Keep `user_settings` table schema
   - Maintain `settingsDb` API
   - Keep port 4001 default
   - Preserve deployment configuration

3. **Test thoroughly**:
   - Verify settings persistence works
   - Check database migrations
   - Test API endpoints
   - Verify port configuration

### Adding New Customizations

1. Document in this file
2. Update relevant sections
3. Note any upstream conflicts
4. Update version history

## Upstream Compatibility

This fork is based on upstream version **1.11.0** (as of last sync).

**Compatibility Status**: ✅ Compatible

- All upstream features work
- Custom features are additive
- No breaking changes to upstream APIs

## Future Considerations

### Potential Upstream Conflicts

1. **If upstream adds settings persistence**:
   - Evaluate upstream implementation
   - Decide: merge or maintain separate
   - Update this document

2. **If upstream changes default port**:
   - Review rationale
   - Decide: keep 4001 or adopt upstream
   - Update all references

3. **If upstream changes database schema**:
   - Review migration strategy
   - Ensure user_settings table compatibility
   - Test thoroughly

## Testing Customizations

### Settings Persistence Test

```bash
# Start server
npm run start

# Test API (requires authentication)
curl -X POST http://localhost:4001/api/user-settings/test-key \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"value": "test-value"}'

# Verify in database
sqlite3 server/database/auth.db "SELECT * FROM user_settings;"
```

### Port Configuration Test

```bash
# Verify default port
cloudcli status
# Should show PORT: 4001

# Test server starts on correct port
npm run start
# Should listen on port 4001
```

## References

- Upstream Repository: https://github.com/siteboon/claudecodeui
- Private Fork: git@github.com:crypticalmass/claudecodeui.git
- Deployment Guide: `DEPLOYMENT.md`
- Fork Workflow: `FORK_WORKFLOW.md`

