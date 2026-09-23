import { mount } from '@vue/test-utils'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'
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
    props: { edgeSpacing: 16, ...props },
    slots: {
      default: () =>
        Array.from({ length: slideNum }, (_, i) =>
          h(Slide, { key: i }, () => `${i + 1}`)
        ),
    },
  })

const trackTransform = (wrapper: ReturnType<typeof mountCarousel>) =>
  (wrapper.find('.carousel__track').element as HTMLElement).style.transform

describe('edgeSpacing', () => {
  beforeAll(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      ...RECT,
      toJSON: () => RECT,
    })
  })
  afterAll(() => vi.restoreAllMocks())

  it('is 0 by default and leaves the track flush at both ends', async () => {
    const wrapper = mountCarousel({ edgeSpacing: 0 })
    expect(trackTransform(wrapper)).toBe('translateX(0px)')
    await wrapper.setProps({ modelValue: 4 })
    expect(trackTransform(wrapper)).toBe('translateX(-1200px)')
  })

  it('shifts the track at the first and last positions only', async () => {
    const wrapper = mountCarousel()
    expect(trackTransform(wrapper)).toBe('translateX(16px)')
    await wrapper.setProps({ modelValue: 2 })
    expect(trackTransform(wrapper)).toBe('translateX(-600px)')
    await wrapper.setProps({ modelValue: 4 })
    expect(trackTransform(wrapper)).toBe('translateX(-1216px)')
  })

  it('applies to a start-aligned first slide whose raw offset is 0', async () => {
    const wrapper = mountCarousel({ itemsToShow: 2.5, snapAlign: 'start' })
    // slideSize = 300 / 2.5 = 120
    expect(trackTransform(wrapper)).toBe('translateX(16px)')
    await wrapper.setProps({ modelValue: 1 })
    expect(trackTransform(wrapper)).toBe('translateX(-120px)')
    await wrapper.setProps({ modelValue: 4 })
    // max = (5 - 2.5) * 120 = 300
    expect(trackTransform(wrapper)).toBe('translateX(-316px)')
  })

  it('is mirrored in rtl', async () => {
    const wrapper = mountCarousel({ dir: 'rtl' })
    expect(trackTransform(wrapper)).toBe('translateX(-16px)')
    await wrapper.setProps({ modelValue: 4 })
    expect(trackTransform(wrapper)).toBe('translateX(1216px)')
  })

  it('applies on the Y axis when vertical', async () => {
    const wrapper = mountCarousel({ dir: 'ttb', height: 100 })
    expect(trackTransform(wrapper)).toBe('translateY(16px)')
    await wrapper.setProps({ modelValue: 4 })
    expect(trackTransform(wrapper)).toBe('translateY(-416px)')
  })

  it('applies in auto mode', async () => {
    const wrapper = mountCarousel({ itemsToShow: 'auto' })
    expect(trackTransform(wrapper)).toBe('translateX(16px)')
    await wrapper.setProps({ modelValue: 4 })
    expect(trackTransform(wrapper)).toBe('translateX(-1216px)')
  })

  it('is ignored with wrapAround', () => {
    const wrapper = mountCarousel({ wrapAround: true })
    expect(trackTransform(wrapper)).toBe('translateX(0px)')
  })

  it('warns on a negative value and ignores it', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const wrapper = mountCarousel({ edgeSpacing: -1, preventExcessiveDragging: true })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('edgeSpacing'))
    // Slide sizes are measured after mount, so wait for the first update.
    await wrapper.vm.$nextTick()
    // A negative value is normalized to 0, so the track stays flush with the start
    // instead of being clamped past it by the preventExcessiveDragging range.
    expect(trackTransform(wrapper)).toBe('translateX(0px)')
    warn.mockRestore()
  })

  it('marks only the first slide visible in auto mode at the start', async () => {
    const wrapper = mountCarousel({ itemsToShow: 'auto' })
    // Slide sizes are measured after mount, so wait for the first update.
    await wrapper.vm.$nextTick()
    // The track is pushed 16px past the start, so slide 2 begins at 316px > 300px.
    expect(wrapper.findAll('.carousel__slide--visible').length).toBe(1)
  })

  it('marks only the last slide visible in auto mode at the end', async () => {
    const wrapper = mountCarousel({ itemsToShow: 'auto' })
    await wrapper.setProps({ modelValue: 4 })
    await wrapper.vm.$nextTick()
    // The track is pulled 16px past the end, so the last slide starts 16px off the
    // left edge and the trailing 16px is the edge spacing: still one slide visible.
    expect(wrapper.findAll('.carousel__slide--visible').length).toBe(1)
  })

  it('lets preventExcessiveDragging reach, but not exceed, the spaced edge', async () => {
    const wrapper = mountCarousel({ preventExcessiveDragging: true })
    try {
      const track = wrapper.find('.carousel__track')
      await track.trigger('mousedown', { clientX: 100, button: 0 })
      document.dispatchEvent(new MouseEvent('mousemove', { clientX: 150 }))
      await new Promise((resolve) => requestAnimationFrame(resolve))
      await wrapper.vm.$nextTick()
      expect(trackTransform(wrapper)).toBe('translateX(16px)')
    } finally {
      document.dispatchEvent(new MouseEvent('mouseup'))
    }
  })

  // The auto-mode visible range measures the track offset from the first cloned
  // slide, which is the same distance in both directions.
  it.each(['ltr', 'rtl'] as const)(
    'keeps one slide visible on a cloned negative index in auto mode (%s)',
    async (dir) => {
      const wrapper = mountCarousel({
        dir,
        wrapAround: true,
        itemsToShow: 'auto',
        edgeSpacing: 0,
      })
      await wrapper.vm.$nextTick()
      // currentSlideIndex is -1 while the transition to the cloned slide runs.
      wrapper.vm.prev()
      await wrapper.vm.$nextTick()
      const visible = wrapper.findAll('.carousel__slide--visible')
      expect(visible.length).toBe(1)
      // The visible slide is the clone at index -1, i.e. the one being slid to.
      expect(visible[0].classes()).toContain('carousel__slide--active')
      expect(visible[0].text()).toBe('5')
    }
  )
})
