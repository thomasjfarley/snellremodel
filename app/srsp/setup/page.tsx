'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SetupPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error' | 'already-done'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (password !== confirm) {
      setErrorMsg('Passwords do not match')
      setStatus('error')
      return
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters')
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/srsp/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (response.status === 409) {
        setStatus('already-done')
        return
      }

      if (!response.ok) {
        const data = await response.json() as { error?: string }
        throw new Error(data.error ?? 'Setup failed')
      }

      router.push('/srsp')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Setup failed')
      setStatus('error')
    }
  }

  if (status === 'already-done') {
    return (
      <section className="bg-navy min-vh-100 d-flex align-items-center py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
              <div className="card border-0 shadow-lg">
                <div className="card-body p-4 p-md-5 text-center">
                  <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Portal</p>
                  <h1 className="h3 fw-bold text-navy mb-3">Already Configured</h1>
                  <p className="text-muted mb-4">The portal password has already been set. Use the login page to sign in.</p>
                  <a href="/srsp/login" className="btn btn-accent btn-lg w-100">Go to Login</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-navy min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">First-Time Setup</p>
                  <h1 className="h3 fw-bold text-navy mb-2">Create Portal Password</h1>
                  <p className="text-muted mb-0">This screen only appears once. Choose a strong password.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="setup-password" className="form-label fw-medium">Password</label>
                    <input
                      id="setup-password"
                      type="password"
                      className={`form-control form-control-lg${status === 'error' ? ' is-invalid' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="setup-confirm" className="form-label fw-medium">Confirm Password</label>
                    <input
                      id="setup-confirm"
                      type="password"
                      className={`form-control form-control-lg${status === 'error' ? ' is-invalid' : ''}`}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    {status === 'error' && (
                      <div className="invalid-feedback">{errorMsg}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-accent btn-lg w-100"
                    disabled={status === 'submitting'}
                  >
                    {status === 'submitting' ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                        Setting Up…
                      </>
                    ) : (
                      'Create Password'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
