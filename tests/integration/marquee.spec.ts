import { mount } from '@vue/test-utils'
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { h } from 'vue'

import { Carousel, Slide } from '@/index'

const RECT = {
  width: 300,
  height: 100,
  top: 0,
  left: 0,
  right: 300,
  bottom: 100,
  x: 0,
  y: 0,
}

const mountCarousel = (props: Record<string, unknown> = {}, slideNum = 5) =>
  mount(Carousel, {
    props: { marquee: true, ...props },
    slots: {
      default: () =>
        Array.from({ length: slideNum }, (_, i) =>
          h(Slide, { key: i }, () => `${i + 1}`)
        ),
    },
  })

describe('marquee', () => {
  beforeAll(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      ...RECT,
      toJSON: () => RECT,
    })
  })
  afterAll(() => vi.restoreAllMocks())

  describe('props', () => {
    let warn: ReturnType<typeof vi.spyOn>
    beforeEach(() => {
      warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })
    afterEach(() => warn.mockRestore())

    it('warns when marqueeSpeed is not positive', () => {
      mountCarousel({ marqueeSpeed: 0 })
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('marqueeSpeed'))
    })

    it('warns when combined with the fade effect', () => {
      mountCarousel({ slideEffect: 'fade' })
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('fade'))
    })

    it('does not warn for a valid setup', () => {
      mountCarousel({ marqueeSpeed: 40 })
      expect(warn).not.toHaveBeenCalled()
    })
  })
})
