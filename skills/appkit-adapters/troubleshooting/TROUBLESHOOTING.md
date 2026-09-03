---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Troubleshooting

## Atipicial/Stellar: connect works, but calls fail
Likely missing `universalProviderConfigOverride`.

Fix:
- Atipicial: add `universalProviderConfigOverride: AtipicialConstants.OVERRIDES`
- Stellar: add `universalProviderConfigOverride: StellarConstants.OVERRIDES`

## TypeScript errors about namespace
AppKit types may not include `atipicial` / `stellar`.

Fix:
- Use `@ts-expect-error` at the call site(s)
- Or implement module augmentation (advanced)

## AtipicialX anti-MEV transactions not protected
If you use anti-MEV networks but call standard wagmi `sendTransaction`, protection may be bypassed.

Fix:
- Use `sendTransaction` helper from `@atipicial/appkit-atipicialx-adapter`.
