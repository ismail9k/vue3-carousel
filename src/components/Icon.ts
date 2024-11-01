import { h, inject, reactive } from 'vue'

import { DEFAULT_CONFIG } from '@/partials/defaults'

import icons, { IconName } from '../partials/icons'
import { CarouselConfig, Data, I18nKeys } from '../types'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

const Icon = (props: Data) => {
  const config: CarouselConfig = inject('config', reactive({ ...DEFAULT_CONFIG }))
  const iconName = String(props.name)
  const iconI18n = `icon${
    iconName.charAt(0).toUpperCase() + iconName.slice(1)
  }` as I18nKeys
  if (!iconName || typeof iconName !== 'string' || !isIconName(iconName)) {
    return
  }

  const path = icons[iconName]
  const pathEl = h('path', { d: path })

  const iconTitle = config.i18n[iconI18n] || props.title || iconName

  const titleEl = h('title', iconTitle)

  return h(
    'svg',
    {
      class: 'carousel__icon',
      viewBox: '0 0 24 24',
      role: 'img',
      'aria-label': iconTitle,
    },
    [titleEl, pathEl]
  )
}

Icon.props = { name: String, title: String }

export default Icon
