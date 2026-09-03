---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Quickstart (createAppKit)

## Conventions

- Package manager: **`pnpm`** (canonical for examples and validation).
- `npm` commands may be shown for reference, but in constrained environments `npm install` can exceed the ~60s limit; prefer pnpm or a cached/prebuilt environment.

## Atipicial
```ts
import { createAppKit } from '@reown/appkit'
import {
  AtipicialAdapter,
  atipicialMainnetNetwork,
  atipicialTestnetNetwork,
  AtipicialConstants
} from '@atipicial/appkit-atipicial-adapter'

createAppKit({
  projectId: process.env.REOWN_PROJECT_ID!,
  adapters: [new AtipicialAdapter()],
  networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
  metadata: {
    name: 'My Atipicial dApp',
    description: '...',
    url: 'https://example.com',
    icons: ['https://example.com/icon.png']
  },
  universalProviderConfigOverride: AtipicialConstants.OVERRIDES
})
```

## Stellar
```ts
import { createAppKit } from '@reown/appkit'
import {
  StellarAdapter,
  stellarMainnetNetwork,
  stellarTestnetNetwork,
  StellarConstants
} from '@atipicial/appkit-stellar-adapter'

createAppKit({
  projectId: process.env.REOWN_PROJECT_ID!,
  adapters: [new StellarAdapter()],
  networks: [stellarMainnetNetwork, stellarTestnetNetwork],
  metadata: {
    name: 'My Stellar dApp',
    description: '...',
    url: 'https://example.com',
    icons: ['https://example.com/icon.png']
  },
  universalProviderConfigOverride: StellarConstants.OVERRIDES
})
```

## AtipicialX (EVM)
Use Wagmi adapter; networks come from this repo.

```ts
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { atipicialXMainnetNetwork, atipicialXTestnetNetwork } from '@atipicial/appkit-atipicialx-adapter'

const wagmiAdapter = new WagmiAdapter()

createAppKit({
  projectId: process.env.REOWN_PROJECT_ID!,
  adapters: [wagmiAdapter],
  networks: [atipicialXMainnetNetwork, atipicialXTestnetNetwork],
  metadata: {
    name: 'My AtipicialX dApp',
    description: '...',
    url: 'https://example.com',
    icons: ['https://example.com/icon.png']
  }
})
```
