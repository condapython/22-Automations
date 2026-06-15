'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  side: 'left' | 'right'
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    // Initialize particles clustered on their respective sides
    const initParticles = () => {
      particlesRef.current = []
      const width = canvas.width
      const height = canvas.height
      
      // Determine density based on screen size
      const countPerSide = Math.min(45, Math.floor(width / 30))

      const orangeColors = ['#ff4a00', '#ff6a00', '#ff8c00', '#ffa500']
      const blueColors = ['#00b8ff', '#00f0ff', '#3b82f6', '#60a5fa']

      // Initialize Left Side (Orange Constellations)
      for (let i = 0; i < countPerSide; i++) {
        particlesRef.current.push({
          x: Math.random() * (width * 0.45),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1.5,
          opacity: Math.random() * 0.6 + 0.3,
          color: orangeColors[Math.floor(Math.random() * orangeColors.length)],
          side: 'left'
        })
      }

      // Initialize Right Side (Blue Constellations)
      for (let i = 0; i < countPerSide; i++) {
        particlesRef.current.push({
          x: (width * 0.55) + Math.random() * (width * 0.45),
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 1.5,
          opacity: Math.random() * 0.6 + 0.3,
          color: blueColors[Math.floor(Math.random() * blueColors.length)],
          side: 'right'
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const width = canvas.width
      const height = canvas.height
      const particles = particlesRef.current
      const len = particles.length

      // Draw background glow to replicate the exact image mood
      // Left bottom orange glow
      const leftGlow = ctx.createRadialGradient(
        0, height, 0,
        0, height, width * 0.45
      )
      leftGlow.addColorStop(0, 'rgba(255, 74, 0, 0.15)')
      leftGlow.addColorStop(0.5, 'rgba(255, 74, 0, 0.05)')
      leftGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = leftGlow
      ctx.fillRect(0, 0, width, height)

      // Right bottom blue glow
      const rightGlow = ctx.createRadialGradient(
        width, height, 0,
        width, height, width * 0.45
      )
      rightGlow.addColorStop(0, 'rgba(0, 184, 255, 0.15)')
      rightGlow.addColorStop(0.5, 'rgba(0, 184, 255, 0.05)')
      rightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = rightGlow
      ctx.fillRect(0, 0, width, height)

      // Update positions and apply gentle constraint forces
      particles.forEach(p => {
        // Apply side constraints to maintain the constellation gap in the middle
        if (p.side === 'left') {
          if (p.x > width * 0.48) {
            p.vx -= 0.015 // Pull back left
          }
        } else {
          if (p.x < width * 0.52) {
            p.vx += 0.015 // Pull back right
          }
        }

        // Mouse interaction (gravity push/pull)
        const dx = mouseRef.current.x - p.x
        const dy = mouseRef.current.y - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 130) {
          const force = (130 - distance) / 130
          // Gently attract to mouse
          p.vx += (dx / distance) * force * 0.02
          p.vy += (dy / distance) * force * 0.02
        }

        // Apply velocities
        p.x += p.vx
        p.y += p.vy

        // Dampen velocity to prevent wild acceleration
        p.vx *= 0.97
        p.vy *= 0.97

        // Bouncing constraints
        if (p.x < 0) {
          p.x = 0
          p.vx *= -1
        } else if (p.x > width) {
          p.x = width
          p.vx *= -1
        }

        if (p.y < 0) {
          p.y = 0
          p.vy *= -1
        } else if (p.y > height) {
          p.y = height
          p.vy *= -1
        }

        // Draw node
        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Draw connection lines
      ctx.lineWidth = 0.55
      for (let i = 0; i < len; i++) {
        const pA = particles[i]
        for (let j = i + 1; j < len; j++) {
          const pB = particles[j]
          if (pA.side !== pB.side) continue // Don't bridge left and right side directly
          
          const dx = pA.x - pB.x
          const dy = pA.y - pB.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 105) {
            const alpha = ((105 - dist) / 105) * 0.16
            ctx.beginPath()
            ctx.moveTo(pA.x, pA.y)
            ctx.lineTo(pB.x, pB.y)
            ctx.strokeStyle = pA.side === 'left' ? `rgba(255, 115, 0, ${alpha})` : `rgba(0, 184, 255, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // Draw Poly-Mesh triangles (matches low-poly shaded triangles in the screenshot)
      const maxTriangleDist = 90
      for (let i = 0; i < len; i++) {
        const pA = particles[i]
        for (let j = i + 1; j < len; j++) {
          const pB = particles[j]
          if (pA.side !== pB.side) continue
          
          const dxAB = pA.x - pB.x
          const dyAB = pA.y - pB.y
          const distAB = dxAB * dxAB + dyAB * dyAB
          if (distAB > maxTriangleDist * maxTriangleDist) continue

          for (let k = j + 1; k < len; k++) {
            const pC = particles[k]
            if (pB.side !== pC.side) continue

            const dxBC = pB.x - pC.x
            const dyBC = pB.y - pC.y
            const distBC = dxBC * dxBC + dyBC * dyBC
            if (distBC > maxTriangleDist * maxTriangleDist) continue

            const dxCA = pC.x - pA.x
            const dyCA = pC.y - pA.y
            const distCA = dxCA * dxCA + dyCA * dyCA
            if (distCA > maxTriangleDist * maxTriangleDist) continue

            // Draw poly face
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(pA.x, pA.y)
            ctx.lineTo(pB.x, pB.y)
            ctx.lineTo(pC.x, pC.y)
            ctx.closePath()
            ctx.fillStyle = pA.side === 'left' ? 'rgba(255, 110, 0, 0.025)' : 'rgba(0, 180, 255, 0.025)'
            ctx.fill()
            ctx.restore()
          }
        }
      }

      // Draw interactive lines from mouse cursor to nearby nodes
      const mX = mouseRef.current.x
      const mY = mouseRef.current.y
      if (mX > 0 && mY > 0) {
        particles.forEach(p => {
          const dx = p.x - mX
          const dy = p.y - mY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            const alpha = ((130 - dist) / 130) * 0.18
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mX, mY)
            ctx.strokeStyle = p.side === 'left' ? `rgba(255, 115, 0, ${alpha})` : `rgba(0, 184, 255, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  )
}
