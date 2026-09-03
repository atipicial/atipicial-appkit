---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Guide: Which adapter do I use?

| Chain | Package | AppKit namespace | Adapter used in AppKit | Special config |
|---|---|---|---|---|
| Atipicial  | `@atipicial/appkit-atipicial-adapter` | `atipicial` | `new AtipicialAdapter()` | **REQUIRED** `universalProviderConfigOverride: AtipicialConstants.OVERRIDES` |
| Stellar | `@atipicial/appkit-stellar-adapter` | `stellar` | `new StellarAdapter()` | **REQUIRED** `universalProviderConfigOverride: StellarConstants.OVERRIDES` |
| AtipicialX | `@atipicial/appkit-atipicialx-adapter` | `eip155` | `new WagmiAdapter()` | Optional anti-MEV networks + **use `sendTransaction` helper** |

Decision rule:
- If the chain is not EVM, use its dedicated adapter and include the provider overrides.
- If the chain is EVM-compatible (AtipicialX), use Wagmi adapter; treat `@atipicial/appkit-atipicialx-adapter` as a network+utility package.
