import { inject, ref, h, reactive } from 'vue'

import { defaultConfig } from '@/partials/defaults'

import { CarouselNav, CarouselConfig } from '../types'

import Icon from './Icon'

const Navigation = (props: any, { slots, attrs }: any) => {
  const { next: slotNext, prev: slotPrev } = slots || {}
  const config: CarouselConfig = inject('config', reactive({ ...defaultConfig }))
  const maxSlide = inject('maxSlide', ref(1))
  const minSlide = inject('minSlide', ref(1))
  const currentSlide = inject('currentSlide', ref(1))
  const nav: CarouselNav = inject('nav', {})

  const { dir, wrapAround, i18n } = config
  const isRTL = dir === 'rtl'

  const prevButton = h(
    'button',
    {
      type: 'button',
      class: [
        'carousel__prev',
        !wrapAround && currentSlide.value <= minSlide.value && 'carousel__prev--disabled',
        attrs?.class,
      ],
      'aria-label': i18n['ariaPreviousSlide'],
      onClick: nav.prev,
    },
    slotPrev?.() || h(Icon, { name: isRTL ? 'arrowRight' : 'arrowLeft' })
  )
  const nextButton = h(
    'button',
    {
      type: 'button',
      class: [
        'carousel__next',
        !wrapAround && currentSlide.value >= maxSlide.value && 'carousel__next--disabled',
        attrs?.class,
      ],
      'aria-label': i18n['ariaNextSlide'],
      onClick: nav.next,
    },
    slotNext?.() || h(Icon, { name: isRTL ? 'arrowLeft' : 'arrowRight' })
  )

  return [prevButton, nextButton]
}

export default Navigation
