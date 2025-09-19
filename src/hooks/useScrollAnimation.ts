'use client'

import { useInView } from 'react-intersection-observer'

export const useScrollAnimation = (threshold = 0.1) => {
  const [ref, inView] = useInView({
    threshold,
    triggerOnce: true,
  })

  return {
    ref,
    inView,
    animationProps: {
      initial: { opacity: 0, y: 50 },
      animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 },
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }
}
