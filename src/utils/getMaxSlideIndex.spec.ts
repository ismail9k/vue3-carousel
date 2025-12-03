import { describe, expect, it } from 'vitest'

import { DEFAULT_CONFIG } from '@/shared'

import { getMaxSlideIndex } from './getMaxSlideIndex'

describe('getMaxSlideIndex', () => {
  describe('with itemsToShow: "auto"', () => {
    it('should return slidesCount - 1 regardless of navigationBoundary', () => {
      const config = { ...DEFAULT_CONFIG, itemsToShow: 'auto' as const }

      expect(getMaxSlideIndex(config, 10)).toBe(9)
      expect(getMaxSlideIndex(config, 5)).toBe(4)
      expect(getMaxSlideIndex(config, 1)).toBe(0)
    })

    it('should return slidesCount - 1 with viewport navigationBoundary', () => {
      const config = {
        ...DEFAULT_CONFIG,
        itemsToShow: 'auto' as const,
        navigationBoundary: 'viewport' as const,
      }

      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })
  })

  describe('with navigationBoundary: "slides"', () => {
    it('should return slidesCount - 1 regardless of snapAlign', () => {
      const baseConfig = { ...DEFAULT_CONFIG, navigationBoundary: 'slides' as const }

      // Test with different snapAlign options
      expect(getMaxSlideIndex({ ...baseConfig, snapAlign: 'start' }, 10)).toBe(9)
      expect(getMaxSlideIndex({ ...baseConfig, snapAlign: 'center' }, 10)).toBe(9)
      expect(getMaxSlideIndex({ ...baseConfig, snapAlign: 'end' }, 10)).toBe(9)
      expect(
        getMaxSlideIndex({ ...baseConfig, snapAlign: 'center-odd' }, 10)
      ).toBe(9)
      expect(
        getMaxSlideIndex({ ...baseConfig, snapAlign: 'center-even' }, 10)
      ).toBe(9)
    })

    it('should return slidesCount - 1 with different itemsToShow values', () => {
      const config = { ...DEFAULT_CONFIG, navigationBoundary: 'slides' as const }

      expect(getMaxSlideIndex({ ...config, itemsToShow: 1 }, 10)).toBe(9)
      expect(getMaxSlideIndex({ ...config, itemsToShow: 3 }, 10)).toBe(9)
      expect(getMaxSlideIndex({ ...config, itemsToShow: 5 }, 10)).toBe(9)
    })
  })

  describe('with navigationBoundary: "viewport" and snapAlign: "start"', () => {
    const baseConfig = {
      ...DEFAULT_CONFIG,
      navigationBoundary: 'viewport' as const,
      snapAlign: 'start' as const,
    }

    it('should calculate maxSlide correctly with itemsToShow: 1', () => {
      const config = { ...baseConfig, itemsToShow: 1 }
      // slidesCount=10, itemsToShow=1, snapOffset=0
      // maxSlide = 10 - 1 - 0 = 9
      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })

    it('should calculate maxSlide correctly with itemsToShow: 3', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=10, itemsToShow=3, snapOffset=0
      // maxSlide = 10 - 3 - 0 = 7
      expect(getMaxSlideIndex(config, 10)).toBe(7)
    })

    it('should calculate maxSlide correctly with itemsToShow: 5', () => {
      const config = { ...baseConfig, itemsToShow: 5 }
      // slidesCount=10, itemsToShow=5, snapOffset=0
      // maxSlide = 10 - 5 - 0 = 5
      expect(getMaxSlideIndex(config, 10)).toBe(5)
    })

    it('should return 0 when slidesCount < itemsToShow', () => {
      const config = { ...baseConfig, itemsToShow: 5 }
      expect(getMaxSlideIndex(config, 3)).toBe(0)
    })
  })

  describe('with navigationBoundary: "viewport" and snapAlign: "center"', () => {
    const baseConfig = {
      ...DEFAULT_CONFIG,
      navigationBoundary: 'viewport' as const,
      snapAlign: 'center' as const,
    }

    it('should calculate maxSlide correctly with itemsToShow: 1', () => {
      const config = { ...baseConfig, itemsToShow: 1 }
      // slidesCount=10, itemsToShow=1, snapOffset=(1-1)/2=0
      // maxSlide = 10 - 1 + ceil(0) = 9
      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })

    it('should calculate maxSlide correctly with itemsToShow: 3', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=10, itemsToShow=3, snapOffset=(3-1)/2=1
      // maxSlide = 10 - 3 + ceil(1) = 8
      expect(getMaxSlideIndex(config, 10)).toBe(8)
    })

    it('should calculate maxSlide correctly with itemsToShow: 5', () => {
      const config = { ...baseConfig, itemsToShow: 5 }
      // slidesCount=10, itemsToShow=5, snapOffset=(5-1)/2=2
      // maxSlide = 10 - 5 + ceil(2) = 7
      expect(getMaxSlideIndex(config, 10)).toBe(7)
    })

    it('should handle fractional snapOffset with even itemsToShow', () => {
      const config = { ...baseConfig, itemsToShow: 4 }
      // slidesCount=10, itemsToShow=4, snapOffset=(4-1)/2=1.5
      // maxSlide = 10 - 4 + ceil(1.5) = 8
      expect(getMaxSlideIndex(config, 10)).toBe(8)
    })

    it('should allow reaching all slides with 6 items and itemsToShow: 3', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=6, itemsToShow=3, snapOffset=(3-1)/2=1
      // maxSlide = 6 - 3 + ceil(1) = 4
      // This allows navigating to slides 0,1,2,3,4 which covers all 6 slides
      expect(getMaxSlideIndex(config, 6)).toBe(4)
    })
  })

  describe('with navigationBoundary: "viewport" and snapAlign: "end"', () => {
    const baseConfig = {
      ...DEFAULT_CONFIG,
      navigationBoundary: 'viewport' as const,
      snapAlign: 'end' as const,
    }

    it('should calculate maxSlide correctly with itemsToShow: 1', () => {
      const config = { ...baseConfig, itemsToShow: 1 }
      // slidesCount=10, itemsToShow=1, snapOffset=1-1=0
      // maxSlide = 10 - 1 + ceil(0) = 9
      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })

    it('should calculate maxSlide correctly with itemsToShow: 3', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=10, itemsToShow=3, snapOffset=3-1=2
      // maxSlide = 10 - 3 + ceil(2) = 9
      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })

    it('should calculate maxSlide correctly with itemsToShow: 5', () => {
      const config = { ...baseConfig, itemsToShow: 5 }
      // slidesCount=10, itemsToShow=5, snapOffset=5-1=4
      // maxSlide = 10 - 5 + ceil(4) = 9
      expect(getMaxSlideIndex(config, 10)).toBe(9)
    })
  })

  describe('with navigationBoundary: "viewport" and snapAlign: "center-odd"', () => {
    const baseConfig = {
      ...DEFAULT_CONFIG,
      navigationBoundary: 'viewport' as const,
      snapAlign: 'center-odd' as const,
    }

    it('should calculate maxSlide correctly with odd itemsToShow', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=10, itemsToShow=3, snapOffset=(3-1)/2=1
      // maxSlide = 10 - 3 + ceil(1) = 8
      expect(getMaxSlideIndex(config, 10)).toBe(8)
    })

    it('should calculate maxSlide correctly with itemsToShow: 5', () => {
      const config = { ...baseConfig, itemsToShow: 5 }
      // slidesCount=10, itemsToShow=5, snapOffset=(5-1)/2=2
      // maxSlide = 10 - 5 + ceil(2) = 7
      expect(getMaxSlideIndex(config, 10)).toBe(7)
    })
  })

  describe('with navigationBoundary: "viewport" and snapAlign: "center-even"', () => {
    const baseConfig = {
      ...DEFAULT_CONFIG,
      navigationBoundary: 'viewport' as const,
      snapAlign: 'center-even' as const,
    }

    it('should calculate maxSlide correctly with even itemsToShow', () => {
      const config = { ...baseConfig, itemsToShow: 2 }
      // slidesCount=10, itemsToShow=2, snapOffset=(2-2)/2=0
      // maxSlide = 10 - 2 + ceil(0) = 8
      expect(getMaxSlideIndex(config, 10)).toBe(8)
    })

    it('should calculate maxSlide correctly with itemsToShow: 4', () => {
      const config = { ...baseConfig, itemsToShow: 4 }
      // slidesCount=10, itemsToShow=4, snapOffset=(4-2)/2=1
      // maxSlide = 10 - 4 + ceil(1) = 7
      expect(getMaxSlideIndex(config, 10)).toBe(7)
    })

    it('should calculate maxSlide correctly with itemsToShow: 6', () => {
      const config = { ...baseConfig, itemsToShow: 6 }
      // slidesCount=10, itemsToShow=6, snapOffset=(6-2)/2=2
      // maxSlide = 10 - 6 + ceil(2) = 6
      expect(getMaxSlideIndex(config, 10)).toBe(6)
    })

    it('should calculate maxSlide correctly with odd itemsToShow (user bug report)', () => {
      const config = { ...baseConfig, itemsToShow: 3 }
      // slidesCount=6, itemsToShow=3, snapOffset=(3-2)/2=0.5
      // maxSlide = 6 - 3 + ceil(0.5) = 4
      // User reported seeing maxSlide=4 - CORRECT with ceil!
      expect(getMaxSlideIndex(config, 6)).toBe(4)
    })
  })

  describe('edge cases', () => {
    it('should handle slidesCount equals itemsToShow', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center' as const,
        itemsToShow: 5,
      }
      // slidesCount=5, itemsToShow=5, snapOffset=(5-1)/2=2
      // maxSlide = 5 - 5 + ceil(2) = 2
      expect(getMaxSlideIndex(config, 5)).toBe(2)
    })

    it('should handle very small slidesCount', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'start' as const,
        itemsToShow: 3,
      }
      expect(getMaxSlideIndex(config, 1)).toBe(0)
      expect(getMaxSlideIndex(config, 2)).toBe(0)
    })

    it('should handle fractional itemsToShow', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center' as const,
        itemsToShow: 2.5,
      }
      // slidesCount=10, itemsToShow=2.5, snapOffset=(2.5-1)/2=0.75
      // maxSlide = 10 - 2.5 + ceil(0.75) = 10 - 2.5 + 1 = 8.5
      expect(getMaxSlideIndex(config, 10)).toBe(8.5)
    })
  })
})
