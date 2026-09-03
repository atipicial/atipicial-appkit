---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Adapter Reference — Stellar

## Install

```bash
pnpm add @reown/appkit @atipicial/appkit-stellar-adapter
```

If you must use npm:

```bash
npm install @reown/appkit @atipicial/appkit-stellar-adapter
```
> Note: In constrained agent environments, `npm install` can exceed the 60s execution limit. Prefer pnpm or a cached/prebuilt environment.

### React bindings pitfall

- ❌ Never install: `@reown/appkit/react`
- ✅ Install: `@reown/appkit`
- ✅ Import React bindings from the subpath:

```ts
import { AppKitProvider } from '@reown/appkit/react'
```

## Init snippet (minimal)

```ts
import { createAppKit } from '@reown/appkit'
import { StellarAdapter, StellarConstants } from '@atipicial/appkit-stellar-adapter'

export const appKit = createAppKit({
  projectId: process.env.VITE_REOWN_PROJECT_ID,
  adapters: [new StellarAdapter()],
  // REQUIRED for Stellar:
  universalProviderConfigOverride: StellarConstants.OVERRIDES
})
```

## Example app

There is no separate Stellar example app yet. For a working end-to-end reference, use the canonical Atipicial Vite example:

- `examples/vite-react-atipicial/`

When adapting that example for Stellar:

- Keep the overall structure and React/Vite wiring the same.
- Change only:
  - the adapter import (`@atipicial/appkit-stellar-adapter` instead of the Atipicial adapter), and
  - the network configuration (Stellar network / RPC details).

See also: `guides/GUIDE__stellar__react.md` for Stellar-specific patterns.

## Capabilities / quirks

- Requires `universalProviderConfigOverride: StellarConstants.OVERRIDES`.
- Network passphrase / horizon endpoint mismatches cause confusing failures—be explicit.
- “Hello chain” recommended validation: connect + one read-only Stellar RPC / Horizon call via the provider exposed by AppKit.

## Supported operations (typical)

- connect / disconnect
- read public key
- sign transaction (wallet-dependent)
