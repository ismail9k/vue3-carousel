import {
  defineComponent,
  onMounted,
  onUnmounted,
  ref,
  reactive,
  provide,
  computed,
  h,
  watch,
  nextTick,
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
    // current config
    const config = reactive<CarouselConfig>({ ...defaultConfigs })
    // default carousel configs
    let __defaultConfig: CarouselConfig = { ...defaultConfigs }
    // breakpoints configs
    let breakpoints: Breakpoints | undefined

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
      breakpoints = { ...props.breakpoints }
      __defaultConfig = {
        ...__defaultConfig,
        ...props,
        i18n: {
          ...__defaultConfig.i18n,
          ...props.i18n,
        },
        breakpoints: undefined,
      }

      bindConfigs(__defaultConfig)
    }

    function updateBreakpointsConfigs(): void {
      if (!breakpoints || !Object.keys(breakpoints).length) return

      const breakpointsArray: number[] = Object.keys(breakpoints)
        .map((key: string): number => Number(key))
        .sort((a: number, b: number) => +b - +a)

      let newConfig = { ...__defaultConfig }
      breakpointsArray.some((breakpoint): boolean => {
        if (props.breakpointsToContainer) {
          const containerElement = root.value?.parentElement  
          if (containerElement) {
            const containerWidth = containerElement.getBoundingClientRect().width
            const isMatched = containerWidth >= breakpoint
            if (isMatched) {
              newConfig = {
                ...newConfig,
                ...(breakpoints as Breakpoints)[breakpoint],
              }
            }
            return isMatched
          }
        }
        const isMatched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches
        if (isMatched) {
          newConfig = {
            ...newConfig,
            ...(breakpoints as Breakpoints)[breakpoint],
          }
        }
        return isMatched
      })

      bindConfigs(newConfig)
    }

    function bindConfigs(newConfig: CarouselConfig): void {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      Object.entries(newConfig).forEach(([key, val]) => (config[key] = val))
    }

    const handleWindowResize = debounce(() => {
      updateBreakpointsConfigs()
      updateSlidesData()
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
      nextTick(() => updateSlideWidth())
      // Overcome some edge cases
      setTimeout(() => updateSlideWidth(), 1000)

      updateBreakpointsConfigs()
      initAutoplay()
      window.addEventListener('resize', handleWindowResize, { passive: true })
      emit('init')
    })

    onUnmounted(() => {
      if (transitionTimer) {
        clearTimeout(transitionTimer)
      }
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
      }

      window.removeEventListener('resize', handleWindowResize, {
        passive: true,
      } as EventListenerOptions)
    })

    /**
     * Carousel Event listeners
     */
    let isTouch = false
    const startPosition = { x: 0, y: 0 }
    const endPosition = { x: 0, y: 0 }
    const dragged = reactive({ x: 0, y: 0 })
    const isHover = ref(false)
    const isDragging = ref(false)

    const handleMouseEnter = (): void => {
      isHover.value = true
    }
    const handleMouseLeave = (): void => {
      isHover.value = false
    }

    function handleDragStart(event: MouseEvent & TouchEvent): void {
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((event.target as HTMLElement).tagName)
      ) {
        return
      }
      isTouch = event.type === 'touchstart'
      if (!isTouch) {
        event.preventDefault()
      }
      if ((!isTouch && event.button !== 0) || isSliding.value) {
        return
      }

      startPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      startPosition.y = isTouch ? event.touches[0].clientY : event.clientY

      document.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragging, true)
      document.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd, true)
    }

    const handleDragging = throttle((event: MouseEvent & TouchEvent): void => {
      isDragging.value = true

      endPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      endPosition.y = isTouch ? event.touches[0].clientY : event.clientY
      const deltaX = endPosition.x - startPosition.x
      const deltaY = endPosition.y - startPosition.y

      dragged.y = deltaY
      dragged.x = deltaX
    }, config.throttle)

    function handleDragEnd(): void {
      const direction = config.dir === 'rtl' ? -1 : 1
      const tolerance = Math.sign(dragged.x) * 0.4
      const draggedSlides =
        Math.round(dragged.x / slideWidth.value + tolerance) * direction

      // Prevent clicking if there is clicked slides
      if (draggedSlides && !isTouch) {
        const captureClick = (e: MouseEvent) => {
          window.removeEventListener('click', captureClick, true)
        }
        window.addEventListener('click', captureClick, true)
      }

      slideTo(currentSlideIndex.value - draggedSlides)

      dragged.x = 0
      dragged.y = 0

      isDragging.value = false
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
      const currentVal = config.wrapAround
        ? slideIndex
        : getNumberInRange({
            val: slideIndex,
            max: maxSlideIndex.value,
            min: minSlideIndex.value,
          })

      if (currentSlideIndex.value === currentVal || isSliding.value) {
        return
      }

      emit('slide-start', {
        slidingToIndex: slideIndex,
        currentSlideIndex: currentSlideIndex.value,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      isSliding.value = true
      prevSlideIndex.value = currentSlideIndex.value
      currentSlideIndex.value = currentVal

      transitionTimer = setTimeout((): void => {
        if (config.wrapAround) {
          const mappedNumber = mapNumberToRange({
            val: currentVal,
            max: maxSlideIndex.value,
            min: 0,
          })

          if (mappedNumber !== currentSlideIndex.value) {
            currentSlideIndex.value = mappedNumber
            emit('loop', {
              currentSlideIndex: currentSlideIndex.value,
              slidingToIndex: slideIndex,
            })
          }
        }

        emit('update:modelValue', currentSlideIndex.value)
        emit('slide-end', {
          currentSlideIndex: currentSlideIndex.value,
          prevSlideIndex: prevSlideIndex.value,
          slidesCount: slidesCount.value,
        })

        isSliding.value = false
        resetAutoplay()
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

    function restartCarousel(): void {
      initDefaultConfigs()
      updateBreakpointsConfigs()
      updateSlidesData()
      updateSlideWidth()
      resetAutoplay()
    }

    // Update the carousel on props change
    Object.keys(carouselProps).forEach((prop) => {
      if (['modelValue'].includes(prop)) return
      watch(() => props[prop as keyof typeof carouselProps], restartCarousel)
    })

    // Handle changing v-model value
    watch(
      () => props['modelValue'],
      (val) => {
        if (val === currentSlideIndex.value) {
          return
        }
        slideTo(Number(val))
      }
    )

    // Handel when slides added/removed
    watch(slidesCount, updateSlidesData)

    // Init carousel
    emit('before-init')
    initDefaultConfigs()

    const data = {
      config,
      slidesCount,
      slideWidth,
      next,
      prev,
      slideTo,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      middleSlide: middleSlideIndex,
    }
    expose({
      updateBreakpointsConfigs,
      updateSlidesData,
      updateSlideWidth,
      initDefaultConfigs,
      restartCarousel,
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
          cloneVNode(el, {
            index: -slidesElements.length + index,
            isClone: true,
            key: `clone-before-${index}`,
          })
        )
        const slidesAfter = slidesElements.map((el: VNode, index: number) =>
          cloneVNode(el, {
            index: slidesElements.length + index,
            isClone: true,
            key: `clone-after-${index}`,
          })
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
          onMousedownCapture: config.mouseDrag ? handleDragStart : null,
          onTouchstartPassiveCapture: config.touchDrag ? handleDragStart : null,
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
            'is-sliding': isSliding.value,
            'is-dragging': isDragging.value,
            'is-hover': isHover.value,
            'carousel--rtl': config.dir === 'rtl',
          },
          dir: config.dir,
          'aria-label': config.i18n['ariaGallery'],
          tabindex: '0',
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements, h(ARIAComponent)]
      )
    }
  },
})
