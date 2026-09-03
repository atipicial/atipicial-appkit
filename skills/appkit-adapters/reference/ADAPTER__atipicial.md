---
status: draft
owner: Trinity
last_updated: 2026-03-25
version: 0.2
---

# Adapter Reference — Atipicial

## Install

Published-package usage:

```bash
pnpm add @reown/appkit @atipicial/appkit-atipicial-adapter react react-dom
```

Local monorepo/source-alias usage may also require explicit Reown peer packages:

```bash
pnpm add @reown/appkit-common@1.8.19 @reown/appkit-controllers@1.8.19
```

## React import rule

- Install `@reown/appkit`
- Import React APIs from `@reown/appkit/react`
- Do not install `@reown/appkit/react` as a separate package

## Validated init snippet

```ts
import { createAppKit } from '@reown/appkit/react'
import {
  AtipicialAdapter,
  AtipicialConstants,
  atipicialMainnetNetwork,
  atipicialTestnetNetwork,
} from '@atipicial/appkit-atipicial-adapter'

createAppKit({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  adapters: [new AtipicialAdapter()],
  networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
  metadata: {
    name: 'Atipicial AppKit Example',
    description: 'Minimal Vite + React example using the Atipicial Atipicial AppKit adapter.',
    url: 'http://localhost:5173',
    icons: ['https://atipicial.io/favicon.ico'],
  },
  universalProviderConfigOverride: AtipicialConstants.OVERRIDES,
})
```

## Provider access

```ts
import { useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'

// @ts-expect-error AppKit types do not yet include the atipicial namespace.
const { walletProvider } = useAppKitProvider<AtipicialProvider>('atipicial')
```

## Capabilities / quirks

- `AtipicialConstants.OVERRIDES` is required.
- The validated example uses `getWalletInfo()` and `testInvoke()` through the wallet-backed provider.
- Current AppKit typings do not fully model the `atipicial` namespace, so targeted `@ts-expect-error` directives are currently needed.
- If build resolution fails for Reown internal packages in a local-source setup, ensure `@reown/appkit-common` and `@reown/appkit-controllers` are installed in the app.
