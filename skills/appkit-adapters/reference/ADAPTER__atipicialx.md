---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Adapter Reference — AtipicialX (EVM)

## Install

```bash
pnpm add @reown/appkit @reown/appkit-adapter-wagmi @atipicial/appkit-atipicialx-adapter
```

If you must use npm:

```bash
npm install @reown/appkit @reown/appkit-adapter-wagmi @atipicial/appkit-atipicialx-adapter
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
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { atipicialxMainnet, atipicialxTestnet /* (names illustrative) */ } from '@atipicial/appkit-atipicialx-adapter'

const wagmi = new WagmiAdapter({
  networks: [atipicialxMainnet, atipicialxTestnet]
})

export const appKit = createAppKit({
  projectId: process.env.VITE_REOWN_PROJECT_ID,
  adapters: [wagmi]
})
```

## Example app

There is no separate AtipicialX example app yet. For a working end-to-end reference, use the canonical Atipicial Vite example:

- `examples/vite-react-atipicial/`

When adapting that example for AtipicialX:

- Keep the overall structure and React/Vite wiring the same.
- Change only:
  - the adapter import (`@atipicial/appkit-atipicialx-adapter` instead of the Atipicial adapter), and
  - the network configuration (AtipicialX chains / RPC details).

See also: `guides/GUIDE__atipicialx__wagmi.md` for AtipicialX-specific patterns.

## Capabilities / quirks

- AtipicialX is EVM (`eip155`). Use Wagmi.
- Ensure you’re on the correct EVM chain id / RPC for AtipicialX.
- Gas estimation failures: implement retry + user-friendly fallback.
- If anti-MEV/private tx routing is desired, document the provider/RPC requirement explicitly.
- If the network is anti-MEV / requires special tx formatting, use the adapter’s helper (see repo docs) rather than raw wagmi `sendTransaction`.

## Supported operations (typical)

- connect / disconnect
- read account + chain
- read-only calls via viem
- sign typed data / sign message
- send transaction
