#!/usr/bin/env python3
"""Format lintro osv-scanner JSON output as a markdown PR comment body.

Adapted from py-lintro's format-security-comment.py to parse lintro's
--output-format json schema and produce a structured vulnerability report.

Usage:
    format-security-comment.py <osv-results.json>
"""

# pylint: disable=invalid-name  # CLI script; hyphenated filename is the invocation contract

from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any


def escape_md_cell(text: str | None) -> str:
    """Escape characters that would break a markdown table cell.

    Replaces ``|`` with ``\\|`` and strips newlines so that cell content
    stays on a single table row.  Accepts ``None`` and converts it to an
    empty string so callers don't need to guard against missing values.
    """
    if text is None:
        return ""
    return text.replace("|", r"\|").replace("\n", " ").replace("\r", "")


def parse_lintro_json(path: str) -> dict[str, Any]:
    """Parse the lintro JSON output file."""
    data: dict[str, Any] = json.loads(Path(path).read_text(encoding="utf-8"))
    results = data.get("results", [])
    if not isinstance(results, list):
        return {}
    for result in results:
        if isinstance(result, dict) and result.get("tool") == "osv_scanner":
            return dict(result)
    return {}


def format_suppressions_table(suppressions: list[dict[str, Any]]) -> str:
    """Format suppression entries as a markdown table."""
    if not suppressions:
        return ""

    status_icons = {
        "active": "Active",
        "stale": "Stale (safe to remove)",
        "expired": "Expired",
    }

    lines = [
        "### 🔇 Suppressed Vulnerabilities",
        "",
        "| ID | Expires | Status | Reason |",
        "|----|---------|--------|--------|",
    ]
    for s in suppressions:
        vuln_id = escape_md_cell(s.get("id") or "unknown")
        raw_expires = s.get("ignore_until")
        expires = escape_md_cell(str(raw_expires) if raw_expires is not None else "N/A")
        raw_status = s.get("status") or ""
        status = escape_md_cell(status_icons.get(raw_status, raw_status or "unknown"))
        reason = escape_md_cell(s.get("reason", ""))
        lines.append(f"| `{vuln_id}` | {expires} | {status} | {reason} |")

    lines.append("")
    return "\n".join(lines)


def format_clean(result: dict[str, Any]) -> str:
    """Format output when no vulnerabilities are found."""
    lines = [
        "### 🔍 Checks Performed",
        (
            "- **osv-scanner**: Scanned all lockfiles against the "
            "[OSV database](https://osv.dev)"
        ),
        "",
        "No security vulnerabilities found in dependencies.",
        "",
    ]

    suppressions = result.get("ai_metadata", {}).get("suppressions", [])
    if suppressions:
        lines.append(format_suppressions_table(suppressions))

    return "\n".join(lines)


def format_vulnerabilities(result: dict[str, Any]) -> str:
    """Format output when vulnerabilities are found."""
    lines = [
        "### 🔍 Checks Performed",
        (
            "- **osv-scanner**: Scanned all lockfiles against the "
            "[OSV database](https://osv.dev)"
        ),
        "",
        "### ⚠️ Vulnerability Report",
        "",
        "| Vulnerability | File |",
        "|---------------|------|",
    ]

    issues = result.get("issues", [])
    if issues:
        for issue in issues:
            msg = escape_md_cell(issue.get("message", "Unknown vulnerability"))
            filepath = escape_md_cell(issue.get("file", "unknown"))
            lines.append(f"| {msg} | `{filepath}` |")
    else:
        count = result.get("issues_count", 0)
        lines.append(
            f"| {count} vulnerability(ies) found — see CI logs for details | |"
        )

    lines.extend(
        [
            "",
            "### 📋 Recommended Actions",
            "",
            "1. Review the vulnerabilities above",
            (
                "2. Update affected packages if fixes are available "
                "(`bun update <package>`)"
            ),
            (
                "3. If no fix is available, add a suppression to "
                "`.osv-scanner.toml` with an expiry date"
            ),
            "",
        ]
    )

    suppressions = result.get("ai_metadata", {}).get("suppressions", [])
    if suppressions:
        lines.append(format_suppressions_table(suppressions))

    return "\n".join(lines)


def format_error(raw_path: str) -> str:
    """Format output when the scanner failed."""
    lines = [
        "### ❌ Scanner Error",
        "",
        (
            "osv-scanner encountered an error during scanning. "
            "Review the CI logs for details."
        ),
        "",
    ]

    raw = Path(raw_path)
    if raw.exists():
        content = raw.read_text(encoding="utf-8")[:500]
        lines.extend(["```", content, "```", ""])

    return "\n".join(lines)


def main() -> None:
    """Render the security comment body from the scanner results file.

    Raises:
        SystemExit: On usage errors or missing/invalid results input.
    """
    if len(sys.argv) < 2:
        print(f"Usage: {sys.argv[0]} <osv-results.json>", file=sys.stderr)
        sys.exit(2)

    results_path = sys.argv[1]

    if not Path(results_path).exists():
        print(format_error(results_path))
        sys.exit(1)

    try:
        result = parse_lintro_json(results_path)
    except json.JSONDecodeError as e:
        print(f"Failed to parse {results_path}: {e}", file=sys.stderr)
        print(format_error(results_path))
        sys.exit(1)

    if not result:
        print(format_error(results_path))
        sys.exit(1)

    issues_count = result.get("issues_count", 0)
    if issues_count > 0:
        print(format_vulnerabilities(result))
    else:
        print(format_clean(result))


if __name__ == "__main__":
    main()
