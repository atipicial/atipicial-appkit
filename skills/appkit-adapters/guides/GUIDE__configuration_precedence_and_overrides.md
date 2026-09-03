# Guide: Configuration precedence and universal provider overrides

Status: draft
Owner: Trinity
Last updated: 2026-03-04

## Purpose

Define a single, canonical model for **configuration precedence** and **universal provider overrides** for AppKit adapters.

This guide explains how to think about:
- global defaults
- per-chain overrides (e.g. `AtipicialConstants.OVERRIDES`, `StellarConstants.OVERRIDES`)
- runtime overrides provided by the integrator

## Precedence model

From lowest to highest precedence:

1. **Global defaults** — safe library-provided defaults.
2. **Per-chain overrides** — required overrides that enable non-default RPC methods.
3. **Runtime overrides** — explicit overrides passed by the app/integrator.

Resulting effective config = `merge(global_defaults, chain_overrides, runtime_overrides)`.

## universalProviderConfigOverride

- Atipicial: REQUIRED (`universalProviderConfigOverride: AtipicialConstants.OVERRIDES`)
- Stellar: REQUIRED (`universalProviderConfigOverride: StellarConstants.OVERRIDES`)
- AtipicialX: not used (EVM defaults)

See: `reference/REF__universal_provider_overrides.md`

## Merge semantics (contract)

- Treat `universalProviderConfigOverride` as an **object** of overrides.
- Merge should be **deep** (nested keys preserved), unless upstream dictates otherwise.
- Runtime overrides may extend/override chain overrides, but should not remove required method support.

## Misconfiguration policy (fail-fast vs fallback)

Fail fast (throw / hard error) when:
- required overrides are missing for Atipicial/Stellar
- required env (e.g. Reown Project ID) is missing

Fallback acceptable when:
- cosmetic metadata is missing (labels, icons)

## Relation to other docs

- `reference/REF__universal_provider_overrides.md` defines why overrides exist and which chains require them.
- `SKILL.md` documents the per-chain override constants at a glance.
