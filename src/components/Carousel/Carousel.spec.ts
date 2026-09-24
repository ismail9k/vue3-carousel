import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { h } from 'vue'

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
