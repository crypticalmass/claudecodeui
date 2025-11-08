# TASK-016: Add Cursor IDE Conversation Support

## Task Information

- **Task ID**: TASK-016
- **Title**: Add Cursor IDE Conversation Support to Claude Code UI
- **Status**: Pending
- **Priority**: Medium
- **Estimated Effort**: 8-12 hours
- **Dependencies**: None
- **Assigned To**: Unassigned

## Objective

Enable Claude Code UI to discover, display, and interact with Cursor IDE conversations (not just Cursor CLI sessions). Currently, Claude Code UI only supports:
- Claude CLI sessions (from `claude` command)
- Cursor CLI sessions (from `cursor-agent` command)

This task will add support for Cursor IDE conversations (the chat interface within the Cursor IDE application itself).

## Background

Users expect to see all their AI conversations in Claude Code UI, including:
1. Claude CLI sessions ✅ (already supported)
2. Cursor CLI sessions ✅ (already supported)
3. Cursor IDE conversations ❌ (not yet supported)

Cursor IDE conversations are stored differently than Cursor CLI sessions. We need to:
1. Discover where Cursor IDE stores its conversations
2. Implement a discovery mechanism
3. Display them in the sidebar alongside other sessions
4. Allow viewing and potentially resuming these conversations

## Research Required

### 1. Cursor IDE Storage Location

Investigate where Cursor IDE stores conversations:
- Check `~/Library/Application Support/Cursor/` (macOS)
- Check `~/.cursor/` for IDE-specific storage
- Check for SQLite databases or JSON files
- Verify if IDE uses same `~/.cursor/chats/` structure as CLI

### 2. Conversation Format

Determine the storage format:
- SQLite database structure
- JSON format
- Protobuf format
- File naming conventions
- Session metadata structure

### 3. Project Association

Figure out how IDE conversations are associated with projects:
- Path-based association
- Workspace-based association
- Hash-based association (like CLI)
- Metadata-based association

## Acceptance Criteria

- [ ] Cursor IDE conversation storage location identified and documented
- [ ] Discovery mechanism implemented in `server/projects.js`
- [ ] IDE conversations appear in sidebar for known projects
- [ ] IDE conversations display with proper metadata (name, date, message count)
- [ ] Users can view IDE conversation history
- [ ] IDE conversations are distinguished from CLI sessions in UI (icon/badge)
- [ ] Documentation updated with IDE conversation support
- [ ] No breaking changes to existing CLI session support

## Implementation Steps

### Phase 1: Research & Discovery

1. **Locate Cursor IDE Storage**
   ```bash
   # Check common locations
   find ~/Library/Application\ Support/Cursor -name "*.db" -o -name "*.sqlite"
   find ~/.cursor -type f -name "*.db" -o -name "*.sqlite"
   ls -la ~/Library/Application\ Support/Cursor/
   ```

2. **Analyze Storage Format**
   - Inspect database schemas
   - Identify conversation structure
   - Map project paths to conversations
   - Document findings

3. **Test with Real Data**
   - Create test conversation in Cursor IDE
   - Trace where it's stored
   - Verify project association

### Phase 2: Implementation

1. **Add Discovery Function**
   - Create `getCursorIdeSessions()` in `server/projects.js`
   - Similar to `getCursorSessions()` but for IDE conversations
   - Handle different storage location/format

2. **Integrate with Project Discovery**
   - Call `getCursorIdeSessions()` in `getProjects()`
   - Add `cursorIdeSessions` array to project objects
   - Merge with existing `cursorSessions` for display

3. **Update Frontend**
   - Modify `Sidebar.jsx` to display IDE sessions
   - Add visual distinction (icon/badge) for IDE vs CLI
   - Update `ChatInterface.jsx` to handle IDE session loading

4. **Add API Endpoints**
   - `GET /api/cursor-ide/sessions?projectPath=...` - List IDE sessions
   - `GET /api/cursor-ide/sessions/:sessionId` - Get conversation messages
   - Follow existing Cursor CLI endpoint patterns

### Phase 3: Testing

1. **Test Discovery**
   - Verify IDE conversations appear in sidebar
   - Check project association accuracy
   - Test with multiple projects

2. **Test Display**
   - Verify conversation metadata displays correctly
   - Check date/time formatting
   - Verify message count accuracy

3. **Test Viewing**
   - Load conversation history
   - Verify message rendering
   - Check for any format issues

### Phase 4: Documentation

1. **Update Documentation**
   - Add IDE conversation support to `CLAUDE.md`
   - Update `CUSTOMIZATIONS.md` if needed
   - Document storage locations and formats

2. **Code Comments**
   - Add JSDoc comments to new functions
   - Document any assumptions or limitations
   - Explain IDE vs CLI differences

## Technical Considerations

### Storage Location Hypotheses

1. **Same as CLI**: `~/.cursor/chats/{md5_hash}/` (unlikely, but possible)
2. **Application Support**: `~/Library/Application Support/Cursor/chats/` (macOS)
3. **Project-specific**: `~/.cursor/projects/{project}/chats/` (possible)
4. **Centralized**: Single database with project references (possible)

### Implementation Strategy

- **Option A**: Extend existing `getCursorSessions()` to check both CLI and IDE locations
- **Option B**: Create separate `getCursorIdeSessions()` and merge results
- **Option C**: Unified discovery that handles both automatically

**Recommendation**: Option B for clarity and maintainability, with shared utility functions.

### UI/UX Considerations

- **Visual Distinction**: Use different icon or badge for IDE sessions
- **Labeling**: "Cursor IDE" vs "Cursor CLI" in tooltips
- **Grouping**: Option to group/separate IDE and CLI sessions
- **Filtering**: Allow filtering by session type

## Potential Challenges

1. **Storage Location Unknown**: May require reverse engineering
2. **Format Differences**: IDE may use different format than CLI
3. **Project Association**: May not be straightforward
4. **Cross-Platform**: Different locations on Windows/Linux
5. **Version Differences**: Cursor IDE updates may change storage

## Success Metrics

- IDE conversations visible in Claude Code UI sidebar
- Users can view their IDE conversation history
- No performance degradation from additional discovery
- Clear distinction between IDE and CLI sessions

## Related Files

- `server/projects.js` - Project discovery system
- `server/routes/cursor.js` - Cursor CLI endpoints (reference)
- `src/components/Sidebar.jsx` - Session display
- `src/components/ChatInterface.jsx` - Conversation viewing

## Notes

- This is a feature enhancement, not a bug fix
- Should not break existing CLI session support
- May require investigation of Cursor IDE internals
- Consider creating a separate branch for development

## Future Enhancements

- Resume IDE conversations from Claude Code UI
- Create new IDE conversations from Claude Code UI
- Sync conversations between IDE and UI
- Search across all conversation types

