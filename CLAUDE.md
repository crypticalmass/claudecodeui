# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Claude Code UI** is a web-based interface for both Claude Code CLI and Cursor CLI, providing desktop and mobile access to AI-powered development sessions. Current version: 1.11.0

- **Private Fork**: git@github.com:crypticalmass/claudecodeui.git (PRIVATE)
- **Upstream**: https://github.com/siteboon/claudecodeui.git (PUBLIC - READ ONLY)
- **NPM Package**: `@siteboon/claude-code-ui`
- **License**: GNU General Public License v3.0

### 🚨 CRITICAL: Private Fork Rules

**This is a PRIVATE FORK. NEVER submit PRs to upstream.**

- ❌ NO pull requests to upstream
- ❌ NO pushing to upstream
- ❌ NO issues in upstream repository
- ✅ ALL work stays in private fork
- ✅ Pull from upstream (read-only)

See `AGENT_RULES.md` for complete approval requirements.

## Technology Stack

### Frontend
- **React 18** with Vite 7.0.4, React Router DOM 6.8.1
- **Styling**: Tailwind CSS 3.4.0 with `@tailwindcss/typography`
- **Code Editor**: CodeMirror 6 (JavaScript, Python, CSS, HTML, JSON, Markdown support)
- **Terminal**: XTerm.js with WebGL addon
- **Icons**: Lucide React

### Backend
- **Node.js v20+** with ES Modules, Express 4.18.2
- **Real-time**: WebSocket (ws 8.14.2), node-pty for shell integration
- **Database**: SQLite3 / better-sqlite3 for authentication
- **Auth**: JWT (jsonwebtoken), bcrypt 6.0.0
- **File System**: Chokidar 4.0.3 for watching, Multer 2.0.1 for uploads

## Common Commands

### Development
```bash
# Start development server with hot reload (concurrent server + client)
npm run dev

# Start backend only
npm run server

# Start frontend only (Vite dev server)
npm run client
```

### Production
```bash
# Build frontend (output to dist/)
npm run build

# Build and start production server
npm run start

# Preview production build
npm run preview
```

### Release Management
```bash
# Automated versioning, changelog, npm publish, GitHub release
npm run release
```

### One-Click Operation
```bash
# No installation required
npx @siteboon/claude-code-ui
```

## Project Structure

```
claudecodeui/
├── server/                      # Backend Node.js server
│   ├── index.js                 # Main entry (Express + WebSocket on port 3001)
│   ├── claude-cli.js            # Claude CLI process spawning
│   ├── cursor-cli.js            # Cursor CLI process spawning
│   ├── projects.js              # Project discovery & management
│   ├── database/
│   │   ├── db.js                # SQLite initialization
│   │   └── init.sql             # Schema (users table)
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   └── routes/
│       ├── auth.js              # Authentication API
│       ├── git.js               # Git operations
│       ├── mcp.js               # MCP server management
│       ├── cursor.js            # Cursor-specific routes
│       └── taskmaster.js        # TaskMaster AI integration
│
├── src/                         # Frontend React application
│   ├── main.jsx                 # React entry point
│   ├── App.jsx                  # Main app with routing and session protection
│   ├── components/
│   │   ├── ChatInterface.jsx   # Main chat UI
│   │   ├── Sidebar.jsx          # Project/session navigation
│   │   ├── FileTree.jsx         # File explorer
│   │   ├── GitPanel.jsx         # Git operations UI
│   │   ├── Shell.jsx            # Terminal interface
│   │   └── CodeEditor.jsx       # Code editing with CodeMirror
│   ├── contexts/                # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── ThemeContext.jsx
│   │   ├── WebSocketContext.jsx
│   │   └── TaskMasterContext.jsx
│   └── hooks/                   # Custom React hooks
│       ├── useLocalStorage.jsx
│       ├── useVersionCheck.js
│       └── useAudioRecorder.js
│
├── public/                      # Static assets & PWA
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service worker
│
├── vite.config.js               # Dev server on 5173, proxy /api → 3001
├── tailwind.config.js           # Dark mode: class-based
└── .release-it.json             # Automated release config
```

## Key Architecture Concepts

### Session Protection System (App.jsx)

**Problem**: Automatic WebSocket project updates would refresh the sidebar and clear chat messages during active conversations.

**Solution**: Track "active sessions" and pause project updates during conversations:

1. User sends message → session marked "active" via `markSessionAsActive(sessionId)`
2. Project updates skipped while session active
3. Conversation completes/aborts → session marked "inactive" via `markSessionAsInactive(sessionId)`
4. Project updates resume
5. Temporary sessions replaced with real session IDs via `replaceTemporarySession(realSessionId)`

**Critical**: When modifying chat or project refresh logic, ensure session protection remains functional to prevent interrupting active chats.

### Project Discovery System (server/projects.js)

**Claude Projects** (`~/.claude/projects/`):
- Directory names encode project paths (forward slashes replaced with dashes)
- `.jsonl` files contain conversation history with `cwd` field
- Metadata in `~/.claude/project-config.json`

**Cursor Projects** (`~/.cursor/chats/`):
- Directories named with MD5 hash of absolute project path
- SQLite databases (`store.db`) contain session data
- **Limitation**: Project path NOT stored in DB (only in MD5 hash)
- Cannot auto-discover Cursor-only projects without manual path addition
- Project relocation breaks history (MD5 hash changes)

**Manual Project Addition**: Users can add project paths via UI to enable Cursor session discovery.

### WebSocket Communication (server/index.js)

Two WebSocket endpoints:
- **`/ws`** - Chat messages, project updates, session management
- **`/shell`** - Terminal/shell interactions with PTY

**Authentication**: Token-based verification on connection via `authenticateWebSocket` middleware.

**File System Watching**: Chokidar monitors `~/.claude/projects/` with 300ms debounce, broadcasts changes to all connected clients.

### Authentication System

- SQLite database stores user credentials (single user system)
- JWT tokens for session management
- bcrypt password hashing
- Middleware: `authenticateToken` (HTTP), `authenticateWebSocket` (WS)

## Configuration

### Environment Variables (.env)
```bash
PORT=3001                    # Server port (default: 3001)
NODE_ENV=production          # Environment
JWT_SECRET=your-secret-here  # Authentication secret (REQUIRED)
OPENAI_API_KEY=              # Optional: Whisper transcription
LOG_LEVEL=info
```

### Vite Configuration
- Dev server: Port 5173 (configurable)
- API proxy: `/api` → `http://localhost:3001`
- WebSocket proxy: `/ws`, `/shell`
- Build output: `dist/`

### Tailwind Configuration
- Dark mode: class-based (`className="dark"`)
- Custom CSS variables for theming
- Safe area insets for mobile (PWA)

## Security Considerations

- **All tools disabled by default** - Users must manually enable tools via Settings UI
- JWT authentication required for all API routes
- WebSocket connections require token authentication
- File path validation to prevent directory traversal
- bcrypt password hashing (never store plaintext)

## State Management

- **React Context API** for global state (auth, theme, websocket, tasks)
- **localStorage** for user preferences (message history limited to 50 messages)
- **Session storage** for temporary data
- No Redux/Zustand - pure Context API

## Performance Optimizations

- **Project directory extraction cached** - Prevents redundant parsing
- **Object reference preservation** - Minimizes React re-renders
- **Debounced file system events** - 300ms delay on Chokidar watchers
- **Message truncation** - localStorage quota protection (50 max)
- **WebGL-accelerated terminal** - XTerm.js WebGL addon

## Special Features

### Progressive Web App (PWA)
- Service worker (`public/sw.js`) enables offline capabilities
- Web manifest (`public/manifest.json`) for "Add to Home Screen"
- Mobile-optimized with safe area insets
- Touch-friendly interface with swipe gestures

### Optional Integrations

**TaskMaster AI** - AI-powered project management:
- Task generation from PRDs
- Visual Kanban boards
- Progress tracking
- Setup: https://github.com/eyaltoledano/claude-task-master

**OpenAI Whisper** - Voice transcription:
- Audio → text conversion
- Requires `OPENAI_API_KEY`
- Prompt enhancement modes

### Git Explorer
- View changes, stage files, commit
- Branch switching
- Integration with project context

### MCP (Model Context Protocol)
- Add MCP servers through Settings UI
- Configuration management via `server/routes/mcp.js`
- Server detection utilities in `server/utils/mcp-detector.js`

## Error Handling Patterns

- Graceful fallbacks for missing directories (return empty arrays)
- ENOENT errors caught and handled
- localStorage quota exceeded protection
- WebSocket reconnection logic
- PTY cleanup on process termination

## Development Notes

### Testing
- **No test suite currently exists** - No `.test.js`, `.spec.js`, or `__tests__/` directories
- Manual testing required for changes
- Test thoroughly across desktop and mobile viewports

### Contributing Guidelines (from README)
1. Fork and clone repository
2. Install dependencies: `npm install`
3. Create feature branch: `git checkout -b feature/amazing-feature`
4. Follow existing code style
5. Commit with [Conventional Commits](https://conventionalcommits.org/) format
6. Submit PR with clear description and screenshots (for UI changes)

### Code Style
- ES Modules (not CommonJS)
- Functional React components with hooks
- Tailwind utility classes over custom CSS
- JSX comments for complex logic

## Common Issues & Solutions

### "No Claude projects found"
- Ensure Claude CLI is properly installed
- Run `claude` command in at least one project directory to initialize
- Verify `~/.claude/projects/` exists and has proper permissions

### File Explorer Issues
- Check project directory permissions
- Verify project path exists and is accessible
- Review server console logs for detailed errors
- Cannot access system directories outside project scope

### WebSocket Connection Failures
- Verify `JWT_SECRET` is set in `.env`
- Check that server is running on correct port
- Ensure no firewall blocking WebSocket connections
- Review browser console for authentication errors

## Model Compatibility

Works with:
- Claude Sonnet 4
- Claude Opus 4.1
- GPT-5

## Task-Based Development

**All development work is tracked as tasks.** This ensures complete audit trail and coordination between multiple agents.

### Task System

- **Task Specifications**: `/TASKS/` directory contains detailed task files
- **Task Tracking**: `TASK_ASSIGNMENTS.md` tracks status and assignments
- **Agent Rules**: `.cursorrules` provides project context for agents
- **GitHub Issue**: `GITHUB_ISSUE.md` contains the master issue for current work

### Working with Tasks

1. **Browse Available Tasks**: Check `/TASKS/` directory
2. **Read Task Spec**: Each task has detailed instructions and acceptance criteria
3. **Claim Task**: Update `TASK_ASSIGNMENTS.md` with your name
4. **Implement**: Follow task specification
5. **Test**: Verify acceptance criteria met
6. **Commit**: Use conventional commit format with task ID
7. **Update Status**: Mark complete in `TASK_ASSIGNMENTS.md`

### Commit Format

```
type(scope): description

Task: TASK-XXX
```

Example:
```
docs(cursor): add Cursor CLI setup guide

Task: TASK-003
```

### Current Active Tasks

See `TASK_ASSIGNMENTS.md` for current task status and assignments.

## File Path Reference

**Main Entry Points**:
- Backend: `server/index.js:1` (Express + WebSocket server)
- Frontend: `src/main.jsx:1` (React root)
- NPM Binary: `claude-code-ui` command executes `server/index.js`

**Core Systems**:
- Session Protection: `src/App.jsx:1` (markSessionAsActive, markSessionAsInactive, replaceTemporarySession)
- Project Discovery: `server/projects.js:1` (getProjects, getCursorProjects)
- CLI Integration: `server/claude-sdk.js:1`, `server/cursor-cli.js:1`
- Authentication: `server/middleware/auth.js:1`, `server/database/init.sql:1`

**Configuration**:
- Environment: `.env.example:1`
- Build: `vite.config.js:1`
- Styles: `tailwind.config.js:1`
- Release: `.release-it.json:1`

**Task Management**:
- Task Specs: `/TASKS/` directory
- Task Tracking: `TASK_ASSIGNMENTS.md`
- Agent Rules: `.cursorrules`
- GitHub Issue: `GITHUB_ISSUE.md`
