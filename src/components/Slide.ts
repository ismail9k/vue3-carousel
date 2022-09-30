import { defineComponent, inject, ref, computed, h, reactive } from 'vue'

import { defaultConfigs } from '@/partials/defaults'

import { SetupContext, CarouselConfig, ElementStyleObject } from '@/types'

export default defineComponent({
  name: 'CarouselSlide',
  props: {
    index: {
      type: Number,
      default: 1,
    },
  },
  setup(props, { slots }: SetupContext) {
    const config: CarouselConfig = inject('config', reactive({ ...defaultConfigs }))
    const currentSlide = inject('currentSlide', ref(0))
    const slidesToScroll = inject('slidesToScroll', ref(0))

    const slideStyle = computed((): ElementStyleObject => {
      const items = config.itemsToShow
      const width = `${(1 / items) * 100}%`
      return {
        width,
      }
    })

    const isActive = (): boolean => props.index === currentSlide.value
    const isVisible = (): boolean => {
      const min = Math.ceil(slidesToScroll.value)
      const max = Math.floor(slidesToScroll.value + config.itemsToShow)

      return currentSlide.value >= min && currentSlide.value <= max
    }
    const isPrev = (): boolean => props.index === currentSlide.value - 1
    const isNext = (): boolean => props.index === currentSlide.value + 1
    return () =>
      h(
        'li',
        {
          style: slideStyle.value,
          class: {
            'carousel_slide--clone': true,
            carousel__slide: true,
            'carousel__slide--active': isActive(),
            'carousel__slide--visible': isVisible(),
            'carousel__slide--prev': isPrev(),
            'carousel__slide--next': isNext(),
          },
        },
        slots.default?.()
      )
  },
})
