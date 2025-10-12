import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { throttle } from './throttle'

describe('throttle', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the function immediately on first invocation', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 0)

    throttledFn()
    vi.runAllTimers()

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should throttle subsequent calls within the wait time', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn()
    throttledFn()
    throttledFn()

    // Should only call once initially
    expect(fn).toHaveBeenCalledTimes(0)

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should call the function again after the wait time', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 0)

    throttledFn()
    vi.runAllTimers()

    throttledFn()
    vi.runAllTimers()

    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('should use setTimeout for delays > 16ms', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 200)

    throttledFn()

    // Should not have been called yet
    expect(fn).toHaveBeenCalledTimes(0)

    vi.advanceTimersByTime(200)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should use requestAnimationFrame for delays <= 16ms', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 0)

    throttledFn()

    // Should not have been called until RAF executes
    expect(fn).toHaveBeenCalledTimes(0)

    vi.runAllTimers()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to the throttled function', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn('arg1', 'arg2', 123)
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledWith('arg1', 'arg2', 123)
  })

  it('should cancel pending execution when cancel is called', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn()
    throttledFn.cancel()
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(0)
  })

  it('should allow new calls after cancel', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 100)

    throttledFn()
    throttledFn.cancel()

    throttledFn()
    vi.advanceTimersByTime(100)

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should handle rapid successive calls correctly', () => {
    const fn = vi.fn()
    const throttledFn = throttle(fn, 50)

    // Rapid calls
    throttledFn()
    throttledFn()
    throttledFn()
    throttledFn()

    expect(fn).toHaveBeenCalledTimes(0)

    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(1)

    // Wait for throttle to release
    throttledFn()
    vi.advanceTimersByTime(50)
    expect(fn).toHaveBeenCalledTimes(2)
  })
})
