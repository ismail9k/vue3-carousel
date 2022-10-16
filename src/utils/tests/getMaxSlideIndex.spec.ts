import { getMaxSlideIndex } from '@/utils'

describe('getCurrentSlideIndex', () => {
  describe('warp-around: true', () => {
    it('When slidesCount is 0 should return 0', () => {
      let results = getMaxSlideIndex({ wrapAround: true, itemsToShow: 1 }, 0)

      expect(results).toBe(0)
    })
    it('When slidesCount larger than 0 should return (slidesCount - 1)', () => {
      const slidesCount = 10
      const itemsToShow = 1
      let results = getMaxSlideIndex({ wrapAround: true, itemsToShow }, slidesCount)

      expect(results).toBe(slidesCount - 1)
    })
  })

  describe('warp-around: false', () => {
    it('When slidesCount is 0 should return 0', () => {
      let results = getMaxSlideIndex({ wrapAround: false, itemsToShow: 1 }, 0)

      expect(results).toBe(0)
    })

    it('When snapAlign is start should return (slidesCount - itemsToShow)', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMaxSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'start' },
        slidesCount
      )

      expect(results).toBe(slidesCount - itemsToShow)
    })

    it('When snapAlign is end should return (slidesCount - 1)', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMaxSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'end' },
        slidesCount
      )

      expect(results).toBe(slidesCount - 1)
    })
    it('When snapAlign is center/center-odd should return (slidesCount - Math.ceil((itemsToShow - 0.5) / 2))', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMaxSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'center-odd' },
        slidesCount
      )

      expect(results).toBe(slidesCount - Math.ceil((itemsToShow - 0.5) / 2))
    })
    it('When snapAlign is center-even should return (slidesCount - Math.ceil(itemsToShow / 2))', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMaxSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'center-even' },
        slidesCount
      )

      expect(results).toBe(slidesCount - Math.ceil(itemsToShow / 2))
    })

    it('When snapAlign is missing should return 0', () => {
      let results = getMaxSlideIndex({ wrapAround: false, itemsToShow: 1 }, 10)

      expect(results).toBe(0)
    })

    it('When itemsToShow > slidesCount should return max slide index', () => {
      const itemsToShow = 5
      const slidesCount = 1
      let results = getMaxSlideIndex(
        { wrapAround: false, snapAlign: 'start', itemsToShow },
        slidesCount
      )

      expect(results).toBe(0)
    })
  })
})
