/**
 * Converts camelCase to kebab-case.
 *
 * @param str - The camelCase string
 * @returns The kebab-case string
 */
export function camelCaseToKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
