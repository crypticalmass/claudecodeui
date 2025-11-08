# TASK-001: Update DEPLOYMENT.md with Cursor CLI Sections

## Task Information

- **Task ID**: TASK-001
- **Title**: Update DEPLOYMENT.md with comprehensive Cursor CLI sections
- **Status**: Pending
- **Priority**: High
- **Estimated Effort**: 2-3 hours
- **Dependencies**: None
- **Assigned To**: Unassigned

## Objective

Add comprehensive Cursor CLI documentation to `DEPLOYMENT.md` to achieve feature parity with Claude Code documentation. Users should be able to deploy and configure Cursor CLI with the same ease as Claude Code.

## Acceptance Criteria

- [ ] Cursor CLI installation instructions added (all platforms)
- [ ] Cursor CLI authentication setup documented
- [ ] Cursor-specific environment variables documented
- [ ] Cursor project discovery explained (MD5 hashing)
- [ ] Cursor settings configuration documented (allowed commands, permissions)
- [ ] Cursor-specific troubleshooting section added
- [ ] All sections match Claude Code documentation quality
- [ ] Cross-references to `CURSOR_SETUP.md` added

## Background

Currently, `DEPLOYMENT.md` focuses heavily on Claude Code CLI with only brief mentions of Cursor CLI. Since the application fully supports both CLIs, the documentation should reflect this with equal coverage.

## Implementation Steps

### 1. Read Current Documentation

```bash
# Review current DEPLOYMENT.md
cat DEPLOYMENT.md

# Review Cursor CLI implementation
cat server/cursor-cli.js
cat server/routes/cursor.js
```

### 2. Add Cursor CLI Prerequisites Section

After the existing Prerequisites section, add:

```markdown
#### Cursor CLI (Optional)

If you plan to use Cursor CLI integration:

**Installation:**
- macOS/Linux: `npm install -g @cursor/cli`
- Windows: Download from [cursor.sh](https://cursor.sh)

**Authentication:**
```bash
cursor-agent login
```

**Verification:**
```bash
cursor-agent --version
```
```

### 3. Add Cursor Configuration Section

After environment variables section, add:

```markdown
### Cursor CLI Configuration

Cursor CLI has additional configuration options:

**Allowed Commands:**
Configure which shell commands Cursor can execute in Settings UI.

**Skip Permissions:**
Set `CURSOR_SKIP_PERMISSIONS=true` to bypass command confirmation (use with caution).

**Project Discovery:**
Cursor uses MD5 hashing of project paths. Projects must be:
1. Initialized with `cursor-agent` in the project directory, OR
2. Manually added via the UI

**MCP Servers:**
Cursor supports MCP servers configured in `~/.cursor/mcp.json`
```

### 4. Add Cursor Project Discovery Section

Add new section explaining Cursor's unique discovery mechanism:

```markdown
### Cursor Project Discovery

Cursor CLI stores projects differently from Claude:

**Storage Location:** `~/.cursor/chats/`

**Directory Naming:** MD5 hash of absolute project path
- Example: `/Users/john/myproject` → MD5 → `a1b2c3d4e5f6...`

**Implications:**
- Moving/renaming projects breaks session history
- Cannot auto-discover Cursor-only projects
- Manual project addition required for Cursor-only workflows

**Manual Project Addition:**
1. Open Settings in UI
2. Navigate to Projects section
3. Click "Add Project"
4. Enter absolute project path
5. Cursor sessions will now be discovered
```

### 5. Add Cursor Troubleshooting Section

Add to troubleshooting section:

```markdown
### Cursor CLI Issues

#### Cursor Agent Not Found
```bash
# Verify installation
which cursor-agent

# Reinstall if needed
npm install -g @cursor/cli
```

#### Cursor Sessions Not Showing
1. Verify Cursor CLI is installed and authenticated
2. Check project has been initialized: `cd /path/to/project && cursor-agent`
3. Manually add project path in UI Settings
4. Verify `~/.cursor/chats/` directory exists

#### Cursor Commands Blocked
1. Open Settings → Cursor Settings
2. Add commands to allowed list
3. Or enable "Skip Permissions" (use with caution)

#### Cursor MCP Servers Not Loading
1. Check `~/.cursor/mcp.json` exists and is valid JSON
2. Verify MCP server paths are correct
3. Check server logs in `~/.cursor/logs/`
```

### 6. Update Configuration Checklist

Add Cursor-specific items to deployment checklist:

```markdown
## Cursor CLI Setup (Optional)

- [ ] Install Cursor CLI
- [ ] Authenticate with `cursor-agent login`
- [ ] Initialize at least one project
- [ ] Configure allowed commands in UI
- [ ] Test Cursor session creation
```

## Files to Modify

- `DEPLOYMENT.md` - Add all Cursor CLI sections

## Testing

1. Read through updated `DEPLOYMENT.md`
2. Verify all Cursor sections are present
3. Check that instructions are clear and complete
4. Ensure parity with Claude Code documentation
5. Verify cross-references work

## Related Documentation

- `server/cursor-cli.js` - Cursor CLI implementation
- `server/routes/cursor.js` - Cursor API routes
- `server/projects.js` - Project discovery logic (lines 14-45)
- `CURSOR_SETUP.md` - Will be created in TASK-003

## Notes

- Maintain consistent formatting with existing documentation
- Use same style and tone as Claude Code sections
- Include code examples where helpful
- Add warnings for security-sensitive options (skip permissions)

## Commit Message

```
docs(deployment): add comprehensive Cursor CLI documentation

- Add Cursor CLI installation instructions
- Document Cursor authentication and setup
- Explain MD5-based project discovery
- Add Cursor-specific troubleshooting
- Achieve documentation parity with Claude Code

Closes #[ISSUE_NUMBER]
Task: TASK-001
```


