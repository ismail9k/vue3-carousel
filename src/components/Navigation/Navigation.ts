import { computed, defineComponent, h, inject, PropType } from 'vue'

import { injectCarousel, NormalizedDir } from '@/shared'

import { Icon, IconNameValue } from '../Icon'

import { NavigationProps } from './Navigation.types'

export const Navigation = defineComponent<NavigationProps>({
  name: 'CarouselNavigation',
  inheritAttrs: false,
  props: {
    carousel: {
      type: Object as PropType<NavigationProps['carousel']>,
    },
  },
  setup(props, { slots, attrs }) {
    let carousel = inject(injectCarousel, null)!
    const { next: slotNext, prev: slotPrev } = slots

    const getPrevIcon = () => {
      const directionIcons: Record<NormalizedDir, IconNameValue> = {
        btt: 'arrowDown',
        ltr: 'arrowLeft',
        rtl: 'arrowRight',
        ttb: 'arrowUp',
      }

      return directionIcons[carousel.normalizedDir]
    }
    const getNextIcon = () => {
      const directionIcons: Record<NormalizedDir, IconNameValue> = {
        btt: 'arrowUp',
        ltr: 'arrowRight',
        rtl: 'arrowLeft',
        ttb: 'arrowDown',
      }

      return directionIcons[carousel.normalizedDir]
    }

    const prevDisabled = computed(
      () => !carousel.config.wrapAround && carousel.currentSlide <= carousel.minSlide
    )
    const nextDisabled = computed(
      () => !carousel.config.wrapAround && carousel.currentSlide >= carousel.maxSlide
    )

    return () => {
      if (props.carousel) {
        carousel = props.carousel;
      }
      if (!carousel) {
        console.warn('[vue3-carousel]: A carousel component must be provided for the navigation component to display')
        return '';
      }
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
            { 'carousel__prev--disabled': prevDisabled.value },
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
            { 'carousel__next--disabled': nextDisabled.value },
            attrs.class,
          ],
        },
        slotNext?.() || h(Icon, { name: getNextIcon() })
      )

      return [prevButton, nextButton]
    }
  },
})
