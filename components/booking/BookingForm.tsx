'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bookingSchema, type BookingFormData } from '@/lib/schemas'

type Step = 1 | 2 | 3 | 4

const services = [
  { value: 'painting',        label: 'Painting',        icon: 'bi-brush' },
  { value: 'kitchen-remodel', label: 'Kitchen Remodel', icon: 'bi-house-heart' },
  { value: 'drywall',         label: 'Drywall',         icon: 'bi-grid-3x3' },
  { value: 'other',           label: 'Other / Not Sure',icon: 'bi-question-circle' },
] as const

const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM']

const today = new Date().toISOString().split('T')[0]

const stepLabels = ['Service', 'Date & Time', 'Your Info', 'Confirm']

export default function BookingForm() {
  const [step, setStep] = useState<Step>(1)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: 'onBlur',
  })

  const values = watch()

  async function nextStep(fieldsToValidate: (keyof BookingFormData)[]) {
    const valid = await trigger(fieldsToValidate)
    if (valid) setStep((s) => (s + 1) as Step)
  }

  async function onSubmit(data: BookingFormData) {
    setStatus('submitting')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
    } catch {
      setStatus('error')
      setStep(4)
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div className="service-icon bg-accent bg-opacity-10 mx-auto mb-4" style={{ width: 72, height: 72 }}>
          <i className="bi bi-calendar-check text-accent" style={{ fontSize: '2rem' }} />
        </div>
        <h2 className="h3 fw-bold text-navy mb-3">You are booked!</h2>
        <p className="text-muted mb-2">
          We have added your walkthrough to our calendar and sent a confirmation to{' '}
          <strong>{values.email}</strong>.
        </p>
        <p className="text-muted mb-4">
          <strong>{values.date}</strong> at <strong>{values.time}</strong> — see you then!
        </p>
        <p className="text-muted small">
          Questions? Call us at{' '}
          <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}>{process.env.NEXT_PUBLIC_PHONE ?? '(555) 555-5555'}</a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Progress */}
      <div className="mb-5">
        <div className="d-flex justify-content-between mb-2">
          {stepLabels.map((label, i) => (
            <div
              key={label}
              className={`text-center small flex-fill ${i + 1 <= step ? 'text-accent fw-semibold' : 'text-muted'}`}
            >
              <div
                className={`rounded-circle d-inline-flex align-items-center justify-content-center mb-1 ${
                  i + 1 < step
                    ? 'bg-accent text-white'
                    : i + 1 === step
                    ? 'border border-2 border-accent text-accent'
                    : 'bg-light text-muted'
                }`}
                style={{ width: 28, height: 28, fontSize: '0.8rem', fontWeight: 600 }}
              >
                {i + 1 < step ? <i className="bi bi-check" /> : i + 1}
              </div>
              <div className="d-none d-sm-block">{label}</div>
            </div>
          ))}
        </div>
        <div className="progress" style={{ height: 4 }}>
          <div
            className="progress-bar bg-accent"
            style={{ width: `${((step - 1) / (stepLabels.length - 1)) * 100}%`, transition: 'width 0.3s ease' }}
          />
        </div>
      </div>

      {/* Step 1: Service */}
      {step === 1 && (
        <div>
          <h2 className="h5 fw-bold text-navy mb-1">What service do you need?</h2>
          <p className="text-muted small mb-4">Select the type of project for your walkthrough.</p>
          <div className="row g-3 mb-4">
            {services.map((svc) => (
              <div key={svc.value} className="col-6">
                <label className="w-100">
                  <input
                    type="radio"
                    className="btn-check"
                    value={svc.value}
                    {...register('service')}
                    id={`svc-${svc.value}`}
                  />
                  <span
                    className={`btn btn-outline-primary w-100 py-3 d-flex flex-column align-items-center gap-2 ${
                      values.service === svc.value ? 'active' : ''
                    }`}
                    style={{ minHeight: 90 }}
                  >
                    <i className={`bi ${svc.icon} fs-3`} />
                    <span className="small fw-medium">{svc.label}</span>
                  </span>
                </label>
              </div>
            ))}
          </div>
          {errors.service && (
            <p className="text-danger small mb-3">{errors.service.message}</p>
          )}
          <button
            type="button"
            className="btn btn-primary btn-lg w-100"
            onClick={() => nextStep(['service'])}
          >
            Continue <i className="bi bi-arrow-right ms-2" />
          </button>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div>
          <h2 className="h5 fw-bold text-navy mb-1">When works for you?</h2>
          <p className="text-muted small mb-4">Pick a date and preferred time for your walkthrough.</p>

          <div className="mb-4">
            <label htmlFor="booking-date" className="form-label fw-medium">
              Date <span className="text-danger">*</span>
            </label>
            <input
              id="booking-date"
              type="date"
              min={today}
              className={`form-control form-control-lg${errors.date ? ' is-invalid' : ''}`}
              {...register('date')}
            />
            {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
          </div>

          <div className="mb-4">
            <p className="form-label fw-medium mb-3">
              Time <span className="text-danger">*</span>
            </p>
            <div className="d-flex flex-wrap gap-2">
              {timeSlots.map((slot) => (
                <label key={slot}>
                  <input
                    type="radio"
                    className="btn-check"
                    value={slot}
                    id={`slot-${slot}`}
                    {...register('time')}
                  />
                  <span
                    className={`btn btn-outline-secondary btn-sm px-3 ${
                      values.time === slot ? 'active btn-primary' : ''
                    }`}
                  >
                    {slot}
                  </span>
                </label>
              ))}
            </div>
            {errors.time && (
              <p className="text-danger small mt-2">{errors.time.message}</p>
            )}
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={() => setStep(1)}
            >
              <i className="bi bi-arrow-left me-2" />Back
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg flex-fill"
              onClick={() => nextStep(['date', 'time'])}
            >
              Continue <i className="bi bi-arrow-right ms-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Contact info */}
      {step === 3 && (
        <div>
          <h2 className="h5 fw-bold text-navy mb-1">Your contact information</h2>
          <p className="text-muted small mb-4">We will send you a confirmation and reach out if anything changes.</p>

          <div className="row g-3 mb-3">
            <div className="col-12">
              <label htmlFor="booking-name" className="form-label fw-medium">
                Name <span className="text-danger">*</span>
              </label>
              <input
                id="booking-name"
                type="text"
                className={`form-control${errors.name ? ' is-invalid' : ''}`}
                placeholder="Your full name"
                {...register('name')}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="col-sm-6">
              <label htmlFor="booking-email" className="form-label fw-medium">
                Email <span className="text-danger">*</span>
              </label>
              <input
                id="booking-email"
                type="email"
                className={`form-control${errors.email ? ' is-invalid' : ''}`}
                placeholder="your@email.com"
                {...register('email')}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="col-sm-6">
              <label htmlFor="booking-phone" className="form-label fw-medium">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                id="booking-phone"
                type="tel"
                className={`form-control${errors.phone ? ' is-invalid' : ''}`}
                placeholder="(555) 555-5555"
                {...register('phone')}
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>

            <div className="col-12">
              <label htmlFor="booking-notes" className="form-label fw-medium">
                Project Notes <span className="text-muted fw-normal">(optional)</span>
              </label>
              <textarea
                id="booking-notes"
                rows={3}
                className="form-control"
                placeholder="Anything helpful — square footage, specific rooms, timeline, etc."
                {...register('notes')}
              />
            </div>
          </div>

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={() => setStep(2)}
            >
              <i className="bi bi-arrow-left me-2" />Back
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg flex-fill"
              onClick={() => nextStep(['name', 'email', 'phone'])}
            >
              Review Booking <i className="bi bi-arrow-right ms-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Confirm */}
      {step === 4 && (
        <div>
          <h2 className="h5 fw-bold text-navy mb-1">Review your booking</h2>
          <p className="text-muted small mb-4">Everything look right? Submit to confirm your walkthrough.</p>

          <div className="card border-0 bg-light-warm mb-4">
            <div className="card-body p-4">
              <dl className="row mb-0">
                <dt className="col-sm-4 text-muted small fw-medium">Service</dt>
                <dd className="col-sm-8 fw-semibold text-navy text-capitalize mb-2">
                  {values.service?.replace('-', ' ')}
                </dd>
                <dt className="col-sm-4 text-muted small fw-medium">Date</dt>
                <dd className="col-sm-8 fw-semibold text-navy mb-2">{values.date}</dd>
                <dt className="col-sm-4 text-muted small fw-medium">Time</dt>
                <dd className="col-sm-8 fw-semibold text-navy mb-2">{values.time}</dd>
                <dt className="col-sm-4 text-muted small fw-medium">Name</dt>
                <dd className="col-sm-8 fw-semibold text-navy mb-2">{values.name}</dd>
                <dt className="col-sm-4 text-muted small fw-medium">Email</dt>
                <dd className="col-sm-8 fw-semibold text-navy mb-2">{values.email}</dd>
                <dt className="col-sm-4 text-muted small fw-medium">Phone</dt>
                <dd className="col-sm-8 fw-semibold text-navy mb-2">{values.phone}</dd>
                {values.notes && (
                  <>
                    <dt className="col-sm-4 text-muted small fw-medium">Notes</dt>
                    <dd className="col-sm-8 text-muted mb-0">{values.notes}</dd>
                  </>
                )}
              </dl>
            </div>
          </div>

          {status === 'error' && (
            <div className="alert alert-danger py-2 mb-3" role="alert">
              <i className="bi bi-exclamation-triangle me-2" />
              Something went wrong. Please try again or call us directly.
            </div>
          )}

          <div className="d-flex gap-3">
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg"
              onClick={() => setStep(3)}
              disabled={status === 'submitting'}
            >
              <i className="bi bi-arrow-left me-2" />Back
            </button>
            <button
              type="submit"
              className="btn btn-accent btn-lg flex-fill"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                  Booking…
                </>
              ) : (
                <>
                  <i className="bi bi-calendar-check me-2" />Confirm Walkthrough
                </>
              )}
            </button>
          </div>

          <p className="text-muted small text-center mt-3 mb-0">
            Free and no-obligation. We will confirm via email.
          </p>
        </div>
      )}
    </form>
  )
}
