import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'

import { Carousel, Slide } from '@/index'

const VIEWPORT = { width: 300, height: 100 }
const HEIGHTS = [120, 200, 80, 160, 240]

// jsdom does no layout: a slide reports the height in its data-height attribute,
// every other element (root, viewport) reports VIEWPORT.
const mockRects = () =>
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: Element
  ) {
    const attr = this.getAttribute('data-height')
    const height = attr === null ? VIEWPORT.height : Number(attr)
    return {
      ...VIEWPORT,
      height,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    } as DOMRect
  })

const mountCarousel = (props: Record<string, unknown> = {}, heights = HEIGHTS) =>
  mount(Carousel, {
    props: { adaptiveHeight: true, ...props },
    slots: {
      default: () =>
        heights.map((height, i) =>
          h(Slide, { key: i, 'data-height': height }, () => `${i + 1}`)
        ),
    },
  })

describe('adaptiveHeight', () => {
  let warn: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    mockRects()
    warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  })
  afterEach(() => vi.restoreAllMocks())

  it('is off by default and exposed on the config', () => {
    const wrapper = mountCarousel({ adaptiveHeight: undefined })
    expect(wrapper.vm.data.config.adaptiveHeight).toBe(false)
    expect(mountCarousel().vm.data.config.adaptiveHeight).toBe(true)
  })

  it('warns when combined with a vertical dir', () => {
    mountCarousel({ dir: 'ttb', height: 100 })
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('adaptiveHeight'))
  })
})
