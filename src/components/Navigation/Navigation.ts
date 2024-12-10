import { inject, h, defineComponent, computed } from 'vue'

import { NormalizedDir, injectCarousel } from '@/shared'

import { Icon, IconNameValue } from '../Icon'

import { NavigationProps } from './Navigation.types'

export const Navigation = defineComponent<NavigationProps>({
  name: 'CarouselNavigation',
  inheritAttrs: false,
  setup(props, { slots, attrs }) {
    const carousel = inject(injectCarousel)
    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
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

    const prevDisabled = computed(() => !carousel.config.wrapAround && carousel.currentSlide <= carousel.minSlide)
    const nextDisabled = computed(() => !carousel.config.wrapAround && carousel.currentSlide >= carousel.maxSlide)

    return () => {
      const { i18n } = carousel.config
      const prevButton = h(
        'button',
        {
          type: 'button',
          disabled: prevDisabled.value,
          'aria-label': i18n['ariaPreviousSlide'],
          title: i18n['ariaPreviousSlide'],
          onClick: carousel.nav.prev,
          ...attrs,
          class: [
            'carousel__prev',
            {'carousel__prev--disabled': prevDisabled.value},
            attrs.class,
          ],
        },
        slotPrev?.() || h(Icon, { name: getPrevIcon() })
      )
      const nextButton = h(
        'button',
        {
          type: 'button',
          disabled: nextDisabled.value,
          'aria-label': i18n['ariaNextSlide'],
          title: i18n['ariaNextSlide'],
          onClick: carousel.nav.next,
          ...attrs,
          class: [
            'carousel__next',
            {'carousel__next--disabled': nextDisabled.value},
            attrs.class,
          ],
        },
        slotNext?.() || h(Icon, { name: getNextIcon() })
      )

      return [prevButton, nextButton]
    }
  },
})
