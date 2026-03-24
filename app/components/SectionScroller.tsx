'use client'
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import React from 'react'

interface CardScrollContextType {
  activeCard: number
  currentSection: number
}

export const CardScrollContext = createContext<CardScrollContextType>({
  activeCard: 0,
  currentSection: 0,
})

export function useCardScroll() {
  return useContext(CardScrollContext)
}

const CARD_SECTION_INDEX = 2
const TOTAL_CARDS = 4
const SECTION_TRANSITION_MS = 800
const CARD_TRANSITION_MS = 900

interface SectionScrollerProps {
  sections: React.ReactNode[]
}

export default function SectionScroller({ sections }: SectionScrollerProps) {
  const [currentSection, setCurrentSection] = useState(0)
  const [activeCard, setActiveCard] = useState(0)
  const isTransitioning = useRef(false)
  const touchStartY = useRef(0)
  const currentSectionRef = useRef(0)
  const activeCardRef = useRef(0)

  // Keep refs in sync with state for use in event handlers
  useEffect(() => { currentSectionRef.current = currentSection }, [currentSection])
  useEffect(() => { activeCardRef.current = activeCard }, [activeCard])

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isTransitioning.current) return
    const sec = currentSectionRef.current
    const card = activeCardRef.current

    if (direction === 'next') {
      if (sec === CARD_SECTION_INDEX && card < TOTAL_CARDS - 1) {
        isTransitioning.current = true
        setActiveCard(c => c + 1)
        setTimeout(() => { isTransitioning.current = false }, CARD_TRANSITION_MS)
        return
      }
      if (sec < sections.length - 1) {
        isTransitioning.current = true
        const next = sec + 1
        setCurrentSection(next)
        if (next === CARD_SECTION_INDEX) setActiveCard(0)
        setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
      }
    } else {
      if (sec === CARD_SECTION_INDEX && card > 0) {
        isTransitioning.current = true
        setActiveCard(c => c - 1)
        setTimeout(() => { isTransitioning.current = false }, CARD_TRANSITION_MS)
        return
      }
      if (sec > 0) {
        isTransitioning.current = true
        const prev = sec - 1
        setCurrentSection(prev)
        if (prev === CARD_SECTION_INDEX) setActiveCard(TOTAL_CARDS - 1)
        setTimeout(() => { isTransitioning.current = false }, SECTION_TRANSITION_MS)
      }
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
      if (idx === CARD_SECTION_INDEX) setActiveCard(0)
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
    <CardScrollContext.Provider value={{ activeCard, currentSection }}>
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
    </CardScrollContext.Provider>
  )
}