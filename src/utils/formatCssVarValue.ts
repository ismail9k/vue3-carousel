/**
 * Appends 'px' to numeric values and handles other units.
 *
 * @param value - The value to convert (number or string)
 * @returns A string in the appropriate CSS format
 */
export function formatCssVarValue(value?: number | string): string {
  if (typeof value === 'number') {
    return `${value}px`
  }
  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    if (/^\d+$/.test(trimmedValue)) {
      return `${trimmedValue}px`
    }
    if (/^\d+(\.\d+)?%$/.test(trimmedValue)) {
      return trimmedValue
    }
    if (/^\d+(\.\d+)?(px|em|rem|vh|vw|%)$/.test(trimmedValue)) {
      return trimmedValue
    }
  }
  return value ?? 'auto'
}
