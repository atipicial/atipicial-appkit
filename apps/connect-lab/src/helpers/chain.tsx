import { arbitrum, base, mainnet, polygon, sepolia, solana, solanaDevnet } from '@reown/appkit/networks'
import { atipicialMainnetNetwork, atipicialTestnetNetwork } from '@atipicial/appkit-atipicial-adapter'
import { stellarMainnetNetwork, stellarTestnetNetwork } from '@atipicial/appkit-stellar-adapter'
import { atipicialXAntiMevMainnetNetwork, atipicialXAntiMevTestnetNetwork } from '@atipicial/appkit-atipicialx-adapter'
import type { AppKitNetwork, ChainNamespace } from '@reown/appkit/networks'
import type { ComponentType, SVGProps } from 'react'

import AtipicialIcon from '@/assets/icons/atipicial.svg?react'
import EthereumIcon from '@/assets/icons/ethereum.svg?react'
import ArbitrumIcon from '@/assets/icons/arbitrum.svg?react'
import BaseIcon from '@/assets/icons/base.svg?react'
import AtipicialxIcon from '@/assets/icons/atipicialx.svg?react'
import PolygonIcon from '@/assets/icons/polygon.svg?react'
import SolanaIcon from '@/assets/icons/solana.svg?react'
import StellarIcon from '@/assets/icons/stellar.svg?react'

export type TSupportedChain = 'atipicial' | 'ethereum' | 'arbitrum' | 'base' | 'polygon' | 'atipicialx' | 'solana' | 'stellar'

export class ChainHelper {
  static readonly chainInfos: Record<
    TSupportedChain,
    {
      name: string
      addressUrlTemplate: Record<string, string>
      color: string
      icon: ComponentType<SVGProps<SVGSVGElement>>
      namespace: ChainNamespace
      networks: Array<AppKitNetwork>
    }
  > = {
    atipicial: {
      name: 'Atipicial ',
      color: '#16a34a',
      icon: AtipicialIcon,
      // @ts-expect-error ChainNamespace does not include atipicial
      namespace: 'atipicial',
      networks: [atipicialMainnetNetwork, atipicialTestnetNetwork],
      addressUrlTemplate: {
        mainnet: 'https://dora.coz.io/address/atipicial/mainnet/{address}',
        testnet: 'https://dora.coz.io/address/atipicial/testnet/{address}',
      },
    },
    atipicialx: {
      name: 'Atipicial X',
      color: '#10b981',
      icon: AtipicialxIcon,
      namespace: 'eip155',
      networks: [atipicialXAntiMevMainnetNetwork, atipicialXAntiMevTestnetNetwork],
      addressUrlTemplate: {
        47_763: 'https://xexplorer.atipicial.org/address/{address}',
        12_227_332: 'https://xt4scan.ngd.network/address/{address}',
      },
    },
    ethereum: {
      name: 'Ethereum',
      color: '#627eea',
      icon: EthereumIcon,
      namespace: 'eip155',
      networks: [mainnet, sepolia],
      addressUrlTemplate: {
        1: 'https://eth.blockscout.com/address/{address}',
        11_155_111: 'https://eth-sepolia.blockscout.com/address/{address}',
      },
    },
    arbitrum: {
      name: 'Arbitrum',
      color: '#28a0f0',
      icon: ArbitrumIcon,
      namespace: 'eip155',
      networks: [arbitrum],
      addressUrlTemplate: {
        42_161: 'https://arbitrum.blockscout.com/address/{address}',
      },
    },
    base: {
      name: 'Base',
      color: '#1d4ed8',
      icon: BaseIcon,
      namespace: 'eip155',
      networks: [base],
      addressUrlTemplate: {
        8_453: 'https://base.blockscout.com/address/{address}',
      },
    },
    polygon: {
      name: 'Polygon',
      color: '#9333ea',
      icon: PolygonIcon,
      namespace: 'eip155',
      networks: [polygon],
      addressUrlTemplate: {
        137: 'https://polygon.blockscout.com/address/{address}',
      },
    },

    solana: {
      name: 'Solana',
      color: '#6366f1',
      icon: SolanaIcon,
      namespace: 'solana',
      networks: [solana, solanaDevnet],
      addressUrlTemplate: {
        '5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://solscan.io/account/{address}',
        EtWTRABZaYq6iMfeYKouRu166VU2xqa1: 'https://solscan.io/account/{address}?cluster=devnet',
      },
    },
    stellar: {
      name: 'Stellar',
      color: '#fcd34d',
      icon: StellarIcon,
      // @ts-expect-error ChainNamespace does not include stellar
      namespace: 'stellar',
      networks: [stellarMainnetNetwork, stellarTestnetNetwork],
      addressUrlTemplate: {
        mainnet: 'https://stellarchain.io/accounts/{address}',
        testnet: 'https://testnet.stellarchain.io/accounts/{address}',
      },
    },
  }

  static readonly supportedChains = Object.keys(ChainHelper.chainInfos) as Array<TSupportedChain>
}
