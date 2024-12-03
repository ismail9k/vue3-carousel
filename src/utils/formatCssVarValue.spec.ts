import { describe, it, expect } from 'vitest'

import { formatCssVarValue } from './formatCssVarValue'

describe('formatCssVarValue', () => {
  it('should append "px" to numeric values', () => {
    expect(formatCssVarValue(10)).toBe('10px')
    expect(formatCssVarValue(0)).toBe('0px')
  })

  it('should return string values with appropriate units unchanged', () => {
    expect(formatCssVarValue('10px')).toBe('10px')
    expect(formatCssVarValue('1.5em')).toBe('1.5em')
    expect(formatCssVarValue('100%')).toBe('100%')
    expect(formatCssVarValue('50vh')).toBe('50vh')
    expect(formatCssVarValue('75vw')).toBe('75vw')
  })

  it('should append "px" to numeric strings', () => {
    expect(formatCssVarValue('10')).toBe('10px')
    expect(formatCssVarValue('0')).toBe('0px')
  })

  it('should trim and handle strings with spaces', () => {
    expect(formatCssVarValue(' 10px ')).toBe('10px')
    expect(formatCssVarValue('  1.5em')).toBe('1.5em')
    expect(formatCssVarValue('100%  ')).toBe('100%')
    expect(formatCssVarValue(' 50vh ')).toBe('50vh')
    expect(formatCssVarValue('  75vw')).toBe('75vw')
    expect(formatCssVarValue(' 10 ')).toBe('10px')
  })

  it('should return "auto" for undefined values', () => {
    expect(formatCssVarValue(undefined)).toBe('auto')
  })

  it('should return the original value for invalid strings', () => {
    expect(formatCssVarValue('invalid')).toBe('invalid')
    expect(formatCssVarValue('10abc')).toBe('10abc')
  })
})
