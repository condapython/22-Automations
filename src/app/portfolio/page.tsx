import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Portfolio() {
  const projects = [
    {
      title: "FinanceAI Pro",
      category: "AI Solutions",
      description: "Revolutionary trading algorithm that increased portfolio returns by 340% for a major investment firm.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
      technologies: ["TensorFlow", "Python", "React", "AWS"],
      results: ["340% ROI increase", "99.7% accuracy rate", "$50M+ managed"],
      link: "#"
    },
    {
      title: "MedFlow Mobile",
      category: "App Development",
      description: "Healthcare management app serving 2M+ patients with real-time vitals monitoring and AI diagnostics.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      technologies: ["React Native", "Node.js", "MongoDB", "ML Kit"],
      results: ["2M+ active users", "50% faster diagnoses", "FDA approved"],
      link: "#"
    },
    {
      title: "EcoLogistics Platform",
      category: "Web Development",
      description: "Supply chain optimization platform reducing carbon emissions by 60% for Fortune 500 companies.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
      results: ["60% emission reduction", "30% cost savings", "500+ companies"],
      link: "#"
    },
    {
      title: "Neural Voice Assistant",
      category: "AI Solutions",
      description: "Advanced conversational AI for customer service, handling 1M+ queries daily with 95% satisfaction.",
      image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=600&h=400&fit=crop",
      technologies: ["GPT-4", "Speech Recognition", "FastAPI", "Redis"],
      results: ["1M+ queries/day", "95% satisfaction", "70% cost reduction"],
      link: "#"
    },
    {
      title: "RetailVision AR",
      category: "App Development",
      description: "Augmented reality shopping experience increasing conversion rates by 180% for major retailers.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      technologies: ["ARKit", "Swift", "Unity", "Cloud Anchors"],
      results: ["180% conversion boost", "40% return reduction", "5M+ downloads"],
      link: "#"
    },
    {
      title: "SmartCity Dashboard",
      category: "Web Development",
      description: "Real-time city management platform processing 10TB+ of IoT data daily for urban optimization.",
      image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600&h=400&fit=crop",
      technologies: ["Vue.js", "D3.js", "Apache Kafka", "Kubernetes"],
      results: ["10TB+ data/day", "25% efficiency gain", "Smart city certified"],
      link: "#"
    }
  ]

  const stats = [
    { value: "200+", label: "Projects Completed" },
    { value: "50M+", label: "Users Reached" },
    { value: "99.9%", label: "Uptime Achieved" },
    { value: "340%", label: "Max ROI Increase" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-effect">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              NeuraFlow
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/portfolio" className="text-primary">Portfolio</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="animate-pulse-glow mb-8" variant="secondary">
            ⚡ Our Success Stories
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Transforming</span> Industries
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From Fortune 500 enterprises to innovative startups, see how we've revolutionized businesses across the globe.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-effect text-center hover:glow-effect transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-gradient mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge solutions that have redefined what's possible in their respective industries.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="glass-effect hover:glow-effect transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gradient">{project.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Technologies */}
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">Technologies:</div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">Key Results:</div>
                    <ul className="space-y-1">
                      {project.results.map((result, resultIndex) => (
                        <li key={resultIndex} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button variant="outline" className="w-full mt-4 glass-effect">
                    View Case Study
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="glass-effect glow-effect max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">
                What Our <span className="text-gradient">Clients Say</span>
              </h3>
              <blockquote className="text-xl text-muted-foreground mb-6 italic">
                "NeuraFlow transformed our entire business model. Their AI solution increased our efficiency by 340%
                and opened up revenue streams we never thought possible."
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face"
                  alt="CEO"
                  className="w-12 h-12 rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-foreground">Marcus Chen</div>
                  <div className="text-sm text-muted-foreground">CEO, InnovateTech Solutions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="glass-effect glow-effect max-w-3xl mx-auto">
            <CardContent className="p-12">
              <h3 className="text-4xl font-bold mb-6">
                Ready to <span className="text-gradient">Join</span> Our Success Stories?
              </h3>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss how we can transform your business with cutting-edge technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6 glow-effect">
                  Start Your Project
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Download Case Studies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="container mx-auto text-center">
          <Link href="/" className="text-2xl font-bold text-gradient mb-4 inline-block">
            NeuraFlow
          </Link>
          <p className="text-muted-foreground mb-6">
            Crafting the digital future, one innovation at a time.
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
