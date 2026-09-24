import { VNode } from 'vue'

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'

// tabindex each element had before disableChildrenTabbing changed it (null = none)
const originalTabindex = new WeakMap<HTMLElement, string | null>()

/**
 * Disables keyboard tab navigation for all focusable child elements
 * @param node Vue virtual node containing the elements to disable
 */
export function disableChildrenTabbing(node: VNode) {
  if (!node.el || !(node.el instanceof Element)) {
    return
  }

  const elements = node.el.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR)

  for (const el of elements) {
    if (
      el instanceof HTMLElement &&
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true'
    ) {
      if (!originalTabindex.has(el)) {
        originalTabindex.set(el, el.getAttribute('tabindex'))
      }
      el.setAttribute('tabindex', '-1')
    }
  }
}

/**
 * Restores the tabindex of child elements changed by disableChildrenTabbing
 * @param node Vue virtual node containing the elements to restore
 */
export function restoreChildrenTabbing(node: VNode) {
  if (!node.el || !(node.el instanceof Element)) {
    return
  }

  const elements = node.el.querySelectorAll('[tabindex="-1"]')

  for (const el of elements) {
    if (!(el instanceof HTMLElement) || !originalTabindex.has(el)) {
      continue
    }
    const original = originalTabindex.get(el)
    if (original === null) {
      el.removeAttribute('tabindex')
    } else {
      el.setAttribute('tabindex', original as string)
    }
    originalTabindex.delete(el)
  }
}
