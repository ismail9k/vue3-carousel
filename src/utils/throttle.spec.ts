import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { throttle } from './throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should call the function again after the wait time', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 0)
    throttledFn()
    vi.advanceTimersByTime(16)
    throttledFn()
    vi.advanceTimersByTime(16)

    expect(fn).toHaveBeenCalledTimes(2)
  })
})
