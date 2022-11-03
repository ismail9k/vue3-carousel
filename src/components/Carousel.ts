import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  reactive,
  provide,
  computed,
  watchEffect,
  h,
  watch,
  nextTick,
  withModifiers,
  cloneVNode,
  VNode,
  SetupContext,
  Ref,
} from 'vue'

import { defaultConfigs } from '@/partials/defaults'
import { carouselProps } from '@/partials/props'
import { CarouselConfig, CarouselNav, ElementStyleObject, Breakpoints } from '@/types'
import {
  debounce,
  throttle,
  getSlidesVNodes,
  getNumberInRange,
  getMaxSlideIndex,
  getMinSlideIndex,
  getSlidesToScroll,
  mapNumberToRange,
} from '@/utils'

import ARIAComponent from './ARIA'
import SlideComponent from './Slide'

export default defineComponent({
  name: 'Carousel',
  props: carouselProps,
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const root: Ref<Element | null> = ref(null)
    const slides: Ref<any> = ref([])
    const slideWidth: Ref<number> = ref(0)
    const slidesCount: Ref<number> = ref(0)
    let breakpoints: Ref<Breakpoints> = ref({})
    // generate carousel configs
    let __defaultConfig: CarouselConfig = { ...defaultConfigs }
    // current config
    const config = reactive<CarouselConfig>({ ...__defaultConfig })

    // slides
    const currentSlideIndex = ref(props.modelValue ?? 0)
    const prevSlideIndex = ref(0)
    const middleSlideIndex = ref(0)
    const maxSlideIndex = ref(0)
    const minSlideIndex = ref(0)

    let autoplayTimer: ReturnType<typeof setInterval> | null
    let transitionTimer: ReturnType<typeof setTimeout> | null

    provide('config', config)
    provide('slidesCount', slidesCount)
    provide('currentSlide', currentSlideIndex)
    provide('maxSlide', maxSlideIndex)
    provide('minSlide', minSlideIndex)
    provide('slideWidth', slideWidth)

    /**
     * Configs
     */
    function initDefaultConfigs(): void {
      // generate carousel configs
      const mergedConfigs = {
        ...props,
        ...props.settings,
      }

      // Set breakpoints
      breakpoints = ref({ ...mergedConfigs.breakpoints })

      // remove extra values
      __defaultConfig = { ...mergedConfigs, settings: undefined, breakpoints: undefined }

      bindConfigs(__defaultConfig)
    }

    function updateBreakpointsConfigs(): void {
      const breakpointsArray: number[] = Object.keys(breakpoints.value)
        .map((key: string): number => Number(key))
        .sort((a: number, b: number) => +b - +a)
      let newConfig = { ...__defaultConfig }

      breakpointsArray.some((breakpoint): boolean => {
        const isMatched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
        if (isMatched) {
          newConfig = {
            ...newConfig,
            ...breakpoints.value[breakpoint],
          }
          return true
        }
        return false
      })

      bindConfigs(newConfig)
    }

    function bindConfigs(newConfig: CarouselConfig): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      Object.entries(newConfig).forEach(([key, val]) => (config[key] = val))
    }

    const handleWindowResize = debounce(() => {
      if (Object.keys(breakpoints.value).length) {
        updateBreakpointsConfigs()
        updateSlidesData()
      }
      updateSlideWidth()
    }, 16)

    /**
     * Setup functions
     */
    function updateSlideWidth(): void {
      if (!root.value) return
      const rect = root.value.getBoundingClientRect()
      slideWidth.value = rect.width / config.itemsToShow
    }

    function updateSlidesData(): void {
      if (slidesCount.value <= 0) return

      middleSlideIndex.value = Math.ceil((slidesCount.value - 1) / 2)
      maxSlideIndex.value = getMaxSlideIndex({ config, slidesCount: slidesCount.value })
      minSlideIndex.value = getMinSlideIndex({ config, slidesCount: slidesCount.value })
      if (!config.wrapAround) {
        currentSlideIndex.value = getNumberInRange({
          val: currentSlideIndex.value,
          max: maxSlideIndex.value,
          min: minSlideIndex.value,
        })
      }
    }

    onMounted((): void => {
      if (Object.keys(breakpoints.value).length) {
        updateBreakpointsConfigs()
      }

      nextTick(() => {
        updateSlidesData()
        updateSlideWidth()
      })

      initAutoplay()

      window.addEventListener('resize', handleWindowResize, { passive: true })
    })

    onUnmounted(() => {
      if (transitionTimer) {
        clearTimeout(transitionTimer)
      }
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
      }

      /**
       * use the same options as in onMounted
       * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#Matching_event_listeners_for_removal
       */
      window.removeEventListener('resize', handleWindowResize, {
        passive: true,
      } as unknown as EventListenerOptions)
    })

    /**
     * Carousel Event listeners
     */
    let isTouch = false
    const startPosition = { x: 0, y: 0 }
    const endPosition = { x: 0, y: 0 }
    const dragged = reactive({ x: 0, y: 0 })
    const isHover = ref(false)

    const handleMouseEnter = (): void => {
      isHover.value = true
    }
    const handleMouseLeave = (): void => {
      isHover.value = false
    }

    function handleDragStart(event: MouseEvent & TouchEvent): void {
      isTouch = event.type === 'touchstart'

      if ((!isTouch && event.button !== 0) || isSliding.value) {
        return
      }

      if (!isTouch) {
        event.preventDefault()
      }

      startPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      startPosition.y = isTouch ? event.touches[0].clientY : event.clientY

      document.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragging, true)
      document.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd, true)
    }

    const handleDragging = throttle((event: MouseEvent & TouchEvent): void => {
      endPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      endPosition.y = isTouch ? event.touches[0].clientY : event.clientY
      const deltaX = endPosition.x - startPosition.x
      const deltaY = endPosition.y - startPosition.y

      dragged.y = deltaY
      dragged.x = deltaX
    }, 16)

    function handleDragEnd(): void {
      const direction = config.dir === 'rtl' ? -1 : 1
      const tolerance = Math.sign(dragged.x) * 0.4
      const draggedSlides =
        Math.round(dragged.x / slideWidth.value + tolerance) * direction

      // Prevent clicking if there is clicked slides
      if (draggedSlides && !isTouch) {
        const captureClick = (e: MouseEvent) => {
          e.stopPropagation()
          window.removeEventListener('click', captureClick, true)
        }
        window.addEventListener('click', captureClick, true)
      }

      slideTo(currentSlideIndex.value - draggedSlides)

      dragged.x = 0
      dragged.y = 0

      document.removeEventListener(
        isTouch ? 'touchmove' : 'mousemove',
        handleDragging,
        true
      )
      document.removeEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd, true)
    }

    /**
     * Autoplay
     */
    function initAutoplay(): void {
      if (!config.autoplay || config.autoplay <= 0) {
        return
      }

      autoplayTimer = setInterval(() => {
        if (config.pauseAutoplayOnHover && isHover.value) {
          return
        }

        next()
      }, config.autoplay)
    }

    function resetAutoplay(): void {
      if (!config.autoplay || config.autoplay <= 0) {
        return
      }

      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }

      initAutoplay()
    }

    /**
     * Navigation function
     */
    const isSliding = ref(false)
    function slideTo(slideIndex: number): void {
      if (currentSlideIndex.value === slideIndex || isSliding.value) {
        return
      }

      isSliding.value = true

      resetAutoplay()
      const currentVal = config.wrapAround
        ? slideIndex
        : getNumberInRange({
            val: slideIndex,
            max: maxSlideIndex.value,
            min: minSlideIndex.value,
          })

      prevSlideIndex.value = currentSlideIndex.value
      currentSlideIndex.value = currentVal

      transitionTimer = setTimeout((): void => {
        const mappedNumber = mapNumberToRange({
          val: currentVal,
          max: maxSlideIndex.value,
          min: 0,
        })

        if (config.wrapAround) {
          currentSlideIndex.value = mappedNumber
        }

        emit('update:modelValue', mappedNumber)

        isSliding.value = false
      }, config.transition)
    }

    function next(): void {
      slideTo(currentSlideIndex.value + config.itemsToScroll)
    }

    function prev(): void {
      slideTo(currentSlideIndex.value - config.itemsToScroll)
    }
    const nav: CarouselNav = { slideTo, next, prev }
    provide('nav', nav)
    provide('isSliding', isSliding)

    /**
     * Track style
     */
    const slidesToScroll = computed(() =>
      getSlidesToScroll({
        config,
        currentSlide: currentSlideIndex.value,
        slidesCount: slidesCount.value,
      })
    )
    provide('slidesToScroll', slidesToScroll)

    const trackStyle = computed((): ElementStyleObject => {
      const direction = config.dir === 'rtl' ? -1 : 1
      const xScroll = slidesToScroll.value * slideWidth.value * direction
      return {
        transform: `translateX(${dragged.x - xScroll}px)`,
        transition: `${isSliding.value ? config.transition : 0}ms`,
        margin: config.wrapAround ? `0 -${slidesCount.value * slideWidth.value}px` : '',
        width: `100%`,
      }
    })

    function initCarousel(): void {
      initDefaultConfigs()
    }

    function restartCarousel(): void {
      initDefaultConfigs()
      updateBreakpointsConfigs()
      updateSlidesData()
      updateSlideWidth()
      resetAutoplay()
    }

    function updateCarousel(): void {
      updateSlidesData()
    }

    // Update the carousel on props change
    Object.keys(carouselProps).forEach((prop) => {
      if (['modelValue'].includes(prop)) return
      watch(() => props[prop as keyof typeof carouselProps], restartCarousel)
    })

    watch(
      () => props['modelValue'],
      (val) => {
        if (val !== currentSlideIndex.value) {
          slideTo(Number(val))
        }
      }
    )

    // Init carousel
    initCarousel()

    watchEffect((): void => {
      // Handel when slides added/removed
      if (slidesCount.value !== slides.value.length) {
        updateCarousel()
      }
    })

    const data = {
      config,
      slidesCount,
      slideWidth,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      middleSlide: middleSlideIndex,
    }
    expose({
      updateBreakpointsConfigs,
      updateSlidesData,
      updateSlideWidth,
      initCarousel,
      restartCarousel,
      updateCarousel,
      slideTo,
      next,
      prev,
      nav,
      data,
    })

    const slotSlides = slots.default || slots.slides
    const slotAddons = slots.addons
    const slotsProps = reactive(data)

    return () => {
      const slidesElements = getSlidesVNodes(slotSlides?.(slotsProps))
      const addonsElements = slotAddons?.(slotsProps) || []
      slidesElements.forEach(
        (el: typeof SlideComponent, index: number) => (el.props.index = index)
      )
      let output = slidesElements
      if (config.wrapAround) {
        const slidesBefore = slidesElements.map((el: VNode, index: number) =>
          cloneVNode(el, { index: -slidesElements.length + index, isClone: true })
        )
        const slidesAfter = slidesElements.map((el: VNode, index: number) =>
          cloneVNode(el, { index: slidesElements.length + index, isClone: true })
        )
        output = [...slidesBefore, ...slidesElements, ...slidesAfter]
      }

      slides.value = slidesElements
      slidesCount.value = Math.max(slidesElements.length, 1)

      const trackEl = h(
        'ol',
        {
          class: 'carousel__track',
          style: trackStyle.value,
          onMousedown: config.mouseDrag
            ? withModifiers(handleDragStart, ['capture'])
            : null,
          onTouchstart: config.touchDrag
            ? withModifiers(handleDragStart, ['capture'])
            : null,
        },
        output
      )
      const viewPortEl = h('div', { class: 'carousel__viewport' }, trackEl)

      return h(
        'section',
        {
          ref: root,
          class: {
            carousel: true,
            'carousel--rtl': config.dir === 'rtl',
          },
          dir: config.dir,
          'aria-label': 'Gallery',
          tabindex: '0',
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements, h(ARIAComponent)]
      )
    }
  },
})
