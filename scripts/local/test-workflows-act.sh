#!/usr/bin/env bash
# SPDX-License-Identifier: MIT
# Purpose: Test GitHub Actions workflows locally using ACT
#
# Usage:
#   ./scripts/local/test-workflows-act.sh [workflow ...] [options]
#
# Examples:
#   ./scripts/local/test-workflows-act.sh quality-ci-main
#   ./scripts/local/test-workflows-act.sh quality-ci-main --event pull_request
#   ./scripts/local/test-workflows-act.sh --category quality
#   ./scripts/local/test-workflows-act.sh --list
#   ./scripts/local/test-workflows-act.sh quality-ci-main --dry-run

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

source "${SCRIPT_DIR}/../utils/utils.sh"

EVENT_DIR="${REPO_ROOT}/.github/act-events"
DEFAULT_EVENT_PUSH="${EVENT_DIR}/push-main.json"
DEFAULT_EVENT_PR="${EVENT_DIR}/pull-request.json"
DEFAULT_EVENT_TAG="${EVENT_DIR}/tag-push.json"
DEFAULT_EVENT_DISPATCH="${EVENT_DIR}/workflow-dispatch.json"
SECRETS_FILE="${REPO_ROOT}/.secrets.act"

VERBOSE=false
DRY_RUN=false
CATEGORY="all"
EVENT_OVERRIDE=""
LIST_ONLY=false
WORKFLOW_ARGS=()

SUPPORTED_EVENT_TYPES=("push" "pull_request" "tag" "workflow_dispatch")

print_help() {
  cat <<EOF
Test GitHub Actions workflows locally using ACT.

Usage: $0 [workflow ...] [options]

Options:
  --category <name>      Filter by category (quality|security|deploy|publish|reporting|maintenance|release|all)
  --event <type>         Force event type (push|pull_request|tag|workflow_dispatch)
  --list                 List testable workflows and exit
  --dry-run              Show commands without running ACT
  --verbose              Show detailed ACT output
  --help, -h             Show this help message

If no workflows are provided, all testable workflows are run.
EOF
}

normalize_workflow_path() {
  local name="$1"
  if [[ "$name" == *.yml || "$name" == *.yaml ]]; then
    echo ".github/workflows/$name"
  else
    echo ".github/workflows/${name}.yml"
  fi
}

workflow_category() {
  local file="$1"
  local base
  base=$(basename "$file")
  case "$base" in
    quality-*) echo "quality" ;;
    security-*) echo "security" ;;
    deploy-*) echo "deploy" ;;
    publish-*) echo "publish" ;;
    release-*) echo "release" ;;
    reporting-*) echo "reporting" ;;
    maintenance-*) echo "maintenance" ;;
    *) echo "other" ;;
  esac
}

workflow_support_level() {
  local file="$1"
  local base
  base=$(basename "$file")
  case "$base" in
    security-codeql.yml|security-dependency-review.yml|security-scorecards.yml)
      echo "unsupported"
      ;;
    reusable-build.yml|reusable-quality.yml|reusable-sbom.yml)
      echo "unsupported"
      ;;
    *)
      # Check if workflow uses setup-env or setup-node action (requires full-22.04 image with node+ruby)
      # Note: setup-node is a JS action that needs Node.js to run, creating a chicken-and-egg problem
      if grep -qE "(setup-env|setup-node)" "$file"; then
        if docker images --format "{{.Repository}}:{{.Tag}}" | grep -q "catthehacker/ubuntu:full-22.04"; then
          echo "supported"
        else
          echo "unsupported"
        fi
      else
        echo "supported"
      fi
      ;;
  esac
}

resolve_event_type() {
  local file="$1"
  if [[ -n "$EVENT_OVERRIDE" ]]; then
    echo "$EVENT_OVERRIDE"
    return
  fi

  if grep -qE "^\s*pull_request:" "$file"; then
    echo "pull_request"
  elif grep -qE "^\s*workflow_dispatch:" "$file"; then
    echo "workflow_dispatch"
  elif grep -qE "^\s*tags:" "$file"; then
    echo "tag"
  else
    echo "push"
  fi
}

event_payload_path() {
  local event="$1"
  case "$event" in
    push) echo "$DEFAULT_EVENT_PUSH" ;;
    pull_request) echo "$DEFAULT_EVENT_PR" ;;
    tag) echo "$DEFAULT_EVENT_TAG" ;;
    workflow_dispatch) echo "$DEFAULT_EVENT_DISPATCH" ;;
    *) die "Unsupported event type: $event" ;;
  esac
}

is_supported_event() {
  local event="$1"
  for e in "${SUPPORTED_EVENT_TYPES[@]}"; do
    [[ "$e" == "$event" ]] && return 0
  done
  return 1
}

list_workflows() {
  find .github/workflows -maxdepth 1 \( -name "*.yml" -o -name "*.yaml" \) \
    | grep -vE "(README|TRIGGERS|EGRESS)" \
    | sort
}

filter_workflows_by_category() {
  local desired="$1"
  shift
  for wf in "$@"; do
    local cat
    cat=$(workflow_category "$wf")
    if [[ "$desired" == "all" || "$desired" == "$cat" ]]; then
      printf "%s\n" "$wf"
    fi
  done
}

run_workflow() {
  local workflow_file="$1"
  local workflow_name
  workflow_name=$(basename "$workflow_file")

  if [[ ! -f "$workflow_file" ]]; then
    log_error "Workflow not found: $workflow_file"
    return 1
  fi

  local support_level
  support_level=$(workflow_support_level "$workflow_file")
  if [[ "$support_level" == "unsupported" ]]; then
    log_warn "Skipping $workflow_name (GitHub-hosted service required)"
    return 2
  fi

  local event_type
  event_type=$(resolve_event_type "$workflow_file")
  if ! is_supported_event "$event_type"; then
    log_warn "Skipping $workflow_name (unsupported event: $event_type)"
    return 2
  fi

  local event_file
  event_file=$(event_payload_path "$event_type")
  if [[ ! -f "$event_file" ]]; then
    log_error "Missing event payload: $event_file"
    return 1
  fi

  local act_event="$event_type"
  [[ "$event_type" == "tag" ]] && act_event="push"

  local act_cmd=("act" "$act_event" "-W" "$workflow_file" "-e" "$event_file" "--env" "ACT=true" "--reuse" "--pull=false")
  if [[ -f "$SECRETS_FILE" ]]; then
    act_cmd+=("--secret-file" "$SECRETS_FILE")
  fi
  [[ "$VERBOSE" == true ]] && act_cmd+=("--verbose")

  export ACT=true
  log_info "Running $workflow_name with event '$event_type' (payload: ${event_file})"
  if [[ "$DRY_RUN" == true ]]; then
    echo "DRY RUN: ${act_cmd[*]}"
    return 0
  fi

  if "${act_cmd[@]}"; then
    log_success "✓ $workflow_name passed"
    return 0
  else
    log_error "✗ $workflow_name failed"
    return 1
  fi
}

parse_args() {
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --category)
        CATEGORY="$2"
        shift 2
        ;;
      --event)
        EVENT_OVERRIDE="$2"
        shift 2
        ;;
      --list)
        LIST_ONLY=true
        shift
        ;;
      --dry-run)
        DRY_RUN=true
        shift
        ;;
      --verbose)
        VERBOSE=true
        shift
        ;;
      --help|-h)
        print_help
        exit 0
        ;;
      *)
        WORKFLOW_ARGS+=("$1")
        shift
        ;;
    esac
  done

  if [[ -n "$EVENT_OVERRIDE" ]] && ! is_supported_event "$EVENT_OVERRIDE"; then
    die "Unsupported event override: $EVENT_OVERRIDE"
  fi
}

main() {
  parse_args "$@"

  if [[ "$LIST_ONLY" != true && "$DRY_RUN" != true ]]; then
    require_command act
    require_command docker

    if ! docker ps >/dev/null 2>&1; then
      die "Docker is not running. Please start Docker and try again."
    fi
  fi

  local workflows=()
  if [[ ${#WORKFLOW_ARGS[@]} -gt 0 ]]; then
    for arg in "${WORKFLOW_ARGS[@]}"; do
      workflows+=("$(normalize_workflow_path "$arg")")
    done
  else
    while IFS= read -r wf; do
      [[ -n "$wf" ]] && workflows+=("$wf")
    done < <(list_workflows)
  fi

  if [[ ${#workflows[@]} -eq 0 ]]; then
    log_warn "No workflows found."
    exit 0
  fi

  if [[ ${#workflows[@]} -gt 0 ]]; then
    local deduped=()
    while IFS= read -r wf; do
      [[ -n "$wf" ]] && deduped+=("$wf")
    done < <(printf "%s\n" "${workflows[@]}" | sort -u)
    workflows=("${deduped[@]}")
  fi

  if [[ "$CATEGORY" != "all" ]]; then
    local filtered=()
    while IFS= read -r wf; do
      [[ -n "$wf" ]] && filtered+=("$wf")
    done < <(filter_workflows_by_category "$CATEGORY" "${workflows[@]}")
    workflows=("${filtered[@]}")
  fi

  if [[ ${#workflows[@]} -eq 0 ]]; then
    log_warn "No workflows match category '${CATEGORY}'."
    exit 0
  fi

  if [[ "$LIST_ONLY" == true ]]; then
    log_info "Testable workflows (category=${CATEGORY}):"
    for wf in "${workflows[@]}"; do
      local level
      level=$(workflow_support_level "$wf")
      echo " - $(basename "$wf") [${level}]"
    done
    exit 0
  fi

  local passed=0
  local failed=0
  local skipped=0

  for wf in "${workflows[@]}"; do
    set +e
    run_workflow "$wf"
    result=$?
    set -e
    case $result in
      0) ((passed++)) ;;
      1) ((failed++)) ;;
      2) ((skipped++)) ;;
    esac
    echo ""
  done

  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  log_info "Test Summary:"
  echo ""
  echo -e "  ${GREEN}✓ Passed:${NC}  $passed"
  echo -e "  ${RED}✗ Failed:${NC}  $failed"
  echo -e "  ${YELLOW}⊘ Skipped:${NC} $skipped"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  if [[ $failed -gt 0 ]]; then
    exit 1
  fi
}

main "$@"

