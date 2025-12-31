# 2. SBOM Signing with Sigstore

Date: 2025-10-05

## Status

Accepted

## Context

Software Bill of Materials (SBOM) files document all dependencies in our package, which
is critical for:

- Supply chain security
- Vulnerability tracking
- Compliance requirements
- Transparency to users

However, unsigned SBOM files can be tampered with, defeating their security purpose. We
need a signing strategy that:

- Proves SBOM authenticity
- Doesn't require managing private keys
- Integrates with GitHub Actions
- Follows industry standards
- Is verifiable by users

Alternatives considered:

1. **GPG Signing** - Complex key management, not CI-friendly
2. **GitHub App Token** - Not cryptographically secure
3. **Self-managed PKI** - High operational burden
4. **Sigstore/Cosign** - Keyless signing, industry standard, CI-native

## Decision

We will use [Sigstore](https://www.sigstore.dev/) with
[Cosign](https://docs.sigstore.dev/cosign/overview/) for SBOM signing.

Implementation details:

- Use keyless signing (no private keys to manage)
- Sign in GitHub Actions using OIDC identity
- Generate three signature artifacts per SBOM:
  - `.sig` - Signature file
  - `.cert` - Certificate from Fulcio
  - SBOM itself
- Support multiple SBOM formats:
  - CycloneDX JSON
  - CycloneDX XML
  - SPDX JSON

Workflow integration:

- Sign in `reusable-sbom.yml` workflow
- Verify signatures as part of workflow
- Upload signed SBOMs to GitHub releases
- Include verification instructions in release notes

## Decision

We chose Sigstore because:

- **Keyless** - No private key management
- **GitHub Native** - OIDC integration with Actions
- **Industry Standard** - Widely adopted (Kubernetes, Python, npm)
- **Transparency** - All signatures logged in Rekor
- **Verifiable** - Anyone can verify with cosign
- **Free** - No cost for open source

## Consequences

### Positive

- **No Key Management** - No private keys to secure or rotate
- **Automated** - Signing happens automatically in CI
- **Transparent** - All signatures publicly logged in Rekor
- **Verifiable** - Users can verify SBOM authenticity
- **Supply Chain Security** - Tamper-evident SBOM distribution
- **Compliance** - Meets regulatory requirements (SLSA, SSDF)
- **Minimal Dependencies** - Only requires cosign CLI
- **Industry Alignment** - Uses same approach as major projects

### Negative

- **Internet Dependency** - Requires connectivity to Sigstore services
- **Certificate Expiry** - Signatures valid for limited time (check Rekor)
- **Verification Complexity** - Users need cosign to verify
- **Trust in Sigstore** - Relies on Sigstore infrastructure
- **Additional Endpoints** - Requires firewall rules for Sigstore services

### Neutral

- **Workflow Changes** - Required updates to CI workflows
- **Documentation** - Need to explain verification process to users
- **Storage** - 3 files per SBOM (original + signature + certificate)
- **Learning Curve** - Team needs to understand Sigstore concepts

## References

- [Sigstore Documentation](https://docs.sigstore.dev/)
- [Cosign GitHub Action](https://github.com/sigstore/cosign-installer)
- [Keyless Signing Guide](https://docs.sigstore.dev/cosign/signing/signing_with_containers/)
- [SLSA Framework](https://slsa.dev/)
- [NIST SSDF](https://csrc.nist.gov/Projects/ssdf)

## Notes

### Verification Instructions

Users can verify SBOM signatures using:

```bash
# Install cosign
# See: https://docs.sigstore.dev/cosign/installation/

# Verify a signed SBOM
cosign verify-blob sbom.cyclonedx.json \
  --signature=sbom.cyclonedx.json.sig \
  --certificate=sbom.cyclonedx.json.cert \
  --certificate-identity-regexp=".*" \
  --certificate-oidc-issuer-regexp=".*"
```

### Sigstore Services Used

- **Fulcio** (`fulcio.sigstore.dev`) - Certificate Authority
- **Rekor** (`rekor.sigstore.dev`) - Transparency Log
- **TUF** (`tuf-repo-cdn.sigstore.dev`) - Root of Trust

### Implementation

The signing workflow is in `.github/workflows/reusable-sbom.yml`:

- Installs cosign using `sigstore/cosign-installer`
- Signs all SBOM files using `cosign sign-blob`
- Verifies signatures immediately after signing
- Uploads signed artifacts to GitHub Actions artifacts
- Includes in GitHub releases via `publish-npm-on-tag.yml`

### Future Enhancements

Potential improvements:

- Add timestamp authority for long-term verification
- Include SBOM hash in npm package metadata
- Automate SBOM distribution to security platforms
- Add Sigstore verification to package installation docs
