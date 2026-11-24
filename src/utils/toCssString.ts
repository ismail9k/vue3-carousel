/**
 * Quotes text as a CSS string, e.g. for a custom property read by `content`.
 * Quotes, backslashes and line breaks are escaped so the string cannot end early.
 */
export function toCssString(value = ''): string {
  const escaped = value.replace(/["\\]/g, '\\$&').replace(/\r?\n/g, '\\a ')
  return `"${escaped}"`
}
