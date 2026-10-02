import { afterEach, describe, expect, it, vi } from 'vitest'

import { supportsNativeCss } from './supportsNativeCss'

describe('supportsNativeCss', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('is false when the CSS object is missing (SSR, jsdom)', () => {
    vi.stubGlobal('CSS', undefined)
    expect(supportsNativeCss()).toBe(false)
  })

  it('is false when CSS.supports is missing', () => {
    vi.stubGlobal('CSS', {})
    expect(supportsNativeCss()).toBe(false)
  })

  it('asks CSS.supports for scroll-snap-type', () => {
    const supports = vi.fn(() => true)
    vi.stubGlobal('CSS', { supports })
    expect(supportsNativeCss()).toBe(true)
    expect(supports).toHaveBeenCalledWith('scroll-snap-type', 'x mandatory')
  })

  it('is false when CSS.supports rejects scroll-snap-type', () => {
    vi.stubGlobal('CSS', { supports: () => false })
    expect(supportsNativeCss()).toBe(false)
  })
})
