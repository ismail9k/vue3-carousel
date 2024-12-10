import { inject, h, VNode, defineComponent } from 'vue'

import { injectCarousel } from '@/shared'
import { mapNumberToRange, i18nFormatter } from '@/utils'

import { PaginationProps } from './Pagination.types'

export const Pagination = defineComponent<PaginationProps>({
  name: 'CarouselPagination',
  props: {
    disableOnClick: {
      type: Boolean,
    },
    paginated: {
      type: Boolean
    },
  },
  setup(props) {
    const carousel = inject(injectCarousel)

    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
    }

    const isActive = (slide: number): boolean =>
      mapNumberToRange({
        val: carousel.currentSlide,
        max: carousel.maxSlide,
        min: 0,
      }) === slide

    return () => {
      const children: Array<VNode> = []
      for (let slide = carousel.minSlide; slide <= carousel.maxSlide; slide++) {
        const buttonLabel = i18nFormatter(carousel.config.i18n.ariaNavigateToSlide, {
          slideNumber: slide + 1,
        })
        const active = isActive(slide)
        const button = h('button', {
          type: 'button',
          class: {
            'carousel__pagination-button': true,
            'carousel__pagination-button--active': active,
          },
          'aria-label': buttonLabel,
          'aria-pressed': active,
          'aria-controls': carousel.slides[slide]?.exposed?.id,
          title: buttonLabel,
          disabled: props.disableOnClick,
          onClick: () => carousel.nav.slideTo(slide),
        })
        const item = h('li', { class: 'carousel__pagination-item', key: slide }, button)
        children.push(item)
      }

      return h('ol', { class: 'carousel__pagination' }, children)
    }
  },
})
