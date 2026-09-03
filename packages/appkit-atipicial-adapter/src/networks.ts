import { type AppKitNetwork } from "@reown/appkit/networks";
import { AtipicialConstants } from "./constants.js";

export const atipicialMainnetNetwork: AppKitNetwork = {
  id: "mainnet",

  // @ts-expect-error AppKit does not atipicial namespace included in ChainNamespace
  caipNetworkId: "atipicial:mainnet",

  // @ts-expect-error AppKit does not atipicial namespace included in ChainNamespace
  chainNamespace: "atipicial",

  nativeCurrency: AtipicialConstants.GAS_TOKEN,

  rpcUrls: {
    default: { http: ["https://seed1.atipicial.com:10332"] },
  },

  name: "Atipicial Mainnet",
};

export const atipicialTestnetNetwork: AppKitNetwork = {
  id: "testnet",

  // @ts-expect-error AppKit does not atipicial namespace included in ChainNamespace
  caipNetworkId: "atipicial:testnet",

  // @ts-expect-error AppKit does not atipicial namespace included in ChainNamespace
  chainNamespace: "atipicial",

  nativeCurrency: AtipicialConstants.GAS_TOKEN,

  rpcUrls: {
    default: { http: ["https://seed1.atipicial.com:20332"] },
  },

  name: "Atipicial Testnet",

  testnet: true,
};
