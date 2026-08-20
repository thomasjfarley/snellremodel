'use client'

import { type FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SettingsPage() {
  const router = useRouter()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (newPassword !== confirm) {
      setErrorMsg('New passwords do not match')
      setStatus('error')
      return
    }

    if (newPassword.length < 8) {
      setErrorMsg('New password must be at least 8 characters')
      setStatus('error')
      return
    }

    setStatus('submitting')

    try {
      const response = await fetch('/api/srsp/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!response.ok) {
        const data = await response.json() as { error?: string }
        throw new Error(data.error ?? 'Failed to change password')
      }

      setStatus('success')
      setCurrentPassword('')
      setNewPassword('')
      setConfirm('')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to change password')
      setStatus('error')
    }
  }

  return (
    <section className="bg-light-warm min-vh-100 pb-5">
      <header className="bg-navy text-white py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center gap-3">
          <div>
            <p className="text-accent fw-semibold text-uppercase ls-1 small mb-1">Snel Portal</p>
            <h1 className="h4 fw-bold mb-0 text-accent">Settings</h1>
          </div>
          <a href="/srsp" className="btn btn-outline-light btn-sm">← Back to Portal</a>
        </div>
      </header>

      <div className="container py-4 py-lg-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4 p-md-5">
                <h2 className="h4 fw-bold text-navy mb-1">Change Password</h2>
                <p className="text-muted mb-4">Update your portal login password.</p>

                {status === 'success' && (
                  <div className="alert alert-success" role="alert">
                    Password changed successfully!
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-3">
                    <label htmlFor="current-password" className="form-label fw-medium">Current Password</label>
                    <input
                      id="current-password"
                      type="password"
                      className={`form-control${status === 'error' && errorMsg.includes('Current') ? ' is-invalid' : ''}`}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="new-password" className="form-label fw-medium">New Password</label>
                    <input
                      id="new-password"
                      type="password"
                      className={`form-control${status === 'error' ? ' is-invalid' : ''}`}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setStatus('idle') }}
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="confirm-password" className="form-label fw-medium">Confirm New Password</label>
                    <input
                      id="confirm-password"
                      type="password"
                      className={`form-control${status === 'error' ? ' is-invalid' : ''}`}
                      value={confirm}
                      onChange={(e) => { setConfirm(e.target.value); setStatus('idle') }}
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
                        Updating…
                      </>
                    ) : (
                      'Update Password'
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
