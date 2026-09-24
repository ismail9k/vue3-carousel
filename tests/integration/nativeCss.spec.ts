import { mount } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'

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
 * which are `slideSize` long and sit one after the other along the axis,
 * shifted back by `scrolled`.
 */
function mockLayout({ scrolled = 0, vertical = false, slideSize = SIZE } = {}) {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: Element
  ) {
    let start = 0
    let size = SIZE
    if (this.classList.contains('carousel__slide')) {
      const index = Array.from(this.parentElement!.children).indexOf(this)
      start = index * slideSize - scrolled
      size = slideSize
    }
    const main = { start, end: start + size }
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
        '--vc-snap-align: center;'
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
      const wrapper = mount(Carousel, {
        slots: { default: () => h(Slide, () => 'slide') },
      })
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
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'instant' })
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
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'instant' })
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

    it('restores wrapAround and mouseDrag when nativeCss is turned off at runtime', async () => {
      mockLayout()
      const wrapper = mountCarousel({ wrapAround: true })
      await nextTick()
      expect(wrapper.findAll('.carousel__slide--clone').length).toBe(0)
      expect(wrapper.vm.config.mouseDrag).toBe(false)
      await wrapper.setProps({ nativeCss: false })
      await nextTick()
      expect(wrapper.findAll('.carousel__slide--clone').length).toBeGreaterThan(0)
      expect(wrapper.vm.config.mouseDrag).toBe(true)
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

    it('re-syncs the scroll position when the slide count changes', async () => {
      mockLayout()
      const scrollBy = vi.spyOn(Element.prototype, 'scrollBy')
      const count = ref(5)
      const wrapper = mount(Carousel, {
        props: { nativeCss: true, modelValue: 2, snapAlign: 'start' },
        slots: {
          default: () =>
            Array.from({ length: count.value }, (_, i) =>
              h(Slide, { key: i }, () => `slide ${i}`)
            ),
        },
      })
      await nextTick()
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenCalledWith({ left: 2 * SIZE, behavior: 'instant' })
      count.value = 6
      await nextTick()
      await nextTick()
      expect(wrapper.findAll('.carousel__slide')).toHaveLength(6)
      // the mock keeps slide 2 at 2 * SIZE, so the re-sync repeats the delta
      expect(scrollBy).toHaveBeenCalledTimes(2)
      expect(scrollBy).toHaveBeenLastCalledWith({ left: 2 * SIZE, behavior: 'instant' })
    })
  })

  describe('scrolling', () => {
    async function scrollTo(
      wrapper: ReturnType<typeof mountCarousel>,
      scrolled: number,
      layout: Parameters<typeof mockLayout>[0] = {}
    ) {
      vi.restoreAllMocks()
      mockLayout({ ...layout, scrolled })
      await wrapper.find('.carousel__viewport').trigger('scroll')
      vi.advanceTimersByTime(100)
      await nextTick()
    }

    it('updates the current slide once scrolling settles', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start' })
      await nextTick()
      await scrollTo(wrapper, 2 * SIZE)
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([2])
      expect(wrapper.emitted('slide-start')?.at(-1)).toEqual([
        { slidingToIndex: 2, currentSlideIndex: 0, prevSlideIndex: 0, slidesCount: 5 },
      ])
      expect(wrapper.emitted('slide-end')?.at(-1)).toEqual([
        { currentSlideIndex: 2, prevSlideIndex: 0, slidesCount: 5 },
      ])
      expect(wrapper.findAll('.carousel__slide')[2].classes()).toContain(
        'carousel__slide--active'
      )
    })

    it('waits for the scroll to settle before reporting', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start' })
      await nextTick()
      vi.restoreAllMocks()
      mockLayout({ scrolled: SIZE })
      await wrapper.find('.carousel__viewport').trigger('scroll')
      vi.advanceTimersByTime(60)
      await wrapper.find('.carousel__viewport').trigger('scroll')
      vi.advanceTimersByTime(60)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      vi.advanceTimersByTime(40)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1])
    })

    it('does not emit when the slide is unchanged', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start' })
      await nextTick()
      await scrollTo(wrapper, 0)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('reports the last slide at the scroll end', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start', itemsToShow: 2 })
      await nextTick()
      await scrollTo(wrapper, 4 * SIZE)
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([4])
    })

    it('keeps the requested slide when the scroll settles at a clamped end', async () => {
      vi.useFakeTimers()
      mockLayout({ slideSize: SIZE / 3 })
      const wrapper = mountCarousel({ itemsToShow: 3, snapAlign: 'center' })
      await nextTick()
      wrapper.vm.slideTo(3)
      // slide 3 cannot reach the center: the scroller stops at its end, 2-4 in view
      await scrollTo(wrapper, (2 * SIZE) / 3, { slideSize: SIZE / 3 })
      vi.advanceTimersByTime(wrapper.vm.config.transition)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toEqual([[3]])
      expect(wrapper.emitted('slide-end')).toHaveLength(1)
      expect(wrapper.findAll('.carousel__slide')[3].classes()).toContain(
        'carousel__slide--active'
      )
    })

    it('keeps the initial modelValue when mounted at the clamped end', async () => {
      vi.useFakeTimers()
      const slideSize = SIZE / 2.5
      mockLayout({ slideSize, scrolled: 7.5 * slideSize })
      const wrapper = mountCarousel(
        { modelValue: 8, itemsToShow: 2.5, snapAlign: 'start' },
        10
      )
      await nextTick()
      await scrollTo(wrapper, 7.5 * slideSize, { slideSize })
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('pauses autoplay while the user scrolls and restarts it once scrolling settles', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ autoplay: 1000 })
      await nextTick()
      const viewport = wrapper.find('.carousel__viewport')
      // a user scroll longer than one autoplay interval: 1080 ms of scroll events
      await viewport.trigger('scroll')
      for (let i = 0; i < 12; i++) {
        vi.advanceTimersByTime(90)
        await viewport.trigger('scroll')
      }
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      // the scroll settles on the same slide and autoplay restarts from there
      vi.advanceTimersByTime(100)
      vi.advanceTimersByTime(999)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      vi.advanceTimersByTime(1)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
    })

    it('navigates from the scrolled-to slide before the scroll settles', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel()
      await nextTick()
      vi.restoreAllMocks()
      mockLayout({ scrolled: 2 * SIZE })
      const viewport = wrapper.find('.carousel__viewport')
      const scrollBy = vi.spyOn(viewport.element, 'scrollBy')
      await viewport.trigger('scroll')
      wrapper.vm.next()
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenCalledWith({ left: SIZE, behavior: 'smooth' })
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([3])
    })

    it('does not adopt its own unfinished scroll when navigating mid-slide', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel()
      await nextTick()
      wrapper.vm.next()
      // halfway through the smooth scroll to slide 1
      vi.restoreAllMocks()
      mockLayout({ scrolled: SIZE / 2 })
      await wrapper.find('.carousel__viewport').trigger('scroll')
      wrapper.vm.next()
      expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
    })

    it('does not listen to scroll in JS mode', async () => {
      vi.useFakeTimers()
      mockLayout()
      const wrapper = mountCarousel({ nativeCss: false, snapAlign: 'start' })
      await nextTick()
      await scrollTo(wrapper, 2 * SIZE)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('resize', () => {
    function nextFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve))
    }

    it('does not re-scroll on resize while a user scroll is unsettled', async () => {
      // rAF stays real: the resize handler is throttled to one frame
      vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
      let resize: () => void = () => {}
      vi.stubGlobal(
        'ResizeObserver',
        class {
          constructor(callback: () => void) {
            resize = callback
          }
          observe() {}
          unobserve() {}
          disconnect() {}
        }
      )
      mockLayout()
      const wrapper = mountCarousel({ snapAlign: 'start' })
      await nextTick()
      // the view is on slide 1 while the current slide is still 0
      vi.restoreAllMocks()
      mockLayout({ scrolled: SIZE })
      const viewport = wrapper.find('.carousel__viewport')
      let scrollBy = vi.spyOn(viewport.element, 'scrollBy')
      await viewport.trigger('scroll')
      resize()
      await nextFrame()
      await nextTick()
      expect(scrollBy).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([1])

      vi.restoreAllMocks()
      mockLayout({ scrolled: 0 })
      scrollBy = vi.spyOn(viewport.element, 'scrollBy')
      resize()
      await nextFrame()
      await nextTick()
      expect(scrollBy).toHaveBeenCalledTimes(1)
      expect(scrollBy).toHaveBeenCalledWith({ left: SIZE, behavior: 'instant' })
    })
  })
})
