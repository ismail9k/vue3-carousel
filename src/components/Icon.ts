import { defineComponent, h, inject, PropType } from 'vue'

import { injectCarousel } from '@/injectSymbols'
import icons, { IconName, IconNameValue } from '@/partials/icons'
import { I18nKeys } from '@/types'

function isIconName(candidate: string): candidate is IconName {
  return candidate in IconName
}

type IconProps = { name: IconNameValue, title?: string }

export default defineComponent({
  props: {
    name: {
      type: String as PropType<IconNameValue>,
      required: true,
    },
    title: {
      type: String,
    }
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

      const iconTitle: string = carousel?.config.i18n[iconI18n] || props.title || iconName

      const titleEl = h('title', iconTitle)

      return h(
        'svg',
        {
          class: 'carousel__icon',
          viewBox: '0 0 24 24',
          role: 'img',
          'aria-label': iconTitle,
        },
        [titleEl, pathEl],
      )
    }
  }
})
