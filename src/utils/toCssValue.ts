/**
 * Converts a value to a CSS-compatible string.
 * @param value - The value to convert.
 * @returns The CSS-compatible string.
 **/
export function toCssValue(value?: string | number): string | undefined {
  if (value === 'auto') {
    return undefined
  }
  if (value === null || value === undefined || value === '') {
    return undefined
  }

  if (typeof value === 'number' || parseFloat(value).toString() === value) {
    return `${value}px`
  }
  return value
}
