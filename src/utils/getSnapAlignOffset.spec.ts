import { describe, expect, test } from 'vitest'

import { getSnapAlignOffset } from './getSnapAlignOffset'

describe('getSnapAlignOffset', () => {
  describe('with itemsToShow parameter', () => {
    test('should return correct offset for start alignment', () => {
      expect(getSnapAlignOffset({ align: 'start', itemsToShow: 3 })).toBe(0)
    })

    test('should return correct offset for center/center-odd alignment', () => {
      expect(getSnapAlignOffset({ align: 'center', itemsToShow: 3 })).toBe(1)
      expect(getSnapAlignOffset({ align: 'center-odd', itemsToShow: 5 })).toBe(2)
    })

    test('should return correct offset for center-even alignment', () => {
      expect(getSnapAlignOffset({ align: 'center-even', itemsToShow: 4 })).toBe(1)
    })

    test('should return correct offset for end alignment', () => {
      expect(getSnapAlignOffset({ align: 'center-even', itemsToShow: 4 })).toBe(1)
    })
  })

  describe('with slideSize and viewportSize parameters', () => {
    test('should return correct offset for start alignment', () => {
      expect(
        getSnapAlignOffset({
          align: 'start',
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(0)
    })

    test('should return correct offset for center/center-odd alignment', () => {
      expect(
        getSnapAlignOffset({
          align: 'center',
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(300)

      expect(
        getSnapAlignOffset({
          align: 'center-odd',
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(300)
    })

    test('should return correct offset for center-even alignment', () => {
      expect(
        getSnapAlignOffset({
          align: 'center-even',
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(200)
    })

    test('should return correct offset for end alignment', () => {
      expect(
        getSnapAlignOffset({
          align: 'end',
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(600)
    })
  })

  describe('edge cases', () => {
    test('should return 0 when no parameters provided', () => {
      expect(getSnapAlignOffset({ align: 'start' })).toBe(0)
    })

    test('should return 0 for invalid alignment', () => {
      expect(
        getSnapAlignOffset({
          align: 'invalid' as any,
          slideSize: 200,
          viewportSize: 800,
        })
      ).toBe(0)
    })

    test('should handle equal viewport and slide sizes', () => {
      expect(
        getSnapAlignOffset({
          align: 'center',
          slideSize: 800,
          viewportSize: 800,
        })
      ).toBe(0)
    })
  })
})
