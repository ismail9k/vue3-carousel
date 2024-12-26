import {
  defineComponent,
  inject,
  h,
  SetupContext,
  computed,
  ComputedRef,
  getCurrentInstance,
  onUnmounted,
  provide,
  useId,
  onMounted,
  onUpdated,
  DeepReadonly,
  ref,
} from 'vue'

import { injectCarousel } from '@/shared'
import { disableChildrenTabbing } from '@/utils'

import { SlideProps } from './Slide.types'

export const Slide = defineComponent({
  name: 'CarouselSlide',
  props: {
    isClone: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String,
      default: (props: { isClone?: boolean }) => (props.isClone ? undefined : useId()),
    },
    index: {
      type: Number,
      default: undefined,
    },
  },
  setup(props: DeepReadonly<SlideProps>, { slots, expose }: SetupContext) {
    const carousel = inject(injectCarousel)
    provide(injectCarousel, undefined) // Don't provide for nested slides

    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
    }

    const currentIndex = ref(props.index)

    const setIndex = (newIndex: number) => {
      currentIndex.value = newIndex
    }

    expose({
      id: props.id,
      setIndex,
    })

    const isActive: ComputedRef<boolean> = computed(
      () => currentIndex.value === carousel.activeSlide
    )
    const isPrev: ComputedRef<boolean> = computed(
      () => currentIndex.value === carousel.activeSlide - 1
    )
    const isNext: ComputedRef<boolean> = computed(
      () => currentIndex.value === carousel.activeSlide + 1
    )
    const isVisible: ComputedRef<boolean> = computed(
      () =>
        currentIndex.value >= Math.floor(carousel.scrolledIndex) &&
        currentIndex.value <
          Math.ceil(carousel.scrolledIndex) + carousel.config.itemsToShow
    )

    const slideStyle = computed(() => {
      const dimension =
        carousel.config.gap > 0 && carousel.config.itemsToShow > 1
          ? `calc(${100 / carousel.config.itemsToShow}% - ${
              (carousel.config.gap * (carousel.config.itemsToShow - 1)) /
              carousel.config.itemsToShow
            }px)`
          : `${100 / carousel.config.itemsToShow}%`

      return carousel.isVertical ? { height: dimension } : { width: dimension }
    })

    const instance = getCurrentInstance()!

    carousel.slideRegistry.registerSlide(instance, props.index)
    onUnmounted(() => {
      carousel.slideRegistry.unregisterSlide(instance)
    })

    if (props.isClone) {
      // Prevent cloned slides from being focusable
      onMounted(() => {
        disableChildrenTabbing(instance.vnode)
      })
      onUpdated(() => {
        disableChildrenTabbing(instance.vnode)
      })
    }

    return () => {
      if (!carousel.config.enabled) {
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
            'carousel__slide--sliding': carousel.isSliding,
          },
          onFocusin: () => {
            // Prevent the viewport being scrolled by the focus
            if (carousel.viewport) {
              carousel.viewport.scrollLeft = 0
            }
            carousel.nav.slideTo(currentIndex.value)
          },
          id: props.isClone ? undefined : props.id,
          'aria-hidden': props.isClone || undefined,
        },
        slots.default?.({
          currentIndex: currentIndex.value,
          isActive: isActive.value,
          isClone: props.isClone,
          isPrev: isPrev.value,
          isNext: isNext.value,
          isSliding: carousel.isSliding,
          isVisible: isVisible.value,
        })
      )
    }
  },
})
