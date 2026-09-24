# Guard drag against a zero-sized carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A drag on a carousel whose `effectiveSlideSize` is `0` is ignored, and a non-finite clone count can never hang the page.

**Architecture:** Two guards in pure utilities: `getDraggedSlidesCount` returns `0` when the slide size or the drag ratio is not a positive finite number; `createCloneSlides` returns no clones for a non-finite `toShow`. One integration test reproduces the issue end to end (vertical `wrapAround` carousel in jsdom, where every rect is 0).

**Tech Stack:** Vue 3, TypeScript, Vitest + jsdom, Vue Test Utils.

**Spec:** `docs/superpowers/specs/2026-09-24-518-infinite-clones-design.md`
Intent-Issue: #518 — https://github.com/ismail9k/vue3-carousel/issues/518

## Global Constraints

- Formatting is Prettier-owned: no semicolons, single quotes, 90 columns. Do NOT run `pnpm prettier:fix` (39 files are already unformatted on master and it would reformat them all). `src/utils/getDraggedSlidesCount.ts` and its spec are among them: write new code in Prettier style there but leave the existing lines as they are. For the other files run `pnpm exec prettier --check <file>`.
- `pnpm lint` must pass (ESLint `import/order`).
- Fast test runs use `pnpm vitest run <path>`; the pre-commit hook runs `pnpm lint`, `pnpm test`, `pnpm build` (give commits a long timeout, never bypass).
- No `Co-Authored-By` or attribution lines in commits. Short commit messages.
- Do not touch `Carousel.ts`, CHANGELOG, or unrelated code.

## Review Focus

- `effectiveSlideSize` negative (cannot happen from `Carousel.ts` maths, but the utility is public): expected `0`, pinned in Task 1.
- Drag value `Infinity` (a `scale(0)` ancestor gives an infinite multiplier): expected `0`, pinned in Task 1.
- `effectiveSlideSize` `NaN`: expected `0`, pinned in Task 1.
- `toShow` `NaN` or negative for `createCloneSlides`: expected `[]`, pinned in Task 2.
- A normal sized drag must still move slides: the existing `getDraggedSlidesCount` and scaled-ancestor integration tests cover it; Task 3 runs the full carousel integration file.

---

### Task 1: Ignore drags when the slide size is not a positive finite number

**Files:**
- Modify: `src/utils/getDraggedSlidesCount.ts`
- Test: `src/utils/getDraggedSlidesCount.spec.ts`

**Interfaces:**
- Produces: `getDraggedSlidesCount(params: DragParams): number` unchanged signature; returns `0` when `params.effectiveSlideSize <= 0`, is `NaN`/`Infinity`, or when the drag ratio is not finite.

- [ ] **Step 1: Write the failing tests** (append inside the existing `describe`)

```ts
  describe('carousel with no measurable size (#518)', () => {
    it('returns 0 when the effective slide size is 0 instead of Infinity', () => {
      const params = {
        isVertical: true,
        isReversed: false,
        dragged: { x: 0, y: 150 },
        effectiveSlideSize: 0,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })

    it('returns 0 for a horizontal, reversed drag with a slide size of 0', () => {
      const params = {
        isVertical: false,
        isReversed: true,
        dragged: { x: -150, y: 0 },
        effectiveSlideSize: 0,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })

    it('returns 0 for a negative or non-finite slide size', () => {
      const base = {
        isVertical: false,
        isReversed: false,
        dragged: { x: 150, y: 0 },
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: -100 })).toBe(0)
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: NaN })).toBe(0)
      expect(getDraggedSlidesCount({ ...base, effectiveSlideSize: Infinity })).toBe(0)
    })

    it('returns 0 for a non-finite drag distance', () => {
      const params = {
        isVertical: false,
        isReversed: false,
        dragged: { x: Infinity, y: 0 },
        effectiveSlideSize: 100,
        threshold: 0.5,
      }
      expect(getDraggedSlidesCount(params)).toBe(0)
    })
  })
```

- [ ] **Step 2: Run to verify they fail**

Run: `pnpm vitest run src/utils/getDraggedSlidesCount.spec.ts`
Expected: the four new tests FAIL (`expected -Infinity to be +0`, `expected Infinity to be +0`, `expected NaN to be +0`, ...). The existing tests pass.

- [ ] **Step 3: Implement the guard**

Replace the body after `if (dragValue === 0) return 0` with:

```ts
  // A carousel with no measurable size cannot map a drag to slides (#518):
  // dividing by 0 would make the count Infinity and, with wrapAround, the
  // clone count with it
  if (!Number.isFinite(effectiveSlideSize) || effectiveSlideSize <= 0) return 0

  const dragRatio = dragValue / effectiveSlideSize
  const absRatio = Math.abs(dragRatio)

  // If not finite or below the threshold, consider it no movement
  if (!Number.isFinite(dragRatio) || absRatio < threshold) return 0
```

Keep the rest (`slidesDragged`, the `isReversed` return) as is.

- [ ] **Step 4: Run to verify they pass**

Run: `pnpm vitest run src/utils/getDraggedSlidesCount.spec.ts`
Expected: all PASS.

- [ ] **Step 5: Lint, commit**

```bash
pnpm lint
git add src/utils/getDraggedSlidesCount.ts src/utils/getDraggedSlidesCount.spec.ts
git commit -m "fix: ignore drags when the slide size is not a positive finite number (#518)"
```

(The hook runs lint, full tests, and build; use a 600000 ms timeout.)

---

### Task 2: Never build a non-finite number of clones

**Files:**
- Modify: `src/utils/createCloneSlides.ts`
- Test: `src/utils/createCloneSlides.spec.ts`

**Interfaces:**
- Produces: `createCloneSlides({ slides, position, toShow })` unchanged signature; returns `[]` when `toShow` is not a finite number greater than `0`.

- [ ] **Step 1: Write the failing tests** (append inside the existing `describe`)

```ts
  it('returns no clones for a non-finite toShow instead of looping forever (#518)', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    expect(createCloneSlides({ slides, position: 'after', toShow: Infinity })).toEqual([])
    expect(createCloneSlides({ slides, position: 'before', toShow: Infinity })).toEqual([])
    expect(createCloneSlides({ slides, position: 'after', toShow: NaN })).toEqual([])
  })

  it('returns no clones for a negative toShow', () => {
    const slides = [createMockSlide(1), createMockSlide(2), createMockSlide(3)]
    expect(createCloneSlides({ slides, position: 'after', toShow: -2 })).toEqual([])
    expect(createCloneSlides({ slides, position: 'before', toShow: -2 })).toEqual([])
  })
```

- [ ] **Step 2: Run to verify they fail**

Run: `pnpm vitest run src/utils/createCloneSlides.spec.ts -t 'non-finite'`
Expected: this test does not finish (the `for` loop never ends) or fails out of memory. Do not run it without the `-t` filter and stop it (Ctrl-C / timeout) once the hang is observed; a 20 s `timeout` around the command is enough. The negative test already passes (the loop body never runs) and stays as a pin.

- [ ] **Step 3: Implement the guard**

Change the early return to:

```ts
  if (slides.length <= 0 || !Number.isFinite(toShow) || toShow <= 0) {
    return clones
  }
```

- [ ] **Step 4: Run to verify they pass**

Run: `pnpm vitest run src/utils/createCloneSlides.spec.ts`
Expected: all PASS, including the two new tests.

- [ ] **Step 5: Format, lint, commit**

```bash
pnpm exec prettier --check src/utils/createCloneSlides.ts src/utils/createCloneSlides.spec.ts
pnpm lint
git add src/utils/createCloneSlides.ts src/utils/createCloneSlides.spec.ts
git commit -m "fix: never build a non-finite number of clone slides (#518)"
```

---

### Task 3: Integration regression test for the vertical wrapAround drag

**Files:**
- Test: `tests/integration/carousel.spec.ts` (append a new top-level `describe`)

**Interfaces:**
- Consumes: Tasks 1 and 2 guards. `App` (`tests/components/BasicApp.vue`) accepts `dir`, `wrapAround`, `slideNum`, `modelValue`.

- [ ] **Step 1: Write the test** (append at the end of the file; `mount`, `nextTick`, `vi`, `App` are already imported)

```ts
describe('Drag on a carousel with no measurable size (#518)', () => {
  let wrapper: ReturnType<typeof mount<typeof App>>

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.useRealTimers()
  })

  it('ignores a vertical wrapAround drag instead of creating infinite clones', async () => {
    // jsdom lays nothing out: every rect is 0, so slideSize and gap are both 0
    wrapper = mount(App, {
      props: {
        dir: 'ttb',
        wrapAround: true,
        slideNum: 5,
        modelValue: 0,
        'onUpdate:modelValue': (e: number) => wrapper.setProps({ modelValue: e }),
      },
    })
    await nextTick()
    const clonesBefore = wrapper.findAll('.carousel__slide--clone').length
    expect(clonesBefore).toBeGreaterThan(0)

    const track = wrapper.find('.carousel__track')
    await track.trigger('mousedown', { clientX: 0, clientY: 200, button: 0 })
    document.dispatchEvent(new MouseEvent('mousemove', { clientX: 0, clientY: 100 }))
    vi.runAllTimers() // flush the throttled drag handler
    await nextTick()

    expect(wrapper.findAll('.carousel__slide--clone').length).toBe(clonesBefore)

    document.dispatchEvent(new MouseEvent('mouseup'))
    await nextTick()
    vi.runAllTimers() // any slide transition
    await nextTick()

    expect(wrapper.props('modelValue')).toBe(0)
    expect(wrapper.findAll('.carousel__slide--clone').length).toBe(clonesBefore)
  })
})
```

- [ ] **Step 2: Run the test**

Run: `pnpm vitest run tests/integration/carousel.spec.ts -t '#518'`
Expected: PASS. (Without Tasks 1 and 2 this test hangs in the clone loop; that is why the red state is pinned by the unit tests, not here. Optionally confirm by stashing the two fixes with `git stash` and running the same command under `timeout 30`, then `git stash pop`.)

- [ ] **Step 3: Run the whole integration file and utils**

Run: `pnpm vitest run tests/integration/carousel.spec.ts src/utils`
Expected: all PASS.

- [ ] **Step 4: Format, lint, commit**

```bash
pnpm exec prettier --check tests/integration/carousel.spec.ts
pnpm lint
git add tests/integration/carousel.spec.ts
git commit -m "test: cover vertical wrapAround drag with a zero-sized carousel (#518)"
```
