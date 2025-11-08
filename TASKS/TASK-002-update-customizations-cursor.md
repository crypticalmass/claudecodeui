# TASK-002: Add Cursor Integration to CUSTOMIZATIONS.md

## Task Information

- **Task ID**: TASK-002
- **Title**: Add Cursor integration documentation to CUSTOMIZATIONS.md
- **Status**: Pending
- **Priority**: High
- **Estimated Effort**: 1-2 hours
- **Dependencies**: None
- **Assigned To**: Unassigned

## Objective

Document Cursor CLI integration as a key customization in `CUSTOMIZATIONS.md`. This ensures the fork's dual-CLI support is properly documented alongside other custom features.

## Acceptance Criteria

- [ ] Cursor CLI integration added as major customization
- [ ] Cursor vs Claude differences documented
- [ ] Cursor-specific files and routes listed
- [ ] Cursor project discovery mechanism explained
- [ ] Cursor settings persistence documented
- [ ] Integration points clearly identified

## Background

`CUSTOMIZATIONS.md` currently documents persistent settings and port changes but doesn't mention Cursor CLI integration, which is a significant feature of this fork.

## Implementation Steps

### 1. Add Cursor CLI Integration Section

After the "Persistent User Settings System" section, add:

```markdown
### 2. Cursor CLI Integration

**Location**: `server/cursor-cli.js`, `server/routes/cursor.js`, `src/components/Settings.jsx`

**Description**: Full integration with Cursor CLI alongside Claude Code CLI, providing dual-CLI support.

**Implementation**:
- Cursor CLI process spawning and management
- Cursor-specific API endpoints at `/api/cursor`
- Cursor settings UI with allowed commands configuration
- MD5-based project discovery for Cursor sessions
- Cursor logo and provider indication in UI

**Key Differences from Claude:**

| Feature | Claude Code | Cursor CLI |
|---------|-------------|------------|
| Project Storage | `~/.claude/projects/` | `~/.cursor/chats/` |
| Directory Naming | Path with `/` → `-` | MD5 hash of path |
| Session Format | JSONL files | SQLite databases |
| Configuration | Tool permissions | Allowed commands |
| Discovery | Automatic | Requires initialization |

**Files Added/Modified**:
- `server/cursor-cli.js`: Cursor process management (new file)
- `server/routes/cursor.js`: Cursor API endpoints (new file)
- `src/components/CursorLogo.jsx`: Cursor branding (new file)
- `src/components/Settings.jsx`: Cursor settings UI (modified)
- `server/projects.js`: Cursor project discovery (modified)
- `server/index.js`: Cursor routes registration (modified)

**API Endpoints**:
- `POST /api/cursor/chat` - Send message to Cursor CLI
- `GET /api/cursor/sessions/:projectPath` - Get Cursor sessions
- `POST /api/cursor/abort` - Abort Cursor session
```

### 2. Update Database Enhancements Section

Add note about Cursor settings storage:

```markdown
### Database Enhancements

The `user_settings` table stores both Claude and Cursor settings:
- Claude tool permissions
- Cursor allowed commands
- Cursor skip permissions flag
- UI preferences
```

### 3. Add to Version History

Update version history section:

```markdown
### v1.11.0 (Current)
- Persistent settings system
- **Cursor CLI integration** (dual-CLI support)
- Port change to 4001
- PM2 deployment configuration
- Enhanced documentation
```

### 4. Update Maintenance Notes

Add to "When Syncing from Upstream" section:

```markdown
### When Syncing from Upstream

1. **Check for conflicts** in:
   - `server/database/db.js` (settingsDb section)
   - `server/database/init.sql` (user_settings table)
   - `server/index.js` (route registration)
   - **`server/cursor-cli.js` (Cursor integration)**
   - **`server/routes/cursor.js` (Cursor routes)**
   - Port references (if upstream changes ports)

2. **Preserve customizations**:
   - Keep `user_settings` table schema
   - Maintain `settingsDb` API
   - Keep port 4001 default
   - Preserve deployment configuration
   - **Maintain Cursor CLI integration**
```

### 5. Add Testing Section for Cursor

Add to "Testing Customizations" section:

```markdown
### Cursor Integration Test

```bash
# Start server
npm run start

# Test Cursor API (requires authentication)
curl -X POST http://localhost:4001/api/cursor/chat \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Hello from Cursor",
    "projectPath": "/path/to/project"
  }'

# Verify Cursor sessions are discovered
curl http://localhost:4001/api/cursor/sessions/path-to-project \
  -H "Authorization: Bearer <token>"
```
```

## Files to Modify

- `CUSTOMIZATIONS.md` - Add Cursor integration documentation

## Testing

1. Read through updated `CUSTOMIZATIONS.md`
2. Verify Cursor integration is properly documented
3. Check that differences from Claude are clear
4. Ensure file locations are accurate
5. Verify testing commands work

## Related Documentation

- `server/cursor-cli.js` - Cursor implementation
- `server/routes/cursor.js` - Cursor routes
- `server/projects.js` - Project discovery (lines 14-45)
- `DEPLOYMENT.md` - Deployment guide
- `CURSOR_SETUP.md` - Will be created in TASK-003

## Notes

- Maintain consistent formatting with existing sections
- Use tables to clearly show Claude vs Cursor differences
- Include code examples for testing
- Cross-reference related files

## Commit Message

```
docs(customizations): document Cursor CLI integration

- Add Cursor CLI as major customization
- Document Cursor vs Claude differences
- List Cursor-specific files and routes
- Add Cursor testing examples
- Update version history

Task: TASK-002
```


