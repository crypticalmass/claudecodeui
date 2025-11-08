# TASK-004: Create GITHUB_WORKFLOW.md

## Task Information

- **Task ID**: TASK-004
- **Title**: Create comprehensive GitHub workflow documentation
- **Status**: Pending
- **Priority**: High
- **Estimated Effort**: 2-3 hours
- **Dependencies**: None
- **Assigned To**: Unassigned

## Objective

Create comprehensive documentation for GitHub workflow including branching strategy, commit conventions, PR process, and worktree management. Emphasize private fork policy and approval requirements.

## Acceptance Criteria

- [ ] Branching strategy clearly defined
- [ ] Commit message conventions documented
- [ ] PR process explained
- [ ] Worktree workflow documented
- [ ] Private fork rules emphasized
- [ ] Approval requirements listed
- [ ] Examples provided for all workflows
- [ ] Troubleshooting section included

## Background

Need clear GitHub workflow documentation that emphasizes our private fork policy and ensures agents understand what requires approval before execution.

## Implementation Steps

Create `GITHUB_WORKFLOW.md` with the following comprehensive structure:

```markdown
# GitHub Workflow Guide

Complete guide for working with our private fork, including branching, commits, PRs, and worktrees.

## 🚨 CRITICAL: Private Fork Policy

### Repository Structure

- **Private Fork**: `git@github.com:crypticalmass/claudecodeui.git` (PRIVATE)
- **Upstream**: `https://github.com/siteboon/claudecodeui.git` (PUBLIC - READ ONLY)

### Absolute Rules

**❌ NEVER:**
- Submit PRs to upstream
- Push to upstream
- Create issues in upstream
- Reference private work publicly
- Expose customizations

**✅ ALWAYS:**
- Work in private fork only
- Create issues in private fork
- Submit PRs to private fork
- Keep work private
- Verify remote before push

**⚠️ REQUIRES APPROVAL:**
- Any git push operation
- Creating GitHub issues
- Submitting pull requests
- Force pushing
- Deleting branches
- Changing remotes

See `AGENT_RULES.md` for complete approval requirements.

## Branching Strategy

### Branch Types

**Main Branches:**
- `main` - Production-ready code, protected
- `develop` - Integration branch (optional)

**Feature Branches:**
- `feature/short-description` - New features
- `feature/TASK-XXX-description` - Task-based features

**Fix Branches:**
- `fix/issue-number-description` - Bug fixes
- `fix/TASK-XXX-description` - Task-based fixes

**Documentation Branches:**
- `docs/what-is-documented` - Documentation updates
- `docs/TASK-XXX-description` - Task-based docs

**Deployment Branches:**
- `deploy/version-or-date` - Deployment preparation
- `deploy/YYYY-MM-DD-description` - Date-based deploys

### Branch Naming Rules

**Format**: `type/description-in-kebab-case`

**Good Examples:**
- `feature/cursor-cli-integration`
- `fix/settings-persistence-bug`
- `docs/deployment-guide`
- `feature/TASK-001-cursor-docs`

**Bad Examples:**
- `my-branch` (no type)
- `feature/Fix Bug` (not kebab-case)
- `NEW_FEATURE` (wrong format)

### Branch Lifecycle

1. **Create**: Branch from `main` or `develop`
2. **Work**: Make commits following conventions
3. **Push**: Push to private fork (after approval)
4. **PR**: Create pull request in private fork
5. **Review**: Code review and testing
6. **Merge**: Merge to target branch
7. **Delete**: Delete feature branch after merge

### Protected Branches

**`main` branch protection:**
- Requires pull request reviews
- Requires status checks to pass
- No force pushing
- No deletion

## Commit Message Conventions

### Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]

Task: TASK-XXX (if applicable)
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting previous commit
- `deploy`: Deployment-related changes

### Scopes

Common scopes:
- `cursor`: Cursor CLI related
- `claude`: Claude Code related
- `deployment`: Deployment configuration
- `settings`: Settings system
- `auth`: Authentication
- `database`: Database changes
- `ui`: User interface
- `api`: API changes
- `docs`: Documentation

### Examples

**Feature:**
```
feat(cursor): add Cursor CLI setup guide

Add comprehensive setup documentation for Cursor CLI including
installation, authentication, and project initialization.

Task: TASK-003
```

**Fix:**
```
fix(settings): correct user settings persistence

Settings were not persisting after server restart due to missing
database write operation.

Closes #42
Task: TASK-015
```

**Documentation:**
```
docs(deployment): update with Cursor CLI sections

- Add Cursor installation instructions
- Document Cursor authentication
- Add troubleshooting section

Task: TASK-001
```

**Chore:**
```
chore(deps): update dependencies

Update npm dependencies to latest versions for security patches.
```

### Commit Best Practices

1. **Atomic Commits**: One logical change per commit
2. **Clear Messages**: Describe what and why, not how
3. **Present Tense**: "Add feature" not "Added feature"
4. **Imperative Mood**: "Fix bug" not "Fixes bug"
5. **Reference Issues**: Link to issues/tasks when applicable
6. **Keep it Short**: First line ≤ 50 chars, body ≤ 72 chars per line

## Pull Request Process

### Creating a PR

**⚠️ APPROVAL REQUIRED before creating PR**

1. **Ensure work is complete**:
   - All acceptance criteria met
   - Tests passing
   - Documentation updated
   - No linter errors

2. **Push branch** (after approval):
   ```bash
   # Verify remote
   git remote -v
   # Should show origin = private fork
   
   # Push (after approval)
   git push origin feature/my-feature
   ```

3. **Create PR in private fork**:
   - Go to private fork on GitHub
   - Click "New Pull Request"
   - Select base: `main`, compare: `feature/my-feature`
   - Fill out PR template

### PR Template

```markdown
## Description
[Clear description of changes]

## Related Issues
Closes #XX
Task: TASK-XXX

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Refactoring
- [ ] Other: ___

## Testing
- [ ] Tested locally
- [ ] Tests pass
- [ ] Manual testing performed

## Checklist
- [ ] Code follows style guidelines
- [ ] Documentation updated
- [ ] No linter errors
- [ ] Commit messages follow conventions
- [ ] Branch is up to date with main

## Screenshots (if applicable)
[Add screenshots for UI changes]

## Breaking Changes
[List any breaking changes]
```

### PR Review Process

1. **Self-Review**: Review your own PR first
2. **Request Review**: Assign reviewers
3. **Address Feedback**: Make requested changes
4. **Update PR**: Push additional commits
5. **Approval**: Wait for approval
6. **Merge**: Merge when approved

### Merging

**Merge Strategies:**
- **Squash and Merge**: For feature branches (preferred)
- **Merge Commit**: For important history preservation
- **Rebase and Merge**: For clean linear history

**After Merge:**
```bash
# Delete remote branch
git push origin --delete feature/my-feature

# Delete local branch
git checkout main
git branch -d feature/my-feature

# Update local main
git pull origin main
```

## Worktree Workflow

### What are Worktrees?

Git worktrees allow multiple working directories from one repository, enabling parallel work on different branches.

### When to Use Worktrees

- Working on multiple features simultaneously
- Testing different branches
- Comparing implementations
- Emergency fixes while working on feature

### Creating Worktrees

```bash
# Create worktree for new feature
git worktree add ../claudecodeui-feature-cursor feature/cursor-docs

# Create worktree for existing branch
git worktree add ../claudecodeui-fix-bug fix/settings-bug

# Create worktree with new branch
git worktree add -b feature/new-feature ../claudecodeui-new-feature main
```

### Working with Worktrees

```bash
# List all worktrees
git worktree list

# Navigate to worktree
cd ../claudecodeui-feature-cursor

# Work normally
git status
git add .
git commit -m "feat: add feature"

# Push (after approval)
git push origin feature/cursor-docs
```

### Removing Worktrees

```bash
# Remove worktree
git worktree remove ../claudecodeui-feature-cursor

# Or manually delete and prune
rm -rf ../claudecodeui-feature-cursor
git worktree prune
```

### Worktree Best Practices

1. **Naming**: Use descriptive directory names
2. **Location**: Keep worktrees in parent directory
3. **Cleanup**: Remove worktrees when done
4. **Branches**: One worktree per branch
5. **Main**: Keep main worktree for main branch

## Git Remote Management

### Verifying Remotes

**ALWAYS verify before pushing:**

```bash
git remote -v

# Should show:
# origin    git@github.com:crypticalmass/claudecodeui.git (fetch)
# origin    git@github.com:crypticalmass/claudecodeui.git (push)
# upstream  https://github.com/siteboon/claudecodeui.git (fetch)
# upstream  https://github.com/siteboon/claudecodeui.git (push)
```

### Setting Up Remotes

```bash
# Add upstream (if not exists)
git remote add upstream https://github.com/siteboon/claudecodeui.git

# Verify
git remote -v
```

### Syncing from Upstream

```bash
# Fetch upstream changes
git fetch upstream

# View changes
git log upstream/main..HEAD

# Merge upstream changes (after review)
git checkout main
git merge upstream/main

# Resolve conflicts if any
# Test thoroughly
# Push to private fork (after approval)
git push origin main
```

### NEVER Push to Upstream

```bash
# ❌ NEVER DO THIS
git push upstream main

# ✅ ALWAYS push to origin
git push origin main  # (after approval)
```

## Troubleshooting

### Wrong Remote

**Problem**: Accidentally pushed to upstream

**Prevention**:
- Always verify remote before push
- Set upstream as read-only in git config

**Solution** (if caught immediately):
```bash
# Contact repository owner to delete branch
# Cannot be fully undone if public
```

### Merge Conflicts

**Problem**: Conflicts when merging

**Solution**:
```bash
# Update your branch
git checkout feature/my-feature
git fetch origin
git rebase origin/main

# Resolve conflicts
# Edit conflicted files
git add .
git rebase --continue

# Push (after approval)
git push origin feature/my-feature --force-with-lease
```

### Accidental Commit to Main

**Problem**: Committed directly to main

**Solution**:
```bash
# Create branch from current state
git branch feature/accidental-work

# Reset main to origin
git checkout main
git reset --hard origin/main

# Continue work in feature branch
git checkout feature/accidental-work
```

### Force Push Needed

**Problem**: Need to force push after rebase

**⚠️ REQUIRES APPROVAL**

```bash
# Use --force-with-lease (safer)
git push origin feature/my-feature --force-with-lease

# NEVER use --force on shared branches
```

## Best Practices Summary

1. **Always verify remote** before pushing
2. **Never push to upstream** - private fork only
3. **Ask for approval** before push/PR/issues
4. **Follow commit conventions** strictly
5. **Keep commits atomic** and focused
6. **Write clear PR descriptions**
7. **Test before pushing**
8. **Update documentation** with changes
9. **Clean up branches** after merge
10. **Communicate** with team

## Quick Reference

### Common Commands

```bash
# Create feature branch
git checkout -b feature/my-feature

# Commit with message
git commit -m "feat(scope): description"

# Push (after approval)
git push origin feature/my-feature

# Create PR
# Go to GitHub and create PR

# Update branch
git fetch origin
git rebase origin/main

# Merge main into feature
git checkout feature/my-feature
git merge main

# Delete branch after merge
git branch -d feature/my-feature
git push origin --delete feature/my-feature
```

### Approval Checklist

Before any operation, check if approval needed:

- [ ] Is this a git push?
- [ ] Am I creating an issue/PR?
- [ ] Am I force pushing?
- [ ] Am I deleting a branch?
- [ ] Am I changing remotes?

If YES to any → **ASK FOR APPROVAL**

## Related Documentation

- `AGENT_RULES.md` - Complete approval requirements
- `FORK_WORKFLOW.md` - Fork management
- `TASK_WORKFLOW.md` - Task-based development
- `CONTRIBUTING.md` - Contribution guidelines
```

## Files to Create

- `GITHUB_WORKFLOW.md` - New comprehensive workflow guide

## Testing

1. Follow workflow steps yourself
2. Verify all commands work
3. Test worktree creation
4. Verify remote setup
5. Ensure examples are accurate

## Related Documentation

- `AGENT_RULES.md` - Approval requirements
- `FORK_WORKFLOW.md` - Fork strategy
- `.cursorrules` - Agent rules
- `CLAUDE.md` - Project overview

## Notes

- Emphasize private fork policy throughout
- Include approval warnings prominently
- Provide clear examples
- Cross-reference related docs
- Include troubleshooting for common issues

## Commit Message

```
docs(workflow): create comprehensive GitHub workflow guide

- Define branching strategy and naming conventions
- Document commit message conventions
- Explain PR process and template
- Add worktree workflow documentation
- Emphasize private fork policy
- Include approval requirements
- Add troubleshooting section

Task: TASK-004
```


