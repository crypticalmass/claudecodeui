# Project Governance & Rules

## Overview

This document establishes the governance structure, rules, and expectations for all contributors (human and AI agents) working on this project.

## Core Principles

1. **Private Fork Independence**: We maintain a private fork and never contribute back to upstream
2. **Task-Based Development**: All work is tracked as documented tasks
3. **Approval-First Culture**: Irreversible operations require explicit approval
4. **Complete Documentation**: Everything is documented and traceable
5. **Safety Over Speed**: Better to ask than to make irreversible mistakes

## Repository Structure

### Our Repositories

**Private Fork** (PRIMARY):
- URL: `git@github.com:crypticalmass/claudecodeui.git`
- Status: PRIVATE
- Purpose: All development work
- Access: Write access for team

**Upstream** (REFERENCE ONLY):
- URL: `https://github.com/siteboon/claudecodeui.git`
- Status: PUBLIC
- Purpose: Read-only reference, sync source
- Access: Read-only, NEVER write

### Relationship

```
Upstream (PUBLIC)
    ↓ (pull/sync only)
Private Fork (PRIVATE)
    ↑ (NEVER push back)
```

## Absolute Rules

### Rule #1: Never Expose Private Work

**FORBIDDEN:**
- ❌ Submitting PRs to upstream
- ❌ Creating issues in upstream
- ❌ Pushing branches to upstream
- ❌ Referencing private work in public spaces
- ❌ Publishing private customizations
- ❌ Forking private repo to public

**ALLOWED:**
- ✅ Reading upstream code
- ✅ Pulling upstream updates
- ✅ Viewing upstream issues (for reference)
- ✅ Reading upstream documentation

**RATIONALE:**
- Protects proprietary customizations
- Maintains privacy of development work
- Prevents confusion about official vs fork features
- Cannot be undone once exposed publicly

### Rule #2: Approval Required for Irreversible Actions

**Categories Requiring Approval:**

1. **Git Operations:**
   - Force pushing
   - Deleting branches with unmerged work
   - Rewriting published history
   - Changing remotes
   - Any push operation

2. **External Communications:**
   - Creating GitHub issues
   - Submitting pull requests
   - Sending emails/notifications
   - Posting to external services

3. **Destructive Operations:**
   - Deleting files/directories
   - Dropping database tables
   - Removing dependencies
   - Uninstalling packages
   - Shutting down services

4. **Production Changes:**
   - Deploying to production
   - Modifying production databases
   - Changing production configs
   - Restarting production services

5. **Security Operations:**
   - Modifying authentication
   - Changing security configs
   - Exposing secrets
   - Modifying access controls

**RATIONALE:**
- Prevents irreversible mistakes
- Ensures human oversight for critical operations
- Maintains system stability
- Protects security

### Rule #3: Everything is Documented

**Required Documentation:**

- **All Tasks**: Detailed specifications in `/TASKS/`
- **All Changes**: Documented in task files
- **All Decisions**: Rationale recorded
- **All Deployments**: Tracked in deployment history
- **All Issues**: GitHub issues in private fork
- **All PRs**: Pull requests with complete descriptions

**RATIONALE:**
- Provides complete audit trail
- Enables knowledge transfer
- Facilitates debugging
- Supports compliance

### Rule #4: Task-Based Development

**Process:**

1. **Every change starts with a task**
2. **Task specifications are detailed**
3. **Tasks are tracked in `TASK_ASSIGNMENTS.md`**
4. **Commits reference task IDs**
5. **Tasks are reviewed before completion**

**RATIONALE:**
- Ensures organized development
- Enables parallel work
- Provides clear accountability
- Facilitates project management

## Agent Behavior Expectations

### For All AI Agents

**MUST:**
- Read `.cursorrules` and `AGENT_RULES.md` before starting work
- Verify git remotes before any push operation
- Ask for approval for irreversible operations
- Follow task specifications exactly
- Update `TASK_ASSIGNMENTS.md` when claiming/completing tasks
- Use conventional commit format
- Test changes before committing
- Document all decisions

**MUST NOT:**
- Push to upstream repository
- Create issues in upstream repository
- Make irreversible changes without approval
- Expose private work publicly
- Skip task documentation
- Ignore approval requirements
- Assume permissions

### Agent Modes

**Standard Mode** (Default):
- Ask for approval for all irreversible operations
- Follow all rules strictly
- Verify before executing

**Sandbox Mode** (Explicit):
- When user says "sandbox mode" or "auto-approve all"
- Still NEVER push to upstream
- Still follow private fork rules
- Can proceed with local operations without asking

**Emergency Mode**:
- Even in emergencies, ask for:
  - Production changes
  - Data deletion
  - Security modifications
  - External communications

## Development Workflow

### 1. Task Selection

```
Agent → Check /TASKS/ directory
     → Read task specification
     → Check dependencies
     → Claim in TASK_ASSIGNMENTS.md
```

### 2. Implementation

```
Agent → Create feature branch
     → Follow task spec
     → Make changes
     → Test locally
     → Commit with task reference
```

### 3. Approval & Push

```
Agent → Request approval for push
User  → Approves
Agent → Verify remote (origin = private fork)
     → Push to private fork
     → Update task status
```

### 4. Pull Request

```
Agent → Request approval for PR
User  → Approves
Agent → Create PR in private fork
     → Reference task and issue
     → Wait for review
```

### 5. Completion

```
Agent → Mark task complete
     → Update documentation
     → Clean up branches
```

## Approval Process

### Standard Approval Request

```
⚠️ APPROVAL REQUIRED

Action: [What you want to do]
Type: [Category]
Impact: [What will happen]
Reversible: [Yes/No and how]
Alternative: [Safer option if available]
Risk Level: [Low/Medium/High/Critical]

Proceed? (yes/no)
```

### Batch Approval

User can approve batches:
```
User: "Approve all documentation updates for this session"
Agent: ✅ Batch approval recorded
```

Then proceed without asking for each documentation operation.

### Emergency Override

User can override in emergencies:
```
User: "Emergency mode - approve all operations"
Agent: ⚠️ Emergency mode active - proceeding with caution
```

But still ask for:
- Upstream operations
- Production changes
- Data deletion
- Security modifications

## Quality Standards

### Code Quality

- **Style**: Follow existing code style
- **Tests**: Write tests for new features
- **Linting**: No linter errors
- **Documentation**: Update docs with changes
- **Comments**: Clear comments for complex logic

### Commit Quality

- **Convention**: Follow conventional commits
- **Atomic**: One logical change per commit
- **Clear**: Descriptive messages
- **Referenced**: Link to tasks/issues
- **Tested**: Test before committing

### Documentation Quality

- **Complete**: Cover all aspects
- **Clear**: Easy to understand
- **Examples**: Include code examples
- **Current**: Keep up to date
- **Cross-referenced**: Link related docs

## Enforcement

### Violations

**Severity Levels:**

**CRITICAL** (Immediate stop):
- Pushing to upstream
- Exposing private work publicly
- Deleting production data

**HIGH** (Requires correction):
- Force pushing without approval
- Skipping task documentation
- Ignoring approval requirements

**MEDIUM** (Warning):
- Poor commit messages
- Missing documentation
- Not following conventions

**LOW** (Guidance):
- Style inconsistencies
- Minor documentation gaps

### Consequences

**For Agents:**
- Critical: Operation blocked, user notified
- High: Operation rolled back if possible
- Medium: Warning issued, correction required
- Low: Guidance provided

**For Humans:**
- Follow standard code review process
- Discuss in PR reviews
- Update documentation as needed

## Governance Structure

### Roles

**Project Owner:**
- Final decision authority
- Approves major changes
- Sets project direction

**Project Manager (AI):**
- Coordinates agent work
- Tracks task progress
- Reviews completed work
- Integrates changes

**Contributors (AI Agents):**
- Execute tasks
- Follow specifications
- Request approvals
- Document work

### Decision Making

**Requires Owner Approval:**
- Major architectural changes
- Security modifications
- Production deployments
- Breaking changes
- Policy changes

**Project Manager Can Approve:**
- Task assignments
- Documentation updates
- Non-breaking features
- Bug fixes
- Refactoring

**Agents Can Proceed:**
- Following approved tasks
- Local development
- Documentation (within scope)
- Testing

## Continuous Improvement

### Review Cycles

**Weekly:**
- Review completed tasks
- Update documentation
- Assess progress

**Monthly:**
- Review governance effectiveness
- Update rules if needed
- Improve processes

**Per Release:**
- Complete audit trail review
- Documentation completeness check
- Security review

### Feedback Loop

**Agents Should:**
- Report unclear rules
- Suggest improvements
- Document issues encountered

**Project Manager Should:**
- Collect feedback
- Propose rule updates
- Improve documentation

**Owner Should:**
- Review proposals
- Approve updates
- Communicate changes

## Related Documentation

- `AGENT_RULES.md` - Detailed approval requirements
- `.cursorrules` - Agent project rules
- `CLAUDE.md` - Project overview for Claude
- `FORK_WORKFLOW.md` - Fork management
- `GITHUB_WORKFLOW.md` - GitHub workflow
- `TASK_WORKFLOW.md` - Task-based development
- `CONTRIBUTING.md` - Contribution guidelines

## Summary

**Key Takeaways:**

1. **Private fork only** - never push to upstream
2. **Ask before irreversible** operations
3. **Document everything**
4. **Follow task-based** workflow
5. **Quality over speed**
6. **Safety first**

**When in doubt:**
- Check `AGENT_RULES.md`
- Ask for approval
- Document your decision
- Err on the side of caution

---

**These governance rules exist to protect the project, maintain quality, and prevent costly mistakes. All contributors must follow them strictly.**

**Last Updated**: 2025-01-15
**Version**: 1.0
**Owner**: Project Owner

