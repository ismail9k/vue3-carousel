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
  VNode,
  SetupContext,
  Ref,
  ComputedRef,
  ComponentInternalInstance,
  watchEffect,
  shallowReactive,
  pushScopeId,
  popScopeId,
} from 'vue'

import { ARIA as ARIAComponent } from '@/components/ARIA'
import {
  CarouselConfig,
  DEFAULT_CONFIG,
  DIR_MAP,
  NonNormalizedDir,
  NormalizedDir,
  injectCarousel,
} from '@/shared'
import {
  throttle,
  getNumberInRange,
  getMaxSlideIndex,
  getMinSlideIndex,
  mapNumberToRange,
  getScrolledIndex,
  getTransformValues,
  createCloneSlides,
} from '@/utils'

import {
  CarouselData,
  CarouselExposed,
  CarouselNav,
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
  ],
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const root: Ref<Element | null> = ref(null)
    const viewport: Ref<Element | null> = ref(null)
    const slides = shallowReactive<Array<ComponentInternalInstance>>([])
    const slideSize: Ref<number> = ref(0)
    const slidesCount = computed(() => slides.length)

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
    const middleSlideIndex = computed(() => Math.ceil((slidesCount.value - 1) / 2))
    const maxSlideIndex = computed(() => {
      return getMaxSlideIndex({ config, slidesCount: slidesCount.value })
    })
    const minSlideIndex = computed(() => {
      return getMinSlideIndex({ config, slidesCount: slidesCount.value })
    })

    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let transitionTimer: ReturnType<typeof setTimeout> | null = null
    let resizeObserver: ResizeObserver | null = null

    const effectiveSlideSize = computed(() => slideSize.value + config.gap)

    const normalizedDir = computed<NormalizedDir>(() => {
      const dir = config.dir || 'ltr'
      return dir in DIR_MAP ? DIR_MAP[dir as NonNormalizedDir] : (dir as NormalizedDir)
    })

    const indexCbs: Array<(index: number) => void> = []
    const registerSlide: InjectedCarousel['registerSlide'] = (slide, indexCb) => {
      indexCb(slides.length)
      slides.push(slide)
      indexCbs.push(indexCb)
    }

    const unregisterSlide: InjectedCarousel['unregisterSlide'] = (slide) => {
      const found = slides.indexOf(slide)
      if (found >= 0) {
        slides.splice(found, 1)
        indexCbs.splice(found, 1)
        // Update indexes after the one that was removed
        indexCbs.slice(found).forEach((cb, index) => cb(found + index))
      }
    }

    const isReversed = computed(() => ['rtl', 'btt'].includes(normalizedDir.value))
    const isVertical = computed(() => ['ttb', 'btt'].includes(normalizedDir.value))

    const clonedSlidesCount = computed(() => Math.ceil(config.itemsToShow) + 1)

    function updateBreakpointsConfig(): void {
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

    const totalGap = computed(() => (config.itemsToShow - 1) * config.gap)
    const transformElements = shallowReactive<Set<HTMLElement>>(new Set())

    /**
     * Setup functions
     */
    function updateSlideSize(): void {
      if (!viewport.value) return
      let multiplierWidth = 1
      transformElements.forEach((el) => {
        const transformArr = getTransformValues(el)

        if (transformArr.length === 6) {
          multiplierWidth *= transformArr[0]
        }
      })

      // Calculate size based on orientation
      if (isVertical.value) {
        if (config.height !== 'auto') {
          const height =
            typeof config.height === 'string' && isNaN(parseInt(config.height))
              ? viewport.value.getBoundingClientRect().height
              : parseInt(config.height as string)

          slideSize.value = (height - totalGap.value) / config.itemsToShow
        }
      } else {
        const width = viewport.value.getBoundingClientRect().width
        slideSize.value = (width / multiplierWidth - totalGap.value) / config.itemsToShow
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
    }

    watchEffect(() => updateSlidesData())

    watchEffect(() => {
      // Call updateSlideSize when viewport is ready and track deps
      updateSlideSize()
    })

    let animationInterval: number

    const setAnimationInterval = (event: AnimationEvent | TransitionEvent) => {
      const target = event.target as HTMLElement
      if (target) {
        transformElements.add(target)
      }
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

    updateBreakpointsConfig()
    onMounted((): void => {
      if (fallbackConfig.value.breakpointMode === 'carousel') {
        updateBreakpointsConfig()
      }
      initAutoplay()

      if (document) {
        document.addEventListener('animationstart', setAnimationInterval)
        document.addEventListener('animationend', finishAnimation)
      }
      if (root.value) {
        resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(root.value)
      }

      emit('init')
    })

    onBeforeUnmount(() => {
      // Empty the slides before they unregister for better performance
      slides.splice(0, slides.length)
      indexCbs.splice(0, indexCbs.length)

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

      if (document) {
        handleBlur()
        document.removeEventListener('animationstart', setAnimationInterval)
        document.removeEventListener('animationend', finishAnimation)
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
              nav.next(true)
            } else {
              nav.prev(true)
            }
          }
          break
        case 'ArrowRight':
        case 'ArrowDown':
          if (isVertical.value === event.key.endsWith('Down')) {
            if (isReversed.value) {
              nav.prev(true)
            } else {
              nav.next(true)
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
      const deltaX = currentX - startPosition.x
      const deltaY = currentY - startPosition.y

      // Update dragged state reactively
      dragged.x = deltaX
      dragged.y = deltaY

      // Emit a drag event for further customization if needed
      emit('drag', { deltaX, deltaY })
    })

    function handleDragEnd(): void {
      handleDragging.cancel()

      // Determine the active axis and direction multiplier
      const dragAxis = isVertical.value ? 'y' : 'x'
      const directionMultiplier = isReversed.value ? -1 : 1

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
      const currentVal = config.wrapAround
        ? slideIndex
        : getNumberInRange({
            val: slideIndex,
            max: maxSlideIndex.value,
            min: minSlideIndex.value,
          })

      if (
        currentSlideIndex.value === currentVal ||
        (!skipTransition && isSliding.value)
      ) {
        return
      }

      emit('slide-start', {
        slidingToIndex: slideIndex,
        currentSlideIndex: currentSlideIndex.value,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      stopAutoplay()
      isSliding.value = true
      prevSlideIndex.value = currentSlideIndex.value

      const mappedNumber = config.wrapAround
        ? mapNumberToRange({
            val: currentVal,
            max: maxSlideIndex.value,
            min: 0,
          })
        : currentVal
      currentSlideIndex.value = currentVal
      if (mappedNumber !== currentVal) {
        modelWatcher.pause()
      }
      emit('update:modelValue', mappedNumber)

      transitionTimer = setTimeout((): void => {
        if (config.wrapAround) {
          if (mappedNumber !== currentVal) {
            modelWatcher.resume()
            currentSlideIndex.value = mappedNumber
            emit('loop', {
              currentSlideIndex: currentSlideIndex.value,
              slidingToIndex: slideIndex,
            })
          }
        }

        emit('slide-end', {
          currentSlideIndex: currentSlideIndex.value,
          prevSlideIndex: prevSlideIndex.value,
          slidesCount: slidesCount.value,
        })

        isSliding.value = false
        resetAutoplay()
      }, config.transition)
    }

    function next(skipTransition = false): void {
      slideTo(currentSlideIndex.value + config.itemsToScroll, skipTransition)
    }

    function prev(skipTransition = false): void {
      slideTo(currentSlideIndex.value - config.itemsToScroll, skipTransition)
    }

    const nav: CarouselNav = { slideTo, next, prev }

    const scrolledIndex = computed(() =>
      getScrolledIndex({
        config,
        currentSlide: currentSlideIndex.value,
        slidesCount: slidesCount.value,
      })
    )

    const provided: InjectedCarousel = reactive({
      config,
      slidesCount,
      viewport,
      slides,
      scrolledIndex,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      slideSize,
      isVertical,
      normalizedDir,
      nav,
      isSliding,
      registerSlide,
      unregisterSlide,
    })

    provide(injectCarousel, provided)
    /** @deprecated provides */
    provide('config', config)
    provide('slidesCount', slidesCount)
    provide('currentSlide', currentSlideIndex)
    provide('maxSlide', maxSlideIndex)
    provide('minSlide', minSlideIndex)
    provide('slideSize', slideSize)
    provide('isVertical', isVertical)
    provide('normalizeDir', normalizedDir)
    provide('nav', nav)
    provide('isSliding', isSliding)

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

    const trackHeight = computed(() => {
      if (isVertical.value && slideSize.value && config.height === 'auto') {
        return `${slideSize.value * config.itemsToShow + totalGap.value}px`
      }
      return config.height !== 'auto'
        ? typeof config.height === 'number' ||
          parseInt(config.height).toString() === config.height
          ? `${config.height}px`
          : config.height
        : undefined
    })

    /**
     * Track style
     */
    const trackTransform: ComputedRef<string> = computed(() => {
      // Calculate the scrolled index with wrapping offset if applicable
      const cloneOffset = config.wrapAround ? clonedSlidesCount.value : 0

      // Determine direction multiplier for orientation
      const directionMultiplier = isReversed.value ? -1 : 1

      // Calculate the total offset for slide transformation
      const totalOffset =
        (scrolledIndex.value + cloneOffset) *
        effectiveSlideSize.value *
        directionMultiplier

      // Include user drag interaction offset
      const dragOffset = isVertical.value ? dragged.y : dragged.x

      // Generate the appropriate CSS transformation
      const translateAxis = isVertical.value ? 'Y' : 'X'
      return `translate${translateAxis}(${dragOffset - totalOffset}px)`
    })

    return () => {
      const slotSlides = slots.default || slots.slides
      const slotAddons = slots.addons

      let output: VNode[] | Array<Array<VNode>> = slotSlides?.(data) || []

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

      const addonsElements = slotAddons?.(data) || []

      if (config.wrapAround) {
        // Ensure scoped CSS tracks properly
        const scopeId = output.length > 0 ? output[0].scopeId : null
        pushScopeId(scopeId)
        const toShow = clonedSlidesCount.value
        const slidesBefore = createCloneSlides({ slides, position: 'before', toShow })
        const slidesAfter = createCloneSlides({ slides, position: 'after', toShow })
        popScopeId()
        output = [...slidesBefore, ...output, ...slidesAfter]
      }

      const trackEl = h(
        'ol',
        {
          class: 'carousel__track',
          style: {
            transform: trackTransform.value,
            'transition-duration': isSliding.value ? `${config.transition}ms` : undefined,
            gap: config.gap > 0 ? `${config.gap}px` : undefined,
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
            `is-${normalizedDir.value}`,
            {
              'is-vertical': isVertical.value,
              'is-sliding': isSliding.value,
              'is-dragging': isDragging.value,
              'is-hover': isHover.value,
            },
          ],
          style: {
            '--vc-trk-height': trackHeight.value,
          },
          dir: normalizedDir.value,
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
