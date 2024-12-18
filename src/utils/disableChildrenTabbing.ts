import { VNode } from 'vue'

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'

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
      el.setAttribute('tabindex', '-1')
    }
  }
}
