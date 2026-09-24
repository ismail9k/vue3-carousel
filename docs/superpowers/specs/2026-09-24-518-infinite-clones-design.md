# Guard drag against a zero-sized carousel (wrapAround infinite clones)

Intent-Issue: #518 — https://github.com/ismail9k/vue3-carousel/issues/518

## Problem

A vertical carousel with no measurable height (or any carousel measured at 0,
e.g. before layout) has `slideSize = 0`; with the default `gap = 0`,
`effectiveSlideSize` is `0`. `getDraggedSlidesCount` divides the drag distance
by it, so `Math.round(±Infinity)` becomes the dragged-slides count and
`activeSlideIndex = currentSlideIndex ± Infinity`. With `wrapAround` nothing
clamps it, `clonedSlidesCount.after` becomes `Infinity`, and
`createCloneSlides` loops until the page runs out of memory.

## Design

Two small guards, no behaviour change for sized carousels:

1. `src/utils/getDraggedSlidesCount.ts` (root cause): when
   `effectiveSlideSize` is not a positive finite number, or the resulting
   ratio is not finite, return `0`. A carousel with no measurable size cannot
   map a drag to slides, so the drag is ignored.
2. `src/utils/createCloneSlides.ts` (last line of defence): when `toShow` is
   not a finite number, return no clones. Any future non-finite index can then
   degrade the layout but never hang the page.

## Testing

- Unit: `getDraggedSlidesCount` returns `0` for `effectiveSlideSize: 0`
  (both axes, reversed or not) and for a non-finite drag value.
- Unit: `createCloneSlides` returns `[]` for `toShow: Infinity` / `NaN`.
- Integration (`tests/integration/carousel.spec.ts`): a `dir="ttb"`,
  `wrapAround` carousel in jsdom (all rects 0) survives a mouse drag and
  release: `activeSlide` stays finite and unchanged, the clone count stays at
  its idle value, and `modelValue` is unchanged. Without the fix this test
  hangs rather than fails; the unit tests give the clean red.

## Decisions (answered on the user's behalf)

- Drag on a zero-sized carousel does nothing (rather than moving one slide):
  there is no size to compare the drag to. Cost if wrong: a drag on an
  unlaid-out carousel is ignored instead of advancing by one.
- Guard in both the utility and the clone builder, not in `Carousel.ts`:
  keeps the fix in pure, unit-tested functions. Cost if wrong: none
  functional; a reviewer may prefer a single guard.
- No clamp on `activeSlideIndex` under `wrapAround`: dragging past many
  slides is legitimate and out of scope.
- No CHANGELOG entry: it is written at release time with PR numbers.
