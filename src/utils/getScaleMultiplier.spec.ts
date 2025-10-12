import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getScaleMultipliers,
  getTransformValues,
  invalidateTransformCache,
} from '@/utils/getScaleMultipliers'

describe('getScaleMultipliers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('gets the transform matrix of an element', () => {
    const div = document.createElement('div')
    div.style.transform = 'scale(.4, .6) translate(-30px, 20px)'
    // The vitest mocked implementation of getComputedStyle will return the transform as is, but it's not what we get in the browser
    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          transform: 'matrix(0.4, 0, 0, 0.6, -12, 12)',
        }) as unknown as CSSStyleDeclaration
    )
    expect(window.getComputedStyle(div).transform).toBe('matrix(0.4, 0, 0, 0.6, -12, 12)')
    const results = getTransformValues(div)

    expect(results).toStrictEqual([0.4, 0, 0, 0.6, -12, 12])
  })

  it('caches transform values for repeated calls', () => {
    const div = document.createElement('div')
    const getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          transform: 'matrix(0.5, 0, 0, 0.5, 0, 0)',
        }) as unknown as CSSStyleDeclaration
    )

    // First call should compute
    const result1 = getTransformValues(div)
    expect(getComputedStyleSpy).toHaveBeenCalledTimes(1)

    // Second call should use cache
    const result2 = getTransformValues(div)
    expect(getComputedStyleSpy).toHaveBeenCalledTimes(1) // Still 1, not 2
    expect(result2).toBe(result1) // Same reference

    invalidateTransformCache(new Set([div]))
  })

  it('handles no transform gracefully', () => {
    const div = document.createElement('div')
    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          transform: 'none',
        }) as unknown as CSSStyleDeclaration
    )

    const results = getTransformValues(div)
    expect(results).toStrictEqual([1, 0, 0, 1, 0, 0]) // Identity matrix
  })

  it('returns identity multipliers for empty set', () => {
    const transformElements = new Set<HTMLElement>()
    const result = getScaleMultipliers(transformElements)

    expect(result).toEqual({ widthMultiplier: 1, heightMultiplier: 1 })
  })

  it('calculates scale multipliers correctly', () => {
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')

    vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
      if (el === div1) {
        return { transform: 'matrix(0.5, 0, 0, 0.5, 0, 0)' } as unknown as CSSStyleDeclaration
      }
      return { transform: 'matrix(2, 0, 0, 2, 0, 0)' } as unknown as CSSStyleDeclaration
    })

    const transformElements = new Set([div1, div2])
    const result = getScaleMultipliers(transformElements)

    // 1 / 0.5 / 2 = 1 (they cancel out)
    expect(result.widthMultiplier).toBe(1)
    expect(result.heightMultiplier).toBe(1)

    invalidateTransformCache(transformElements)
  })

  it('avoids division by zero', () => {
    const div = document.createElement('div')
    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          transform: 'matrix(0, 0, 0, 0, 0, 0)',
        }) as unknown as CSSStyleDeclaration
    )

    const transformElements = new Set([div])
    const result = getScaleMultipliers(transformElements)

    // Should not divide by zero, multipliers should remain 1
    expect(result.widthMultiplier).toBe(1)
    expect(result.heightMultiplier).toBe(1)

    invalidateTransformCache(transformElements)
  })

  it('invalidates cache for specific elements', () => {
    const div = document.createElement('div')
    const getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle').mockImplementation(
      () =>
        ({
          transform: 'matrix(0.5, 0, 0, 0.5, 0, 0)',
        }) as unknown as CSSStyleDeclaration
    )

    // First call
    getTransformValues(div)
    expect(getComputedStyleSpy).toHaveBeenCalledTimes(1)

    // Cached call
    getTransformValues(div)
    expect(getComputedStyleSpy).toHaveBeenCalledTimes(1)

    // Invalidate cache
    invalidateTransformCache(new Set([div]))

    // Should recompute
    getTransformValues(div)
    expect(getComputedStyleSpy).toHaveBeenCalledTimes(2)
  })
})
