import { getMinSlideIndex } from '@/partials/utils'

describe('getCurrentSlideIndex', () => {
  describe('warp-around: true', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const itemsToShow = 1
      let results = getMinSlideIndex({ wrapAround: true, itemsToShow }, slidesCount)

      expect(results).toBe(0)
    })
    it('When slidesCount larger than 0 should return 0', () => {
      const slidesCount = 10
      const itemsToShow = 1
      let results = getMinSlideIndex({ wrapAround: true, itemsToShow }, slidesCount)

      expect(results).toBe(0)
    })
  })

  describe('warp-around: false', () => {
    it('When slidesCount is 0 should return 0', () => {
      const slidesCount = 0
      const itemsToShow = 1
      let results = getMinSlideIndex({ wrapAround: false, itemsToShow }, slidesCount)

      expect(results).toBe(0)
    })

    it('When snapAlign is start should return 0', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMinSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'start' },
        slidesCount
      )

      expect(results).toBe(0)
    })

    it('When snapAlign is end should return (itemsToShow - 1)', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMinSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'end' },
        slidesCount
      )

      expect(results).toBe(itemsToShow - 1)
    })
    it('When snapAlign is center/center-odd should return (Math.floor((itemsToShow - 1) / 2))', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMinSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'center-odd' },
        slidesCount
      )

      expect(results).toBe(Math.floor((itemsToShow - 1) / 2))
    })
    it('When snapAlign is center-even should return (Math.floor((itemsToShow - 2) / 2))', () => {
      const itemsToShow = 5
      const slidesCount = 10
      let results = getMinSlideIndex(
        { wrapAround: false, itemsToShow, snapAlign: 'center-even' },
        slidesCount
      )

      expect(results).toBe(Math.floor((itemsToShow - 2) / 2))
    })

    it('When snapAlign is missing should return 0', () => {
      let results = getMinSlideIndex({ wrapAround: false, itemsToShow: 1 }, 10)

      expect(results).toBe(0)
    })

    it('When itemsToShow > slidesCount should return 0', () => {
      const itemsToShow = 5
      const slidesCount = 1
      let results = getMinSlideIndex(
        { wrapAround: false, snapAlign: 'center', itemsToShow },
        slidesCount
      )

      expect(results).toBe(0)
    })
  })
})
