'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
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
  ShieldCheck,
  Cpu,
  Layers,
  Building2,
  Home as HomeIcon,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface HardwareSensingProductProps {
  onContactClick?: () => void
  initialMode?: 'commercial' | 'residential'
}

export default function HardwareSensingProduct({
  onContactClick,
  initialMode = 'commercial'
}: HardwareSensingProductProps) {
  const [deploymentMode, setDeploymentMode] = useState<'commercial' | 'residential'>(initialMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null)

  // Modal dialog ref
  const modalRef = useRef<HTMLDialogElement>(null)

  // Form inputs state
  const todayStr = new Date().toISOString().split('T')[0]
  const [formData, setFormData] = useState({
    companyName: '',
    userName: '',
    email: '',
    phone: '',
    availableDate: todayStr,
    availableTime: '10:00'
  })

  const RECIPIENT_EMAIL = 'automations.22@outlook.com'

  const openModal = () => {
    setFormStatus(null)
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

  // Handle backdrop click to close dialog
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus(null)

    const useLabel = deploymentMode === 'commercial' ? 'Commercial Use' : 'Residential Use'
    const mailtoSubject = encodeURIComponent(`22 Automations Product Enquiry - ${useLabel} (${formData.companyName})`)
    const mailtoBody = encodeURIComponent(
      `22 Automations Product Consultation Request:\n` +
      `----------------------------------------\n` +
      `Selected Option : ${useLabel}\n` +
      `Company Name    : ${formData.companyName}\n` +
      `User Name       : ${formData.userName}\n` +
      `Email Address   : ${formData.email}\n` +
      `Phone Number    : ${formData.phone}\n` +
      `Preferred Date  : ${formData.availableDate}\n` +
      `Preferred Time  : ${formData.availableTime}\n`
    )
    const mailtoUrl = `mailto:${RECIPIENT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`

    const payload = {
      _subject: `New 22 Automations Hardware Enquiry (${useLabel})`,
      _template: 'table',
      _captcha: 'false',
      Deployment_Option: useLabel,
      Company_Name: formData.companyName,
      User_Name: formData.userName,
      Email: formData.email,
      Phone_Number: formData.phone,
      Available_Date: formData.availableDate,
      Available_Time: formData.availableTime
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
          message: `✓ Your enquiry for ${useLabel} (${formData.availableDate} at ${formData.availableTime}) has been sent to ${RECIPIENT_EMAIL}. Our engineering team will contact you shortly.`
        })
        setFormData({
          companyName: '',
          userName: '',
          email: '',
          phone: '',
          availableDate: todayStr,
          availableTime: '10:00'
        })
      } else {
        window.location.href = mailtoUrl
        setFormStatus({
          type: 'info',
          message: `Connecting with ${RECIPIENT_EMAIL} via your email client...`
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
        {/* Background Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-semibold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Car-Wash & Industrial Sensing Platform
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
                Smarter sensing. <br />
                <span className="text-gradient">Smoother flow.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                A compact, ruggedized sensing unit engineered for automated car-wash and smart access environments.
                Unifies 24 GHz radar detection, cat-eye optical verification, and ambient light control into one reliable hardware platform.
              </p>

              {/* Deployment Option Selector */}
              <div className="p-4 rounded-xl tech-border backdrop-blur-md max-w-md space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="deployment-mode" className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Deployment Configuration
                  </label>
                  <span className="text-[11px] font-mono text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Configurable Mode
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                    {deploymentMode === 'commercial' ? <Building2 className="w-4 h-4" /> : <HomeIcon className="w-4 h-4" />}
                  </div>
                  <select
                    id="deployment-mode"
                    value={deploymentMode}
                    onChange={(e) => setDeploymentMode(e.target.value as 'commercial' | 'residential')}
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-secondary/60 border border-border text-foreground font-semibold text-sm appearance-none cursor-pointer focus:outline-none focus:border-primary transition-colors"
                  >
                    <option value="commercial">Commercial Use (Car-Wash & Fleet Bays)</option>
                    <option value="residential">Residential Use (Smart Gates & Garages)</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  type="button"
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all glow-effect"
                >
                  Schedule Technical Consultation <ExternalLink className="w-4 h-4" />
                </button>
                <a
                  href="#specs-breakdown"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-border bg-card/60 hover:bg-card text-foreground font-medium text-sm transition-all hover:border-primary/50"
                >
                  Explore Specifications <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                Engineered & assembled for demanding industrial conditions
              </div>
            </div>

            {/* Right Visual Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-[460px] mx-auto rounded-2xl tech-border p-6 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
                <div className="relative w-full h-full flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105">
                  <Image
                    src="/assets/products/product-enclosed.png"
                    alt="22 Automations compact sensing unit in ruggedized enclosure"
                    width={440}
                    height={440}
                    priority
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                  />
                </div>

                {/* Floating Tag */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto px-4 py-2.5 rounded-xl tech-border bg-background/80 backdrop-blur-md shadow-xl text-xs space-y-0.5">
                  <div className="font-bold text-foreground">Compact Integrated Enclosure</div>
                  <div className="font-mono text-[11px] text-muted-foreground">
                    {deploymentMode === 'commercial' ? 'Commercial Edition · Industrial Rating' : 'Residential Edition · Smart Access'}
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
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl tech-border bg-card/70 backdrop-blur-xl">
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
            *Approximately 500 kg-force as configured. Stated holding force subject to mounting substrate and testing conditions.
          </p>
        </div>
      </section>

      {/* Core Capabilities Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="max-w-2xl space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Core Capabilities</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Purpose-built for sensing, verification & access.
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Every critical subsystem is integrated into one low-maintenance enclosure so car-wash operators and facility managers enjoy frictionless automation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Radio className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">24 GHz Radar Sensing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Reliable millimeter-wave detection that ignores steam, soap spray, water droplets, and direct sunlight.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-accent/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">HD Optical Verification</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Integrated cat-eye lens delivers wide-angle visual confirmation alongside radar telemetry for complete vehicle tracking.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-primary/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Ambient Light Sensor</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dynamic luminosity detection triggers entrance bay illumination and ensures consistent camera contrast in day or night cycles.
              </p>
            </div>

            <div className="p-6 rounded-xl tech-border bg-card/40 hover:bg-card/70 hover:border-accent/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-lg bg-accent/10 border border-accent/20 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Compact Form Factor</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Small footprint designed for direct mounting on wash gantries, overhead tracks, gate posts, and bollards.
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
                  alt="High-density printed circuit board of 22 Automations sensing module"
                  width={500}
                  height={400}
                  className="object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                />
              </div>
              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-black/70 backdrop-blur-md text-[11px] font-mono text-primary border border-primary/30">
                PCB ARCHITECTURE // REV 2.2
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
                Rather than daisy-chaining disparate sensors, the 22 Automations unit consolidates microprocessing, power management, and high-frequency RF front-ends onto an engineered single-board architecture.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Single-Board Microcontroller & Power Regulation</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Integrated high-performance controller handles on-device radar filtering and relay triggering with onboard transient voltage protection.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">High-Speed Radar & Camera Bus</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Direct low-latency header channels telemetry into PLC controllers or facility management automation systems.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm text-white">Industrial Serviceability</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Modular internal layout allows quick field inspection, firmware updates, and simple connector swap-outs.
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
            <div className="text-xs font-mono uppercase tracking-wider text-primary">From Components to System</div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Precision mechanical assembly.
            </h2>
            <p className="text-muted-foreground text-sm">
              An exploded view of the sealed enclosure, internal dampers, and vibration-resistant mounting stack.
            </p>
          </div>

          {/* Exploded Diagram View */}
          <div className="tech-border rounded-2xl p-8 bg-card/20 flex items-center justify-center relative">
            <Image
              src="/assets/products/product-exploded.png"
              alt="Exploded mechanical view of the 22 Automations sensing module"
              width={700}
              height={450}
              className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-mono text-muted-foreground border border-white/10">
              LAYERED EXPLODED SCHEMATIC
            </div>
          </div>

          {/* 4-Step Process Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-primary font-bold">01 · ENCLOSURE</div>
              <div className="text-sm font-bold text-white">Protective Shell</div>
              <p className="text-xs text-muted-foreground">Rugged polymer chassis prepared with weather seals.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-accent font-bold">02 · ELECTRONICS</div>
              <div className="text-sm font-bold text-white">PCB Placement</div>
              <p className="text-xs text-muted-foreground">Single-board controller aligned and secured to internal mounts.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-primary font-bold">03 · INTEGRATION</div>
              <div className="text-sm font-bold text-white">Optics & Radar Link</div>
              <p className="text-xs text-muted-foreground">Cat-eye lens coupled to aperture and radar wave guides seated.</p>
            </div>
            <div className="p-5 rounded-xl tech-border bg-card/40 space-y-2">
              <div className="text-xs font-mono text-emerald-400 font-bold">04 · VALIDATION</div>
              <div className="text-sm font-bold text-white">Testing & Seal Check</div>
              <p className="text-xs text-muted-foreground">Bench-tested for holding force, radar calibration, and seal integrity.</p>
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
                Local Manufacturing & Circular Materials
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Better materials start with thoughtful engineering.
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                By leveraging locally sourced, high-durability recycled polymers for enclosure tooling, 22 Automations diverts technical plastic waste while cutting logistics carbon emissions.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Local Canadian Production</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Shortened manufacturing chain based right in the Greater Toronto Area for rapid parts turnaround.
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
                      Engineered composite blends withstand impact, chemical wash detergents, and extreme temperature swings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">Purpose-Fit Enclosure</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Low environmental footprint without compromising electronic shielding or structural holding force.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="tech-border rounded-2xl p-6 bg-card/40 flex items-center justify-center">
                <Image
                  src="/assets/products/product-enclosed.png"
                  alt="Finished enclosure made with recycled polymer composite"
                  width={380}
                  height={380}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-6 bg-primary/10 border-y border-primary/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Planning a smarter car-wash or access setup?
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Consult with our engineering team regarding pinouts, integration with existing PLC controllers, and trial units.
              </p>
            </div>
            <button
              type="button"
              onClick={openModal}
              className="px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all glow-effect shrink-0 flex items-center gap-2"
            >
              Contact 22 Automations <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Consultation & Availability Modal Dialog (Accessible Native Dialog) */}
      <dialog
        ref={modalRef}
        id="va-enquiry-modal"
        aria-labelledby="va-modal-title"
        onClick={handleDialogClick}
        className="w-full max-w-xl p-0 bg-transparent rounded-2xl shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-md"
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
              Product Enquiry & Consultation
            </div>
            <h3 id="va-modal-title" className="text-2xl font-bold text-white">
              Schedule Your Technical Consultation
            </h3>
            <p className="text-xs text-muted-foreground">
              Select your preferred date & time. Our GTA engineering team directly reviews all submissions via{' '}
              <strong className="text-primary font-mono">{RECIPIENT_EMAIL}</strong>.
            </p>
          </div>

          {/* Active Mode Pill */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/60 border border-border/80 text-xs font-mono text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Active Configuration:{' '}
            <strong className="text-white capitalize">{deploymentMode} Use</strong>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="modal-deployment" className="text-xs font-mono text-muted-foreground uppercase">
                Selected Application Environment
              </label>
              <select
                id="modal-deployment"
                value={deploymentMode}
                onChange={(e) => setDeploymentMode(e.target.value as 'commercial' | 'residential')}
                className="w-full px-3 py-2.5 rounded-lg bg-secondary/60 border border-border text-foreground text-sm font-semibold focus:outline-none focus:border-primary"
              >
                <option value="commercial">Commercial Use (Car-Wash, Fleet, Industrial Gates)</option>
                <option value="residential">Residential Use (Smart Gates, Private Access)</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="companyName" className="text-xs font-mono text-muted-foreground uppercase">
                  Company / Organization
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  required
                  placeholder="Facility or Company name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="userName" className="text-xs font-mono text-muted-foreground uppercase">
                  Your Full Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="email" className="text-xs font-mono text-muted-foreground uppercase">
                  Business Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="you@domain.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-xs font-mono text-muted-foreground uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  placeholder="+1 (437) 000-0000"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="availableDate" className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-primary" /> Preferred Date
                </label>
                <input
                  type="date"
                  id="availableDate"
                  name="availableDate"
                  min={todayStr}
                  required
                  value={formData.availableDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary cursor-pointer"
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
                  className="w-full px-3 py-2 rounded-lg bg-secondary/60 border border-border text-foreground text-sm focus:outline-none focus:border-primary cursor-pointer"
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
              className="w-full mt-2 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm tracking-wide hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {isSubmitting ? (
                'Submitting Enquiry...'
              ) : (
                <>
                  Send Enquiry to 22 Automations <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
