import { expect, it, describe } from 'vitest'

import { CarouselConfig } from '@/shared'
import { getMaxSlideIndex } from '@/utils'

describe('getCurrentSlideIndex', () => {
  describe('wrap-around: true', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const config = { wrapAround: true, itemsToShow: 1 }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
    it('When slidesCount larger than 0 should return (slidesCount - 1)', () => {
      const slidesCount = 10
      const config = { wrapAround: true, itemsToShow: 1 }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - 1)
    })
  })

  describe('wrap-around: false', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const config = { wrapAround: false, itemsToShow: 1 } as Partial<CarouselConfig>

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When snapAlign is start should return (slidesCount - itemsToShow)', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'start',
      } as const

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - (config.itemsToShow ?? 0))
    })

    it('When snapAlign is end should return (slidesCount - 1)', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'end',
      } as const

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - 1)
    })
    it('When snapAlign is center/center-odd should return (slidesCount - Math.ceil((itemsToShow - 0.5) / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 4.5,
        snapAlign: 'center-odd',
      } as const

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(8)
    })
    it('When snapAlign is center-even should return (slidesCount - Math.ceil(itemsToShow / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 4.5,
        snapAlign: 'center-even',
      } as const

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(7)
    })

    it('When snapAlign is missing should return slidesCount - 1', () => {
      const slidesCount = 10
      const config = { wrapAround: false, itemsToShow: 1 }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(9)
    })

    it('When itemsToShow > slidesCount should return max slide index', () => {
      const slidesCount = 1
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'start',
      } as const

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
  })
})
