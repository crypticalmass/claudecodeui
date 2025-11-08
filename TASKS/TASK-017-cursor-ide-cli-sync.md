# TASK-017: Cursor IDE to CLI Parallel Workflow Sync

## Task Information

- **Task ID**: TASK-017
- **Title**: Create Cursor IDE to CLI Parallel Workflow Sync
- **Status**: Pending
- **Priority**: Medium
- **Estimated Effort**: 6-10 hours
- **Dependencies**: TASK-016 (Cursor IDE conversation discovery)
- **Assigned To**: Unassigned

## Objective

Create a "Labs Parallel" workflow where Cursor IDE conversations automatically trigger parallel Cursor CLI sessions. This allows users to:
1. Start a conversation in Cursor IDE
2. Automatically have a matching CLI session created
3. Switch between IDE and CLI seamlessly
4. Pick up work in CLI with full context from IDE conversation

## Use Case

**Scenario**: User is working in Cursor IDE and starts a conversation. They want to:
- Continue the same conversation in CLI
- Have CLI know exactly where they are in the conversation
- Switch between IDE and CLI without losing context

**Solution**: Automatic sync mechanism that:
- Detects new Cursor IDE conversations
- Creates corresponding CLI session with same context
- Syncs conversation state between IDE and CLI

## Architecture

### Option A: File System Watcher + Script

**Components:**
1. **Watcher Script** (`scripts/cursor-ide-sync.sh` or `.js`)
   - Monitors Cursor IDE conversation storage
   - Detects new conversations
   - Triggers CLI session creation

2. **Sync Service** (optional Node.js service)
   - Runs as background process
   - Watches for IDE conversation changes
   - Creates/manages CLI sessions

3. **Integration with Claude Code UI**
   - UI option to enable/disable sync
   - Display sync status
   - Show linked IDE/CLI sessions

### Option B: Claude Code UI Integration

**Components:**
1. **Backend Watcher** (in `server/index.js`)
   - Extend existing file watcher
   - Watch Cursor IDE conversation directories
   - Trigger CLI session creation

2. **API Endpoints**
   - `POST /api/cursor/sync-ide-session` - Manually sync IDE session
   - `GET /api/cursor/sync-status` - Get sync status
   - `POST /api/cursor/sync-settings` - Configure sync behavior

3. **Frontend UI**
   - Settings toggle for auto-sync
   - Sync status indicator
   - Manual sync button

## Implementation Approaches

### Approach 1: Simple Bash Script (Quick Start)

**Script**: `scripts/cursor-ide-cli-sync.sh`

```bash
#!/bin/bash
# Watches Cursor IDE conversations and triggers CLI sessions

CURSOR_CHATS_DIR="$HOME/.cursor/chats"
PROJECT_PATH="$1"  # Project path to monitor

# Calculate MD5 hash for project
PROJECT_HASH=$(echo -n "$PROJECT_PATH" | md5)

# Watch for new IDE sessions
inotifywait -m -r "$CURSOR_CHATS_DIR/$PROJECT_HASH" -e create |
while read path action file; do
    # New session detected
    SESSION_ID=$(basename "$file")
    
    # Trigger CLI session with same context
    cursor-agent --resume="$SESSION_ID" --project="$PROJECT_PATH" &
done
```

**Pros:**
- Simple, quick to implement
- No UI changes needed
- Can run as background service

**Cons:**
- Limited to file system watching
- No UI feedback
- Manual setup required

### Approach 2: Node.js Service (Recommended)

**Service**: `server/services/cursor-sync-service.js`

```javascript
import chokidar from 'chokidar';
import { spawnCursor } from '../cursor-cli.js';
import crypto from 'crypto';

class CursorIdeSyncService {
  constructor(projectPath) {
    this.projectPath = projectPath;
    this.projectHash = crypto.createHash('md5')
      .update(projectPath)
      .digest('hex');
    this.watcher = null;
    this.syncedSessions = new Set();
  }

  start() {
    const chatsPath = path.join(
      process.env.HOME,
      '.cursor',
      'chats',
      this.projectHash
    );

    this.watcher = chokidar.watch(chatsPath, {
      ignored: /(^|[\/\\])\../,
      persistent: true,
      ignoreInitial: true
    });

    this.watcher.on('addDir', (sessionPath) => {
      const sessionId = path.basename(sessionPath);
      if (!this.syncedSessions.has(sessionId)) {
        this.syncSession(sessionId);
      }
    });
  }

  async syncSession(sessionId) {
    // Create CLI session with IDE context
    // This would need to extract context from IDE session
    console.log(`Syncing IDE session ${sessionId} to CLI...`);
    
    // TODO: Extract conversation context from IDE session
    // TODO: Create CLI session with same context
    
    this.syncedSessions.add(sessionId);
  }

  stop() {
    if (this.watcher) {
      this.watcher.close();
    }
  }
}
```

**Pros:**
- Integrated with Claude Code UI
- Can provide UI feedback
- More control over sync behavior
- Can extract and sync conversation context

**Cons:**
- More complex implementation
- Requires UI changes
- Needs to understand IDE conversation format

### Approach 3: Hybrid - Script + API

**Components:**
1. Standalone script for watching
2. API endpoint for triggering sync
3. Optional UI integration

**Pros:**
- Flexible - can work standalone or integrated
- Can be enabled/disabled easily
- Good for testing

**Cons:**
- More moving parts
- Requires coordination between components

## Technical Challenges

### 1. Context Extraction

**Problem**: How to extract conversation context from IDE session?

**Solutions:**
- Read IDE session database
- Extract last N messages
- Extract project context
- Extract file context (open files, etc.)

### 2. Session Matching

**Problem**: How to match IDE session with CLI session?

**Solutions:**
- Use same session ID (if possible)
- Create mapping table
- Use metadata to link sessions
- Store sync relationship in database

### 3. Bidirectional Sync

**Problem**: Should changes in CLI also sync back to IDE?

**Options:**
- One-way: IDE → CLI only
- Two-way: IDE ↔ CLI
- Manual: User triggers sync when needed

### 4. Conflict Resolution

**Problem**: What if IDE and CLI sessions diverge?

**Solutions:**
- Last-write-wins
- User chooses which to keep
- Merge conversations
- Create new session with both contexts

## Acceptance Criteria

- [ ] Script/service detects new Cursor IDE conversations
- [ ] Automatically creates corresponding CLI session
- [ ] CLI session has context from IDE conversation
- [ ] UI option to enable/disable auto-sync
- [ ] Manual sync trigger available
- [ ] Sync status visible in UI
- [ ] Documentation for setup and usage
- [ ] Works with multiple projects
- [ ] Handles edge cases (moved projects, deleted sessions, etc.)

## Implementation Steps

### Phase 1: Research & Design

1. **Understand IDE Conversation Format**
   - Complete TASK-016 first (IDE conversation discovery)
   - Understand how to extract context
   - Identify sync points

2. **Design Sync Mechanism**
   - Choose approach (script vs service vs hybrid)
   - Define sync behavior
   - Design data flow

3. **Prototype**
   - Create simple proof-of-concept
   - Test with real IDE conversations
   - Validate approach

### Phase 2: Core Implementation

1. **Create Watcher**
   - Implement file system watcher
   - Detect new IDE sessions
   - Trigger sync process

2. **Context Extraction**
   - Read IDE session database
   - Extract conversation messages
   - Extract project context
   - Extract file context (if available)

3. **CLI Session Creation**
   - Create CLI session with extracted context
   - Link IDE and CLI sessions
   - Store sync relationship

### Phase 3: Integration

1. **Backend Integration**
   - Add sync service to `server/index.js`
   - Create API endpoints
   - Add database tables for sync tracking

2. **Frontend Integration**
   - Add sync settings to UI
   - Add sync status indicator
   - Add manual sync button
   - Show linked sessions

### Phase 4: Testing & Documentation

1. **Testing**
   - Test with real IDE conversations
   - Test with multiple projects
   - Test edge cases
   - Performance testing

2. **Documentation**
   - Setup instructions
   - Usage guide
   - Troubleshooting
   - Update CLAUDE.md

## Configuration

### Settings

```json
{
  "cursorIdeSync": {
    "enabled": true,
    "autoSync": true,
    "syncDirection": "ide-to-cli",
    "extractContext": {
      "messages": true,
      "projectFiles": true,
      "openFiles": false
    },
    "projects": [
      "/path/to/project1",
      "/path/to/project2"
    ]
  }
}
```

### Environment Variables

```bash
CURSOR_IDE_SYNC_ENABLED=true
CURSOR_IDE_SYNC_AUTO=true
CURSOR_IDE_SYNC_DIRECTION=ide-to-cli
```

## Related Tasks

- **TASK-016**: Cursor IDE Conversation Support (prerequisite)
- **TASK-018**: Bidirectional Cursor IDE/CLI Sync (future enhancement)

## Future Enhancements

1. **Bidirectional Sync**: CLI → IDE sync
2. **Real-time Sync**: Live sync as conversations happen
3. **Context Merging**: Merge multiple conversation contexts
4. **Sync History**: Track sync operations
5. **Conflict Resolution UI**: Visual conflict resolution
6. **Multi-project Sync**: Sync across multiple projects

## Notes

- This is a workflow enhancement feature
- Should be opt-in (not enabled by default)
- May require understanding Cursor IDE internals
- Consider performance impact of file watching
- May need rate limiting for sync operations

