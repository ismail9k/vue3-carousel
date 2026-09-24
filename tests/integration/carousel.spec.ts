import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeAll, vi, afterEach, beforeEach } from 'vitest'
import { Component, createSSRApp, defineComponent, h, nextTick, ref } from 'vue'
import { renderToString } from 'vue/server-renderer'

import { Carousel, Navigation, Pagination, Slide } from '@/index'

import App from '../components/BasicApp.vue'
import SlottedApp from '../components/SlottedApp.vue'

import type { ComponentProps } from 'vue-component-type-helpers'

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  beforeEach(async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
      },
    })
  })

  it('It renders *five* slides correctly', () => {
    const slides = wrapper.findAll('.carousel__slide')
    expect(slides.length).toBe(5)
  })

  it('Should display *one* visible item', () => {
    const slides = wrapper.findAll('.carousel__slide--visible')
    expect(slides.length).toBe(1)
  })

  it('Should display *one* next item', () => {
    const slides = wrapper.findAll('.carousel__slide--next')
    expect(slides.length).toBe(1)
  })

  it('Should navigate to the focused slide', async () => {
    const slide = wrapper.find('.carousel__slide:nth-child(4)')
    await slide.trigger('focusin')
    expect(wrapper.props('modelValue')).toBe(3)
  })

  it('Should not navigate when focus is caused by a pointer (mousedown)', async () => {
    const viewport = wrapper.find('.carousel__viewport').element
    viewport.scrollLeft = 20
    const slide = wrapper.find('.carousel__slide:nth-child(4)')
    await slide.trigger('mousedown')
    await slide.trigger('focusin')
    expect(wrapper.props('modelValue')).toBe(0)
    // The focus still scrolls the viewport, so the reset must run regardless
    expect(viewport.scrollLeft).toBe(0)
  })

  it('Should not navigate when a pointer focuses an input inside a slide with mouseDrag enabled', async () => {
    const input = wrapper.find('.carousel__slide:nth-child(4) input')
    await input.trigger('mousedown')
    await input.trigger('focusin')
    expect(wrapper.props('modelValue')).toBe(0)
  })

  it('Should navigate on keyboard focus after a pointer interaction has ended', async () => {
    vi.useFakeTimers()
    const slide = wrapper.find('.carousel__slide:nth-child(4)')
    await slide.trigger('mousedown')
    // No focusin: the mousedown target was not focusable. Fire the flag's 0 ms timer.
    vi.advanceTimersByTime(1)
    vi.useRealTimers()
    await slide.trigger('focusin')
    expect(wrapper.props('modelValue')).toBe(3)
  })

  it('Should not navigate when a pointer focuses content inside a non-active slide with mouseDrag disabled', async () => {
    const onClick = vi.fn()
    const clickWrapper = mount(Carousel, {
      props: { itemsToShow: 3, mouseDrag: false, modelValue: 0 },
      slots: {
        default: () =>
          [0, 1, 2, 3, 4].map((i) =>
            h(Slide, { key: i }, () => h('button', { onClick }, `slide ${i}`))
          ),
      },
    })
    await nextTick()
    const button = clickWrapper.findAll('.carousel__slide')[2].find('button')
    await button.trigger('mousedown')
    await button.trigger('focusin')
    await button.trigger('mouseup')
    await button.trigger('click')
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(clickWrapper.emitted('update:modelValue')).toBeUndefined()
    clickWrapper.unmount()
  })

  it('Should not navigate when slide content stops mousedown propagation', async () => {
    const stopWrapper = mount(Carousel, {
      props: { itemsToShow: 3, mouseDrag: false, modelValue: 0 },
      slots: {
        default: () =>
          [0, 1, 2, 3, 4].map((i) =>
            h(Slide, { key: i }, () =>
              h(
                'button',
                { onMousedown: (e: Event) => e.stopPropagation() },
                `slide ${i}`
              )
            )
          ),
      },
    })
    await nextTick()
    const button = stopWrapper.findAll('.carousel__slide')[2].find('button')
    await button.trigger('mousedown')
    await button.trigger('focusin')
    expect(stopWrapper.emitted('update:modelValue')).toBeUndefined()
    stopWrapper.unmount()
  })

  it('Should navigate the carousel with arrow keys', async () => {
    vi.useFakeTimers()
    const track = wrapper.find('[tabindex="0"]')
    const triggerKeyEvent = async (key = 'ArrowRight', ctrl = false) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: key, ctrlKey: ctrl }))
      // Advance timers to handle throttle delay (200ms for arrow keys)
      vi.advanceTimersByTime(200)
      await nextTick()
    }
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(0)
    await track.trigger('focus')
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(2)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight', true)
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(1)
    await wrapper.setProps({ dir: 'ttb', height: 200 })
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(2)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await wrapper.setProps({ dir: 'btt', height: 200 })
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(0)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await wrapper.setProps({ dir: 'rtl' })
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(0)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await track.trigger('blur')

    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    vi.useRealTimers()
  })

  it('Should default itemsToShow to 1 if less than 1', async () => {
    await wrapper.setProps({ itemsToShow: 0 })
    const slides = wrapper.findAll('.carousel__slide--visible')
    expect(slides.length).toBe(1)
  })

  it('Should default itemsToShow to slidesCount if greater than slidesCount', async () => {
    await wrapper.setProps({ itemsToShow: 10 })
    const slides = wrapper.findAll('.carousel__slide')
    expect(slides.length).toBe(5)
  })

  it('Should exclude invisible slides from tab navigation', async () => {
    const wrapper = await mount(App, {
      props: {
        slideNum: 5,
        itemsToShow: 1,
        modelValue: 0,
      },
    })

    const allSlides = wrapper.findAll('.carousel__slide')
    const visibleSlides = wrapper.findAll('.carousel__slide--visible')

    // With itemsToShow: 1, only 1 slide should be visible
    expect(visibleSlides.length).toBe(1)
    expect(allSlides.length).toBe(5)

    // Check that visible slide has no tabindex or has tabindex="0"
    const visibleSlide = visibleSlides[0].element as HTMLElement
    const visibleTabindex = visibleSlide.getAttribute('tabindex')
    expect(visibleTabindex === null || visibleTabindex === '0').toBe(true)

    // Check that non-visible slides have tabindex="-1"
    for (let i = 0; i < allSlides.length; i++) {
      const slide = allSlides[i].element as HTMLElement
      const hasVisibleClass = slide.classList.contains('carousel__slide--visible')

      if (!hasVisibleClass) {
        expect(slide.getAttribute('tabindex')).toBe('-1')
      }
    }
  })

  it('Should exclude cloned slides from tab navigation', async () => {
    const wrapper = await mount(App, {
      props: {
        slideNum: 5,
        itemsToShow: 3,
        wrapAround: true,
        modelValue: 0,
      },
    })

    const clonedSlides = wrapper.findAll('.carousel__slide--clone')

    // With wrapAround, there should be cloned slides
    expect(clonedSlides.length).toBeGreaterThan(0)

    // Check that cloned slides have tabindex="-1"
    for (const clonedSlide of clonedSlides) {
      const slide = clonedSlide.element as HTMLElement
      expect(slide.getAttribute('tabindex')).toBe('-1')
    }
  })
})

describe('Slotted Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof SlottedApp>>

  beforeAll(async () => {
    wrapper = await mount(SlottedApp, { props: { slideNum: 3 } })
  })

  it('It renders *three* slides correctly', () => {
    const slides = wrapper.findAll('.carousel__slide')
    expect(slides.length).toBe(3)
  })

  it('Should display *one* visible item', () => {
    const slides = wrapper.findAll('.carousel__slide--visible')
    expect(slides.length).toBe(1)
  })

  it('Should display *one* next item', () => {
    const slides = wrapper.findAll('.carousel__slide--next')
    expect(slides.length).toBe(1)
  })
})

describe('Wrap around Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  beforeAll(async () => {
    wrapper = await mount(App, {
      props: { wrapAround: true, itemsToShow: 3, slideNum: 9, modelValue: 8 },
    })
  })

  it('renders wrapAround correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})

describe('SSR Carousel', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  afterEach(() => {
    consoleMock.mockReset()
  })

  const renderSSR = async <T extends Component, P extends ComponentProps<T>>(
    component: T,
    props: P = {} as P
  ) => {
    const comp = {
      render() {
        return h('div', { id: 'app' }, h(component, props))
      },
    }
    // Simulate a SSR env where there is no window or document
    const windowBackup = window
    const documentBackup = document
    Object.defineProperty(global, 'window', {
      value: undefined,
      enumerable: true,
      writable: false,
    })
    const app = createSSRApp(comp)
    const html = await renderToString(app)

    Object.defineProperty(global, 'window', {
      value: windowBackup,
      enumerable: true,
      writable: false,
    })
    Object.defineProperty(global, 'document', {
      value: documentBackup,
      enumerable: true,
      writable: false,
    })
    Object.defineProperty(global.window, 'innerWidth', { value: 700 })
    document.body.innerHTML = html
    const wrapper = await mount(comp, { attachTo: '#app' })
    return [html, wrapper]
  }

  it('renders server side properly', async () => {
    const [html, wrapper] = await renderSSR(App, {
      height: 200,
      wrapAround: true,
      modelValue: 1,
      itemsToShow: 2,
    })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(html).toMatchSnapshot()
  })

  it('renders slotted server side properly', async () => {
    const [html, wrapper] = await renderSSR(SlottedApp, {
      wrapAround: true,
      slideNum: 5,
    })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(html).toMatchSnapshot()
  })

  it("doesn't get hydration mismatch with breakpoints", async () => {
    const [html, wrapper] = await renderSSR(App, {
      wrapAround: true,
      breakpoints: {
        600: {
          itemsToShow: 3,
        },
      },
      modelValue: 1,
      itemsToShow: 1,
    })
    expect(consoleMock).not.toHaveBeenCalled()

    const slides = wrapper.findAll('.carousel__slide--visible')
    expect(slides.length).toBe(3)

    const el = document.createElement('div')
    el.innerHTML = html
    const slidesSSR = el.querySelectorAll('.carousel__slide--visible')
    expect(slidesSSR.length).toBe(1)
  })
})

describe('Carousel Clone Count Logic', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  it('should not clone slides when wrapAround is disabled', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        wrapAround: false,
        itemsToShow: 3,
        itemsToScroll: 1,
        modelValue: 0,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    expect(slides.length).toBe(5) // Only original slides
  })

  it('should calculate correct clone counts at start position', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        wrapAround: true,
        itemsToShow: 3,
        itemsToScroll: 2,
        modelValue: 0,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    // Original slides (5) + cloned slides before (4) + cloned slides after (0)
    // slidesToClone = Math.ceil(3 + (2 - 1)) = 4
    // -> before: Math.max(0, 4-0) = 4
    // -> after: Math.max(0, 4-(5-(0+1))) = 0
    expect(slides.length).toBe(9)
  })

  it('should adjust clone counts when scrolling to middle', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        wrapAround: true,
        itemsToShow: 2,
        itemsToScroll: 1,
        modelValue: 2,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    // Original slides (5) only
    expect(slides.length).toBe(5)
  })

  it('should handle edge case at last slide', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        wrapAround: true,
        itemsToShow: 2,
        itemsToScroll: 1,
        modelValue: 4,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    // Original slides (5) + cloned slides after (2)
    expect(slides.length).toBe(7)
  })

  it('should handle decimal itemsToShow with itemsToScroll', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        wrapAround: true,
        itemsToShow: 2.5,
        itemsToScroll: 2,
        modelValue: 0,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    // Original slides (5) + ceil(2.5 + (2 - 1)) = 4
    expect(slides.length).toBe(9)
  })

  it('should handle minimal setup with a single item', async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 1,
        wrapAround: true,
        itemsToShow: 1,
        itemsToScroll: 1,
        modelValue: 0,
      },
    })

    const slides = wrapper.findAll('.carousel__slide')
    // Original slides (1) + cloned slides before (1) + cloned slides after (1)
    expect(slides.length).toBe(3)
  })
})

describe('Carousel inside a scaled ancestor', () => {
  const VIEWPORT_SCREEN_WIDTH = 500
  let scale = 0.5 // layout width is 1000 at this scale
  let scaleY = scale // kept separate so a test can pin a non-uniform scale

  const ScaledApp = defineComponent({
    props: {
      dir: { type: String, default: 'ltr' },
      height: { type: [String, Number], default: 'auto' },
      // Extra props merged over the defaults below, for per-test configuration
      carouselProps: { type: Object, default: () => ({}) },
    },
    setup() {
      // The carousel's exposed API is only reachable through a template ref
      return { carousel: ref() }
    },
    render() {
      return h('div', { class: 'scaled-wrapper' }, [
        h(
          Carousel,
          {
            ref: 'carousel',
            itemsToShow: 1,
            snapAlign: 'start',
            modelValue: 0,
            dir: this.dir,
            height: this.height,
            ...this.carouselProps,
          },
          {
            default: () => [1, 2, 3, 4, 5].map((n) => h(Slide, { key: n }, () => `${n}`)),
          }
        ),
      ])
    },
  })

  let wrapper: ReturnType<typeof mount<typeof ScaledApp>>

  const mountScaled = async (
    props: {
      dir?: string
      height?: string
      carouselProps?: Record<string, unknown>
    } = {},
    // Only needed by tests that rely on events bubbling up to the document
    options: { attachTo?: Element } = {}
  ) => {
    wrapper = mount(ScaledApp, { props, ...options })
    await nextTick()
    return wrapper
  }

  beforeEach(() => {
    scale = 0.5
    scaleY = scale
    vi.useFakeTimers()
    vi.spyOn(window, 'getComputedStyle').mockImplementation(
      (el) =>
        ({
          transform: (el as Element).classList?.contains('scaled-wrapper')
            ? `matrix(${scale}, 0, 0, ${scaleY}, 0, 0)`
            : 'none',
        }) as CSSStyleDeclaration
    )
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(
      () =>
        ({
          width: VIEWPORT_SCREEN_WIDTH,
          height: VIEWPORT_SCREEN_WIDTH,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => ({}),
        }) as DOMRect
    )
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.restoreAllMocks()
    vi.useRealTimers()
  })

  const dragMouse = async (from: [number, number], to: [number, number]) => {
    const track = wrapper.find('.carousel__track')
    await track.trigger('mousedown', { clientX: from[0], clientY: from[1], button: 0 })
    document.dispatchEvent(
      new MouseEvent('mousemove', { clientX: to[0], clientY: to[1] })
    )
    vi.runAllTimers() // flush the throttled drag handler
    await nextTick()
    return track
  }

  const releaseMouse = async () => {
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
  }

  it('measures the slide size in layout pixels', async () => {
    await mountScaled()

    expect(wrapper.vm.carousel.data.slideSize).toBe(VIEWPORT_SCREEN_WIDTH / scale)
  })

  it('moves the track by one layout-pixel slide per slide', async () => {
    await mountScaled()

    wrapper.vm.carousel.slideTo(1)
    await nextTick()

    expect(wrapper.find('.carousel__track').attributes('style')).toContain(
      'translateX(-1000px)'
    )
  })

  it('converts mouse drag distance from screen pixels to layout pixels', async () => {
    await mountScaled()

    // 60 screen px at scale 0.5 is 120 layout px
    const track = await dragMouse([400, 0], [340, 0])
    expect(track.attributes('style')).toContain('translateX(-120px)')

    await releaseMouse()
    // 120 / 1000 = 0.12 of a slide, above the 0.08 default threshold
    expect(wrapper.findComponent(Carousel).emitted('update:modelValue')?.[0]).toEqual([1])
  })

  it('resamples the scale on each drag', async () => {
    await mountScaled()

    await dragMouse([400, 0], [340, 0])
    await releaseMouse()
    vi.runAllTimers() // finish the slide transition

    scale = 0.25 // the wrapper rescaled (e.g. window resize) between drags
    const track = await dragMouse([400, 0], [340, 0])
    // 60 screen px at scale 0.25 is 240 layout px, on top of the 1000px scroll
    // The 1000px offset was measured at scale 0.5 and is not re-measured here:
    // vitest.setup.ts stubs ResizeObserver as a no-op, so no resize callback
    // fires (a real browser would re-measure and the offset would become 2000).
    expect(track.attributes('style')).toContain('translateX(-1240px)')
  })

  it("matches 'carousel' breakpoints on the layout width", async () => {
    await mountScaled({
      carouselProps: {
        breakpointMode: 'carousel',
        breakpoints: { 800: { itemsToShow: 2 } },
      },
    })

    // root is 500 screen px at scale 0.5 = 1000 layout px, which is >= 800
    expect(wrapper.findAll('.carousel__slide--visible').length).toBe(2)
  })

  it('stops the ancestor animation loop when the animation is cancelled', async () => {
    await mountScaled({}, { attachTo: document.body })
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame')
    const ancestor = wrapper.element as HTMLElement // .scaled-wrapper contains the carousel root

    ancestor.dispatchEvent(new Event('animationstart', { bubbles: true }))
    ancestor.dispatchEvent(new Event('animationcancel', { bubbles: true }))

    expect(cancelSpy).toHaveBeenCalledTimes(1)
  })

  it('uses the height multiplier for vertical drags', async () => {
    // Non-uniform on purpose: a uniform scale cannot catch an axis swap
    scaleY = 0.25
    await mountScaled({ dir: 'ttb', height: '500px' })

    // 60 screen px at scaleY 0.25 is 240 layout px (widthMultiplier is only 2)
    const track = await dragMouse([0, 400], [0, 340])
    expect(track.attributes('style')).toContain('translateY(-240px)')
  })
})

describe('itemsToScroll paging (#522)', () => {
  const mountCarousel = (
    props: Record<string, unknown> = {},
    { slides = 9, paginateByItemsToShow = false } = {}
  ) =>
    mount(Carousel, {
      props: {
        itemsToShow: 3,
        itemsToScroll: 3,
        snapAlign: 'center',
        wrapAround: false,
        ...props,
      },
      slots: {
        default: () =>
          Array.from({ length: slides }, (_, i) => h(Slide, { key: i }, () => `${i}`)),
        addons: () => [
          h(Navigation),
          ...(paginateByItemsToShow ? [h(Pagination, { paginateByItemsToShow })] : []),
        ],
      },
    })
  const visible = (wrapper: ReturnType<typeof mountCarousel>) =>
    wrapper.findAll('.carousel__slide--visible').map((slide) => slide.text())
  const step = async (
    wrapper: ReturnType<typeof mountCarousel>,
    direction: 'next' | 'prev'
  ) => {
    wrapper.vm[direction]()
    vi.advanceTimersByTime(300)
    await nextTick()
  }

  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('moves the visible slides by itemsToScroll from the clamped edges', async () => {
    const wrapper = mountCarousel()
    await nextTick()
    expect(visible(wrapper)).toEqual(['0', '1', '2'])

    await step(wrapper, 'next')
    expect(visible(wrapper)).toEqual(['3', '4', '5'])
    expect(wrapper.vm.currentSlide).toBe(4)

    await step(wrapper, 'next')
    expect(visible(wrapper)).toEqual(['6', '7', '8'])
    expect(wrapper.vm.currentSlide).toBe(8)
    expect(wrapper.find('.carousel__next').attributes('disabled')).toBeDefined()

    await step(wrapper, 'prev')
    expect(visible(wrapper)).toEqual(['3', '4', '5'])

    await step(wrapper, 'prev')
    expect(visible(wrapper)).toEqual(['0', '1', '2'])
    expect(wrapper.vm.currentSlide).toBe(0)
    expect(wrapper.find('.carousel__prev').attributes('disabled')).toBeDefined()
  })

  it('keeps wrapAround stepping by itemsToScroll', async () => {
    const wrapper = mountCarousel({ wrapAround: true })
    await nextTick()
    expect(visible(wrapper)).toEqual(['8', '0', '1'])

    await step(wrapper, 'next')
    expect(visible(wrapper)).toEqual(['2', '3', '4'])
    expect(wrapper.vm.currentSlide).toBe(3)

    await step(wrapper, 'next')
    expect(visible(wrapper)).toEqual(['5', '6', '7'])
  })

  it('steps one slide at a time with itemsToScroll 1 at the clamped edges', async () => {
    const wrapper = mountCarousel({ itemsToShow: 5, itemsToScroll: 1 })
    await nextTick()

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(1)
    expect(visible(wrapper)).toEqual(['0', '1', '2', '3', '4'])

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(2)
    expect(visible(wrapper)).toEqual(['0', '1', '2', '3', '4'])

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(3)
    expect(visible(wrapper)).toEqual(['1', '2', '3', '4', '5'])
  })

  it('steps by index when itemsToShow exceeds the slide count', async () => {
    const wrapper = mountCarousel(
      { itemsToShow: 4, itemsToScroll: 2, snapAlign: 'start' },
      { slides: 3 }
    )
    await nextTick()

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(2)

    await step(wrapper, 'prev')
    expect(wrapper.vm.currentSlide).toBe(0)
  })

  it('does not jump to the last slide when itemsToShow exceeds the slide count', async () => {
    const wrapper = mountCarousel(
      { itemsToShow: 6, itemsToScroll: 2, snapAlign: 'start' },
      { slides: 5 }
    )
    await nextTick()

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(2)

    await step(wrapper, 'next')
    expect(wrapper.vm.currentSlide).toBe(4)

    await step(wrapper, 'prev')
    expect(wrapper.vm.currentSlide).toBe(2)
  })

  it.each(['start', 'center'])(
    'highlights the last page after paging to the end (snapAlign %s)',
    async (snapAlign) => {
      const wrapper = mountCarousel({ snapAlign }, { paginateByItemsToShow: true })
      await nextTick()

      await step(wrapper, 'next')
      await step(wrapper, 'next')

      const buttons = wrapper.findAll('.carousel__pagination-button')
      const active = buttons.filter((button) =>
        button.classes('carousel__pagination-button--active')
      )
      expect(buttons).toHaveLength(3)
      expect(active).toHaveLength(1)
      expect(buttons[2].classes()).toContain('carousel__pagination-button--active')
    }
  )

  it.each(['start', 'center'])(
    'lands the last page dot where next() lands (snapAlign %s)',
    async (snapAlign) => {
      const wrapper = mountCarousel({ snapAlign }, { paginateByItemsToShow: true })
      await nextTick()

      const buttons = wrapper.findAll('.carousel__pagination-button')
      await buttons[2].trigger('click')
      vi.advanceTimersByTime(300)
      await nextTick()

      expect(visible(wrapper)).toEqual(['6', '7', '8'])
      expect(wrapper.vm.currentSlide).toBe(8)
      expect(wrapper.find('.carousel__next').attributes('disabled')).toBeDefined()
      expect(buttons[2].classes()).toContain('carousel__pagination-button--active')
    }
  )
})
