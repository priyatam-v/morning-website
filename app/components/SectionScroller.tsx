'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'

const SECTION_TRANSITION_MS = 800

interface SectionScrollerProps {
  sections: React.ReactNode[]
}

export default function SectionScroller({ sections }: SectionScrollerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const isTransitioning = useRef(false)
  const currentSectionRef = useRef(0)
  const touchStartY = useRef(0)

  useEffect(() => { currentSectionRef.current = currentSection }, [currentSection])

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning.current) return
    const sec = currentSectionRef.current

    if (direction === 'next' && sec < sections.length - 1) {
      isTransitioning.current = true
      setCurrentSection(sec + 1)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    } else if (direction === 'prev' && sec > 0) {
      isTransitioning.current = true
      setCurrentSection(sec - 1)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    }
  }, [sections.length])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 5) return
      navigate(e.deltaY > 0 ? 'next' : 'prev')
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) { e.preventDefault(); navigate('next') }
      if (['ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); navigate('prev') }
    }

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(delta) > 50) navigate(delta > 0 ? 'next' : 'prev')
    }

    const handleNavigate = (e: Event) => {
      const idx = (e as CustomEvent).detail?.index
      if (typeof idx !== 'number' || isTransitioning.current) return
      isTransitioning.current = true
      setCurrentSection(idx)
      setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    window.addEventListener('navigate-to-section', handleNavigate)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
      window.removeEventListener('navigate-to-section', handleNavigate)
    }
  }, [navigate])

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden' }}>
      <div
        style={{
          transform: `translateY(-${currentSection * 100}vh)`,
          transition: `transform ${SECTION_TRANSITION_MS}ms cubic-bezier(0.77, 0, 0.175, 1)`,
          willChange: 'transform',
        }}
      >
        {sections.map((section, i) => (
          <div key={i} style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
            {section}
          </div>
        ))}
      </div>
    </div>
  )
}
