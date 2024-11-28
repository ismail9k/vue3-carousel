import { describe, it, expect } from 'vitest'

import { camelCaseToKebabCase } from './camelCaseToKebabCase'

describe('camelCaseToKebabCase', () => {
  it('converts single camelCase word to kebab-case', () => {
    expect(camelCaseToKebabCase('camelCase')).toBe('camel-case')
  })

  it('converts multiple camelCase words to kebab-case', () => {
    expect(camelCaseToKebabCase('myVariableName')).toBe('my-variable-name')
  })

  it('handles strings with no uppercase letters', () => {
    expect(camelCaseToKebabCase('lowercase')).toBe('lowercase')
  })

  it('handles empty strings', () => {
    expect(camelCaseToKebabCase('')).toBe('')
  })

  it('handles strings with numbers', () => {
    expect(camelCaseToKebabCase('camelCase123')).toBe('camel-case123')
  })

  it('handles strings with special characters', () => {
    expect(camelCaseToKebabCase('camelCase!@#')).toBe('camel-case!@#')
  })
})
