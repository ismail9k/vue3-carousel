import { describe, it, expect } from 'vitest'

import { generateStyleVars } from './generateStyleVars'

describe('generateStyleVars', () => {
  it('should generate CSS variables for given styles', () => {
    const component = 'button'
    const styles = {
      backgroundColor: 'red',
      fontSize: '16px',
      margin: '10px',
    }

    const result = generateStyleVars(component, styles)

    expect(result).toEqual({
      '--vc-button-background-color': 'red',
      '--vc-button-font-size': '16px',
      '--vc-button-margin': '10px',
    })
  })

  it('should handle undefined values in styles', () => {
    const component = 'button'
    const styles = {
      backgroundColor: 'red',
      fontSize: undefined,
      margin: '10px',
    }

    const result = generateStyleVars(component, styles)

    expect(result).toEqual({
      '--vc-button-background-color': 'red',
      '--vc-button-margin': '10px',
    })
  })

  it('should handle numeric values in styles', () => {
    const component = 'button'
    const styles = {
      width: 100,
      height: 50,
    }

    const result = generateStyleVars(component, styles)

    expect(result).toEqual({
      '--vc-button-width': '100px',
      '--vc-button-height': '50px',
    })
  })

  it('should convert camelCase keys to kebab-case', () => {
    const component = 'button'
    const styles = {
      backgroundColor: 'red',
      fontSize: '16px',
    }

    const result = generateStyleVars(component, styles)

    expect(result).toEqual({
      '--vc-button-background-color': 'red',
      '--vc-button-font-size': '16px',
    })
  })
})
