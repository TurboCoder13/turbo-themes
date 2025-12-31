#!/usr/bin/env node

/**
 * Cross-platform script to prepare and serve the Jekyll site for E2E tests.
 * This script runs the build prep and then starts http-server.
 */

import { execSync, spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

try {
  // Step 1: Run the prep command
  console.log("Running e2e prep (build + Jekyll build)...");
  execSync("bun run e2e:prep", {
    cwd: rootDir,
    stdio: "inherit",
    shell: true,
  });

  // Step 2: Start http-server
  const host = process.env.HOST ?? "127.0.0.1";
  const port = Number(process.env.PORT ?? 4173);
  if (isNaN(port) || port < 1 || port > 65535) {
    console.error(
      `Invalid PORT: ${process.env.PORT}. Must be a number between 1 and 65535.`,
    );
    process.exit(1);
  }
  console.log(`Starting http-server on http://${host}:${port}...`);
  const npxCmd = process.platform === "win32" ? "bunx.cmd" : "bunx";
  const serverArgs = [
    "--no-install",
    "http-server",
    "_site",
    "-a",
    host,
    "-p",
    String(port),
    "-c-1",
    "-s",
  ];
  const serverProcess = spawn(npxCmd, serverArgs, {
    cwd: rootDir,
    stdio: "inherit",
  });
  // Handle spawn errors
  serverProcess.on("error", (error) => {
    console.error("Failed to start http-server:", error.message);
    process.exit(1);
  });

  // Handle server process exit
  serverProcess.on("exit", (code, signal) => {
    if (signal) {
      console.log(`http-server terminated by signal: ${signal}`);
    } else if (code !== null && code !== 0) {
      console.error(`http-server exited with code: ${code}`);
      process.exit(code);
    }
  });

  // Shutdown handling: kill server on process termination
  const shutdown = (signal) => {
    console.log(`\nReceived ${signal}, shutting down http-server...`);
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill(signal);
    }
    process.exit(0);
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("exit", () => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill();
    }
  });
} catch (error) {
  console.error("Error running e2e serve:", error.message);
  process.exit(1);
}
