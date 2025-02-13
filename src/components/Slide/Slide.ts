import {
  ComputedRef,
  computed,
  defineComponent,
  DeepReadonly,
  getCurrentInstance,
  h,
  inject,
  onMounted,
  onUnmounted,
  onUpdated,
  provide,
  ref,
  SetupContext,
  useId,
} from 'vue'

import { injectCarousel } from '@/shared'
import { disableChildrenTabbing } from '@/utils'

import { SlideProps } from './Slide.types'

export const Slide = defineComponent({
  name: 'CarouselSlide',
  props: {
    id: {
      type: String,
      default: (props: { isClone?: boolean }) => (props.isClone ? undefined : useId()),
    },
    index: {
      type: Number,
      default: undefined,
    },
    isClone: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: DeepReadonly<SlideProps>, { attrs, slots, expose }: SetupContext) {
    const carousel = inject(injectCarousel)
    provide(injectCarousel, undefined) // Don't provide for nested slides

    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
    }

    const currentIndex = ref(props.index)

    const setIndex = (newIndex: number) => {
      currentIndex.value = newIndex
    }

    const instance = getCurrentInstance()!

    const getBoundingRect = () => {
      const el = instance.vnode.el as HTMLElement
      return el ? el.getBoundingClientRect() : { width: 0, height: 0 }
    }

    expose({
      id: props.id,
      setIndex,
      getBoundingRect,
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
        currentIndex.value >= carousel.visibleRange.min &&
        currentIndex.value <= carousel.visibleRange.max
    )

    const slideStyle = computed(() => {
      if (carousel.config.itemsToShow === 'auto') {
        return
      }
      const itemsToShow = carousel.config.itemsToShow
      const dimension =
        carousel.config.gap > 0 && itemsToShow > 1
          ? `calc(${100 / itemsToShow}% - ${
              (carousel.config.gap * (itemsToShow - 1)) / itemsToShow
            }px)`
          : `${100 / itemsToShow}%`

      return carousel.isVertical ? { height: dimension } : { width: dimension }
    })

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
          style: [attrs.style, { ...slideStyle.value }],
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
