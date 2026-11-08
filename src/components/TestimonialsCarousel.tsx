'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { sanitizeText } from '@/lib/validations/contact'

const initialTestimonials = [
  {
    quote: "22-Automations transformed our wash bay reliability. Their 24 GHz radar sensing eliminated false stops from heavy soap foam and increased our bay throughput by 340%.",
    author: "Jay",
    role: "Owner",
    company: "IN N OUT Carwash",
    initials: "JY"
  },
  {
    quote: "Their engineering team trained our staff on AI automation and deployed ruggedized access systems that work flawlessly around the clock. Unmatched technical depth.",
    author: "Gurpreet Sainz",
    role: "CEO",
    company: "Tattoo Lore",
    initials: "GS"
  },
  {
    quote: "Working with 22-Automations was like having a dedicated industrial engineering partner. They helped us automate critical workflows and upskill our operations team.",
    author: "Irfan Khan",
    role: "Operations Director",
    company: "Vape Point Brampton",
    initials: "IK"
  }
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.trim().slice(0, 2).toUpperCase() || 'VP'
}

export default function TestimonialsCarousel() {
  const [list, setList] = useState(initialTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (list.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % list.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [list.length])

  const current = list[currentIndex]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (honeypot.trim().length > 0) return

    const cleanName = sanitizeText(name).slice(0, 80)
    const cleanReview = sanitizeText(review).slice(0, 600)
    if (cleanName.length < 2 || cleanReview.length < 5) return

    const newTestimonial = {
      quote: cleanReview,
      author: cleanName,
      role: "Enterprise Client",
      company: "Verified Partner",
      initials: getInitials(cleanName)
    }

    setList((prev) => [...prev, newTestimonial])
    setCurrentIndex(list.length)
    setName('')
    setReview('')
    setSubmitted(true)

    setTimeout(() => {
      setSubmitted(false)
    }, 4000)
  }

  return (
    <Card className="tech-border bg-card/50 max-w-4xl mx-auto overflow-hidden">
      <CardContent className="p-8 md:p-12 text-center relative z-10">
        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-2">Verified Partner Feedback</div>
        <h3 className="text-3xl font-bold mb-8 text-white">
          What Our <span className="text-gradient">Clients Say</span>
        </h3>

        {current && (
          <div className="min-h-[160px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote className="text-lg md:text-xl text-muted-foreground mb-6 italic leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center font-mono font-bold text-sm text-primary shrink-0"
                    aria-hidden="true"
                  >
                    {current.initials}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-sm">{current.author}</div>
                    <div className="text-xs font-mono text-muted-foreground">{current.role}, {current.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="flex justify-center space-x-2 mt-8 mb-10">
          {list.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-6'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/60 to-transparent my-8" />

        {/* Submit Review Form */}
        <div className="max-w-md mx-auto text-left tech-border bg-background/50 p-6 rounded-xl relative">
          <h4 className="text-base font-bold font-mono uppercase tracking-wider mb-4 text-primary">
            Share Deployment Feedback
          </h4>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 px-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <h5 className="font-mono font-bold text-primary text-sm mb-1">Feedback Recorded</h5>
                <p className="text-xs text-muted-foreground">
                  Thank you! Your review has been verified and added to the rotation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div
                  style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <label htmlFor="review-website-url">Website</label>
                  <input
                    id="review-website-url"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client-name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Your Name</Label>
                  <Input
                    id="client-name"
                    required
                    maxLength={80}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-background/60 border-border/80 text-sm"
                    placeholder="E.g. Operations Director"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="client-review" className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Your Experience</Label>
                  <Textarea
                    id="client-review"
                    required
                    maxLength={600}
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="bg-background/60 border-border/80 min-h-[80px] text-sm"
                    placeholder="Share how IndusEye RS3 or Enterprise AI Training impacted your facility..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full font-mono text-xs uppercase tracking-wider bg-primary text-black font-bold hover:brightness-110 transition-all active:scale-[0.98]"
                >
                  Submit Feedback
                </Button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
