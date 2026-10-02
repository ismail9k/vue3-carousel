import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Carousel, Slide } from '@/index'

import type { ComponentProps } from 'vue-component-type-helpers'

describe('Interrupted transitions', () => {
  let wrapper: ReturnType<typeof mount<typeof Carousel>>

  // A controlled carousel: the parent writes every emitted index back to modelValue
  const mountCarousel = (
    props: ComponentProps<typeof Carousel> & { onSlideEnd?: () => void } = {}
  ) => {
    wrapper = mount(Carousel, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
        ...props,
      },
      slots: {
        default: () =>
          [0, 1, 2, 3, 4].map((i) => h(Slide, { key: i }, () => `slide ${i}`)),
      },
    })
    return wrapper
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.useRealTimers()
  })

  it('leaves no timer pending when unmounted after two quick modelValue changes', async () => {
    // A listener, as the wrapper drops its emitted events on unmount
    const onSlideEnd = vi.fn()
    mountCarousel({ autoplay: 1000, onSlideEnd })
    await nextTick()

    await wrapper.setProps({ modelValue: 1 })
    await wrapper.setProps({ modelValue: 2 })
    wrapper.unmount()
    vi.advanceTimersByTime(1000)

    expect(vi.getTimerCount()).toBe(0)
    // The interrupted transition ended when it was interrupted, and the
    // interrupting one was cancelled by the unmount
    expect(onSlideEnd.mock.calls).toEqual([
      [{ currentSlideIndex: 1, prevSlideIndex: 0, slidesCount: 5 }],
    ])
  })

  it('ends the interrupted transition at once and the interrupting one on time', async () => {
    mountCarousel()
    await nextTick()

    await wrapper.setProps({ modelValue: 1 })
    vi.advanceTimersByTime(100)
    await wrapper.setProps({ modelValue: 2 })

    expect(wrapper.emitted('slide-end')).toEqual([
      [{ currentSlideIndex: 1, prevSlideIndex: 0, slidesCount: 5 }],
    ])

    // 300ms after the first change, the second transition is still running
    vi.advanceTimersByTime(299)
    await nextTick()
    expect(wrapper.emitted('slide-end')).toHaveLength(1)
    expect(wrapper.classes()).toContain('is-sliding')

    vi.advanceTimersByTime(1)
    await nextTick()
    expect(wrapper.emitted('slide-end')).toEqual([
      [{ currentSlideIndex: 1, prevSlideIndex: 0, slidesCount: 5 }],
      [{ currentSlideIndex: 2, prevSlideIndex: 1, slidesCount: 5 }],
    ])
    expect(wrapper.emitted('slide-start')).toHaveLength(2)
    expect(wrapper.classes()).not.toContain('is-sliding')
  })

  it('keeps following modelValue after a looping transition is interrupted', async () => {
    mountCarousel({ wrapAround: true, modelValue: 4 })
    await nextTick()

    // Loops from the last slide to the first, which pauses the modelValue watcher
    wrapper.vm.next()
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(0)
    vi.advanceTimersByTime(100)
    wrapper.vm.slideTo(2, true)
    await nextTick()

    expect(wrapper.emitted('loop')).toEqual([
      [{ currentSlideIndex: 0, slidingToIndex: 5 }],
    ])

    vi.advanceTimersByTime(300)
    await nextTick()
    expect(wrapper.vm.currentSlide).toBe(2)
    expect(wrapper.emitted('slide-start')).toHaveLength(2)
    expect(wrapper.emitted('slide-end')).toHaveLength(2)
    expect(wrapper.emitted('loop')).toHaveLength(1)
    expect(wrapper.classes()).not.toContain('is-sliding')

    await wrapper.setProps({ modelValue: 3 })
    expect(wrapper.vm.currentSlide).toBe(3)
  })

  it('runs one transition per call when a loop interrupts a loop', async () => {
    mountCarousel({ wrapAround: true, modelValue: 4 })
    await nextTick()

    // The watcher is paused when modelValue follows the loop to the first slide
    wrapper.vm.next()
    await nextTick()
    expect(wrapper.props('modelValue')).toBe(0)
    vi.advanceTimersByTime(100)
    wrapper.vm.next(true)
    await nextTick()

    expect(wrapper.emitted('loop')).toEqual([
      [{ currentSlideIndex: 0, slidingToIndex: 5 }],
    ])

    vi.advanceTimersByTime(299)
    await nextTick()
    expect(wrapper.emitted('slide-end')).toHaveLength(1)
    expect(wrapper.classes()).toContain('is-sliding')

    vi.advanceTimersByTime(1)
    await nextTick()
    expect(wrapper.vm.currentSlide).toBe(1)
    expect(wrapper.props('modelValue')).toBe(1)
    expect(wrapper.emitted('slide-start')).toHaveLength(2)
    expect(wrapper.emitted('slide-end')).toHaveLength(2)
    expect(wrapper.emitted('loop')).toHaveLength(2)
  })

  it('does not start autoplay when a transition ends after unmount', async () => {
    mountCarousel({ autoplay: 1000 })
    await nextTick()

    const { slideTo } = wrapper.vm
    wrapper.unmount()
    slideTo(2)
    vi.advanceTimersByTime(300)

    expect(vi.getTimerCount()).toBe(0)
  })
})
