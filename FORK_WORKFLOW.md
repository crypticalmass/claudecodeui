# Fork Workflow Guide

This repository is a **private fork** of the upstream Claude Code UI project. This document explains our fork strategy and workflow.

## Repository Structure

- **Upstream**: `https://github.com/siteboon/claudecodeui.git` (PUBLIC)
- **Private Fork**: `git@github.com:crypticalmass/claudecodeui.git` (PRIVATE)
- **Remote Name**: `origin` (points to private fork)
- **Upstream Name**: `upstream` (points to original repository)

## Fork Strategy

### Key Principles

1. **🚫 NEVER Submit PRs to Upstream**: We maintain our own private fork and **NEVER** submit pull requests to the upstream public repository
2. **Private Development Only**: All work, issues, PRs, and discussions happen in our private fork
3. **Independent Development**: All customizations are maintained exclusively in our private fork
4. **One-Way Sync**: We pull from upstream, but **NEVER** push to upstream
5. **Selective Syncing**: We sync from upstream when needed, but always maintain our customizations

### Critical Rules

**❌ FORBIDDEN:**
- Submitting PRs to upstream repository
- Pushing branches to upstream
- Creating issues in upstream repository
- Forking from our private fork to upstream
- Any write operations to upstream

**✅ ALLOWED:**
- Pulling updates from upstream
- Viewing upstream issues for reference
- Reading upstream documentation
- Syncing upstream changes to our fork

**⚠️ REQUIRES APPROVAL:**
- Any git operations that could expose our private work
- Changing remote URLs
- Force pushing to any branch
- Deleting branches with unmerged work

## Customizations

See `CUSTOMIZATIONS.md` for a detailed list of changes from upstream.

Key customizations include:
- **Persistent User Settings**: Database-backed settings persistence
- **Port Configuration**: Default port changed to 4001
- **Enhanced Database Schema**: Additional tables for user settings

## Syncing from Upstream

When you want to pull updates from the upstream repository:

### 1. Fetch Upstream Changes

```bash
git fetch upstream
```

### 2. Review Upstream Changes

```bash
# See what's new
git log upstream/main..HEAD  # Our commits
git log HEAD..upstream/main  # Upstream commits we don't have
```

### 3. Merge Upstream Changes

**Option A: Merge (preserves history)**
```bash
git checkout main
git merge upstream/main
# Resolve any conflicts
git push origin main
```

**Option B: Rebase (cleaner history)**
```bash
git checkout main
git rebase upstream/main
# Resolve any conflicts
git push origin main --force-with-lease
```

### 4. Handle Conflicts

If conflicts occur:
1. Review conflicted files
2. Keep our customizations where appropriate
3. Accept upstream changes for bug fixes/features
4. Test thoroughly after resolving conflicts

## Making Custom Changes

### Workflow

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/my-customization
   ```

2. **Make your changes**

3. **Commit with clear messages**:
   ```bash
   git add .
   git commit -m "feat(custom): add persistent settings feature"
   ```

4. **Push to private fork**:
   ```bash
   git push origin feature/my-customization
   ```

5. **Merge to main** (after testing):
   ```bash
   git checkout main
   git merge feature/my-customization
   git push origin main
   ```

### Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(custom):` - New custom feature
- `fix(custom):` - Bug fix in custom code
- `refactor(custom):` - Code refactoring
- `docs(custom):` - Documentation updates
- `chore(custom):` - Maintenance tasks

## Branch Strategy

- **main**: Production-ready code with all customizations
- **feature/***: Feature branches for new customizations
- **custom**: (Optional) Branch tracking only custom changes

## Remote Configuration

Check your remotes:
```bash
git remote -v
```

Should show:
```
origin    git@github.com:crypticalmass/claudecodeui.git (fetch)
origin    git@github.com:crypticalmass/claudecodeui.git (push)
upstream  https://github.com/siteboon/claudecodeui.git (fetch)
upstream  https://github.com/siteboon/claudecodeui.git (push)
```

If upstream is not configured:
```bash
git remote add upstream https://github.com/siteboon/claudecodeui.git
```

## Version Management

We maintain our own version numbers. When syncing from upstream:

1. Check upstream version in `package.json`
2. Update our version if needed
3. Document version changes in commits

## Documentation

- **CUSTOMIZATIONS.md**: Documents all changes from upstream
- **DEPLOYMENT.md**: Deployment guide for our fork
- **README.md**: Updated with fork-specific information

## Best Practices

1. **Always test** after syncing from upstream
2. **Document customizations** in CUSTOMIZATIONS.md
3. **Keep commits clean** and well-documented
4. **Never force push to main** (unless rebasing with `--force-with-lease`)
5. **Backup database** before major updates

## Troubleshooting

### Upstream Changes Break Our Customizations

1. Identify the conflicting changes
2. Review upstream commit history
3. Adapt our customizations to work with upstream changes
4. Update CUSTOMIZATIONS.md if needed

### Lost Custom Changes

1. Check git reflog: `git reflog`
2. Find the commit with your changes
3. Cherry-pick: `git cherry-pick <commit-hash>`

### Remote Sync Issues

```bash
# Verify remotes
git remote -v

# Update upstream URL if needed
git remote set-url upstream https://github.com/siteboon/claudecodeui.git

# Fetch again
git fetch upstream
```

