import { inject, ref, h, reactive } from 'vue'

import { DEFAULT_CONFIG } from '@/partials/defaults'

import { CarouselNav, CarouselConfig } from '../types'

import Icon from './Icon'

const Navigation = (props: any, { slots, attrs }: any) => {
  const { next: slotNext, prev: slotPrev } = slots || {}
  const config: CarouselConfig = inject('config', reactive({ ...DEFAULT_CONFIG }))
  const maxSlide = inject('maxSlide', ref(1))
  const minSlide = inject('minSlide', ref(1))
  const normalizeDir = inject('normalizeDir', ref('ltr'))
  const currentSlide = inject('currentSlide', ref(1))
  const nav: CarouselNav = inject('nav', {})

  const { wrapAround, i18n } = config
  const getPrevIcon = (): string => {
    const directionIcons: Record<string, string> = {
      ltr: 'arrowLeft',
      rtl: 'arrowRight',
      ttb: 'arrowUp',
      btt: 'arrowDown',
    }

    return directionIcons[normalizeDir.value]
  }
  const getNextIcon = (): string => {
    const directionIcons: Record<string, string> = {
      ltr: 'arrowRight',
      rtl: 'arrowLeft',
      ttb: 'arrowDown',
      btt: 'arrowUp',
    }

    return directionIcons[normalizeDir.value]
  }

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
      title: i18n['ariaPreviousSlide'],
      onClick: nav.prev,
    },
    slotPrev?.() || h(Icon, { name: getPrevIcon() })
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
      title: i18n['ariaNextSlide'],
      onClick: nav.next,
    },
    slotNext?.() || h(Icon, { name: getNextIcon() })
  )

  return [prevButton, nextButton]
}

export default Navigation
