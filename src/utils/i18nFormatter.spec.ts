import { describe, expect, it } from 'vitest'

import { i18nFormatter } from './i18nFormatter'

describe('i18nFormatter', () => {
  it('handles empty string input', () => {
    const result = i18nFormatter('', { name: 'World' })
    expect(result).toBe('')
  })

  it('handles no values input', () => {
    const result = i18nFormatter('Hello, World!')
    expect(result).toBe('Hello, World!')
  })

  it('leaves placeholders without corresponding values unchanged', () => {
    const result = i18nFormatter('Hello, {name}!', {})
    expect(result).toBe('Hello, {name}!')
  })

  it('replaces multiple placeholders', () => {
    const result = i18nFormatter('Hello, {name}! You have {count} messages.', {
      name: 'Alice',
      count: 5,
    })
    expect(result).toBe('Hello, Alice! You have 5 messages.')
  })

  it('replaces placeholders with corresponding values', () => {
    const result = i18nFormatter('Hello, {name}!', { name: 'World' })
    expect(result).toBe('Hello, World!')
  })
})
