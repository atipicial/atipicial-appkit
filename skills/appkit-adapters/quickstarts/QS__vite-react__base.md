---
status: draft
owner: Trinity
last_updated: 2026-03-25
version: 0.2
---

# Quickstart — React + AppKit base pattern

## Critical import rule

- Install `@reown/appkit`
- Import React APIs from `@reown/appkit/react`
- Do not try to install `@reown/appkit/react` as its own package

## Validated bootstrap pattern

The examples in this repository use `createAppKit(...)` during app bootstrap.

### Atipicial

```ts
import { createAppKit } from '@reown/appkit/react'
import {
  AtipicialAdapter,
  AtipicialConstants,
  atipicialMainnetNetwork,
} from '@atipicial/appkit-atipicial-adapter'

createAppKit({
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  adapters: [new AtipicialAdapter()],
  networks: [atipicialMainnetNetwork],
  metadata: {
    name: 'My Atipicial dApp',
    description: 'Example app',
    url: 'http://localhost:5173',
    icons: ['https://example.com/icon.png'],
  },
  universalProviderConfigOverride: AtipicialConstants.OVERRIDES,
})
```

### Getting the chain provider

```ts
import { useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'

function AtipicialDebug() {
  // @ts-expect-error ChainNamespace does not yet include atipicial
  const { walletProvider } = useAppKitProvider<AtipicialProvider>('atipicial')
  return <pre>{walletProvider ? 'atipicial provider ready' : 'no provider'}</pre>
}
```

### Stellar

Use the same pattern with:
- `StellarAdapter`
- `stellarMainnetNetwork` / `stellarTestnetNetwork`
- `StellarConstants.OVERRIDES`

### AtipicialX

AtipicialX is wired as EVM support through wagmi:
- use `WagmiAdapter`
- use AtipicialX networks from `@atipicial/appkit-atipicialx-adapter`
- do not expect a separate AtipicialX adapter object in `adapters`
