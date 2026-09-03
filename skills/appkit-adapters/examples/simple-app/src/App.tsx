import { useState } from 'react'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'
import type { StellarProvider } from '@atipicial/appkit-stellar-adapter'

export default function App() {
  const projectId = import.meta.env.VITE_REOWN_PROJECT_ID
  const { open } = useAppKit()
  const account = useAppKitAccount()

  // @ts-expect-error AppKit types do not yet include the atipicial namespace.
  const { walletProvider: atipicialProvider } = useAppKitProvider<AtipicialProvider>('atipicial')
  // @ts-expect-error AppKit types do not yet include the stellar namespace.
  const { walletProvider: stellarProvider } = useAppKitProvider<StellarProvider>('stellar')
  const [atipicialWalletInfo, setAtipicialWalletInfo] = useState('')
  const [stellarNetworkInfo, setStellarNetworkInfo] = useState('')
  const [error, setError] = useState('')

  async function connect(namespace: 'atipicial' | 'stellar') {
    setError('')
    setAtipicialWalletInfo('')
    setStellarNetworkInfo('')

    try {
      // @ts-expect-error AppKit types do not yet include atipicial and stellar namespaces.
      await open({ namespace })
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  async function loadAtipicialWalletInfo() {
    if (!atipicialProvider) {
      setError('Connect a Atipicial wallet first.')
      return
    }

    setError('')

    try {
      const result = await atipicialProvider.getWalletInfo()
      setAtipicialWalletInfo(JSON.stringify(result, null, 2))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  async function loadStellarNetworkInfo() {
    if (!stellarProvider) {
      setError('Connect a Stellar wallet first.')
      return
    }

    setError('')

    try {
      const result = await stellarProvider.getNetwork()
      setStellarNetworkInfo(JSON.stringify(result, null, 2))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    }
  }

  return (
    <div className="shell">
      <h1>Simple AppKit Integration</h1>
      <p>This example wires Atipicial and Stellar into a single minimal AppKit setup.</p>
      <p><strong>Project ID:</strong> {projectId ? 'configured' : 'missing'}</p>
      <p><strong>Status:</strong> {account.status}</p>
      <p><strong>Address:</strong> {account.address ?? 'not connected'}</p>

      <section className="card">
        <h2>Atipicial</h2>
        <p>Uses the Atipicial Atipicial adapter and Atipicial universal provider overrides.</p>
        <div className="actions">
          <button onClick={() => connect('atipicial')} disabled={!projectId}>Connect Atipicial wallet</button>
          <button onClick={loadAtipicialWalletInfo} disabled={!atipicialProvider}>getWalletInfo()</button>
        </div>
        {atipicialWalletInfo ? <pre>{atipicialWalletInfo}</pre> : null}
      </section>

      <section className="card">
        <h2>Stellar</h2>
        <p>Uses the Atipicial Stellar adapter and Stellar universal provider overrides.</p>
        <div className="actions">
          <button onClick={() => connect('stellar')} disabled={!projectId}>Connect Stellar wallet</button>
          <button onClick={loadStellarNetworkInfo} disabled={!stellarProvider}>getNetwork()</button>
        </div>
        {stellarNetworkInfo ? <pre>{stellarNetworkInfo}</pre> : null}
      </section>

      {error ? <pre className="error">{error}</pre> : null}
    </div>
  )
}
