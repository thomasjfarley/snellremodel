import { z } from 'zod'

export const bookingSchema = z.object({
  service: z.enum(['painting', 'kitchen-remodel', 'drywall', 'other'] as const),
  date: z.string().min(1, 'Please select a date'),
  time: z.string().min(1, 'Please select a time slot'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  notes: z.string().optional(),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service: z.enum(['painting', 'kitchen-remodel', 'drywall', 'other', '']).optional(),
  message: z.string().min(10, 'Please include a message (minimum 10 characters)'),
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type ContactFormData = z.infer<typeof contactSchema>
