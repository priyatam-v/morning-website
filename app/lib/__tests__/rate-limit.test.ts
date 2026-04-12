import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { checkRateLimit } from '../rate-limit'

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('allows the first request from an IP', () => {
    expect(checkRateLimit('1.2.3.4')).toBe(true)
  })

  it('allows up to 5 requests within the window', () => {
    const ip = '10.0.0.1'
    for (let i = 0; i < 5; i++) {
      expect(checkRateLimit(ip)).toBe(true)
    }
  })

  it('blocks the 6th request within the same 60-second window', () => {
    const ip = '10.0.0.2'
    for (let i = 0; i < 5; i++) checkRateLimit(ip)
    expect(checkRateLimit(ip)).toBe(false)
  })

  it('resets the counter after 60 seconds', () => {
    const ip = '10.0.0.3'
    for (let i = 0; i < 5; i++) checkRateLimit(ip)
    expect(checkRateLimit(ip)).toBe(false)

    vi.advanceTimersByTime(61_000)

    expect(checkRateLimit(ip)).toBe(true)
  })

  it('tracks different IPs independently', () => {
    const ipA = '192.168.1.1'
    const ipB = '192.168.1.2'
    for (let i = 0; i < 5; i++) checkRateLimit(ipA)
    expect(checkRateLimit(ipA)).toBe(false)
    expect(checkRateLimit(ipB)).toBe(true)
  })
})
