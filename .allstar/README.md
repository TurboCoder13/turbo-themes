# Allstar Security Configuration

This directory contains the configuration for
[Allstar](https://github.com/ossf/allstar), a GitHub App that continuously monitors
repositories for adherence to security best practices.

## What is Allstar?

Allstar is developed by the
[OpenSSF (Open Source Security Foundation)](https://openssf.org/) as part of the
[Scorecard project](https://github.com/ossf/scorecard). It automatically detects
security policy violations and creates issues to alert repository maintainers.

## Configuration Files

### `allstar.yaml`

Main configuration file that controls:

- **Opt Strategy**: Uses opt-out strategy (enabled on all repos by default)
- **Repository Override**: Disabled to enforce policies consistently
- **Issue Labeling**: Uses the `allstar` label for created issues

### `branch_protection.yaml`

Enforces GitHub branch protection settings:

- ✅ Protects default branch (main/master)
- ✅ Requires at least 1 pull request approval
- ✅ Blocks force pushes to protected branches
- ℹ️ Does not require signed commits or status checks (can be adjusted)

### `binary_artifacts.yaml`

Prevents binary files from being committed to the repository:

- ✅ Checks for binary artifacts using OpenSSF Scorecard
- ✅ Creates issues when binaries are detected
- ℹ️ Binaries should be distributed through releases or package registries

### `outside.yaml`

Monitors outside collaborator permissions:

- ✅ Allows outside collaborators to have push access
- ✅ Prevents outside collaborators from having admin access
- ℹ️ Outside collaborators are non-organization members with repo access

### `security.yaml`

Ensures presence of security documentation:

- ✅ Requires a non-empty `SECURITY.md` file
- ✅ Accepts file in root, `.github/`, or `docs/` directory
- ℹ️ Security policy should document vulnerability reporting process

## How Allstar Works

1. **Continuous Monitoring**: Allstar periodically checks repositories for policy
   compliance
2. **Issue Creation**: When a violation is detected, Allstar creates a GitHub issue
3. **Issue Updates**: If the issue remains open, Allstar comments every 24 hours
4. **Auto-Closure**: Once the violation is fixed, Allstar automatically closes the issue

## Actions Taken

All policies are configured with the `issue` action, which means:

- Allstar will create an issue when a policy is violated
- The issue will describe the violation and how to fix it
- Allstar will not automatically fix the violation (no `fix` action enabled)

## Installation

To enable Allstar on this repository:

1. Install the [Allstar GitHub App](https://github.com/apps/allstar-app) on the
   organization
2. Grant the app access to this repository
3. Allstar will automatically start monitoring based on this configuration

## Modifying Policies

To adjust security policies:

1. Edit the relevant YAML file in this directory
2. Commit and push the changes
3. Allstar will pick up the new configuration automatically

## Disabling Allstar

If you need to temporarily disable Allstar on this repository:

1. Add the repository name to the `optOutRepos` list in `allstar.yaml`
2. Commit and push the change

Note: Repository override is currently disabled, so individual repos cannot opt out
without org-level configuration changes.

## Additional Resources

- [Allstar Documentation](https://github.com/ossf/allstar)
- [OpenSSF Scorecard](https://github.com/ossf/scorecard)
- [GitHub Branch Protection](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)
- [Security Policy Guide](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository)

## Contact

For questions about this security configuration, please contact the repository
maintainers or open an issue.
