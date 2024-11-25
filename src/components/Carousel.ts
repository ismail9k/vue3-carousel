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
  ComputedRef,
} from 'vue'

import { DEFAULT_CONFIG } from '@/partials/defaults'
import { carouselProps } from '@/partials/props'
import { CarouselConfig, CarouselExposed, CarouselNav } from '@/types'
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
  emits: [
    'init',
    'drag',
    'slide-start',
    'loop',
    'update:modelValue',
    'slide-end',
    'before-init',
  ],
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const root: Ref<Element | null> = ref(null)
    const viewport: Ref<Element | null> = ref(null)
    const slides: Ref<any> = ref([])
    const slideSize: Ref<number> = ref(0)
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

    const effectiveSlideSize = computed(() => slideSize.value + config.gap)

    const normalizeDir = computed((): string => {
      const dir = config.dir || 'lrt'
      const dirMap: Record<string, string> = {
        'left-to-right': 'ltr',
        'right-to-left': 'rtl',
        'top-to-bottom': 'ttb',
        'bottom-to-top': 'btt',
      }

      return dirMap[dir] || dir
    })

    const isVertical = computed(() => ['ttb', 'btt'].includes(normalizeDir.value))

    provide('config', config)
    provide('slidesCount', slidesCount)
    provide('currentSlide', currentSlideIndex)
    provide('maxSlide', maxSlideIndex)
    provide('minSlide', minSlideIndex)
    provide('slideSize', slideSize)
    provide('isVertical', isVertical)
    provide('normalizeDir', normalizeDir)

    function updateBreakpointsConfig(): void {
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
      updateSlideSize()
    }, 16)

    /**
     * Setup functions
     */
    function updateSlideSize(): void {
      if (!viewport.value) return
      const rect = viewport.value.getBoundingClientRect()

      // Calculate the total gap space
      const totalGap = (config.itemsToShow - 1) * config.gap

      // Calculate size based on orientation
      if (isVertical.value) {
        slideSize.value = (rect.height - totalGap) / config.itemsToShow
      } else {
        slideSize.value = (rect.width - totalGap) / config.itemsToShow
      }
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
      nextTick(() => updateSlideSize())
      // Overcome some edge cases
      setTimeout(() => updateSlideSize(), 1000)

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
      // Prevent drag initiation on input elements or if already sliding
      const targetTagName = (event.target as HTMLElement).tagName
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(targetTagName) || isSliding.value) {
        return
      }

      // Detect if the event is a touchstart or mousedown event
      isTouch = event.type === 'touchstart'

      // For mouse events, prevent default to avoid text selection
      if (!isTouch) {
        event.preventDefault()
        if (event.button !== 0) {
          // Ignore non-left-click mouse events
          return
        }
      }

      // Initialize start positions for the drag
      startPosition.x = isTouch ? event.touches[0].clientX : event.clientX
      startPosition.y = isTouch ? event.touches[0].clientY : event.clientY

      // Attach event listeners for dragging and drag end

      const moveEvent = isTouch ? 'touchmove' : 'mousemove'
      const endEvent = isTouch ? 'touchend' : 'mouseup'
      document.addEventListener(moveEvent, handleDragging, { passive: false })
      document.addEventListener(endEvent, handleDragEnd, { passive: true })
    }

    const handleDragging = throttle((event: MouseEvent & TouchEvent): void => {
      isDragging.value = true

      // Get the current position based on the interaction type (touch or mouse)
      const currentX = isTouch ? event.touches[0].clientX : event.clientX
      const currentY = isTouch ? event.touches[0].clientY : event.clientY

      // Calculate deltas for X and Y axes
      const deltaX = currentX - startPosition.x
      const deltaY = currentY - startPosition.y

      // Update dragged state reactively
      dragged.x = deltaX
      dragged.y = deltaY

      // Emit a drag event for further customization if needed
      emit('drag', { deltaX, deltaY })
    })

    function handleDragEnd(): void {
      // Determine the active axis and direction multiplier
      const dragAxis = isVertical.value ? 'y' : 'x'
      const directionMultiplier = ['rtl', 'btt'].includes(normalizeDir.value) ? -1 : 1

      // Calculate dragged slides with a tolerance to account for incomplete drags
      const tolerance = Math.sign(dragged[dragAxis]) * 0.4 // Smooth out small drags
      const draggedSlides =
        Math.round(dragged[dragAxis] / effectiveSlideSize.value + tolerance) *
        directionMultiplier

      // Prevent accidental clicks when there is a slide drag
      if (draggedSlides && !isTouch) {
        const preventClick = (e: MouseEvent) => {
          e.preventDefault()
          window.removeEventListener('click', preventClick)
        }
        window.addEventListener('click', preventClick)
      }

      // Slide to the appropriate slide index
      const targetSlideIndex = currentSlideIndex.value - draggedSlides
      slideTo(targetSlideIndex)

      // Reset drag state
      dragged.x = 0
      dragged.y = 0
      isDragging.value = false

      const moveEvent = isTouch ? 'touchmove' : 'mousemove'
      const endEvent = isTouch ? 'touchend' : 'mouseup'
      document.removeEventListener(moveEvent, handleDragging)
      document.removeEventListener(endEvent, handleDragEnd)
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

    function restartCarousel(): void {
      updateBreakpointsConfig()
      updateSlidesData()
      updateSlideSize()
      resetAutoplay()
    }

    // Update the carousel on props change
    watch(() => ({ ...props }), restartCarousel, { deep: true })

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
      slideSize,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      middleSlide: middleSlideIndex,
    }

    expose<CarouselExposed>({
      updateBreakpointsConfig,
      updateSlidesData,
      updateSlideSize,
      restartCarousel,
      slideTo,
      next,
      prev,
      nav,
      data,
    })

    /**
     * Track style
     */
    const trackTransform: ComputedRef<string> = computed(() => {
      // Calculate the scrolled index with wrapping offset if applicable
      const scrolledIndex = getScrolledIndex({
        config,
        currentSlide: currentSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      const cloneOffset = config.wrapAround ? slidesCount.value : 0

      // Determine direction multiplier for orientation
      const isReverseDirection = ['rtl', 'btt'].includes(normalizeDir.value)
      const directionMultiplier = isReverseDirection ? -1 : 1

      // Calculate the total offset for slide transformation
      const totalOffset =
        (scrolledIndex + cloneOffset) * effectiveSlideSize.value * directionMultiplier

      // Include user drag interaction offset
      const dragOffset = isVertical.value ? dragged.y : dragged.x

      // Generate the appropriate CSS transformation
      const translateAxis = isVertical.value ? 'Y' : 'X'
      return `translate${translateAxis}(${dragOffset - totalOffset}px)`
    })

    const slotSlides = slots.default || slots.slides
    const slotAddons = slots.addons
    const slotsProps = reactive(data)

    return () => {
      if (!config.enabled) {
        return h(
          'section',
          {
            ref: root,
            class: ['carousel', 'is-disabled'],
          },
          slotSlides?.()
        )
      }

      const slidesElements = getSlidesVNodes(slotSlides?.(slotsProps))
      const addonsElements = slotAddons?.(slotsProps) || []
      slidesElements.forEach((el: typeof SlideComponent, index: number) => {
        if (el.props) {
          el.props.index = index
        } else {
          el.props = { index }
        }
      })
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
          style: {
            transform: trackTransform.value,
            transition: `${isSliding.value ? config.transition : 0}ms`,
            gap: `${config.gap}px`,
          },
          onMousedownCapture: config.mouseDrag ? handleDragStart : null,
          onTouchstartPassiveCapture: config.touchDrag ? handleDragStart : null,
        },
        output
      )
      const viewPortEl = h('div', { class: 'carousel__viewport', ref: viewport }, trackEl)

      return h(
        'section',
        {
          ref: root,
          class: [
            'carousel',
            `is-${normalizeDir.value}`,
            {
              'is-vertical': isVertical.value,
              'is-sliding': isSliding.value,
              'is-dragging': isDragging.value,
              'is-hover': isHover.value,
            },
          ],
          style: {
            '--vc-trk-height': `${
              typeof config.height === 'number' ? `${config.height}px` : config.height
            }`,
          },
          dir: normalizeDir.value,
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
