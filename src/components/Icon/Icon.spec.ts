import { mount } from '@vue/test-utils'
import { expect, it, describe, afterEach, vi } from 'vitest'

import { Icon } from './Icon'
import { IconName, IconProps } from './Icon.types'

describe('Icon.ts', () => {
  const consoleMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

  afterEach(() => {
    consoleMock.mockReset()
  })

  it('It should error if no iconName', () => {
    const wrapper = mount(Icon, { props: {} })
    expect(wrapper.html()).toBe('')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock.mock.calls[0][0]).toBe('[Vue warn]: Missing required prop: "name"')
  })

  it('It should error if iconName is invalid', () => {
    const wrapper = mount(Icon, { props: { name: 'foo' as any } })
    expect(wrapper.html()).toBe('')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock.mock.calls[0][0]).toBe(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "name".'
    )
  })

  it('It should render standalone', () => {
    Object.values(IconName).forEach((name) => {
      const wrapper = mount(Icon, { props: { name: name } as IconProps })
      expect(consoleMock).not.toHaveBeenCalled()
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
