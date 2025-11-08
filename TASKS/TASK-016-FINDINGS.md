# TASK-016: Cursor IDE Conversation Support - Research Findings

This document tracks research findings for adding Cursor IDE conversation support to Claude Code UI.

## Date: 2025-11-08

### Current Understanding

#### Cursor CLI Sessions (✅ Already Supported)

**Storage Location:**
```
~/.cursor/chats/{md5_hash_of_project_path}/{session_id}/
```

**Example:**
- Project: `/Users/alialnuaimi/projects/dev/claude/CCUI/claudecodeui`
- MD5 Hash: `37c9566f855983ab9bc299dddf9166e3`
- Session: `ab3eeb44-9e3d-489d-a50c-7636eb4a1008`
- Full Path: `~/.cursor/chats/37c9566f855983ab9bc299dddf9166e3/ab3eeb44-9e3d-489d-a50c-7636eb4a1008/`

**Database Structure:**
- **File**: `store.db` (SQLite)
- **Tables**:
  - `blobs`: Contains messages (JSON format) and DAG structure (protobuf)
  - `meta`: Contains session metadata (hex-encoded JSON)

**Metadata Format:**
```json
{
  "agentId": "ab3eeb44-9e3d-489d-a50c-7636eb4a1008",
  "latestRootBlobId": "aedeb7b9ba78c81b335aa3b00199c133a8a2dfc6d031055de8ff2ea6e7cdf268",
  "name": "New Agent",
  "createdAt": 1762601593249,
  "mode": "auto-run"
}
```

**Message Format:**
- JSON blobs start with `0x7B` (`{`)
- Protobuf blobs contain DAG structure
- Messages include: `role`, `content`, `type`, etc.

**Project Association:**
- Uses MD5 hash of absolute project path
- Hash is deterministic (same path = same hash)
- Moving project breaks association (hash changes)

#### Cursor IDE Project Directories (❌ Not Conversations)

**Storage Location:**
```
~/.cursor/projects/{encoded_project_path}/
```

**Example:**
- Project: `/Users/alialnuaimi/projects/dev/claude/CCUI/claudecodeui`
- Encoded: `Users-alialnuaimi-projects-dev-claude-CCUI-claudecodeui`
- Full Path: `~/.cursor/projects/Users-alialnuaimi-projects-dev-claude-CCUI-claudecodeui/`

**Contents:**
- `mcp-cache.json`: MCP server cache
- `mcps/`: MCP tool descriptor directories
- **Note**: These do NOT contain conversation data

### What We Need to Find

#### 1. Cursor IDE Conversation Storage

**Hypotheses:**
1. **Same as CLI**: `~/.cursor/chats/` but with different hash algorithm
2. **Application Support**: `~/Library/Application Support/Cursor/chats/` (macOS)
3. **Centralized DB**: Single database with project references
4. **Project-specific**: `~/.cursor/projects/{project}/chats/`

**Investigation Steps:**
```bash
# 1. Check macOS Application Support
find ~/Library/Application\ Support/Cursor -name "*.db" -o -name "*.sqlite" 2>/dev/null

# 2. Check for IDE-specific databases
find ~/.cursor -type f -name "*.db" -o -name "*.sqlite" 2>/dev/null | grep -v chats

# 3. Check for conversation-related files
find ~/.cursor -type f \( -name "*conversation*" -o -name "*chat*" -o -name "*session*" \) 2>/dev/null

# 4. Check if IDE uses chats directory with different structure
ls -la ~/.cursor/chats/ | head -20
```

#### 2. Conversation Format Differences

**Questions:**
- Does IDE use same SQLite structure?
- Are message formats identical?
- Is metadata structure the same?
- Are there IDE-specific fields?

#### 3. Project Association Method

**Questions:**
- Does IDE use MD5 hash like CLI?
- Different hashing algorithm?
- Workspace-based instead of path-based?
- Metadata-based association?

### Testing Strategy

1. **Create Test Conversation in Cursor IDE**
   - Open Cursor IDE
   - Start a conversation in a test project
   - Trace where it's stored

2. **Compare with CLI Session**
   - Create CLI session in same project
   - Compare storage locations
   - Compare database structures
   - Compare message formats

3. **Verify Project Association**
   - Check how IDE associates conversation with project
   - Test with multiple projects
   - Test with moved/renamed projects

### Known Limitations

1. **CLI Session Discovery**:
   - Requires known project path (from Claude projects or manual addition)
   - Cannot discover Cursor-only projects automatically
   - Project relocation breaks history

2. **Potential IDE Limitations**:
   - May have same limitations as CLI
   - May have different limitations
   - May require different discovery approach

### Next Steps

1. ✅ Document current CLI session structure
2. ✅ Document IDE project directory structure
3. ❓ Locate IDE conversation storage
4. ❓ Analyze IDE conversation format
5. ❓ Determine project association method
6. ❓ Implement discovery mechanism
7. ❓ Test with real IDE conversations

### References

- Cursor CLI session code: `server/projects.js` → `getCursorSessions()`
- Cursor CLI endpoint: `server/routes/cursor.js`
- Project discovery: `server/projects.js` → `getProjects()`

