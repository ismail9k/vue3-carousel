import { describe, expect, it } from 'vitest'

import { applyEdgeSpacing } from '@/utils'

describe('applyEdgeSpacing', () => {
  it('returns the value unchanged when spacing is 0', () => {
    expect(applyEdgeSpacing({ value: 0, max: 100, spacing: 0 })).toBe(0)
    expect(applyEdgeSpacing({ value: 100, max: 100, spacing: 0 })).toBe(100)
  })

  it('returns the value unchanged between the edges', () => {
    expect(applyEdgeSpacing({ value: 50, max: 100, spacing: 16 })).toBe(50)
  })

  it('pushes the value before the start edge', () => {
    expect(applyEdgeSpacing({ value: 0, max: 100, spacing: 16 })).toBe(-16)
  })

  it('pushes the value past the end edge', () => {
    expect(applyEdgeSpacing({ value: 100, max: 100, spacing: 16 })).toBe(116)
  })

  it('prefers the start edge when everything fits', () => {
    expect(applyEdgeSpacing({ value: 0, max: 0, spacing: 16 })).toBe(-16)
  })

  it('ignores negative spacing', () => {
    expect(applyEdgeSpacing({ value: 0, max: 100, spacing: -5 })).toBe(0)
  })
})
