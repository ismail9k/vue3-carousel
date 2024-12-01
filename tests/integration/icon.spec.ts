import { expect, it, describe, beforeAll, afterEach, vi } from 'vitest'

import { mount } from '@vue/test-utils'

import { Icon } from '@/index'
import { IconProps } from '@/components/Icon'

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
    const wrapper = mount(Icon, { props: { name: 'foo' } })
    expect(wrapper.html()).toBe('')
    expect(consoleMock).toHaveBeenCalledOnce()
    expect(consoleMock.mock.calls[0][0]).toBe(
      '[Vue warn]: Invalid prop: custom validator check failed for prop "name".'
    )
  })
})
