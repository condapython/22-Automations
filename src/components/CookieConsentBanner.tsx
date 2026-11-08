'use client'

import React, { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Cookie, Sliders, CheckCircle2, Trash2, Eye, X } from 'lucide-react'
import {
  CookieConsentPreferences,
  VisitorTelemetry,
  getCookieConsent,
  saveCookieConsent,
  initializeOrUpdateVisitorTelemetry,
  getCurrentVisitorTelemetry,
  clearAnalyticsCookies,
  deleteFirstPartyCookie,
  COOKIE_NAMES
} from '@/lib/cookies/visitor-tracker'

export default function CookieConsentBanner() {
  const pathname = usePathname()
  const detailsRef = useRef<HTMLDetailsElement>(null)

  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true)
  const [preferencesEnabled, setPreferencesEnabled] = useState(true)
  const [consentState, setConsentState] = useState<CookieConsentPreferences | null>(null)
  const [telemetry, setTelemetry] = useState<VisitorTelemetry | null>(null)

  // Hydrate initial cookie consent state and record page view if consented
  useEffect(() => {
    setMounted(true)
    const existingConsent = getCookieConsent()
    if (!existingConsent) {
      setIsVisible(true)
      setAnalyticsEnabled(true)
      setPreferencesEnabled(true)
    } else {
      setConsentState(existingConsent)
      setAnalyticsEnabled(existingConsent.analytics)
      setPreferencesEnabled(existingConsent.preferences)
      if (existingConsent.analytics) {
        const updated = initializeOrUpdateVisitorTelemetry(window.location.pathname)
        setTelemetry(updated)
      }
    }
  }, [])

  // Track route changes when analytics cookies are enabled
  useEffect(() => {
    if (!mounted) return
    const currentConsent = getCookieConsent()
    if (currentConsent?.analytics && pathname) {
      const updated = initializeOrUpdateVisitorTelemetry(pathname)
      setTelemetry(updated)
    }
  }, [pathname, mounted])

  // Listen for global 'open-cookie-settings' event triggered from Footer
  useEffect(() => {
    const handleOpenSettings = () => {
      const currentConsent = getCookieConsent()
      if (currentConsent) {
        setConsentState(currentConsent)
        setAnalyticsEnabled(currentConsent.analytics)
        setPreferencesEnabled(currentConsent.preferences)
        setTelemetry(getCurrentVisitorTelemetry())
      }
      setIsVisible(true)
      setTimeout(() => {
        if (detailsRef.current) {
          detailsRef.current.open = true
        }
      }, 50)
    }

    window.addEventListener('open-cookie-settings', handleOpenSettings)
    return () => window.removeEventListener('open-cookie-settings', handleOpenSettings)
  }, [])

  const handleAcceptAll = () => {
    const saved = saveCookieConsent({
      status: 'accepted_all',
      analytics: true,
      preferences: true
    })
    setConsentState(saved)
    setAnalyticsEnabled(true)
    setPreferencesEnabled(true)
    setTelemetry(getCurrentVisitorTelemetry())
    setIsVisible(false)
  }

  const handleEssentialOnly = () => {
    const saved = saveCookieConsent({
      status: 'essential_only',
      analytics: false,
      preferences: false
    })
    setConsentState(saved)
    setAnalyticsEnabled(false)
    setPreferencesEnabled(false)
    setTelemetry(null)
    setIsVisible(false)
  }

  const handleSaveCustom = () => {
    const status =
      analyticsEnabled && preferencesEnabled
        ? 'accepted_all'
        : !analyticsEnabled && !preferencesEnabled
          ? 'essential_only'
          : 'custom'

    const saved = saveCookieConsent({
      status,
      analytics: analyticsEnabled,
      preferences: preferencesEnabled
    })
    setConsentState(saved)
    setTelemetry(saved.analytics ? getCurrentVisitorTelemetry() : null)
    setIsVisible(false)
  }

  const handlePurgeAllCookies = () => {
    clearAnalyticsCookies()
    deleteFirstPartyCookie(COOKIE_NAMES.CONSENT)
    setConsentState(null)
    setTelemetry(null)
    setAnalyticsEnabled(false)
    setPreferencesEnabled(false)
  }

  if (!mounted || !isVisible) {
    return null
  }

  return (
    <aside
      aria-label="Cookie consent and visitor telemetry settings"
      className="fixed bottom-0 inset-x-0 z-50 bg-[#0b0e14]/95 backdrop-blur-xl border-t border-primary/30 shadow-[0_-10px_30px_rgba(0,0,0,0.85)] font-sans text-foreground"
    >
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-3">
        {/* Compact Non-Modal Single Row Bar (<12% viewport height) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0 mt-0.5 sm:mt-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div className="space-y-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                  22-OS Cookie &amp; Visitor Telemetry
                </span>
                {consentState && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono border-emerald-500/40 text-emerald-400 bg-emerald-500/10 py-0 h-4"
                  >
                    Active: {consentState.status.replace('_', ' ')}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground leading-snug max-w-2xl">
                We use secure first-party cookies (`SameSite=Lax`) to protect form integrity and understand which organizations and regions visit our hardware &amp; AI training pages.
              </p>
            </div>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Button
              type="button"
              size="sm"
              onClick={handleAcceptAll}
              className="font-mono text-[11px] uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110 h-8 px-3.5 shadow-[0_0_15px_rgba(0,255,255,0.25)]"
            >
              Accept All
            </Button>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleEssentialOnly}
              className="font-mono text-[11px] uppercase tracking-wider border-border/80 hover:border-primary/60 text-white h-8 px-3"
            >
              Essential Only
            </Button>
            {consentState && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setIsVisible(false)}
                aria-label="Close cookie banner"
                className="font-mono text-[11px] text-muted-foreground hover:text-white h-8 px-2"
              >
                <X className="w-4 h-4 mr-1" /> Close
              </Button>
            )}
          </div>
        </div>

        {/* On-Demand Disclosure for Granular Cookie Settings & Visitor Intelligence Inspector */}
        <details ref={detailsRef} className="mt-2 group border-t border-border/40 pt-2">
          <summary className="cursor-pointer list-none flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors select-none">
            <span className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-primary" />
              <span>Configure Cookie Categories &amp; Inspect Visitor Info</span>
            </span>
            <span className="text-[10px] text-primary group-open:rotate-180 transition-transform">▼</span>
          </summary>

          <div className="mt-3 pt-3 border-t border-border/40 grid grid-cols-1 lg:grid-cols-12 gap-4 text-xs max-h-[60vh] overflow-y-auto pb-2">
            {/* Cookie Category Toggles (7 Columns) */}
            <div className="lg:col-span-7 space-y-2.5">
              {/* Category 1: Essential Security */}
              <div className="p-3 rounded-lg bg-secondary/30 border border-border/60 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Strictly Necessary Security Cookies
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Required for anti-bot honeypot verification, submission dwell-time validation (&ge;1500ms), and storing your cookie consent state.
                  </p>
                </div>
                <Badge className="font-mono text-[10px] uppercase bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shrink-0">
                  Always Active
                </Badge>
              </div>

              {/* Category 2: Visitor Attribution & Telemetry */}
              <label
                htmlFor="cookie-analytics-toggle"
                className="p-3 rounded-lg bg-secondary/30 border border-border/60 hover:border-primary/40 transition-colors flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                    <Eye className="w-3.5 h-3.5 text-primary" />
                    Visitor Attribution &amp; B2B Journey Cookies
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Records anonymous first-party visitor ID (`22auto_visitor_id`), visit count, referrer source, UTM campaign, timezone region, and pages viewed to enrich pilot &amp; RFQ inquiries.
                  </p>
                </div>
                <input
                  id="cookie-analytics-toggle"
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-cyan-400 rounded cursor-pointer shrink-0"
                />
              </label>

              {/* Category 3: Functional & Preference Cookies */}
              <label
                htmlFor="cookie-preferences-toggle"
                className="p-3 rounded-lg bg-secondary/30 border border-border/60 hover:border-primary/40 transition-colors flex items-start justify-between gap-3 cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono font-bold text-white text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    Functional &amp; Facility Deployment Preferences
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Remembers your selected IndusEye RS3 deployment environment (Auto Spa, Fleet Bays, or Industrial Docks) across sessions.
                  </p>
                </div>
                <input
                  id="cookie-preferences-toggle"
                  type="checkbox"
                  checked={preferencesEnabled}
                  onChange={(e) => setPreferencesEnabled(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-cyan-400 rounded cursor-pointer shrink-0"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSaveCustom}
                  className="font-mono text-[11px] uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110 h-8 px-4"
                >
                  Save Selected Preferences
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={handlePurgeAllCookies}
                  className="font-mono text-[11px] uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/10 h-8 px-3 gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Purge Stored Cookies
                </Button>
              </div>
            </div>

            {/* Live Visitor Telemetry Inspector (5 Columns) */}
            <div className="lg:col-span-5 p-3.5 rounded-lg bg-black/60 border border-primary/25 font-mono text-[11px] space-y-2 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-border/50 pb-1.5">
                  <span className="text-primary font-bold uppercase tracking-wider">
                    Current Visitor Telemetry
                  </span>
                  <span className="text-[10px] text-emerald-400">First-Party Only</span>
                </div>

                {telemetry && analyticsEnabled ? (
                  <dl className="space-y-1 text-[11px]">
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Visitor ID:</dt>
                      <dd className="text-white truncate">{telemetry.visitorId}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Status:</dt>
                      <dd className="text-primary">{telemetry.visitorType}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Referrer:</dt>
                      <dd className="text-white truncate max-w-[180px]">{telemetry.referrer}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Region / TZ:</dt>
                      <dd className="text-white">{telemetry.timezone} ({telemetry.language})</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Platform:</dt>
                      <dd className="text-white">{telemetry.platform} [{telemetry.viewportCategory}]</dd>
                    </div>
                    <div className="pt-1 border-t border-border/30">
                      <dt className="text-muted-foreground mb-0.5">Session Journey:</dt>
                      <dd className="text-accent break-words leading-tight">
                        {telemetry.pagesViewed.join(' → ')}
                      </dd>
                    </div>
                  </dl>
                ) : (
                  <p className="text-muted-foreground py-4 text-center leading-relaxed">
                    Visitor attribution cookies are currently inactive. Click <span className="text-primary">Accept All</span> or enable <span className="text-white">Visitor Attribution</span> to record session telemetry.
                  </p>
                )}
              </div>

              <div className="text-[10px] text-muted-foreground/80 border-t border-border/40 pt-1.5">
                Zero third-party ad trackers or covert canvas fingerprinting. Consented telemetry is attached when you submit an RFQ or Pilot Request.
              </div>
            </div>
          </div>
        </details>
      </div>
    </aside>
  )
}
