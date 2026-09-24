import { VNode } from 'vue'

const FOCUSABLE_ELEMENTS_SELECTOR =
  'a[href], area[href], button, input, textarea, select, summary, iframe, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])'

type TabbingState = {
  // tabindex the element had before it was first disabled (null = none)
  original: string | null
  // containers currently disabling the element; nested carousels can overlap
  owners: Set<Element>
}

const tabbingState = new WeakMap<HTMLElement, TabbingState>()

/**
 * Disables keyboard tab navigation for all focusable child elements
 * @param node Vue virtual node containing the elements to disable
 */
export function disableChildrenTabbing(node: VNode) {
  const owner = node.el
  if (!owner || !(owner instanceof Element)) {
    return
  }

  // Also visit tabindex="-1" elements: one a nested container already disabled
  // no longer matches [tabindex]:not([tabindex="-1"]) but still needs this owner
  const elements = owner.querySelectorAll(
    `${FOCUSABLE_ELEMENTS_SELECTOR}, [tabindex="-1"]`
  )

  for (const el of elements) {
    if (!(el instanceof HTMLElement)) {
      continue
    }
    let state = tabbingState.get(el)
    if (!state) {
      if (
        !el.matches(FOCUSABLE_ELEMENTS_SELECTOR) ||
        el.hasAttribute('disabled') ||
        el.getAttribute('aria-hidden') === 'true'
      ) {
        continue
      }
      state = { original: el.getAttribute('tabindex'), owners: new Set() }
      tabbingState.set(el, state)
    }
    state.owners.add(owner)
    el.setAttribute('tabindex', '-1')
  }
}

/**
 * Restores the tabindex of child elements changed by disableChildrenTabbing,
 * once no other container still disables them
 * @param node Vue virtual node containing the elements to restore
 */
export function restoreChildrenTabbing(node: VNode) {
  const owner = node.el
  if (!owner || !(owner instanceof Element)) {
    return
  }

  const elements = owner.querySelectorAll('[tabindex="-1"]')

  for (const el of elements) {
    if (!(el instanceof HTMLElement)) {
      continue
    }
    const state = tabbingState.get(el)
    if (!state) {
      continue
    }
    state.owners.delete(owner)
    if (state.owners.size > 0) {
      continue
    }
    if (state.original === null) {
      el.removeAttribute('tabindex')
    } else {
      el.setAttribute('tabindex', state.original)
    }
    tabbingState.delete(el)
  }
}
