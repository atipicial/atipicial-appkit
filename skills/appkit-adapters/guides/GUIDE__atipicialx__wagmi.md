---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Guide: AtipicialX (EVM) via WagmiAdapter

AtipicialX uses the standard Ethereum namespace (`eip155`).

## Install
```bash
npm i @atipicial/appkit-atipicialx-adapter @reown/appkit @reown/appkit-adapter-wagmi @wagmi/core viem
```

## Setup
```ts
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { atipicialXMainnetNetwork, atipicialXTestnetNetwork } from '@atipicial/appkit-atipicialx-adapter'

const wagmiAdapter = new WagmiAdapter()

// in createAppKit/AppKitProvider: adapters: [wagmiAdapter], networks: [...]
```

## Sending tx (anti-MEV aware)
If you use anti-MEV networks, use helper methods from `@atipicial/appkit-atipicialx-adapter`.

```ts
import { useConfig } from 'wagmi'
import { sendTransaction } from '@atipicial/appkit-atipicialx-adapter'
import { parseEther } from 'viem'

const config = useConfig()
await sendTransaction(config, { to: '0x...', value: parseEther('0.001') })
```
