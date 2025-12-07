import { describe, expect, it } from 'vitest'

import { DEFAULT_CONFIG } from '@/shared'

import { getMinSlideIndex } from './getMinSlideIndex'

describe('getMinSlideIndex', () => {
  describe('with itemsToShow: "auto"', () => {
    it('should return 0 regardless of navigationBoundary', () => {
      const config = { ...DEFAULT_CONFIG, itemsToShow: 'auto' as const }

      expect(getMinSlideIndex(config)).toBe(0)
    })

    it('should return 0 with viewport navigationBoundary', () => {
      const config = {
        ...DEFAULT_CONFIG,
        itemsToShow: 'auto' as const,
        navigationBoundary: 'viewport' as const,
      }

      expect(getMinSlideIndex(config)).toBe(0)
    })
  })

  describe('with navigationBoundary: "slides"', () => {
    it('should return 0 regardless of snapAlign', () => {
      const baseConfig = { ...DEFAULT_CONFIG, navigationBoundary: 'slides' as const }

      // Test with different snapAlign options
      expect(getMinSlideIndex({ ...baseConfig, snapAlign: 'start' })).toBe(0)
      expect(getMinSlideIndex({ ...baseConfig, snapAlign: 'center' })).toBe(0)
      expect(getMinSlideIndex({ ...baseConfig, snapAlign: 'end' })).toBe(0)
      expect(getMinSlideIndex({ ...baseConfig, snapAlign: 'center-odd' })).toBe(0)
      expect(getMinSlideIndex({ ...baseConfig, snapAlign: 'center-even' })).toBe(0)
    })

    it('should return 0 with different itemsToShow values', () => {
      const config = { ...DEFAULT_CONFIG, navigationBoundary: 'slides' as const }

      expect(getMinSlideIndex({ ...config, itemsToShow: 1 })).toBe(0)
      expect(getMinSlideIndex({ ...config, itemsToShow: 3 })).toBe(0)
      expect(getMinSlideIndex({ ...config, itemsToShow: 5 })).toBe(0)
    })
  })

  describe('with navigationBoundary: "viewport"', () => {
    it('should return 0 with snapAlign: "start"', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'start' as const,
        itemsToShow: 3,
      }

      // snapOffset = 0, minSlide = 0
      expect(getMinSlideIndex(config)).toBe(0)
    })

    it('should calculate minSlide correctly with snapAlign: "center"', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center' as const,
        itemsToShow: 3,
      }

      // snapOffset = (3-1)/2 = 1, minSlide = floor(1) = 1
      expect(getMinSlideIndex(config)).toBe(1)
    })

    it('should calculate minSlide correctly with snapAlign: "end"', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'end' as const,
        itemsToShow: 3,
      }

      // snapOffset = 3-1 = 2, minSlide = floor(2) = 2
      expect(getMinSlideIndex(config)).toBe(2)
    })

    it('should calculate minSlide correctly with snapAlign: "center-odd"', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center-odd' as const,
        itemsToShow: 3,
      }

      // snapOffset = (3-1)/2 = 1, minSlide = floor(1) = 1
      expect(getMinSlideIndex(config)).toBe(1)
    })

    it('should calculate minSlide correctly with snapAlign: "center-even"', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center-even' as const,
        itemsToShow: 2,
      }

      // snapOffset = (2-2)/2 = 0, minSlide = floor(0) = 0
      expect(getMinSlideIndex(config)).toBe(0)
    })

    it('should calculate minSlide correctly with snapAlign: "center-even" and odd itemsToShow', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center-even' as const,
        itemsToShow: 3,
      }

      // snapOffset = (3-2)/2 = 0.5, minSlide = floor(0.5) = 0
      expect(getMinSlideIndex(config)).toBe(0)
    })

    it('should handle fractional snapOffset', () => {
      const config = {
        ...DEFAULT_CONFIG,
        navigationBoundary: 'viewport' as const,
        snapAlign: 'center' as const,
        itemsToShow: 4,
      }

      // snapOffset = (4-1)/2 = 1.5, minSlide = floor(1.5) = 1
      expect(getMinSlideIndex(config)).toBe(1)
    })
  })
})
