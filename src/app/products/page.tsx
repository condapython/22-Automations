import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Products() {
  const products = [
    {
      title: "WorkFlow Pro",
      category: "Process Automation",
      description: "Complete workflow automation platform that streamlines business processes and eliminates manual tasks.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: ["Visual Workflow Builder", "API Integrations", "Real-time Analytics", "Custom Triggers"],
      benefits: ["80% time savings", "99.9% reliability", "Zero-code setup"],
      price: "From $299/month"
    },
    {
      title: "DataSync Engine",
      category: "Data Integration",
      description: "Intelligent data synchronization solution that connects all your business systems in real-time.",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=400&fit=crop",
      features: ["Multi-platform Sync", "Data Transformation", "Error Handling", "Backup & Recovery"],
      benefits: ["Real-time updates", "Data consistency", "Automated backups"],
      price: "From $199/month"
    },
    {
      title: "AI Assistant Hub",
      category: "AI Automation",
      description: "Smart AI-powered automation that learns from your workflows and optimizes business processes.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      features: ["Machine Learning", "Natural Language Processing", "Predictive Analytics", "Smart Routing"],
      benefits: ["Intelligent decisions", "Continuous learning", "Performance optimization"],
      price: "From $499/month"
    },
    {
      title: "E-commerce Automator",
      category: "E-commerce Solutions",
      description: "Complete e-commerce automation suite for inventory, orders, customer service, and marketing.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      features: ["Inventory Management", "Order Processing", "Customer Support", "Marketing Automation"],
      benefits: ["Increased sales", "Reduced errors", "24/7 operations"],
      price: "From $399/month"
    },
    {
      title: "Communication Bridge",
      category: "Team Collaboration",
      description: "Automated communication platform that connects teams, customers, and systems seamlessly.",
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
      features: ["Multi-channel Messaging", "Automated Responses", "Team Notifications", "Integration APIs"],
      benefits: ["Faster response times", "Better coordination", "Reduced manual work"],
      price: "From $149/month"
    },
    {
      title: "Analytics Dashboard",
      category: "Business Intelligence",
      description: "Real-time analytics and reporting platform that turns your automation data into actionable insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      features: ["Real-time Dashboards", "Custom Reports", "Performance Metrics", "Trend Analysis"],
      benefits: ["Data-driven decisions", "Performance tracking", "ROI optimization"],
      price: "From $249/month"
    }
  ]

  const stats = [
    { value: "100+", label: "Products Deployed" },
    { value: "10K+", label: "Hours Automated" },
    { value: "99.9%", label: "Uptime Guarantee" },
    { value: "24/7", label: "Support Available" }
  ]

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
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/products" className="text-primary">Products</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <Badge className="animate-pulse-glow mb-8" variant="secondary">
            ⚡ Automation Solutions
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-gradient">Powerful</span> Automation Products
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover our suite of intelligent automation products designed to transform your business operations and drive efficiency.
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

      {/* Products Grid */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Our Products</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive suite of automation solutions, each designed to solve specific business challenges.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="glass-effect hover:glow-effect transition-all duration-300 group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm">
                      {product.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary/80 backdrop-blur-sm">
                      {product.price}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-gradient">{product.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">Key Features:</div>
                    <div className="grid grid-cols-2 gap-1">
                      {product.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <div className="text-sm font-semibold text-primary mb-2">Benefits:</div>
                    <div className="space-y-1">
                      {product.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button variant="default" size="sm" className="flex-1 text-xs">
                      Learn More
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-xs">
                      Try Demo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <Card className="glass-effect glow-effect max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">
                Need <span className="text-gradient">Custom</span> Automation?
              </h3>
              <p className="text-xl text-muted-foreground mb-6">
                Every business is unique. Let us build a custom automation solution tailored specifically to your needs and requirements.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Custom Development</div>
                  <p className="text-sm text-muted-foreground">Built to your exact specifications</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Enterprise Support</div>
                  <p className="text-sm text-muted-foreground">Dedicated support team</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">Scalable Solutions</div>
                  <p className="text-sm text-muted-foreground">Grows with your business</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="text-lg px-8 py-6 glow-effect">
                    Request Custom Quote
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Schedule Consultation
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
