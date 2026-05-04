#!/usr/bin/env node
// Entrypoint shim. Bun and Node can both execute this.
// Resolves the compiled CLI under ../dist; falls back to src/ during local dev.
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const distEntry = join(here, "..", "dist", "index.js");
const srcEntry = join(here, "..", "src", "index.ts");

const target = existsSync(distEntry) ? distEntry : srcEntry;
await import(target);
