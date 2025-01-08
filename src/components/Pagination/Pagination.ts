import { computed, defineComponent, h, inject, VNode } from 'vue'

import { injectCarousel } from '@/shared'
import { getSnapAlignOffset, i18nFormatter, mapNumberToRange } from '@/utils'

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

    const itemsToShow = computed(() => carousel.config.itemsToShow as number)
    const offset = computed(() =>
      getSnapAlignOffset({
        align: carousel.config.snapAlign,
        itemsToShow: itemsToShow.value,
      })
    )
    const isPaginated = computed(
      () => props.paginateByItemsToShow && itemsToShow.value > 1
    )
    const currentPage = computed(() =>
      Math.ceil((carousel.activeSlide - offset.value) / itemsToShow.value)
    )
    const pageCount = computed(() => Math.ceil(carousel.slidesCount / itemsToShow.value))

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
                ? Math.floor(slide * +carousel.config.itemsToShow + offset.value)
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
