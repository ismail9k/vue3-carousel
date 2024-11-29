import { inject, ref, h, reactive } from 'vue'

import { CarouselNav } from '@/components/Carousel'
import { Icon } from '@/components/Icon/'
import { DEFAULT_CONFIG, CarouselConfig } from '@/shared'
import { generateStyleVars } from '@/utils'

import { NavigationProps } from './Navigation.types'

export const Navigation = (props: NavigationProps, { slots, attrs }: any) => {
  const { next: slotNext, prev: slotPrev } = slots || {}
  const config: CarouselConfig = inject('config', reactive({ ...DEFAULT_CONFIG }))
  const maxSlide = inject('maxSlide', ref(1))
  const minSlide = inject('minSlide', ref(1))
  const normalizeDir = inject('normalizeDir', ref('ltr'))
  const currentSlide = inject('currentSlide', ref(1))
  const nav: CarouselNav = inject('nav', {} as CarouselNav)

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

  const { width, height, borderRadius, color, colorHover, background } = props
  const style = generateStyleVars('nav', {
    width,
    height,
    borderRadius,
    color,
    colorHover,
    background,
  })

  const handlePrevClick = () => {
    if (!props.disableOnClick) {
      nav.prev()
    }
  }

  const handleNextClick = () => {
    if (!props.disableOnClick) {
      nav.next()
    }
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
      style,
      'aria-label': i18n['ariaPreviousSlide'],
      title: i18n['ariaPreviousSlide'],
      onClick: handlePrevClick,
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
      style,
      'aria-label': i18n['ariaNextSlide'],
      title: i18n['ariaNextSlide'],
      onClick: handleNextClick,
    },
    slotNext?.() || h(Icon, { name: getNextIcon() })
  )

  return h(
    'div',
    {
      class: 'carousel__navigation-wrapper',
      style,
    },
    [prevButton, nextButton]
  )
}
