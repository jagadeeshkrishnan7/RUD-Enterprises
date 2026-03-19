import { useEffect, useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import Modal from './Modal'
import Footer from './Footer'

const initialForm = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  phone: '',
  message: '',
}

function ContactModal({ isOpen, onClose, contact, footer, onAboutOpen }) {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: 'idle', text: '' })

  useEffect(() => {
    if (status.type === 'success' || status.type === 'error') {
      const timer = window.setTimeout(() => {
        setStatus({ type: 'idle', text: '' })
      }, 3000)

      return () => window.clearTimeout(timer)
    }

    return undefined
  }, [status])

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, [])

  const validate = () => {
    const nextErrors = {}

    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.'
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.'
    if (!formData.company.trim()) nextErrors.company = 'Company is required.'
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      nextErrors.email = 'Valid email address is required.'
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.'
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      nextErrors.message = 'Please enter at least 10 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', text: 'Failed to send message' })
      return
    }

    try {
      setStatus({ type: 'loading', text: 'Sending...' })

      await emailjs.send(
        serviceId,
        templateId,
        {
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: contact.recipientEmail,
        },
        {
          publicKey,
        },
      )

      setStatus({ type: 'success', text: 'Mail sent successfully' })
      setFormData(initialForm)
      setErrors({})
    } catch {
      setStatus({ type: 'error', text: 'Failed to send message' })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Contact Us" maxWidth="max-w-4xl">
      <div className="space-y-8 px-6 py-6 sm:px-8">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">{contact.header}</h3>
          <p className="mt-3 text-slate-600">{contact.description}</p>
        </div>

        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.firstName ? <p className="mt-1 text-xs text-rose-600">{errors.firstName}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.lastName ? <p className="mt-1 text-xs text-rose-600">{errors.lastName}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="company">
              Company
            </label>
            <input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.company ? <p className="mt-1 text-xs text-rose-600">{errors.company}</p> : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.email ? <p className="mt-1 text-xs text-rose-600">{errors.email}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="phone">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.phone ? <p className="mt-1 text-xs text-rose-600">{errors.phone}</p> : null}
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-brand"
            />
            {errors.message ? <p className="mt-1 text-xs text-rose-600">{errors.message}</p> : null}
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
            <button
              type="submit"
              className="rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Send Message
            </button>
            {status.type !== 'idle' ? (
              <p
                className={`text-sm font-semibold ${
                  status.type === 'error' ? 'text-rose-600' : 'text-emerald-700'
                }`}
              >
                {status.text}
              </p>
            ) : null}
          </div>
        </form>
      </div>

      <Footer footer={footer} onAboutOpen={onAboutOpen} compact />
    </Modal>
  )
}

export default ContactModal
