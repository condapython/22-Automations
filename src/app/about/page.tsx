import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: "About 22-Automations | Industrial Radar & Enterprise AI Training",
  description: "Learn about 22-Automations: Ontario-based creators of IndusEye RS3 radar sensing hardware and providers of Enterprise AI Training programs."
}

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 flex flex-col font-sans">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="animate-pulse-glow mb-8" variant="secondary">
            ⚡ Industrial Sensing &amp; Enterprise AI
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Engineering</span> Autonomous Operations
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We engineer ruggedized 24 GHz FMCW millimeter-wave radar hardware and deliver intensive Enterprise AI Training cohorts for commercial operators and corporate engineering departments.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="text-gradient">Our Story</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded with a mission to solve critical physical sensing bottlenecks and upskill engineering workforces, 22-Automations emerged from the frontline challenges of high-duty industrial environments and rapid AI transformation.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We've helped industrial facilities and corporate engineering teams transform operations with autonomous radar sensing and enterprise AI training. Our systems have processed millions of vehicle and access cycles, saved countless hours of manual intervention, and delivered rapid ROI for our enterprise clients.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24 GHz</div>
                  <div className="text-sm text-muted-foreground">FMCW Radar Tech</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">1000 lb</div>
                  <div className="text-sm text-muted-foreground">Coupling Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Delivered</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-effect p-8 rounded-2xl tech-border">
                <h3 className="text-2xl font-bold text-gradient mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To engineer high-reliability 24 GHz industrial radar sensing systems and deliver world-class Enterprise AI Training, equipping organizations with sovereign technical capabilities and autonomous operations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">24 GHz FMCW Radar Engineering</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Enterprise AI Training Cohorts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Sovereign Industrial Capabilities</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gradient">Our Engineering Principles</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect hover:glow-effect transition-all duration-300 tech-border">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-primary rounded-full relative">
                    <div className="absolute inset-1 bg-primary/60 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Hardened Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our IndusEye RS3 radar units are engineered for chemical resistance, steam immunity, and extreme Canadian winter cycles with zero false triggers.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:glow-effect transition-all duration-300 tech-border">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-accent rounded-sm relative">
                    <div className="absolute inset-1 bg-accent/60 rounded-sm"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Workforce Empowerment</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Through hands-on corporate engineering cohorts, we internalize AI competence within client teams, eliminating expensive consulting dependencies.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:glow-effect transition-all duration-300 tech-border">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 relative">
                    <div className="w-6 h-6 border-2 border-primary rounded border-dashed animate-spin-slow"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-primary/40 rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Measurable ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We measure success by reduced cycle downtime, eliminated door collision damage, cut heating loss, and rapid payback under 90 days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
