import { defineComponent, h, inject, PropType } from 'vue'

import { injectCarousel } from '@/injectSymbols'
import { DEFAULT_CONFIG } from '@/partials/defaults'
import icons, { IconName, IconNameValue } from '@/partials/icons'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

export type IconProps = { name: IconNameValue; title?: string }

const iconI18n = <Name extends IconNameValue>(name: Name) =>
  `icon${name.charAt(0).toUpperCase() + name.slice(1)}` as `icon${Capitalize<Name>}`

const validateIconName = (value: IconNameValue) => {
  return value && isIconName(value)
}

export default defineComponent({
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
  setup(props: IconProps) {
    const carousel = inject(injectCarousel, null)

    return () => {
      const iconName = props.name
      if (!validateIconName(iconName)) return

      const path = icons[iconName]
      const pathEl = h('path', { d: path })

      const iconTitle: string =
        carousel?.config.i18n[iconI18n(iconName)] || props.title || iconName

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
