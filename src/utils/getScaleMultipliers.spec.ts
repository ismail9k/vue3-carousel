import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  getScaleMultipliers,
  getScaleValues,
  getTransformValues,
} from '@/utils/getScaleMultipliers'

const IDENTITY = [1, 0, 0, 1, 0, 0]

type MockedStyle = { transform?: string; scale?: string }

function mockStyles(styles: Map<Element, MockedStyle>) {
  return vi.spyOn(window, 'getComputedStyle').mockImplementation((el) => {
    // Read on every call so a test can mutate the map between calls
    const { transform = 'none', scale } = styles.get(el) ?? {}
    // jsdom reports `undefined` for the individual `scale` property
    return { transform, scale } as CSSStyleDeclaration
  })
}

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

  it('uses the magnitude of a mirrored scale', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockTransforms(new Map([[wrapper, 'matrix(-0.5, 0, 0, -0.5, 0, 0)']]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 2,
      heightMultiplier: 2,
    })
  })

  it('ignores a rotated or skewed ancestor', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    // rotate(60deg): a = d = 0.5, b = -c = 0.866
    mockTransforms(new Map([[wrapper, 'matrix(0.5, 0.866, -0.866, 0.5, 0, 0)']]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })

  it('ignores a rotated matrix3d ancestor', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    // rotateZ(60deg) as a 3D matrix: m12 and m21 are non-zero
    mockTransforms(
      new Map([
        [
          wrapper,
          'matrix3d(0.5, 0.866, 0, 0, -0.866, 0.5, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)',
        ],
      ])
    )

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })
})

describe('getScaleValues', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns identity values when the property is absent (jsdom)', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, {}]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 1, scaleY: 1 })
  })

  it('returns identity values for an empty value', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 1, scaleY: 1 })
  })

  it('returns identity values for `none`', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: 'none' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 1, scaleY: 1 })
  })

  it('applies a single value to both axes', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '0.5' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 0.5, scaleY: 0.5 })
  })

  it('reads two values as x then y', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '0.5 0.25' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 0.5, scaleY: 0.25 })
  })

  it('reads the first two of three values as x then y', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '0.5 0.25 2' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 0.5, scaleY: 0.25 })
  })

  it('uses the magnitude of a negative single value', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '-1' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 1, scaleY: 1 })
  })

  it('uses the magnitude of negative per-axis values', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: '-0.5 0.25' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 0.5, scaleY: 0.25 })
  })

  it('returns identity values when the value cannot be parsed', () => {
    const div = document.createElement('div')
    mockStyles(new Map([[div, { scale: 'garbage' }]]))

    expect(getScaleValues(div)).toEqual({ scaleX: 1, scaleY: 1 })
  })
})

describe('getScaleMultipliers with the CSS scale property', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('inverts a uniform `scale` on an ancestor', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(new Map([[wrapper, { scale: '0.5' }]]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 2,
      heightMultiplier: 2,
    })
  })

  it('inverts a per-axis `scale` on an ancestor', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(new Map([[wrapper, { scale: '0.5 0.25' }]]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 2,
      heightMultiplier: 4,
    })
  })

  it('ignores `scale: none`', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(new Map([[wrapper, { scale: 'none' }]]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })

  it('ignores an unparsable `scale`', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(new Map([[wrapper, { scale: 'garbage' }]]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })

  it('ignores a zero `scale` instead of dividing by zero', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(new Map([[wrapper, { scale: '0 0' }]]))

    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })
  })

  it('multiplies a `scale` with a `transform` matrix on the same element', () => {
    const wrapper = document.createElement('div')
    const child = document.createElement('div')
    wrapper.appendChild(child)
    mockStyles(
      new Map([
        [wrapper, { transform: 'matrix(0.5, 0, 0, 0.5, 0, 0)', scale: '0.5 0.25' }],
      ])
    )

    // width: 1 / 0.5 / 0.5 = 4; height: 1 / 0.5 / 0.25 = 8
    expect(getScaleMultipliers(child)).toEqual({
      widthMultiplier: 4,
      heightMultiplier: 8,
    })
  })
})
