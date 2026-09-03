import { useMemo, useState } from 'react'
import { useAppKit, useAppKitAccount, useAppKitProvider } from '@reown/appkit/react'
import type { AtipicialProvider } from '@atipicial/appkit-atipicial-adapter'
import './App.css'

const gasTokenHash = '0xd2a4cff31913016155e38e474a2c06d08be276cf'

function App() {
  const projectId = import.meta.env.VITE_REOWN_PROJECT_ID
  const { open } = useAppKit()
  const account = useAppKitAccount()
  // @ts-expect-error AppKit types do not yet include the atipicial namespace.
  const { walletProvider } = useAppKitProvider<AtipicialProvider>('atipicial')

  const [walletInfoResult, setWalletInfoResult] = useState<string>('')
  const [testInvokeResult, setTestInvokeResult] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loadingAction, setLoadingAction] = useState<string>('')

  const connectionSummary = useMemo(() => {
    if (!account.caipAddress) return 'Not connected'
    return `${account.caipAddress}${account.address ? ` (${account.address})` : ''}`
  }, [account.address, account.caipAddress])

  async function connectAtipicial() {
    setError('')
    // @ts-expect-error AppKit types do not yet include the atipicial namespace.
    await open({ namespace: 'atipicial' })
  }

  async function readWalletInfo() {
    if (!walletProvider) {
      setError('Atipicial wallet provider is not available. Connect a wallet first.')
      return
    }

    setError('')
    setLoadingAction('wallet-info')

    try {
      const result = await walletProvider.getWalletInfo()
      setWalletInfoResult(JSON.stringify(result, null, 2))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setLoadingAction('')
    }
  }

  async function runTestInvoke() {
    if (!walletProvider || !account.address) {
      setError('Connect a Atipicial wallet before calling testInvoke.')
      return
    }

    setError('')
    setLoadingAction('test-invoke')

    try {
      const result = await walletProvider.testInvoke({
        invocations: [
          {
            scriptHash: gasTokenHash,
            operation: 'balanceOf',
            args: [
              {
                type: 'Hash160',
                value: account.address,
              },
            ],
          },
        ],
        signers: [{ scopes: 1 }],
      })

      setTestInvokeResult(JSON.stringify(result, null, 2))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setLoadingAction('')
    }
  }

  return (
    <main className="app-shell">
      <section className="hero card">
        <p className="eyebrow">Atipicial AppKit Adapters</p>
        <h1>Atipicial adapter example</h1>
        <p className="lede">
          This example actually initializes Reown AppKit with <code>AtipicialAdapter</code>, opens the
          Atipicial wallet modal, and calls real provider methods from the connected wallet session.
        </p>
      </section>

      <section className="card stack">
        <h2>1. Configure AppKit</h2>
        <p>
          Set <code>VITE_REOWN_PROJECT_ID</code> in a local <code>.env</code> file before running the
          app.
        </p>
        <pre>{projectId ? 'VITE_REOWN_PROJECT_ID is configured.' : 'Missing VITE_REOWN_PROJECT_ID'}</pre>
      </section>

      <section className="card stack">
        <h2>2. Connect a Atipicial wallet</h2>
        <p>Status: {account.status}</p>
        <p>Connection: {connectionSummary}</p>
        <div className="actions">
          <button type="button" onClick={connectAtipicial} disabled={!projectId}>
            Open Atipicial wallet modal
          </button>
        </div>
      </section>

      <section className="card stack">
        <h2>3. Use the adapter-backed provider</h2>
        <p>
          These buttons call methods exposed by the Atipicial provider returned from{' '}
          <code>useAppKitProvider('atipicial')</code>.
        </p>
        <div className="actions">
          <button
            type="button"
            onClick={readWalletInfo}
            disabled={!walletProvider || loadingAction !== ''}
          >
            {loadingAction === 'wallet-info' ? 'Loading wallet info...' : 'getWalletInfo()'}
          </button>
          <button
            type="button"
            onClick={runTestInvoke}
            disabled={!walletProvider || !account.address || loadingAction !== ''}
          >
            {loadingAction === 'test-invoke' ? 'Running testInvoke...' : 'testInvoke(balanceOf)'}
          </button>
        </div>

        {error ? (
          <div className="result error">
            <h3>Error</h3>
            <pre>{error}</pre>
          </div>
        ) : null}

        {walletInfoResult ? (
          <div className="result">
            <h3>Wallet info</h3>
            <pre>{walletInfoResult}</pre>
          </div>
        ) : null}

        {testInvokeResult ? (
          <div className="result">
            <h3>testInvoke result</h3>
            <pre>{testInvokeResult}</pre>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default App
