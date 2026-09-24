import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Carousel, Slide } from '@/index'

const VIEWPORT = { width: 300, height: 100 }
const HEIGHTS = [120, 200, 80, 160, 240]

// jsdom does no layout: a slide reports the height in its data-height attribute,
// every other element (root, viewport) reports VIEWPORT.
const mockRects = () =>
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: Element
  ) {
    const attr = this.getAttribute('data-height')
    const height = attr === null ? VIEWPORT.height : Number(attr)
    return {
      ...VIEWPORT,
      height,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect
  })

const mountCarousel = (props: Record<string, unknown> = {}, heights = HEIGHTS) =>
  mount(Carousel, {
    props: { adaptiveHeight: true, ...props },
    slots: {
      default: () =>
        heights.map((height, i) =>
          h(Slide, { key: i, 'data-height': height }, () => `${i + 1}`)
        ),
    },
  })

// tests/ are not typechecked (tsconfig includes src only); keep helper types loose
type Wrapper = ReturnType<typeof mount>

const root = (wrapper: Wrapper) => wrapper.find('.carousel')
const carouselHeight = (wrapper: Wrapper) =>
  root(wrapper)
    .attributes('style')
    ?.match(/--vc-carousel-height:\s*([^;]+)/)?.[1]

describe('adaptiveHeight', () => {
  let warn: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockRects()
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it('is off by default and exposed on the config', () => {
    const wrapper = mountCarousel({ adaptiveHeight: undefined })
    expect(wrapper.vm.data.config.adaptiveHeight).toBe(false)
    expect(mountCarousel().vm.data.config.adaptiveHeight).toBe(true)
  })

  it('warns when combined with a vertical dir', () => {
    mountCarousel({ dir: 'ttb', height: 100 })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('adaptiveHeight'))
  })

  it('keeps the height prop and no class when off', async () => {
    const wrapper = mountCarousel({ adaptiveHeight: false, height: 200 })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('200px')
    expect(root(wrapper).classes()).not.toContain('is-adaptive-height')
  })

  it('sets the carousel height to the current slide height', async () => {
    const wrapper = mountCarousel()
    // slides are measured on the first scheduler flush after mount
    await nextTick()
    expect(root(wrapper).classes()).toContain('is-adaptive-height')
    expect(carouselHeight(wrapper)).toBe('120px')
    await wrapper.setProps({ modelValue: 1 })
    expect(carouselHeight(wrapper)).toBe('200px')
  })

  it('uses the tallest visible slide when itemsToShow > 1', async () => {
    const wrapper = mountCarousel({ itemsToShow: 2, snapAlign: 'start' })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('200px')
    await wrapper.setProps({ modelValue: 2 })
    expect(carouselHeight(wrapper)).toBe('160px')
  })

  it('resolves wrapAround indices to real slides', async () => {
    // slideTo pauses the v-model watcher until the transition timer fires
    vi.useFakeTimers()
    const wrapper = mountCarousel({ wrapAround: true })
    await wrapper.setProps({ modelValue: -1 })
    // currentSlideIndex is -1 while looping: the last slide
    expect(carouselHeight(wrapper)).toBe('240px')
    vi.runAllTimers()
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('240px')
    await wrapper.setProps({ modelValue: 5 })
    // currentSlideIndex is 5 while looping: the first slide
    expect(carouselHeight(wrapper)).toBe('120px')
    vi.useRealTimers()
  })

  it('keeps the height prop until a slide has a height', async () => {
    const wrapper = mountCarousel({ height: 200 }, [0, 0, 0])
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('200px')
  })

  it('is ignored for vertical directions', async () => {
    const wrapper = mountCarousel({ dir: 'ttb', height: 100 })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('100px')
    expect(root(wrapper).classes()).not.toContain('is-adaptive-height')
  })
})
