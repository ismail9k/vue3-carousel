import { mount } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Carousel, Navigation, Slide } from '@/index'

type Rect = { left: number; right: number; top: number; bottom: number }

const SIZE = 300

function makeRect({ left, right, top, bottom }: Rect): DOMRect {
  return {
    left,
    right,
    top,
    bottom,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top,
    toJSON: () => ({}),
  } as DOMRect
}

/**
 * Fakes a layout: every element is SIZE px square at the origin, except slides,
 * which sit one after the other along the axis, shifted back by `scrolled`.
 */
function mockLayout({ scrolled = 0, vertical = false } = {}) {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: Element
  ) {
    let start = 0
    if (this.classList.contains('carousel__slide')) {
      const index = Array.from(this.parentElement!.children).indexOf(this)
      start = index * SIZE - scrolled
    }
    const main = { start, end: start + SIZE }
    return vertical
      ? makeRect({ top: main.start, bottom: main.end, left: 0, right: SIZE })
      : makeRect({ left: main.start, right: main.end, top: 0, bottom: SIZE })
  })
}

function mountCarousel(props: Record<string, unknown> = {}, slidesCount = 5) {
  return mount(Carousel, {
    props: { nativeCss: true, modelValue: 0, ...props },
    slots: {
      default: () =>
        Array.from({ length: slidesCount }, (_, i) =>
          h(Slide, { key: i }, () => `slide ${i}`)
        ),
      addons: () => h(Navigation),
    },
  })
}

describe('nativeCss', () => {
  const supports = vi.fn(() => true)

  beforeAll(() => {
    if (!Element.prototype.scrollBy) {
      Element.prototype.scrollBy = () => {}
    }
  })

  beforeEach(() => {
    supports.mockReturnValue(true)
    vi.stubGlobal('CSS', { supports })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  describe('mode', () => {
    it('renders a scroll-snap carousel when supported', async () => {
      const wrapper = mountCarousel({ snapAlign: 'center-even' })
      await nextTick()
      expect(wrapper.find('.carousel').classes()).toContain('is-native')
      expect(wrapper.find('.carousel').attributes('style')).toContain(
        '--vc-snap-align: center'
      )
      expect(wrapper.find('.carousel__track').attributes('style')).toBeUndefined()
      expect(wrapper.vm.isNative).toBe(true)
    })

    it('falls back to JS mode when scroll snap is unsupported', async () => {
      supports.mockReturnValue(false)
      const wrapper = mountCarousel({ wrapAround: true })
      await nextTick()
      expect(wrapper.find('.carousel').classes()).not.toContain('is-native')
      expect(wrapper.find('.carousel__track').attributes('style')).toContain('transform')
      expect(wrapper.findAll('.carousel__slide--clone').length).toBeGreaterThan(0)
      expect(wrapper.vm.isNative).toBe(false)
    })

    it('falls back to JS mode for the btt direction', async () => {
      const wrapper = mountCarousel({ dir: 'btt', height: 200 })
      await nextTick()
      expect(wrapper.find('.carousel').classes()).not.toContain('is-native')
    })

    it('is off by default', async () => {
      const wrapper = mountCarousel({ nativeCss: false })
      await nextTick()
      expect(wrapper.find('.carousel').classes()).not.toContain('is-native')
      expect(wrapper.find('.carousel').attributes('style')).not.toContain(
        '--vc-snap-align'
      )
    })
  })

  describe('config normalization', () => {
    it('turns off wrapAround, fade, edgeSpacing, drag and wheel', async () => {
      const wrapper = mountCarousel({
        wrapAround: true,
        slideEffect: 'fade',
        edgeSpacing: 20,
        mouseWheel: true,
      })
      await nextTick()
      expect(wrapper.findAll('.carousel__slide--clone')).toHaveLength(0)
      expect(wrapper.find('.carousel').classes()).toContain('is-effect-slide')
      expect(wrapper.vm.config).toMatchObject({
        edgeSpacing: 0,
        mouseDrag: false,
        mouseWheel: false,
        slideEffect: 'slide',
        touchDrag: false,
        wrapAround: false,
      })
    })

    it('turns off preventExcessiveDragging', async () => {
      const wrapper = mountCarousel({ preventExcessiveDragging: true })
      await nextTick()
      expect(wrapper.vm.config.preventExcessiveDragging).toBe(false)
    })

    it('does not start a JS drag', async () => {
      const wrapper = mountCarousel()
      await nextTick()
      await wrapper
        .find('.carousel__track')
        .trigger('mousedown', { button: 0, clientX: 0 })
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 100 }))
      // The drag handler is throttled to animation frames
      await new Promise((resolve) => requestAnimationFrame(resolve))
      await nextTick()
      expect(wrapper.emitted('drag')).toBeUndefined()
      expect(wrapper.find('.carousel').classes()).not.toContain('is-dragging')
    })
  })

  describe('slide focus', () => {
    it('keeps the native scroll position when a slide receives focus', async () => {
      const wrapper = mountCarousel()
      await nextTick()
      const viewport = wrapper.find('.carousel__viewport').element
      viewport.scrollLeft = 20
      await wrapper.findAll('.carousel__slide')[3].trigger('focusin')
      expect(viewport.scrollLeft).toBe(20)
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([3])
    })
  })

  describe('navigation', () => {
    it('scrolls the viewport to the next slide', async () => {
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start' })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__next').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ left: SIZE, behavior: 'smooth' })
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1])
    })

    it('scrolls by itemsToScroll slides', async () => {
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start', itemsToScroll: 2 })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__next').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'smooth' })
    })

    it('scrolls backwards for prev', async () => {
      mockLayout({ scrolled: 2 * SIZE })
      const wrapper = mountCarousel({ snapAlign: 'start', modelValue: 2 })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__prev').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ left: -SIZE, behavior: 'smooth' })
    })

    it('scrolls to the initial modelValue instantly on mount', async () => {
      mockLayout()
      const scrollBy = vi.spyOn(Element.prototype, 'scrollBy')
      mountCarousel({ snapAlign: 'start', modelValue: 2 })
      await nextTick()
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'auto' })
    })

    it('scrolls to the current slide when nativeCss is turned on at runtime', async () => {
      mockLayout()
      const wrapper = mountCarousel({
        nativeCss: false,
        snapAlign: 'start',
        modelValue: 2,
      })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.setProps({ nativeCss: true })
      await nextTick()
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'auto' })
    })

    it('resets the viewport scroll when nativeCss is turned off at runtime', async () => {
      mockLayout()
      const wrapper = mountCarousel()
      await nextTick()
      const viewport = wrapper.find('.carousel__viewport').element
      viewport.scrollLeft = 600
      await wrapper.setProps({ nativeCss: false })
      await nextTick()
      expect(viewport.scrollLeft).toBe(0)
      expect(wrapper.find('.carousel__track').attributes('style')).toContain('transform')
    })

    it('scrolls leftwards for next in rtl', async () => {
      // rtl layout: slide i sits i*SIZE to the left of the viewport
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        let left = 0
        if (this.classList.contains('carousel__slide')) {
          const index = Array.from(this.parentElement!.children).indexOf(this)
          left = -index * SIZE
        }
        return makeRect({ left, right: left + SIZE, top: 0, bottom: SIZE })
      })
      const wrapper = mountCarousel({ dir: 'rtl', snapAlign: 'start' })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__next').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ left: -SIZE, behavior: 'smooth' })
    })

    it('scrolls vertically for ttb', async () => {
      mockLayout({ vertical: true })
      const wrapper = mountCarousel({ dir: 'ttb', height: SIZE, snapAlign: 'start' })
      await nextTick()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__next').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ top: SIZE, behavior: 'smooth' })
    })

    it('uses the slide rect with itemsToShow auto', async () => {
      mockLayout()
      const wrapper = mountCarousel({ itemsToShow: 'auto', snapAlign: 'start' })
      await nextTick()
      expect(wrapper.find('.carousel__slide').attributes('style')).toBeUndefined()
      const scrollBy = vi.spyOn(wrapper.find('.carousel__viewport').element, 'scrollBy')
      await wrapper.find('.carousel__next').trigger('click')
      expect(scrollBy).toHaveBeenCalledWith({ left: SIZE, behavior: 'smooth' })
    })

    it('does not scroll on mount when the slide is already aligned', async () => {
      mockLayout()
      const scrollBy = vi.spyOn(Element.prototype, 'scrollBy')
      mountCarousel({ snapAlign: 'start' })
      await nextTick()
      expect(scrollBy).not.toHaveBeenCalled()
    })
  })
})
