import Link from 'next/link'
import HardwareSensingProduct from '@/components/products/HardwareSensingProduct'

export const metadata = {
  title: "22-SensLock Radar S3 | Car-Wash & Smart Access Hardware | 22-Automations",
  description: "Millimeter-wave 24 GHz radar sensing unit with HD optical cat-eye camera and ambient light control. Engineered for car-wash automation, industrial gates, and high-duty access."
}

export default function SensingUnitPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 glass-effect border-b border-border/40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gradient">
              22-Automations
            </Link>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <Link href="/#services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link href="/products" className="text-primary hover:text-primary transition-colors">Products</Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/products"
                className="hidden sm:inline-flex text-xs font-mono text-muted-foreground hover:text-white transition-colors"
              >
                ← All Products
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs tracking-wider uppercase hover:brightness-110 transition-all glow-effect"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hardware Sensing Product Content */}
      <main className="flex-1">
        <HardwareSensingProduct />
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/40 bg-card/40">
        <div className="container mx-auto max-w-6xl text-center space-y-4">
          <Link href="/" className="text-2xl font-bold text-gradient inline-block">
            22-Automations
          </Link>
          <p className="text-xs font-mono text-muted-foreground max-w-md mx-auto">
            Industrial IoT, Embedded Sensors & AI Workflows. Greater Toronto Area, Ontario.
          </p>
          <div className="flex justify-center space-x-6 text-xs text-muted-foreground pt-2">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/about" className="hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
          <div className="text-[11px] font-mono text-muted-foreground/70">
            Email: <a href="mailto:automations.22@outlook.com" className="text-primary hover:underline">automations.22@outlook.com</a> · Tel: +1 (437) 808-4197
          </div>
        </div>
      </footer>
    </div>
  )
}
