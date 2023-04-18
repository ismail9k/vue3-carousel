import { h, inject, reactive } from 'vue'

import icons, { IconName } from '../partials/icons'
import { CarouselConfig, Data } from '../types'
import { defaultConfigs } from '@/partials/defaults'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

const Icon = (props: Data) => {
  const config: CarouselConfig = inject('config', reactive({ ...defaultConfigs }))
  const iconName = props.name
  if (!iconName || typeof iconName !== 'string' || !isIconName(iconName)) {
    return
  }

  const path = icons[iconName]
  const pathEl = h('path', { d: path })

  const iconTitle = (props.title
    || (config.labels?.iconAriaLabels ? config!.labels!.iconAriaLabels![iconName]! as string : undefined)
    || iconName
  ) as string

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
