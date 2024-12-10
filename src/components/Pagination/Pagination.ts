import { inject, h, VNode, defineComponent, computed } from 'vue'

import { injectCarousel } from '@/injectSymbols'
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
      return // Don't render, let vue warn about the missing provide
    }

    const offset = computed(() => {
      switch (carousel.config.snapAlign) {
        default:
        case 'center':
        case 'center-odd':
          return (carousel.config.itemsToShow - 1) / 2
        case 'end':
          return carousel.config.itemsToShow - 1
        case 'start':
        case 'center-even':
          return 0
      }
    })
    const isPaginated = computed(() => props.paginated && carousel.config.itemsToShow > 1)
    const currentPage = computed(() =>
      Math.ceil((carousel.currentSlide - offset.value) / carousel.config.itemsToShow)
    )
    const pageCount = computed(() =>
      Math.ceil(carousel.slidesCount / carousel.config.itemsToShow)
    )

    const isActive = (slide: number): boolean =>
      mapNumberToRange(
        isPaginated.value
          ? {
              val: currentPage.value,
              max: pageCount.value - 1,
              min: 0,
            }
          : {
              val: carousel.currentSlide,
              max: carousel.maxSlide,
              min: carousel.minSlide,
            }
      ) === slide

    return () => {
      const children: Array<VNode> = []

      for (
        let slide = isPaginated.value ? 0 : carousel.minSlide;
        slide <= (isPaginated.value ? pageCount.value - 1 : carousel.maxSlide);
        slide++
      ) {
        const buttonLabel = i18nFormatter(
          carousel.config.i18n[
            isPaginated.value ? 'ariaNavigateToPage' : 'ariaNavigateToSlide'
          ],
          {
            slideNumber: slide + 1,
          }
        )
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
          onClick: props.disableOnClick ? undefined : () => carousel.nav.slideTo(isPaginated.value ? slide * carousel.config.itemsToShow + offset.value : slide),
        })
        const item = h('li', { class: 'carousel__pagination-item', key: slide }, button)
        children.push(item)
      }

      return h('ol', { class: 'carousel__pagination' }, children)
    }
  },
})
