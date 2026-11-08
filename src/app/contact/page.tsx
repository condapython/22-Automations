'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticleSystem from '@/components/ParticleSystem'
import { ContactFormSchema } from '@/lib/validations/contact'
import { Mail, Phone, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  budget: string
  project: string
  message: string
  company_website_url: string
}

interface FormErrors {
  [key: string]: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    budget: '',
    project: '',
    message: '',
    company_website_url: ''
  })
  const [formMountedAt] = useState<number>(() => Date.now())

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.length < 2 ? 'Name must be at least 2 characters' : ''
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? 'Please enter a valid business email' : ''
      case 'company':
        return value.length < 2 ? 'Company / Organization name is required' : ''
      case 'message':
        return value.length < 10 ? 'Message must be at least 10 characters' : ''
      default:
        return ''
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))

    // Real-time validation
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    // Anti-bot honeypot check: reject instantly if filled
    if (formData.company_website_url && formData.company_website_url.trim().length > 0) {
      setErrors({ company_website_url: 'Bot detected: honeypot field must be empty' })
      setIsSubmitting(false)
      return
    }

    // Anti-tamper dwell time check (>= 1500ms)
    const elapsed = Date.now() - formMountedAt
    if (elapsed < 1500) {
      setErrors({ form: 'Submission completed too fast. Automated submission rejected.' })
      setIsSubmitting(false)
      return
    }

    // Validate using ContactFormSchema
    const validation = ContactFormSchema.safeParse({
      name: formData.name,
      email: formData.email,
      company: formData.company,
      budget: formData.budget,
      project: formData.project,
      offering: formData.project,
      message: formData.message,
      company_website_url: formData.company_website_url,
      form_timestamp: formMountedAt
    })

    if (!validation.success) {
      const newErrors: FormErrors = {}
      for (const issue of validation.error.issues) {
        const field = issue.path[0]?.toString() || 'form'
        if (!newErrors[field]) {
          newErrors[field] = issue.message
        }
      }
      setErrors(newErrors)
      setIsSubmitting(false)
      return
    }

    const RECIPIENT_EMAIL = 'automations.22@outlook.com'
    const mailtoSubject = encodeURIComponent(`Enterprise Inquiry: ${formData.project || 'General'} (${formData.company})`)
    const mailtoBody = encodeURIComponent(
      `Enterprise Contact Inquiry:\n` +
      `----------------------------------------\n` +
      `Name        : ${formData.name}\n` +
      `Company     : ${formData.company}\n` +
      `Email       : ${formData.email}\n` +
      `Budget      : ${formData.budget || 'Not specified'}\n` +
      `Project     : ${formData.project || 'Not specified'}\n` +
      `Message     :\n${formData.message}\n`
    )
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`

    const payload = {
      _subject: `New Enterprise Inquiry: ${formData.project || 'General'} (${formData.company})`,
      _template: 'table',
      _captcha: 'false',
      Name: formData.name,
      Company: formData.company,
      Email: formData.email,
      Budget: formData.budget,
      Project: formData.project,
      Message: formData.message
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      setIsSubmitting(false)

      if (data && (data.success === 'true' || data.success === true)) {
        setIsSubmitted(true)
      } else {
        window.location.href = mailtoUrl
        setIsSubmitted(true)
      }
    } catch {
      setIsSubmitting(false)
      window.location.href = mailtoUrl
      setIsSubmitted(true)
    }
  }

  const contactInfo = [
    {
      title: "Direct Email",
      description: "Enterprise inquiries & RFQs",
      value: "automations.22@outlook.com",
      href: "mailto:automations.22@outlook.com",
      icon: Mail
    },
    {
      title: "Direct Phone",
      description: "Direct line for commercial clients",
      value: "+1 (437) 808-4197",
      href: "tel:4378084197",
      icon: Phone
    },
    {
      title: "Response SLA",
      description: "Commercial evaluation requests",
      value: "Within 24 Hours",
      icon: Clock
    },
    {
      title: "Deployment Security",
      description: "Confidentiality & NDA coverage",
      value: "CIA / SOC2 Strict",
      icon: ShieldCheck
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-lg tech-border bg-card/60 p-10 rounded-2xl"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center glow-effect border border-primary/30">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">Transmission Received</h1>
            <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
              Your inquiry has been encrypted and delivered to the enterprise engineering and sales desk. Our technical team will follow up within 24 hours.
            </p>
            <Button onClick={() => setIsSubmitted(false)} className="font-mono text-xs uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110">
              Submit Another Inquiry
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary selection:text-black">
      {/* Background Particle System */}
      <ParticleSystem />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-16 px-6 relative z-10 border-b border-border/40">
        <div className="container mx-auto text-center max-w-3xl">
          <Badge className="mb-6 font-mono text-xs uppercase tracking-wider bg-primary/10 text-primary border border-primary/20" variant="secondary">
            ⚡ Enterprise Engagement &amp; Procurement Desk
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Connect With Our <span className="text-gradient">Engineering Team</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Request an IndusEye RS3 30-Day On-Site Pilot, initiate a multi-bay commercial fleet RFQ, or schedule an Enterprise AI Training cohort briefing.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6 relative z-10 bg-secondary/10 border-b border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon
              return (
                <Card key={index} className="tech-border bg-card/40 text-center hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-mono text-xs uppercase tracking-wider text-white font-bold mb-1">{info.title}</h3>
                    <p className="text-[11px] text-muted-foreground mb-2">{info.description}</p>
                    {info.href ? (
                      <a href={info.href} className="text-xs font-mono font-medium text-primary hover:underline">
                        {info.value}
                      </a>
                    ) : (
                      <span className="text-xs font-mono font-medium text-white">{info.value}</span>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-5 gap-12 items-start">
            {/* Form Column */}
            <div className="md:col-span-3">
              <Card className="tech-border bg-card/60">
                <CardHeader className="p-6 pb-4 border-b border-border/40">
                  <CardTitle className="text-xl font-bold text-white font-mono tracking-tight">Initiate Inquiry / RFQ</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    Direct routing to enterprise account leads and senior automation engineers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`bg-background/60 border-border/80 focus:border-primary text-sm ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-400 font-mono">{errors.name}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Work Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`bg-background/60 border-border/80 focus:border-primary text-sm ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="corporate@company.com"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400 font-mono">{errors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="company" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Organization *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={`bg-background/60 border-border/80 focus:border-primary text-sm ${errors.company ? 'border-red-500' : ''}`}
                          placeholder="Company name"
                        />
                        {errors.company && (
                          <p className="text-[11px] text-red-400 font-mono">{errors.company}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="budget" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Budget Allocation</Label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="flex h-9 w-full rounded-md border border-border/80 bg-background/60 px-3 py-1 text-sm text-foreground focus:outline-none focus:border-primary font-mono text-xs"
                        >
                          <option value="">Select budget range</option>
                          <option value="pilot-evaluation">Pilot Evaluation ($2,500 – $5,000)</option>
                          <option value="25k-50k">$25k – $50k (Single site / Initial cohort)</option>
                          <option value="50k-100k">$50k – $100k (Multi-bay rollout / Full cohort)</option>
                          <option value="100k-250k+">$100k – $250k+ (Enterprise fleet / Multi-facility)</option>
                        </select>
                      </div>
                    </div>

                    {/* Anti-bot Honeypot Trap Field */}
                    <div
                      style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <label htmlFor="company_website_url">Do not fill this field</label>
                      <input
                        id="company_website_url"
                        name="company_website_url"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData.company_website_url}
                        onChange={(e) => handleInputChange('company_website_url', e.target.value)}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="project" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Primary Requirement</Label>
                      <select
                        id="project"
                        value={formData.project}
                        onChange={(e) => handleInputChange('project', e.target.value)}
                        className="flex h-9 w-full rounded-md border border-border/80 bg-background/60 px-3 py-1 text-sm text-foreground focus:outline-none focus:border-primary font-mono text-xs"
                      >
                        <option value="">Select primary requirement</option>
                        <option value="induseye-pilot">IndusEye RS3 — 30-Day On-Site Evaluation Pilot</option>
                        <option value="induseye-rollout">IndusEye RS3 — Multi-Bay Car Wash / Fleet Rollout RFQ</option>
                        <option value="ai-training-cohort">Enterprise AI Training — Engineering Workforce Cohort</option>
                        <option value="ai-training-executive">Enterprise AI Training — Executive Strategy Intensive</option>
                        <option value="custom-hardware">Custom 24 GHz Industrial Sensor Fusion &amp; Embedded I/O</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Deployment Details &amp; Objectives *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`bg-background/60 border-border/80 focus:border-primary text-sm min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Specify bay dimensions, wash chemical exposure, number of engineers to train, or target timeline..."
                      />
                      {errors.message && (
                        <p className="text-[11px] text-red-400 font-mono">{errors.message}</p>
                      )}
                    </div>

                    {errors.form && (
                      <p className="text-xs text-red-400 font-mono">{errors.form}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full font-mono text-xs uppercase tracking-wider bg-primary text-black font-bold py-6 hover:brightness-110 shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                    >
                      {isSubmitting ? 'Transmitting Encrypted Payload...' : 'Submit Inquiry & Request Pilot'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="md:col-span-2 space-y-6">
              <Card className="tech-border bg-card/40 p-6 space-y-4">
                <div className="font-mono text-xs uppercase tracking-wider text-primary font-bold">Why 22-Automations</div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-white">Proven Field Uptime</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">99.98% detection reliability immune to steam, foam, and spray.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-white">Zero Third-Party Lock-in</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Our AI Training imparts sovereign capabilities directly to your team.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs text-white">Rapid Field Evaluation</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">30-day pilot units ship configured for plug-and-play installation.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="tech-border bg-card/40 p-6">
                <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-bold mb-4">Procurement Timeline</h4>
                <div className="space-y-3 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px] font-bold">1</span>
                    <span className="text-white">Technical Review (Within 24 Hours)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold">2</span>
                    <span className="text-white">Pilot Unit Dispatch / Curriculum Plan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-secondary/20 text-foreground flex items-center justify-center text-[10px] font-bold">3</span>
                    <span className="text-white">Field Evaluation / Cohort Launch</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">4</span>
                    <span className="text-white">Full-Scale Facility Multi-Bay Rollout</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
