'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSignOut() {
    setIsSubmitting(true)

    try {
      await fetch('/api/srsp/auth', { method: 'DELETE' })
      router.push('/srsp/login')
      router.refresh()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <button
      type="button"
      className="btn btn-outline-light btn-sm"
      onClick={handleSignOut}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Signing Out…' : 'Sign Out'}
    </button>
  )
}
