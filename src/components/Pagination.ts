import { inject, ref, h, VNode } from 'vue'

import { mapNumberToRange } from '@/partials/utils'

import { CarouselNav } from '../types'

const Pagination = () => {
  const maxSlide = inject('maxSlide', ref(1))
  const minSlide = inject('minSlide', ref(1))
  const currentSlide = inject('currentSlide', ref(1))
  const slidesCount = inject('slidesCount', ref(1))
  const nav: CarouselNav = inject('nav', {})

  function handleButtonClick(slideNumber: number): void {
    nav.slideTo(slideNumber)
  }

  const isActive = (slide: number): boolean => {
    const val = mapNumberToRange(currentSlide.value, slidesCount.value - 1, 0)
    return val === slide
  }

  const children: Array<VNode> = []
  for (let slide = minSlide.value; slide < maxSlide.value + 1; slide++) {
    const button = h('button', {
      type: 'button',
      class: {
        'carousel__pagination-button': true,
        'carousel__pagination-button--active': isActive(slide),
      },
      'aria-label': `Navigate to slide ${slide + 1}`,
      onClick: () => handleButtonClick(slide),
    })
    const item = h('li', { class: 'carousel__pagination-item', key: slide }, button)
    children.push(item)
  }

  return h('ol', { class: 'carousel__pagination' }, children)
}

export default Pagination
