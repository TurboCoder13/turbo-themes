# Egress Policy Documentation

This document explains the egress policies used in turbo-themes GitHub Actions
workflows, managed by `step-security/harden-runner`.

## What are Egress Policies?

Egress policies control which external endpoints GitHub Actions workflows can connect
to. By using `step-security/harden-runner`, we:

1. **Block by default** - Prevent unauthorized network access
2. **Allowlist specific endpoints** - Only permit known, necessary connections
3. **Detect anomalies** - Identify unexpected network activity
4. **Improve security** - Reduce supply chain attack surface

## Why Use Egress Policies?

### Security Benefits

1. **Supply Chain Protection**
   - Prevents compromised dependencies from phoning home
   - Blocks data exfiltration attempts
   - Detects malicious packages making unexpected connections

2. **Compliance**
   - Documents all network dependencies
   - Provides audit trail of external connections
   - Meets security requirements for sensitive projects

3. **Monitoring**
   - Alerts on unexpected endpoint access
   - Tracks changes in workflow network behavior
   - Provides visibility into third-party dependencies

4. **Defense in Depth**
   - Additional security layer beyond code review
   - Protects against zero-day exploits
   - Limits blast radius of compromised actions

## Common Endpoints

### GitHub Services

```yaml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 release-assets.githubusercontent.com:443
  uploads.github.com:443
```

**Used for:**

- Checking out code
- Downloading artifacts
- Making API calls
- Uploading artifacts
- Creating releases

### npm Registry

```yaml
allowed-endpoints: >
  registry.npmjs.org:443
```

**Used for:**

- Installing dependencies (`npm ci`)
- Publishing packages (`npm publish`)

### Ruby Gems

```yaml
allowed-endpoints: >
  rubygems.org:443 index.rubygems.org:443
```

**Used for:**

- Installing Ruby gems (`bundle install`)

### Codecov

```yaml
allowed-endpoints: >
  codecov.io:443 api.codecov.io:443 uploader.codecov.io:443 storage.googleapis.com:443
```

**Used for:**

- Uploading coverage reports
- Downloading Codecov uploader
- Storing coverage data

### Sigstore (SBOM Signing)

```yaml
allowed-endpoints: >
  fulcio.sigstore.dev:443 rekor.sigstore.dev:443 tuf-repo-cdn.sigstore.dev:443
```

**Used for:**

- Keyless signing with cosign
- Certificate generation (Fulcio)
- Transparency log (Rekor)
- Trust root updates (TUF)

### Syft/Anchore (SBOM Generation)

```yaml
allowed-endpoints: >
  anchore.io:443 toolbox-data.anchore.io:443
```

**Used for:**

- Downloading Syft installer
- Fetching vulnerability data
- Updating SBOM metadata

## Workflow-Specific Policies

### Quality CI Workflow

```yaml
# quality-ci-main.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 uploads.github.com:443
  pipelines.actions.githubusercontent.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 registry.npmjs.org:443 npmjs.org:443 bun.sh:443
  raw.githubusercontent.com:443 github-releases.githubusercontent.com:443
  release-assets.githubusercontent.com:443 rubygems.org:443 api.rubygems.org:443
  index.rubygems.org:443 bundler.rubygems.org:443 rubygems.global.ssl.fastly.net:443
  cache.ruby-lang.org:443 pypi.org:443 files.pythonhosted.org:443 codecov.io:443
  api.codecov.io:443 uploader.codecov.io:443
```

**Rationale:**

- GitHub: Code checkout, artifacts, workflow orchestration
- Bun: Downloading and installing the Bun runtime via `oven-sh/setup-bun`
- npm: Installing and resolving Node.js dependencies
- Ruby: Installing Ruby and Bundler (RubyGems endpoints and Ruby tarball cache)
- Python: Installing Python tooling via `uv` and PyPI
- Codecov: Coverage upload

### Publish Gem Workflow

```yaml
# publish-gem.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 release-assets.githubusercontent.com:443
  pipelines.actions.githubusercontent.com:443 registry.npmjs.org:443 npmjs.org:443
  cache.ruby-lang.org:443 rubygems-downloads.global.ssl.fastly.net:443 rubygems.org:443
  api.rubygems.org:443 index.rubygems.org:443 bundler.rubygems.org:443
  rubygems.global.ssl.fastly.net:443
```

**Rationale:**

- GitHub: Checkout, workflow coordination, downloading custom actions
- Release assets: GitHub-hosted Ruby toolcache tarballs used by `ruby/setup-ruby`
- npm: Building the companion npm package
- RubyGems endpoints: Bundler installs and gem publishing
- cache.ruby-lang.org: Source tarballs when toolcache misses
- rubygems-downloads.global.ssl.fastly.net: Bundler gem payload download CDN

### SBOM Generation Workflow

```yaml
# reusable-sbom.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 anchore.io:443 toolbox-data.anchore.io:443
  fulcio.sigstore.dev:443 rekor.sigstore.dev:443 tuf-repo-cdn.sigstore.dev:443
```

**Rationale:**

- GitHub: Code checkout
- Anchore: Syft installation and data
- Sigstore: SBOM signing with cosign

### npm Publish Workflow

```yaml
# release-publish-pr.yml, publish-npm-test.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 uploads.github.com:443
  objects.githubusercontent.com:443 codeload.github.com:443 registry.npmjs.org:443
```

**Rationale:**

- GitHub: Code checkout, release creation
- npm: Package publishing

### Semantic Release Workflow

```yaml
# release-semantic-release.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 registry.npmjs.org:443 uploads.github.com:443
```

**Rationale:**

- GitHub: Code checkout, release creation, changelog commits
- npm: Package publishing with semantic-release

### Lighthouse CI Workflow

```yaml
# reporting-lighthouse-ci.yml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
  codeload.github.com:443 registry.npmjs.org:443 playwright.azureedge.net:443
  playwright-akamai.azureedge.net:443 playwright-verizon.azureedge.net:443
```

**Rationale:**

- GitHub: Code checkout
- npm: Installing Lighthouse CI
- Playwright: Downloading browser binaries for E2E tests

### Deploy Pages Workflows

```yaml
# deploy-pages.yml (build job)
allowed-endpoints: >
  github.com:443
  api.github.com:443
  objects.githubusercontent.com:443
  codeload.github.com:443
  github-releases.githubusercontent.com:443
  release-assets.githubusercontent.com:443
  registry.npmjs.org:443
  npmjs.org:443
  rubygems.org:443
  api.rubygems.org:443
  index.rubygems.org:443
  bundler.rubygems.org:443
  rubygems.global.ssl.fastly.net:443
  pypi.org:443
  files.pythonhosted.org:443

# deploy-pages.yml (deploy job)
allowed-endpoints: >
  github.com:443
  api.github.com:443
  uploads.github.com:443
  registry.npmjs.org:443
  npmjs.org:443
```

**Rationale:**

- GitHub: Artifact download (from test workflows), Pages deployment, API access for
  finding workflow runs
- npm/rubygems/pypi: Dependency installation
- No Playwright browser downloads (E2E tests excluded from build phase)

## Adding New Endpoints

### Process

1. **Identify the need**
   - Why is this endpoint required?
   - What service/dependency needs it?
   - Is there an alternative?

2. **Test with audit mode**

   ```yaml
   - name: Harden Runner
     uses: step-security/harden-runner@...
     with:
       egress-policy: audit # Temporarily use audit mode
   ```

3. **Review Step Security dashboard**
   - Check detected network calls
   - Verify endpoint is legitimate
   - Document purpose

4. **Add to allowlist**

   ```yaml
   allowed-endpoints: >
     existing.endpoint.com:443 new-endpoint.com:443  # Add with comment explaining why
   ```

5. **Switch back to block mode**

   ```yaml
   egress-policy: block
   ```

6. **Document in this file**
   - Add to appropriate section
   - Explain rationale
   - Link to service documentation

### Example: Adding a New Service

```yaml
# Before (fails with blocked endpoint)
- name: Harden Runner
  uses: step-security/harden-runner@...
  with:
    egress-policy: block
    allowed-endpoints: >
      github.com:443

# After discovering need for api.newservice.com:443
- name: Harden Runner
  uses: step-security/harden-runner@...
  with:
    egress-policy: block
    allowed-endpoints: >
      github.com:443 api.newservice.com:443  # Required for XYZ integration
```

## Monitoring

### Step Security Dashboard

1. Visit [app.stepsecurity.io](https://app.stepsecurity.io)
2. View your repository
3. Check recent workflow runs
4. Review detected network calls
5. Identify blocked attempts

### GitHub Actions Logs

Blocked attempts appear in workflow logs:

```
Run step-security/harden-runner
Blocked DNS resolution: malicious-domain.com
Blocked connection: 192.168.1.1:443
```

## Exceptions and Special Cases

### Why Not Use Wildcards?

**❌ Bad:**

```yaml
allowed-endpoints: >
  *.github.com:443  # Too broad *:443             # Defeats purpose
```

**✅ Good:**

```yaml
allowed-endpoints: >
  github.com:443 api.github.com:443 objects.githubusercontent.com:443
```

**Rationale:** Wildcards reduce security benefits. Explicitly list each subdomain.

### Temporary Audit Mode

Use audit mode only for:

- Discovering required endpoints for new workflows
- Troubleshooting blocked connections
- Investigating unexpected failures

**Always return to block mode before merging.**

## Troubleshooting

### Workflow Fails with Network Error

1. **Check logs for blocked endpoint**

   ```
   Error: connect ETIMEDOUT
   Blocked connection: example.com:443
   ```

2. **Verify endpoint is legitimate**
   - Is it from a known service?
   - Is it a dependency's dependency?
   - Is it expected for this workflow?

3. **Add to allowlist if legitimate**
   - Update workflow file
   - Document rationale
   - Test again

4. **Investigate if suspicious**
   - Report to security team
   - Check dependency for compromise
   - Review recent changes

### False Positives

Some legitimate services may be blocked:

- CDNs (CloudFront, Fastly)
- Package mirrors
- Docker registries

**Solution:** Add specific endpoints, not wildcards.

## Best Practices

1. **Minimal Allowlist**
   - Only add endpoints you need
   - Remove endpoints you no longer use
   - Regularly audit allowed endpoints

2. **Document Everything**
   - Comment why each endpoint is needed
   - Link to service documentation
   - Note when endpoints were added

3. **Regular Reviews**
   - Quarterly endpoint audits
   - Remove unused services
   - Update documentation

4. **Version Control**
   - Track endpoint changes in git
   - Review in pull requests
   - Require approval for additions

5. **Monitoring**
   - Enable Step Security alerts
   - Check dashboard regularly
   - Investigate anomalies

## Security Incidents

If you detect suspicious network activity:

1. **Immediate Action**
   - Stop the workflow
   - Report to security team
   - Document the incident

2. **Investigation**
   - Check which dependency made the call
   - Review recent dependency updates
   - Search for known vulnerabilities

3. **Remediation**
   - Block the endpoint
   - Update/remove compromised dependency
   - Audit other workflows

4. **Prevention**
   - Strengthen dependency pinning
   - Increase review rigor
   - Enhance monitoring

## Resources

- [Step Security Documentation](https://docs.stepsecurity.io/)
- [Harden-Runner GitHub Action](https://github.com/step-security/harden-runner)
- [Supply Chain Security Guide](https://github.com/ossf/scorecard)
- [GitHub Actions Security Best Practices](https://docs.github.com/en/actions/security-guides)

## Questions?

For questions about egress policies:

- Check workflow file comments
- Review Step Security dashboard
- Consult security team
- Open an issue with the `security` label
