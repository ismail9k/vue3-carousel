import { describe, expect, it } from 'vitest'

import { toCssValue } from './toCssValue'

describe('toCssValue', () => {
  it('should convert number to px string', () => {
    expect(toCssValue(10)).toBe('10px')
  })

  it('should return string as is', () => {
    expect(toCssValue('20%')).toBe('20%')
  })

  it('should handle zero correctly', () => {
    expect(toCssValue(0)).toBe('0px')
  })

  it('should handle empty string correctly', () => {
    expect(toCssValue('')).toBe(undefined)
  })
})
