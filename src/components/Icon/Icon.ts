import { h, inject, reactive } from 'vue'

import { CarouselConfig, DEFAULT_CONFIG, I18nKeys } from '@/shared'

import { IconName, IconProps } from './Icon.types'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

export const icons = {
  arrowUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  arrowDown: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  arrowRight: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  arrowLeft: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z',
}

export const Icon = (props: IconProps) => {
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
