import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ParticleSystem from '@/components/ParticleSystem'
import TestimonialsCarousel from '@/components/TestimonialsCarousel'
import HeroVideoBackground from '@/components/HeroVideoBackground'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 relative">
      {/* Particle System */}
      <ParticleSystem />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">
              22-Automations
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">Services</a>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            <Button className="glow-effect">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-screen flex items-center">
        {/* Background Video */}
        <HeroVideoBackground
          videoSources={[
            "https://cdn.pixabay.com/video/2022/12/11/142737-777617847_large.mp4",
            "https://cdn.pixabay.com/video/2021/08/31/87503-593720115_large.mp4",
            "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
          ]}
          className="-z-20"
        />

        <div className="container mx-auto text-center relative z-10">
          <div className="relative">
            {/* Enhanced Background Pattern */}
            <div className="absolute inset-0 -z-10 opacity-15">
              <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-30"></div>
            </div>

            {/* Main Hero Content */}
            <div className="space-y-8 max-w-4xl mx-auto">
              <Badge className="animate-pulse-glow backdrop-blur-md" variant="secondary">
                ⚡ Next-Generation Digital Solutions
              </Badge>

              <h1 className="text-6xl md:text-8xl font-bold hero-text-shadow">
                <span className="block text-gradient drop-shadow-lg">The Future</span>
                <span className="block text-foreground drop-shadow-lg">of Development</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed hero-text-shadow backdrop-blur-sm bg-background/10 rounded-lg p-4 border border-white/10">
                We craft cutting-edge apps, websites, and AI-powered workflows that transform your business into a digital powerhouse.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 glow-effect animate-pulse-glow backdrop-blur-md">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 glass-effect backdrop-blur-md">
                    View Our Products
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Our Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From concept to deployment, we deliver comprehensive digital solutions that drive results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* App Development */}
            <Card className="glass-effect hover:glow-effect transition-all duration-300 animate-float">
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-primary rounded-md relative">
                    <div className="absolute inset-1 bg-primary/30 rounded-sm"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">App Development</CardTitle>
                <CardDescription className="text-lg">
                  Native and cross-platform mobile applications that deliver exceptional user experiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• iOS & Android Development</li>
                  <li>• React Native & Flutter</li>
                  <li>• Progressive Web Apps</li>
                  <li>• App Store Optimization</li>
                </ul>
              </CardContent>
            </Card>

            {/* Web Development */}
            <Card className="glass-effect hover:glow-effect transition-all duration-300 animate-float" style={{animationDelay: '1s'}}>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 border-2 border-accent rounded-full relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-accent/60"></div>
                    <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-accent/60"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">Web Development</CardTitle>
                <CardDescription className="text-lg">
                  Modern, responsive websites and web applications built with cutting-edge technologies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• React, Next.js, Vue.js</li>
                  <li>• E-commerce Solutions</li>
                  <li>• CMS Development</li>
                  <li>• Performance Optimization</li>
                </ul>
              </CardContent>
            </Card>

            {/* AI Solutions */}
            <Card className="glass-effect hover:glow-effect transition-all duration-300 animate-float" style={{animationDelay: '2s'}}>
              <CardHeader>
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 glow-effect">
                  <div className="w-8 h-8 relative">
                    <div className="w-6 h-6 border-2 border-primary rounded border-dashed animate-spin-slow"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-primary/40 rounded-full"></div>
                  </div>
                </div>
                <CardTitle className="text-2xl text-gradient">AI Solutions & Workflows</CardTitle>
                <CardDescription className="text-lg">
                  Intelligent automation and AI-powered tools that streamline your business processes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Custom AI Models</li>
                  <li>• Process Automation</li>
                  <li>• Data Analytics</li>
                  <li>• Chatbots & Virtual Assistants</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <TestimonialsCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="glass-effect glow-effect max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient">Transform</span> Your Business?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your project and discover how our cutting-edge solutions can accelerate your growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 glow-effect">
                    Schedule a Consultation
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                    View Our Products
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
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
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
