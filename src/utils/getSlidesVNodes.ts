import { Fragment, VNode } from 'vue'

export function getSlidesVNodes(vNode?: any[]): Array<VNode> {
  if (!vNode) return []

  return vNode.reduce((acc, node) => {
    if (node.type === Fragment) {
      return [...acc, ...getSlidesVNodes(node.children)]
    }

    if (node.type?.name === 'CarouselSlide') {
      return [...acc, node]
    }

    return acc
  }, [])
}
