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
import { ContactFormSchema } from '@/lib/validations/contact'

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
        return !emailRegex.test(value) ? 'Please enter a valid email' : ''
      case 'company':
        return value.length < 2 ? 'Company name is required' : ''
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
    const mailtoSubject = encodeURIComponent(`Enterprise Contact Inquiry: ${formData.project || 'General'} (${formData.company})`)
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
      title: "Email Us",
      description: "Get in touch via email",
      value: "automations.22@outlook.com",
      icon: "📧"
    },
    {
      title: "Call Us",
      description: "Speak with our team",
      value: "+1 (437) 808-4197",
      icon: "📞"
    },
    {
      title: "LinkedIn",
      description: "Connect with us professionally",
      value: "22-automations",
      icon: "💼"
    },
    {
      title: "Response Time",
      description: "We typically respond within",
      value: "24 hours",
      icon: "⚡"
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/20 flex items-center justify-center glow-effect">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl"
            >
              ✅
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gradient mb-4">Message Sent!</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Thank you for reaching out. We'll get back to you within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="glow-effect">
            Send Another Message
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              22-Automations
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link href="/products/sensing-unit" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Radar Sensor
              </Link>
              <Link href="/contact" className="text-primary">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="animate-pulse-glow mb-8" variant="secondary">
            ⚡ Let's Build Something Amazing
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Get In Touch</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? We'd love to hear about your project and explore how we can help.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-effect hover:glow-effect transition-all duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="text-2xl mb-3">{info.icon}</div>
                    <h3 className="font-semibold text-primary mb-1">{info.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{info.description}</p>
                    <p className="text-sm font-medium">{info.value}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <Card className="glass-effect glow-effect">
                <CardHeader>
                  <CardTitle className="text-2xl text-gradient">Start Your Project</CardTitle>
                  <CardDescription>
                    Tell us about your vision and we'll make it reality.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className={`glass-effect ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Your full name"
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-400"
                            >
                              {errors.name}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`glass-effect ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="your@email.com"
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-400"
                            >
                              {errors.email}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company *</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className={`glass-effect ${errors.company ? 'border-red-500' : ''}`}
                          placeholder="Your company name"
                        />
                        <AnimatePresence>
                          {errors.company && (
                            <motion.p
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-xs text-red-400"
                            >
                              {errors.company}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="glass-effect flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                        >
                          <option value="">Select budget range</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k-100k">$50k - $100k</option>
                          <option value="100k-250k+">$100k - $250k+</option>
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

                    <div className="space-y-2">
                      <Label htmlFor="project">Project Type</Label>
                      <select
                        id="project"
                        value={formData.project}
                        onChange={(e) => handleInputChange('project', e.target.value)}
                        className="glass-effect flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                      >
                        <option value="">Select project type</option>
                        <option value="induseye-pilot">IndusEye RS3 — 30-Day Evaluation Pilot</option>
                        <option value="induseye-rollout">IndusEye RS3 — Multi-Bay / Fleet Rollout RFQ</option>
                        <option value="ai-training-cohort">Enterprise AI Training — Engineering Cohort</option>
                        <option value="ai-training-executive">Enterprise AI Training — Executive Strategy Intensive</option>
                        <option value="custom-hardware">Custom Industrial IoT & Embedded Automation</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`glass-effect min-h-[120px] ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Tell us about your project, goals, and timeline..."
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-xs text-red-400"
                          >
                            {errors.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {errors.form && (
                      <p className="text-xs text-red-400 font-mono">{errors.form}</p>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-lg py-6 glow-effect"
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                        />
                      ) : (
                        'Send Message'
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Information */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold text-gradient mb-4">Why Choose 22-Automations?</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Expert Team</h4>
                      <p className="text-sm text-muted-foreground">Former engineers from Tesla, Google, and Apple</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Proven Results</h4>
                      <p className="text-sm text-muted-foreground">200+ successful projects, 50M+ users impacted</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center mt-1">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary">Fast Delivery</h4>
                      <p className="text-sm text-muted-foreground">Agile methodology, MVP in 4-8 weeks</p>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="glass-effect">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-primary mb-3">What Happens Next?</h4>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">1</span>
                      <span>We review your project requirements</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs font-bold">2</span>
                      <span>Schedule a strategy call within 24 hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-xs font-bold">3</span>
                      <span>Receive a detailed proposal and timeline</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold">4</span>
                      <span>Start building your solution</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <Link href="/" className="text-2xl font-bold text-gradient mb-4 inline-block">
            22-Automations
          </Link>
          <p className="text-muted-foreground mb-6">
            Automating success, one system at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground mb-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Email: <a href="mailto:automations.22@outlook.com" className="hover:text-primary transition-colors">automations.22@outlook.com</a></p>
            <p>Mobile: <a href="tel:4378084197" className="hover:text-primary transition-colors">+1 (437) 808-4197</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}
