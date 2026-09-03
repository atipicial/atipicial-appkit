# Atipicial Vite React Example

This example demonstrates a real AppKit + Atipicial adapter integration using the adapter source from this monorepo.

## What it does

- Initializes Reown AppKit with `AtipicialAdapter`
- Registers Atipicial WalletConnect method overrides via `AtipicialConstants.OVERRIDES`
- Opens the Atipicial wallet modal with `useAppKit()`
- Accesses the adapter-backed provider with `useAppKitProvider('atipicial')`
- Calls real Atipicial provider methods such as `getWalletInfo()` and `testInvoke()`

## Configure

Create a local `.env` file from `.env.example` and set your Reown project ID:

```bash
cp .env.example .env
```

Then edit `.env`:

```bash
VITE_REOWN_PROJECT_ID=your_project_id_here
```

Get a project ID from https://cloud.reown.com.

## Run locally

From this example directory:

```bash
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Repository workflow note

This example now resolves `@atipicial/appkit-atipicial-adapter` to the package source at `../../../../packages/appkit-atipicial-adapter/src/index.ts` through Vite aliasing.

That means the example no longer depends on prebuilt `dist/` artifacts from the local adapter package just to run inside this repository checkout.

## Important notes

- `AtipicialConstants.OVERRIDES` is required; without it, Atipicial-specific WalletConnect methods are not registered.
- AppKit's current TypeScript types do not fully recognize the `atipicial` namespace, so the example includes targeted `@ts-expect-error` directives where needed.
- `testInvoke(balanceOf)` requires a connected Atipicial wallet session because the provider call is routed through the wallet.
- In this environment, fresh `pnpm install` may still be blocked by an upstream `esbuild` install crash (`SIGSEGV`) under Node `v24.14.0`. If that occurs, use a supported Node/runtime combination for local verification.
