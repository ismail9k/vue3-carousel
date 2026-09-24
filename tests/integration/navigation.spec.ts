import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick, reactive } from 'vue'

import {
  Carousel,
  I18N_DEFAULT_CONFIG,
  injectCarousel,
  InjectedCarousel,
  Navigation,
  Slide,
} from '@/index'

import RefCarousel from '../components/RefCarousel.vue'

describe('Navigation.ts', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  const makeCarouselInject = (): Partial<InjectedCarousel> => {
    const inject = reactive({
      config: {
        itemsToShow: 1,
        itemsToScroll: 1,
        i18n: {
          ...I18N_DEFAULT_CONFIG,
        },
      },
      normalizedDir: 'ltr',
      slidesCount: 3,
      currentSlide: 0,
      minSlide: 0,
      maxSlide: 2,
      slides: [],
      nav: {
        // Very simplistic mock
        next: () => {
          inject.currentSlide++
        },
        prev: () => {
          inject.currentSlide--
        },
      },
    })
    return inject
  }

  afterEach(() => {
    consoleMock.mockReset()
  })

  it('renders properly with a carousel', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(Navigation, {
      global: { provide: { [injectCarousel]: inject } },
    })
    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.carousel__prev').classes()).to.contain(
      'carousel__prev--disabled'
    )
    expect(wrapper.find('.carousel__prev').attributes()).to.contain({ disabled: '' })
    expect(wrapper.find('.carousel__next').classes()).not.to.contain(
      'carousel__next--disabled'
    )
    expect(wrapper.find('.carousel__next').attributes()).not.to.contain({ disabled: '' })

    expect(wrapper.findAll('[disabled]').length).toBe(1)
    await wrapper.find('.carousel__next').trigger('click')
    expect(inject.currentSlide).toBe(1)
    expect(wrapper.findAll('[disabled]').length).toBe(0)

    await wrapper.find('.carousel__next').trigger('click')
    expect(inject.currentSlide).toBe(2)

    expect(wrapper.findAll('[disabled]').length).toBe(1)
    expect(wrapper.find('.carousel__next').attributes()).to.contain({ disabled: '' })
    expect(wrapper.find('.carousel__next').classes()).to.contain(
      'carousel__next--disabled'
    )

    await wrapper.find('.carousel__prev').trigger('click')
    expect(inject.currentSlide).toBe(1)
  })

  it("doesn't render without a carousel", async () => {
    const wrapper = await mount(Navigation)

    expect(consoleMock).toHaveBeenCalledOnce()
    expect(wrapper.html()).toBe('')
  })

  it('inherits attrs on buttons', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(Navigation, {
      props: { class: ['test-class', 'class-2'], 'data-test': 'foo' },
      global: { provide: { [injectCarousel]: inject } },
    })
    expect(wrapper.find('.carousel__next').classes()).to.contain('test-class')
    expect(wrapper.find('.carousel__prev').classes()).to.contain('test-class')
    expect(wrapper.find('.carousel__prev').attributes()).to.contain({
      'data-test': 'foo',
    })
    expect(wrapper.find('.carousel__next').attributes()).to.contain({
      'data-test': 'foo',
    })
  })

  it('renders custom icons', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(Navigation, {
      global: { provide: { [injectCarousel]: inject } },
      slots: { prev: ['icon-1'], next: ['icon-2'] },
    })
    expect(wrapper.find('.carousel__prev').text()).toBe('icon-1')
    expect(wrapper.find('.carousel__next').text()).toBe('icon-2')
  })

  it('renders with a carousel ref', async () => {
    const wrapper = await mount(RefCarousel, {})

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.find('.carousel__prev').attributes()).to.contain({ disabled: '' })
    expect(wrapper.find('.carousel__next').attributes()).to.contain({ type: 'button' })
  })

  it('calls next and prev without forwarding the click event', async () => {
    const inject = makeCarouselInject()
    const next = vi.spyOn(inject.nav!, 'next')
    const prev = vi.spyOn(inject.nav!, 'prev')
    const wrapper = await mount(Navigation, {
      global: { provide: { [injectCarousel]: inject } },
    })

    await wrapper.find('.carousel__next').trigger('click')
    expect(next).toHaveBeenCalledWith()

    await wrapper.find('.carousel__prev').trigger('click')
    expect(prev).toHaveBeenCalledWith()
  })

  it('ignores a second click while the carousel is still sliding', async () => {
    vi.useFakeTimers()
    const wrapper = mount(Carousel, {
      props: { wrapAround: true, transition: 300 },
      slots: {
        default: () =>
          [0, 1, 2, 3, 4].map((i) => h(Slide, { key: i }, () => `slide ${i}`)),
        addons: () => h(Navigation),
      },
    })
    await nextTick()
    const prev = wrapper.find('.carousel__prev')

    await prev.trigger('click')
    expect(wrapper.find('.carousel').attributes('style')).toContain(
      '--vc-transition-duration: 300ms'
    )

    await prev.trigger('click')
    expect(wrapper.emitted('slide-start')).toHaveLength(1)

    vi.runAllTimers()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([[4]])
    expect(wrapper.emitted('slide-end')).toHaveLength(1)
    expect(wrapper.find('.carousel').attributes('style')).not.toContain(
      '--vc-transition-duration'
    )

    vi.useRealTimers()
    wrapper.unmount()
  })
})
