import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

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
