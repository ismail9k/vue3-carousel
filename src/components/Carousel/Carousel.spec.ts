import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

import { Carousel } from './Carousel'
import { Slide } from '@/components/Slide'

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof Carousel>>

  beforeEach(async () => {
    wrapper = mount(Carousel, {
      slots: {
        default: [
          mount(Slide, { props: { index: 0 } }).html(),
          mount(Slide, { props: { index: 1 } }).html(),
        ],
      },
    })
  })

  it('It renders correctly', () => {
    const carousel = wrapper.find('.carousel')
    expect(carousel.exists()).toBe(true)
  })

  it('Applies default transition easing', () => {
    const carousel = wrapper.find('.carousel')
    const style = carousel.attributes('style')
    expect(style).toContain('--vc-transition-easing')
  })

  it('Applies custom transition easing', async () => {
    await wrapper.setProps({ transitionEasing: 'ease-in-out' })
    const carousel = wrapper.find('.carousel')
    const style = carousel.attributes('style')
    expect(style).toContain('ease-in-out')
  })
})
