import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeAll, vi } from 'vitest'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

import App from '../components/BasicApp.vue'
import SlottedApp from '../components/SlottedApp.vue'

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  beforeAll(async () => {
    wrapper = await mount(App, { props: { slideNum: 5 } })
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
  it('renders server side properly', async () => {
    const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    const comp = {
      render() {
        return h('div', { id: 'app' }, h(App, {
          wrapAround: true,
          modelValue: 1,
          itemsToShow: 2,
        }))
      },
    }
    const app = createSSRApp(comp)
    const html = await renderToString(app)
    document.body.innerHTML = html
    const wrapper = await mount(comp, { attachTo: '#app' })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(html).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders slotted server side properly', async () => {
    const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

    const comp = {
      render() {
        return h('div', { id: 'app' }, h(SlottedApp, {
          wrapAround: true,
          slideNum: 5,
        }))
      },
    }
    const app = createSSRApp(comp)
    const html = await renderToString(app)
    document.body.innerHTML = html
    const wrapper = await mount(comp, { attachTo: '#app' })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(html).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
