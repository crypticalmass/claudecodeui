# Agent Rules & Approval Requirements

## Overview

This document defines strict rules for AI agents working on this project. These rules ensure safety, maintain privacy, and prevent irreversible mistakes.

## Private Fork Policy

### Repository Status

- **Private Fork**: `git@github.com:crypticalmass/claudecodeui.git` (PRIVATE)
- **Upstream**: `https://github.com/siteboon/claudecodeui.git` (PUBLIC)
- **Relationship**: One-way sync (pull only, never push)

### Absolute Rules

**🚫 NEVER EVER:**
1. Submit pull requests to upstream repository
2. Push any branches to upstream
3. Create issues in upstream repository  
4. Make any write operations to upstream
5. Expose private fork work publicly
6. Reference private work in public spaces

**✅ ALWAYS:**
1. Work exclusively in private fork
2. Create issues in private fork only
3. Submit PRs to private fork only
4. Keep all development private
5. Verify remote before any push operation

**Rationale**: We maintain a private fork with custom features. Exposing our work to the public upstream would:
- Reveal proprietary customizations
- Create confusion about official vs. fork features
- Potentially violate privacy expectations
- Cannot be undone once public

## Approval Requirements

### Category 1: Irreversible Git Operations

**ALWAYS require approval:**

```
⚠️ APPROVAL REQUIRED

Action: Force push to main branch
Type: Irreversible Git Operation
Impact: Will rewrite published history, affecting all collaborators
Reversible: No - history will be permanently altered
Alternative: Create new branch and merge instead

Proceed? (yes/no)
```

**Operations requiring approval:**
- `git push --force` or `git push -f`
- `git push --force-with-lease`
- Deleting branches with unmerged commits
- `git reset --hard` on shared branches
- Rewriting history with `git rebase` on published branches
- Changing git remote URLs
- Any push to upstream remote
- Deleting tags
- Force updating references

**Why**: These operations cannot be undone and affect other developers.

### Category 2: External Communications

**ALWAYS require approval:**

```
⚠️ APPROVAL REQUIRED

Action: Create GitHub issue for bug report
Type: External Communication
Impact: Will create public record in repository
Reversible: Partially - can delete but may be cached/indexed
Alternative: Discuss internally first

Proceed? (yes/no)
```

**Operations requiring approval:**
- Creating GitHub issues (any repository)
- Submitting pull requests (any repository)
- Sending emails or notifications
- Posting to external services (Slack, Discord, etc.)
- Creating public gists or pastes
- Publishing packages
- Posting comments on issues/PRs
- Creating releases
- Any action creating external records

**Why**: External communications are public, permanent, and represent the project.

### Category 3: Destructive Operations

**ALWAYS require approval:**

```
⚠️ APPROVAL REQUIRED

Action: Delete server/routes/user-settings.js
Type: Destructive Operation
Impact: Will permanently remove file with user settings API
Reversible: Yes - can restore from git history
Alternative: Move to archive/ directory instead

Proceed? (yes/no)
```

**Operations requiring approval:**
- Deleting files or directories
- Dropping database tables
- Removing npm dependencies
- Uninstalling global packages
- Removing environment variables
- Deleting configuration files
- Clearing caches that can't be rebuilt
- Removing user data
- Shutting down services
- Stopping processes

**Why**: Destructive operations can cause data loss or system failures.

### Category 4: Production Changes

**ALWAYS require approval:**

```
⚠️ APPROVAL REQUIRED

Action: Deploy to production server
Type: Production Change
Impact: Will update live system affecting real users
Reversible: Yes - can rollback but may cause downtime
Alternative: Deploy to staging first

Proceed? (yes/no)
```

**Operations requiring approval:**
- Deploying to production
- Modifying production databases
- Changing production environment variables
- Restarting production services
- Modifying production configurations
- Running migrations on production
- Changing DNS settings
- Updating SSL certificates
- Modifying firewall rules
- Any operation affecting live users

**Why**: Production changes affect real users and require careful planning.

### Category 5: Security-Sensitive Operations

**ALWAYS require approval:**

```
⚠️ APPROVAL REQUIRED

Action: Modify JWT authentication middleware
Type: Security-Sensitive Operation
Impact: Could affect authentication for all users
Reversible: Yes - can revert but security implications serious
Alternative: Review security implications first

Proceed? (yes/no)
```

**Operations requiring approval:**
- Modifying authentication code
- Changing security configurations
- Exposing secrets or credentials
- Modifying access controls
- Changing encryption settings
- Updating security dependencies
- Modifying CORS settings
- Changing API key validation
- Updating password hashing
- Modifying session management

**Why**: Security mistakes can compromise the entire system.

## Safe Operations (No Approval Needed)

### Read Operations
- Reading files
- Viewing git history (`git log`, `git show`)
- Checking status (`git status`, `git diff`)
- Listing directories
- Viewing configurations
- Reading documentation
- Checking dependencies

### Local Development
- Creating feature branches
- Making commits to feature branches
- Running tests locally
- Building locally
- Installing dev dependencies
- Running linters
- Formatting code
- Creating local tags

### Documentation
- Creating/updating markdown files
- Adding code comments
- Updating README files
- Creating task specifications
- Writing guides
- Adding examples
- Updating changelogs (draft)

### Sandbox Mode
- When explicitly told "sandbox mode"
- When user says "auto-approve all"
- When user says "proceed without asking"
- During approved batch operations
- In explicitly marked safe environments

## How to Request Approval

### Standard Format

```
⚠️ APPROVAL REQUIRED

Action: [Clear description of what you want to do]
Type: [Category from above]
Impact: [What will happen if approved]
Reversible: [Yes/No - explain how if yes]
Alternative: [Safer option if available]
Risk Level: [Low/Medium/High/Critical]

Proceed? (yes/no)
```

### Example: Safe Operation

```
Action: Create CURSOR_SETUP.md documentation file
Type: Documentation (Safe Operation)
Impact: New file with Cursor CLI setup instructions
Reversible: Yes - can delete or modify anytime
Risk Level: None

No approval needed - proceeding.
```

### Example: Requires Approval

```
⚠️ APPROVAL REQUIRED

Action: git push origin main
Type: Irreversible Git Operation
Impact: Will publish 5 commits to remote repository
Reversible: No - commits become part of permanent history
Alternative: Create PR for review first
Risk Level: Medium

Proceed? (yes/no)
```

## Special Cases

### Batch Operations

If user approves a batch of operations:
```
User: "Approve all documentation updates in this session"
Agent: ✅ Batch approval recorded for documentation operations
```

Then proceed with all documentation operations without asking again.

### Emergency Situations

Even in emergencies, ask for approval for:
- Production changes
- Data deletion
- Security modifications
- External communications

### Uncertainty

**When in doubt, ask.** It's better to ask unnecessarily than to make an irreversible mistake.

## Verification Checklist

Before any operation, agents should verify:

- [ ] Is this operation reversible?
- [ ] Does this affect external systems?
- [ ] Could this expose private information?
- [ ] Does this modify production?
- [ ] Is this a git operation that publishes work?
- [ ] Could this affect other developers?
- [ ] Does this involve security?
- [ ] Is this destructive?

If **any** answer is "yes" or "unsure" → **ASK FOR APPROVAL**

## Git Remote Verification

Before any `git push`:

```bash
# Verify current remote
git remote -v

# Should show:
# origin    git@github.com:crypticalmass/claudecodeui.git (PRIVATE)
# upstream  https://github.com/siteboon/claudecodeui.git (PUBLIC)

# NEVER push to upstream
# ALWAYS push to origin (after approval)
```

## Consequences of Violations

### Submitting PR to Upstream
- **Impact**: Exposes private work publicly
- **Reversibility**: Cannot be undone (even if deleted, cached)
- **Severity**: CRITICAL
- **Prevention**: Always verify remote before PR

### Force Pushing Without Approval
- **Impact**: Rewrites history, breaks other developers' work
- **Reversibility**: Extremely difficult
- **Severity**: HIGH
- **Prevention**: Never force push without explicit approval

### Deleting Production Data
- **Impact**: Data loss affecting users
- **Reversibility**: Depends on backups
- **Severity**: CRITICAL
- **Prevention**: Always ask before destructive operations

## Best Practices

1. **Read First**: Always read files before modifying
2. **Verify Remotes**: Check git remotes before pushing
3. **Test Locally**: Test changes before committing
4. **Small Commits**: Make small, focused commits
5. **Clear Messages**: Write clear commit messages
6. **Ask When Unsure**: Better to ask than to make mistakes
7. **Document Changes**: Update documentation with changes
8. **Review Before Push**: Review commits before pushing

## Agent Self-Check

Before taking any action, ask yourself:

1. Is this operation safe and reversible?
2. Have I verified I'm working in the private fork?
3. Could this affect other people or systems?
4. Do I have all the information I need?
5. Have I read the relevant documentation?
6. Is there a safer alternative?
7. Should I ask for approval?

## Summary

**Golden Rule**: When in doubt, ask for approval.

**Remember**:
- Private fork only - never push to upstream
- Ask before irreversible operations
- Ask before external communications
- Ask before destructive operations
- Ask before production changes
- Ask before security modifications

**Safe to proceed**:
- Reading and viewing
- Local development
- Documentation
- When explicitly approved

---

**These rules exist to protect the project, maintain privacy, and prevent costly mistakes. Follow them strictly.**

