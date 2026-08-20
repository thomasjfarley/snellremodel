'use client'

import { useEffect, useState } from 'react'

const VAPID_PUBLIC_KEY = 'BC6HVYbO9t2_nCnPwt_BCogNul4UO_FzEkUNQ_s8lvrNmYQiiHnYV4SKwf39DuH3B3VD8xLUjAyacUo6jTqep7c'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)))
}

type PushStatus = 'loading' | 'unsupported' | 'subscribed' | 'unsubscribed' | 'working'

export default function PushNotificationButton() {
  const [status, setStatus] = useState<PushStatus>('loading')

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      setStatus('unsupported')
      return
    }

    navigator.serviceWorker.register('/sw.js').then((reg) => {
      reg.pushManager.getSubscription().then((sub) => {
        setStatus(sub ? 'subscribed' : 'unsubscribed')
      })
    }).catch(() => setStatus('unsupported'))
  }, [])

  async function subscribe() {
    setStatus('working')
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as BufferSource,
      })

      const json = sub.toJSON()
      await fetch('/api/srsp/push', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(json),
      })

      setStatus('subscribed')
    } catch (err) {
      console.error('[push] Subscribe failed:', err)
      setStatus('unsubscribed')
    }
  }

  async function unsubscribe() {
    setStatus('working')
    try {
      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.getSubscription()
      if (sub) {
        await fetch('/api/srsp/push', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        })
        await sub.unsubscribe()
      }
      setStatus('unsubscribed')
    } catch (err) {
      console.error('[push] Unsubscribe failed:', err)
      setStatus('subscribed')
    }
  }

  if (status === 'loading' || status === 'unsupported') return null

  if (status === 'subscribed') {
    return (
      <button
        type="button"
        className="btn btn-outline-light btn-sm"
        onClick={unsubscribe}
        title="Notifications on — tap to turn off"
      >
        🔔 Notifications On
      </button>
    )
  }

  return (
    <button
      type="button"
      className="btn btn-outline-warning btn-sm"
      onClick={subscribe}
      disabled={status === 'working'}
    >
      {status === 'working' ? (
        <><span className="spinner-border spinner-border-sm me-1" aria-hidden="true" />Enabling…</>
      ) : (
        '🔔 Enable Notifications'
      )}
    </button>
  )
}
