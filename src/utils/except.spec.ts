import { describe, expect, it, vi } from 'vitest'

import { except } from '@/utils'

describe('except', () => {
  it('should return an object without keys', () => {
    const mockToNotCall = vi.fn()
    const mockToCall = vi.fn(() => 'd')
    const obj = Object.defineProperties(
      { a: 'foo', c: 'c' },
      {
        b: {
          enumerable: true,
          get: mockToNotCall
        },
        d: {
          enumerable: true,
          get: mockToCall
        }
      })
    expect(Object.keys(obj)).toStrictEqual(['a', 'c', 'b', 'd'])
    expect(except(obj, ['b', 'c', 'e'])).toStrictEqual({ a: 'foo', d: 'd' })
    expect(mockToNotCall).not.toHaveBeenCalled()
    expect(mockToCall).toHaveBeenCalledOnce()
  })
})