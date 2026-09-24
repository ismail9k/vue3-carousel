# Drag threshold: use the final pointer sample

Intent-Issue: #502 — https://github.com/ismail9k/vue3-carousel/issues/502

## Problem

Issue #502: on mobile a swipe must travel very far to change slide, and
`touchDrag: { threshold: 0.1 }` makes no difference.

Reproduced on this base (`tests/integration/drag.spec.ts`): the option itself
is honored by `Carousel.ts` `onDrag`, but `useDrag` throttles `handleDrag` to a
trailing `requestAnimationFrame` and `handleDragEnd` calls `handleDrag.cancel()`.
Two effects:

1. The pending frame is cancelled on `touchend`/`mouseup`, so the last move
   sample never reaches `onDrag`. A swipe whose final (largest) move lands in
   the same frame as the release is judged on an earlier, shorter sample.
2. While a frame is pending, later moves are dropped and the frame fires with
   the *first* call's event, so the compared distance lags the finger.

Both make short, fast swipes under-count, which reads as "the threshold is
ignored" and "you must swipe a long distance". Issue comments confirm the
option works for long, slow swipes on 0.15.0+.

## Design

Change `src/composables/useDrag.ts` only:

- Keep the latest pointer position in a plain object updated on every
  move event (unthrottled).
- The throttled handler applies that latest position (not its own args).
- `handleDragEnd` cancels the pending frame and then applies the latest
  position synchronously, so `onDrag` (and the threshold check) sees the
  final delta before `onDragEnd` runs.

No API change. Throttle utility unchanged (`useWheel` also uses it).

Also correct `docs/config.md`: drag `threshold` default is `0.08`
(`DEFAULT_DRAG_THRESHOLD`), not `0.3`.

## Tests

`tests/integration/drag.spec.ts` (Vitest, jsdom, touch events built by hand):

- `touchDrag.threshold` is honored for a processed move (regression guard).
- Release in the same frame as the last move uses that move.
- Two moves inside one frame: the later one is applied.
- Mouse drag: release in the same frame as the last move uses that move.

## Decisions (unattended)

- The issue as literally stated ("option does nothing") is not reproducible on
  this base; the real defect is the dropped final sample. Fix that plus add the
  regression test, rather than only the test.
- Default threshold 0.08 stays; only the doc is corrected.
- Throttle semantics stay first-call/trailing for `useWheel`; latest-sample
  behaviour is local to `useDrag`.
