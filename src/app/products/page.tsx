import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import HardwareSensingProduct from '@/components/products/HardwareSensingProduct'
import { ArrowRight, ExternalLink } from 'lucide-react'

export const metadata = {
  title: "Products & Hardware Solutions | 22-Automations",
  description: "Explore 22-Automations products: IndusEye RS3 radar sensing hardware for auto spas and high-duty access, AI-GEO spatial models, POS CRM platforms, and IoT cloud workflows."
}

export default function Products() {
  const products = [
    {
      title: "IndusEye RS3",
      category: "Auto Spa & Access Hardware",
      description: "Millimeter-wave 24 GHz radar sensing unit with integrated cat-eye HD camera, ambient light sensor, and 1000 lb holding force rating for auto spas, fleet bays, and high-duty access.",
      image: "/assets/products/product-enclosed.png",
      features: ["24 GHz FMCW Radar", "HD Cat-Eye Optical Camera", "Light-Sensor Automation", "1000 lb Holding Force"],
      benefits: ["Steam & spray immune", "Zero false triggers", "Recycled polymer housing"],
      price: "Request Pilot Unit",
      link: "/products/sensing-unit",
      isHardware: true
    },
    {
      title: "AI-GEO Optimizations",
      category: "Geo-Spatial AI",
      description: "Optimize geographical resource planning, field routes, and spatial analytics with advanced machine learning models.",
      image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop",
      features: ["Route Optimization", "Demographics Analysis", "Spatial Trend Forecasting", "Custom Map Overlays"],
      benefits: ["30% reduction in fuel/time", "Data-driven site selection", "Interactive dashboards"],
      price: "Custom Pricing",
      link: "/contact"
    },
    {
      title: "POS CRM Softwares",
      category: "Business Operations",
      description: "Fully integrated Point of Sale and Customer Relationship Management systems to unify checkout and customer loyalty.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      features: ["Inventory Tracking", "Loyalty Programs", "Sales & Tax Reports", "Multi-store Syncing"],
      benefits: ["Seamless transactions", "Increased customer retention", "Automated stock alerts"],
      price: "From $149/month",
      link: "/contact"
    },
    {
      title: "IOT and AI Workflows and Solutions",
      category: "Smart Systems",
      description: "Automate sensor event triggers and orchestrate complex workflows by combining physical IoT hardware with cloud-based AI engines.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
      features: ["Edge Sensor Listeners", "AI Predictive Alerts", "Automated Actions Trigger", "OTA Device Fleet Console"],
      benefits: ["Real-time smart monitoring", "Preventative maintenance alerts", "End-to-end encryption"],
      price: "From $399/month",
      link: "/contact"
    },
    {
      title: "Email and SMS Marketing",
      category: "Marketing Automation",
      description: "Supercharge your audience outreach and conversions with an automated message scheduler, templates, and analytics tracker.",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&h=400&fit=crop",
      features: ["Drip Campaign Designer", "High-Deliverability Routing", "Audience Segmentation", "A/B Testing Engine"],
      benefits: ["Maximized email delivery", "Personalized SMS triggers", "Real-time CTR analytics"],
      price: "From $99/month",
      link: "/contact"
    }
  ]

  const stats = [
    { value: "24 GHz", label: "Millimeter-Wave Radar" },
    { value: "1000 lb", label: "Holding Force Rated" },
    { value: "99.9%", label: "Hardware Reliability" },
    { value: "24/7", label: "Industrial Support" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              22-Automations
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/products" className="text-primary">Products</Link>
              <Link href="/products/sensing-unit" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                IndusEye RS3
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all glow-effect"
            >
              Consult an Engineer
            </Link>
          </div>
        </div>
      </nav>

      {/* Featured Flagship Product Section: IndusEye RS3 */}
      <div className="pt-24 border-b border-border/40">
        <HardwareSensingProduct />
      </div>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="tech-border bg-card/40 text-center hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-3xl lg:text-4xl font-extrabold font-mono text-gradient mb-2">{stat.value}</div>
                  <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Products Catalog Grid */}
      <section className="py-20 px-6" id="catalog">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Comprehensive Catalog</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Industrial Hardware &amp; Software Solutions
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Engineered systems built to eliminate bottlenecks, automate sensing triggers, and deliver measurable operational ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="tech-border bg-card/40 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
                <div>
                  <div className="relative overflow-hidden aspect-video bg-black/40 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="bg-black/70 backdrop-blur-md text-[11px] font-mono border border-white/10">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 text-primary-foreground font-mono text-[11px] backdrop-blur-sm">
                        {product.price}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{product.title}</span>
                      {product.isHardware && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/20 text-primary uppercase">
                          Hardware
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground leading-relaxed">
                      {product.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Features */}
                    <div>
                      <div className="text-xs font-mono font-semibold text-primary mb-2 uppercase tracking-wider">Key Specifications:</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {product.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div>
                      <div className="text-xs font-mono font-semibold text-accent mb-2 uppercase tracking-wider">Operational Benefits:</div>
                      <div className="space-y-1">
                        {product.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="text-xs text-muted-foreground flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </div>

                <div className="p-6 pt-0">
                  <div className="flex gap-2 border-t border-border/40 pt-4">
                    {product.link ? (
                      <Link href={product.link} className="flex-1">
                        <Button variant="default" size="sm" className="w-full text-xs font-bold gap-1">
                          {product.isHardware ? 'IndusEye RS3 Deep Dive' : 'Learn More'} <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    ) : (
                      <Link href="/contact" className="flex-1">
                        <Button variant="default" size="sm" className="w-full text-xs font-bold gap-1">
                          Enquire <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    )}
                    <Link href="/contact" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-medium border-border/80 hover:border-primary/50">
                        Consultation
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Custom Engineering Section */}
      <section className="py-20 px-6 bg-secondary/10">
        <div className="container mx-auto max-w-4xl">
          <Card className="tech-border bg-card/60 glow-effect text-center p-8 sm:p-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider mx-auto">
              Custom Industrial Engineering
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Need <span className="text-gradient">Custom</span> Sensing or Robotics?
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              From PCB spin-outs to proprietary sensor enclosures and cloud IoT gateways, our Ontario-based engineering team designs, builds, and deploys turn-key hardware systems.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4 text-left">
              <div className="p-4 rounded-lg bg-card/40 border border-border/40">
                <div className="text-sm font-bold text-primary mb-1">Embedded Firmware</div>
                <p className="text-xs text-muted-foreground">ESP32-S3, STM32, CAN Bus, and Modbus RTU integration.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/40 border border-border/40">
                <div className="text-sm font-bold text-accent mb-1">Tooling &amp; Enclosures</div>
                <p className="text-xs text-muted-foreground">Rapid 3D prototype to injection molded recycled polymer housings.</p>
              </div>
              <div className="p-4 rounded-lg bg-card/40 border border-border/40">
                <div className="text-sm font-bold text-primary mb-1">On-Site Commissioning</div>
                <p className="text-xs text-muted-foreground">Direct installation and calibration across the GTA and Ontario.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/products/sensing-unit">
                <Button size="lg" className="text-sm font-bold px-8 py-6 glow-effect">
                  Request a 30-Day Pilot Unit
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="text-sm font-bold px-8 py-6 border-border hover:border-primary">
                  Speak With an Engineer
                </Button>
              </Link>
            </div>
            <div className="text-xs font-mono text-muted-foreground border-t border-border/40 pt-6">
              Engineering desk:{' '}
              <a href="mailto:automations.22@outlook.com" className="text-primary hover:underline font-semibold mx-1">
                automations.22@outlook.com
              </a>{' '}
              | Tel:{' '}
              <a href="tel:4378084197" className="text-primary hover:underline font-semibold mx-1">
                +1 (437) 808-4197
              </a>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40 bg-card/40">
        <div className="container mx-auto text-center space-y-4">
          <Link href="/" className="text-2xl font-bold text-gradient inline-block">
            22-Automations
          </Link>
          <p className="text-xs font-mono text-muted-foreground max-w-md mx-auto">
            Industrial Automation, Embedded Radar Hardware &amp; AI-Powered Operations.
          </p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/products/sensing-unit" className="hover:text-primary transition-colors">IndusEye RS3</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground/60">
            © 22-Automations. All rights reserved. Brampton &amp; Greater Toronto Area, ON.
          </div>
        </div>
      </footer>
    </div>
  )
}
