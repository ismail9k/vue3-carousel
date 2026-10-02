import { describe, expect, it } from 'vitest'

import { getAlignPoint, getNativeScrollDelta } from './getNativeScrollDelta'

const rect = (start: number, end: number, vertical = false) =>
  vertical
    ? { top: start, bottom: end, left: 0, right: 0 }
    : { left: start, right: end, top: 0, bottom: 0 }

describe('getAlignPoint', () => {
  it('uses the left edge for start, right for end, middle for center (ltr)', () => {
    const r = rect(100, 300)
    const base = { isReversed: false, isVertical: false }
    expect(getAlignPoint(r, { ...base, align: 'start' })).toBe(100)
    expect(getAlignPoint(r, { ...base, align: 'end' })).toBe(300)
    expect(getAlignPoint(r, { ...base, align: 'center' })).toBe(200)
  })

  it('swaps start and end when reversed (rtl)', () => {
    const r = rect(100, 300)
    const base = { isReversed: true, isVertical: false }
    expect(getAlignPoint(r, { ...base, align: 'start' })).toBe(300)
    expect(getAlignPoint(r, { ...base, align: 'end' })).toBe(100)
  })

  it('uses top and bottom when vertical', () => {
    const r = rect(50, 150, true)
    const base = { isReversed: false, isVertical: true }
    expect(getAlignPoint(r, { ...base, align: 'start' })).toBe(50)
    expect(getAlignPoint(r, { ...base, align: 'end' })).toBe(150)
  })
})

describe('getNativeScrollDelta', () => {
  it('is the distance from the viewport align point to the slide align point', () => {
    const viewportRect = rect(100, 300)
    const base = { viewportRect, isReversed: false, isVertical: false }
    expect(
      getNativeScrollDelta({ ...base, align: 'start', slideRect: rect(300, 400) })
    ).toBe(200)
    expect(
      getNativeScrollDelta({ ...base, align: 'center', slideRect: rect(300, 400) })
    ).toBe(150)
    expect(
      getNativeScrollDelta({ ...base, align: 'end', slideRect: rect(300, 400) })
    ).toBe(100)
  })

  it('is negative for a slide before the viewport', () => {
    expect(
      getNativeScrollDelta({
        align: 'start',
        isReversed: false,
        isVertical: false,
        slideRect: rect(-200, -100),
        viewportRect: rect(0, 300),
      })
    ).toBe(-200)
  })

  it('aligns right edges for start when reversed', () => {
    expect(
      getNativeScrollDelta({
        align: 'start',
        isReversed: true,
        isVertical: false,
        slideRect: rect(-100, 0),
        viewportRect: rect(0, 300),
      })
    ).toBe(-300)
  })

  it('uses the vertical axis when vertical', () => {
    expect(
      getNativeScrollDelta({
        align: 'start',
        isReversed: false,
        isVertical: true,
        slideRect: rect(400, 600, true),
        viewportRect: rect(0, 200, true),
      })
    ).toBe(400)
  })
})
