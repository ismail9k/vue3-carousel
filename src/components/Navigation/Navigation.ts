import { inject, h, defineComponent, PropType } from 'vue'

import { NavigationProps } from '@/components/Navigation/Navigation.types'
import { injectCarousel } from '@/injectSymbols'
import { NormalizedDir, VueClass } from '@/shared'

import { Icon, IconNameValue } from '../Icon'

export const Navigation = defineComponent<NavigationProps>({
  name: 'CarouselNavigation',
  props: {
    class: {
      type: [String, Array, Object] as PropType<VueClass>,
    },
  },
  setup(props, { slots }) {
    const carousel = inject(injectCarousel)
    if (!carousel) {
      return // Don't render, let vue warn about the missing provide
    }
    const { next: slotNext, prev: slotPrev } = slots

    const getPrevIcon = () => {
      const directionIcons: Record<NormalizedDir, IconNameValue> = {
        ltr: 'arrowLeft',
        rtl: 'arrowRight',
        ttb: 'arrowUp',
        btt: 'arrowDown',
      }

      return directionIcons[carousel.normalizedDir]
    }
    const getNextIcon = () => {
      const directionIcons: Record<NormalizedDir, IconNameValue> = {
        ltr: 'arrowRight',
        rtl: 'arrowLeft',
        ttb: 'arrowDown',
        btt: 'arrowUp',
      }

      return directionIcons[carousel.normalizedDir]
    }

    return () => {
      const { wrapAround, i18n } = carousel.config
      const prevButton = h(
        'button',
        {
          type: 'button',
          class: [
            'carousel__prev',
            !wrapAround &&
              carousel.currentSlide <= carousel.minSlide &&
              'carousel__prev--disabled',
            props.class,
          ],
          'aria-label': i18n['ariaPreviousSlide'],
          title: i18n['ariaPreviousSlide'],
          onClick: carousel.nav.prev,
        },
        slotPrev?.() || h(Icon, { name: getPrevIcon() })
      )
      const nextButton = h(
        'button',
        {
          type: 'button',
          class: [
            'carousel__next',
            !wrapAround &&
              carousel.currentSlide >= carousel.maxSlide &&
              'carousel__next--disabled',
            props.class,
          ],
          'aria-label': i18n['ariaNextSlide'],
          title: i18n['ariaNextSlide'],
          onClick: carousel.nav.next,
        },
        slotNext?.() || h(Icon, { name: getNextIcon() })
      )

      return [prevButton, nextButton]
    }
  },
})
