import { describe, expect, it, vi } from 'vitest'

import { getTransformValues } from '@/utils/getTransformValues'

describe('getTransformValues.ts', () => {
  it('gets the transform matrix of an element', () => {
    const div = document.createElement('div')
    div.style.transform = 'scale(.4, .6) translate(-30px, 20px)'
    // The vitest mocked implementation of getComputedStyle will return the transform as is, but it's not what we get in the browser
    vi.spyOn(window, 'getComputedStyle').mockImplementation(() => ({transform: 'matrix(0.4, 0, 0, 0.6, -12, 12)'} as unknown as CSSStyleDeclaration))
    expect(window.getComputedStyle(div).transform).toBe('matrix(0.4, 0, 0, 0.6, -12, 12)')
    const results = getTransformValues(div)

    expect(results).toStrictEqual([.4, 0, 0, .6, -12, 12])
  })
})