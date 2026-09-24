import { describe, expect, it } from 'vitest'

import { getNativeSlideIndex } from './getNativeSlideIndex'

// 5 slides of 100px laid out from `offset` (ltr), viewport 0..300
const ltrSlides = (offset: number) =>
  Array.from({ length: 5 }, (_, i) => ({
    left: offset + i * 100,
    right: offset + i * 100 + 100,
    top: 0,
    bottom: 0,
  }))
// rtl: first slide at the right edge, next ones to its left
const rtlSlides = (offset: number) =>
  Array.from({ length: 5 }, (_, i) => ({
    left: 200 - i * 100 + offset,
    right: 300 - i * 100 + offset,
    top: 0,
    bottom: 0,
  }))
const viewportRect = { left: 0, right: 300, top: 0, bottom: 0 }
const ltr = {
  align: 'center' as const,
  isReversed: false,
  isVertical: false,
  viewportRect,
}
const rtl = { ...ltr, isReversed: true }

describe('getNativeSlideIndex', () => {
  it('is -1 without slides', () => {
    expect(getNativeSlideIndex({ ...ltr, slideRects: [] })).toBe(-1)
  })

  it('is 0 at the scroll start even when another slide is nearer the align point', () => {
    expect(getNativeSlideIndex({ ...ltr, slideRects: ltrSlides(0) })).toBe(0)
    expect(getNativeSlideIndex({ ...ltr, slideRects: ltrSlides(0.5) })).toBe(0)
  })

  it('is the last index at the scroll end', () => {
    expect(getNativeSlideIndex({ ...ltr, slideRects: ltrSlides(-200) })).toBe(4)
    expect(getNativeSlideIndex({ ...ltr, slideRects: ltrSlides(-199.5) })).toBe(4)
  })

  it('is the slide whose align point is nearest in between', () => {
    // centers at -80, 20, 120, 220, 320; viewport center 150
    expect(getNativeSlideIndex({ ...ltr, slideRects: ltrSlides(-130) })).toBe(2)
    // start edges at -130, -30, 70, 170, 270; viewport start 0
    expect(
      getNativeSlideIndex({ ...ltr, align: 'start', slideRects: ltrSlides(-130) })
    ).toBe(1)
  })

  it('is 0 when every slide fits in the viewport', () => {
    const slideRects = ltrSlides(0).slice(0, 2)
    expect(getNativeSlideIndex({ ...ltr, slideRects })).toBe(0)
  })

  it('handles rtl edges', () => {
    expect(getNativeSlideIndex({ ...rtl, slideRects: rtlSlides(0) })).toBe(0)
    expect(getNativeSlideIndex({ ...rtl, slideRects: rtlSlides(200) })).toBe(4)
    // centers at 380, 280, 180, 80, -20; viewport center 150
    expect(getNativeSlideIndex({ ...rtl, slideRects: rtlSlides(130) })).toBe(2)
  })

  it('handles the vertical axis', () => {
    const slideRects = Array.from({ length: 5 }, (_, i) => ({
      top: -130 + i * 100,
      bottom: -30 + i * 100,
      left: 0,
      right: 0,
    }))
    expect(
      getNativeSlideIndex({
        align: 'center',
        isReversed: false,
        isVertical: true,
        slideRects,
        viewportRect: { top: 0, bottom: 300, left: 0, right: 0 },
      })
    ).toBe(2)
  })
})
