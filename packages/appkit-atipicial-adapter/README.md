# AppKit Atipicial Adapter

An AppKit adapter for integrating Atipicial blockchain support into your dApps.

## Live Demo

You can access the deployed project here: [Connect Lab on GitHub Pages](https://atipicial.github.io/appkit-adapters/)

## Overview

This adapter enables seamless integration of Atipicial blockchain functionality with [Reown AppKit](https://docs.reown.com/appkit) (formerly WalletConnect AppKit), allowing developers to build Atipicial-enabled dApps with WalletConnect support.

> **💡 Need a working example?** Check out the [Connect Lab](../../apps/connect-lab/) project for a complete implementation demonstrating how to use this adapter in a real-world application.

> **📚 Learn more about AppKit:** Visit the official [Reown AppKit repository](https://github.com/reown-com/appkit) for comprehensive documentation, examples, and the latest updates on AppKit features.

## Installation

```bash
npm install @atipicial/appkit-atipicial-adapter
```

## Usage

### Basic Setup

> **⚠️ IMPORTANT:** You **must** include the `universalProviderConfigOverride` option with `AtipicialConstants.OVERRIDES`. This is required because AppKit does not include Atipicial methods in its default configuration.

```typescript
import { AtipicialAdapter, atipicialMainnetNetwork, atipicialTestnetNetwork, AtipicialConstants } from '@atipicial/appkit-atipicial-adapter';
import { createAppKit } from '@reown/appkit';

// Create AppKit instance with Atipicial support
createAppKit({
  projectId: 'YOUR_PROJECT_ID', // Get from https://cloud.reown.com
  adapters: [new AtipicialAdapter()],
  networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
  metadata: {
    name: 'My Atipicial dApp',
    description: 'My Atipicial dApp description',
    url: 'https://myapp.com',
    icons: ['https://myapp.com/icon.png']
  },
  // REQUIRED: Register Atipicial methods with WalletConnect
  universalProviderConfigOverride: AtipicialConstants.OVERRIDES
});
```

### React Example with AppKitProvider

> **⚠️ IMPORTANT:** Don't forget to include `universalProviderConfigOverride={AtipicialConstants.OVERRIDES}` in your AppKitProvider configuration. This is essential for Atipicial functionality.

```tsx
import React from 'react';
import { AppKitProvider } from "@reown/appkit/react";
import { AtipicialAdapter, atipicialMainnetNetwork, atipicialTestnetNetwork, AtipicialConstants } from '@atipicial/appkit-atipicial-adapter';

function App() {
  return (
    <AppKitProvider
      adapters={[new AtipicialAdapter()]}
      networks={[atipicialMainnetNetwork, atipicialTestnetNetwork]}
      projectId='YOUR_PROJECT_ID'
      metadata={{
        name: 'My Atipicial dApp',
        description: 'My Atipicial dApp description',
        url: 'https://myapp.com',
        icons: ['https://myapp.com/icon.png']
      }}
      universalProviderConfigOverride={AtipicialConstants.OVERRIDES}
    >
      <YourApp />
    </AppKitProvider>
  );
}

export default App;
```

### Available Networks

The adapter exports pre-configured Atipicial networks:

- `atipicialMainnetNetwork` - Atipicial Mainnet
- `atipicialTestnetNetwork` - Atipicial Testnet

### Accessing the Atipicial Provider in React

To interact with the Atipicial blockchain in your React components, you can access the provider using the `useAppKitProvider` hook:

```tsx
import { useAppKitProvider } from "@reown/appkit/react";
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter';

function MyComponent() {
  // @ts-expect-error ChainNamespace does not include atipicial
  const { walletProvider } = useAppKitProvider<AtipicialProvider>("atipicial");

  const handleInvoke = async () => {
    if (!walletProvider) {
      console.error("Provider not available");
      return;
    }

    try {
      // Use the provider to interact with Atipicial
      const result = await walletProvider.invokeFunction({
        scriptHash: "0x...",
        operation: "methodName",
        args: []
      });

      console.log("Transaction result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button onClick={handleInvoke}>
      Invoke Contract
    </button>
  );
}
```

## TypeScript Considerations

### Atipicial Namespace Support

The Reown/AppKit types currently do not include `atipicial` as a recognized namespace in their `ChainNamespace` type. This means TypeScript will show type errors when using Atipicial-specific configurations.

To work around this limitation, you need to use the `@ts-expect-error` directive above lines that reference the `atipicial` namespace:

```tsx
import {  useAppKit,  useDisconnect } from "@reown/appkit/react";
import { Fragment } from "react"

function ConnectButton() {
  const appKit = useAppKit();
  const { disconnect } = useDisconnect();

  async function handleConnect() {
    //@ts-expect-error ChainNamespace does not include atipicial
    await appKit.open({ namespace: "atipicial" });
  }

  async function handleDisconnect() {
    //@ts-expect-error ChainNamespace does not include atipicial
    await disconnect({ namespace: : "atipicial" });
  };

  return (
    <Fragment>
      <button onClick={handleConnect}>Connect</button>
      <button onClick={handleDisconnect}>Disconnect</button>
     </Fragment>
  )
}
```

This is expected behavior and does not affect runtime functionality. The `@ts-expect-error` directive suppresses TypeScript errors while maintaining full Atipicial functionality. The pre-configured networks exported by this package (`atipicialMainnetNetwork` and `atipicialTestnetNetwork`) already include these directives, so you typically won't need to add them when using the exported networks.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created by [Raul Duarte Pereira](https://github.com/raulduartep)
