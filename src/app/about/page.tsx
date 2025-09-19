import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              22-Automations
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-primary">About</Link>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="animate-pulse-glow mb-8" variant="secondary">
            ⚡ Automation Excellence
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Transforming</span> Business Through Automation
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We specialize in creating intelligent automation solutions that streamline operations, reduce costs, and accelerate growth for forward-thinking businesses.
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
                Founded with a vision to revolutionize business operations through intelligent automation, 22-Automations emerged from the need to bridge the gap between complex technology and practical business solutions.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We've helped numerous businesses transform their workflows, automate repetitive tasks, and unlock new levels of efficiency. Our solutions have processed millions of transactions, saved countless hours of manual work, and delivered measurable ROI for our clients.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Automations Built</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Hours Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime Achieved</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold text-gradient mb-4">Our Mission</h3>
                <p className="text-muted-foreground mb-6">
                  To democratize automation technology and make sophisticated workflow solutions accessible to businesses of all sizes, while maintaining the highest standards of reliability and performance.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Intelligent Automation</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-sm">Scalable Solutions</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">Continuous Innovation</span>
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
              <span className="text-gradient">Our Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-effect hover:glow-effect transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-primary rounded-full relative">
                    <div className="absolute inset-1 bg-primary/60 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We push the boundaries of automation technology, constantly exploring new ways to solve complex business challenges with elegant solutions.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:glow-effect transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-accent rounded-sm relative">
                    <div className="absolute inset-1 bg-accent/60 rounded-sm"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our automation solutions are built to last, with robust architecture and comprehensive testing ensuring 99.9% uptime and consistent performance.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-effect hover:glow-effect transition-all duration-300">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 relative">
                    <div className="w-6 h-6 border-2 border-primary rounded border-dashed animate-spin-slow"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-primary/40 rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We settle for nothing less than exceptional quality, from initial consultation to final implementation and ongoing support.
                </p>
              </CardContent>
            </Card>
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
            Automating success, one workflow at a time.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
