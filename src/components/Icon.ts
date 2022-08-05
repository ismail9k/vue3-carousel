import { h } from 'vue'

import icons from '../partials/icons'

import { Data } from '../types'

const Icon = (props: Data) => {
  const iconName = props.name
  if (!iconName || typeof iconName !== 'string') {
    return
  }
  const path = icons[iconName]
  const pathEl = h('path', { d: path })

  const iconTitle = props.title || iconName
  const titleEl = h('title', null, iconTitle)

  return h(
    'svg',
    {
      class: 'carousel__icon',
      viewBox: '0 0 24 24',
      role: 'img',
      ariaLabel: iconTitle,
    },
    [titleEl, pathEl]
  )
}

Icon.props = { name: String, title: String }

export default Icon
