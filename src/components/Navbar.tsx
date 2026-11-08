'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Radio, ArrowRight, ExternalLink, Phone, Mail } from 'lucide-react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const navLinks = [
    {
      label: 'IndusEye RS3',
      href: '/products/sensing-unit',
      isHighlight: true,
      highlightVariant: 'primary'
    },
    {
      label: 'AI Training',
      href: '/#ai-training',
      isHighlight: true,
      highlightVariant: 'accent'
    },
    { label: 'Products & Systems', href: '/products' },
    { label: 'Case Studies', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <header className="sticky top-0 w-full z-50 glass-effect border-b border-border/40 font-sans">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5 group"
          >
            <span className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_12px_rgba(0,255,255,0.85)] group-hover:scale-110 transition-transform" />
            <span className="text-gradient">22-Automations</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              if (link.isHighlight) {
                const isAccent = link.highlightVariant === 'accent'
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider transition-all ${
                      isAccent
                        ? (isActive
                            ? 'bg-accent/20 text-accent border border-accent/40 shadow-[0_0_10px_rgba(255,100,255,0.2)]'
                            : 'bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 hover:border-accent/40')
                        : (isActive
                            ? 'bg-primary/20 text-primary border border-primary/40 shadow-[0_0_10px_rgba(0,255,255,0.2)]'
                            : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:border-primary/40')
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isAccent ? 'bg-accent' : 'bg-primary'} animate-pulse`} />
                    {link.label}
                  </Link>
                )
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-primary ${
                    isActive ? 'text-primary font-bold' : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/products/sensing-unit"
              className="px-4 py-2 rounded-lg bg-primary text-black font-bold font-mono text-xs tracking-wider uppercase hover:brightness-110 active:scale-[0.98] transition-all glow-effect flex items-center gap-1.5"
            >
              [ Pilot Unit ↗ ]
            </Link>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-10 h-10 rounded-lg border border-border bg-card/60 flex items-center justify-center text-white hover:text-primary transition-colors focus:outline-none focus:border-primary"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-[73px] bottom-0 bg-background/95 backdrop-blur-2xl border-t border-border/40 p-6 flex flex-col justify-between overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-6">
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              Navigation Menu
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                if (link.isHighlight) {
                  const isAccent = link.highlightVariant === 'accent'
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`p-3.5 rounded-xl tech-border ${
                        isAccent
                          ? 'bg-accent/10 text-accent border-accent/30'
                          : 'bg-primary/10 text-primary border-primary/30'
                      } font-bold flex items-center justify-between`}
                    >
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isAccent ? 'bg-accent' : 'bg-primary'} animate-pulse`} />
                        {link.label} · {isAccent ? 'Corporate Cohorts' : '24 GHz Hardware'}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-semibold py-1 transition-colors ${
                      isActive ? 'text-primary font-bold' : 'text-white/80 hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Mobile Bottom Actions */}
          <div className="space-y-4 pt-6 border-t border-border/40">
            <Link
              href="/products/sensing-unit"
              onClick={() => setIsOpen(false)}
              className="w-full py-4 rounded-xl bg-primary text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
            >
              Request 30-Day Pilot Unit <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex flex-col gap-2 text-xs font-mono text-muted-foreground pt-2">
              <a href="tel:4378084197" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary" /> +1 (437) 808-4197
              </a>
              <a href="mailto:automations.22@outlook.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent" /> automations.22@outlook.com
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
