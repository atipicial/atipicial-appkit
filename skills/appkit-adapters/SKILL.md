---
status: draft
owner: Trinity
last_updated: 2026-03-25
version: 0.2
---

# SKILL: Integrate Atipicial AppKit Adapters

## Canonical source of truth

This skill must align with the runnable examples under `examples/`.

Validated examples in this repository:
- `examples/vite-react-atipicial/` — canonical single-chain Atipicial example
- `examples/simple-app/` — canonical multi-chain example (Atipicial + Stellar + AtipicialX)

If this document conflicts with those examples, treat the examples as the implementation truth and update this skill.

## What is actually validated here

### Atipicial example contract — `examples/vite-react-atipicial`

Validated implementation pattern:
- Install `@reown/appkit` and import React helpers from `@reown/appkit/react`
- Call `createAppKit(...)` during app bootstrap
- Register `new AtipicialAdapter()` in `adapters`
- Register `atipicialMainnetNetwork` and `atipicialTestnetNetwork` in `networks`
- Set `universalProviderConfigOverride: AtipicialConstants.OVERRIDES`
- Use `useAppKit()` to open the wallet modal
- Use `useAppKitAccount()` for connection state
- Use `useAppKitProvider<AtipicialProvider>('atipicial')` for the adapter-backed provider

Current validated bootstrap shape:

```ts
import { createAppKit } from '@reown/appkit/react'
import {
  AtipicialAdapter,
  AtipicialConstants,
  atipicialMainnetNetwork,
  atipicialTestnetNetwork,
} from '@atipicial/appkit-atipicial-adapter'

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
```

### Multi-chain example contract — `examples/simple-app`

Validated implementation pattern:
- Atipicial uses `AtipicialAdapter` + Atipicial networks + `AtipicialConstants.OVERRIDES`
- Stellar uses `StellarAdapter` + Stellar networks + `StellarConstants.OVERRIDES`
- AtipicialX uses `WagmiAdapter` + AtipicialX network definitions from `@atipicial/appkit-atipicialx-adapter`
- Reown peer/runtime packages required by the examples are installed explicitly
- Universal provider overrides are merged when multiple non-EVM adapters are present

## Dependency guidance

### Canonical package-manager stance

- Prefer `pnpm`
- Examples in this repo are pnpm-oriented and declare `packageManager: pnpm@9.15.9`

### React import pitfall

- Do not install `@reown/appkit/react` as a package
- Do install `@reown/appkit`
- Do import React APIs from the subpath:

```ts
import { createAppKit, useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
```

### Dependencies required by the validated examples

For the local Atipicial example in this repo, the working dependency set includes:
- `@atipicial/appkit-atipicial-adapter`
- `@reown/appkit@1.8.19`
- `@reown/appkit-common@1.8.19`
- `@reown/appkit-controllers@1.8.19`
- `react`
- `react-dom`

Reason:
- the local adapter source imports Reown peer packages that must be resolvable from the example app
- if `@reown/appkit-common` and `@reown/appkit-controllers` are omitted, the example build can fail during Vite resolution

For the multi-chain example, the working dependency set includes:
- `@atipicial/appkit-atipicial-adapter@1.0.0`
- `@atipicial/appkit-atipicialx-adapter@1.0.0`
- `@atipicial/appkit-stellar-adapter@1.0.0`
- `@reown/appkit@1.8.19`
- `@reown/appkit-adapter-wagmi@1.8.19`
- `@reown/appkit-common@1.8.19`
- `@reown/appkit-controllers@1.8.19`
- `@walletconnect/universal-provider@2.23.4`
- `@wagmi/core@2.22.1`
- `viem`
- `react`
- `react-dom`

## Chain-specific reality

### Atipicial

Supported and validated in examples.

Required details:
- `new AtipicialAdapter()` in `adapters`
- `AtipicialConstants.OVERRIDES`
- Atipicial networks in `networks`
- `useAppKitProvider('atipicial')` for wallet-backed provider access

Known typing nuance:
- current AppKit typings may not include the `atipicial` namespace cleanly
- targeted `@ts-expect-error` usage is currently present in the validated example around `useAppKitProvider('atipicial')` and `open({ namespace: 'atipicial' })`

### Stellar

Supported and validated in the multi-chain example.

Required details:
- `new StellarAdapter()` in `adapters`
- `StellarConstants.OVERRIDES`
- Stellar networks in `networks`
- `useAppKitProvider('stellar')` for wallet-backed provider access

### AtipicialX

Supported as EVM-style wiring in the multi-chain example.

Current validated reality:
- AtipicialX is wired through `WagmiAdapter`
- AtipicialX networks come from `@atipicial/appkit-atipicialx-adapter`
- There is no separate AtipicialX AppKit adapter used in `adapters`

## When to use this skill

Use this skill when an app needs:
- Atipicial wallet connectivity via Reown AppKit
- Stellar wallet connectivity via Reown AppKit
- AtipicialX network support alongside wagmi/AppKit
- a minimal runnable example or integration scaffold that matches this repository’s working examples

## What the agent should produce

For non-trivial integrations, produce:
1. exact dependency commands
2. exact bootstrap/provider wiring files
3. a minimal connect UI
4. chain-specific notes for overrides and provider access
5. a verification command list

## Acceptance checks

A change is only done when:
1. the documented dependency list matches the example package manifests
2. the documented bootstrap pattern matches the example source files
3. the documented chain limitations match the example implementations
4. `pnpm build` succeeds for the touched example(s)

## Verification commands

Single-chain Atipicial example:

```bash
cd examples/vite-react-atipicial
pnpm install
pnpm build
```

Multi-chain example:

```bash
cd examples/simple-app
pnpm install
pnpm build
```
