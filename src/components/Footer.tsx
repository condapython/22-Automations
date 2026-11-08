'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Radio, Cookie } from 'lucide-react'

export default function Footer() {
  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'))
    }
  }

  return (
    <footer className="py-16 px-6 border-t border-border/40 bg-card/60 font-sans">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-sm shadow-[0_0_10px_rgba(0,255,255,0.8)]" />
              <span className="text-gradient">22-Automations</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Industrial Automation, Embedded Radar Hardware &amp; Enterprise AI Training.
              Engineered and commissioned in Brampton &amp; the Greater Toronto Area.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 border border-border/60 text-xs font-mono text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              IndusEye RS3 Production: Active
            </div>
          </div>

          {/* Hardware & Systems Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono text-primary uppercase tracking-wider font-bold">
              Flagship Offerings
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/products/sensing-unit" className="hover:text-primary transition-colors flex items-center gap-1.5 text-white font-medium">
                  <Radio className="w-3.5 h-3.5 text-primary" /> IndusEye RS3 Radar
                </Link>
              </li>
              <li>
                <Link href="/#ai-training" className="hover:text-primary transition-colors flex items-center gap-1.5 text-white font-medium">
                  <span className="w-2 h-2 rounded-full bg-accent" /> Enterprise AI Training
                </Link>
              </li>
              <li>
                <Link href="/products/sensing-unit" className="hover:text-primary transition-colors">
                  Auto Spa &amp; Fleet Access
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">
                  Industrial Edge &amp; PLC Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-accent uppercase tracking-wider font-bold">
              Company
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-primary transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact Desk</Link>
              </li>
            </ul>
          </div>

          {/* Direct Engineering Contacts */}
          <div className="md:col-span-2 space-y-3">
            <div className="text-xs font-mono text-white/90 uppercase tracking-wider font-bold">
              Engineering Desk
            </div>
            <ul className="space-y-2 text-xs font-mono text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" /> GTA, Ontario
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                <a href="tel:4378084197" className="hover:text-primary transition-colors">
                  +1 (437) 808-4197
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-accent shrink-0" />
                <a href="mailto:automations.22@outlook.com" className="hover:text-primary transition-colors break-all">
                  automations.22@outlook.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground/70">
          <div>
            © {new Date().getFullYear()} 22-Automations. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/about" className="hover:text-primary transition-colors">Security &amp; Safety</Link>
            <Link href="/products/sensing-unit" className="hover:text-primary transition-colors">Hardware Specs</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Support</Link>
            <button
              type="button"
              onClick={handleOpenCookieSettings}
              className="hover:text-primary transition-colors inline-flex items-center gap-1.5 text-primary/90 cursor-pointer"
            >
              <Cookie className="w-3.5 h-3.5" />
              <span>Cookie Settings</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
