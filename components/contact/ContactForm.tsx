'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactSchema, type ContactFormData } from '@/lib/schemas'

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data: ContactFormData) {
    setStatus('submitting')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="alert alert-success d-flex align-items-center gap-3 p-4" role="alert">
        <i className="bi bi-check-circle-fill fs-4 flex-shrink-0" />
        <div>
          <p className="fw-bold mb-1">Message sent!</p>
          <p className="mb-0 small">We will be in touch with you shortly.</p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="contact-name" className="form-label fw-medium">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            className={`form-control${errors.name ? ' is-invalid' : ''}`}
            placeholder="Your name"
            {...register('name')}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        <div className="col-sm-6">
          <label htmlFor="contact-email" className="form-label fw-medium">
            Email <span className="text-danger">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            className={`form-control${errors.email ? ' is-invalid' : ''}`}
            placeholder="your@email.com"
            {...register('email')}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="col-sm-6">
          <label htmlFor="contact-phone" className="form-label fw-medium">Phone</label>
          <input
            id="contact-phone"
            type="tel"
            className="form-control"
            placeholder="(425) 524-1379"
            {...register('phone')}
          />
        </div>

        <div className="col-sm-6">
          <label htmlFor="contact-service" className="form-label fw-medium">Service Interest</label>
          <select id="contact-service" className="form-select" {...register('service')}>
            <option value="">Select a service…</option>
            <option value="remodel">Remodel</option>
            <option value="restore">Restore</option>
            <option value="demo">Demo</option>
            <option value="other">Other / Not Sure</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="contact-message" className="form-label fw-medium">
            Message <span className="text-danger">*</span>
          </label>
          <textarea
            id="contact-message"
            rows={5}
            className={`form-control${errors.message ? ' is-invalid' : ''}`}
            placeholder="Tell us about your project…"
            {...register('message')}
          />
          {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
        </div>

        {status === 'error' && (
          <div className="col-12">
            <div className="alert alert-danger py-2 mb-0" role="alert">
              <i className="bi bi-exclamation-triangle me-2" />
              Something went wrong. Please try again or call us directly.
            </div>
          </div>
        )}

        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary btn-lg px-5"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <i className="bi bi-send me-2" />Send Message
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
