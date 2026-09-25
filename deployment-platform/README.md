# VTAB Deployment Platform

This directory is the source of truth for VTAB application promotion.

## Lifecycle

1. Feature work is merged to `develop` by pull request.
2. Repository validation must pass before DEV deployment.
3. DEV is isolated from production credentials and is deployed to Cloudflare where the application architecture is compatible.
4. Functional/UAT approval is recorded before promotion.
5. Production promotion is a pull request from `develop` to the repository's production branch (`main`, or `master` where applicable).
6. Production is deployed only by the existing production deployment mechanism after the promotion PR is approved and merged.
7. Rollback uses the last known-good production commit/deployment; DEV never overwrites production.

## Required gates

- locked/reproducible dependency install where a lock file exists
- compile/type/build validation
- repository tests and lint when defined and stable
- no production secrets in source or DEV build configuration
- architecture/runtime compatibility validation
- immutable Git commit recorded as the release candidate
- DEV deployment succeeds before promotion
- human UAT/release approval before production merge

## Application registry

`applications.json` records architecture, Cloudflare target, build output, and onboarding status. A repository marked `requires-*-migration` must not be falsely deployed as a static site; its server/API runtime must be adapted first.

## Security

Cloudflare credentials are GitHub Actions secrets only. Never commit tokens, database credentials, Supabase service keys, email credentials, or production environment values. DEV and PROD credentials must remain separate.
