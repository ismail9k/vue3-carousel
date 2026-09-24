import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { h, ref } from 'vue'

import { Carousel, Navigation, Pagination, Slide } from '@/index'

const mountAll = (props: Record<string, unknown> = {}) =>
  mount(
    {
      setup() {
        const carousel = ref()
        return () => [
          h(
            Carousel,
            { ref: carousel, classPrefix: 'vc', ...props },
            {
              default: () =>
                Array.from({ length: 3 }, (_, i) =>
                  h(Slide, { key: i }, () => `${i + 1}`)
                ),
              addons: () => [h(Navigation), h(Pagination)],
            }
          ),
          carousel.value ? h(Navigation, { carousel: carousel.value }) : null,
        ]
      },
    },
    { attachTo: document.body }
  )

describe('classPrefix', () => {
  it('prefixes every rendered class', async () => {
    const wrapper = mountAll()
    await wrapper.vm.$nextTick()
    for (const selector of [
      '.vc',
      '.vc__viewport',
      '.vc__track',
      '.vc__slide',
      '.vc__slide--active',
      '.vc__prev',
      '.vc__next',
      '.vc__icon',
      '.vc__pagination',
      '.vc__pagination-item',
      '.vc__pagination-button',
      '.vc__pagination-button--active',
      '.vc__liveregion',
      '.vc__sr-only',
    ]) {
      expect(wrapper.find(selector).exists(), selector).toBe(true)
    }
    expect(wrapper.html()).not.toMatch(/class="[^"]*\bcarousel/)
    wrapper.unmount()
  })

  it('prefixes the disabled navigation modifier', async () => {
    const wrapper = mountAll()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.vc__prev').classes()).toContain('vc__prev--disabled')
    wrapper.unmount()
  })

  it('prefixes cloned slides when wrapping around', async () => {
    const wrapper = mountAll({ wrapAround: true })
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.vc__slide--clone').exists()).toBe(true)
    wrapper.unmount()
  })

  it('prefixes a standalone navigation bound through the carousel prop', async () => {
    const wrapper = mountAll()
    await wrapper.vm.$nextTick()
    await wrapper.vm.$forceUpdate()
    await wrapper.vm.$nextTick()
    expect(wrapper.findAll('.vc__prev').length).toBe(2)
    wrapper.unmount()
  })
})
