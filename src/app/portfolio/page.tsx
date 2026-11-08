import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ParticleSystem from '@/components/ParticleSystem'
import { ArrowRight, CheckCircle2, ShieldCheck, Cpu, Radio, Award } from 'lucide-react'

export const metadata = {
  title: "Case Studies & Deployments | 22-Automations",
  description: "Explore real-world enterprise deployments of IndusEye RS3 24 GHz FMCW radar sensing units and Enterprise AI Training cohorts across commercial auto spas, fleet hubs, and industrial facilities."
}

export default function Portfolio() {
  const projects = [
    {
      title: "Commercial Car Wash Multi-Bay FMCW Radar Rollout",
      category: "Industrial Hardware & Radar",
      badgeIcon: Radio,
      description: "Replaced failure-prone photoelectric optical sensors across 34 high-volume wash bays with IndusEye RS3 radar units immune to detergent foam, high-pressure steam, and water spray.",
      image: "/assets/products/product-enclosed.png",
      technologies: ["24 GHz FMCW Radar", "Optical Sensor Fusion", "IndusEye RS3", "Industrial Relays"],
      results: [
        "99.98% vehicle detection accuracy under heavy foam",
        "Zero optical wash-tunnel false stops",
        "$180,000 estimated annual downtime savings"
      ],
      link: "/products/sensing-unit",
      cta: "Inspect IndusEye RS3"
    },
    {
      title: "Tier-1 Logistics Hub: Autonomous FMCW Radar Dock Access",
      category: "Logistics & Access Automation",
      badgeIcon: ShieldCheck,
      description: "Autonomous truck identification and gantry gate actuation system deployed across 18 high-duty distribution dock bays with 1000 lb holding force interlocks.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      technologies: ["IndusEye RS3", "Cat-Eye HD Camera", "1000 lb Coupling", "RS-485 Modbus"],
      results: [
        "4.2 minute reduction in dock entry turnaround",
        "100% steam, rain, and fog penetration",
        "$220,000 annualized throughput gain"
      ],
      link: "/products/sensing-unit",
      cta: "Explore Fleet Specs"
    },
    {
      title: "Fortune 500 Manufacturing: Enterprise AI Training Cohort",
      category: "Enterprise AI Training",
      badgeIcon: Cpu,
      description: "Intensive 8-week corporate training cohort upskilling 45 senior industrial engineers in edge ML, predictive maintenance telemetry pipelines, and sovereign LLM deployment.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
      technologies: ["Edge ML", "Python / PyTorch", "Sensor Fusion", "LLM Governance"],
      results: [
        "45 senior engineers certified in edge AI",
        "4 internal autonomous pilots successfully deployed",
        "Zero long-term reliance on third-party agencies"
      ],
      link: "/contact",
      cta: "Schedule Cohort Briefing"
    },
    {
      title: "Commercial Fleet Depot: Sub-Zero Perimeter Radar Gate",
      category: "High-Duty Access Hardware",
      badgeIcon: Radio,
      description: "24 GHz FMCW radar sensing unit installed at commercial fleet perimeter gates, replacing saw-cut pavement magnetic ground loops that failed during winter freeze-thaw cycles.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      technologies: ["24 GHz FMCW", "Sub-Zero Rated Enclosure", "IndusEye RS3", "Dry Contact I/O"],
      results: [
        "Zero cold-weather misfires down to -35°C",
        "Zero saw-cut pavement loop failures",
        "$65,000 saved in civil asphalt cutting costs"
      ],
      link: "/products/sensing-unit",
      cta: "View Hardware Specs"
    },
    {
      title: "National Infrastructure: Corporate AI Governance & Workforces",
      category: "Enterprise AI Training",
      badgeIcon: Award,
      description: "Customized technical enablement and executive AI strategy intensive covering secure autonomous data architectures, risk containment, and sovereign LLM pipelines.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
      technologies: ["Sovereign LLMs", "Multi-Agent Architectures", "SOC2/ISO Compliance", "RAG Systems"],
      results: [
        "$420,000 verified operational cost reduction",
        "Air-gapped security and compliance verified",
        "Comprehensive workforce capability playbooks"
      ],
      link: "/contact",
      cta: "Request Curriculum"
    },
    {
      title: "Industrial Facility: Overhead Crane Anti-Collision Radar",
      category: "Industrial Sensing Hardware",
      badgeIcon: ShieldCheck,
      description: "Fail-safe millimeter-wave radar proximity sensing preventing heavy overhead gantry collisions in dense airborne dust and steam environments.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      technologies: ["IndusEye RS3 Core", "FMCW Distance Profiling", "Fail-Safe Relays", "IP67 Enclosure"],
      results: [
        "Zero collisions across 24 consecutive months",
        "12 ms real-time relay cut-off response",
        "100% dust and atmospheric obscuration immunity"
      ],
      link: "/products/sensing-unit",
      cta: "Request On-Site Pilot"
    }
  ]

  const stats = [
    { value: "$1.1M+", label: "Target B2B Pipeline Impact" },
    { value: "34+", label: "Commercial Auto Spa Bays Active" },
    { value: "99.98%", label: "Sensor Uptime & Detection" },
    { value: "100%", label: "Foam & Steam Immunity" }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-primary selection:text-black">
      {/* Background Particle System */}
      <ParticleSystem />

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 relative z-10 border-b border-border/40">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 font-mono text-xs uppercase tracking-wider bg-primary/10 text-primary border border-primary/20" variant="secondary">
            ⚡ Proven Field Deployments &amp; Case Studies
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            Autonomous Reliability in <span className="text-gradient">Mission-Critical</span> Environments
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            From high-volume commercial car-wash bays and industrial fleet loading docks to intensive Fortune 500 AI engineering cohorts, explore how 22-Automations eliminates operational downtime and scales enterprise capability.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Link href="/products/sensing-unit">
              <Button size="lg" className="font-mono text-xs uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110 shadow-[0_0_20px_rgba(0,255,255,0.3)]">
                Request a 30-Day Evaluation Pilot <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="font-mono text-xs uppercase tracking-wider glass-effect border-border/80 hover:border-accent text-white">
                Book Corporate AI Training Briefing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Operational Metrics Section */}
      <section className="py-16 px-6 relative z-10 bg-secondary/15 border-b border-border/40">
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

      {/* Case Studies Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-primary">Field-Tested Impact</div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Enterprise Deployments &amp; Verified Results
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Real-world metrics from commercial installations and executive engineering programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const Icon = project.badgeIcon
              return (
                <Card key={index} className="tech-border bg-card/40 hover:bg-card/70 hover:border-primary/50 transition-all duration-300 group overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative overflow-hidden aspect-video bg-black/50 flex items-center justify-center border-b border-border/40">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-black/80 backdrop-blur-md text-[11px] font-mono border border-white/10 flex items-center gap-1.5 text-white">
                          <Icon className="w-3 h-3 text-primary" />
                          {project.category}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="p-6 pb-4">
                      <CardTitle className="text-lg font-bold text-white group-hover:text-primary transition-colors leading-snug">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-muted-foreground mt-2 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="p-6 pt-0 space-y-4">
                      {/* Technologies */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-primary/80 mb-2">Technologies Used</div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-[10px] font-mono border-border/80 bg-background/50">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div>
                        <div className="text-[11px] font-mono uppercase tracking-wider text-accent mb-2">Verified Results</div>
                        <ul className="space-y-1.5">
                          {project.results.map((result, resultIndex) => (
                            <li key={resultIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                              <span>{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </div>

                  <div className="p-6 pt-0">
                    <Link href={project.link}>
                      <Button variant="outline" className="w-full font-mono text-xs uppercase tracking-wider glass-effect border-border hover:border-primary text-white hover:text-primary">
                        {project.cta} →
                      </Button>
                    </Link>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Enterprise CTA Section */}
      <section className="py-20 px-6 relative z-10 border-t border-border/40">
        <div className="container mx-auto max-w-4xl text-center">
          <Card className="tech-border bg-card/60 p-8 md:p-12">
            <CardContent className="space-y-6">
              <Badge className="font-mono text-xs uppercase tracking-wider bg-accent/15 text-accent border border-accent/30">
                Evaluation &amp; Procurement
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Scale Your Facility Flow or Engineering Capacity
              </h3>
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Whether deploying 24 GHz FMCW radar sensing units across your commercial bays or training your engineering team in sovereign AI architectures, 22-Automations delivers mission-critical execution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link href="/products/sensing-unit">
                  <Button size="lg" className="font-mono text-xs uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110">
                    Request 30-Day On-Site Pilot
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="font-mono text-xs uppercase tracking-wider glass-effect text-white hover:border-accent">
                    Contact Enterprise Procurement
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Centralized Global Footer */}
      <Footer />
    </div>
  )
}
