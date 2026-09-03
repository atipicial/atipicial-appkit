import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createAppKit } from '@reown/appkit/react'
import {
  AtipicialAdapter,
  AtipicialConstants,
  atipicialMainnetNetwork,
  atipicialTestnetNetwork,
} from '@atipicial/appkit-atipicial-adapter'
import './index.css'
import App from './App.tsx'

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID

if (!projectId) {
  console.warn('Missing VITE_REOWN_PROJECT_ID. Wallet connection will not work until it is configured.')
} else {
  createAppKit({
    projectId,
    adapters: [new AtipicialAdapter()],
    networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
    metadata: {
      name: 'Atipicial AppKit Example',
      description: 'Minimal Vite + React example using the Atipicial Atipicial AppKit adapter.',
      url: 'http://localhost:5173',
      icons: ['https://atipicial.io/favicon.ico'],
    },
    universalProviderConfigOverride: AtipicialConstants.OVERRIDES,
    features: {
      analytics: false,
      email: false,
      socials: false,
      swaps: false,
      onramp: false,
      pay: false,
      send: false,
      receive: false,
    },
    enableCoinbase: false,
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
