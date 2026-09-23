import { describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import { CarouselConfig, DEFAULT_CONFIG } from '@/shared'

import { useWheel } from './useWheel'

type Setup = {
  mouseWheel?: CarouselConfig['mouseWheel']
  isVertical?: boolean
  isSliding?: boolean
}

function setup({ mouseWheel = true, isVertical = false, isSliding = false }: Setup = {}) {
  const onWheel = vi.fn()
  const config: CarouselConfig = { ...DEFAULT_CONFIG, mouseWheel }
  const { handleScroll } = useWheel({
    isVertical,
    isSliding: ref(isSliding),
    config,
    onWheel,
  })
  return { handleScroll, onWheel }
}

function wheel(deltaX: number, deltaY: number) {
  const preventDefault = vi.fn()
  const event = { deltaX, deltaY, preventDefault } as unknown as WheelEvent
  return { event, preventDefault }
}

describe('useWheel', () => {
  describe('default (ignoreCrossAxis off)', () => {
    it('falls back to the cross-axis delta on a horizontal carousel', () => {
      const { handleScroll, onWheel } = setup()
      const { event, preventDefault } = wheel(0, 100)

      handleScroll(event)

      expect(preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledWith({
        deltaX: 0,
        deltaY: 100,
        isScrollingForward: true,
      })
    })

    it('prevents default even when no delta exceeds the threshold', () => {
      const { handleScroll, onWheel } = setup()
      const { event, preventDefault } = wheel(0, 5)

      handleScroll(event)

      expect(preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).not.toHaveBeenCalled()
    })
  })

  describe('ignoreCrossAxis', () => {
    const mouseWheel = { ignoreCrossAxis: true }

    it('ignores cross-axis events on a horizontal carousel', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event, preventDefault } = wheel(0, 100)

      handleScroll(event)

      expect(preventDefault).not.toHaveBeenCalled()
      expect(onWheel).not.toHaveBeenCalled()
    })

    it('handles on-axis events on a horizontal carousel', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event, preventDefault } = wheel(100, 0)

      handleScroll(event)

      expect(preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledWith({
        deltaX: 100,
        deltaY: 0,
        isScrollingForward: true,
      })
    })

    it('reports backward on-axis scroll', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event } = wheel(-100, 0)

      handleScroll(event)

      expect(onWheel).toHaveBeenCalledWith({
        deltaX: -100,
        deltaY: 0,
        isScrollingForward: false,
      })
    })

    it('uses the on-axis delta for diagonal events', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event, preventDefault } = wheel(-100, 50)

      handleScroll(event)

      expect(preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledWith({
        deltaX: -100,
        deltaY: 50,
        isScrollingForward: false,
      })
    })

    it('ignores diagonal events dominated by the cross axis', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event, preventDefault } = wheel(15, 120)

      handleScroll(event)

      expect(preventDefault).not.toHaveBeenCalled()
      expect(onWheel).not.toHaveBeenCalled()
    })

    it('ignores sub-threshold on-axis events', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel })
      const { event, preventDefault } = wheel(5, 0)

      handleScroll(event)

      expect(preventDefault).not.toHaveBeenCalled()
      expect(onWheel).not.toHaveBeenCalled()
    })

    it('respects a custom threshold', () => {
      const { handleScroll, onWheel } = setup({
        mouseWheel: { threshold: 50, ignoreCrossAxis: true },
      })
      const under = wheel(40, 0)
      const over = wheel(60, 0)

      handleScroll(under.event)
      handleScroll(over.event)

      expect(under.preventDefault).not.toHaveBeenCalled()
      expect(over.preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledTimes(1)
    })

    it('does not prevent cross-axis events while sliding', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel, isSliding: true })
      const { event, preventDefault } = wheel(0, 100)

      handleScroll(event)

      expect(preventDefault).not.toHaveBeenCalled()
      expect(onWheel).not.toHaveBeenCalled()
    })

    it('prevents on-axis events while sliding without navigating', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel, isSliding: true })
      const { event, preventDefault } = wheel(100, 0)

      handleScroll(event)

      expect(preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).not.toHaveBeenCalled()
    })

    it('mirrors the axes on a vertical carousel', () => {
      const { handleScroll, onWheel } = setup({ mouseWheel, isVertical: true })
      const horizontal = wheel(100, 0)
      const vertical = wheel(0, 100)

      handleScroll(horizontal.event)
      handleScroll(vertical.event)

      expect(horizontal.preventDefault).not.toHaveBeenCalled()
      expect(vertical.preventDefault).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledTimes(1)
      expect(onWheel).toHaveBeenCalledWith({
        deltaX: 0,
        deltaY: 100,
        isScrollingForward: true,
      })
    })
  })
})
