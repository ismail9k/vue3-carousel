import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

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

const mountCarousel = (props: Record<string, unknown> = {}) =>
  mount(Carousel, {
    props: { modelValue: 0, ...props },
    slots: {
      default: () =>
        Array.from({ length: 5 }, (_, i) => h(Slide, { key: i }, () => `${i + 1}`)),
    },
  })

const touchEvent = (type: string, clientX: number) => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  const touch = { clientX, clientY: 0 }
  Object.defineProperty(event, 'touches', { value: type === 'touchend' ? [] : [touch] })
  Object.defineProperty(event, 'changedTouches', { value: [touch] })
  return event
}

const flushFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

const emittedIndex = (wrapper: ReturnType<typeof mountCarousel>) =>
  wrapper.emitted('update:modelValue')?.[0]

describe('drag threshold', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      ...RECT,
      toJSON: () => RECT,
    })
  })
  afterEach(() => vi.restoreAllMocks())

  it('slides on a processed touch move past the threshold and emits drag once', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px = 0.133 of 300
    await flushFrame()
    await nextTick()
    expect(wrapper.emitted('drag')).toHaveLength(1)
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
    expect(wrapper.emitted('drag')).toHaveLength(1)
  })

  it('honors a touchDrag.threshold larger than the swipe', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.5 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px = 0.133 of 300
    await flushFrame()
    await nextTick()
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toBeUndefined()
  })

  it('honors a mouseDrag.threshold larger than the drag', async () => {
    const wrapper = mountCarousel({ mouseDrag: { threshold: 0.5 } })
    await wrapper
      .find('.carousel__track')
      .trigger('mousedown', { clientX: 200, button: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }))
    await flushFrame()
    await nextTick()
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    expect(emittedIndex(wrapper)).toBeUndefined()
  })

  it('uses the last touchmove when touchend lands in the same frame', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 190)) // 10px, below threshold
    await flushFrame()
    await nextTick()
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px, not yet flushed
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('applies the latest of several touchmoves inside one frame', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 190)) // 10px, below threshold
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px, same frame
    await flushFrame()
    await nextTick()
    expect(
      (wrapper.find('.carousel__track').element as HTMLElement).style.transform
    ).toBe('translateX(-40px)')
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('uses the last mousemove when mouseup lands in the same frame', async () => {
    const wrapper = mountCarousel({ mouseDrag: { threshold: 0.1 } })
    await wrapper
      .find('.carousel__track')
      .trigger('mousedown', { clientX: 200, button: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 190 }))
    await flushFrame()
    await nextTick()
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }))
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('suppresses the click when only the flushed final sample passes 10px', async () => {
    // Consume any click-suppression listener left behind by earlier mouse drags
    window.dispatchEvent(new MouseEvent('click'))
    const wrapper = mountCarousel()
    await wrapper
      .find('.carousel__track')
      .trigger('mousedown', { clientX: 200, button: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 195 })) // 5px
    await flushFrame()
    await nextTick()
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 })) // 50px, not yet flushed
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    const click = new MouseEvent('click', { cancelable: true })
    window.dispatchEvent(click)
    expect(click.defaultPrevented).toBe(true)
  })

  it('does not slide on a release without any move', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchend', 200))
    await nextTick()
    expect(emittedIndex(wrapper)).toBeUndefined()
  })
})
