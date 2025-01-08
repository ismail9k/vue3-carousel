import { describe, expect, it } from 'vitest'
import { h, ComponentInternalInstance } from 'vue'

import { createCloneSlides } from './createCloneSlides'

function createMockSlide(index: number): ComponentInternalInstance {
  return {
    vnode: h('div', { key: index }, `Slide ${index}`),
    // ...other properties...
  } as ComponentInternalInstance
}

describe('createCloneSlides', () => {
  it('should clone slides correctly after', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    const clones = createCloneSlides({ slides, position: 'after', toShow: 1 })
    expect(clones[0].key).toBe('clone-after-0')
  })

  it('should clone slides correctly before', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    const clones = createCloneSlides({ slides, position: 'before', toShow: 1 })
    expect(clones[0].key).toBe('clone-before--1')
  })

  it('should create the correct number of clones after', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    const clones = createCloneSlides({ slides, position: 'after', toShow: 2 })
    expect(clones.length).toBe(2)
  })

  it('should create the correct number of clones before', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    const clones = createCloneSlides({ slides, position: 'before', toShow: 2 })
    expect(clones.length).toBe(2)
  })

  it('should handle empty slides array', () => {
    const slides: ComponentInternalInstance[] = []
    const clones = createCloneSlides({ slides, position: 'before', toShow: 2 })
    expect(clones.length).toBe(0)
  })

  it('should handle zero clones', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    const clones = createCloneSlides({ slides, position: 'before', toShow: 0 })
    expect(clones.length).toBe(0)
  })
})
