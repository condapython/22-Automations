'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroVideoBackgroundProps {
  videoSources: string[]
  className?: string
}

export default function HeroVideoBackground({ videoSources, className = '' }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsLoaded(true)
      setHasError(false)
    }

    const handleError = () => {
      setHasError(true)
      console.log('Video failed to load, using fallback background')
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('error', handleError)

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('error', handleError)
    }
  }, [])

  // Don't render video on mobile devices for performance
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return (
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 ${className}`} />
    )
  }

  return (
    <div className={`absolute inset-0 ${className}`}>
      {!hasError && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-20' : 'opacity-0'
          }`}
          style={{ filter: 'brightness(0.7) contrast(1.2)' }}
        >
          {videoSources.map((src, index) => (
            <source key={index} src={src} type="video/mp4" />
          ))}
        </video>
      )}

      {/* Always show fallback gradient if video fails or is loading */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 transition-opacity duration-1000 ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Video Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/40"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50"></div>
    </div>
  )
}
