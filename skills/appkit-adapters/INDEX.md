---
status: draft
owner: Trinity
last_updated: 2026-03-25
version: 0.2
---

# Skill Library: Atipicial AppKit Adapters (Reown AppKit)

Purpose: teach agents and humans how to integrate `@atipicial/appkit-*-adapter` packages into applications using Reown AppKit, with the examples directory as the implementation source of truth.

## Canonical examples

Start with the runnable examples first:
- `examples/vite-react-atipicial/` — validated Atipicial-only example
- `examples/simple-app/` — validated multi-chain example (Atipicial + Stellar + AtipicialX)

These examples are the primary contract for this skill.

## Reading order

1. [Skill overview](./SKILL.md)
2. [Overview](./overview/WHAT_IS_APPKIT.md)
3. [Quickstart: create AppKit](./quickstarts/QS__create_appkit.md)
4. Quickstarts:
   - [`QS__vite-react__base.md`](./quickstarts/QS__vite-react__base.md)
   - [`QS__vite-react-atipicial.md`](./quickstarts/QS__vite-react-atipicial.md)

## Guides
- Directory: [`./guides/`](./guides/)
- Start here: [`GUIDE__adapter_selection.md`](./guides/GUIDE__adapter_selection.md)

## Reference
- Directory: [`./reference/`](./reference/)
- Atipicial: [`ADAPTER__atipicial.md`](./reference/ADAPTER__atipicial.md)
- AtipicialX: [`ADAPTER__atipicialx.md`](./reference/ADAPTER__atipicialx.md)
- Stellar: [`ADAPTER__stellar.md`](./reference/ADAPTER__stellar.md)
- Package/import rules: [`PACKAGES.md`](./reference/PACKAGES.md)

## Examples
- Directory: [`./examples/`](./examples/)
- Atipicial example: [`vite-react-atipicial/`](./examples/vite-react-atipicial/)
- Multi-chain example: [`simple-app/`](./examples/simple-app/)
- Validation history: [`VALIDATION_LOG.md`](./examples/VALIDATION_LOG.md)

## Checklists
- Directory: [`./checklists/`](./checklists/)
- Start here: [`CHK__new_integration.md`](./checklists/CHK__new_integration.md)

## Troubleshooting
- Directory: [`./troubleshooting/`](./troubleshooting/)
- Start here: [`TROUBLESHOOTING.md`](./troubleshooting/TROUBLESHOOTING.md)

## Tests
- Directory: [`./tests/`](./tests/)
- Start here: [`TESTPLAN__appkit-adapters.md`](./tests/TESTPLAN__appkit-adapters.md)

## Verification

Canonical verification commands:

```bash
cd examples/vite-react-atipicial && pnpm build
cd examples/simple-app && pnpm build
```
