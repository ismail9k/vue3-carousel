import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, vi } from 'vitest'
import { reactive } from 'vue'

import {
  I18N_DEFAULT_CONFIG,
  injectCarousel,
  InjectedCarousel,
} from '@/index'

import { ARIA } from '../../src/components/ARIA'

describe('Aria.ts', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  const makeCarouselInject = (): Partial<InjectedCarousel> => {
    return reactive({
      config: {
        i18n: {
          ...I18N_DEFAULT_CONFIG
        },
      },
      slidesCount: 3,
      currentSlide: 1,
    })
  }

  afterEach(() => {
    consoleMock.mockReset()
  })

  it('renders properly with a carousel', async () => {
    const inject = makeCarouselInject()
    const wrapper = await mount(ARIA, { global: { provide: { [injectCarousel]: inject }} })

    expect(wrapper.html()).toContain('Item 2 of 3')
  })

  it("doesn't render without a carousel", async () => {
    const wrapper = await mount(ARIA)

    expect(consoleMock).toHaveBeenCalledOnce()
    expect(wrapper.html()).toBe('')
  })
})
