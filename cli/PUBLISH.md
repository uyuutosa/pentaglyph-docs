# Publishing the tetragram CLI to npm

> Audience: maintainers of [`@uyuutosa/tetragram`](https://www.npmjs.com/package/@uyuutosa/tetragram).
> If you only want to *use* the CLI, see [`README.md`](./README.md).

This document covers the **first publish** (0.0.1) and the **steady-state release flow**.

---

## Versioning policy

- **0.0.x** — initial scoped releases. API may break between any two patch versions. The unscoped `tetragram` name is **not yet claimed**.
- **0.1.0** — first release once the API has stabilised in real use. At this point we publish unscoped `tetragram` and keep `@uyuutosa/tetragram` as a forwarding alias.
- **1.0.0** — semver guarantees engage. No breaking changes without a major bump.

The package name change between 0.0.x and 0.1.0+ is deliberate — it signals stability publicly and lets the unscoped name accumulate trust before being claimed.

---

## First publish (0.0.1)

### Prerequisites

1. **npm account** — create one at <https://www.npmjs.com/signup> if needed. Username should match (or be associated with) the GitHub identity `uyuutosa`.
2. **Two-factor auth** — required by npm for publishing. Set it up at <https://www.npmjs.com/settings/<your-username>/profile>.
3. **Bun installed locally** — see [`README.md`](./README.md). `prepack` runs `bun run scripts/sync-template.mjs`.
4. **Clean working tree** — `git status` shows nothing modified.
5. **CI green on `main`** — check <https://github.com/uyuutosa/tetragram-docs/actions>.

### Steps

```bash
cd cli/

# 1. Log in to npm (interactive — opens a browser for OAuth)
npm login

# 2. Verify you're logged in as the right user
npm whoami
# → uyuutosa  (or whichever account owns @uyuutosa/*)

# 3. Confirm the tarball contents one more time
bun run sync-template
npm pack --dry-run | tail -10

# 4. Publish (the "@uyuutosa/" scope means access:public is REQUIRED)
npm publish --access=public --otp=<6-digit code from your authenticator>

# 5. Verify it landed
npm view @uyuutosa/tetragram version
# → 0.0.1
```

### Smoke test the published version

In a clean shell:

```bash
cd /tmp && rm -rf publish-test
bunx --bun @uyuutosa/tetragram init ./publish-test \
  --profile=standard --ai=claude --name="Publish Test"
ls publish-test/docs
```

If this scaffolds the kit identically to a local `bun run`, the publish is healthy.

---

## Steady-state release flow

For each new release:

1. **Update version** in `cli/package.json` (`0.0.1` → `0.0.2` for patch, etc.).
2. **Commit** — message format: `chore(cli): release v0.0.2`.
3. **Tag** — `git tag tetragram-cli-v0.0.2` (the `tetragram-cli-` prefix disambiguates from any future tags on the doc kit itself).
4. **Push** the tag — `git push origin tetragram-cli-v0.0.2`.
5. **Publish** — `npm publish --access=public --otp=<code>` from `cli/`.
6. **GitHub Release** — `gh release create tetragram-cli-v0.0.2 --notes-file CHANGELOG.md` (or write release notes inline).

### Optional: automate via GitHub Actions

When ready, add `.github/workflows/release.yml` triggered on tag push, with `NPM_TOKEN` secret. Manual publish is fine until release cadence picks up.

---

## Common pitfalls

| Symptom | Cause | Fix |
|---|---|---|
| `403 You must be logged in to publish packages` | Not logged in or wrong account | `npm login` |
| `402 You must sign up for private packages` | Forgot `--access=public` on a scoped name | Re-run with `--access=public` |
| `EBADENGINE` (during install on user's machine) | User's Node < 20 | Ask user to upgrade Node, or install Bun |
| Published tarball missing `template/` | `prepack` didn't run | Verify `package.json` `scripts.prepack`; verify Bun on PATH |
| `template/` contains stale content | `cli/template/` wasn't re-synced after editing `../template/` | Run `bun run sync-template` before `npm publish` |
| `Package name too similar to existing package` | Scoped name conflict | Try a different scope (you own the scope, so this should not occur for `@uyuutosa/*`) |

---

## Unpublish window

npm allows `npm unpublish @uyuutosa/tetragram@0.0.1` **only within 72 hours** of publish, and only if no other package depends on it.

After 72 hours:

- You can `npm deprecate @uyuutosa/tetragram@0.0.1 "<reason>"` to discourage use.
- The version number is **permanently retired** — you cannot re-publish `0.0.1`. Bump to `0.0.2` instead.

---

## Future: claiming the unscoped `tetragram` name

When the API has been stable across 2–3 patch versions in real use:

1. Verify availability: `curl -s -o /dev/null -w '%{http_code}\n' https://registry.npmjs.org/tetragram` (404 means available).
2. Bump `cli/package.json`:
   - `"name": "tetragram"` (unscoped)
   - `"version": "0.1.0"`
3. Add `@uyuutosa/tetragram` as a deprecated alias:
   - Publish a final `@uyuutosa/tetragram@0.0.99` whose `package.json` has nothing but `"deprecated": "Use 'tetragram' instead"`.
4. `npm publish --access=public` (no scope this time means default access is public).

---

## References

- npm publishing — <https://docs.npmjs.com/cli/commands/npm-publish>
- npm scoped packages — <https://docs.npmjs.com/cli/using-npm/scope>
- semver — <https://semver.org/>
- npm unpublish policy — <https://docs.npmjs.com/policies/unpublish>
