import { expect, it, describe, beforeAll } from 'vitest'

import { mount } from '@vue/test-utils'

import App from '../components/BasicApp.vue'
import SlottedApp from '../components/SlottedApp.vue'

describe('Carousel.ts', () => {
  let wrapper: any

  beforeAll(async () => {
    wrapper = mount(App, {props: {slideNum: 5}})
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

describe('Slotted Carousel.ts', () => {
  let wrapper: any

  beforeAll(async () => {
    wrapper = mount(SlottedApp, {props: {slideNum: 3}})
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
  let wrapper: any

  beforeAll(async () => {
    wrapper = mount(App, {props: {wrapAround: true, itemsToShow: 3, slideNum: 9, modelValue: 8}})
  })

  it('It renders wrapAround correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })
})