import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ParticleSystem from '@/components/ParticleSystem'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import HeroVideoBackground from '@/components/HeroVideoBackground'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Radio, Eye, Sun, ShieldCheck, Sparkles, Cpu, Layers, ExternalLink, Zap, Building2, Sliders, CheckCircle2, GraduationCap, Award, Check } from 'lucide-react'

export const metadata = {
  title: "22-Automations | IndusEye RS3 Radar & Enterprise AI Training",
  description: "Precise Identification, Autonomous Flow. Engineered for Auto Spas, Fleet Bays & High-Duty Access. Industrial 24 GHz FMCW radar hardware and Enterprise AI Training."
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary selection:text-black">
      {/* Top Industrial Telemetry Bar */}
      <div className="w-full bg-secondary/80 border-b border-border/60 py-1.5 px-6 text-[11px] font-mono text-muted-foreground flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            22-OS TELEMETRY: ACTIVE
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span className="hidden sm:inline text-emerald-400">
            FMCW RADAR: 24.125 GHz CALIBRATED
          </span>
          <span className="hidden md:inline text-border">|</span>
          <span className="hidden md:inline text-accent">
            ENTERPRISE AI TRAINING: CORPORATE COHORTS OPEN
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-accent font-semibold">PILOT UNITS AVAILABLE</span>
          <Link href="/products/sensing-unit" className="text-white hover:text-primary transition-colors underline underline-offset-2">
            Inspect IndusEye RS3 →
          </Link>
        </div>
      </div>

      {/* Particle System */}
      <ParticleSystem />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Video */}
        <HeroVideoBackground
          videoSources={[
            "https://cdn.pixabay.com/video/2022/12/11/142737-777617847_large.mp4",
            "https://cdn.pixabay.com/video/2021/08/31/87503-593720115_large.mp4",
            "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          ]}
          className="-z-20 opacity-30"
        />

        <div className="container mx-auto text-center relative z-10">
          <div className="relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 -z-10 opacity-20">
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30"></div>
            </div>

            {/* Main Hero Content */}
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Precise Identification, Autonomous Flow
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold hero-text-shadow tracking-tight leading-[1.05]">
                <span className="block text-gradient drop-shadow-lg">Industrial Radar Sensing.</span>
                <span className="block text-white drop-shadow-lg">Enterprise AI Training.</span>
              </h1>

              <div className="space-y-2">
                <p className="text-lg md:text-xl font-semibold text-white/90">
                  Engineered for Auto Spas, Fleet Bays, High-Duty Entrances, and Enterprise Engineering Workforces.
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-background/30 rounded-xl p-4 border border-white/10 font-sans">
                  From proprietary 24 GHz millimeter-wave sensing enclosures that ignore soap foam and steam to intensive Enterprise AI Training cohorts, 22-Automations bridges physical facilities and technical teams with mission-critical intelligence.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <Link href="/products/sensing-unit">
                  <Button size="lg" className="text-sm font-mono uppercase tracking-wider px-8 py-6 glow-effect animate-pulse-glow backdrop-blur-md gap-2 font-bold bg-primary text-black hover:brightness-110 shadow-[0_0_25px_rgba(0,255,255,0.4)]">
                    Request a 30-Day Pilot Unit <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <a href="#ai-training">
                  <Button size="lg" variant="outline" className="text-sm font-mono uppercase tracking-wider px-8 py-6 glass-effect backdrop-blur-md border-border/80 hover:border-accent text-white font-medium gap-2">
                    <GraduationCap className="w-4 h-4 text-accent" /> Explore AI Training
                  </Button>
                </a>
              </div>

              {/* Quick Spec Bar Ticker */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
                <div className="p-3 rounded-lg tech-border bg-card/60">
                  <div className="font-mono text-xs text-primary uppercase font-bold">24 GHz FMCW</div>
                  <div className="text-[11px] text-muted-foreground">Steam &amp; mist immune</div>
                </div>
                <div className="p-3 rounded-lg tech-border bg-card/60">
                  <div className="font-mono text-xs text-accent uppercase font-bold">1000 lb Rating</div>
                  <div className="text-[11px] text-muted-foreground">Magnetic lock coupling</div>
                </div>
                <div className="p-3 rounded-lg tech-border bg-card/60">
                  <div className="font-mono text-xs text-primary uppercase font-bold">HD Cat-Eye</div>
                  <div className="text-[11px] text-muted-foreground">Optical flow tracking</div>
                </div>
                <div className="p-3 rounded-lg tech-border bg-card/60">
                  <div className="font-mono text-xs text-emerald-400 uppercase font-bold">GTA Built</div>
                  <div className="text-[11px] text-muted-foreground">Recycled polymer shell</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Flagship Hardware Showcase Section */}
      <section className="py-20 px-6 bg-secondary/30 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="tech-border rounded-2xl p-8 sm:p-12 bg-card/70 glow-effect">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono uppercase tracking-wider">
                  <Radio className="w-3.5 h-3.5" /> Flagship Hardware Innovation
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                    IndusEye RS3
                  </h2>
                  <p className="text-base text-accent font-semibold font-mono">
                    Precise Identification, Autonomous Flow. Engineered for Auto Spa's &amp; High-Duty Access.
                  </p>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Traditional photo-eyes false trigger in soapy water spray, high-pressure mist, and extreme sunlight glare.
                  IndusEye RS3 integrates millimeter-wave radar detection with a cat-eye optical sensor and ambient light relay to trigger car-wash cycles and high-speed rolling doors with 100% reliability.
                </p>

                {/* Enterprise Deployment Configurations */}
                <div className="p-4 rounded-xl tech-border bg-secondary/50 space-y-2">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Target High-Duty Deployments:</div>
                  <div className="grid sm:grid-cols-3 gap-2 text-xs">
                    <div className="flex items-start gap-2 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span><strong>Auto Spa &amp; Car Wash Tunnels:</strong> Foam, steam &amp; spray proof</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span><strong>Transit &amp; Fleet Bays:</strong> High-cycle ingress &amp; egress</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span><strong>Industrial Docks:</strong> Sunlight &amp; vibration immune</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href="/products/sensing-unit">
                    <Button className="font-mono text-xs uppercase tracking-wider gap-2 px-6 py-5 bg-primary text-black font-bold hover:brightness-110">
                      Request 30-Day Pilot Unit <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="font-mono text-xs uppercase tracking-wider border-border/80 hover:border-primary/50 text-white px-6 py-5">
                      Schedule Tech Consultation
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-[360px] flex items-center justify-center p-6 tech-border rounded-2xl bg-black/40">
                  <Image
                    src="/assets/products/product-enclosed.png"
                    alt="IndusEye RS3 compact sensing and access module"
                    width={360}
                    height={360}
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                  />
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-primary border border-primary/30">
                    INDUSEYE RS3 · FMCW SENSOR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise AI Training Flagship Showcase Section */}
      <section id="ai-training" className="py-20 px-6 bg-secondary/20 border-b border-border/40">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs font-mono font-semibold tracking-wider uppercase">
              <GraduationCap className="w-4 h-4 text-accent" />
              Corporate Technical Enablement
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Enterprise <span className="text-gradient">AI Training</span> Cohorts
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              Upskill corporate engineering departments and automation leadership to internalize mission-critical AI. From edge sensor signal processing to enterprise agent systems, our curriculum eliminates agency dependencies and drives immediate ROI.
            </p>
          </div>

          {/* 4-Module Curriculum Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="tech-border bg-card/60 hover:bg-card/90 hover:border-accent/50 transition-all duration-300">
              <CardHeader className="p-6">
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
                  Module 01
                </div>
                <CardTitle className="text-lg text-white">Edge AI &amp; Sensor Fusion</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Radar FMCW Doppler spectral analysis, optical flow verification, and sub-15ms edge inference.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• FMCW Radar Signal DSP</li>
                  <li>• ESP32-S3 / ARM Deployment</li>
                  <li>• Noise &amp; Clutter Rejection</li>
                  <li>• Hardware-in-the-Loop Labs</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/60 hover:bg-card/90 hover:border-accent/50 transition-all duration-300">
              <CardHeader className="p-6">
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
                  Module 02
                </div>
                <CardTitle className="text-lg text-white">Enterprise LLMs &amp; Agents</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Production RAG pipelines, private on-premise model serving, and autonomous tool calling.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• Private Data Boundaries</li>
                  <li>• Autonomous Tool Calling</li>
                  <li>• Model Quantization (GGUF)</li>
                  <li>• Real-Time Alert Synthesis</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/60 hover:bg-card/90 hover:border-accent/50 transition-all duration-300">
              <CardHeader className="p-6">
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
                  Module 03
                </div>
                <CardTitle className="text-lg text-white">Predictive Maintenance</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Time-series anomaly detection on PLC telemetry streams, sensor drift, and degradation models.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• CAN &amp; Modbus Streaming</li>
                  <li>• Vibration &amp; Thermal Drift</li>
                  <li>• Preventative Trigger Logic</li>
                  <li>• Downtime Prevention ROI</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/60 hover:bg-card/90 hover:border-accent/50 transition-all duration-300">
              <CardHeader className="p-6">
                <div className="text-xs font-mono text-accent font-bold uppercase tracking-wider mb-2">
                  Module 04
                </div>
                <CardTitle className="text-lg text-white">AI Governance &amp; Security</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Zero-trust telemetry isolation, audit trails, tamper-resistant API gateways, and executive risk control.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• Zero-Trust Telemetry Logs</li>
                  <li>• Adversarial Red-Teaming</li>
                  <li>• Executive AI Strategy</li>
                  <li>• Regulatory Compliance</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Options & Booking Callout */}
          <div className="tech-border rounded-xl p-8 bg-card/80 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                Cohort Packages Available
              </div>
              <h3 className="text-2xl font-bold text-white">
                6-Week Technical Cohorts &amp; 2-Day Executive Strategy Intensives
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Tailored for engineering teams up to 20 seats. Includes dedicated sandbox environments, code reviews, and enterprise architecture blueprints.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href="/contact">
                <Button className="font-mono text-xs uppercase tracking-wider gap-2 px-6 py-5 bg-accent text-white font-bold hover:brightness-110 shadow-[0_0_20px_rgba(255,100,255,0.3)]">
                  Inquire Corporate Cohort <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Core Capabilities Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Core Engineering Disciplines</div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              <span className="text-gradient">End-to-End</span> Automation &amp; AI
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              From embedded microcontrollers to scalable cloud platforms, we engineer solutions that eliminate friction and scale effortlessly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* App Development */}
            <Card className="tech-border bg-card/40 hover:bg-card/70 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <Layers className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-white">App Development</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Native iOS, Android, and cross-platform applications engineered for low latency and high reliability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• iOS &amp; Android Platforms</li>
                  <li>• React Native &amp; Flutter</li>
                  <li>• Real-Time WebSocket Feeds</li>
                  <li>• Industrial Tablet UIs</li>
                </ul>
              </CardContent>
            </Card>

            {/* Web Development */}
            <Card className="tech-border bg-card/40 hover:bg-card/70 hover:border-accent/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 text-accent">
                  <Cpu className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-white">Web &amp; Cloud Platforms</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  High-performance web apps, administrative portals, and client portals built on Next.js.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• Next.js 15 App Router</li>
                  <li>• High-Throughput APIs</li>
                  <li>• Responsive Telemetry UIs</li>
                  <li>• Secure RBAC Portals</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Training & Neural Models */}
            <Card className="tech-border bg-card/40 hover:bg-card/70 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-white">AI Training &amp; Neural Models</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Intelligent predictive models, fine-tuning, and corporate engineering enablement programs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• Predictive Maintenance</li>
                  <li>• Optical Inspection Models</li>
                  <li>• Enterprise Cohorts</li>
                  <li>• Multi-Modal AI Agents</li>
                </ul>
              </CardContent>
            </Card>

            {/* IOT & Hardware Solutions */}
            <Card className="tech-border bg-card/40 hover:bg-card/70 hover:border-emerald-500/50 transition-all duration-300 relative overflow-hidden">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                  <Radio className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-white flex items-center justify-between gap-2">
                  IoT &amp; Hardware
                  <Badge variant="secondary" className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">
                    ACTIVE
                  </Badge>
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Embedded radar, camera verification, and single-board electronics engineered in Ontario.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• 24 GHz Radar Sensing</li>
                  <li>• ESP32-S3 PCB Firmware</li>
                  <li>• Industrial Enclosure Tooling</li>
                  <li>• CAN / Modbus Integration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 border-t border-border/20">
        <div className="container mx-auto max-w-4xl space-y-8">
          <div className="text-center space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Technical FAQ</div>
            <h2 className="text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              Verified answers regarding IndusEye RS3 radar specifications and Enterprise AI Training.
            </p>
          </div>
          <div className="space-y-4">
            <Card className="tech-border bg-card/40">
              <CardHeader className="p-6">
                <CardTitle className="text-lg text-primary">
                  How does IndusEye RS3 outperform optical photo-eyes in car washes and auto spas?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                Traditional optical sensors fail when coated with chemical soap froth, high-pressure water mist, or blinded by direct sunlight glare. IndusEye RS3 uses 24 GHz millimeter-wave FMCW radar calibrated at 24.125 GHz, penetrating airborne steam and foam curtains with 100% trigger accuracy.
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/40">
              <CardHeader className="p-6">
                <CardTitle className="text-lg text-primary">
                  What formats and curriculum are available for Enterprise AI Training?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                We deliver 6-Week Technical Engineering Cohorts (up to 20 seats) with dedicated labs in Edge AI, LLM Agent Architectures, Predictive Maintenance Telemetry, and AI Governance, as well as 2-Day Executive Strategy Intensives for operational leadership.
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/40">
              <CardHeader className="p-6">
                <CardTitle className="text-lg text-primary">
                  How does the 30-day on-site IndusEye RS3 pilot program work?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                We dispatch pre-calibrated evaluation units with plug-and-play wiring harnesses directly to your facility for live bay testing, backed by direct engineering support from our Greater Toronto Area hardware team.
              </CardContent>
            </Card>

            <Card className="tech-border bg-card/40">
              <CardHeader className="p-6">
                <CardTitle className="text-lg text-primary">
                  What is the typical commercial payback period for multi-bay retrofits?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                Commercial operators typically achieve full return on investment within 60 to 90 days by eliminating false door cycles, preventing vehicle collision damage, and cutting building thermal heating losses during Canadian winter cycles.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="tech-border bg-card/60 glow-effect p-8 sm:p-12 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to <span className="text-gradient">Scale Operations</span> Towards Seven Figures?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Schedule an enterprise consultation with our Ontario engineering team or request an IndusEye RS3 pilot unit for your facility.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/products/sensing-unit">
                <Button size="lg" className="font-mono text-xs uppercase tracking-wider px-8 py-6 glow-effect bg-primary text-black font-bold">
                  Request a 30-Day Pilot Unit
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="font-mono text-xs uppercase tracking-wider px-8 py-6 border-border hover:border-primary text-white">
                  Speak With an Engineer
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
