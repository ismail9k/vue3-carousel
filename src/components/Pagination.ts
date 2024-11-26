import { inject, ref, h, VNode, reactive } from 'vue'

import { DEFAULT_CONFIG } from '@/partials/defaults'
import { mapNumberToRange } from '@/utils'
import { i18nFormatter } from '@/utils/i18nFormater'

import { CarouselConfig, CarouselNav } from '../types'

const Pagination = () => {
  const config: CarouselConfig = inject('config', reactive({ ...DEFAULT_CONFIG }))
  const maxSlide = inject('maxSlide', ref(1))
  const minSlide = inject('minSlide', ref(1))
  const currentSlide = inject('currentSlide', ref(1))
  const nav: CarouselNav = inject('nav', {} as CarouselNav)

  const isActive = (slide: number): boolean =>
    mapNumberToRange({
      val: currentSlide.value,
      max: maxSlide.value,
      min: 0,
    }) === slide

  const children: Array<VNode> = []
  for (let slide = minSlide.value; slide < maxSlide.value + 1; slide++) {
    const buttonLabel = i18nFormatter(config.i18n['ariaNavigateToSlide'], {
      slideNumber: slide + 1,
    })
    const button = h('button', {
      type: 'button',
      class: {
        'carousel__pagination-button': true,
        'carousel__pagination-button--active': isActive(slide),
      },
      'aria-label': buttonLabel,
      title: buttonLabel,
      onClick: () => nav.slideTo(slide),
    })
    const item = h('li', { class: 'carousel__pagination-item', key: slide }, button)
    children.push(item)
  }

  return h('ol', { class: 'carousel__pagination' }, children)
}

export default Pagination
