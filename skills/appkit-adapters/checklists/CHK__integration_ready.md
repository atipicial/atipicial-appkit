---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Checklist: Integration Ready

## Common
- [ ] Reown projectId provisioned and stored as env var
- [ ] App metadata set (name, url, icons)
- [ ] AppKit instance/provider configured in exactly one place
- [ ] Connect / disconnect UI flow implemented and tested

## Atipicial
- [ ] `adapters` includes `new AtipicialAdapter()`
- [ ] `networks` includes `atipicialMainnetNetwork` (and/or testnet)
- [ ] **`universalProviderConfigOverride: AtipicialConstants.OVERRIDES` is present**
- [ ] Provider access works: `useAppKitProvider<AtipicialProvider>('atipicial')`

## Stellar
- [ ] `adapters` includes `new StellarAdapter()`
- [ ] `networks` includes `stellarMainnetNetwork` (and/or testnet)
- [ ] **`universalProviderConfigOverride: StellarConstants.OVERRIDES` is present**
- [ ] Provider access works: `useAppKitProvider<StellarProvider>('stellar')`

## AtipicialX
- [ ] `adapters` includes `WagmiAdapter`
- [ ] `networks` includes `atipicialXMainnetNetwork`/`atipicialXTestnetNetwork`
- [ ] If using anti-MEV networks: transactions sent via `@atipicial/appkit-atipicialx-adapter` helpers
