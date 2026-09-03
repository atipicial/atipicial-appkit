---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Reference: exports & types (high-level)

This library intentionally keeps reference-level docs high-level; agents should confirm exact exports against installed package versions.

## `@atipicial/appkit-atipicial-adapter`
Likely exports (per README):
- `AtipicialAdapter`
- `AtipicialConstants`
- `atipicialMainnetNetwork`, `atipicialTestnetNetwork`
- types like `AtipicialProvider`

## `@atipicial/appkit-stellar-adapter`
- `StellarAdapter`
- `StellarConstants`
- `stellarMainnetNetwork`, `stellarTestnetNetwork`
- types like `StellarProvider`

## `@atipicial/appkit-atipicialx-adapter`
- `atipicialX*Network` definitions
- `sendTransaction(config, params)` helper for anti-MEV support
