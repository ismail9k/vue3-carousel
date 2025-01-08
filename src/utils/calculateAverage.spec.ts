import { describe, expect, test } from 'vitest'

import { calculateAverage } from './calculateAverage'

describe('calculateAverage', () => {
  test('calculates average for multiple values', () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3)
  })

  test('calculates average for single value', () => {
    expect(calculateAverage([5])).toBe(5)
  })

  test('handles decimal numbers', () => {
    expect(calculateAverage([1.5, 2.5, 3.5])).toBe(2.5)
  })

  test('handles negative numbers', () => {
    expect(calculateAverage([-1, 0, 1])).toBe(0)
  })

  test('returns 0 for empty array', () => {
    expect(calculateAverage([])).toBe(0)
  })
})
