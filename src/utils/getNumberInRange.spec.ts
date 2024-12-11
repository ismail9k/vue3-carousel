import { expect, it, describe } from 'vitest'

import { getNumberInRange } from '@/utils'

describe('getCurrentSlideIndex', () => {
  it('When the number inside the range should return the same value', () => {
    const val = 5
    const min = 0
    const max = 10
    const results = getNumberInRange({ val, min, max })

    expect(results).toBe(val)
  })

  it('When the number is larger than the range should return the max value', () => {
    const val = 15
    const min = 0
    const max = 10
    const results = getNumberInRange({ val, min, max })

    expect(results).toBe(max)
  })

  it('When the number is smaller than the range should return the min value', () => {
    const val = 2
    const min = 5
    const max = 10
    const results = getNumberInRange({ val, min, max })

    expect(results).toBe(min)
  })

  it('When the min is larger than max should return val', () => {
    const val = 2
    const min = 10
    const max = 5
    const results = getNumberInRange({ val, min, max })

    expect(results).toBe(val)
  })


  it('doesn`t bound a NaN min or max', () => {
    const val = 20
    expect(getNumberInRange({ val, min: 0, max: NaN })).toBe(val)
    expect(getNumberInRange({ val, min: NaN, max: 10 })).toBe(10)
  })
})
