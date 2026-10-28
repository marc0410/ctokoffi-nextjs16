import { spawnSync } from 'node:child_process';
// Portable on Windows/macOS/Linux; no shell-specific environment syntax.
const result = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build'], {
  stdio: 'inherit',
  env: { ...process.env, STATIC_EXPORT: 'true' },
});
process.exit(result.status ?? 1);
