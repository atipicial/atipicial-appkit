# Simple AppKit Integration Example

This is the smallest runnable example in this repo that wires the real Atipicial AppKit integrations for Atipicial, Stellar, and AtipicialX.

## What it demonstrates

- `createAppKit(...)` with `AtipicialAdapter`
- `createAppKit(...)` with `StellarAdapter`
- AtipicialX wiring through `WagmiAdapter` plus `atipicialXTestnetNetwork`
- merged `AtipicialConstants.OVERRIDES` + `StellarConstants.OVERRIDES`
- opening wallet modals for Atipicial, Stellar, and AtipicialX
- reading provider-backed wallet metadata with `useAppKitProvider('atipicial')` and `useAppKitProvider('stellar')`

## Setup

```bash
cp .env.example .env
```

Set your Reown project ID in `.env`:

```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
```

## Run

```bash
pnpm install
pnpm dev
```

## Notes

- This example intentionally targets testnet networks to stay minimal.
- Atipicial and Stellar require universal provider overrides.
- AtipicialX is EVM-based, so it is wired through the standard `WagmiAdapter` using the `eip155` namespace.
