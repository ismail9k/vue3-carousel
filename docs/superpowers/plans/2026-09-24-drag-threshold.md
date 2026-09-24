# Drag threshold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make drag/swipe slide changes use the final pointer position so `threshold` behaves on short swipes.

**Architecture:** `useDrag` records the latest pointer position unthrottled, the throttled handler applies it, and drag end flushes it synchronously before `onDragEnd`. Integration tests in `tests/integration/drag.spec.ts`. Docs default corrected.

**Tech Stack:** Vue 3, TypeScript, Vitest + jsdom, Vue Test Utils.

**Spec:** docs/superpowers/specs/2026-09-24-drag-threshold-design.md
Intent-Issue: #502 — https://github.com/ismail9k/vue3-carousel/issues/502

## Global Constraints

- Only `src/composables/useDrag.ts`, `tests/integration/drag.spec.ts`, `docs/config.md` change.
- `src/utils/throttle.ts` is unchanged.
- No public API change; `useDrag` still returns `{ dragged, isDragging, handleDragStart }`.
- Prettier style: no semicolons, single quotes, 90 cols. Run `pnpm prettier:fix` on touched files.
- Commit messages short, no Co-Authored-By or attribution lines. Pre-commit hook runs lint+test+build: use a 600000 ms timeout.

## Review Focus

- Release with no move at all: `onDrag` must not be called, `onDragEnd` still called. Covered by test 5 below.
- Pinch (2 touches) moves must still be ignored. Existing guard kept; not separately tested.
- Mouse click suppression after >10px drag must still use the final distance (it now does, since flush precedes it).

---

### Task 1: Flush the last drag sample on release

**Files:**
- Modify: `src/composables/useDrag.ts`
- Modify: `docs/config.md` (Drag Options table: `threshold` default `0.3` -> `0.08`)
- Test: `tests/integration/drag.spec.ts` (already exists with 2 tests; extend)

**Interfaces:** none (single task).

- [ ] **Step 1: Extend the failing tests**

Replace `tests/integration/drag.spec.ts` with:

```ts
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { h, nextTick } from 'vue'

import { Carousel, Slide } from '@/index'

const RECT = { width: 300, height: 100, top: 0, left: 0, right: 300, bottom: 100, x: 0, y: 0 }

const mountCarousel = (props: Record<string, unknown> = {}) =>
  mount(Carousel, {
    props: { modelValue: 0, ...props },
    slots: {
      default: () =>
        Array.from({ length: 5 }, (_, i) => h(Slide, { key: i }, () => `${i + 1}`)),
    },
  })

const touchEvent = (type: string, clientX: number) => {
  const event = new Event(type, { bubbles: true, cancelable: true })
  const touch = { clientX, clientY: 0 }
  Object.defineProperty(event, 'touches', { value: type === 'touchend' ? [] : [touch] })
  Object.defineProperty(event, 'changedTouches', { value: [touch] })
  return event
}

const flushFrame = () => new Promise((resolve) => requestAnimationFrame(resolve))

const emittedIndex = (wrapper: ReturnType<typeof mountCarousel>) =>
  wrapper.emitted('update:modelValue')?.[0]

describe('drag threshold', () => {
  beforeEach(() => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({
      ...RECT,
      toJSON: () => RECT,
    })
  })
  afterEach(() => vi.restoreAllMocks())

  it('honors touchDrag.threshold when the move is processed', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px = 0.133 of 300
    await flushFrame()
    await nextTick()
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('uses the last touchmove when touchend lands in the same frame', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 190)) // 10px, below threshold
    await flushFrame()
    await nextTick()
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px, not yet flushed
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('applies the latest of several touchmoves inside one frame', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchmove', 190)) // 10px, below threshold
    document.dispatchEvent(touchEvent('touchmove', 160)) // 40px, same frame
    await flushFrame()
    await nextTick()
    expect(
      (wrapper.find('.carousel__track').element as HTMLElement).style.transform
    ).toBe('translateX(-40px)')
    document.dispatchEvent(touchEvent('touchend', 160))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('uses the last mousemove when mouseup lands in the same frame', async () => {
    const wrapper = mountCarousel({ mouseDrag: { threshold: 0.1 } })
    await wrapper.find('.carousel__track').trigger('mousedown', { clientX: 200, button: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 190 }))
    await flushFrame()
    await nextTick()
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 160 }))
    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    expect(emittedIndex(wrapper)).toEqual([1])
  })

  it('does not slide on a release without any move', async () => {
    const wrapper = mountCarousel({ touchDrag: { threshold: 0.1 } })
    wrapper.find('.carousel__track').element.dispatchEvent(touchEvent('touchstart', 200))
    document.dispatchEvent(touchEvent('touchend', 200))
    await nextTick()
    expect(emittedIndex(wrapper)).toBeUndefined()
  })
})
```

- [ ] **Step 2: Run, expect tests 2-4 to fail**

Run: `pnpm vitest run tests/integration/drag.spec.ts`
Expected: 3 failed (last-sample tests), 2 passed.

- [ ] **Step 3: Implement in `src/composables/useDrag.ts`**

Replace `handleDrag`/`handleDragEnd` so that:

```ts
  const lastPosition = { x: 0, y: 0 }

  const getPosition = (event: TouchEvent | MouseEvent) => {
    const source = isTouch ? (event as TouchEvent).touches[0] : (event as MouseEvent)
    return { x: source.clientX, y: source.clientY }
  }

  const applyDrag = (): void => {
    isDragging.value = true
    dragged.x = lastPosition.x - startPosition.x
    dragged.y = lastPosition.y - startPosition.y
    options.onDrag?.({ deltaX: dragged.x, deltaY: dragged.y, isTouch })
  }

  const throttledApplyDrag = throttle(applyDrag)

  const handleDrag = (event: TouchEvent | MouseEvent): void => {
    if (isTouch && (event as TouchEvent).touches.length > 1) {
      return
    }
    const { x, y } = getPosition(event)
    lastPosition.x = x
    lastPosition.y = y
    hasMoved = true
    throttledApplyDrag()
  }

  const handleDragEnd = (): void => {
    throttledApplyDrag.cancel()
    if (hasMoved) {
      applyDrag()
    }
    // ...existing click-suppression, onDragEnd, reset, listener removal...
  }
```

with `let hasMoved = false` declared beside `isTouch`, reset to `false` in
`handleDragStart` (after the early returns) and in `handleDragEnd` after the
reset. `startPosition` assignment in `handleDragStart` may use `getPosition`.
Listener removal must reference `handleDrag` (the unthrottled function).

- [ ] **Step 4: Fix the doc default**

In `docs/config.md` Drag Options table change `| \`threshold\` | \`number\` | 0.3 |` to `0.08`.

- [ ] **Step 5: Run tests, lint, typecheck**

Run: `pnpm vitest run tests/integration/drag.spec.ts tests/integration src/composables` then `pnpm lint` and `pnpm typecheck`.
Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/composables/useDrag.ts tests/integration/drag.spec.ts docs/config.md
git commit -m "fix: apply the last drag sample on release so threshold works on short swipes"
```
(timeout 600000 ms; hook runs lint, test, build)
