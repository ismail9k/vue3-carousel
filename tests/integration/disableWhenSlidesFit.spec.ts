import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
import { h, nextTick, ref } from 'vue'

import { Carousel, Navigation, Pagination, Slide } from '@/index'

const VIEWPORT = 300
const SLIDE = 100

const rect = (width: number) =>
  ({
    width,
    height: 100,
    top: 0,
    left: 0,
    right: width,
    bottom: 100,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  }) as DOMRect

const mountCarousel = (props: Record<string, unknown> = {}, slideNum = 3) =>
  mount(Carousel, {
    props: { disableWhenSlidesFit: true, ...props },
    slots: {
      default: () =>
        Array.from({ length: slideNum }, (_, i) =>
          h(Slide, { key: i }, () => `${i + 1}`)
        ),
    },
  })

const transform = (wrapper: ReturnType<typeof mountCarousel>) =>
  (wrapper.find('.carousel__track').element as HTMLElement).style.transform

describe('disableWhenSlidesFit', () => {
  beforeAll(() => {
    // Slides measure 100px wide, everything else (viewport, root) 300px
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
      this: Element
    ) {
      return rect(this.classList.contains('carousel__slide') ? SLIDE : VIEWPORT)
    })
  })
  afterAll(() => vi.restoreAllMocks())

  describe('state', () => {
    it('is off by default: slides fit but nothing is locked', async () => {
      const wrapper = mountCarousel({ disableWhenSlidesFit: false, itemsToShow: 3 })
      // Slides register during the first render; the root class updates next tick
      await nextTick()
      expect(wrapper.vm.allSlidesFit).toBe(true)
      expect(wrapper.vm.isLocked).toBe(false)
      expect(wrapper.classes()).not.toContain('is-locked')
    })

    it('locks when slidesCount <= itemsToShow', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3 })
      // Slides register during the first render; the root class updates next tick
      await nextTick()
      expect(wrapper.vm.allSlidesFit).toBe(true)
      expect(wrapper.vm.isLocked).toBe(true)
      expect(wrapper.classes()).toContain('is-locked')
      // Still laid out and measured
      expect(wrapper.find('.carousel__viewport').exists()).toBe(true)
      expect(wrapper.classes()).not.toContain('is-disabled')
    })

    it('does not lock when there are more slides than itemsToShow', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 })
      // Slides register during the first render; the root class updates next tick
      await nextTick()
      expect(wrapper.vm.allSlidesFit).toBe(false)
      expect(wrapper.vm.isLocked).toBe(false)
      expect(wrapper.classes()).not.toContain('is-locked')
    })

    it('never locks with wrapAround', () => {
      const wrapper = mountCarousel({ itemsToShow: 3, wrapAround: true })
      expect(wrapper.vm.allSlidesFit).toBe(false)
      expect(wrapper.vm.isLocked).toBe(false)
    })

    it('reacts to itemsToShow changes', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3 })
      expect(wrapper.vm.isLocked).toBe(true)
      await wrapper.setProps({ itemsToShow: 2 })
      expect(wrapper.vm.isLocked).toBe(false)
      await wrapper.setProps({ itemsToShow: 5 })
      expect(wrapper.vm.isLocked).toBe(true)
    })

    it('unlocks when a slide is added', async () => {
      const count = ref(3)
      const wrapper = mount(Carousel, {
        props: { disableWhenSlidesFit: true, itemsToShow: 3 },
        slots: {
          default: () =>
            Array.from({ length: count.value }, (_, i) =>
              h(Slide, { key: i }, () => `${i + 1}`)
            ),
        },
      })
      expect(wrapper.vm.isLocked).toBe(true)
      count.value = 4
      await nextTick()
      expect(wrapper.vm.isLocked).toBe(false)
      count.value = 3
      await nextTick()
      expect(wrapper.vm.isLocked).toBe(true)
    })
    it('never locks with no registered slides', () => {
      const wrapper = mountCarousel({ itemsToShow: 3 }, 0)
      expect(wrapper.vm.allSlidesFit).toBe(false)
      expect(wrapper.vm.isLocked).toBe(false)
    })

    it('does not lock on the first render, before slides register', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3 })
      expect(wrapper.classes()).not.toContain('is-locked')
      await nextTick()
      expect(wrapper.classes()).toContain('is-locked')
    })
  })

  describe('auto mode', () => {
    it('locks when the slides total width fits the viewport', async () => {
      const wrapper = mountCarousel({ itemsToShow: 'auto' }, 3)
      await nextTick()
      // 3 × 100px <= 300px
      expect(wrapper.vm.allSlidesFit).toBe(true)
      expect(wrapper.vm.isLocked).toBe(true)
    })

    it('does not lock when the slides overflow the viewport', async () => {
      const wrapper = mountCarousel({ itemsToShow: 'auto' }, 4)
      await nextTick()
      expect(wrapper.vm.allSlidesFit).toBe(false)
    })

    it('counts the gap between slides', async () => {
      const wrapper = mountCarousel({ itemsToShow: 'auto', gap: 10 }, 3)
      await nextTick()
      // 3 × 100px + 2 × 10px > 300px
      expect(wrapper.vm.allSlidesFit).toBe(false)
    })

    it('does not lock before the viewport is measured', async () => {
      const spy = vi
        .spyOn(Element.prototype, 'getBoundingClientRect')
        .mockImplementation(() => rect(0))
      const wrapper = mountCarousel({ itemsToShow: 'auto' }, 3)
      await nextTick()
      expect(wrapper.vm.allSlidesFit).toBe(false)
      spy.mockRestore()
      // Restore the sized mock for the remaining tests
      vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
        this: Element
      ) {
        return rect(this.classList.contains('carousel__slide') ? SLIDE : VIEWPORT)
      })
    })
  })

  describe('layout', () => {
    it('pins the track at the first slide when the slides fit with room to spare', async () => {
      // 3 slides at itemsToShow 4: each slide is 75px in the 300px viewport
      const wrapper = mountCarousel({ itemsToShow: 4 })
      await nextTick()
      expect(transform(wrapper)).toBe('translateX(0px)')
    })

    it('keeps the unlocked centred layout when the prop is off', async () => {
      const wrapper = mountCarousel({ disableWhenSlidesFit: false, itemsToShow: 4 })
      await nextTick()
      // Pre-existing behaviour: snapAlign 'center' centres slide 0 (1.5 × 75px)
      expect(transform(wrapper)).toBe('translateX(112.5px)')
    })

    it('pins the track at the first slide in auto mode', async () => {
      // 2 × 100px slides in the 300px viewport
      const wrapper = mountCarousel({ itemsToShow: 'auto' }, 2)
      await nextTick()
      expect(transform(wrapper)).toBe('translateX(0px)')
    })

    it('keeps the edge spacing before the first slide', async () => {
      const wrapper = mountCarousel({ itemsToShow: 4, edgeSpacing: 16 })
      await nextTick()
      expect(transform(wrapper)).toBe('translateX(16px)')
    })

    it('pins the track at the first slide in rtl', async () => {
      const wrapper = mountCarousel({ itemsToShow: 4, dir: 'rtl' })
      await nextTick()
      expect(transform(wrapper)).toBe('translateX(0px)')
    })
  })

  describe('interaction', () => {
    it('makes slideTo a no-op while locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3, modelValue: 0 })
      wrapper.vm.slideTo(2)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      expect(wrapper.vm.currentSlide).toBe(0)
      expect(transform(wrapper)).toBe('translateX(0px)')
    })

    it('still slides when the prop is off', async () => {
      const wrapper = mountCarousel({
        disableWhenSlidesFit: false,
        itemsToShow: 3,
        modelValue: 0,
      })
      wrapper.vm.slideTo(2)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toEqual([[2]])
    })

    it('ignores modelValue changes while locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3, modelValue: 0 })
      await wrapper.setProps({ modelValue: 2 })
      expect(wrapper.vm.currentSlide).toBe(0)
      expect(transform(wrapper)).toBe('translateX(0px)')
    })

    it('does not navigate when a slide is focused while locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3, modelValue: 0 })
      await wrapper.findAll('.carousel__slide')[2].trigger('focusin')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    it('slides again once unlocked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3, modelValue: 0 })
      await wrapper.setProps({ itemsToShow: 2 })
      wrapper.vm.slideTo(1)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toEqual([[1]])
    })

    it('leaves the wheel to the browser while locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3, mouseWheel: true })
      // Slides register during the first render; the lock settles next tick
      await nextTick()
      const event = new WheelEvent('wheel', {
        deltaX: 100,
        bubbles: true,
        cancelable: true,
      })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(false)
      expect(wrapper.emitted('wheel')).toBeUndefined()
    })

    it('handles the wheel when not locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2, mouseWheel: true })
      // Slides register during the first render; the lock settles next tick
      await nextTick()
      const event = new WheelEvent('wheel', {
        deltaX: 100,
        bubbles: true,
        cancelable: true,
      })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
    })

    it('does not start a mouse drag while locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 3 })
      // Slides register during the first render; the lock settles next tick
      await nextTick()
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0,
      })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      // handleDragStart calls preventDefault for mouse events; a locked track has no listener
      expect(event.defaultPrevented).toBe(false)
    })

    it('starts a mouse drag when not locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2 })
      // Slides register during the first render; the lock settles next tick
      await nextTick()
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        button: 0,
      })
      wrapper.find('.carousel__track').element.dispatchEvent(event)
      expect(event.defaultPrevented).toBe(true)
      document.dispatchEvent(new MouseEvent('mouseup'))
    })

    it('resets the active slide when a drag ends after the carousel locked', async () => {
      const wrapper = mountCarousel({ itemsToShow: 2, modelValue: 0 })
      // Slides register during the first render; the lock settles next tick
      await nextTick()
      wrapper
        .find('.carousel__track')
        .element.dispatchEvent(
          new MouseEvent('mousedown', { bubbles: true, cancelable: true, button: 0 })
        )
      // One slide forward (150px slides); the drag handler is throttled to a frame
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: -150 }))
      await new Promise((resolve) => requestAnimationFrame(resolve))
      expect(wrapper.vm.activeSlide).toBe(1)

      await wrapper.setProps({ itemsToShow: 3 })
      expect(wrapper.vm.isLocked).toBe(true)
      document.dispatchEvent(new MouseEvent('mouseup'))
      await nextTick()

      expect(wrapper.vm.activeSlide).toBe(0)
      expect(wrapper.vm.currentSlide).toBe(0)
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })
  })

  describe('addons', () => {
    const mountWithAddons = (props: Record<string, unknown> = {}) =>
      mount(Carousel, {
        props: { disableWhenSlidesFit: true, ...props },
        slots: {
          default: () => [0, 1, 2].map((i) => h(Slide, { key: i }, () => `${i + 1}`)),
          addons: () => [h(Navigation), h(Pagination)],
        },
      })

    it('hides Navigation and Pagination while locked and shows them again', async () => {
      const wrapper = mountWithAddons({ itemsToShow: 3 })
      expect(wrapper.find('.carousel__prev').exists()).toBe(false)
      expect(wrapper.find('.carousel__next').exists()).toBe(false)
      expect(wrapper.find('.carousel__pagination').exists()).toBe(false)
      await wrapper.setProps({ itemsToShow: 2 })
      expect(wrapper.find('.carousel__prev').exists()).toBe(true)
      expect(wrapper.find('.carousel__pagination').exists()).toBe(true)
    })

    it('keeps the addons when the prop is off', () => {
      const wrapper = mountWithAddons({ disableWhenSlidesFit: false, itemsToShow: 3 })
      expect(wrapper.find('.carousel__prev').exists()).toBe(true)
      expect(wrapper.find('.carousel__pagination').exists()).toBe(true)
    })
  })
})
