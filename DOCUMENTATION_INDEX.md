# Documentation Index

Complete index of all project documentation with descriptions and cross-references.

## 📋 Quick Navigation

- [Project Overview](#project-overview)
- [Getting Started](#getting-started)
- [Development](#development)
- [Deployment](#deployment)
- [Governance & Rules](#governance--rules)
- [Task Management](#task-management)
- [Git & GitHub](#git--github)
- [Customizations](#customizations)

---

## Project Overview

### README.md
**Purpose**: Main project documentation  
**Audience**: All users  
**Contains**:
- Project description
- Features overview
- Quick start guide
- Installation instructions
- Basic usage

**Related**: `CLAUDE.md`, `DEPLOYMENT.md`

### CLAUDE.md
**Purpose**: Guidance for Claude Code agents  
**Audience**: Claude AI agents  
**Contains**:
- Project overview
- Technology stack
- Common commands
- Architecture concepts
- File path reference
- Task-based development section

**Related**: `.cursorrules`, `AGENT_RULES.md`, `TASK_ASSIGNMENTS.md`

### .cursorrules
**Purpose**: Rules for Cursor AI agents  
**Audience**: Cursor AI agents  
**Contains**:
- Project context
- Development workflow
- Task execution guidelines
- Code style guidelines
- **Agent approval requirements**
- Private fork rules

**Related**: `CLAUDE.md`, `AGENT_RULES.md`, `PROJECT_GOVERNANCE.md`

---

## Getting Started

### Quick Start
1. Read `README.md` - Project overview
2. Check `DEPLOYMENT.md` - Installation & setup
3. Review `CURSOR_SETUP.md` (if using Cursor CLI)
4. Read `CONTRIBUTING.md` - How to contribute

### For Developers
1. Read `.cursorrules` or `CLAUDE.md` (depending on your AI agent)
2. Review `AGENT_RULES.md` - Approval requirements
3. Check `GITHUB_WORKFLOW.md` - Git workflow
4. Browse `TASKS/` - Available tasks

---

## Development

### CONTRIBUTING.md
**Purpose**: Contribution guidelines  
**Audience**: All contributors  
**Contains**:
- Getting started
- Making changes
- Submitting PRs
- Code style

**Status**: To be created (TASK-011)  
**Related**: `GITHUB_WORKFLOW.md`, `TASK_WORKFLOW.md`

### Code Style & Patterns
**Documented in**:
- `.cursorrules` - General guidelines
- `CLAUDE.md` - Common patterns
- `CONTRIBUTING.md` - Detailed style guide (to be created)

---

## Deployment

### DEPLOYMENT.md
**Purpose**: Production deployment guide  
**Audience**: System administrators, DevOps  
**Contains**:
- Prerequisites (Node.js, PM2, CLI tools)
- Installation steps
- Environment configuration
- PM2 deployment
- **Cursor CLI sections** (TASK-001)
- Troubleshooting

**Related**: `DEPLOYMENT_CHECKLIST.md`, `DEPLOYMENT_HISTORY.md`, `ecosystem.config.js`

### DEPLOYMENT_CHECKLIST.md
**Purpose**: Step-by-step deployment checklist  
**Audience**: Deployers  
**Contains**:
- Pre-deployment checks
- Build & installation steps
- PM2 setup
- Verification steps
- Git operations

**Related**: `DEPLOYMENT.md`, `DEPLOYMENT_TASKS.md`

### DEPLOYMENT_HISTORY.md
**Purpose**: Deployment audit trail  
**Audience**: Project managers, auditors  
**Contains**:
- Deployment records
- Success/failure tracking
- Issues encountered
- Lessons learned

**Status**: To be created (TASK-013)  
**Related**: `DEPLOYMENT.md`, `DEPLOYMENT_TASKS.md`

### DEPLOYMENT_TASKS.md
**Purpose**: Deployment task tracking  
**Audience**: Project managers  
**Contains**:
- Deployment task structure
- Task templates
- Examples

**Status**: To be created (TASK-009)  
**Related**: `DEPLOYMENT_HISTORY.md`, `TASK_WORKFLOW.md`

### CURSOR_SETUP.md
**Purpose**: Cursor CLI setup guide  
**Audience**: Cursor CLI users  
**Contains**:
- Installation (all platforms)
- Authentication
- Project initialization
- Configuration
- Integration with UI
- Troubleshooting

**Status**: To be created (TASK-003)  
**Related**: `DEPLOYMENT.md`, `CUSTOMIZATIONS.md`

### ecosystem.config.js
**Purpose**: PM2 configuration  
**Audience**: DevOps  
**Contains**:
- PM2 process settings
- Environment variables
- Logging configuration
- Auto-restart settings

**Related**: `DEPLOYMENT.md`, `.env.production.example`

### .env.production.example
**Purpose**: Environment variable template  
**Audience**: Deployers  
**Contains**:
- Required variables
- Optional variables
- Configuration examples

**Related**: `DEPLOYMENT.md`, `scripts/setup-env.sh`

### scripts/setup-env.sh
**Purpose**: Interactive environment setup  
**Audience**: Deployers  
**Contains**:
- Interactive prompts
- Secure secret generation
- File creation
- Permission setting

**Related**: `.env.production.example`, `DEPLOYMENT.md`

---

## Governance & Rules

### PROJECT_GOVERNANCE.md
**Purpose**: Overall project governance  
**Audience**: All contributors  
**Contains**:
- Core principles
- Absolute rules
- Agent behavior expectations
- Approval processes
- Quality standards
- Enforcement

**Related**: `AGENT_RULES.md`, `FORK_WORKFLOW.md`, `GITHUB_WORKFLOW.md`

### AGENT_RULES.md
**Purpose**: Detailed approval requirements for AI agents  
**Audience**: AI agents, project managers  
**Contains**:
- 5 approval categories
- Safe operations list
- Approval request format
- Private fork rules
- Verification checklists
- Examples

**Related**: `.cursorrules`, `CLAUDE.md`, `PROJECT_GOVERNANCE.md`

### FORK_WORKFLOW.md
**Purpose**: Private fork management  
**Audience**: All contributors  
**Contains**:
- Fork strategy
- **Critical rules** (never push to upstream)
- Syncing from upstream
- Branch strategy
- Commit conventions

**Related**: `GITHUB_WORKFLOW.md`, `PROJECT_GOVERNANCE.md`, `AGENT_RULES.md`

---

## Task Management

### TASK_ASSIGNMENTS.md
**Purpose**: Central task tracking  
**Audience**: All contributors, project manager  
**Contains**:
- Task status table
- Assignment tracking
- Dependency graph
- Recommended order
- Coordination guidelines

**Related**: `TASKS/`, `GITHUB_ISSUE.md`, `TASK_WORKFLOW.md`

### TASKS/ Directory
**Purpose**: Detailed task specifications  
**Audience**: Task executors  
**Contains**:
- Individual task files
- Acceptance criteria
- Implementation steps
- Testing requirements

**Files**:
- `TASKS/README.md` - Directory overview
- `TASKS/TASK-001-update-deployment-cursor.md`
- `TASKS/TASK-002-update-customizations-cursor.md`
- `TASKS/TASK-003-create-cursor-setup.md`
- `TASKS/TASK-004-create-github-workflow.md`
- *(More to be created)*

**Related**: `TASK_ASSIGNMENTS.md`, `TASK_WORKFLOW.md`

### TASK_WORKFLOW.md
**Purpose**: Task-based development process  
**Audience**: All contributors  
**Contains**:
- Task creation guidelines
- Task lifecycle
- Task documentation
- Task linking

**Status**: To be created (TASK-008)  
**Related**: `TASK_ASSIGNMENTS.md`, `TASKS/`, `GITHUB_WORKFLOW.md`

### GITHUB_ISSUE.md
**Purpose**: Master GitHub issue for documentation project  
**Audience**: Project manager, GitHub  
**Contains**:
- Complete issue description
- All 15 tasks with checkboxes
- Success criteria
- Timeline

**Related**: `TASK_ASSIGNMENTS.md`, `TASKS/`

---

## Git & GitHub

### GITHUB_WORKFLOW.md
**Purpose**: Complete GitHub workflow guide  
**Audience**: All contributors  
**Contains**:
- **Private fork policy** (critical)
- Branching strategy
- Commit conventions
- PR process
- Worktree workflow
- Troubleshooting

**Status**: To be created (TASK-004)  
**Related**: `FORK_WORKFLOW.md`, `AGENT_RULES.md`, `CONTRIBUTING.md`

### .github/ Directory
**Purpose**: GitHub templates and configuration  
**Audience**: GitHub, contributors  
**Contains**:
- Issue templates
- PR template
- Workflows (future CI/CD)

**Status**: To be created (TASK-006, TASK-007)  
**Related**: `GITHUB_WORKFLOW.md`, `PROJECT_MANAGEMENT.md`

---

## Customizations

### CUSTOMIZATIONS.md
**Purpose**: Document fork customizations  
**Audience**: Developers, maintainers  
**Contains**:
- Persistent settings system
- Port change (3001 → 4001)
- **Cursor CLI integration** (TASK-002)
- Database enhancements
- Deployment configuration

**Related**: `FORK_WORKFLOW.md`, `DEPLOYMENT.md`

### IMPLEMENTATION_SUMMARY.md
**Purpose**: Summary of implementation work  
**Audience**: Project manager  
**Contains**:
- Completed tasks
- Files created/modified
- Next steps
- Key customizations

**Related**: `CUSTOMIZATIONS.md`, `DEPLOYMENT_CHECKLIST.md`

---

## Project Management

### PROJECT_MANAGEMENT.md
**Purpose**: Project management practices  
**Audience**: Project managers  
**Contains**:
- Issue management
- Milestone planning
- Release management
- Labels system

**Status**: To be created (TASK-010)  
**Related**: `TASK_WORKFLOW.md`, `GITHUB_WORKFLOW.md`

### CHANGELOG.md
**Purpose**: Version history  
**Audience**: All users  
**Contains**:
- Version history
- Changes by category
- Breaking changes
- Migration guides

**Status**: To be created (TASK-012)  
**Related**: `PROJECT_MANAGEMENT.md`

---

## Agent Coordination

### AGENT_COORDINATION_SUMMARY.md
**Purpose**: Agent coordination overview  
**Audience**: Project manager, agents  
**Contains**:
- Setup summary
- How agents work
- Task overview
- Coordination guidelines

**Related**: `TASK_ASSIGNMENTS.md`, `.cursorrules`, `AGENT_RULES.md`

---

## Complete Document Map

```
claudecodeui/
├── README.md                          # Main project docs
├── CLAUDE.md                          # Claude agent guidance
├── .cursorrules                       # Cursor agent rules
│
├── Governance & Rules/
│   ├── PROJECT_GOVERNANCE.md          # Overall governance
│   ├── AGENT_RULES.md                 # Approval requirements
│   └── FORK_WORKFLOW.md               # Fork management
│
├── Development/
│   ├── GITHUB_WORKFLOW.md             # Git workflow (TASK-004)
│   ├── CONTRIBUTING.md                # Contribution guide (TASK-011)
│   └── CUSTOMIZATIONS.md              # Fork customizations
│
├── Deployment/
│   ├── DEPLOYMENT.md                  # Deployment guide
│   ├── DEPLOYMENT_CHECKLIST.md        # Deployment checklist
│   ├── DEPLOYMENT_HISTORY.md          # Audit trail (TASK-013)
│   ├── DEPLOYMENT_TASKS.md            # Task tracking (TASK-009)
│   ├── CURSOR_SETUP.md                # Cursor setup (TASK-003)
│   ├── ecosystem.config.js            # PM2 config
│   ├── .env.production.example        # Env template
│   └── scripts/setup-env.sh           # Setup script
│
├── Task Management/
│   ├── TASK_ASSIGNMENTS.md            # Task tracking
│   ├── TASK_WORKFLOW.md               # Task process (TASK-008)
│   ├── GITHUB_ISSUE.md                # Master issue
│   ├── TASKS/                         # Task specifications
│   │   ├── README.md
│   │   ├── TASK-001-*.md
│   │   ├── TASK-002-*.md
│   │   ├── TASK-003-*.md
│   │   └── TASK-004-*.md
│   └── AGENT_COORDINATION_SUMMARY.md  # Agent coordination
│
├── Project Management/
│   ├── PROJECT_MANAGEMENT.md          # PM practices (TASK-010)
│   ├── CHANGELOG.md                   # Version history (TASK-012)
│   └── DOCUMENTATION_INDEX.md         # This file
│
└── GitHub/
    └── .github/
        ├── ISSUE_TEMPLATE/            # Issue templates (TASK-006)
        └── pull_request_template.md   # PR template (TASK-007)
```

---

## Document Status

### ✅ Complete
- README.md
- CLAUDE.md (updated)
- .cursorrules (updated)
- PROJECT_GOVERNANCE.md
- AGENT_RULES.md
- FORK_WORKFLOW.md (updated)
- DEPLOYMENT.md (needs Cursor sections - TASK-001)
- DEPLOYMENT_CHECKLIST.md
- CUSTOMIZATIONS.md (needs Cursor section - TASK-002)
- IMPLEMENTATION_SUMMARY.md
- TASK_ASSIGNMENTS.md
- GITHUB_ISSUE.md
- AGENT_COORDINATION_SUMMARY.md
- DOCUMENTATION_INDEX.md (this file)
- ecosystem.config.js
- .env.production.example
- scripts/setup-env.sh
- TASKS/README.md
- TASKS/TASK-001-*.md
- TASKS/TASK-002-*.md
- TASKS/TASK-003-*.md
- TASKS/TASK-004-*.md

### 📝 To Be Created (Tasks)
- CURSOR_SETUP.md (TASK-003)
- GITHUB_WORKFLOW.md (TASK-004)
- .github/ISSUE_TEMPLATE/* (TASK-006)
- .github/pull_request_template.md (TASK-007)
- TASK_WORKFLOW.md (TASK-008)
- DEPLOYMENT_TASKS.md (TASK-009)
- PROJECT_MANAGEMENT.md (TASK-010)
- CONTRIBUTING.md (TASK-011)
- CHANGELOG.md (TASK-012)
- DEPLOYMENT_HISTORY.md (TASK-013)

### 🔄 To Be Updated (Tasks)
- DEPLOYMENT.md - Add Cursor sections (TASK-001)
- CUSTOMIZATIONS.md - Add Cursor integration (TASK-002)
- README.md - Enhance Cursor docs (TASK-004)
- All docs - Cross-reference (TASK-015)

---

## Quick Reference by Audience

### For New Contributors
1. `README.md` - Project overview
2. `CONTRIBUTING.md` - How to contribute (TASK-011)
3. `GITHUB_WORKFLOW.md` - Git workflow (TASK-004)
4. `AGENT_RULES.md` - Approval requirements

### For AI Agents
1. `.cursorrules` or `CLAUDE.md` - Project context
2. `AGENT_RULES.md` - Approval requirements
3. `TASK_ASSIGNMENTS.md` - Available tasks
4. `TASKS/` - Task specifications

### For Deployers
1. `DEPLOYMENT.md` - Deployment guide
2. `DEPLOYMENT_CHECKLIST.md` - Step-by-step
3. `CURSOR_SETUP.md` - Cursor CLI setup (TASK-003)
4. `ecosystem.config.js` - PM2 config

### For Project Managers
1. `PROJECT_GOVERNANCE.md` - Governance rules
2. `TASK_ASSIGNMENTS.md` - Task tracking
3. `AGENT_COORDINATION_SUMMARY.md` - Agent coordination
4. `PROJECT_MANAGEMENT.md` - PM practices (TASK-010)

### For Maintainers
1. `CUSTOMIZATIONS.md` - Fork customizations
2. `FORK_WORKFLOW.md` - Fork management
3. `CHANGELOG.md` - Version history (TASK-012)
4. `DEPLOYMENT_HISTORY.md` - Deployment audit (TASK-013)

---

## Search by Topic

### Private Fork Policy
- `PROJECT_GOVERNANCE.md` - Overall rules
- `AGENT_RULES.md` - Detailed requirements
- `FORK_WORKFLOW.md` - Fork management
- `.cursorrules` - Agent rules
- `CLAUDE.md` - Critical warning

### Approval Requirements
- `AGENT_RULES.md` - Complete guide
- `.cursorrules` - Agent section
- `PROJECT_GOVERNANCE.md` - Governance rules

### Task Management
- `TASK_ASSIGNMENTS.md` - Tracking
- `TASKS/` - Specifications
- `TASK_WORKFLOW.md` - Process (TASK-008)
- `GITHUB_ISSUE.md` - Master issue

### Cursor CLI
- `CURSOR_SETUP.md` - Setup guide (TASK-003)
- `DEPLOYMENT.md` - Deployment (TASK-001)
- `CUSTOMIZATIONS.md` - Integration (TASK-002)
- `README.md` - Overview (TASK-004)

### Git & GitHub
- `GITHUB_WORKFLOW.md` - Workflow (TASK-004)
- `FORK_WORKFLOW.md` - Fork management
- `.github/` - Templates (TASK-006, TASK-007)

---

## Maintenance

### Updating This Index

When creating new documentation:
1. Add entry in appropriate section
2. Update document map
3. Update status section
4. Add cross-references
5. Update quick reference

### Regular Reviews

- **Weekly**: Check for new documents
- **Monthly**: Verify all links work
- **Per Release**: Update status section

---

**Last Updated**: 2025-01-15  
**Maintained By**: Project Manager  
**Version**: 1.0

