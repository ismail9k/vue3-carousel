import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeEach } from 'vitest'

import { Carousel } from './Carousel'

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof Carousel>>

  beforeEach(async () => {
    wrapper = mount(Carousel)
  })

  it('It renders correctly', () => {
    const carousel = wrapper.find('.carousel')
    expect(carousel.exists()).toBe(true)
  })

  it('Should apply fade effect when slideEffect is set to fade', async () => {
    await wrapper.setProps({ slideEffect: 'fade' })
    const slide = wrapper.find('.carousel__slide')
    expect(slide.element.style.opacity).toBe('0')
    const activeSlide = wrapper.find('.carousel__slide--active')
    expect(activeSlide.element.style.opacity).toBe('1')
  })
})
