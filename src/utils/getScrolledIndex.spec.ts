import { describe, expect, it } from 'vitest'

import { getScrolledIndex } from '@/utils/getScrolledIndex'

describe('getScrolledIndex.ts', () => {
  it('returns a number in range with offset', () => {
    expect(getScrolledIndex(
      { config: { snapAlign: 'center', itemsToShow: 3, wrapAround: false }, slidesCount: 10, currentSlide: 3 },
    )).toBe(2)
  })
})