import {
  defineComponent,
  inject,
  ref,
  h,
  reactive,
  SetupContext,
  computed,
  ComputedRef,
} from 'vue'

import { CarouselConfig, DEFAULT_CONFIG } from '@/shared'

import { SlideProps } from './Slide.types'

export const Slide = defineComponent({
  name: 'CarouselSlide',
  props: {
    index: {
      type: Number,
      default: 1,
    },
    isClone: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: SlideProps, { slots }: SetupContext) {
    const config: CarouselConfig = inject('config', reactive({ ...DEFAULT_CONFIG }))
    const currentSlide = inject('currentSlide', ref(0))
    const slidesToScroll = inject('slidesToScroll', ref(0))
    const isSliding = inject('isSliding', ref(false))
    const isVertical = inject('isVertical', ref(false))
    const slideSize = inject('slideSize', ref(0))

    const isActive: ComputedRef<boolean> = computed(
      () => props.index === currentSlide.value
    )
    const isPrev: ComputedRef<boolean> = computed(
      () => props.index === currentSlide.value - 1
    )
    const isNext: ComputedRef<boolean> = computed(
      () => props.index === currentSlide.value + 1
    )
    const isVisible: ComputedRef<boolean> = computed(() => {
      const min = Math.floor(slidesToScroll.value)
      const max = Math.ceil(slidesToScroll.value + config.itemsToShow - 1)
      const index = props.index ?? 0

      return index >= min && index <= max
    })

    const slideStyle: ComputedRef<Record<string, string>> = computed(() => {
      const dimension = config.gap
        ? `${slideSize.value}px`
        : `${100 / config.itemsToShow}%`

      return isVertical.value
        ? { height: dimension, width: '' }
        : { width: dimension, height: '' }
    })

    return () => {
      if (!config.enabled) {
        return slots.default?.()
      }

      return h(
        'li',
        {
          style: slideStyle.value,
          class: {
            carousel__slide: true,
            'carousel__slide--clone': props.isClone,
            'carousel__slide--visible': isVisible.value,
            'carousel__slide--active': isActive.value,
            'carousel__slide--prev': isPrev.value,
            'carousel__slide--next': isNext.value,
            'carousel__slide--sliding': isSliding.value,
          },
          'aria-hidden': !isVisible.value,
        },
        slots.default?.({
          isActive: isActive.value,
          isClone: props.isClone,
          isPrev: isPrev.value,
          isNext: isNext.value,
          isSliding: isSliding.value,
          isVisible: isVisible.value,
        })
      )
    }
  },
})
