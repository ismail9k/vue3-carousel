import { expect, it, describe } from 'vitest'

import { mapNumberToRange } from '@/utils'

describe('getCurrentSlideIndex', () => {
  it('Keeps float values less than 1 over max', () => {
    const val = 20.4
    const min = 10
    const max = 20
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(val)
  })

  it('When min is non zero should return correctly mapped value', () => {
    const val = 5
    const min = 10
    const max = 20
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(16)
  })

  it('When the number inside the range should return the same value', () => {
    const val = 5
    const min = 0
    const max = 10
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(val)
  })

  it('When the number is larger than the range should return correctly mapped value', () => {
    const val = 15
    const min = 0
    const max = 10
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(4)
  })

  it('When the number is smaller than the range should return correctly mapped value', () => {
    const val = -4
    const min = 0
    const max = 10
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(7)
  })

  it('Wraps float values more than 1 over max', () => {
    const val = 21.4
    const min = 10
    const max = 20
    const results = mapNumberToRange({ val, min, max })

    expect(results).toBe(21.4 - 11) // 10.4 but beware float point rounding error
  })
})
