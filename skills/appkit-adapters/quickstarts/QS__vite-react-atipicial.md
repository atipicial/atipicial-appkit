---
status: draft
owner: Trinity
last_updated: 2026-03-25
version: 0.2
---

# Quickstart — Vite + React (TS) + Atipicial

This quickstart is aligned to the validated runnable example at:
- `examples/vite-react-atipicial/`

## 1) Create the app

```bash
pnpm create vite@latest vite-react-atipicial --template react-ts
cd vite-react-atipicial
```

## 2) Install dependencies

Published-package shape:

```bash
pnpm add @reown/appkit @atipicial/appkit-atipicial-adapter react react-dom
```

If you are wiring against local adapter source in this monorepo-style pattern, also ensure these Reown packages are resolvable from the app:

```bash
pnpm add @reown/appkit-common@1.8.19 @reown/appkit-controllers@1.8.19
```

## 3) Bootstrap AppKit in `src/main.tsx`

```ts
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createAppKit } from '@reown/appkit/react'
import {
  AtipicialAdapter,
  AtipicialConstants,
  atipicialMainnetNetwork,
  atipicialTestnetNetwork,
} from '@atipicial/appkit-atipicial-adapter'
import App from './App'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID

createAppKit({
  projectId,
  adapters: [new AtipicialAdapter()],
  networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
  metadata: {
    name: 'Atipicial AppKit Example',
    description: 'Minimal Vite + React example using the Atipicial Atipicial AppKit adapter.',
    url: 'http://localhost:5173',
    icons: ['https://atipicial.io/favicon.ico'],
  },
  universalProviderConfigOverride: AtipicialConstants.OVERRIDES,
  features: {
    analytics: false,
    email: false,
    socials: false,
    swaps: false,
    onramp: false,
    pay: false,
    send: false,
    receive: false,
  },
  enableCoinbase: false,
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## 4) Use the Atipicial provider in `src/App.tsx`

```ts
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'

function Example() {
  const { open } = useAppKit()
  const account = useAppKitAccount()
  // @ts-expect-error AppKit types do not yet include the atipicial namespace.
  const { walletProvider } = useAppKitProvider<AtipicialProvider>('atipicial')

  async function connectAtipicial() {
    // @ts-expect-error AppKit types do not yet include the atipicial namespace.
    await open({ namespace: 'atipicial' })
  }

  return null
}
```

## 5) Verify

```bash
pnpm build
```

## Notes

- `AtipicialConstants.OVERRIDES` is required.
- The validated example uses `createAppKit` from `@reown/appkit/react` during bootstrap.
- Current AppKit typings still require targeted `@ts-expect-error` directives for the `atipicial` namespace in the example.
