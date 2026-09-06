#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Launcher for the @lgtm-hq/turbo-themes CLI (site-native theme tooling).
import { runCli } from '../packages/core/dist/native-theme/cli.js';

process.exit(runCli());
