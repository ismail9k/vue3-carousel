import { cloneVNode, ComponentInternalInstance, VNode } from 'vue'

type CreateCloneSlidesArgs = {
  slides: Array<ComponentInternalInstance>
  position: 'before' | 'after'
  toShow: number
}

export function createCloneSlides({ slides, position, toShow }: CreateCloneSlidesArgs) {
  const clones: VNode[] = []
  const isBefore = position === 'before'
  const start = isBefore ? -toShow : 0
  const end = isBefore ? 0 : toShow

  if (slides.length <= 0) {
    return clones
  }

  for (let i = start; i < end; i++) {
    const index = isBefore ? i : i + slides.length
    const props = {
      index,
      isClone: true,
      id: undefined, // Make sure we don't duplicate the id which would be invalid html
      key: `clone-${position}-${i}`,
    }
    const vnode = slides[((i % slides.length) + slides.length) % slides.length].vnode
    const clone = cloneVNode(vnode, props)
    clone.el = null
    clones.push(clone)
  }

  return clones
}
