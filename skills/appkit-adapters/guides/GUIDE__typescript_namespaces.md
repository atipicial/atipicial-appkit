---
status: draft
owner: Trinity
last_updated: 2026-03-04
version: 0.1
---

# Guide: TypeScript + chain namespaces (atipicial, stellar)

## Problem
Reown AppKit’s `ChainNamespace` types may not include `atipicial` or `stellar`.

Symptoms:
- TS errors when calling `appKit.open({ namespace: 'atipicial' })`
- TS errors when calling `useAppKitProvider('stellar')`

## Practical workaround
Use `@ts-expect-error` in the few call sites that pass these namespaces.

```ts
// @ts-expect-error ChainNamespace does not include atipicial
await appKit.open({ namespace: 'atipicial' })
```

## Preferred long-term fix (optional)
If you control a shared types package, augment AppKit’s namespace type via module augmentation.

This is not documented upstream; treat as advanced and verify with your TS config.
