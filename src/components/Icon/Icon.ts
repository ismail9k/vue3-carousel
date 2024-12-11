import { defineComponent, h, inject, PropType } from 'vue'

import { DEFAULT_CONFIG, injectCarousel } from '@/shared'

import { IconName, IconNameValue, IconProps } from './Icon.types'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

const iconI18n = <Name extends IconNameValue>(name: Name) =>
  `icon${name.charAt(0).toUpperCase() + name.slice(1)}` as `icon${Capitalize<Name>}`

const validateIconName = (value: IconNameValue) => {
  return value && isIconName(value)
}

export const icons = {
  arrowUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  arrowDown: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  arrowRight: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  arrowLeft: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z',
}

export const Icon = defineComponent<IconProps>({
  props: {
    name: {
      type: String as PropType<IconNameValue>,
      required: true,
      validator: validateIconName,
    },
    title: {
      type: String,
      default: (props: { name: IconNameValue }) =>
        props.name ? DEFAULT_CONFIG.i18n[iconI18n(props.name)] : '',
    },
  },
  setup(props) {
    const carousel = inject(injectCarousel, null)

    return () => {
      const iconName = props.name
      if (!iconName || !validateIconName(iconName)) return

      const path = icons[iconName]
      const pathEl = h('path', { d: path })

      const iconTitle: string =
        carousel?.config.i18n[iconI18n(iconName)] || props.title!

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
  },
})
