'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number // base position X
  y: number // base position Y
  z: number // depth factor (z: 0.5 is far away, z: 2.0 is close)
  vx: number
  vy: number
  baseSize: number
  opacity: number
  color: string
  side: 'left' | 'right'
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  
  // Ref to track the smooth parallax offset
  const parallaxOffset = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // High Definition (High DPI / Retina) Canvas Scaling
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1
      const width = window.innerWidth
      const height = window.innerHeight

      // Scale canvas back-buffer to match device pixel ratio
      canvas.width = width * dpr
      canvas.height = height * dpr

      // Set canvas display size
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      // Scale all drawing operations by dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      
      initParticles()
    }

    // Initialize particles with random 3D depths
    const initParticles = () => {
      particlesRef.current = []
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Determine density based on screen size
      const countPerSide = Math.min(50, Math.floor(width / 28))

      const orangeColors = ['#ff3b00', '#ff6a00', '#ff9f00', '#ffb700']
      const blueColors = ['#00a8ff', '#00f6ff', '#3b82f6', '#60a5fa']

      // Left Side (Orange 3D Constellations)
      for (let i = 0; i < countPerSide; i++) {
        const z = Math.random() * 1.5 + 0.5 // Depth scale in range [0.5, 2.0]
        particlesRef.current.push({
          x: Math.random() * (width * 0.45),
          y: Math.random() * height,
          z: z,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseSize: Math.random() * 1.8 + 1.2,
          opacity: Math.random() * 0.45 + 0.25,
          color: orangeColors[Math.floor(Math.random() * orangeColors.length)],
          side: 'left'
        })
      }

      // Right Side (Blue 3D Constellations)
      for (let i = 0; i < countPerSide; i++) {
        const z = Math.random() * 1.5 + 0.5 // Depth scale in range [0.5, 2.0]
        particlesRef.current.push({
          x: (width * 0.55) + Math.random() * (width * 0.45),
          y: Math.random() * height,
          z: z,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseSize: Math.random() * 1.8 + 1.2,
          opacity: Math.random() * 0.45 + 0.25,
          color: blueColors[Math.floor(Math.random() * blueColors.length)],
          side: 'right'
        })
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Mouse move tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      // Clear the scaled canvas space
      ctx.clearRect(0, 0, width, height)
      
      const particles = particlesRef.current
      const len = particles.length

      // Calculate smooth target parallax offsets relative to the center of the screen
      const targetParallaxX = (mouseRef.current.x - width / 2) * 0.04
      const targetParallaxY = (mouseRef.current.y - height / 2) * 0.04

      // Interpolate for silky smooth movement
      parallaxOffset.current.x += (targetParallaxX - parallaxOffset.current.x) * 0.08
      parallaxOffset.current.y += (targetParallaxY - parallaxOffset.current.y) * 0.08

      // Draw background ambient glows (replicates the dark, neon-lit photo background)
      const leftGlow = ctx.createRadialGradient(0, height, 0, 0, height, width * 0.45)
      leftGlow.addColorStop(0, 'rgba(255, 59, 0, 0.16)')
      leftGlow.addColorStop(0.5, 'rgba(255, 59, 0, 0.04)')
      leftGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = leftGlow
      ctx.fillRect(0, 0, width, height)

      const rightGlow = ctx.createRadialGradient(width, height, 0, width, height, width * 0.45)
      rightGlow.addColorStop(0, 'rgba(0, 168, 255, 0.16)')
      rightGlow.addColorStop(0.5, 'rgba(0, 168, 255, 0.04)')
      rightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = rightGlow
      ctx.fillRect(0, 0, width, height)

      // Update positions and velocities
      particles.forEach(p => {
        // Apply side constraints
        if (p.side === 'left') {
          if (p.x > width * 0.48) p.vx -= 0.01
        } else {
          if (p.x < width * 0.52) p.vx += 0.01
        }

        // Project positions incorporating Z-Depth and smooth mouse Parallax
        const projX = p.x + parallaxOffset.current.x * (p.z - 1.0)
        const projY = p.y + parallaxOffset.current.y * (p.z - 1.0)

        // Mouse attraction/repulsion based on projected coordinate proximity
        const dx = mouseRef.current.x - projX
        const dy = mouseRef.current.y - projY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 140) {
          const force = (140 - distance) / 140
          // Closer objects (high z) respond with greater velocity due to perspective
          p.vx += (dx / distance) * force * 0.015 * p.z
          p.vy += (dy / distance) * force * 0.015 * p.z
        }

        // Apply velocities
        p.x += p.vx
        p.y += p.vy

        // Apply friction
        p.vx *= 0.97
        p.vy *= 0.97

        // Bounce boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        else if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        else if (p.y > height) { p.y = height; p.vy *= -1; }
      })

      // Draw Connection Lines (Projected coordinates)
      ctx.lineWidth = 0.55
      for (let i = 0; i < len; i++) {
        const pA = particles[i]
        const projXA = pA.x + parallaxOffset.current.x * (pA.z - 1.0)
        const projYA = pA.y + parallaxOffset.current.y * (pA.z - 1.0)

        for (let j = i + 1; j < len; j++) {
          const pB = particles[j]
          if (pA.side !== pB.side) continue

          const projXB = pB.x + parallaxOffset.current.x * (pB.z - 1.0)
          const projYB = pB.y + parallaxOffset.current.y * (pB.z - 1.0)

          const dx = projXA - projXB
          const dy = projYA - projYB
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          // Connect nearby projected nodes
          if (dist < 100) {
            // Transparency scales by distance and average depth
            const avgDepth = (pA.z + pB.z) / 2
            const alpha = ((100 - dist) / 100) * 0.15 * (avgDepth / 1.5)
            ctx.beginPath()
            ctx.moveTo(projXA, projYA)
            ctx.lineTo(projXB, projYB)
            ctx.strokeStyle = pA.side === 'left' ? `rgba(255, 95, 0, ${alpha})` : `rgba(0, 168, 255, ${alpha})`
            ctx.stroke()
          }
        }
      }

      // Draw Low-Poly Triangles (Projected coordinates)
      const maxTriangleDist = 85
      for (let i = 0; i < len; i++) {
        const pA = particles[i]
        const projXA = pA.x + parallaxOffset.current.x * (pA.z - 1.0)
        const projYA = pA.y + parallaxOffset.current.y * (pA.z - 1.0)

        for (let j = i + 1; j < len; j++) {
          const pB = particles[j]
          if (pA.side !== pB.side) continue
          const projXB = pB.x + parallaxOffset.current.x * (pB.z - 1.0)
          const projYB = pB.y + parallaxOffset.current.y * (pB.z - 1.0)

          const dxAB = projXA - projXB
          const dyAB = projYA - projYB
          const distAB = dxAB * dxAB + dyAB * dyAB
          if (distAB > maxTriangleDist * maxTriangleDist) continue

          for (let k = j + 1; k < len; k++) {
            const pC = particles[k]
            if (pB.side !== pC.side) continue
            const projXC = pC.x + parallaxOffset.current.x * (pC.z - 1.0)
            const projYC = pC.y + parallaxOffset.current.y * (pC.z - 1.0)

            const dxBC = projXB - projXC
            const dyBC = projYB - projYC
            const distBC = dxBC * dxBC + dyBC * dyBC
            if (distBC > maxTriangleDist * maxTriangleDist) continue

            const dxCA = projXC - projXA
            const dyCA = projYC - projYA
            const distCA = dxCA * dxCA + dyCA * dyCA
            if (distCA > maxTriangleDist * maxTriangleDist) continue

            // Render faint low-poly 3D faces
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(projXA, projYA)
            ctx.lineTo(projXB, projYB)
            ctx.lineTo(projXC, projYC)
            ctx.closePath()
            
            const avgDepth = (pA.z + pB.z + pC.z) / 3
            const faceAlpha = 0.024 * (avgDepth / 1.5)
            ctx.fillStyle = pA.side === 'left' 
              ? `rgba(255, 95, 0, ${faceAlpha})` 
              : `rgba(0, 168, 255, ${faceAlpha})`
            ctx.fill()
            ctx.restore()
          }
        }
      }

      // Draw mouse connection lines to projected nodes
      const mX = mouseRef.current.x
      const mY = mouseRef.current.y
      if (mX > 0 && mY > 0) {
        particles.forEach(p => {
          const projX = p.x + parallaxOffset.current.x * (p.z - 1.0)
          const projY = p.y + parallaxOffset.current.y * (p.z - 1.0)
          const dx = projX - mX
          const dy = projY - mY
          const dist = Math.sqrt(dx * dx + dy * dy)
          
          if (dist < 130) {
            const alpha = ((130 - dist) / 130) * 0.16 * (p.z / 1.5)
            ctx.beginPath()
            ctx.moveTo(projX, projY)
            ctx.lineTo(mX, mY)
            ctx.strokeStyle = p.side === 'left' ? `rgba(255, 95, 0, ${alpha})` : `rgba(0, 168, 255, ${alpha})`
            ctx.lineWidth = 0.7 * p.z
            ctx.stroke()
          }
        })
      }

      // Draw particle nodes (incorporating size & depth effects)
      particles.forEach(p => {
        const projX = p.x + parallaxOffset.current.x * (p.z - 1.0)
        const projY = p.y + parallaxOffset.current.y * (p.z - 1.0)
        
        // Closer nodes are scaled larger and have higher opacity
        const renderedSize = p.baseSize * p.z
        const renderedOpacity = p.opacity * (p.z / 1.5)

        ctx.save()
        ctx.globalAlpha = Math.max(0.1, Math.min(1.0, renderedOpacity))
        ctx.fillStyle = p.color
        
        // Dynamic neon glow shadow proportional to depth
        ctx.shadowColor = p.color
        ctx.shadowBlur = 6 * p.z
        
        ctx.beginPath()
        ctx.arc(projX, projY, renderedSize, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

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
