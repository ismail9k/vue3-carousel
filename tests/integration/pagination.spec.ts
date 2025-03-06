import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, vi } from 'vitest'
import { reactive } from 'vue'

import {
  I18N_DEFAULT_CONFIG,
  injectCarousel,
  InjectedCarousel,
  Pagination,
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
      activeSlide: 0,
      minSlide: 0,
      maxSlide: 2,
      slides: [],
      nav: {
        // Very simplistic mock
        slideTo: (slide) => {
          inject.currentSlide = slide
          inject.activeSlide = slide
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
    const wrapper = await mount(Pagination, {
      global: { provide: { [injectCarousel]: inject } },
    })
    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()

    expect(wrapper.findAll('.carousel__pagination-item').length).toBe(3)
    const buttons = wrapper.findAll('button')
    expect(wrapper.findAll('.carousel__pagination-button--active').length).toBe(1)
    expect(buttons[0].classes()).to.contain('carousel__pagination-button--active')

    await buttons[1].trigger('click')

    expect(inject.activeSlide).toBe(1)

    expect(wrapper.findAll('.carousel__pagination-button--active').length).toBe(1)
    expect(buttons[1].classes()).to.contain('carousel__pagination-button--active')

    await buttons[2].trigger('click')

    expect(inject.activeSlide).toBe(2)

    expect(wrapper.findAll('.carousel__pagination-button--active').length).toBe(1)
    expect(buttons[2].classes()).to.contain('carousel__pagination-button--active')

    await wrapper.setProps({ disableOnClick: true })

    await buttons[0].trigger('click')
    // Shouldn't have changed
    expect(inject.activeSlide).toBe(2)
    expect(buttons[0].attributes()).to.contain({ disabled: '' })
  })

  it("doesn't render without a carousel", async () => {
    const wrapper = await mount(Pagination)

    expect(consoleMock).toHaveBeenCalledOnce()
    expect(wrapper.html()).toBe('')
  })

  it('renders with a carousel ref', async () => {
    const wrapper = await mount(RefCarousel, {})

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.findAll('.carousel__pagination-item').length).toBe(5)
  })
})
