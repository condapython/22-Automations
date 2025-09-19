'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    quote: "NeuraFlow transformed our entire business model. Their AI solution increased our efficiency by 340% and opened up revenue streams we never thought possible.",
    author: "Marcus Chen",
    role: "CEO",
    company: "InnovateTech Solutions",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=60&h=60&fit=crop&crop=face"
  },
  {
    quote: "The mobile app they developed for us has 2M+ active users and a 4.9 star rating. The team's attention to detail and user experience is unmatched.",
    author: "Sarah Rodriguez",
    role: "Product Director",
    company: "HealthTech Pro",
    image: "https://images.unsplash.com/photo-1494790108755-2616b1e75e03?w=60&h=60&fit=crop&crop=face"
  },
  {
    quote: "Working with NeuraFlow was like having a technical co-founder. They didn't just build our platform, they helped us reimagine our entire strategy.",
    author: "David Kim",
    role: "Founder",
    company: "EcoLogistics",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face"
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const current = testimonials[currentIndex]

  return (
    <Card className="glass-effect glow-effect max-w-4xl mx-auto">
      <CardContent className="p-12 text-center">
        <h3 className="text-3xl font-bold mb-8">
          What Our <span className="text-gradient">Clients Say</span>
        </h3>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <blockquote className="text-xl text-muted-foreground mb-6 italic">
              "{current.quote}"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img
                src={current.image}
                alt={current.author}
                className="w-12 h-12 rounded-full"
              />
              <div className="text-left">
                <div className="font-semibold text-foreground">{current.author}</div>
                <div className="text-sm text-muted-foreground">{current.role}, {current.company}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
