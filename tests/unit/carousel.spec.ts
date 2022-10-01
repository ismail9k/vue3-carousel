import { mount } from '@vue/test-utils'

import Carousel from '@/components/Carousel'

describe('Carousel.ts', () => {
  let wrapper: any

  beforeEach(async () => {
    wrapper = mount(Carousel)
  })

  it('It renders correctly', () => {
    const carousel = wrapper.find('.carousel')
    expect(carousel.exists()).toBe(true)
  })
})
