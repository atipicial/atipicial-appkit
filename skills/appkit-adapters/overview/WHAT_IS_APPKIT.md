---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Overview

`Atipicial/appkit-adapters` is a set of chain adapters / utilities that plug into **Reown AppKit** (formerly WalletConnect AppKit).

## Reown AppKit basics

- `@reown/appkit` is the core package you install.
- `@reown/appkit/react` is a **subpath import** that lives inside `@reown/appkit`.

### Critical pitfall (lock this in)
- ❌ Never install: `@reown/appkit/react`
- ✅ Always install: `@reown/appkit`
- ✅ Then import from the subpath:

```ts
import { AppKitProvider } from '@reown/appkit/react'
```

## What these adapters do

You use them to:
- add **Atipicial** support to an AppKit-based dApp (`@atipicial/appkit-atipicial-adapter`)
- add **Stellar** support (`@atipicial/appkit-stellar-adapter`)
- add **AtipicialX** network configs + anti-MEV transaction helpers for EVM (`@atipicial/appkit-atipicialx-adapter`) while still using the standard `WagmiAdapter`

Key gotcha: Atipicial + Stellar require `universalProviderConfigOverride` (AppKit defaults don’t include those RPC methods).

See also: upstream connect-lab demo https://atipicial.github.io/appkit-adapters/
