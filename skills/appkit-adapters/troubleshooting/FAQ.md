---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# FAQ

## Do I need WalletConnect v2 knowledge?
Not directly; AppKit abstracts it. You do need a Reown Cloud `projectId`.

## Why is AtipicialX different?
AtipicialX is EVM-compatible; it uses `eip155`. That means you use the standard EVM adapter (`WagmiAdapter`) and only import AtipicialX networks/utilities from this repo.

## Why do Atipicial and Stellar need overrides?
AppKit does not ship their method sets by default, so session method negotiation needs explicit overrides.
