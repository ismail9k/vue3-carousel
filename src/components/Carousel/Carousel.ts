import {
  defineComponent,
  onMounted,
  onBeforeUnmount,
  ref,
  reactive,
  provide,
  computed,
  h,
  watch,
  SetupContext,
  Ref,
  ComputedRef,
  watchEffect,
  shallowReactive,
} from 'vue'

import { ARIA as ARIAComponent } from '@/components/ARIA'
import {
  CarouselConfig,
  DEFAULT_CONFIG,
  DIR_MAP,
  NonNormalizedDir,
  NormalizedDir,
  injectCarousel,
  createSlideRegistry,
} from '@/shared'
import {
  except,
  throttle,
  getNumberInRange,
  mapNumberToRange,
  createCloneSlides,
  getDraggedSlidesCount,
  getSnapAlignOffset,
  getScaleMultipliers,
  ScaleMultipliers,
  toCssValue,
  calculateAverage,
} from '@/utils'

import {
  CarouselData,
  CarouselExposed,
  CarouselNav,
  ElRect,
  InjectedCarousel,
} from './Carousel.types'
import { carouselProps } from './carouselProps'

export const Carousel = defineComponent({
  name: 'VueCarousel',
  props: carouselProps,
  emits: [
    'init',
    'drag',
    'slide-start',
    'loop',
    'update:modelValue',
    'slide-end',
    'before-init',
    'slide-registered',
    'slide-unregistered',
  ],
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const slideRegistry = createSlideRegistry(emit)
    const slides = slideRegistry.getSlides()
    const slidesCount = computed(() => slides.length)

    const root: Ref<Element | null> = ref(null)
    const viewport: Ref<Element | null> = ref(null)
    const slideSize: Ref<number> = ref(0)

    const fallbackConfig = computed(() => ({
      ...DEFAULT_CONFIG,
      // Avoid reactivity tracking in breakpoints and vModel which would trigger unnecessary updates
      ...except(props, ['breakpoints', 'modelValue']),
      i18n: { ...DEFAULT_CONFIG.i18n, ...props.i18n },
    }))

    // current active config
    const config = shallowReactive<CarouselConfig>({ ...fallbackConfig.value })

    // slides
    const currentSlideIndex = ref(props.modelValue ?? 0)
    const activeSlideIndex = ref(currentSlideIndex.value)

    watch(currentSlideIndex, (val) => (activeSlideIndex.value = val))
    const prevSlideIndex = ref(0)
    const middleSlideIndex = computed(() => Math.ceil((slidesCount.value - 1) / 2))
    const maxSlideIndex = computed(() => slidesCount.value - 1)
    const minSlideIndex = computed(() => 0)

    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let transitionTimer: ReturnType<typeof setTimeout> | null = null
    let resizeObserver: ResizeObserver | null = null

    const effectiveSlideSize = computed(() => slideSize.value + config.gap)

    const normalizedDir = computed<NormalizedDir>(() => {
      const dir = config.dir || 'ltr'
      return dir in DIR_MAP ? DIR_MAP[dir as NonNormalizedDir] : (dir as NormalizedDir)
    })

    const isReversed = computed(() => ['rtl', 'btt'].includes(normalizedDir.value))
    const isVertical = computed(() => ['ttb', 'btt'].includes(normalizedDir.value))
    const isAuto = computed(() => config.itemsToShow === 'auto')

    const dimension = computed(() => (isVertical.value ? 'height' : 'width'))

    function updateBreakpointsConfig(): void {
      if (!mounted.value) {
        return
      }
      // Determine the width source based on the 'breakpointMode' config
      const widthSource =
        (fallbackConfig.value.breakpointMode === 'carousel'
          ? root.value?.getBoundingClientRect().width
          : typeof window !== 'undefined'
            ? window.innerWidth
            : 0) || 0

      const breakpointsArray = Object.keys(props.breakpoints || {})
        .map((key) => Number(key))
        .sort((a, b) => +b - +a)

      const newConfig: Partial<CarouselConfig> = {}
      breakpointsArray.some((breakpoint) => {
        if (widthSource >= breakpoint) {
          Object.assign(newConfig, props.breakpoints![breakpoint])
          if (newConfig.i18n) {
            Object.assign(
              newConfig.i18n,
              fallbackConfig.value.i18n,
              props.breakpoints![breakpoint].i18n
            )
          }
          return true
        }
        return false
      })

      Object.assign(config, fallbackConfig.value, newConfig)
    }

    const handleResize = throttle(() => {
      updateBreakpointsConfig()
      updateSlidesData()
      updateSlideSize()
    })

    const transformElements = shallowReactive<Set<HTMLElement>>(new Set())

    /**
     * Setup functions
     */
    const slidesRect = ref<Array<ElRect>>([])
    function updateSlidesRectSize({
      widthMultiplier,
      heightMultiplier,
    }: ScaleMultipliers): void {
      slidesRect.value = slides.map((slide) => {
        const rect = slide.exposed?.getBoundingRect()
        return {
          width: rect.width * widthMultiplier,
          height: rect.height * heightMultiplier,
        }
      })
    }
    const viewportRect: Ref<ElRect> = ref({
      width: 0,
      height: 0,
    })
    function updateViewportRectSize({
      widthMultiplier,
      heightMultiplier,
    }: ScaleMultipliers): void {
      const rect = viewport.value?.getBoundingClientRect() || { width: 0, height: 0 }
      viewportRect.value = {
        width: rect.width * widthMultiplier,
        height: rect.height * heightMultiplier,
      }
    }

    function updateSlideSize(): void {
      if (!viewport.value) return

      const scaleMultipliers = getScaleMultipliers(transformElements)

      updateViewportRectSize(scaleMultipliers)
      updateSlidesRectSize(scaleMultipliers)

      if (isAuto.value) {
        slideSize.value = calculateAverage(
          slidesRect.value.map((slide) => slide[dimension.value])
        )
      } else {
        const itemsToShow = Number(config.itemsToShow)
        const totalGap = (itemsToShow - 1) * config.gap
        slideSize.value = (viewportRect.value[dimension.value] - totalGap) / itemsToShow
      }
    }

    function updateSlidesData(): void {
      if (!config.wrapAround && slidesCount.value > 0) {
        currentSlideIndex.value = getNumberInRange({
          val: currentSlideIndex.value,
          max: maxSlideIndex.value,
          min: minSlideIndex.value,
        })
      }

      // Validate itemsToShow
      if (!isAuto.value) {
        config.itemsToShow = getNumberInRange({
          val: Number(config.itemsToShow),
          max: slidesCount.value,
          min: 1,
        })
      }
    }

    const ignoreAnimations = computed<false | string[]>(() => {
      if (typeof props.ignoreAnimations === 'string') {
        return props.ignoreAnimations.split(',')
      } else if (Array.isArray(props.ignoreAnimations)) {
        return props.ignoreAnimations
      } else if (!props.ignoreAnimations) {
        return []
      }
      return false
    })

    watchEffect(() => updateSlidesData())

    watchEffect(() => {
      // Call updateSlideSize when viewport is ready and track deps
      updateSlideSize()
    })

    let animationInterval: number

    const setAnimationInterval = (event: AnimationEvent) => {
      const target = event.target as HTMLElement
      if (
        !target?.contains(root.value) ||
        (Array.isArray(ignoreAnimations.value) &&
          ignoreAnimations.value.includes(event.animationName))
      ) {
        return
      }

      transformElements.add(target)
      if (!animationInterval) {
        const stepAnimation = () => {
          animationInterval = requestAnimationFrame(() => {
            updateSlideSize()
            stepAnimation()
          })
        }
        stepAnimation()
      }
    }
    const finishAnimation = (event: AnimationEvent | TransitionEvent) => {
      const target = event.target as HTMLElement
      if (target) {
        transformElements.delete(target)
      }
      if (animationInterval && transformElements.size === 0) {
        cancelAnimationFrame(animationInterval)
        updateSlideSize()
      }
    }

    const mounted = ref(false)

    if (typeof document !== 'undefined') {
      watchEffect(() => {
        if (mounted.value && ignoreAnimations.value !== false) {
          document.addEventListener('animationstart', setAnimationInterval)
          document.addEventListener('animationend', finishAnimation)
        } else {
          document.removeEventListener('animationstart', setAnimationInterval)
          document.removeEventListener('animationend', finishAnimation)
        }
      })
    }

    onMounted((): void => {
      mounted.value = true
      updateBreakpointsConfig()
      initAutoplay()

      if (root.value) {
        resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(root.value)
      }

      emit('init')
    })

    onBeforeUnmount(() => {
      mounted.value = false

      slideRegistry.cleanup()

      if (transitionTimer) {
        clearTimeout(transitionTimer)
      }
      if (animationInterval) {
        cancelAnimationFrame(animationInterval)
      }
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
        resizeObserver = null
      }

      if (typeof document !== 'undefined') {
        handleBlur()
      }
      if (root.value) {
        root.value.removeEventListener('transitionend', updateSlideSize)
        root.value.removeEventListener('animationiteration', updateSlideSize)
      }
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

    const handleArrowKeys = throttle((event: KeyboardEvent): void => {
      if (event.ctrlKey) return
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (isVertical.value === event.key.endsWith('Up')) {
            if (isReversed.value) {
              next(true)
            } else {
              prev(true)
            }
          }
          break
        case 'ArrowRight':
        case 'ArrowDown':
          if (isVertical.value === event.key.endsWith('Down')) {
            if (isReversed.value) {
              prev(true)
            } else {
              next(true)
            }
          }
          break
      }
    }, 200)
    const handleFocus = (): void => {
      document.addEventListener('keydown', handleArrowKeys)
    }
    const handleBlur = (): void => {
      document.removeEventListener('keydown', handleArrowKeys)
    }

    function handleDragStart(event: MouseEvent | TouchEvent): void {
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
        if ((event as MouseEvent).button !== 0) {
          // Ignore non-left-click mouse events
          return
        }
      }

      // Initialize start positions for the drag
      startPosition.x = 'touches' in event ? event.touches[0].clientX : event.clientX
      startPosition.y = 'touches' in event ? event.touches[0].clientY : event.clientY

      // Attach event listeners for dragging and drag end

      const moveEvent = isTouch ? 'touchmove' : 'mousemove'
      const endEvent = isTouch ? 'touchend' : 'mouseup'
      document.addEventListener(moveEvent, handleDragging, { passive: false })
      document.addEventListener(endEvent, handleDragEnd, { passive: true })
    }

    const handleDragging = throttle((event: TouchEvent | MouseEvent): void => {
      isDragging.value = true

      // Get the current position based on the interaction type (touch or mouse)
      const currentX = 'touches' in event ? event.touches[0].clientX : event.clientX
      const currentY = 'touches' in event ? event.touches[0].clientY : event.clientY

      // Calculate deltas for X and Y axes
      dragged.x = currentX - startPosition.x
      dragged.y = currentY - startPosition.y

      const draggedSlides = getDraggedSlidesCount({
        isVertical: isVertical.value,
        isReversed: isReversed.value,
        dragged,
        effectiveSlideSize: effectiveSlideSize.value,
      })

      activeSlideIndex.value = config.wrapAround
        ? currentSlideIndex.value + draggedSlides
        : getNumberInRange({
            val: currentSlideIndex.value + draggedSlides,
            max: maxSlideIndex.value,
            min: minSlideIndex.value,
          })

      // Emit a drag event for further customization if needed
      emit('drag', { deltaX: dragged.x, deltaY: dragged.y })
    })

    function handleDragEnd(): void {
      handleDragging.cancel()

      // Prevent accidental clicks when there is a slide drag
      if (activeSlideIndex.value !== currentSlideIndex.value && !isTouch) {
        const preventClick = (e: MouseEvent) => {
          e.preventDefault()
          window.removeEventListener('click', preventClick)
        }
        window.addEventListener('click', preventClick)
      }

      slideTo(activeSlideIndex.value)

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

    function stopAutoplay(): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    }

    function resetAutoplay(): void {
      stopAutoplay()
      initAutoplay()
    }

    /**
     * Navigation function
     */
    const isSliding = ref(false)

    function slideTo(slideIndex: number, skipTransition = false): void {
      if (!skipTransition && isSliding.value) {
        return
      }

      let targetIndex = slideIndex
      let mappedIndex = slideIndex

      prevSlideIndex.value = currentSlideIndex.value

      if (!config.wrapAround) {
        targetIndex = getNumberInRange({
          val: targetIndex,
          max: maxSlideIndex.value,
          min: minSlideIndex.value,
        })
      } else {
        mappedIndex = mapNumberToRange({
          val: targetIndex,
          max: maxSlideIndex.value,
          min: minSlideIndex.value,
        })
      }

      emit('slide-start', {
        slidingToIndex: slideIndex,
        currentSlideIndex: currentSlideIndex.value,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      stopAutoplay()
      isSliding.value = true

      currentSlideIndex.value = targetIndex
      if (mappedIndex !== targetIndex) {
        modelWatcher.pause()
      }
      emit('update:modelValue', mappedIndex)

      const transitionCallback = (): void => {
        if (config.wrapAround && mappedIndex !== targetIndex) {
          modelWatcher.resume()

          currentSlideIndex.value = mappedIndex
          emit('loop', {
            currentSlideIndex: currentSlideIndex.value,
            slidingToIndex: slideIndex,
          })
        }

        emit('slide-end', {
          currentSlideIndex: currentSlideIndex.value,
          prevSlideIndex: prevSlideIndex.value,
          slidesCount: slidesCount.value,
        })

        isSliding.value = false
        resetAutoplay()
      }

      transitionTimer = setTimeout(transitionCallback, config.transition)
    }

    function next(skipTransition = false): void {
      slideTo(currentSlideIndex.value + config.itemsToScroll, skipTransition)
    }

    function prev(skipTransition = false): void {
      slideTo(currentSlideIndex.value - config.itemsToScroll, skipTransition)
    }

    function restartCarousel(): void {
      updateBreakpointsConfig()
      updateSlidesData()
      updateSlideSize()
      resetAutoplay()
    }

    // Update the carousel on props change
    watch(
      () => [fallbackConfig.value, props.breakpoints],
      () => updateBreakpointsConfig(),
      { deep: true }
    )

    watch(
      () => props.autoplay,
      () => resetAutoplay()
    )

    // Handle changing v-model value
    const modelWatcher = watch(
      () => props.modelValue,
      (val) => {
        if (val === currentSlideIndex.value) {
          return
        }
        slideTo(Number(val), true)
      }
    )

    // Init carousel
    emit('before-init')

    const clonedSlidesCount = computed(() => {
      if (!config.wrapAround) {
        return { before: 0, after: 0 }
      }
      if (isAuto.value) {
        return { before: slides.length, after: slides.length }
      }

      const itemsToShow = Number(config.itemsToShow)
      const slidesToClone = Math.ceil(itemsToShow + (config.itemsToScroll - 1))
      const before = slidesToClone - activeSlideIndex.value
      const after = slidesToClone - (slidesCount.value - (activeSlideIndex.value + 1))

      return {
        before: Math.max(0, before),
        after: Math.max(0, after),
      }
    })

    const clonedSlidesOffset = computed(() => {
      if (!clonedSlidesCount.value.before) {
        return 0
      }
      if (isAuto.value) {
        return (
          slidesRect.value
            .slice(-1 * clonedSlidesCount.value.before)
            .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) * -1
        )
      }

      return clonedSlidesCount.value.before * effectiveSlideSize.value * -1
    })

    const snapAlignOffset = computed(() => {
      if (isAuto.value) {
        const slideIndex =
          ((currentSlideIndex.value % slides.length) + slides.length) % slides.length
        return getSnapAlignOffset({
          slideSize: slidesRect.value[slideIndex]?.[dimension.value],
          viewportSize: viewportRect.value[dimension.value],
          align: config.snapAlign,
        })
      }

      return getSnapAlignOffset({
        align: config.snapAlign,
        itemsToShow: +config.itemsToShow,
      })
    })
    const scrolledOffset = computed(() => {
      let output = 0

      if (isAuto.value) {
        if (currentSlideIndex.value < 0) {
          output =
            slidesRect.value
              .slice(currentSlideIndex.value)
              .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) * -1
        } else {
          output = slidesRect.value
            .slice(0, currentSlideIndex.value)
            .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0)
        }
        output -= snapAlignOffset.value

        // remove whitespace
        if (!config.wrapAround) {
          const maxSlidingValue =
            slidesRect.value.reduce(
              (acc, slide) => acc + slide[dimension.value] + config.gap,
              0
            ) -
            viewportRect.value[dimension.value] -
            config.gap

          output = getNumberInRange({
            val: output,
            max: maxSlidingValue,
            min: 0,
          })
        }
      } else {
        let scrolledSlides = currentSlideIndex.value - snapAlignOffset.value

        // remove whitespace
        if (!config.wrapAround) {
          scrolledSlides = getNumberInRange({
            val: scrolledSlides,
            max: slidesCount.value - +config.itemsToShow,
            min: 0,
          })
        }
        output = scrolledSlides * effectiveSlideSize.value
      }

      return output * (isReversed.value ? 1 : -1)
    })

    const visibleRange = computed(() => {
      if (!isAuto.value) {
        const base = currentSlideIndex.value - snapAlignOffset.value
        if (config.wrapAround) {
          return {
            min: Math.floor(base),
            max: Math.ceil(base + Number(config.itemsToShow) - 1),
          }
        }
        return {
          min: Math.floor(
            getNumberInRange({
              val: base,
              max: slidesCount.value - Number(config.itemsToShow),
              min: 0,
            })
          ),
          max: Math.ceil(
            getNumberInRange({
              val: base + Number(config.itemsToShow) - 1,
              max: slidesCount.value - 1,
              min: 0,
            })
          ),
        }
      }

      // Auto width mode
      let minIndex = 0
      {
        let accumulatedSize = 0
        let index = 0 - clonedSlidesCount.value.before
        const offset = Math.abs(scrolledOffset.value + clonedSlidesOffset.value)

        while (accumulatedSize <= offset) {
          const normalizedIndex =
            ((index % slides.length) + slides.length) % slides.length
          accumulatedSize +=
            slidesRect.value[normalizedIndex]?.[dimension.value] + config.gap
          index++
        }
        minIndex = index - 1
      }

      let maxIndex = 0
      {
        let index = minIndex
        let accumulatedSize = 0
        if (index < 0) {
          accumulatedSize =
            slidesRect.value
              .slice(0, index)
              .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) -
            Math.abs(scrolledOffset.value + clonedSlidesOffset.value)
        } else {
          accumulatedSize =
            slidesRect.value
              .slice(0, index)
              .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) -
            Math.abs(scrolledOffset.value)
        }

        while (accumulatedSize < viewportRect.value[dimension.value]) {
          const normalizedIndex =
            ((index % slides.length) + slides.length) % slides.length
          accumulatedSize +=
            slidesRect.value[normalizedIndex]?.[dimension.value] + config.gap
          index++
        }
        maxIndex = index - 1
      }

      return {
        min: Math.floor(minIndex),
        max: Math.ceil(maxIndex),
      }
    })

    const trackTransform: ComputedRef<string | undefined> = computed(() => {
      if (config.slideEffect === 'fade') {
        return undefined
      }

      const translateAxis = isVertical.value ? 'Y' : 'X'

      // Include user drag interaction offset
      const dragOffset = isVertical.value ? dragged.y : dragged.x

      let totalOffset = scrolledOffset.value + dragOffset

      if (!config.wrapAround && config.preventExcessiveDragging) {
        let maxSlidingValue = 0
        if (isAuto.value) {
          maxSlidingValue = slidesRect.value.reduce(
            (acc, slide) => acc + slide[dimension.value],
            0
          )
        } else {
          maxSlidingValue =
            (slidesCount.value - Number(config.itemsToShow)) * effectiveSlideSize.value
        }
        const min = isReversed.value ? 0 : -1 * maxSlidingValue
        const max = isReversed.value ? maxSlidingValue : 0
        totalOffset = getNumberInRange({
          val: totalOffset,
          min,
          max,
        })
      }
      return `translate${translateAxis}(${totalOffset}px)`
    })

    const carouselStyle = computed(() => ({
      '--vc-transition-duration': isSliding.value
        ? toCssValue(config.transition, 'ms')
        : undefined,
      '--vc-slide-gap': toCssValue(config.gap),
      '--vc-carousel-height': toCssValue(config.height),
      '--vc-cloned-offset': toCssValue(clonedSlidesOffset.value),
    }))

    const nav: CarouselNav = { slideTo, next, prev }

    const provided: InjectedCarousel = reactive({
      config,
      slidesCount,
      viewport,
      slides,
      currentSlide: currentSlideIndex,
      activeSlide: activeSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      visibleRange,
      slideSize,
      isVertical,
      normalizedDir,
      nav,
      isSliding,
      slideRegistry,
    })

    provide(injectCarousel, provided)

    const data = reactive<CarouselData>({
      config,
      slidesCount,
      slideSize,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      middleSlide: middleSlideIndex,
    })

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

    return () => {
      const slotSlides = slots.default || slots.slides
      const outputSlides = slotSlides?.(data) || []

      const { before, after } = clonedSlidesCount.value
      const slidesBefore = createCloneSlides({
        slides,
        position: 'before',
        toShow: before,
      })

      const slidesAfter = createCloneSlides({
        slides,
        position: 'after',
        toShow: after,
      })

      const output = [...slidesBefore, ...outputSlides, ...slidesAfter]

      if (!config.enabled || !output.length) {
        return h(
          'section',
          {
            ref: root,
            class: ['carousel', 'is-disabled'],
          },
          output
        )
      }

      const addonsElements = slots.addons?.(data) || []

      const trackEl = h(
        'ol',
        {
          class: 'carousel__track',
          style: { transform: trackTransform.value },
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
            `is-${normalizedDir.value}`,
            `is-effect-${config.slideEffect}`,
            {
              'is-vertical': isVertical.value,
              'is-sliding': isSliding.value,
              'is-dragging': isDragging.value,
              'is-hover': isHover.value,
            },
          ],
          dir: normalizedDir.value,
          style: carouselStyle.value,
          'aria-label': config.i18n['ariaGallery'],
          tabindex: '0',
          onFocus: handleFocus,
          onBlur: handleBlur,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements, h(ARIAComponent)]
      )
    }
  },
})
