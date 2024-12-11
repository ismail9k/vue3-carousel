import { expect, it, describe } from 'vitest'

import { getMinSlideIndex } from '@/utils'

describe('getCurrentSlideIndex', () => {
  describe('warp-around: true', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const config = { wrapAround: true, itemsToShow: 1 }

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
    it('When slidesCount larger than 0 should return 0', () => {
      const slidesCount = 10
      const config = { wrapAround: true, itemsToShow: 1 }

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
  })

  describe('warp-around: false', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const config = { wrapAround: false, itemsToShow: 1 }
      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When snapAlign is start should return 0', () => {
      const slidesCount = 0
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'start',
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When snapAlign is end should return (itemsToShow - 1)', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'end',
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(config.itemsToShow - 1)
    })
    it('When snapAlign is center/center-odd should return (Math.floor((itemsToShow - 1) / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'center-odd',
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(Math.floor((config.itemsToShow - 1) / 2))
    })
    it('When snapAlign is center-even should return (Math.floor((itemsToShow - 2) / 2))', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'center-even',
      } as const

      const results = getMinSlideIndex({ config, slidesCount })
      expect(results).toBe(Math.floor((config.itemsToShow - 2) / 2))
    })

    it('When snapAlign is missing should return 0', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 1,
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When snapAlign is invalid should return 0', () => {
      const slidesCount = 10
      const config = {
        wrapAround: false,
        itemsToShow: 1,
        snapAlign: 'foo'
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })

    it('When itemsToShow > slidesCount should return 0', () => {
      const slidesCount = 1
      const config = {
        wrapAround: false,
        itemsToShow: 5,
        snapAlign: 'center',
      } as const

      const results = getMinSlideIndex({ config, slidesCount })

      expect(results).toBe(0)
    })
  })
})
