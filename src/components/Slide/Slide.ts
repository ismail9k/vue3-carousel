import {
  defineComponent,
  inject,
  h,
  ref,
  SetupContext,
  computed,
  ComputedRef,
  getCurrentInstance,
  onUnmounted,
  provide,
  useId,
  onMounted,
  VNode,
  onUpdated,
  watch,
} from 'vue'

import { injectCarousel } from '@/shared'

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
      default: 0,
    },
  },
  setup(props: SlideProps, { slots, expose }: SetupContext) {
    const carousel = inject(injectCarousel)
    provide(injectCarousel, undefined) // Don't provide for nested slides

    if (!carousel) {
      return () => '' // Don't render, let vue warn about the missing provide
    }

    const index = ref(props.index)
    watch(() => props.index, (i) => index.value = i)

    const isActive: ComputedRef<boolean> = computed(
      () => index.value === carousel.currentSlide
    )
    const isPrev: ComputedRef<boolean> = computed(
      () => index.value === carousel.currentSlide - 1
    )
    const isNext: ComputedRef<boolean> = computed(
      () => index.value === carousel.currentSlide + 1
    )
    const isVisible: ComputedRef<boolean> = computed(
      () =>
        index.value >= Math.floor(carousel.scrolledIndex) &&
        index.value < Math.ceil(carousel.scrolledIndex) + carousel.config.itemsToShow
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

    if (!props.isClone) {
      carousel.registerSlide(
        instance,
        (resolvedIndex: number) => (index.value = resolvedIndex)
      )
      onUnmounted(() => {
        carousel.unregisterSlide(instance)
      })
    } else {
      const makeUnfocusable = (node: VNode) => {
        ;[
          ...(node?.el
            ? node.el.querySelectorAll(
                'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
              )
            : []),
        ]
          .filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'))
          .forEach((el) => el.setAttribute('tabindex', '-1'))
      }
      // Prevent cloned slides from being focusable
      onMounted(() => {
        makeUnfocusable(instance.vnode)
      })
      onUpdated(() => {
        makeUnfocusable(instance.vnode)
      })
    }

    expose({
      id: props.id,
    })

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
            carousel.nav.slideTo(index.value)
          },
          id: props.isClone ? undefined : props.id,
          'aria-hidden': props.isClone || undefined,
        },
        slots.default?.({
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
