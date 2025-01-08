import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'

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
})
