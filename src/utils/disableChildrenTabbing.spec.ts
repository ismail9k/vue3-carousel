import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { VNode } from 'vue'

import { disableChildrenTabbing } from './disableChildrenTabbing'

describe('disableChildrenTabbing', () => {
  let container: HTMLElement

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
  })

  it('should disable tabbing for all child elements', () => {
    const child1 = document.createElement('button')
    const child2 = document.createElement('input')
    container.appendChild(child1)
    container.appendChild(child2)

    disableChildrenTabbing({ el: container } as unknown as VNode)

    expect(child1.tabIndex).toBe(-1)
    expect(child2.tabIndex).toBe(-1)
  })

  it('should not affect elements outside the container', () => {
    const outsideChild = document.createElement('button')
    document.body.appendChild(outsideChild)

    disableChildrenTabbing({ el: container } as unknown as VNode)

    expect(outsideChild.tabIndex).not.toBe(-1)

    document.body.removeChild(outsideChild)
  })

  it('should not change tabIndex for elements that already have tabIndex -1', () => {
    const child = document.createElement('button')
    child.tabIndex = -1
    container.appendChild(child)

    disableChildrenTabbing({ el: container } as unknown as VNode)

    expect(child.tabIndex).toBe(-1)
  })
})
