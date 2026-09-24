import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Slide } from '@/components/Slide'

import { Carousel } from './Carousel'
import { CarouselExposed } from './Carousel.types'

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
})
