'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const initialTestimonials = [
  {
    quote: "22-Automations transformed our entire business model. Their AI solution increased our efficiency by 340% and opened up revenue streams we never thought possible.",
    author: "Jay",
    role: "Owner",
    company: "IN N OUT Carwash",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Jay&backgroundColor=0284c7"
  },
  {
    quote: "The mobile app they developed for us has 2M+ active users and a 4.9 star rating. The team's attention to detail and user experience is unmatched.",
    author: "Gurpreet Sainz",
    role: "CEO",
    company: "Tattoo Lore",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Gurpreet%20Sainz&backgroundColor=0284c7"
  },
  {
    quote: "Working with 22-Automations was like having a technical co-founder. They didn't just build our platform, they helped us reimagine our entire strategy.",
    author: "Irfan Khan",
    role: "Vape Point",
    company: "Brampton",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=Irfan%20Khan&backgroundColor=0284c7"
  }
]

export default function TestimonialsCarousel() {
  const [list, setList] = useState(initialTestimonials)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [name, setName] = useState('')
  const [review, setReview] = useState('')
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
    if (!name.trim() || !review.trim()) return

    const newTestimonial = {
      quote: review,
      author: name,
      role: "Client",
      company: "Verified Partner",
      // Generate a nice colorful placeholder avatar based on the user's name
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=0284c7`
    }

    setList((prev) => [...prev, newTestimonial])
    // Jump to the newly added review
    setCurrentIndex(list.length)
    setName('')
    setReview('')
    setSubmitted(true)

    // Hide success message after a few seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 4000)
  }

  return (
    <Card className="glass-effect glow-effect max-w-4xl mx-auto overflow-hidden">
      <CardContent className="p-12 text-center relative z-10">
        <h3 className="text-3xl font-bold mb-8">
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
                <blockquote className="text-xl text-muted-foreground mb-6 italic leading-relaxed">
                  "{current.quote}"
                </blockquote>
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={current.image}
                    alt={current.author}
                    className="w-12 h-12 rounded-full border border-primary/30 object-cover"
                  />
                  <div className="text-left">
                    <div className="font-semibold text-foreground">{current.author}</div>
                    <div className="text-sm text-muted-foreground">{current.role}, {current.company}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        <div className="flex justify-center space-x-2 mt-8 mb-12">
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
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent my-10" />

        {/* Submit Review Form */}
        <div className="max-w-md mx-auto text-left glass-effect p-6 rounded-xl border border-white/5 shadow-lg relative">
          <h4 className="text-lg font-semibold mb-4 text-gradient">
            Share Your Experience
          </h4>
          
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6 px-4 bg-primary/10 rounded-lg border border-primary/20"
              >
                <div className="text-3xl mb-2 animate-bounce">🎉</div>
                <h5 className="font-semibold text-primary mb-1">Review Submitted!</h5>
                <p className="text-xs text-muted-foreground">
                  Thank you! Your feedback has been added and will appear in the rotation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-name">Your Name</Label>
                  <Input
                    id="client-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-effect"
                    placeholder="E.g. Ashutosh Modh"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-review">Your Review</Label>
                  <Textarea
                    id="client-review"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    className="glass-effect min-h-[80px]"
                    placeholder="Tell us what you think about our services..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full glow-effect transition-all active:scale-[0.98]"
                >
                  Submit Review
                </Button>
              </form>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  )
}
