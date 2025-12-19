# Snyk Security Setup Guide

This guide will help you set up Snyk security scanning for your Dry January Tracker repository.

## Prerequisites

- A Snyk account (free tier available at [snyk.io](https://snyk.io))
- Admin access to your GitHub repository

## Step-by-Step Setup

### 1. Create a Snyk Account

1. Go to [https://snyk.io](https://snyk.io)
2. Sign up with your GitHub account (recommended for easier integration)
3. Authorize Snyk to access your GitHub repositories

### 2. Get Your Snyk API Token

1. Log in to your Snyk account
2. Go to **Account Settings** (click your avatar → Account Settings)
3. Navigate to the **General** tab
4. Find your **Auth Token** section
5. Click **Show** and copy your token
6. **Important:** Keep this token secure - don't share it or commit it to your repository

### 3. Add Snyk Token to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/tonyjoanes/dry-january-tracker`
2. Click on **Settings** (top navigation)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `SNYK_TOKEN`
6. Value: Paste your Snyk API token from step 2
7. Click **Add secret**

### 4. Import Your Repository to Snyk (Optional but Recommended)

1. In your Snyk dashboard, click **Add project**
2. Select **GitHub**
3. Find and select `tonyjoanes/dry-january-tracker`
4. Click **Add selected repositories**
5. Snyk will automatically scan your repository

### 5. Configure Snyk Settings

#### In Snyk Dashboard:

1. Go to your project in Snyk
2. Click **Settings** (gear icon)
3. Configure these recommended settings:
   - **Test frequency**: Weekly
   - **Automatic fix PRs**: Enabled (optional)
   - **Notifications**: Enable for high/critical vulnerabilities
   - **PR checks**: Enable (will block PRs with high/critical issues)

#### Severity Thresholds:

Our workflow is configured with `--severity-threshold=high`, which means:
- ✅ **Low & Medium** vulnerabilities will be reported but won't fail the build
- ⚠️ **High & Critical** vulnerabilities will be reported and flagged

You can adjust this in `.github/workflows/security.yml` if needed.

## Workflow Integration

### Automated Security Scans

The repository now includes automated security scanning:

**File:** `.github/workflows/security.yml`

This workflow:
- ✅ Runs on every push to `main`
- ✅ Runs on every pull request
- ✅ Runs weekly (Mondays at 9am UTC)
- ✅ Scans for vulnerabilities using Snyk
- ✅ Uploads results to GitHub Security tab
- ✅ Runs npm audit as backup

**File:** `.github/workflows/firebase-hosting-merge.yml`

Updated to include:
- ✅ Snyk scan before deployment
- ✅ Continues deployment even if low/medium issues found

### GitHub Security Tab

After the first scan runs, you can view security alerts in:
1. Go to your repository
2. Click **Security** tab (top navigation)
3. Click **Code scanning alerts**
4. View Snyk findings

## Interpreting Results

### Snyk Badge in README

The README now includes a Snyk badge:
```markdown
[![Known Vulnerabilities](https://snyk.io/test/github/tonyjoanes/dry-january-tracker/badge.svg)](https://snyk.io/test/github/tonyjoanes/dry-january-tracker)
```

Badge colors:
- 🟢 **Green**: No known vulnerabilities
- 🟡 **Yellow**: Low/Medium vulnerabilities
- 🔴 **Red**: High/Critical vulnerabilities

### Vulnerability Severity Levels

- **Critical**: Immediate action required - these can be actively exploited
- **High**: Should be fixed soon - significant security risk
- **Medium**: Should be addressed - moderate security risk
- **Low**: Can be deferred - minor security risk

## Common Issues & Troubleshooting

### Issue: Workflow Fails with "SNYK_TOKEN not found"

**Solution:**
1. Verify the secret is named exactly `SNYK_TOKEN` (case-sensitive)
2. Check you added it to repository secrets, not environment secrets
3. Try re-adding the secret

### Issue: Snyk Badge Shows "Unknown"

**Solution:**
1. Wait for the first workflow run to complete
2. Ensure your repository is public or Snyk has access
3. Verify the repository is imported in your Snyk dashboard

### Issue: Too Many Vulnerabilities Reported

**Solution:**
1. Check if they're in dependencies (fixable) or devDependencies (less critical)
2. Run `npm audit fix` to automatically fix some issues
3. For unfixable issues, check if they're actual risks for your use case
4. Consider using Snyk's ignore feature for false positives

## Monitoring & Maintenance

### Regular Tasks

1. **Weekly Review** (automated):
   - Check Snyk dashboard for new vulnerabilities
   - Review weekly scan results

2. **Dependency Updates**:
   ```bash
   # Update dependencies
   npm update

   # Check for outdated packages
   npm outdated

   # Run security audit
   npm audit
   ```

3. **Fix Vulnerabilities**:
   ```bash
   # Auto-fix vulnerabilities
   npm audit fix

   # Force fix (may include breaking changes)
   npm audit fix --force

   # Or use Snyk CLI
   snyk fix
   ```

### Best Practices

- ✅ Review security alerts promptly
- ✅ Keep dependencies up to date
- ✅ Don't ignore high/critical vulnerabilities
- ✅ Test thoroughly after security updates
- ✅ Document any intentionally ignored vulnerabilities

## Snyk CLI (Optional)

For local development, you can install Snyk CLI:

```bash
# Install globally
npm install -g snyk

# Authenticate
snyk auth

# Test your project locally
snyk test

# Monitor your project
snyk monitor
```

## Resources

- [Snyk Documentation](https://docs.snyk.io/)
- [GitHub Actions Integration](https://docs.snyk.io/integrations/ci-cd-integrations/github-actions-integration)
- [Snyk Security Blog](https://snyk.io/blog/)
- [GitHub Security Features](https://docs.github.com/en/code-security)

## Support

If you encounter issues:
1. Check [Snyk Status Page](https://status.snyk.io/)
2. Review [Snyk Community Forums](https://community.snyk.io/)
3. Contact [Snyk Support](https://support.snyk.io/)

---

**Last Updated:** December 19, 2025
**Status:** ✅ Ready for Use
