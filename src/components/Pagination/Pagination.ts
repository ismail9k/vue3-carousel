import { inject, h, VNode, defineComponent, computed } from 'vue'

import { injectCarousel } from '@/shared'
import { mapNumberToRange, i18nFormatter, calculateOffset } from '@/utils'

import { PaginationProps } from './Pagination.types'

export const Pagination = defineComponent<PaginationProps>({
  name: 'CarouselPagination',
  props: {
    disableOnClick: {
      type: Boolean,
    },
    paginateByItemsToShow: {
      type: Boolean,
    },
  },
  setup(props) {
    const carousel = inject(injectCarousel)

    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
    }

    const offset = computed(() =>
      calculateOffset(carousel.config.snapAlign, carousel.config.itemsToShow)
    )
    const isPaginated = computed(
      () => props.paginateByItemsToShow && carousel.config.itemsToShow > 1
    )
    const currentPage = computed(() =>
      Math.ceil((carousel.activeSlide - offset.value) / carousel.config.itemsToShow)
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
              val: carousel.activeSlide,
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
          disabled: props.disableOnClick,
          onClick: () =>
            carousel.nav.slideTo(
              isPaginated.value
                ? slide * carousel.config.itemsToShow + offset.value
                : slide
            ),
        })
        const item = h('li', { class: 'carousel__pagination-item', key: slide }, button)
        children.push(item)
      }

      return h('ol', { class: 'carousel__pagination' }, children)
    }
  },
})
