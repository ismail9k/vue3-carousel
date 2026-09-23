import { afterEach, describe, expect, it, vi } from 'vitest'

import { getScaleMultipliers, getTransformValues } from '@/utils/getScaleMultipliers'

const IDENTITY = [1, 0, 0, 1, 0, 0]

function mockTransforms(transforms: Map<Element, string>) {
  return vi
    .spyOn(window, 'getComputedStyle')
    .mockImplementation(
      (el) => ({ transform: transforms.get(el) ?? 'none' }) as CSSStyleDeclaration
    )
}

describe('getTransformValues', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('parses the computed transform matrix of an element', () => {
    const div = document.createElement('div')
    mockTransforms(new Map([[div, 'matrix(0.4, 0, 0, 0.6, -12, 12)']]))

    expect(getTransformValues(div)).toStrictEqual([0.4, 0, 0, 0.6, -12, 12])
  })

  it('returns the identity matrix when there is no transform', () => {
    const div = document.createElement('div')
    mockTransforms(new Map([[div, 'none']]))

    expect(getTransformValues(div)).toStrictEqual(IDENTITY)
  })

  it('returns the identity matrix when the transform cannot be parsed', () => {
    const div = document.createElement('div')
    mockTransforms(new Map([[div, 'garbage']]))

    expect(getTransformValues(div)).toStrictEqual(IDENTITY)
  })

  it('does not cache: reflects a changed transform on the next call', () => {
    const div = document.createElement('div')
    const transforms = new Map([[div, 'matrix(0.5, 0, 0, 0.5, 0, 0)']])
    mockTransforms(transforms)

    expect(getTransformValues(div)[0]).toBe(0.5)
    transforms.set(div, 'matrix(2, 0, 0, 2, 0, 0)')
    expect(getTransformValues(div)[0]).toBe(2)
  })
})

describe('getScaleMultipliers', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns identity multipliers for null', () => {
    expect(getScaleMultipliers(null)).toEqual({ widthMultiplier: 1, heightMultiplier: 1 })
  })

  it('returns identity multipliers when no ancestor is transformed', () => {
    const parent = document.createElement('div')
    const child = document.createElement('div')
    parent.appendChild(child)
    mockTransforms(new Map())

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })

  it('inverts the scale of a transformed ancestor', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockTransforms(new Map([[wrapper, 'matrix(0.5, 0, 0, 0.25, 0, 0)']]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 2,
      heightMultiplier: 4,
    })
  })

  it('includes the scale of the element itself', () => {
    const el = document.createElement('div')
    mockTransforms(new Map([[el, 'matrix(2, 0, 0, 2, 0, 0)']]))

    expect(getScaleMultipliers(el)).toEqual({
      widthMultiplier: 0.5,
      heightMultiplier: 0.5,
    })
  })

  it('accumulates nested scales', () => {
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    const child = document.createElement('div')
    outer.appendChild(inner)
    inner.appendChild(child)
    mockTransforms(
      new Map([
        [outer, 'matrix(2, 0, 0, 2, 0, 0)'],
        [inner, 'matrix(0.5, 0, 0, 0.25, 0, 0)'],
      ])
    )

    // width: 1 / 2 / 0.5 = 1; height: 1 / 2 / 0.25 = 2
    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 2,
    })
  })

  it('reads the scale from a matrix3d transform', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockTransforms(
      new Map([[wrapper, 'matrix3d(2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)']])
    )

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 0.5,
      heightMultiplier: 0.25,
    })
  })

  it('ignores a zero scale instead of dividing by zero', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockTransforms(new Map([[wrapper, 'matrix(0, 0, 0, 0, 0, 0)']]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })
})
