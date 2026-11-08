/**
 * First-Party Cookie Consent & B2B Visitor Attribution Intelligence
 *
 * Security & Privacy Architecture:
 * - Uses explicit first-party cookies with SameSite=Lax; Path=/ (and Secure over HTTPS)
 * - Zero covert fingerprinting (no canvas/audio/font enumeration)
 * - Uses User-Agent Client Hints (navigator.userAgentData) where available
 * - Respects user consent immediately; revoking consent purges all analytics cookies
 */

export interface CookieConsentPreferences {
  status: 'accepted_all' | 'essential_only' | 'custom'
  essential: boolean // Always true (security, anti-bot dwell time, session state)
  analytics: boolean // Visitor attribution, referrer, timezone, pages viewed, visit count
  preferences: boolean // UI preferences, selected deployment environment
  updatedAt: string
}

export interface VisitorTelemetry {
  visitorId: string
  visitorType: string
  visitCount: number
  firstVisitAt: string
  lastVisitAt: string
  referrer: string
  landingPage: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  timezone: string
  language: string
  platform: string
  viewportCategory: string
  pagesViewed: string[]
  consentStatus: string
}

export const COOKIE_NAMES = {
  CONSENT: '22auto_cookie_consent',
  VISITOR_ID: '22auto_visitor_id',
  VISIT_COUNT: '22auto_visit_count',
  ATTRIBUTION: '22auto_attribution'
} as const

const SESSION_TRACKED_KEY = '22auto_session_counted'

/**
 * Sets a secure first-party cookie with SameSite=Lax and Path=/
 */
export function setFirstPartyCookie(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === 'undefined') return
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const secureFlag = isSecure ? '; Secure' : ''
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secureFlag}`
}

/**
 * Reads a first-party cookie by name
 */
export function getFirstPartyCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const target = `${encodeURIComponent(name)}=`
  const parts = document.cookie ? document.cookie.split('; ') : []
  for (const part of parts) {
    if (part.startsWith(target)) {
      try {
        return decodeURIComponent(part.slice(target.length))
      } catch {
        return null
      }
    }
  }
  return null
}

/**
 * Deletes a first-party cookie immediately
 */
export function deleteFirstPartyCookie(name: string): void {
  if (typeof document === 'undefined') return
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:'
  const secureFlag = isSecure ? '; Secure' : ''
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/; SameSite=Lax${secureFlag}`
}

/**
 * Purges all non-essential visitor analytics cookies when user opts out
 */
export function clearAnalyticsCookies(): void {
  deleteFirstPartyCookie(COOKIE_NAMES.VISITOR_ID)
  deleteFirstPartyCookie(COOKIE_NAMES.VISIT_COUNT)
  deleteFirstPartyCookie(COOKIE_NAMES.ATTRIBUTION)
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.removeItem(SESSION_TRACKED_KEY)
    } catch {
      // Ignore storage access errors in restricted modes
    }
  }
}

/**
 * Reads the current user's cookie consent preferences
 */
export function getCookieConsent(): CookieConsentPreferences | null {
  const raw = getFirstPartyCookie(COOKIE_NAMES.CONSENT)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as CookieConsentPreferences
    if (typeof parsed.analytics === 'boolean' && typeof parsed.preferences === 'boolean') {
      return {
        ...parsed,
        essential: true
      }
    }
    return null
  } catch {
    return null
  }
}

/**
 * Saves cookie consent preferences (valid for 180 days) and initializes or clears tracking
 */
export function saveCookieConsent(
  prefs: Omit<CookieConsentPreferences, 'essential' | 'updatedAt'>
): CookieConsentPreferences {
  const fullPrefs: CookieConsentPreferences = {
    ...prefs,
    essential: true,
    updatedAt: new Date().toISOString()
  }

  // Persist consent choice for 180 days
  setFirstPartyCookie(COOKIE_NAMES.CONSENT, JSON.stringify(fullPrefs), 60 * 60 * 24 * 180)

  if (fullPrefs.analytics) {
    initializeOrUpdateVisitorTelemetry()
  } else {
    clearAnalyticsCookies()
  }

  return fullPrefs
}

/**
 * Generates a random anonymous first-party visitor ID
 */
function generateVisitorId(): string {
  const timestamp = Date.now().toString(36)
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const bytes = new Uint8Array(6)
    crypto.getRandomValues(bytes)
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('')
    return `v22_${timestamp}_${hex}`
  }
  return `v22_${timestamp}_${Math.random().toString(36).slice(2, 10)}`
}

/**
 * Safely detects platform using User-Agent Client Hints (UA-CH) without covert fingerprinting
 */
function detectPlatformHint(): string {
  if (typeof navigator === 'undefined') return 'Unknown'
  const navWithUAData = navigator as Navigator & {
    userAgentData?: {
      platform?: string
      mobile?: boolean
    }
  }
  if (navWithUAData.userAgentData?.platform) {
    const mobileTag = navWithUAData.userAgentData.mobile ? ' (Mobile)' : ' (Desktop)'
    return `${navWithUAData.userAgentData.platform}${mobileTag}`
  }
  return 'Standard Web Client'
}

/**
 * Classifies viewport size at low granularity (Desktop / Tablet / Mobile)
 */
function detectViewportCategory(): string {
  if (typeof window === 'undefined') return 'Unknown'
  const width = window.innerWidth
  if (width >= 1024) return 'Desktop'
  if (width >= 768) return 'Tablet'
  return 'Mobile'
}

/**
 * Initializes or updates visitor attribution cookie when analytics consent is active
 */
export function initializeOrUpdateVisitorTelemetry(currentPath?: string): VisitorTelemetry | null {
  if (typeof window === 'undefined') return null
  const consent = getCookieConsent()
  if (!consent || !consent.analytics) return null

  const now = new Date().toISOString()
  const NINETY_DAYS = 60 * 60 * 24 * 90

  // 1. Visitor ID
  let visitorId = getFirstPartyCookie(COOKIE_NAMES.VISITOR_ID)
  const isNewVisitor = !visitorId
  if (!visitorId) {
    visitorId = generateVisitorId()
  }
  setFirstPartyCookie(COOKIE_NAMES.VISITOR_ID, visitorId, NINETY_DAYS)

  // 2. Visit Count (increment once per browser session)
  let visitCount = parseInt(getFirstPartyCookie(COOKIE_NAMES.VISIT_COUNT) || '0', 10)
  if (Number.isNaN(visitCount) || visitCount < 1) {
    visitCount = 1
  } else {
    let alreadyCountedInSession = false
    try {
      alreadyCountedInSession = sessionStorage.getItem(SESSION_TRACKED_KEY) === '1'
    } catch {
      alreadyCountedInSession = false
    }
    if (!alreadyCountedInSession) {
      visitCount += 1
    }
  }
  try {
    sessionStorage.setItem(SESSION_TRACKED_KEY, '1')
  } catch {
    // Ignore storage errors
  }
  setFirstPartyCookie(COOKIE_NAMES.VISIT_COUNT, String(visitCount), NINETY_DAYS)

  // 3. Parse existing attribution or initialize fresh
  let existing: Partial<VisitorTelemetry> = {}
  const rawAttr = getFirstPartyCookie(COOKIE_NAMES.ATTRIBUTION)
  if (rawAttr) {
    try {
      existing = JSON.parse(rawAttr)
    } catch {
      existing = {}
    }
  }

  const searchParams = new URLSearchParams(window.location.search)
  const activePath = currentPath || window.location.pathname || '/'

  // Keep up to the last 10 unique or sequential pages viewed
  const previousPages = Array.isArray(existing.pagesViewed) ? existing.pagesViewed : []
  const updatedPages =
    previousPages[previousPages.length - 1] === activePath
      ? previousPages
      : [...previousPages, activePath].slice(-10)

  let referrer = existing.referrer || 'Direct / Bookmark'
  if (!existing.referrer && document.referrer) {
    try {
      const refUrl = new URL(document.referrer)
      if (refUrl.origin !== window.location.origin) {
        referrer = refUrl.origin + refUrl.pathname
      }
    } catch {
      referrer = 'External Referral'
    }
  }

  let timezone = 'UTC'
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
  } catch {
    timezone = 'UTC'
  }

  const telemetry: VisitorTelemetry = {
    visitorId,
    visitorType: isNewVisitor && visitCount === 1 ? 'New Visitor' : `Returning Prospect (Visit #${visitCount})`,
    visitCount,
    firstVisitAt: existing.firstVisitAt || now,
    lastVisitAt: now,
    referrer,
    landingPage: existing.landingPage || activePath,
    utmSource: searchParams.get('utm_source') || existing.utmSource || 'organic',
    utmMedium: searchParams.get('utm_medium') || existing.utmMedium || 'direct',
    utmCampaign: searchParams.get('utm_campaign') || existing.utmCampaign || 'none',
    timezone,
    language: navigator.language || 'en-US',
    platform: detectPlatformHint(),
    viewportCategory: detectViewportCategory(),
    pagesViewed: updatedPages,
    consentStatus: consent.status
  }

  setFirstPartyCookie(COOKIE_NAMES.ATTRIBUTION, JSON.stringify(telemetry), NINETY_DAYS)
  return telemetry
}

/**
 * Reads current visitor telemetry without mutating visit count
 */
export function getCurrentVisitorTelemetry(): VisitorTelemetry | null {
  const consent = getCookieConsent()
  if (!consent || !consent.analytics) return null

  const rawAttr = getFirstPartyCookie(COOKIE_NAMES.ATTRIBUTION)
  if (!rawAttr) {
    return initializeOrUpdateVisitorTelemetry()
  }
  try {
    return JSON.parse(rawAttr) as VisitorTelemetry
  } catch {
    return null
  }
}

/**
 * Returns formatted visitor intelligence fields to enrich lead forms (Contact & Pilot Requests)
 */
export function getVisitorSummaryForLead(): Record<string, string> {
  const consent = getCookieConsent()
  if (!consent) {
    return {
      Cookie_Consent: 'Unset (Default Essential Only)'
    }
  }
  if (!consent.analytics) {
    return {
      Cookie_Consent: `${consent.status} (Analytics Opted Out)`
    }
  }

  const telemetry = getCurrentVisitorTelemetry()
  if (!telemetry) {
    return {
      Cookie_Consent: consent.status
    }
  }

  return {
    Cookie_Consent: telemetry.consentStatus,
    Visitor_ID: telemetry.visitorId,
    Visitor_Status: telemetry.visitorType,
    Visit_Count: String(telemetry.visitCount),
    Entry_Referrer: telemetry.referrer,
    Landing_Page: telemetry.landingPage,
    UTM_Attribution: `${telemetry.utmSource} / ${telemetry.utmMedium} / ${telemetry.utmCampaign}`,
    Visitor_Timezone_Region: `${telemetry.timezone} (${telemetry.language})`,
    Device_Platform: `${telemetry.platform} [${telemetry.viewportCategory}]`,
    Pages_Viewed_Journey: telemetry.pagesViewed.join(' -> '),
    First_Seen_UTC: telemetry.firstVisitAt
  }
}
