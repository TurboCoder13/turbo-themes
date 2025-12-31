# 1. Use Allstar for Continuous Security Monitoring

Date: 2025-10-05

## Status

Accepted

## Context

The turbo-themes project needs automated security policy enforcement to maintain
consistent security posture across the repository. Manual security reviews are:

- Time-consuming and error-prone
- Not scalable as the project grows
- Reactive rather than proactive
- Difficult to enforce consistently

We need a solution that:

- Continuously monitors repository security settings
- Automatically detects policy violations
- Creates actionable issues for maintainers
- Integrates with our existing GitHub workflow
- Follows OpenSSF best practices

Alternatives considered:

1. **Manual security reviews** - Not scalable, reactive
2. **Custom security scripts** - High maintenance burden
3. **Commercial security platforms** - Cost prohibitive for open source
4. **Allstar** - OpenSSF project, free for open source, proven

## Decision

We will use [Allstar](https://github.com/ossf/allstar), an OpenSSF project, for
continuous security monitoring.

Implementation:

- Install Allstar GitHub App on the organization/repository
- Configure policies in `.allstar/` directory
- Enable the following policies:
  - Branch Protection: Enforce PR reviews and prevent force pushes
  - Binary Artifacts: Prevent binary files in repository
  - Outside Collaborators: Restrict admin access to org members only
  - SECURITY.md: Require security policy documentation

Configuration approach:

- Opt-out strategy: Enable on all repos by default
- Disable repository override: Ensure consistent enforcement
- Issue action: Create GitHub issues for violations
- No auto-fix: Allow maintainers to review and fix manually

## Consequences

### Positive

- **Automated Enforcement** - Security policies enforced 24/7 without manual
  intervention
- **Early Detection** - Violations detected within minutes of occurrence
- **Consistent Standards** - Same policies applied across all repositories
- **OpenSSF Alignment** - Uses industry-standard best practices
- **Low Maintenance** - Managed by OpenSSF, no infrastructure to maintain
- **Visibility** - GitHub issues provide clear audit trail
- **Education** - Issues include remediation guidance

### Negative

- **Issue Noise** - May create issues for non-critical violations
- **Limited Policies** - Not all desired policies may be available
- **GitHub Dependence** - Requires GitHub App installation
- **No Auto-Remediation** - Manual fixes required for all violations

### Neutral

- **Configuration Management** - Requires `.allstar/` configuration in repository
- **Learning Curve** - Team needs to understand Allstar's operation
- **Monitoring Required** - Issues need to be reviewed and acted upon

## References

- [Allstar GitHub Repository](https://github.com/ossf/allstar)
- [OpenSSF Scorecard Project](https://github.com/ossf/scorecard)
- [Branch Protection Best Practices](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [OpenSSF Best Practices Badge](https://bestpractices.coreinfrastructure.org/)

## Notes

The configuration files are located in `.allstar/`:

- `allstar.yaml` - Main configuration
- `branch_protection.yaml` - Branch protection policy
- `binary_artifacts.yaml` - Binary artifact policy
- `outside.yaml` - Outside collaborator policy
- `security.yaml` - Security documentation policy

Allstar issues are labeled with `allstar` for easy filtering and can be automatically
closed when violations are resolved.
