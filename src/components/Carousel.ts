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

import { DEFAULT_CONFIG } from '@/partials/defaults'
import { carouselProps } from '@/partials/props'
import { CarouselConfig, CarouselNav, ElementStyleObject } from '@/types'
import {
  debounce,
  throttle,
  getSlidesVNodes,
  getNumberInRange,
  getMaxSlideIndex,
  getMinSlideIndex,
  mapNumberToRange,
  getScrolledIndex,
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

    const fallbackConfig = computed(() => ({
      ...DEFAULT_CONFIG,
      ...props,
      i18n: { ...DEFAULT_CONFIG.i18n, ...props.i18n },
      breakpoints: undefined,
    }))

    // current active config
    const config = reactive<CarouselConfig>({ ...fallbackConfig.value })

    // slides
    const currentSlideIndex = ref(props.modelValue ?? 0)
    const prevSlideIndex = ref(0)
    const middleSlideIndex = ref(0)
    const maxSlideIndex = ref(0)
    const minSlideIndex = ref(0)

    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let transitionTimer: ReturnType<typeof setTimeout> | null = null
    let resizeObserver: ResizeObserver | null = null

    const effectiveSlideWidth = computed(() => slideWidth.value + config.gap)

    provide('config', config)
    provide('slidesCount', slidesCount)
    provide('currentSlide', currentSlideIndex)
    provide('maxSlide', maxSlideIndex)
    provide('minSlide', minSlideIndex)
    provide('slideWidth', slideWidth)

    function updateBreakpointsConfig(): void {
      if (!props.breakpoints) return

      // Determine the width source based on the 'breakpointMode' config
      const widthSource =
        (config.breakpointMode === 'carousel'
          ? root.value?.getBoundingClientRect().width
          : window.innerWidth) || 0

      const breakpointsArray = Object.keys(props.breakpoints || {})
        .map((key) => Number(key))
        .sort((a, b) => +b - +a)

      let newConfig = { ...fallbackConfig.value } as CarouselConfig
      breakpointsArray.some((breakpoint) => {
        if (widthSource >= breakpoint) {
          newConfig = { ...newConfig, ...props.breakpoints?.[breakpoint] }
          return true
        }
        return false
      })

      Object.assign(config, newConfig)
    }

    const handleResize = debounce(() => {
      updateBreakpointsConfig()
      updateSlidesData()
      updateSlideWidth()
    }, 16)

    /**
     * Setup functions
     */
    function updateSlideWidth(): void {
      if (!root.value) return
      const rect = root.value.getBoundingClientRect()

      // Calculate the total gap space
      const totalGap = (config.itemsToShow - 1) * config.gap

      // Adjust the slide width to account for the gap
      slideWidth.value = (rect.width - totalGap) / config.itemsToShow
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

      updateBreakpointsConfig()
      initAutoplay()

      window.addEventListener('resize', handleResize, { passive: true })

      resizeObserver = new ResizeObserver(handleResize)
      if (root.value) {
        resizeObserver.observe(root.value)
      }

      emit('init')
    })

    onUnmounted(() => {
      if (transitionTimer) {
        clearTimeout(transitionTimer)
      }
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
      }
      if (resizeObserver && root.value) {
        resizeObserver.unobserve(root.value)
        resizeObserver = null
      }

      window.removeEventListener('resize', handleResize, {
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

      document.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragging)
      document.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd)
    }

    const handleDragging = throttle((event: MouseEvent & TouchEvent): void => {
      isDragging.value = true

      endPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      endPosition.y = isTouch ? event.touches[0].clientY : event.clientY
      const deltaX = endPosition.x - startPosition.x
      const deltaY = endPosition.y - startPosition.y

      dragged.y = deltaY
      dragged.x = deltaX
    })

    function handleDragEnd(): void {
      const direction = config.dir === 'rtl' ? -1 : 1
      const tolerance = Math.sign(dragged.x) * 0.4
      const draggedSlides =
        Math.round(dragged.x / effectiveSlideWidth.value + tolerance) * direction

      // Prevent clicking if there is clicked slides
      if (draggedSlides && !isTouch) {
        const captureClick = (e: MouseEvent) => {
          e.preventDefault()
          window.removeEventListener('click', captureClick)
        }
        window.addEventListener('click', captureClick)
      }

      slideTo(currentSlideIndex.value - draggedSlides)

      dragged.x = 0
      dragged.y = 0

      isDragging.value = false
      document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleDragging)
      document.removeEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd)
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

    const xScroll = computed(() => {
      const direction = config.dir === 'rtl' ? -1 : 1

      const scrolledIndex = getScrolledIndex({
        config,
        currentSlide: currentSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      // Calculate the total scroll offset
      const totalOffset = scrolledIndex * effectiveSlideWidth.value

      return totalOffset * direction
    })

    const trackStyle = computed(
      (): ElementStyleObject => ({
        transform: `translateX(${dragged.x - xScroll.value}px)`,
        transition: `${isSliding.value ? config.transition : 0}ms`,
        margin: config.wrapAround
          ? `0 -${slidesCount.value * effectiveSlideWidth.value}px`
          : '',
        width: `100%`,
        gap: `${config.gap}px`,
      })
    )

    function restartCarousel(): void {
      updateBreakpointsConfig()
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
      updateBreakpointsConfig,
      updateSlidesData,
      updateSlideWidth,
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
