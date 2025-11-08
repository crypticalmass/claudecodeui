# TASK-003: Create CURSOR_SETUP.md Guide

## Task Information

- **Task ID**: TASK-003
- **Title**: Create comprehensive CURSOR_SETUP.md guide
- **Status**: Pending
- **Priority**: High
- **Estimated Effort**: 3-4 hours
- **Dependencies**: None
- **Assigned To**: Unassigned

## Objective

Create a dedicated, comprehensive guide for setting up and using Cursor CLI with Claude Code UI. This should be the go-to resource for Cursor users.

## Acceptance Criteria

- [ ] Installation instructions for all platforms (macOS, Linux, Windows)
- [ ] Authentication setup documented
- [ ] Project initialization explained
- [ ] Configuration options detailed
- [ ] Command reference included
- [ ] Integration with Claude Code UI explained
- [ ] Troubleshooting section comprehensive
- [ ] Examples and screenshots (if available)

## Implementation Steps

Create `CURSOR_SETUP.md` with the following structure:

```markdown
# Cursor CLI Setup Guide

Complete guide for setting up and using Cursor CLI with Claude Code UI.

## Table of Contents

1. [Installation](#installation)
2. [Authentication](#authentication)
3. [Project Initialization](#project-initialization)
4. [Configuration](#configuration)
5. [Integration with Claude Code UI](#integration)
6. [Command Reference](#command-reference)
7. [Troubleshooting](#troubleshooting)

## Installation

### macOS

```bash
# Using npm
npm install -g @cursor/cli

# Using Homebrew (if available)
brew install cursor-cli
```

### Linux

```bash
# Using npm
npm install -g @cursor/cli

# Manual installation
curl -fsSL https://cursor.sh/install.sh | bash
```

### Windows

```powershell
# Using npm
npm install -g @cursor/cli

# Or download installer from cursor.sh
```

### Verification

```bash
cursor-agent --version
```

## Authentication

### Login

```bash
cursor-agent login
```

This will:
1. Open browser for authentication
2. Store credentials in `~/.cursor/`
3. Enable CLI access

### Verify Authentication

```bash
cursor-agent status
```

## Project Initialization

### Initialize a Project

```bash
cd /path/to/your/project
cursor-agent
```

This creates:
- Session directory in `~/.cursor/chats/`
- MD5 hash of project path as directory name
- SQLite database for session storage

### Understanding Project Discovery

Cursor uses MD5 hashing:
```
Project: /Users/john/myproject
MD5:     a1b2c3d4e5f6...
Storage: ~/.cursor/chats/a1b2c3d4e5f6.../
```

**Important**: Moving/renaming projects breaks history!

## Configuration

### Allowed Commands

Configure in Claude Code UI Settings:
1. Open Settings → Cursor Settings
2. Add allowed shell commands
3. Examples:
   - `Shell(ls)`
   - `Shell(git status)`
   - `Shell(npm install)`

### Skip Permissions

**Use with caution!** Bypasses command confirmation.

Set in UI or environment:
```bash
export CURSOR_SKIP_PERMISSIONS=true
```

### MCP Servers

Configure in `~/.cursor/mcp.json`:
```json
{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["/path/to/server.js"]
    }
  }
}
```

## Integration with Claude Code UI

### Adding Projects

**Automatic Discovery:**
- Initialize project with `cursor-agent`
- UI will discover sessions automatically

**Manual Addition:**
1. Open Settings in UI
2. Navigate to Projects
3. Click "Add Project"
4. Enter absolute path
5. Cursor sessions now visible

### Using Cursor in UI

1. Select project from sidebar
2. Choose Cursor as CLI provider
3. Start chatting
4. Sessions saved in `~/.cursor/chats/`

### Switching Between Claude and Cursor

- Select CLI provider in UI
- Both can be used for same project
- Sessions stored separately

## Command Reference

### Basic Commands

```bash
# Start interactive session
cursor-agent

# Run with prompt
cursor-agent -p "Your prompt here"

# Resume session
cursor-agent --resume=SESSION_ID

# List sessions
cursor-agent list

# Show session details
cursor-agent show SESSION_ID
```

### Advanced Options

```bash
# Skip permissions
cursor-agent -f

# Specify model
cursor-agent --model=gpt-4

# Output format
cursor-agent --output-format=stream-json
```

## Troubleshooting

### Cursor Agent Not Found

**Problem**: Command not found after installation

**Solution**:
```bash
# Check installation
which cursor-agent

# Reinstall
npm install -g @cursor/cli

# Add to PATH if needed
export PATH="$PATH:$(npm bin -g)"
```

### Authentication Failed

**Problem**: Login not working

**Solution**:
1. Clear credentials: `rm -rf ~/.cursor/credentials`
2. Login again: `cursor-agent login`
3. Check internet connection
4. Verify cursor.sh is accessible

### Sessions Not Showing in UI

**Problem**: Cursor sessions not visible

**Solutions**:
1. Verify project initialized: `cd /path/to/project && cursor-agent`
2. Manually add project path in UI Settings
3. Check `~/.cursor/chats/` exists
4. Restart Claude Code UI server

### Commands Blocked

**Problem**: Shell commands not executing

**Solutions**:
1. Add commands to allowed list in Settings
2. Enable "Skip Permissions" (use with caution)
3. Check command syntax matches pattern

### Project Moved/Renamed

**Problem**: Lost session history after moving project

**Solution**:
Unfortunately, Cursor uses MD5 of path. Options:
1. Manually add old path to discover old sessions
2. Keep old path symlinked to new location
3. Accept loss of old sessions

### MCP Servers Not Loading

**Problem**: MCP servers not working

**Solutions**:
1. Verify `~/.cursor/mcp.json` is valid JSON
2. Check server paths are correct
3. Test server manually
4. Check logs in `~/.cursor/logs/`

## Best Practices

1. **Initialize projects early**: Run `cursor-agent` in each project
2. **Don't move projects**: MD5 hashing breaks on path changes
3. **Use allowed commands**: Safer than skip permissions
4. **Test MCP servers**: Verify before relying on them
5. **Keep CLI updated**: `npm update -g @cursor/cli`

## Differences from Claude Code

| Feature | Claude Code | Cursor CLI |
|---------|-------------|------------|
| Installation | `npm install -g @anthropic-ai/claude-cli` | `npm install -g @cursor/cli` |
| Command | `claude` | `cursor-agent` |
| Storage | `~/.claude/projects/` | `~/.cursor/chats/` |
| Naming | Path-based | MD5 hash |
| Format | JSONL | SQLite |
| Config | Tool permissions | Allowed commands |

## Additional Resources

- [Cursor Documentation](https://docs.cursor.com)
- [Claude Code UI Docs](../README.md)
- [Deployment Guide](../DEPLOYMENT.md)
- [Customizations](../CUSTOMIZATIONS.md)

## Support

For issues specific to Cursor CLI integration:
1. Check this guide's troubleshooting section
2. Review `DEPLOYMENT.md` for deployment issues
3. Check GitHub issues
4. Consult Cursor CLI documentation
```

## Files to Create

- `CURSOR_SETUP.md` - New comprehensive guide

## Testing

1. Follow installation instructions on your platform
2. Verify all commands work as documented
3. Test integration with UI
4. Check troubleshooting solutions
5. Ensure examples are accurate

## Related Documentation

- `DEPLOYMENT.md` - Deployment guide
- `CUSTOMIZATIONS.md` - Fork customizations
- `README.md` - Project overview
- `server/cursor-cli.js` - Implementation

## Notes

- Include real examples where possible
- Add warnings for destructive operations
- Explain MD5 hashing clearly (common confusion point)
- Cross-reference related documentation

## Commit Message

```
docs(cursor): create comprehensive Cursor CLI setup guide

- Add installation instructions for all platforms
- Document authentication and project initialization
- Explain MD5-based project discovery
- Include command reference and examples
- Add comprehensive troubleshooting section
- Document integration with Claude Code UI

Task: TASK-003
```


