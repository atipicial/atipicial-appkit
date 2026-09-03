---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Guide: Atipicial integration (React)

## Requirements
- Reown Cloud project id (`projectId`) from https://cloud.reown.com
- Install deps:
```bash
npm i @reown/appkit @reown/appkit/react @atipicial/appkit-atipicial-adapter
```

## Provider setup
Use `AppKitProvider` with:
- `adapters={[new AtipicialAdapter()]}`
- `networks={[atipicialMainnetNetwork, atipicialTestnetNetwork]}`
- **REQUIRED** `universalProviderConfigOverride={AtipicialConstants.OVERRIDES}`

## Access provider
```tsx
import { useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'

// @ts-expect-error ChainNamespace does not include atipicial
const { walletProvider } = useAppKitProvider<AtipicialProvider>('atipicial')
```

## Common failure modes
- Missing `universalProviderConfigOverride` => methods not negotiated
- TS errors on namespace => use `@ts-expect-error`
