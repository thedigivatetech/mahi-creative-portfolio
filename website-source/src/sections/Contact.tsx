import { useState, type FormEvent, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  MessageSquare,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import { LinkedInIcon } from '@components/ui/SocialIcons.tsx'
import { siteConfig } from '@data/portfolio.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { SectionHeader } from '@components/layout/SectionHeader.tsx'

export const PROJECT_TYPES = [
  'Video editing',
  'Creative consultation',
  'Content production',
  'Graphic design',
  'Website development',
  'Social media management',
  'Lead generation',
  'Automation and AI',
  'Complete branding project',
  'Other',
] as const

export const BUDGET_RANGES = [
  'Under £2,000',
  '£2,000 – £5,000',
  '£5,000 – £15,000',
  '£15,000+',
  'Flexible / To Discuss',
] as const

export function Contact() {
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp' | 'api' | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [renderTime, setRenderTime] = useState<number>(0)

  const [formState, setFormState] = useState({
    name: '',
    businessName: '',
    email: '',
    website: '',
    projectType: 'Video editing',
    budgetRange: '£2,000 – £5,000',
    description: '',
    // Honeypot field for bot spam prevention (must stay empty)
    honeypot: '',
  })

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    setRenderTime(Date.now())
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {}

    // Spam bot honeypot check
    if (formState.honeypot.trim() !== '') {
      errs.honeypot = 'Automated submission rejected.'
      return false
    }

    // Time-based bot check (less than 1.5s is usually a bot)
    if (Date.now() - renderTime < 1500) {
      errs.general = 'Please take a moment before submitting.'
      setErrors(errs)
      return false
    }

    if (!formState.name.trim()) {
      errs.name = 'Please provide your name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formState.email.trim()) {
      errs.email = 'Please provide your email address.'
    } else if (!emailRegex.test(formState.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }

    if (!formState.description.trim()) {
      errs.description = 'Please provide a brief description of your project goals.'
    } else if (formState.description.trim().length < 15) {
      errs.description = 'Please provide a little more detail (at least 15 characters).'
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const buildMailtoUrl = () => {
    const subject = encodeURIComponent(
      `Project Enquiry: ${formState.businessName || formState.name} — ${formState.projectType}`
    )
    const body = encodeURIComponent(
      `Hi Mahi,\n\nI would like to discuss a project:\n\n` +
        `• Name: ${formState.name}\n` +
        `• Business / Brand: ${formState.businessName || 'N/A'}\n` +
        `• Email: ${formState.email}\n` +
        `• Website: ${formState.website || 'N/A'}\n` +
        `• Project Type: ${formState.projectType}\n` +
        `• Budget Range: ${formState.budgetRange}\n\n` +
        `Project Description & Goals:\n${formState.description}\n\n` +
        `Best regards,\n${formState.name}`
    )
    return `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
  }

  const buildWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hi Mahi, I would like to discuss a project:\n\n` +
        `• Name: ${formState.name}\n` +
        `• Business: ${formState.businessName || 'N/A'}\n` +
        `• Project Type: ${formState.projectType}\n` +
        `• Budget Range: ${formState.budgetRange}\n` +
        `• Details: ${formState.description}`
    )
    return `${siteConfig.whatsapp}?text=${text}`
  }

  const handleSubmit = async (e: FormEvent, method: 'email' | 'whatsapp') => {
    e.preventDefault()
    setErrorMessage(null)

    if (!validateForm()) {
      return
    }

    const backendEndpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT

    // If a real backend or third-party endpoint (e.g. Formspree/Web3Forms) is configured
    if (backendEndpoint) {
      setIsLoading(true)
      try {
        const response = await fetch(backendEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: formState.name,
            businessName: formState.businessName,
            email: formState.email,
            website: formState.website,
            projectType: formState.projectType,
            budgetRange: formState.budgetRange,
            description: formState.description,
          }),
        })

        if (!response.ok) {
          throw new Error('Server returned an error. Falling back to email client.')
        }

        setSubmissionMethod('api')
        setSubmitted(true)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Submission failed.'
        setErrorMessage(
          `${message} No problem — we will open your mail client with your details pre-filled.`
        )
        // Fallback to mailto
        window.location.href = buildMailtoUrl()
        setSubmissionMethod('email')
        setSubmitted(true)
      } finally {
        setIsLoading(false)
      }
      return
    }

    // Direct client-side dispatch route (never fake, always functional)
    if (method === 'whatsapp') {
      window.open(buildWhatsAppUrl(), '_blank', 'noopener,noreferrer')
      setSubmissionMethod('whatsapp')
    } else {
      window.location.href = buildMailtoUrl()
      setSubmissionMethod('email')
    }

    setSubmitted(true)
  }

  return (
    <Section id="contact" className="border-b border-border/80 bg-background relative overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-accent/2 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Section Header */}
        <SectionHeader
          label="Direct Contact & Bookings"
          heading="Have a project in mind? Let's make it happen."
          subtext="Whether you need compelling video content, creative consultation or someone to manage a complete branding project, let's talk."
        />

        {/* ── Direct Channels Bar ─────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Email Direct Card */}
          <div className="p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-accent/40 transition-colors group">
            <div>
              <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-accent mb-4">
                <Mail size={18} />
              </div>
              <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-1">
                Direct Email
              </span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-heading text-lg sm:text-xl font-bold text-text-primary hover:text-accent transition-colors block break-all"
              >
                {siteConfig.email}
              </a>
              <span className="font-body text-xs text-text-secondary/80 mt-1 block">
                Direct founder inbox · 24h response
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-1.5 font-body text-xs text-text-secondary hover:text-accent transition-colors cursor-pointer"
              >
                {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Address'}</span>
              </button>

              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-1 font-body text-xs font-semibold text-accent hover:underline"
              >
                <span>Compose</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* WhatsApp Direct Card */}
          <div className="p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-accent/40 transition-colors group">
            <div>
              <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-emerald-400 mb-4">
                <MessageSquare size={18} />
              </div>
              <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-1">
                WhatsApp Chat
              </span>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-lg sm:text-xl font-bold text-text-primary hover:text-accent transition-colors block"
              >
                Direct WhatsApp Message
              </a>
              <span className="font-body text-xs text-text-secondary/80 mt-1 block">
                Quick project alignment & questions
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-body text-xs text-text-secondary">
                UK & International
              </span>
              <a
                href={siteConfig.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-body text-xs font-semibold text-accent hover:underline"
              >
                <span>Start Chat</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>

          {/* LinkedIn Profile Card */}
          <div className="p-6 sm:p-7 border border-border bg-surface flex flex-col justify-between hover:border-accent/40 transition-colors group">
            <div>
              <div className="w-10 h-10 border border-border bg-background flex items-center justify-center text-accent mb-4">
                <LinkedInIcon size={18} />
              </div>
              <span className="font-body text-label uppercase tracking-widest text-text-secondary block mb-1">
                LinkedIn Profile
              </span>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-lg sm:text-xl font-bold text-text-primary hover:text-accent transition-colors block"
              >
                linkedin.com/in/syedhossainmahi
              </a>
              <span className="font-body text-xs text-text-secondary/80 mt-1 block">
                Professional network & background
              </span>
            </div>

            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
              <span className="font-body text-xs text-text-secondary">
                Verified Profile
              </span>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-body text-xs font-semibold text-accent hover:underline"
              >
                <span>Connect</span>
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Editorial Enquiry Form Container ───────────────────────────────── */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Left Column: Direct Partnership Commitments */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 border border-border bg-surface/50 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-accent" />
                <span className="font-heading text-xs font-bold text-text-primary uppercase tracking-wider">
                  Direct Founder Collaboration
                </span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-text-primary tracking-tight">
                No intermediaries. No generic intake queues.
              </h3>
              <p className="font-body text-body-sm text-text-secondary leading-relaxed">
                Every enquiry is read directly by Syed Hussain. We evaluate your goals, assess feasibility, and determine the most effective creative or technical approach.
              </p>
            </div>

            <div className="p-6 border border-border bg-background space-y-3">
              <div className="flex items-center gap-2 text-text-secondary font-body text-xs">
                <Clock size={14} className="text-accent shrink-0" />
                <span>Response turnaround: Usually within 24 hours (Monday – Friday)</span>
              </div>
              <div className="flex items-center gap-2 text-text-secondary font-body text-xs">
                <ShieldCheck size={14} className="text-accent shrink-0" />
                <span>Privacy: Your project details and business ideas remain strictly confidential</span>
              </div>
            </div>
          </div>

          {/* Right Column: Complete Enquiry Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 border border-border bg-surface relative">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-heading text-2xl font-bold text-text-primary">
                Project Enquiry Form
              </h4>
              <span className="font-body text-xs text-accent font-medium px-2 py-0.5 bg-accent/10 border border-accent/20">
                Direct Submission
              </span>
            </div>
            <p className="font-body text-body-sm text-text-secondary mb-8">
              Share your project scope below. Submit directly via your email client or WhatsApp.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="py-10 text-center space-y-4"
                >
                  <div className="w-14 h-14 mx-auto border border-accent bg-accent/10 flex items-center justify-center text-accent">
                    <Sparkles size={24} />
                  </div>

                  <h5 className="font-heading text-2xl font-bold text-[#F5F4EF]">
                    Enquiry Prepared & Initiated
                  </h5>

                  <p className="font-body text-body-sm text-[#C8CECC] max-w-md mx-auto leading-relaxed">
                    {submissionMethod === 'whatsapp' ? (
                      <>
                        Your enquiry was pre-formatted for WhatsApp. If the chat window did not open automatically, you can message directly at{' '}
                        <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="text-accent underline">
                          WhatsApp Link
                        </a>.
                      </>
                    ) : (
                      <>
                        Your message has been pre-formatted for your email client. If it did not open automatically, please send your enquiry directly to{' '}
                        <a href={`mailto:${siteConfig.email}`} className="text-accent underline">
                          {siteConfig.email}
                        </a>.
                      </>
                    )}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false)
                        setSubmissionMethod(null)
                      }}
                      className="px-5 py-2.5 border border-border text-[#D0D4D2] hover:text-[#F5F4EF] hover:border-accent font-body text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      ← Edit / Submit Another
                    </button>

                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="px-5 py-2.5 bg-accent text-[#111315] font-body text-xs font-semibold hover:bg-accent/90 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>Direct Email</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form
                  onSubmit={(e) => handleSubmit(e, 'email')}
                  className="space-y-6"
                  noValidate
                >
                  {/* Honeypot field (hidden from legitimate users, catches spam bots) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_confirm_empty">Do not fill this field</label>
                    <input
                      type="text"
                      id="website_confirm_empty"
                      name="website_confirm_empty"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formState.honeypot}
                      onChange={(e) => setFormState({ ...formState, honeypot: e.target.value })}
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/40 text-red-400 font-body text-xs flex items-start gap-2">
                      <AlertCircle size={15} className="shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Name & Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                        Your Name <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({ ...formState, name: e.target.value })
                          if (errors.name) setErrors({ ...errors, name: '' })
                        }}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full bg-background border px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                      />
                      {errors.name && (
                        <span className="font-body text-xs text-red-400 mt-1 block">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                        Business / Brand Name
                      </label>
                      <input
                        type="text"
                        value={formState.businessName}
                        onChange={(e) => setFormState({ ...formState, businessName: e.target.value })}
                        placeholder="e.g. Atelier London"
                        className="w-full bg-background border border-border px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* 2. Email & Website */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                        Email Address <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => {
                          setFormState({ ...formState, email: e.target.value })
                          if (errors.email) setErrors({ ...errors, email: '' })
                        }}
                        placeholder="e.g. alex@atelier.co.uk"
                        className={`w-full bg-background border px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                        }`}
                      />
                      {errors.email && (
                        <span className="font-body text-xs text-red-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                        Current Website (Optional)
                      </label>
                      <input
                        type="url"
                        value={formState.website}
                        onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                        placeholder="e.g. https://atelier.co.uk"
                        className="w-full bg-background border border-border px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* 3. Project Type Dropdown */}
                  <div>
                    <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                      Project Type <span className="text-accent">*</span>
                    </label>
                    <select
                      value={formState.projectType}
                      onChange={(e) => setFormState({ ...formState, projectType: e.target.value })}
                      className="w-full bg-background border border-border px-4 py-3 font-body text-body-sm text-text-primary focus:border-accent focus:outline-none transition-colors cursor-pointer"
                    >
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Budget Range Selector */}
                  <div>
                    <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                      Estimated Budget Range
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                      {BUDGET_RANGES.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => setFormState({ ...formState, budgetRange: range })}
                          className={`py-2 px-2.5 font-body text-xs text-center border transition-colors cursor-pointer ${
                            formState.budgetRange === range
                              ? 'border-accent bg-accent/15 text-accent font-semibold'
                              : 'border-border bg-background text-text-secondary hover:border-text-secondary'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 5. Project Description */}
                  <div>
                    <label className="font-body text-label uppercase tracking-widest text-text-secondary block mb-2">
                      Project Description & Goals <span className="text-accent">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formState.description}
                      onChange={(e) => {
                        setFormState({ ...formState, description: e.target.value })
                        if (errors.description) setErrors({ ...errors, description: '' })
                      }}
                      placeholder="Outline your project objectives, target timelines, key deliverables, and what done looks like..."
                      className={`w-full bg-background border px-4 py-3 font-body text-body-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none transition-colors resize-y ${
                        errors.description ? 'border-red-500 focus:border-red-500' : 'border-border focus:border-accent'
                      }`}
                    />
                    {errors.description && (
                      <span className="font-body text-xs text-red-400 mt-1 block">
                        {errors.description}
                      </span>
                    )}
                  </div>

                  {/* Dual Submission Actions */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center justify-center gap-2 bg-accent text-background px-7 py-3.5 font-body text-body-sm font-semibold hover:bg-accent/90 transition-colors shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      <Send size={15} />
                      <span>{isLoading ? 'Preparing...' : 'Send Enquiry via Email'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={(e) => handleSubmit(e, 'whatsapp')}
                      className="inline-flex items-center justify-center gap-2 border border-border bg-background hover:border-emerald-500/60 hover:text-emerald-400 px-6 py-3.5 font-body text-body-sm text-text-primary transition-colors cursor-pointer"
                    >
                      <MessageSquare size={15} className="text-emerald-400" />
                      <span>Send via WhatsApp</span>
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  )
}
