import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { VNode } from 'vue'

import { disableChildrenTabbing, restoreChildrenTabbing } from './disableChildrenTabbing'

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

  it('should restore tabbing it disabled', () => {
    const link = document.createElement('a')
    link.href = '#'
    container.appendChild(link)
    const node = { el: container } as unknown as VNode

    disableChildrenTabbing(node)
    expect(link.getAttribute('tabindex')).toBe('-1')
    restoreChildrenTabbing(node)
    expect(link.hasAttribute('tabindex')).toBe(false)
  })

  it('should restore an author-set tabindex', () => {
    const div = document.createElement('div')
    div.setAttribute('tabindex', '0')
    container.appendChild(div)
    const node = { el: container } as unknown as VNode

    disableChildrenTabbing(node)
    disableChildrenTabbing(node) // repeated calls must not forget the original
    expect(div.getAttribute('tabindex')).toBe('-1')
    restoreChildrenTabbing(node)
    expect(div.getAttribute('tabindex')).toBe('0')
  })

  it('should not touch an author-set tabindex of -1 when restoring', () => {
    const button = document.createElement('button')
    button.setAttribute('tabindex', '-1')
    container.appendChild(button)
    const node = { el: container } as unknown as VNode

    disableChildrenTabbing(node)
    restoreChildrenTabbing(node)
    expect(button.getAttribute('tabindex')).toBe('-1')
  })

  it('should keep an element disabled while another container still disables it', () => {
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    const link = document.createElement('a')
    link.href = '#'
    inner.appendChild(link)
    outer.appendChild(inner)
    container.appendChild(outer)
    const outerNode = { el: outer } as unknown as VNode
    const innerNode = { el: inner } as unknown as VNode

    disableChildrenTabbing(innerNode)
    disableChildrenTabbing(outerNode)
    restoreChildrenTabbing(outerNode)
    expect(link.getAttribute('tabindex')).toBe('-1')
    restoreChildrenTabbing(innerNode)
    expect(link.hasAttribute('tabindex')).toBe(false)
  })

  it('should not restore an element disabled only by a nested container', () => {
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    const link = document.createElement('a')
    link.href = '#'
    inner.appendChild(link)
    outer.appendChild(inner)
    container.appendChild(outer)

    disableChildrenTabbing({ el: inner } as unknown as VNode)
    restoreChildrenTabbing({ el: outer } as unknown as VNode)
    expect(link.getAttribute('tabindex')).toBe('-1')
  })

  it('should register an outer container on an element a nested container disabled', () => {
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    const div = document.createElement('div')
    div.setAttribute('tabindex', '0')
    inner.appendChild(div)
    outer.appendChild(inner)
    container.appendChild(outer)
    const outerNode = { el: outer } as unknown as VNode
    const innerNode = { el: inner } as unknown as VNode

    disableChildrenTabbing(innerNode)
    disableChildrenTabbing(outerNode) // div is already -1 here
    restoreChildrenTabbing(innerNode)
    expect(div.getAttribute('tabindex')).toBe('-1')
    restoreChildrenTabbing(outerNode)
    expect(div.getAttribute('tabindex')).toBe('0')
  })

  it('should disable summary, iframe, media with controls and contenteditable', () => {
    container.innerHTML = `
      <details><summary>More</summary>body</details>
      <iframe></iframe>
      <video controls></video>
      <audio controls></audio>
      <div contenteditable="true">edit</div>
      <div contenteditable="false">static</div>
      <video></video>
    `

    disableChildrenTabbing({ el: container } as unknown as VNode)

    for (const selector of [
      'summary',
      'iframe',
      'video[controls]',
      'audio[controls]',
      '[contenteditable="true"]',
    ]) {
      expect(container.querySelector(selector)!.getAttribute('tabindex')).toBe('-1')
    }
    expect(
      container.querySelector('[contenteditable="false"]')!.hasAttribute('tabindex')
    ).toBe(false)
    expect(
      container.querySelector('video:not([controls])')!.hasAttribute('tabindex')
    ).toBe(false)
  })
})
