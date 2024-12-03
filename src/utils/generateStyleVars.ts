import { camelCaseToKebabCase } from './camelCaseToKebabCase'
import { formatCssVarValue } from './formatCssVarValue'

/**
 * Generates CSS custom properties (variables) for a given component and styles.
 *
 * @param component - The name of the component.
 * @param styles - An object containing style properties and their values.
 * @returns An object with CSS custom properties.
 */
export function generateStyleVars(
  component: string,
  styles: Record<string, string | number | undefined>
): Record<string, string> {
  return Object.entries(styles).reduce((acc, [key, value]) => {
    if (value === undefined) {
      return acc
    }

    const kebabKey = camelCaseToKebabCase(key)
    const cssVarName = `--vc-${component}-${kebabKey}`
    const cssVarValue = formatCssVarValue(value)

    acc[cssVarName] = cssVarValue
    return acc
  }, {} as Record<string, string>)
}
