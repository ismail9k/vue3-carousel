import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, vi } from 'vitest'
import { reactive } from 'vue'

import {
  I18N_DEFAULT_CONFIG,
  injectCarousel,
  InjectedCarousel,
  Navigation,
} from '@/index'

describe('Navigation.ts', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  const makeCarouselInject = (): Partial<InjectedCarousel> => {
    const inject = reactive({
      config: {
        itemsToShow: 1,
        itemsToScroll: 1,
        i18n: {
          ...I18N_DEFAULT_CONFIG
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
      }
    })
    return inject
  }

  afterEach(() => {
    consoleMock.mockReset()
  })

  it('renders properly with a carousel', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(Navigation, { global: { provide: { [injectCarousel]: inject }} })
    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.carousel__prev').classes()).to.contain('carousel__prev--disabled')
    expect(wrapper.find('.carousel__prev').attributes()).to.contain({'disabled': ''})
    expect(wrapper.find('.carousel__next').classes()).not.to.contain('carousel__next--disabled')
    expect(wrapper.find('.carousel__next').attributes()).not.to.contain({'disabled': ''})

    expect(wrapper.findAll('[disabled]').length).toBe(1)
    await wrapper.find('.carousel__next').trigger('click');
    expect(inject.currentSlide).toBe(1)
    expect(wrapper.findAll('[disabled]').length).toBe(0)

    await wrapper.find('.carousel__next').trigger('click');
    expect(inject.currentSlide).toBe(2)

    expect(wrapper.findAll('[disabled]').length).toBe(1)
    expect(wrapper.find('.carousel__next').attributes()).to.contain({'disabled': ''})
    expect(wrapper.find('.carousel__next').classes()).to.contain('carousel__next--disabled')

    await wrapper.find('.carousel__prev').trigger('click');
    expect(inject.currentSlide).toBe(1)
  })

  it("doesn't render without a carousel", async () => {
    const wrapper = await mount(Navigation)

    expect(consoleMock).toHaveBeenCalledOnce()
    expect(wrapper.html()).toBe('')
  })

  it('inherits attrs on buttons', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(
      Navigation,
      {
        props: { class: ['test-class', 'class-2'], 'data-test': 'foo' }, global: { provide: { [injectCarousel]: inject }} })
    expect(wrapper.find('.carousel__next').classes()).to.contain('test-class')
    expect(wrapper.find('.carousel__prev').classes()).to.contain('test-class')
    expect(wrapper.find('.carousel__prev').attributes()).to.contain({ 'data-test': 'foo' })
    expect(wrapper.find('.carousel__next').attributes()).to.contain({ 'data-test': 'foo' })
  })

  it('renders custom icons', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(Navigation, {
      global: { provide: { [injectCarousel]: inject } },
      slots: { prev: ['icon-1'], next: ['icon-2'] }
    })
    expect(wrapper.find('.carousel__prev').text()).toBe('icon-1')
    expect(wrapper.find('.carousel__next').text()).toBe('icon-2')
  })
})
