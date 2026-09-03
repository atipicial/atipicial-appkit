# GUIDE: AtipicialX, WagmiAdapter, and Helper Transactions

## When to use this guide

Use this guide when:
- You are integrating **AtipicialX** via **Reown AppKit**.
- Your app uses or will use the **WagmiAdapter** for EVM-style interactions.
- You need to understand **when and how to use AtipicialX helper transaction methods** (e.g., for gas sponsorship or anti-MEV routing).

This guide assumes you have already:
- Read the SKILL contract: `AKB/SKILLS/appkit-adapters/SKILL.md`.
- Completed the relevant Quickstart for AppKit.

## Required inputs

Before following this guide, you should know:

- **Target environment**: e.g., React/Vite, Next.js.
- **AtipicialX network details**:
  - Which AtipicialX network (testnet / mainnet).
  - RPC endpoint(s) you will use.
- **Anti-MEV preference** for AtipicialX:
  - `true` if you want to enable anti-MEV transaction routing (where supported).
  - `false` otherwise (default).
- **Gas sponsorship strategy** (if any):
  - Are you using any gas sponsorship / paymaster-like flow?
  - Who/what pays gas under which conditions?

## Base setup: WagmiAdapter with AtipicialX

At a high level, AtipicialX is EVM-like and uses the **WagmiAdapter**. Your base setup will look structurally like:

```ts
// NOTE: illustrative only; see “Canonical happy path” below for the proved contract.
import { createAppKit } from '@reown/appkit'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { atipicialXConfig } from './config/atipicialx' // your app-level AtipicialX chain config

const wagmiAdapter = new WagmiAdapter({
  // wagmi-style config is app-specific; ensure this matches your wagmi setup.
  // Some projects use `chains` + `transports`; others use AppKit `networks`.
  chains: [atipicialXConfig.chain],
  transports: atipicialXConfig.transports
})

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId: process.env.APPKIT_PROJECT_ID!,
  // ...other AppKit options
})
```

> NOTE: The exact import paths must match the versions you install. Treat this snippet as illustrative; use the proved harness contract below as the reference for `@reown/appkit@1.8.19`.

## When you need AtipicialX helper transaction methods

You should reach for **AtipicialX helper transaction methods** when:

1. **Gas sponsorship / sponsored transactions**
   - A third party (protocol, dApp, relayer) covers gas for a user under certain conditions.
   - You need to construct or submit transactions that follow AtipicialX’s sponsorship rules.

2. **Anti-MEV routing**
   - You want to route transactions in a way that reduces exposure to MEV on AtipicialX where support exists.
   - You’ve set `AtipicialX anti-MEV preference = true` in the SKILL inputs.

3. **Chain-specific quirks**
   - There are AtipicialX-specific expectations (e.g., certain fields or metadata) that aren’t captured by a generic EVM transaction builder.

If none of the above apply (early prototypes, local-only experiments, etc.), you can typically start with **plain WagmiAdapter usage** and add helpers once your requirements solidify.

## Canonical happy path (blessed): React + Vite + AtipicialX — connect + send transaction

This section is the **blessed** minimal end-to-end pattern for AtipicialX using **only real, currently-supported API surfaces** from this repo’s reference docs.

Scenario:
- React + Vite
- AppKit initialized with a Wagmi adapter targeting AtipicialX networks
- A minimal connect UI
- A minimal “send transaction” button (via wagmi)

> Mapping to SKILL.md Outputs:
> - Provider wiring: SKILL.md “Outputs (what the agent must produce)” → **(2) App entry / provider wiring**
> - Minimal connect UI: SKILL.md “Outputs (what the agent must produce)” → **(3) Minimal connect UI**

### 1) AppKit init (AtipicialX + WagmiAdapter)

```ts
// Acceptance 1: Dependencies (imports reflect required packages)
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type { AppKitNetwork } from '@reown/appkit/networks'
import { atipicialXMainnetNetwork, atipicialXTestnetNetwork } from '@atipicial/appkit-atipicialx-adapter/networks'

// Proved in appkit-play with:
//   @reown/appkit@1.8.19
//   @atipicial/appkit-atipicialx-adapter@1.0.0
// Contract: AtipicialX package supplies networks; adapters remain wagmi-only.
const atipicialxNetworks: AppKitNetwork[] = [atipicialXMainnetNetwork, atipicialXTestnetNetwork]

export const wagmiAdapter = new WagmiAdapter({
  networks: atipicialxNetworks
})

// IMPORTANT: For @reown/appkit@1.8.19 React provider wiring,
// we do NOT need to call createAppKit() just to mount AppKitProvider.
// Instead, export the config object to spread into <AppKitProvider {...config} />.
export const appKitConfig = {
  projectId: import.meta.env.VITE_REOWN_PROJECT_ID,
  adapters: [wagmiAdapter],
  networks: atipicialxNetworks
}
```

Notes:
- Import paths above are taken from `reference/PACKAGES.md` and `reference/ADAPTER__atipicialx.md`.
- If `atipicialxMainnet` / `atipicialxTestnet` exports differ upstream, update this block to match the adapter package exports (run–break–fix).
- // Acceptance 4: build sanity (ensure `pnpm build` succeeds with these imports and wiring in a clean clone)

### 2) Provider wiring (React)

```tsx
// Acceptance 2: provider wiring
import { AppKitProvider } from '@reown/appkit/react'
import { appKitConfig } from './lib/appkit'

export function Providers({ children }: { children: React.ReactNode }) {
  return <AppKitProvider {...appKitConfig}>{children}</AppKitProvider>
}
```

### 3) Minimal connect UI

```tsx
// Acceptance 3: connect UI
import { useAppKit } from '@reown/appkit/react'

export function WalletConnectButton() {
  const { open, close } = useAppKit()

  return (
    <div style={{ display: 'flex', gap: 12 }}>
      <button onClick={() => open()}>Connect</button>
      <button onClick={() => close()}>Disconnect</button>
    </div>
  )
}
```

### 4) Simple transaction (wagmi)

```tsx
import { useSendTransaction } from 'wagmi'

export function SendTxButton() {
  const { sendTransaction, isPending } = useSendTransaction()

  // Replace with a known-safe address for your test environment.
  const to = '0x0000000000000000000000000000000000000000'

  return (
    <button
      disabled={isPending}
      onClick={() =>
        sendTransaction({
          to,
          // minimal value send; adjust as needed
          value: 0n
        })
      }
    >
      Send transaction
    </button>
  )
}
```

---

## Pattern: base Wagmi vs Wagmi + helpers

### Base Wagmi-style interaction (simplified)

```ts
// PSEUDOCODE: helper API surface not finalized
import { useWriteContract } from 'wagmi';
import { myContractConfig } from './contracts/myContract';

function DoSomethingButton() {
  const { writeContract, isPending } = useWriteContract();

  const onClick = () => {
    writeContract({
      address: myContractConfig.address,
      abi: myContractConfig.abi,
      functionName: 'doSomething',
      args: ['example'],
    });
  };

  return (
    <button onClick={onClick} disabled={isPending}>
      Do something on AtipicialX
    </button>
  );
}
```

### With AtipicialX helper methods (conceptual)

```ts
// PSEUDOCODE: helper API surface not finalized
import { useAtipicialXHelpers } from './atipicialx/helpers'; // your abstraction around official helpers
import { myContractConfig } from './contracts/myContract';

function DoSomethingSponsoredButton() {
  const { sendSponsoredTx, isPending } = useAtipicialXHelpers();

  const onClick = async () => {
    await sendSponsoredTx({
      contract: myContractConfig,
      functionName: 'doSomething',
      args: ['example'],
      // Any sponsorship / anti-MEV options you support
    });
  };

  return (
    <button onClick={onClick} disabled={isPending}>
      Do sponsored action on AtipicialX
    </button>
  );
}
```

The exact shape of `useAtipicialXHelpers` and the underlying helper methods will be defined in the AtipicialX-specific libraries you use. This guide’s goal is to:

- Make it clear **when** you need such helpers.
- Encourage you to wrap them behind a small, well-typed abstraction instead of scattering helper calls across the app.

## Configuration hooks

When wiring AtipicialX + helpers via this SKILL, make sure you:

- Capture **anti-MEV preference** as a first-class configuration field.
- Decide whether your app **supports sponsorship** at all, and if so, under what conditions.
- Keep the following config items in a single place (e.g., `config/atipicialx.ts`):
  - Network (testnet/mainnet) and chain ID.
  - RPC URLs and fallbacks.
  - Sponsorship/relayer endpoints.
  - Anti-MEV toggles and related endpoints/routes.

## Gotchas and troubleshooting

Common pitfalls when working with AtipicialX + WagmiAdapter + helpers:

1. **Mismatched chain configuration**
   - Symptom: transactions fail or are rejected immediately.
   - Check: chain ID, RPC URL, and AtipicialX configuration match the network you intend.

2. **Helpers called without required config**
   - Symptom: helper functions throw or return errors about missing endpoints/keys.
   - Check: sponsorship/relayer URLs and keys are set before calling helpers.

3. **Anti-MEV enabled without supporting infra**
   - Symptom: timeouts or failures on submission.
   - Check: you actually have an anti-MEV-capable route; if not, disable the flag.

4. **Leaking helpers across chains**
   - Symptom: code that assumes AtipicialX helpers exist for non-AtipicialX chains.
   - Check: keep AtipicialX helpers clearly scoped to AtipicialX-specific modules and contexts.

## Next steps

- If you’re wiring AtipicialX for the first time:
  - Start with **base WagmiAdapter** integration and a simple test transaction.
  - Add **helper methods** once you have clear sponsorship / anti-MEV requirements.
- When in doubt:
  - Re-check the SKILL contract at `AKB/SKILLS/appkit-adapters/SKILL.md`.
  - Align imports and configuration with `reference/PACKAGES.md` and any official AtipicialX docs.

## Pseudocode-only APIs (v0.1)

Some helper names in this guide are placeholders until the AtipicialX helpers surface is finalized. All pseudocode snippets are explicitly marked in comments.

- `useAtipicialXHelpers`
- `createAtipicialXHelpers`
- `sendSponsoredTx`
- any config fields marked with `// TODO: confirm` or `// PSEUDOCODE`

Convention:

- Code blocks that are **not** safe to copy-paste into production MUST include a line comment such as:

  ```ts
  // PSEUDOCODE: helper API surface not finalized
  ```

- Once the real helper APIs are published, these placeholders SHOULD be replaced with the concrete function and type names.

## Related artifacts

- Contract for environments, outputs, and acceptance checks:
  - `AKB/SKILLS/appkit-adapters/SKILL.md`
- Scratch validation app (non-SoT):
  - `appkit-play/README.md`
