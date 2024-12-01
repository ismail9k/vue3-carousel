import { defineComponent, h, inject, type PropType } from 'vue'

import { I18nKeys } from '@/shared'
import { injectCarousel } from '@/shared/injectSymbols'

import { IconName, IconNameValue, IconProps } from './Icon.types'

const icons = {
  arrowUp: 'M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z',
  arrowDown: 'M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z',
  arrowRight: 'M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z',
  arrowLeft: 'M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z',
}

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<IconNameValue>,
      required: true,
    },
    title: {
      type: String,
    },
  },
  setup(props: IconProps) {
    const carousel = inject(injectCarousel)

    if (!carousel) {
      return null // Don't render, let vue warn about the missing provide
    }

    return () => {
      const iconName = String(props.name)
      const iconI18n = `icon${
        iconName.charAt(0).toUpperCase() + iconName.slice(1)
      }` as I18nKeys

      if (!iconName || !isIconName(iconName)) {
        return
      }

      const path = icons[iconName]
      const pathEl = h('path', { d: path })

      const iconTitle: string = carousel.config.i18n[iconI18n] || props.title || iconName

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
