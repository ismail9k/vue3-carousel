import { describe, expect, it } from 'vitest'

import { toCssString } from './toCssString'

describe('toCssString', () => {
  it('wraps the text in double quotes', () => {
    expect(toCssString('Next slide')).toBe('"Next slide"')
  })

  it('escapes quotes and backslashes so the string cannot end early', () => {
    expect(toCssString('a "b" \\ c')).toBe('"a \\"b\\" \\\\ c"')
  })

  it('escapes line breaks, which are invalid inside a CSS string', () => {
    expect(toCssString('a\nb')).toBe('"a\\a b"')
  })
})
