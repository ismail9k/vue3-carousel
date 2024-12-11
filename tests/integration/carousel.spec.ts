import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeAll, vi, afterEach, beforeEach } from 'vitest'
import { Component, createSSRApp, h, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'

import App from '../components/BasicApp.vue'
import SlottedApp from '../components/SlottedApp.vue'

import type { ComponentProps } from 'vue-component-type-helpers'

describe('Carousel.ts', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  beforeEach(async () => {
    wrapper = await mount(App, {
      props: {
        slideNum: 5,
        modelValue: 0,
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    })
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

  it('Should navigate to the focused slide', async () => {
    const slide = wrapper.find('.carousel__slide:nth-child(4)')
    await slide.trigger('focusin')
    expect(wrapper.props('modelValue')).toBe(3)
  })

  it('Should navigate the carousel with arrow keys', async () => {
    let time = 1
    // Avoid throttling
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      time += 200
      cb(time)
    })
    const track = wrapper.find('[tabindex="0"]')
    const triggerKeyEvent = async (key = 'ArrowRight', ctrl = false) => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: key, ctrlKey: ctrl }))
      await nextTick()
    }
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(0)
    await track.trigger('focus')
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent()
    expect(wrapper.props('modelValue')).toBe(2)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight', true)
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(1)
    await wrapper.setProps({dir: 'ttb'})
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(2)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await wrapper.setProps({dir: 'btt'})
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(0)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await wrapper.setProps({dir: 'rtl'})
    await triggerKeyEvent('ArrowDown')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowUp')
    expect(wrapper.props('modelValue')).toBe(1)
    await triggerKeyEvent('ArrowRight')
    expect(wrapper.props('modelValue')).toBe(0)
    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)

    await track.trigger('blur')

    await triggerKeyEvent('ArrowLeft')
    expect(wrapper.props('modelValue')).toBe(1)
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

  const renderSSR = async <T extends Component, P extends ComponentProps<T>>(
    component: T,
    props: P = {}
  ) => {
    const comp = {
      render() {
        return h('div', { id: 'app' }, h(component, props))
      },
    }
    // Simulate a SSR env where there is no window or document
    const windowBackup = window
    const documentBackup = document
    Object.defineProperty(global, 'window', {
      value: undefined,
      enumerable: true,
      writable: false,
    })
    const app = createSSRApp(comp)
    const html = await renderToString(app)

    Object.defineProperty(global, 'window', {
      value: windowBackup,
      enumerable: true,
      writable: false,
    })
    Object.defineProperty(global, 'document', {
      value: documentBackup,
      enumerable: true,
      writable: false,
    })
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

  it("doesn't get hydration mismatch with breakpoints", async () => {
    const [html, wrapper] = await renderSSR(App, {
      wrapAround: true,
      breakpoints: {
        600: {
          itemsToShow: 3,
        },
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
