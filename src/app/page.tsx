import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ParticleSystem from '@/components/ParticleSystem'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import HeroVideoBackground from '@/components/HeroVideoBackground'
import Link from 'next/link'
import Image from 'next/image'
import geoAssets from "./geo-assets.json"
import { ArrowRight, Radio, Eye, Sun, ShieldCheck, Sparkles, Cpu, Layers, ExternalLink, Zap, Building2, Sliders, CheckCircle2 } from 'lucide-react'

export const metadata = {
  title: "22-Automations | Industrial IoT, Radar Sensors & AI Systems GTA",
  description: "Precise Identification, Autonomous Flow. Engineered for Auto Spa's & High-Duty Access. Industrial 24 GHz radar hardware, edge electronics, and custom AI workflows."
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
          <span className="hidden md:inline text-white/80">
            ONTARIO PRODUCTION: GTA ASSEMBLY
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
      <nav className="sticky top-0 w-full z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              <span className="text-gradient">22-Automations</span>
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link href="/products/sensing-unit" className="text-primary hover:text-primary transition-colors flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                IndusEye RS3
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            <Link href="/products/sensing-unit">
              <Button className="glow-effect font-mono text-xs uppercase tracking-wider bg-primary text-black hover:brightness-110 font-bold px-4 py-2">
                [ Request Pilot Unit ↗ ]
              </Button>
            </Link>
          </div>
        </div>
      </nav>

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
                <span className="block text-gradient drop-shadow-lg">Connect Every Machine.</span>
                <span className="block text-white drop-shadow-lg">Automate Every Access.</span>
              </h1>

              <div className="space-y-2">
                <p className="text-lg md:text-xl font-semibold text-white/90">
                  Engineered for Auto Spa's &amp; High-Duty Industrial Access.
                </p>
                <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed backdrop-blur-sm bg-background/30 rounded-xl p-4 border border-white/10 font-sans">
                  From proprietary 24 GHz millimeter-wave sensing enclosures that ignore soap foam and steam to turn-key AI workflows, 22 Automations bridges physical facilities with autonomous digital control.
                </p>
              </div>

              {/* GEO Answer-First Summary */}
              {geoAssets && geoAssets.answer_first_summary && (
                <p className="text-xs font-mono text-muted-foreground max-w-2xl mx-auto leading-relaxed border-l-4 border-primary pl-4 py-2 italic bg-primary/5 rounded-r-lg text-left">
                  {geoAssets.answer_first_summary}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
                <Link href="/products/sensing-unit">
                  <Button size="lg" className="text-sm font-mono uppercase tracking-wider px-8 py-6 glow-effect animate-pulse-glow backdrop-blur-md gap-2 font-bold bg-primary text-black hover:brightness-110 shadow-[0_0_25px_rgba(0,255,255,0.4)]">
                    Request a 30-Day Pilot Unit <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="text-sm font-mono uppercase tracking-wider px-8 py-6 glass-effect backdrop-blur-md border-border/80 hover:border-primary/50 text-white font-medium">
                    Explore Product Catalog
                  </Button>
                </Link>
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

                {/* Dual Deployment Config Pill */}
                <div className="p-4 rounded-xl tech-border bg-secondary/50 space-y-2">
                  <div className="text-xs font-mono text-muted-foreground uppercase">Supported Configurations:</div>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-start gap-2 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
                      <span><strong>Commercial:</strong> Car-Wash, Fleet Bays &amp; Industrial Entrances/Docks</span>
                    </div>
                    <div className="flex items-start gap-2 text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span><strong>Residential:</strong> Smart Gates, Entry Doors &amp; Garages</span>
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

            {/* AI Solutions */}
            <Card className="tech-border bg-card/40 hover:bg-card/70 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl text-white">AI Models &amp; Workflows</CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                  Intelligent predictive models and automated pipelines that replace repetitive manual tasks.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5 text-xs text-muted-foreground font-mono">
                  <li>• Predictive Maintenance</li>
                  <li>• Optical Inspection Models</li>
                  <li>• Automated Lead Routing</li>
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
      {geoAssets && geoAssets.suggested_faqs && geoAssets.suggested_faqs.length > 0 && (
        <section className="py-20 px-6 border-t border-border/20">
          <div className="container mx-auto max-w-4xl space-y-8">
            <div className="text-center space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-primary">Technical FAQ</div>
              <h2 className="text-3xl font-bold text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                Verified answers regarding 22-Automations engineering and services.
              </p>
            </div>
            <div className="space-y-4">
              {geoAssets.suggested_faqs.map((faq: { question: string; answer: string }, idx: number) => (
                <Card key={idx} className="tech-border bg-card/40">
                  <CardHeader className="p-6">
                    <CardTitle className="text-lg text-primary">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final Call to Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="tech-border bg-card/60 glow-effect p-8 sm:p-12 space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Ready to <span className="text-gradient">Automate</span> What's Next?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Schedule a technical session with our Ontario engineering team or request an IndusEye RS3 pilot unit for your facility.
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

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40 bg-card/40">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <Link href="/" className="text-2xl font-bold text-gradient inline-block">
            22-Automations
          </Link>
          <p className="text-xs font-mono text-muted-foreground max-w-md mx-auto">
            Industrial Automation, Embedded Radar Hardware &amp; AI-Powered Operations. Brampton &amp; Greater Toronto Area.
          </p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <a href="#services" className="hover:text-primary transition-colors">Services</a>
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/products/sensing-unit" className="hover:text-primary transition-colors">IndusEye RS3</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground/60">
            Email: <a href="mailto:automations.22@outlook.com" className="text-primary hover:underline">automations.22@outlook.com</a> · Tel: +1 (437) 808-4197
          </div>
        </div>
      </footer>
    </div>
  )
}
