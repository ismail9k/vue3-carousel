import { expect, it, describe } from 'vitest'

import { toPx } from './toPx'

describe('toPx', () => {
  it('converts a number to a px string', () => {
    expect(toPx(10)).toBe('10px')
  })

  it('returns a valid CSS unit string as-is', () => {
    expect(toPx('5em')).toBe('5em')
    expect(toPx('auto')).toBe('auto')
    expect(toPx('100%')).toBe('100%')
  })

  it('handles undefined input', () => {
    expect(toPx(undefined)).toBeUndefined()
  })

  it('returns string input without alteration', () => {
    expect(toPx('')).toBe('')
    expect(toPx('inherit')).toBe('inherit')
  })

  it('handles zero correctly', () => {
    expect(toPx(0)).toBe('0px')
  })

  it('handles unexpected string input gracefully', () => {
    // Assuming we want to pass through strings even if they are unexpected
    expect(toPx('random')).toBe('random')
  })
})
