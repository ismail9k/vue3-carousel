import { mount } from '@vue/test-utils'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { h } from 'vue'

import { Carousel, Slide } from '@/index'

const RECT = {
  width: 300,
  height: 100,
  top: 0,
  left: 0,
  right: 300,
  bottom: 100,
  x: 0,
  y: 0,
}

const mountCarousel = (props: Record<string, unknown> = {}, slideNum = 5) =>
  mount(Carousel, {
    props: { marquee: true, ...props },
    slots: {
      default: () =>
        Array.from({ length: slideNum }, (_, i) =>
          h(Slide, { key: i }, () => `${i + 1}`)
        ),
    },
  })

describe('marquee', () => {
  beforeAll(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      ...RECT,
      toJSON: () => RECT,
    })
  })
  afterAll(() => vi.restoreAllMocks())

  describe('props', () => {
    let warn: ReturnType<typeof vi.spyOn>
    beforeEach(() => {
      warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })
    afterEach(() => warn.mockRestore())

    it('warns when marqueeSpeed is not positive', () => {
      mountCarousel({ marqueeSpeed: 0 })
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('marqueeSpeed'))
    })

    it('warns when combined with the fade effect', () => {
      mountCarousel({ slideEffect: 'fade' })
      expect(warn).toHaveBeenCalledWith(
        '[vue3-carousel]: "marquee" cannot be used with slideEffect "fade". The setting will be ignored.'
      )
    })

    it('does not warn for a valid setup', () => {
      mountCarousel({ marqueeSpeed: 40 })
      expect(warn).not.toHaveBeenCalled()
    })
  })

  const rootStyle = (wrapper: ReturnType<typeof mountCarousel>) =>
    wrapper.find('.carousel').attributes('style') || ''
  const rootClasses = (wrapper: ReturnType<typeof mountCarousel>) =>
    wrapper.find('.carousel').classes()
  const trackTransform = (wrapper: ReturnType<typeof mountCarousel>) =>
    (wrapper.find('.carousel__track').element as HTMLElement).style.transform

  describe('track animation', () => {
    it('sets the loop distance and duration for a horizontal carousel', async () => {
      // slideSize = 300 / 2 = 150; distance = 5 * 150 = 750; 750 / 60 = 12.5
      const wrapper = mountCarousel({ itemsToShow: 2 })
      await wrapper.vm.$nextTick()
      expect(rootClasses(wrapper)).toContain('is-marquee')
      expect(rootStyle(wrapper)).toContain('--vc-marquee-x: -750px')
      expect(rootStyle(wrapper)).toContain('--vc-marquee-duration: 12.5s')
      expect(rootStyle(wrapper)).not.toContain('--vc-marquee-y')
    })

    it('includes the gap in the loop distance', async () => {
      // slideSize = (300 - 10) / 2 = 145; distance = 5 * (145 + 10) = 775
      const wrapper = mountCarousel({ itemsToShow: 2, gap: 10, marqueeSpeed: 155 })
      await wrapper.vm.$nextTick()
      expect(rootStyle(wrapper)).toContain('--vc-marquee-x: -775px')
      expect(rootStyle(wrapper)).toContain('--vc-marquee-duration: 5s')
    })

    it('reverses the distance in rtl', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2, dir: 'rtl' })
      await wrapper.vm.$nextTick()
      expect(rootStyle(wrapper)).toContain('--vc-marquee-x: 750px')
    })

    it('uses the Y axis when vertical', async () => {
      // slideSize = 100 / 2 = 50; distance = 250; 250 / 50 = 5
      const wrapper = mountCarousel({
        itemsToShow: 2,
        dir: 'ttb',
        height: 100,
        marqueeSpeed: 50,
      })
      await wrapper.vm.$nextTick()
      expect(rootStyle(wrapper)).toContain('--vc-marquee-y: -250px')
      expect(rootStyle(wrapper)).toContain('--vc-marquee-duration: 5s')
      expect(rootStyle(wrapper)).not.toContain('--vc-marquee-x')
    })

    it('sums the slide sizes in auto mode', async () => {
      // every slide measures 300px wide; distance = 5 * 300 = 1500
      const wrapper = mountCarousel({ itemsToShow: 'auto', marqueeSpeed: 100 })
      await wrapper.vm.$nextTick()
      expect(rootStyle(wrapper)).toContain('--vc-marquee-x: -1500px')
      expect(rootStyle(wrapper)).toContain('--vc-marquee-duration: 15s')
    })

    it('uses 0s when the speed is not positive', async () => {
      const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const wrapper = mountCarousel({ itemsToShow: 2, marqueeSpeed: 0 })
      await wrapper.vm.$nextTick()
      expect(rootStyle(wrapper)).toContain('--vc-marquee-duration: 0s')
      warn.mockRestore()
    })

    it('leaves the inline track transform unset', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 })
      await wrapper.vm.$nextTick()
      expect(trackTransform(wrapper)).toBe('')
    })

    it('sets no marquee vars or class when off', async () => {
      const wrapper = mountCarousel({ marquee: false, itemsToShow: 2 })
      await wrapper.vm.$nextTick()
      expect(rootClasses(wrapper)).not.toContain('is-marquee')
      expect(rootStyle(wrapper)).not.toContain('--vc-marquee')
      expect(trackTransform(wrapper)).toBe('translateX(0px)')
    })
  })

  describe('clones', () => {
    const clones = (wrapper: ReturnType<typeof mountCarousel>) =>
      wrapper.findAll('.carousel__slide--clone')

    it('clones one viewport of slides after the real set and none before', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 })
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(2)
      expect(wrapper.find('.carousel__slide').classes()).not.toContain(
        'carousel__slide--clone'
      )
      expect(rootStyle(wrapper)).toContain('--vc-cloned-offset: 0px')
    })

    it('rounds fractional itemsToShow up', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2.5 })
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(3)
    })

    it('clones more than the slide count when needed', async () => {
      const wrapper = mountCarousel({ itemsToShow: 5 }, 3)
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(5)
    })

    it('clones the whole set in auto mode', async () => {
      const wrapper = mountCarousel({ itemsToShow: 'auto' })
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(5)
    })

    describe('with slides narrower than the viewport in auto mode', () => {
      const rectMock = () => vi.mocked(Element.prototype.getBoundingClientRect)
      beforeEach(() => {
        // Slides measure 100px wide, the viewport (and everything else) 300px
        rectMock().mockImplementation(function (this: Element) {
          const rect = this.classList.contains('carousel__slide')
            ? { ...RECT, width: 100, right: 100 }
            : RECT
          return { ...rect, toJSON: () => rect }
        })
      })
      afterEach(() => rectMock().mockReturnValue({ ...RECT, toJSON: () => RECT }))

      it('clones one set when it already covers the viewport', async () => {
        // set = 5 * 100 = 500px >= 300px viewport
        const wrapper = mountCarousel({ itemsToShow: 'auto' })
        await wrapper.vm.$nextTick()
        expect(clones(wrapper).length).toBe(5)
      })

      it('clones whole sets until they cover the viewport', async () => {
        // set = 2 * 100 = 200px; ceil(300 / 200) = 2 sets = 4 clones
        const wrapper = mountCarousel({ itemsToShow: 'auto' }, 2)
        await wrapper.vm.$nextTick()
        expect(clones(wrapper).length).toBe(4)
      })
    })

    it('does not need wrapAround', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2, wrapAround: false })
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(2)
    })

    it('renders nothing special with no slides', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 }, 0)
      await wrapper.vm.$nextTick()
      expect(clones(wrapper).length).toBe(0)
    })
  })

  describe('pause on hover', () => {
    it('adds is-paused while hovered with pauseAutoplayOnHover', async () => {
      const wrapper = mountCarousel({ pauseAutoplayOnHover: true })
      await wrapper.find('.carousel').trigger('mouseenter')
      expect(rootClasses(wrapper)).toContain('is-paused')
      await wrapper.find('.carousel').trigger('mouseleave')
      expect(rootClasses(wrapper)).not.toContain('is-paused')
    })

    it('does not pause on hover without pauseAutoplayOnHover', async () => {
      const wrapper = mountCarousel()
      await wrapper.find('.carousel').trigger('mouseenter')
      expect(rootClasses(wrapper)).not.toContain('is-paused')
    })
  })

  describe('interactions', () => {
    it('ignores navigation', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 })
      wrapper.vm.next()
      wrapper.vm.slideTo(3)
      await wrapper.vm.$nextTick()
      expect(wrapper.vm.data.currentSlide).toBe(0)
      expect(wrapper.emitted('slide-start')).toBeUndefined()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('does not start autoplay', () => {
      vi.useFakeTimers()
      const wrapper = mountCarousel({ autoplay: 100 })
      vi.advanceTimersByTime(500)
      expect(wrapper.emitted('slide-start')).toBeUndefined()
      vi.useRealTimers()
    })

    it('does not start a drag', () => {
      const wrapper = mountCarousel()
      const event = new MouseEvent('mousedown', { bubbles: true, cancelable: true })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
    })

    describe('with the fade effect', () => {
      let warn: ReturnType<typeof vi.spyOn>
      beforeEach(() => {
        warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
      })
      afterEach(() => warn.mockRestore())

      it('is ignored, so the carousel navigates normally', async () => {
        const wrapper = mountCarousel({ slideEffect: 'fade' })
        await wrapper.vm.$nextTick()
        expect(rootClasses(wrapper)).not.toContain('is-marquee')
        expect(rootStyle(wrapper)).not.toContain('--vc-marquee')
        wrapper.vm.next()
        await wrapper.vm.$nextTick()
        expect(wrapper.vm.data.currentSlide).toBe(1)
        expect(wrapper.emitted('slide-start')).toHaveLength(1)
      })
    })

    it('ignores the mouse wheel', () => {
      const wrapper = mountCarousel({ mouseWheel: true })
      const event = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
      expect(wrapper.emitted('wheel')).toBeUndefined()
    })
  })
})
