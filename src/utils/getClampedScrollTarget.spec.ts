import { describe, expect, it } from 'vitest'

import { getClampedScrollTarget } from '@/utils'

const base = { itemsToScroll: 3, itemsToShow: 3, slidesCount: 9, snapAlignOffset: 1 }
const next = (currentIndex: number, over = {}) =>
  getClampedScrollTarget({ ...base, ...over, currentIndex, direction: 1 })
const prev = (currentIndex: number, over = {}) =>
  getClampedScrollTarget({ ...base, ...over, currentIndex, direction: -1 })

describe('getClampedScrollTarget', () => {
  it('steps the visible window from the clamped first position (center)', () => {
    // window 0..2 -> 3..5, centered index 4
    expect(next(0)).toBe(4)
  })

  it('lands on the last index when the window reaches the end', () => {
    // window 3..5 -> 6..8, last index so navigation disables
    expect(next(4)).toBe(8)
    expect(next(7)).toBe(8)
  })

  it('steps back from the clamped last position and lands on 0 at the start', () => {
    expect(prev(8)).toBe(4)
    expect(prev(4)).toBe(0)
  })

  it('equals index +/- itemsToScroll when the window is not clamped', () => {
    expect(next(4, { slidesCount: 10, itemsToScroll: 1 })).toBe(5)
    expect(prev(4, { slidesCount: 10, itemsToScroll: 1 })).toBe(3)
  })

  it('moves a full step back from a clamped last index with start alignment', () => {
    expect(prev(8, { snapAlignOffset: 0 })).toBe(3)
    expect(next(0, { snapAlignOffset: 0 })).toBe(3)
    expect(next(6, { snapAlignOffset: 0 })).toBe(8)
  })

  it('handles end alignment', () => {
    expect(next(0, { snapAlignOffset: 2 })).toBe(5)
    expect(next(5, { snapAlignOffset: 2 })).toBe(8)
    expect(prev(8, { snapAlignOffset: 2 })).toBe(5)
  })

  it('rounds half-slide offsets toward the current index', () => {
    const even = {
      itemsToShow: 2,
      itemsToScroll: 2,
      slidesCount: 6,
      snapAlignOffset: 0.5,
    }
    expect(next(0, even)).toBe(2)
    expect(next(2, even)).toBe(4)
    expect(next(4, even)).toBe(5)
    expect(prev(5, even)).toBe(3)
    expect(prev(3, even)).toBe(1)
    expect(prev(1, even)).toBe(0)
  })

  it('jumps to the edges when all slides fit', () => {
    expect(next(0, { itemsToShow: 9 })).toBe(8)
    expect(prev(8, { itemsToShow: 9 })).toBe(0)
  })

  it('falls back to index arithmetic without slides', () => {
    expect(next(0, { slidesCount: 0 })).toBe(3)
    expect(prev(0, { slidesCount: 0 })).toBe(-3)
  })
})
