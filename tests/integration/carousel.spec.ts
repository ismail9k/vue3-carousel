import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeAll, vi, afterEach } from 'vitest'
import { Component, createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'

import ExampleActiveClasses from '../../docs/examples/ExampleActiveClasses.vue'
import ExampleBreakpoints from '../../docs/examples/ExampleActiveClasses.vue'
import App from '../components/BasicApp.vue'
import SlottedApp from '../components/SlottedApp.vue'

import type { ComponentProps } from 'vue-component-type-helpers'

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
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  afterEach(() => {
    consoleMock.mockReset()
  })

  const renderSSR = async<T extends Component, P extends ComponentProps<T>>(component: T, props: P = {}) => {
    const comp = {
      render() {
        return h('div', { id: 'app' }, h(component, props))
      },
    }
    // Simulate a SSR env where there is no window or document
    const windowBackup = window
    const documentBackup = document
    Object.defineProperty(global, 'window', { value: undefined, enumerable: true, writable: false })
    const app = createSSRApp(comp)
    const html = await renderToString(app)

    Object.defineProperty(global, 'window', { value: windowBackup, enumerable: true, writable: false })
    Object.defineProperty(global, 'document', { value: documentBackup, enumerable: true, writable: false })
    Object.defineProperty(global.window, 'innerWidth', { value: 700 })
    document.body.innerHTML = html
    const wrapper = await mount(comp, { attachTo: '#app' })
    return [html, wrapper]
  }

  it('renders server side properly', async () => {
    const [html, wrapper] = await renderSSR(App, {
      wrapAround: true,
      modelValue: 1,
      itemsToShow: 2,
    })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(html).toMatchSnapshot()
  })

  it('renders slotted server side properly', async () => {
    const [html, wrapper] = await renderSSR(SlottedApp, {
      wrapAround: true,
      slideNum: 5,
    })

    expect(consoleMock).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
    expect(html).toMatchSnapshot()
  })

  it('doesn\'t get hydration mismatch with breakpoints', async () => {
    const [html, wrapper] = await renderSSR(App, {
      wrapAround: true,
      breakpoints: {
        600: {
          itemsToShow: 3
        }
      },
      modelValue: 1,
      itemsToShow: 1,
    })
    expect(consoleMock).not.toHaveBeenCalled()

    const slides = wrapper.findAll('.carousel__slide--visible')
    expect(slides.length).toBe(3)

    const el = document.createElement('div')
    el.innerHTML = html
    const slidesSSR = el.querySelectorAll('.carousel__slide--visible')
    expect(slidesSSR.length).toBe(1)
  })
})
