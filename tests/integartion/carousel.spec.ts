import { mount } from '@vue/test-utils'

import App from './App'

describe('Carousel.ts', () => {
  let wrapper: any

  beforeAll(async () => {
    wrapper = mount(App)
    console.log(wrapper.html())
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
})
