import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Slide } from '@/components/Slide'

import { Carousel } from './Carousel'
import { CarouselExposed } from './Carousel.types'

// A carousel left mounted keeps its transition timer, which can fire after the
// test environment is torn down and fail the run with an unhandled error.
enableAutoUnmount(afterEach)

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof Carousel>>

  beforeEach(async () => {
    wrapper = mount(Carousel, {
      slots: {
        default: [
          mount(Slide, { props: { index: 0 } }).html(),
          mount(Slide, { props: { index: 1 } }).html(),
        ],
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('It renders correctly', () => {
    const carousel = wrapper.find('.carousel')
    expect(carousel.exists()).toBe(true)
  })

  it('Applies default transition easing', () => {
    const carousel = wrapper.find('.carousel')
    const style = carousel.attributes('style')
    expect(style).toContain('--vc-transition-easing')
  })

  it('Applies custom transition easing', async () => {
    await wrapper.setProps({ transitionEasing: 'ease-in-out' })
    const carousel = wrapper.find('.carousel')
    const style = carousel.attributes('style')
    expect(style).toContain('ease-in-out')
  })

  describe('aria-label', () => {
    // A carousel without slides renders the disabled section, which has no aria-label
    const slots = { default: () => h(Slide) }

    it('gives each carousel a unique region label by default (#523)', () => {
      // Both carousels live in one app, as on a real page; separate mount() calls
      // create separate apps whose useId() counters each start at zero
      const page = mount({
        render: () => [h(Carousel, null, slots), h(Carousel, null, slots)],
      })
      const [first, second] = page
        .findAll('.carousel')
        .map((carousel) => carousel.attributes('aria-label'))
      expect(first).toMatch(/^Gallery \S+$/)
      expect(second).toMatch(/^Gallery \S+$/)
      expect(first).not.toBe(second)
    })

    it('renders a custom ariaGallery label verbatim', () => {
      const wrapper = mount(Carousel, {
        props: { i18n: { ariaGallery: 'Products' } },
        slots,
      })
      expect(wrapper.find('.carousel').attributes('aria-label')).toBe('Products')
    })

    it('replaces {id} in a custom ariaGallery label', () => {
      const wrapper = mount(Carousel, {
        props: { i18n: { ariaGallery: 'Photos {id}' } },
        slots,
      })
      const label = wrapper.find('.carousel').attributes('aria-label')
      expect(label).toMatch(/^Photos \S+$/)
      expect(label).not.toContain('{id}')
    })
  })

  describe('mouseWheel.ignoreCrossAxis', () => {
    function mountWithWheel() {
      return mount(Carousel, {
        props: { mouseWheel: { ignoreCrossAxis: true } },
        slots: {
          default: [
            mount(Slide, { props: { index: 0 } }).html(),
            mount(Slide, { props: { index: 1 } }).html(),
          ],
        },
      })
    }

    it('ignores vertical wheel events on a horizontal carousel', () => {
      const wheelWrapper = mountWithWheel()
      const event = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      })

      wheelWrapper.find('.carousel__track').element.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(false)
      expect(wheelWrapper.emitted('wheel')).toBeUndefined()
    })

    it('handles horizontal wheel events on a horizontal carousel', () => {
      const wheelWrapper = mountWithWheel()
      const event = new WheelEvent('wheel', {
        deltaX: 100,
        bubbles: true,
        cancelable: true,
      })

      wheelWrapper.find('.carousel__track').element.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
      expect(wheelWrapper.emitted('wheel')).toHaveLength(1)
      expect(wheelWrapper.emitted('wheel')?.[0]).toEqual([{ deltaX: 100, deltaY: 0 }])
      expect(wheelWrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    })

    it('handles vertical wheel events on a horizontal carousel by default', () => {
      const wheelWrapper = mount(Carousel, {
        props: { mouseWheel: true },
        slots: {
          default: [
            mount(Slide, { props: { index: 0 } }).html(),
            mount(Slide, { props: { index: 1 } }).html(),
          ],
        },
      })
      const event = new WheelEvent('wheel', {
        deltaY: 100,
        bubbles: true,
        cancelable: true,
      })

      wheelWrapper.find('.carousel__track').element.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
      expect(wheelWrapper.emitted('wheel')?.[0]).toEqual([{ deltaX: 0, deltaY: 100 }])
      expect(wheelWrapper.emitted('update:modelValue')?.[0]).toEqual([1])
    })
  })

  describe('classPrefix', () => {
    const mountWithPrefix = (props: Record<string, unknown> = {}) =>
      mount(Carousel, {
        props: { classPrefix: 'vc', ...props },
        slots: {
          default: [
            mount(Slide, { props: { index: 0 } }).html(),
            mount(Slide, { props: { index: 1 } }).html(),
          ],
        },
      })

    it('renders the root, viewport and track with a custom prefix', () => {
      const prefixed = mountWithPrefix()
      const root = prefixed.find('section')
      expect(root.classes()).toContain('vc')
      expect(root.classes()).not.toContain('carousel')
      expect(prefixed.find('.vc__viewport').exists()).toBe(true)
      expect(prefixed.find('.vc__track').exists()).toBe(true)
      expect(prefixed.find('.carousel__track').exists()).toBe(false)
    })

    it('keeps the is-* state classes unprefixed', () => {
      const root = mountWithPrefix().find('section')
      expect(root.classes()).toContain('is-ltr')
      expect(root.classes()).toContain('is-effect-slide')
    })

    it('applies the prefix to a disabled carousel', () => {
      const root = mountWithPrefix({ enabled: false }).find('section')
      expect(root.classes()).toEqual(['vc', 'is-disabled'])
    })

    it('ignores a classPrefix override in breakpoints', async () => {
      const prefixed = mountWithPrefix({ breakpoints: { 0: { classPrefix: 'bp' } } })
      await prefixed.vm.$nextTick()
      const root = prefixed.find('section')
      expect(root.classes()).toContain('vc')
      expect(root.classes()).not.toContain('bp')
      expect(prefixed.find('.vc__track').exists()).toBe(true)
    })

    it.each(['', '  ', 'vc x'])(
      'warns and falls back to the default for the invalid prefix %j',
      (classPrefix) => {
        const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
        try {
          const prefixed = mountWithPrefix({ classPrefix })
          const root = prefixed.find('section')
          expect(warn).toHaveBeenCalledWith(expect.stringContaining('classPrefix'))
          expect(root.classes()).toEqual(['carousel', 'is-ltr', 'is-effect-slide'])
          expect(prefixed.find('.carousel__track').exists()).toBe(true)
        } finally {
          warn.mockRestore()
        }
      }
    )
  })

  it('ignores a non-boolean skipTransition argument while sliding', async () => {
    vi.useFakeTimers()
    const eventWrapper = mount(Carousel, {
      props: { wrapAround: true },
      slots: {
        default: () => [0, 1, 2].map((i) => h(Slide, { key: i }, () => `slide ${i}`)),
      },
    })
    await nextTick()

    // A template-bound handler such as `@click="carousel.next"` passes the event
    const event = new MouseEvent('click') as unknown as boolean
    const carousel = eventWrapper.vm as unknown as CarouselExposed
    carousel.next(event)
    carousel.next(event)
    expect(eventWrapper.emitted('slide-start')).toHaveLength(1)

    vi.runAllTimers()
    await nextTick()
    expect(eventWrapper.emitted('slide-end')).toHaveLength(1)
    expect(eventWrapper.emitted('update:modelValue')).toEqual([[1]])
    eventWrapper.unmount()
  })
})

describe('Carousel.css', () => {
  // jsdom does no layout, so the stylesheet text is what can be asserted.
  const css = readFileSync(resolve(__dirname, 'Carousel.css'), 'utf8')
  const carouselRule = css.match(/^\.carousel \{([^}]*)\}/m)?.[1] ?? ''

  it('declares min-width: 0 on .carousel so it can shrink as a flex or grid item (#540)', () => {
    expect(carouselRule, 'expected a top-level `.carousel { ... }` rule').not.toBe('')
    expect(carouselRule).toMatch(/min-width:\s*0;/)
  })

  it('transitions the height and stops stretching slides in adaptive height mode (#382)', () => {
    const adaptiveRule =
      css.match(/^\.carousel\.is-adaptive-height \{([^}]*)\}/m)?.[1] ?? ''
    expect(adaptiveRule).toMatch(/transition:\s*height var\(--vc-transition-easing\);/)
    expect(adaptiveRule).toMatch(
      /transition-duration:\s*var\(--vc-transition-duration\);/
    )
    const trackRule =
      css.match(/^\.carousel\.is-adaptive-height \.carousel__track \{([^}]*)\}/m)?.[1] ??
      ''
    expect(trackRule).toMatch(/align-items:\s*flex-start;/)
  })

  it('lets fade slides keep their content height in adaptive height mode (#382)', () => {
    const fadeTrackRule =
      css.match(
        /^\.carousel\.is-adaptive-height\.is-effect-fade \.carousel__track \{([^}]*)\}/m
      )?.[1] ?? ''
    expect(fadeTrackRule).toMatch(/grid-template-rows:\s*auto;/)
    expect(fadeTrackRule).toMatch(/align-items:\s*start;/)
    const fadeSlideRule =
      css.match(
        /^\.carousel\.is-adaptive-height\.is-effect-fade \.carousel__slide \{([^}]*)\}/m
      )?.[1] ?? ''
    expect(fadeSlideRule).toMatch(/height:\s*auto;/)
  })
})
