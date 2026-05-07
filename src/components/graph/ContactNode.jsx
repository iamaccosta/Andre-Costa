'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { heroIcons } from '@/assets'

const BLOB_KEYFRAMES = [
  '60% 40% 30% 70% / 60% 30% 70% 40%',
  '30% 60% 70% 40% / 50% 60% 30% 60%',
  '50% 60% 30% 70% / 40% 30% 60% 70%',
  '30% 40% 60% 50% / 60% 70% 30% 40%',
  '60% 40% 30% 70% / 60% 30% 70% 40%',
]
const blobTransition = { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }

const EMAILJS_SERVICE_ID  = 'service_bbyljq9'
const EMAILJS_TEMPLATE_ID = 'template_sojh37j'
const EMAILJS_PUBLIC_KEY  = 'E32pHTZh78NJN7kzk'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const CONTACT_DETAILS = [
  { label: 'Email',        value: 'andre.c.costa06@gmail.com', icon: '✉️' },
  { label: 'Location',     value: 'Porto, Portugal',           icon: '📍' },
  { label: 'Availability', value: 'Open to new projects',      icon: '🟢' },
]

const INIT = { name: '', email: '', subject: '', message: '' }

function validate(f) {
  const e = {}
  if (!f.name.trim())               e.name    = 'Required'
  if (!f.email.trim())              e.email   = 'Required'
  else if (!EMAIL_RE.test(f.email)) e.email   = 'Invalid email'
  if (!f.subject.trim())            e.subject = 'Required'
  if (!f.message.trim())            e.message = 'Required'
  return e
}

export default function ContactNode() {
  const [fields, setFields] = useState(INIT)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const honeypotRef = useRef(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(p => ({ ...p, [name]: value }))
    if (errors[name]) setErrors(p => ({ ...p, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    e.stopPropagation()
    if (honeypotRef.current?.value) return
    const errs = validate(fields)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: fields.name, from_email: fields.email,
        subject: fields.subject, message: fields.message,
      }, EMAILJS_PUBLIC_KEY)
      setStatus('success')
      setFields(INIT)
    } catch {
      setStatus('error')
    }
  }

  const inputCls = (hasErr) =>
    `w-full px-3 py-2 text-xs rounded-lg border bg-zinc-900 text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors duration-200 ${
      hasErr
        ? 'border-red-500/60 focus:border-red-500'
        : 'border-zinc-700 focus:border-amber-400/70'
    }`

  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.3 }}
      className="w-[clamp(500px,54vw,760px)] h-[clamp(360px,40vw,560px)]"
    >
      <motion.div
        animate={{ borderRadius: BLOB_KEYFRAMES }}
        transition={blobTransition}
        className="w-full h-full bg-linear-to-br from-amber-500 via-red-500 to-amber-500 p-0.5"
        style={{ borderRadius: BLOB_KEYFRAMES[0] }}
      >
        <motion.div
          animate={{ borderRadius: BLOB_KEYFRAMES }}
          transition={blobTransition}
          className="w-full h-full flex flex-row overflow-hidden bg-zinc-950"
          style={{ borderRadius: BLOB_KEYFRAMES[0] }}
        >
          {/* Left — contact details */}
          <div className="flex flex-col justify-center gap-4 w-[38%] shrink-0 px-6 py-6 border-r border-zinc-800/60">
            <div>
              <p className="text-[10px] font-semibold tracking-widest uppercase text-amber-500">Say Hello</p>
              <h2 className="text-white font-extrabold text-xl leading-tight">Get in Touch</h2>
            </div>

            <div className="flex flex-col gap-2.5">
              {CONTACT_DETAILS.map((d) => (
                <div key={d.label} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-700/60 text-sm shrink-0">
                    {d.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-semibold tracking-widest uppercase text-zinc-500">{d.label}</p>
                    <p className="text-[11px] font-medium text-zinc-300 leading-tight">{d.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[9px] font-semibold tracking-widest uppercase text-zinc-500">Find me on</p>
              <div className="flex items-center gap-2">
                {heroIcons.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-400 hover:border-amber-400/60 hover:text-amber-500 transition-all duration-200 text-sm"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col gap-2.5 flex-1 px-6 py-6 justify-center"
          >
            <input
              ref={honeypotRef}
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute opacity-0 pointer-events-none h-0 w-0 overflow-hidden"
            />

            <div className="flex gap-2">
              <div className="flex flex-col gap-0.5 w-full">
                <input
                  type="text" name="name" value={fields.name}
                  onChange={handleChange} placeholder="Your Name"
                  className={inputCls(errors.name)}
                />
                {errors.name && <p className="text-[10px] text-red-400 pl-1">{errors.name}</p>}
              </div>
              <div className="flex flex-col gap-0.5 w-full">
                <input
                  type="email" name="email" value={fields.email}
                  onChange={handleChange} placeholder="Your Email"
                  className={inputCls(errors.email)}
                />
                {errors.email && <p className="text-[10px] text-red-400 pl-1">{errors.email}</p>}
              </div>
            </div>

            <div className="flex flex-col gap-0.5">
              <input
                type="text" name="subject" value={fields.subject}
                onChange={handleChange} placeholder="Subject"
                className={inputCls(errors.subject)}
              />
              {errors.subject && <p className="text-[10px] text-red-400 pl-1">{errors.subject}</p>}
            </div>

            <div className="flex flex-col gap-0.5">
              <textarea
                name="message" value={fields.message}
                onChange={handleChange} placeholder="Write me a message…"
                rows={4}
                className={inputCls(errors.message) + ' resize-none'}
              />
              {errors.message && <p className="text-[10px] text-red-400 pl-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-2.5 text-xs font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' }}
            >
              {status === 'sending' ? 'Sending…' : 'Send Message →'}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[11px] text-center text-emerald-400 font-medium"
                >
                  Message sent! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-[11px] text-center text-red-400 font-medium"
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
