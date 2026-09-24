import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'

import { Carousel, Slide } from '@/index'

import type { PropType } from 'vue'

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
  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

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
  })

  it('keeps the height prop until a slide has a height', async () => {
    const wrapper = mountCarousel({ height: 200 }, [0, 0, 0])
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('200px')
  })

  it('can be enabled through breakpoints', async () => {
    const wrapper = mountCarousel({
      adaptiveHeight: false,
      breakpoints: { 0: { adaptiveHeight: true } },
    })
    await nextTick()
    expect(root(wrapper).classes()).toContain('is-adaptive-height')
    expect(carouselHeight(wrapper)).toBe('120px')
  })

  it('only sets a transition duration while sliding', async () => {
    vi.useFakeTimers()
    const wrapper = mountCarousel()
    await nextTick()
    expect(root(wrapper).attributes('style')).not.toContain('--vc-transition-duration')
    await wrapper.setProps({ modelValue: 1 })
    expect(root(wrapper).attributes('style')).toContain('--vc-transition-duration: 300ms')
    expect(carouselHeight(wrapper)).toBe('200px')
    vi.runAllTimers()
    await nextTick()
    expect(root(wrapper).attributes('style')).not.toContain('--vc-transition-duration')
    expect(carouselHeight(wrapper)).toBe('200px')
  })

  it('is ignored for vertical directions', async () => {
    const wrapper = mountCarousel({ dir: 'ttb', height: 100 })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('100px')
    expect(root(wrapper).classes()).not.toContain('is-adaptive-height')
  })
})

describe('adaptiveHeight slide observation', () => {
  class FakeResizeObserver {
    static instances: FakeResizeObserver[] = []
    observed = new Set<Element>()
    constructor(public callback: ResizeObserverCallback) {
      FakeResizeObserver.instances.push(this)
    }
    observe(el: Element) {
      this.observed.add(el)
    }
    unobserve(el: Element) {
      this.observed.delete(el)
    }
    disconnect() {
      this.observed.clear()
    }
  }

  const Host = defineComponent({
    props: {
      heights: { type: Array as PropType<number[]>, required: true },
      adaptiveHeight: { type: Boolean, default: true },
    },
    render() {
      return h(
        Carousel,
        { adaptiveHeight: this.adaptiveHeight },
        {
          default: () =>
            this.heights.map((height, i) =>
              h(Slide, { key: height, 'data-height': height }, () => `${i + 1}`)
            ),
        }
      )
    },
  })

  const observer = () => FakeResizeObserver.instances[0]
  const slideElements = (wrapper: ReturnType<typeof mount>) =>
    wrapper.findAll('.carousel__slide').map((slide) => slide.element)
  const flushResize = async (entries: unknown[] = []) => {
    observer().callback(
      entries as ResizeObserverEntry[],
      observer() as unknown as ResizeObserver
    )
    await new Promise((resolve) => requestAnimationFrame(resolve))
    await nextTick()
  }
  const rootEntry = (wrapper: ReturnType<typeof mount>, width: number) => ({
    target: wrapper.find('.carousel').element,
    contentRect: { width },
  })

  beforeEach(() => {
    mockRects()
    FakeResizeObserver.instances = []
    vi.stubGlobal('ResizeObserver', FakeResizeObserver)
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('observes every registered slide', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS } })
    await nextTick()
    const slides = slideElements(wrapper)
    expect(slides).toHaveLength(5)
    slides.forEach((el) => expect(observer().observed.has(el)).toBe(true))
  })

  it('does not observe slides when adaptiveHeight is off', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS, adaptiveHeight: false } })
    await nextTick()
    slideElements(wrapper).forEach((el) =>
      expect(observer().observed.has(el)).toBe(false)
    )
    expect(observer().observed.has(wrapper.find('.carousel').element)).toBe(true)
  })

  it('re-measures when an observed slide resizes', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS } })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('120px')
    const resized = slideElements(wrapper)[0]
    expect(observer().observed.has(resized)).toBe(true)
    resized.setAttribute('data-height', '300')
    await flushResize()
    expect(carouselHeight(wrapper)).toBe('300px')
  })

  it('skips root-only entries with an unchanged width in adaptive mode', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS } })
    await nextTick()
    await flushResize([rootEntry(wrapper, 300)])
    slideElements(wrapper)[0].setAttribute('data-height', '300')
    // A frame of the height transition: same width, only the root resized
    await flushResize([rootEntry(wrapper, 300)])
    expect(carouselHeight(wrapper)).toBe('120px')
    // A real resize re-measures
    await flushResize([rootEntry(wrapper, 320)])
    expect(carouselHeight(wrapper)).toBe('300px')
  })

  it('re-measures root-only entries when adaptiveHeight is off', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS, adaptiveHeight: false } })
    await nextTick()
    await flushResize([rootEntry(wrapper, 300)])
    await wrapper.setProps({ adaptiveHeight: true })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('120px')
    await wrapper.setProps({ adaptiveHeight: false })
    await nextTick()
    slideElements(wrapper)[0].setAttribute('data-height', '300')
    await flushResize([rootEntry(wrapper, 300)])
    await wrapper.setProps({ adaptiveHeight: true })
    await nextTick()
    expect(carouselHeight(wrapper)).toBe('300px')
  })

  it('stops observing removed slides', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS } })
    await nextTick()
    const removed = slideElements(wrapper)[0]
    await wrapper.setProps({ heights: HEIGHTS.slice(1) })
    await nextTick()
    expect(observer().observed.has(removed)).toBe(false)
    expect(slideElements(wrapper)).toHaveLength(4)
    slideElements(wrapper).forEach((el) => expect(observer().observed.has(el)).toBe(true))
  })

  it('drops the slide observers when adaptiveHeight turns off', async () => {
    const wrapper = mount(Host, { props: { heights: HEIGHTS } })
    await nextTick()
    await wrapper.setProps({ adaptiveHeight: false })
    await nextTick()
    slideElements(wrapper).forEach((el) =>
      expect(observer().observed.has(el)).toBe(false)
    )
    expect(carouselHeight(wrapper)).toBe('auto')
  })
})
