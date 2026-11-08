'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { PilotRequestSchema } from '@/lib/validations/contact'
import { getVisitorSummaryForLead } from '@/lib/cookies/visitor-tracker'
import {
  Radio,
  Eye,
  Sun,
  Box,
  CheckCircle2,
  Calendar,
  Clock,
  Send,
  X,
  ExternalLink,
  ChevronDown,
  Building2,
  Truck,
  Warehouse,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Check,
  Zap,
  Target
} from 'lucide-react'

export type DeploymentEnvironment = 'auto-spa' | 'fleet-bays' | 'industrial-dock'

interface HardwareSensingProductProps {
  onContactClick?: () => void
  initialMode?: DeploymentEnvironment
}

export default function HardwareSensingProduct({
  onContactClick,
  initialMode = 'auto-spa'
}: HardwareSensingProductProps) {
  const [deploymentMode, setDeploymentMode] = useState<DeploymentEnvironment>(initialMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null)

  // Modal dialog ref
  const modalRef = useRef<HTMLDialogElement>(null)

  // Form inputs state
  const todayStr = new Date().toISOString().split('T')[0]
  const [modalMountedAt, setModalMountedAt] = useState<number>(() => Date.now())
  const [formData, setFormData] = useState({
    requestType: '30-Day Pilot Unit',
    companyName: '',
    userName: '',
    email: '',
    phone: '',
    availableDate: todayStr,
    availableTime: '10:00',
    notes: '',
    fax_number: ''
  })

  const RECIPIENT_EMAIL = 'automations.22@outlook.com'

  const getDeploymentLabel = (mode: DeploymentEnvironment) => {
    switch (mode) {
      case 'auto-spa':
        return 'Car Wash & Auto Spa Tunnels (Foam, Mist & Steam Proof)'
      case 'fleet-bays':
        return 'Transit & Commercial Fleet Maintenance Bays (High-Cycle Duty)'
      case 'industrial-dock':
        return 'High-Duty Industrial Entrances, Docks & Roll-Up Doors'
      default:
        return 'Car Wash & Industrial High-Duty Access'
    }
  }

  const openModal = (defaultType = '30-Day Pilot Unit') => {
    setFormStatus(null)
    setModalMountedAt(Date.now())
    setFormData(prev => ({ ...prev, requestType: defaultType }))
    if (modalRef.current) {
      if (typeof modalRef.current.showModal === 'function') {
        modalRef.current.showModal()
      } else {
        modalRef.current.setAttribute('open', 'true')
      }
    }
  }

  const closeModal = () => {
    if (modalRef.current) {
      if (typeof modalRef.current.close === 'function') {
        modalRef.current.close()
      } else {
        modalRef.current.removeAttribute('open')
      }
    }
  }

  const handleDialogClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      const clickedInside =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width

      if (!clickedInside) {
        closeModal()
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    // Anti-bot honeypot check: reject if filled
    if (formData.fax_number && formData.fax_number.trim().length > 0) {
      setFormStatus({
        type: 'error',
        message: 'Bot detected: submission rejected.'
      })
      setIsSubmitting(false)
      return
    }

    // Anti-tamper dwell time check (>= 1500ms)
    const elapsed = Date.now() - modalMountedAt
    if (elapsed < 1500) {
      setFormStatus({
        type: 'error',
        message: 'Submission completed too quickly. Automated submission rejected.'
      })
      setIsSubmitting(false)
      return
    }

    // Validate using PilotRequestSchema
    const validation = PilotRequestSchema.safeParse({
      userName: formData.userName,
      companyName: formData.companyName,
      email: formData.email,
      phone: formData.phone,
      requestType: formData.requestType,
      deploymentEnvironment: deploymentMode,
      availableDate: formData.availableDate,
      availableTime: formData.availableTime,
      notes: formData.notes,
      fax_number: formData.fax_number,
      form_timestamp: modalMountedAt
    })

    if (!validation.success) {
      const issue = validation.error.issues[0]
      setFormStatus({
        type: 'error',
        message: issue?.message || 'Please check your inputs and try again.'
      })
      setIsSubmitting(false)
      return
    }

    const useLabel = getDeploymentLabel(deploymentMode)
    const visitorSummary = getVisitorSummaryForLead()
    const visitorBlock = Object.entries(visitorSummary)
      .map(([k, v]) => `${k.padEnd(24, ' ')}: ${v}`)
      .join('\n')

    const mailtoSubject = encodeURIComponent(`IndusEye RS3 [${formData.requestType}] - ${formData.companyName}`)
    const mailtoBody = encodeURIComponent(
      `IndusEye RS3 Technical Request:\n` +
      `----------------------------------------\n` +
      `Request Type    : ${formData.requestType}\n` +
      `Selected Option : ${useLabel}\n` +
      `Company Name    : ${formData.companyName}\n` +
      `Contact Name    : ${formData.userName}\n` +
      `Email Address   : ${formData.email}\n` +
      `Phone Number    : ${formData.phone}\n` +
      `Preferred Date  : ${formData.availableDate}\n` +
      `Preferred Time  : ${formData.availableTime}\n` +
      `Project Details : ${formData.notes}\n\n` +
      `Visitor Cookie & Attribution Telemetry:\n` +
      `----------------------------------------\n` +
      `${visitorBlock}\n`
    )
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`

    const payload = {
      _subject: `New IndusEye RS3 Request: ${formData.requestType} (${formData.companyName})`,
      _template: 'table',
      _captcha: 'false',
      Product: 'IndusEye RS3',
      Request_Type: formData.requestType,
      Deployment_Option: useLabel,
      Company_Name: formData.companyName,
      Contact_Name: formData.userName,
      Email: formData.email,
      Phone_Number: formData.phone,
      Preferred_Date: formData.availableDate,
      Preferred_Time: formData.availableTime,
      Notes: formData.notes,
      ...visitorSummary
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
        setFormStatus({
          type: 'success',
          message: `✓ Success! Your request for "${formData.requestType}" has been delivered to ${RECIPIENT_EMAIL}. Our team will confirm the trial unit dispatch and integration setup.`
        })
        setFormData({
          requestType: '30-Day Pilot Unit',
          companyName: '',
          userName: '',
          email: '',
          phone: '',
          availableDate: todayStr,
          availableTime: '10:00',
          notes: '',
          fax_number: ''
        })
      } else {
        window.location.href = mailtoUrl
        setFormStatus({
          type: 'info',
          message: `Redirecting to email client for direct confirmation with ${RECIPIENT_EMAIL}...`
        })
      }
    } catch {
      setIsSubmitting(false)
      window.location.href = mailtoUrl
      setFormStatus({
        type: 'info',
        message: `Opening your email client with details pre-filled for ${RECIPIENT_EMAIL}.`
      })
    }
  }

  return (
    <div className="w-full text-foreground font-sans">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Hardware Platform · IndusEye RS3
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                  Precise Identification, <br />
                  <span className="text-gradient">Autonomous Flow.</span>
                </h1>
                <p className="text-lg sm:text-xl font-medium text-white/90">
                  Engineered for Auto Spa's &amp; High-Duty Access.
                </p>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                A ruggedized sensing and access controller unifying 24 GHz millimeter-wave radar, HD cat-eye optical verification, and ambient light control. Designed to eliminate false triggers in dense soap mist, water jets, and heavy weather.
              </p>

              {/* Deployment Option Selector (User Specified) */}
              <div className="p-4 rounded-xl tech-border backdrop-blur-md max-w-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="deployment-mode" className="text-xs font-mono text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" /> Select Deployment Environment
                  </label>
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live Preset
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    {deploymentMode === 'auto-spa' ? (
                      <Building2 className="w-4 h-4" />
                    ) : deploymentMode === 'fleet-bays' ? (
                      <Truck className="w-4 h-4" />
                    ) : (
                      <Warehouse className="w-4 h-4" />
                    )}
                  </div>
                  <select
                    id="deployment-mode"
                    value={deploymentMode}
                    onChange={(e) => setDeploymentMode(e.target.value as DeploymentEnvironment)}
                    className="w-full pl-10 pr-10 py-3 rounded-lg bg-secondary/80 border border-border text-foreground font-semibold text-xs sm:text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors leading-tight"
                  >
                    <option value="auto-spa">
                      Car Wash &amp; Auto Spa Tunnels (Foam, Mist &amp; Steam Proof)
                    </option>
                    <option value="fleet-bays">
                      Transit &amp; Fleet Maintenance Bays (Heavy Ingress/Egress)
                    </option>
                    <option value="industrial-dock">
                      High-Duty Industrial Entrances &amp; Loading Docks
                    </option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Primary User-Selected CTA Button */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => openModal('30-Day Pilot Unit')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all glow-effect shadow-[0_0_25px_rgba(0,255,255,0.4)]"
                >
                  Request a 30-Day On-Site Pilot / Trial Unit <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => openModal('Technical Consultation')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg border border-border bg-card/60 hover:bg-card text-foreground font-medium text-sm transition-all hover:border-primary/50"
                >
                  Schedule Consultation <ExternalLink className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                Pre-calibrated for rapid mounting · Zero disruption to active wash bays
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-[460px] mx-auto rounded-2xl tech-border p-6 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src="/assets/products/product-enclosed.png"
                    alt="IndusEye RS3 compact sensing unit in ruggedized enclosure"
                    width={440}
                    height={440}
                    priority
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                  />
                </div>

                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-3 rounded-xl tech-border bg-background/90 backdrop-blur-md shadow-2xl text-xs space-y-1">
                  <div className="font-bold text-foreground flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    IndusEye RS3 Sensor Unit
                  </div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {deploymentMode === 'auto-spa'
                      ? 'Auto Spa Tunnel Configuration'
                      : deploymentMode === 'fleet-bays'
                      ? 'Fleet Transit Bay Configuration'
                      : 'Industrial Dock & Door Configuration'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Bar */}
      <section className="relative -mt-6 px-6 z-10" id="specs-breakdown">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl tech-border bg-card/80 backdrop-blur-xl">
            <div className="p-4 border-r border-border/40 last:border-r-0">
              <div className="font-mono text-3xl font-extrabold text-primary">24 GHz</div>
              <div className="text-xs text-muted-foreground mt-1">Radar Sensing Frequency</div>
            </div>
            <div className="p-4 border-r border-border/40 last:border-r-0">
              <div className="font-mono text-3xl font-extrabold text-accent">Up to 2 m</div>
              <div className="text-xs text-muted-foreground mt-1">Stated Detection Distance</div>
            </div>
            <div className="p-4 border-r border-border/40 last:border-r-0">
              <div className="font-mono text-3xl font-extrabold text-primary">HD Vision</div>
              <div className="text-xs text-muted-foreground mt-1">Cat-Eye Optical Sensor</div>
            </div>
            <div className="p-4">
              <div className="font-mono text-3xl font-extrabold text-white">1000 lb</div>
              <div className="text-xs text-muted-foreground mt-1">Stated Holding-Force Rating*</div>
            </div>
          </div>
          <p className="text-[11px] font-mono text-muted-foreground/80 mt-2 px-2">
            *Approximately 500 kg-force electromagnetic lock coupling. Rated for continuous high-duty access cycles.
          </p>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Core Capabilities</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Built for harsh industrial &amp; wash bay environments.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Optical sensors fail when blinded by detergent froth, dense mist, or sun glare. IndusEye RS3 solves this by pairing high-frequency radar detection with synchronized optical confirmation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">24 GHz FMCW Radar</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Penetrates water curtains, soap foam, steam clouds, and temperature extremes without false triggers.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-accent/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Cat-Eye HD Optical</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ultra-wide cat-eye lens delivers simultaneous visual telemetry to verify vehicle entry clearance.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Ambient Light Integration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Automatic ambient luminosity sensors trigger wash bay entry illumination and adjust optical exposure dynamically.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-accent/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">1000 lb Lock Coupling</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Engineered for rapid integration with 1000 lb magnetic locks and automatic industrial gate motors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Electronics Breakdown */}
      <section className="py-20 px-6 bg-secondary/20 border-y border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* PCB Image */}
            <div className="lg:col-span-6 relative">
              <div className="tech-border rounded-2xl p-6 bg-card/30 flex items-center justify-center overflow-hidden">
                <Image
                  src="/assets/products/product-pcb.png"
                  alt="High-density printed circuit board of IndusEye RS3 module"
                  width={500}
                  height={400}
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-primary border border-primary/30">
                INDUSEYE RS3 // PCB ARCHITECTURE REV 2.2
              </div>
            </div>

            {/* Content List */}
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-accent">Engineered Inside</div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Compact outside. <br />
                <span className="text-gradient">Integrated inside.</span>
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                IndusEye RS3 integrates microcontroller logic, power management, RF front-ends, and relay drivers onto an engineered single-board PCB assembly.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">On-Board Controller &amp; Relay Drivers</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Handles millisecond radar filtering, optical trigger handshakes, and gate opening pulses directly at the edge.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">PLC &amp; Gate Bus Interfaces</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Compatible with standard industrial PLC controllers, CAN bus systems, and external magnetic access relays.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Modular Field Serviceability</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Toolless quick-disconnect terminals allow field technicians to service or swap units in under 5 minutes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Assembly & Build Process (Exploded Diagram) */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Precision Mechanical Stack</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Layered industrial construction.
            </h2>
            <p className="text-muted-foreground text-sm">
              Sealed enclosure, internal vibration isolators, and durable mounting bracket engineered for continuous duty.
            </p>
          </div>

          {/* Exploded Diagram View */}
          <div className="tech-border rounded-2xl p-8 bg-card/20 flex items-center justify-center relative">
            <Image
              src="/assets/products/product-exploded.png"
              alt="Exploded mechanical view of the IndusEye RS3 sensing module"
              width={700}
              height={450}
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-mono text-muted-foreground border border-white/10">
              INDUSEYE RS3 // MECHANICAL STACK
            </div>
          </div>

          {/* 4-Step Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-primary font-bold">01 · ENCLOSURE</div>
              <div className="text-sm font-bold text-white">Protective Shell</div>
              <p className="text-xs text-muted-foreground">Chemical &amp; detergent resistant polymer housing with silicone perimeter seals.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-accent font-bold">02 · ELECTRONICS</div>
              <div className="text-sm font-bold text-white">PCB Alignment</div>
              <p className="text-xs text-muted-foreground">High-density controller anchored on anti-vibration standoffs.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-primary font-bold">03 · INTEGRATION</div>
              <div className="text-sm font-bold text-white">Optical Coupling</div>
              <p className="text-xs text-muted-foreground">Cat-eye optical lens and 24 GHz antenna waveguide calibrated.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">04 · VALIDATION</div>
              <div className="text-sm font-bold text-white">Holding &amp; Seal Test</div>
              <p className="text-xs text-muted-foreground">Pre-calibrated holding-force test and pressure-sealed before shipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Manufacturing Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-card/60 to-background border-t border-border/40">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Local Manufacturing &amp; Circular Materials
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Better materials start with thoughtful design.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                By manufacturing enclosures from locally sourced recycled industrial polymers in the Greater Toronto Area, 22 Automations pairs environmental responsibility with ruggedized physical endurance.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Local Ontario Production</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Fast local parts availability, direct engineering support, and rapid turnaround across Canada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Recovered Polymer Feedstock</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Engineered composite blends withstand aggressive chemical washes, acidic detergents, and winter freezes.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Purpose-Built Form Factor</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Lightweight chassis design simplifies mounting on overhead tracks, gantries, and gate posts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="tech-border rounded-2xl p-6 bg-card/40 flex items-center justify-center">
                <Image
                  src="/assets/products/product-enclosed.png"
                  alt="Finished IndusEye RS3 unit enclosure"
                  width={380}
                  height={380}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner: 30-Day Pilot Unit */}
      <section className="py-16 px-6 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-primary/20 text-primary text-xs font-mono uppercase">
                <Zap className="w-3.5 h-3.5" /> Risk-Free Facility Evaluation
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Ready to test IndusEye RS3 in your wash bay or entrance?
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Get a pre-configured 30-day on-site pilot unit shipped to your facility with full integration guidance from our Ontario engineering desk.
              </p>
            </div>
            <button
              type="button"
              onClick={() => openModal('30-Day Pilot Unit')}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all glow-effect shrink-0 flex items-center gap-2"
            >
              Request a 30-Day On-Site Pilot Unit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Accessible Consultation / Pilot Request Modal Dialog */}
      <dialog
        ref={modalRef}
        id="va-enquiry-modal"
        aria-labelledby="va-modal-title"
        onClick={handleDialogClick}
        className="w-full max-w-xl p-0 bg-transparent rounded-2xl shadow-2xl backdrop:bg-black/85 backdrop:backdrop-blur-md"
      >
        <div className="tech-border bg-card/95 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl border border-white/20 text-foreground relative">
          {/* Close button */}
          <button
            type="button"
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-border bg-secondary/80 hover:bg-primary hover:text-black flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Modal Header */}
          <div className="space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-mono uppercase tracking-wider">
              IndusEye RS3 · Official Dispatch Desk
            </div>
            <h3 id="va-modal-title" className="text-2xl font-bold text-white">
              {formData.requestType === '30-Day Pilot Unit'
                ? 'Request a 30-Day On-Site Pilot Unit'
                : 'Schedule a Technical Consultation'}
            </h3>
            <p className="text-xs text-muted-foreground">
              Directly routed to our Ontario hardware engineering team at{' '}
              <strong className="text-primary font-mono">{RECIPIENT_EMAIL}</strong>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="modal-request-type" className="text-xs font-mono text-muted-foreground uppercase">
                Request Purpose
              </label>
              <select
                id="modal-request-type"
                name="requestType"
                value={formData.requestType}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 rounded-lg bg-secondary/80 border border-border text-foreground text-sm font-semibold focus:outline-none focus:border-primary"
              >
                <option value="30-Day Pilot Unit">30-Day On-Site Pilot / Trial Unit</option>
                <option value="Multi-Bay Rollout">Multi-Bay Facility Rollout (5-20 Bays)</option>
                <option value="Technical Consultation">Schedule Technical Consultation</option>
                <option value="OEM Volume Pricing">Request OEM &amp; Distributor Pricing RFQ</option>
                <option value="Datasheet Download">Datasheet &amp; Pinout Package</option>
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="modal-deployment" className="text-xs font-mono text-muted-foreground uppercase">
                Target Application Environment
              </label>
              <select
                id="modal-deployment"
                value={deploymentMode}
                onChange={(e) => setDeploymentMode(e.target.value as DeploymentEnvironment)}
                className="w-full px-3 py-2.5 rounded-lg bg-secondary/80 border border-border text-foreground text-sm font-semibold focus:outline-none focus:border-primary"
              >
                <option value="auto-spa">
                  Car Wash &amp; Auto Spa Tunnels (Foam, Mist &amp; Steam Proof)
                </option>
                <option value="fleet-bays">
                  Transit &amp; Fleet Maintenance Bays (Heavy Ingress/Egress)
                </option>
                <option value="industrial-dock">
                  High-Duty Industrial Entrances &amp; Loading Docks
                </option>
              </select>
            </div>

            {/* Anti-bot Honeypot Trap Field */}
            <div
              style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
              aria-hidden="true"
              tabIndex={-1}
            >
              <label htmlFor="fax_number">Do not fill this field</label>
              <input
                id="fax_number"
                name="fax_number"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={formData.fax_number}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="companyName" className="text-xs font-mono text-muted-foreground uppercase">
                  Company / Facility Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="e.g. Metro Auto Spa"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="userName" className="text-xs font-mono text-muted-foreground uppercase">
                  Contact Person
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  required
                  placeholder="e.g. Marcus Chen"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@autospa.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-xs font-mono text-muted-foreground uppercase">
                  Direct Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 (437) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="availableDate" className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" /> Target Date
                </label>
                <input
                  type="date"
                  id="availableDate"
                  name="availableDate"
                  min={todayStr}
                  required
                  value={formData.availableDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="availableTime" className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
                  <Clock className="w-3 h-3 text-accent" /> Preferred Time
                </label>
                <input
                  type="time"
                  id="availableTime"
                  name="availableTime"
                  required
                  value={formData.availableTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/80 border border-border text-foreground text-sm focus:outline-none focus:border-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Status Message */}
            {formStatus && (
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed font-mono ${
                  formStatus.type === 'success'
                    ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                    : 'bg-primary/10 border border-primary/30 text-primary'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                'Submitting Request...'
              ) : (
                <>
                  Submit Request for IndusEye RS3 <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
