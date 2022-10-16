import { mapNumberToRange } from '@/utils'

describe('getCurrentSlideIndex', () => {
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

    expect(results).toBe(5)
  })
})
