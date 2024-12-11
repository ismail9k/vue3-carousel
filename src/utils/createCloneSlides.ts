import { cloneVNode, ComponentInternalInstance, h } from 'vue'

import { Slide } from '@/components/Slide'

type CreateCloneSlidesArgs = {
  slides: Array<ComponentInternalInstance>
  position: 'before' | 'after'
  toShow: number
}

export function createCloneSlides({ slides, position, toShow }: CreateCloneSlidesArgs) {
  const clones = []
  const isBefore = position === 'before'
  const start = isBefore ? -toShow : 0
  const end = isBefore ? 0 : toShow

  for (let i = start; i < end; i++) {
    const index = isBefore ? i : slides.length > 0 ? i + slides.length : i + 99999
    const props = {
      index,
      isClone: true,
      id: undefined, // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${position}-${i}`,
    }
    clones.push(
      slides.length > 0
        ? cloneVNode(slides[(i % slides.length + slides.length) % slides.length].vnode, props)
        : h(Slide, props)
    )
  }

  return clones
}
