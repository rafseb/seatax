# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email **rscloudsolutions@gmail.com** with details of the issue. Please do not open a public GitHub issue for security vulnerabilities.

Include:
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Suggested fix (if you have one)

We take all security reports seriously and will respond within 48 hours.

## Security Scanning

This project uses automated security scanning to identify vulnerabilities in dependencies:

### Dependabot
- **Enabled:** Yes
- **Frequency:** Weekly (Mondays at 3 AM UTC)
- **Updates:** Automatic PRs for dependency updates
- **Scope:** npm dependencies (production and development)

Dependabot automatically creates pull requests for dependency updates, which are reviewed and merged after passing CI/CD checks.

### Workflow Scans
The following security checks run on every push and pull request:

#### 1. NPM Audit (`npm audit`)
- **Frequency:** On every push, PR, and daily at 2 AM UTC
- **Checks:** Known vulnerabilities in dependencies
- **Threshold:** Fails on high-severity vulnerabilities
- **Continues on:** Moderate-severity vulnerabilities (warnings)

#### 2. Lint & Build Validation
- **ESLint:** Code quality and security patterns
- **TypeScript:** Type checking (strict mode) catches potential security issues
- **Build:** Static export builds are verified on every change

#### 3. Dependency Version Check
- **Frequency:** On every push and PR
- **Checks:** Displays outdated packages for awareness
- **Action:** Informational (via `npm outdated`)

## Security Configuration

### GitHub Settings
- **Branch protection:** `main` branch requires all status checks to pass before merge
- **Permissions:** Minimal permissions per workflow (principle of least privilege)
- **Secrets:** No secrets stored in repository (GitHub Pages deployment uses automatic GITHUB_TOKEN)

### Dependency Management
- Dependencies are pinned to exact versions in `package-lock.json`
- Automatic updates via Dependabot maintain compatibility

### Static Export
- No backend, database, or API routes
- All code is deployed as static assets to GitHub Pages
- No secrets can be leaked through API endpoints

## Known Limitations

### Privacy vs. Analytics
The site uses Google AdSense and GoatCounter for analytics/monetization:
- **AdSense:** Requires explicit consent before loading
- **GoatCounter:** Cookie-less analytics, loads without consent

### Dependency Updates
- Some critical security updates may require manual review
- Development dependencies are updated separately to avoid unnecessary churn

## Security Incident Response

1. **Detection:** Security scans run automatically and alert on high-severity issues
2. **Review:** Changes are reviewed before merge
3. **Patching:** Critical vulnerabilities trigger immediate PR and deployment
4. **Communication:** No public disclosure until patch is deployed

## Best Practices

### For Contributors
- Run `npm audit` locally before committing
- Update dependencies regularly: `npm outdated`
- Follow ESLint rules strictly
- Test TypeScript compilation: `npm run build`

### For Maintainers
- Review all Dependabot PRs promptly
- Address security scan failures immediately
- Keep Node.js and npm updated in CI/CD
- Monitor security feeds for zero-days

## Deployment Security

### GitHub Pages
- HTTPS enforced automatically
- No custom backend (eliminates server-side vulnerabilities)
- Static content only (eliminates injection attacks)

### Build Process
- Runs in isolated GitHub Actions runners
- No access to production secrets or credentials
- All output validated before deployment

## Third-Party Services

The site integrates with these external services:

| Service | Purpose | Security Notes |
|---------|---------|-----------------|
| Exchange Rate API | Live currency conversion | Public API, no authentication required |
| Google AdSense | Monetization | Requires user consent before loading |
| GoatCounter | Analytics | Cookie-less, privacy-respecting, no personal data stored |

---

**Last Updated:** 2026-08-30  
**Security Scan Status:** [View latest scan results](../../actions)
