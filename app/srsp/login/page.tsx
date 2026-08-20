'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function PortalLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/api/srsp/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        throw new Error('Invalid password')
      }

      router.push('/srsp')
      router.refresh()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="bg-navy min-vh-100 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-4">
                  <p className="text-accent fw-semibold text-uppercase ls-1 small mb-2">Portal</p>
                  <h1 className="h3 fw-bold text-navy mb-2">Snel Remodeling Services</h1>
                  <p className="text-muted mb-0">Sign in to manage the contact queue.</p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="portal-password" className="form-label fw-medium">
                      Password
                    </label>
                    <input
                      id="portal-password"
                      type="password"
                      className={`form-control form-control-lg${status === 'error' ? ' is-invalid' : ''}`}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />
                    {status === 'error' && (
                      <div className="invalid-feedback">Invalid password</div>
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
                        Signing In…
                      </>
                    ) : (
                      'Sign In'
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
