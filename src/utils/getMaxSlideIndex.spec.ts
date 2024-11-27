import { expect, it, describe } from 'vitest'

import { SnapAlign } from '@/shared'
import { getMaxSlideIndex } from '@/utils'

describe('getCurrentSlideIndex', () => {
  describe('warp-around: true', () => {
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

  describe('warp-around: false', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const config = { wrapAround: false, itemsToShow: 1 }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When snapAlign is start should return (slidesCount - itemsToShow)', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'start' as SnapAlign,
      }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - config.itemsToShow)
    })

    it('When snapAlign is end should return (slidesCount - 1)', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'end' as SnapAlign,
      }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - 1)
    })
    it('When snapAlign is center/center-odd should return (slidesCount - Math.ceil((itemsToShow - 0.5) / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'center-odd' as SnapAlign,
      }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - Math.ceil((config.itemsToShow - 0.5) / 2))
    })
    it('When snapAlign is center-even should return (slidesCount - Math.ceil(itemsToShow / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'center-even' as SnapAlign,
      }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(slidesCount - Math.ceil(config.itemsToShow / 2))
    })

    it('When snapAlign is missing should return 0', () => {
      const slidesCount = 10
      const config = { wrapAround: false, itemsToShow: 1 }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When itemsToShow > slidesCount should return max slide index', () => {
      const slidesCount = 1
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'start' as SnapAlign,
      }

      const results = getMaxSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
  })
})
