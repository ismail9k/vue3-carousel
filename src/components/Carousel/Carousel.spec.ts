import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Slide } from '@/components/Slide'

import { Carousel } from './Carousel'

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
})

describe('Carousel.css', () => {
  // jsdom does no layout, so the stylesheet text is what can be asserted.
  const css = readFileSync(resolve(__dirname, 'Carousel.css'), 'utf8')
  const carouselRule = css.match(/^\.carousel \{([^}]*)\}/m)?.[1] ?? ''

  it('declares min-width: 0 on .carousel so it can shrink as a flex or grid item (#540)', () => {
    expect(carouselRule, 'expected a top-level `.carousel { ... }` rule').not.toBe('')
    expect(carouselRule).toMatch(/min-width:\s*0;/)
  })
})
