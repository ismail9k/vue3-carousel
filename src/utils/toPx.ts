/**
 * Appends 'px' to numeric values.
 *
 * @param value - The value to convert (number or string)
 * @returns A string in px format
 */
export function toPx(value?: number | string): string | undefined {
  if (typeof value === 'number') {
    return `${value}px`
  }
  return value
}
