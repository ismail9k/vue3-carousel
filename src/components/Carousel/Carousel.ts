import {
  ComputedRef,
  Ref,
  SetupContext,
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowReactive,
  shallowRef,
  toRefs,
  watch,
  watchEffect,
} from 'vue'

import { ARIA as ARIAComponent } from '@/components/ARIA'
import { DragEventData, useDrag, useHover, useWheel, WheelEventData } from '@/composables'
import {
  CarouselConfig,
  DEFAULT_CONFIG,
  DEFAULT_DRAG_THRESHOLD,
  DIR_MAP,
  NATIVE_SNAP_ALIGN,
  NonNormalizedDir,
  NormalizedDir,
  createSlideRegistry,
  injectCarousel,
} from '@/shared'
import {
  ScaleMultipliers,
  applyEdgeSpacing,
  calculateAverage,
  createCloneSlides,
  debounce,
  except,
  getDraggedSlidesCount,
  getNativeScrollDelta,
  getNativeSlideIndex,
  getNumberInRange,
  getScaleMultipliers,
  getSnapAlignOffset,
  mapNumberToRange,
  supportsNativeCss,
  throttle,
  toCssValue,
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
    'before-init',
    'drag',
    'init',
    'loop',
    'slide-end',
    'slide-registered',
    'slide-start',
    'slide-unregistered',
    'update:modelValue',
    'wheel',
  ],
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const slideRegistry = createSlideRegistry(emit)
    const slides = slideRegistry.getSlides()
    const slidesCount = computed(() => slides.length)

    const root: Ref<Element | null> = ref(null)
    const viewport: Ref<Element | null> = ref(null)
    const slideSize: Ref<number> = ref(0)

    // Assumed until mount so supported browsers render native mode from the
    // first paint and SSR output never needs a hydration fix-up
    const nativeSupport = ref(true)

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

    // Sanitized edge spacing: never negative, and never applied while wrapping around
    // or fading (the track is not translated with the fade effect).
    const normalizedEdgeSpacing = computed(() =>
      config.wrapAround || config.slideEffect === 'fade'
        ? 0
        : Math.max(0, config.edgeSpacing)
    )

    const normalizedDir = computed<NormalizedDir>(() => {
      const dir = config.dir || 'ltr'
      return dir in DIR_MAP ? DIR_MAP[dir as NonNormalizedDir] : (dir as NormalizedDir)
    })

    const isReversed = computed(() => ['rtl', 'btt'].includes(normalizedDir.value))
    const isVertical = computed(() => ['ttb', 'btt'].includes(normalizedDir.value))
    const isAuto = computed(() => config.itemsToShow === 'auto')

    // btt relies on column-reverse, whose overflow is not reliably scrollable
    const isNative = computed(
      () => !!config.nativeCss && nativeSupport.value && normalizedDir.value !== 'btt'
    )

    // Native CSS mode cannot loop, fade, drag with JS or offset the track, so
    // those options are turned off in one place and everything else just reads config
    function applyNativeConstraints(): void {
      if (!isNative.value) {
        return
      }
      Object.assign(config, {
        edgeSpacing: 0,
        mouseDrag: false,
        mouseWheel: false,
        preventExcessiveDragging: false,
        slideEffect: 'slide',
        touchDrag: false,
        wrapAround: false,
      })
    }
    applyNativeConstraints()

    const dimension = computed(() => (isVertical.value ? 'height' : 'width'))

    function updateBreakpointsConfig(): void {
      if (!mounted.value) {
        return
      }
      // Determine the width source based on the 'breakpointMode' config
      // The carousel is measured in layout px, like every other measurement,
      // so breakpoints match the same way under a CSS-scaled ancestor
      const carouselWidth = () =>
        root.value
          ? root.value.getBoundingClientRect().width *
            getScaleMultipliers(root.value).widthMultiplier
          : 0
      const widthSource =
        (fallbackConfig.value.breakpointMode === 'carousel'
          ? carouselWidth()
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

      // Validate itemsToShow
      if (!isAuto.value) {
        config.itemsToShow = getNumberInRange({
          val: Number(config.itemsToShow),
          max: props.clamp ? slidesCount.value : Infinity,
          min: 1,
        })
      }

      applyNativeConstraints()
    }

    const handleResize = throttle(() => {
      updateBreakpointsConfig()
      updateSlidesData()
      updateSlideSize()
      // A user scroll that has not settled yet is still moving away from the
      // current slide; snapping back to it would undo the scroll
      if (isNative.value && !nativeScrollPending) {
        scrollToSlide(currentSlideIndex.value, 'instant')
      }
    })

    // Plain Set: nothing reads it reactively — the rAF loop and finishAnimation
    // call updateSlideSize() explicitly
    const transformElements = new Set<HTMLElement>()

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

      const scaleMultipliers = getScaleMultipliers(root.value)

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
        // Reset so the guard in setAnimationInterval can restart the loop
        animationInterval = 0
        updateSlideSize()
      }
    }

    const mounted = ref(false)

    if (typeof document !== 'undefined') {
      watchEffect(() => {
        if (mounted.value && ignoreAnimations.value !== false) {
          // Use passive listeners for better performance
          document.addEventListener('animationstart', setAnimationInterval, {
            passive: true,
          })
          document.addEventListener('animationend', finishAnimation, { passive: true })
          // A cancelled animation never fires `animationend`, so without this
          // its element would stay in `transformElements` and the rAF loop
          // would keep walking ancestors every frame
          document.addEventListener('animationcancel', finishAnimation, {
            passive: true,
          })
        } else {
          document.removeEventListener('animationstart', setAnimationInterval)
          document.removeEventListener('animationend', finishAnimation)
          document.removeEventListener('animationcancel', finishAnimation)
        }
      })
    }

    onMounted((): void => {
      mounted.value = true
      nativeSupport.value = supportsNativeCss()
      updateBreakpointsConfig()
      initAutoplay()

      if (root.value) {
        resizeObserver = new ResizeObserver(handleResize)
        resizeObserver.observe(root.value)
      }

      emit('init')
      if (isNative.value) {
        scrollToSlide(currentSlideIndex.value, 'instant')
      }
    })

    onBeforeUnmount(() => {
      mounted.value = false

      slideRegistry.cleanup()
      handleNativeScroll.cancel()

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
    const { isHover, handleMouseEnter, handleMouseLeave } = useHover()

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

    const handleBlur = (): void => {
      document.removeEventListener('keydown', handleArrowKeys)
    }

    const handleFocus = (): void => {
      document.addEventListener('keydown', handleArrowKeys)
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
      stopAutoplay()
      initAutoplay()
    }

    function stopAutoplay(): void {
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
        autoplayTimer = null
      }
    }

    /**
     * Navigation function
     */
    const isSliding = ref(false)

    // Screen px → layout px multipliers, sampled when a drag starts so the
    // drag follows the pointer 1:1 under scaled ancestors
    const dragScale = shallowRef<ScaleMultipliers>({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })

    const onDragStart = () => {
      dragScale.value = getScaleMultipliers(root.value)
    }

    const onDrag = ({ deltaX, deltaY, isTouch }: DragEventData) => {
      // Emitted as raw screen px on purpose (public API); the values below are
      // converted to layout px for the carousel's own maths
      emit('drag', { deltaX, deltaY })

      const threshold = isTouch
        ? typeof config.touchDrag === 'object'
          ? (config.touchDrag?.threshold ?? DEFAULT_DRAG_THRESHOLD)
          : DEFAULT_DRAG_THRESHOLD
        : typeof config.mouseDrag === 'object'
          ? (config.mouseDrag?.threshold ?? DEFAULT_DRAG_THRESHOLD)
          : DEFAULT_DRAG_THRESHOLD

      const draggedSlides = getDraggedSlidesCount({
        isVertical: isVertical.value,
        isReversed: isReversed.value,
        dragged: {
          x: deltaX * dragScale.value.widthMultiplier,
          y: deltaY * dragScale.value.heightMultiplier,
        },
        effectiveSlideSize: effectiveSlideSize.value,
        threshold,
      })

      // Prevent unnecessary reactivity
      if (draggedSlides === 0) {
        return
      }

      activeSlideIndex.value = config.wrapAround
        ? currentSlideIndex.value + draggedSlides
        : getNumberInRange({
            val: currentSlideIndex.value + draggedSlides,
            max: maxSlideIndex.value,
            min: minSlideIndex.value,
          })
    }

    const onDragEnd = () => slideTo(activeSlideIndex.value)

    const { dragged, isDragging, handleDragStart } = useDrag({
      isSliding,
      onDrag,
      onDragStart,
      onDragEnd,
    })

    const onWheel = ({ deltaX, deltaY, isScrollingForward }: WheelEventData) => {
      emit('wheel', { deltaX, deltaY })

      if (isScrollingForward) {
        // Scrolling down/right
        if (isReversed.value) {
          prev()
        } else {
          next()
        }
      } else {
        // Scrolling up/left
        if (isReversed.value) {
          next()
        } else {
          prev()
        }
      }
    }

    const { handleScroll } = useWheel({
      isVertical,
      isSliding,
      config,
      onWheel,
    })

    function next(skipTransition = false): void {
      flushNativeScroll()
      slideTo(currentSlideIndex.value + config.itemsToScroll, skipTransition)
    }

    function prev(skipTransition = false): void {
      flushNativeScroll()
      slideTo(currentSlideIndex.value - config.itemsToScroll, skipTransition)
    }

    function slideTo(slideIndex: number, skipTransition = false): void {
      flushNativeScroll()
      if (!skipTransition && isSliding.value) {
        return
      }

      const targetIndex = (config.wrapAround ? mapNumberToRange : getNumberInRange)({
        val: slideIndex,
        max: maxSlideIndex.value,
        min: minSlideIndex.value,
      })

      if (currentSlideIndex.value === targetIndex) {
        return
      }

      prevSlideIndex.value = currentSlideIndex.value

      emit('slide-start', {
        slidingToIndex: slideIndex,
        currentSlideIndex: currentSlideIndex.value,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })

      stopAutoplay()
      isSliding.value = true

      currentSlideIndex.value = slideIndex
      if (targetIndex !== slideIndex) {
        modelWatcher.pause()
      }
      emit('update:modelValue', targetIndex)

      const transitionCallback = (): void => {
        if (config.wrapAround && targetIndex !== slideIndex) {
          modelWatcher.resume()

          currentSlideIndex.value = targetIndex
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

      if (isNative.value) {
        scrollToSlide(targetIndex)
      }
    }

    // Native mode: the snap point every scroll measurement aligns on
    const nativeAlignOptions = computed(() => ({
      align: NATIVE_SNAP_ALIGN[config.snapAlign],
      isReversed: isReversed.value,
      isVertical: isVertical.value,
    }))

    /**
     * Native mode: scroll the viewport so `index` meets its snap point. Uses
     * client rects so it works for every direction; scaled like every other
     * measurement (layout px).
     */
    function scrollToSlide(index: number, behavior: ScrollBehavior = 'smooth'): void {
      const slideEl = slides[index]?.vnode.el as Element | null | undefined
      if (!viewport.value || !slideEl?.getBoundingClientRect) {
        return
      }
      const delta = getNativeScrollDelta({
        ...nativeAlignOptions.value,
        slideRect: slideEl.getBoundingClientRect(),
        viewportRect: viewport.value.getBoundingClientRect(),
      })
      if (Math.abs(delta) < 1) {
        return
      }
      const { widthMultiplier, heightMultiplier } = getScaleMultipliers(root.value)
      viewport.value.scrollBy(
        isVertical.value
          ? { top: delta * heightMultiplier, behavior }
          : { left: delta * widthMultiplier, behavior }
      )
    }

    // Native mode: once the user's scroll settles, adopt the slide the scroller
    // landed on. A smooth scroll fires `scroll` every frame, so the debounce
    // cannot fire in the middle of a programmatic scroll.
    function adoptNativeScrollIndex(): void {
      if (!isNative.value || !viewport.value) {
        return
      }
      const slideEls = slides.map((slide) => slide.vnode.el as Element | null | undefined)
      // Every slide must be measurable, or the indexes would not line up
      if (!slideEls.every((el): el is Element => !!el?.getBoundingClientRect)) {
        return
      }
      const index = getNativeSlideIndex({
        ...nativeAlignOptions.value,
        slideRects: slideEls.map((el) => el.getBoundingClientRect()),
        viewportRect: viewport.value.getBoundingClientRect(),
        currentIndex: currentSlideIndex.value,
      })
      if (index === -1 || index === currentSlideIndex.value) {
        return
      }
      prevSlideIndex.value = currentSlideIndex.value
      emit('slide-start', {
        slidingToIndex: index,
        currentSlideIndex: currentSlideIndex.value,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })
      currentSlideIndex.value = index
      emit('update:modelValue', index)
      emit('slide-end', {
        currentSlideIndex: index,
        prevSlideIndex: prevSlideIndex.value,
        slidesCount: slidesCount.value,
      })
    }

    // Set by a scroll event, cleared once that scroll settles
    let nativeScrollPending = false

    const handleNativeScroll = debounce(() => {
      nativeScrollPending = false
      adoptNativeScrollIndex()
      resetAutoplay()
    }, 100)

    // A user scroll pauses autoplay until it settles; while sliding, the scroll
    // is the carousel's own and autoplay restarts when the slide ends
    function onNativeScroll(): void {
      if (!isSliding.value) {
        stopAutoplay()
      }
      nativeScrollPending = true
      handleNativeScroll()
    }

    // Before navigating, adopt a user scroll that has not settled yet so the
    // move starts from the slide in view. Skipped while sliding: the pending
    // scroll is then the carousel's own, still on its way to the current slide
    function flushNativeScroll(): void {
      if (isNative.value && !isSliding.value) {
        handleNativeScroll.flush()
      }
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

    // Turning native mode on after mount: the track is no longer transformed,
    // so put the scroller on the current slide once the DOM has updated.
    // Turning it off: the viewport's leftover native scroll offset would add to
    // the track transform under `overflow: hidden`, so reset it
    watch(
      isNative,
      (native) => {
        if (native && mounted.value) {
          scrollToSlide(currentSlideIndex.value, 'instant')
        } else if (!native && viewport.value) {
          viewport.value.scrollLeft = 0
          viewport.value.scrollTop = 0
        }
      },
      { flush: 'post' }
    )

    // Adding or removing slides shifts the ones after them, so put the
    // scroller back on the current slide once the DOM has updated
    watch(
      slidesCount,
      () => {
        if (isNative.value && mounted.value) {
          scrollToSlide(currentSlideIndex.value, 'instant')
        }
      },
      { flush: 'post' }
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

          output = applyEdgeSpacing({
            value: getNumberInRange({ val: output, max: maxSlidingValue, min: 0 }),
            max: maxSlidingValue,
            spacing: normalizedEdgeSpacing.value,
          })
        }
      } else {
        const scrolledSlides = currentSlideIndex.value - snapAlignOffset.value

        if (config.wrapAround) {
          output = scrolledSlides * effectiveSlideSize.value
        } else {
          // remove whitespace
          const maxScrolledSlides = slidesCount.value - +config.itemsToShow
          output = applyEdgeSpacing({
            value:
              getNumberInRange({ val: scrolledSlides, max: maxScrolledSlides, min: 0 }) *
              effectiveSlideSize.value,
            max: maxScrolledSlides * effectiveSlideSize.value,
            spacing: normalizedEdgeSpacing.value,
          })
        }
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
      // Distance the track has scrolled forward, in px. edgeSpacing can push the
      // track before the first slide, which makes this negative; trackOffset clamps
      // that away so the minIndex walk still starts at the first slide.
      const forwardOffset = scrolledOffset.value * (isReversed.value ? 1 : -1)
      const trackOffset = Math.max(0, forwardOffset - clonedSlidesOffset.value)

      let minIndex = 0
      {
        let accumulatedSize = 0
        let index = 0 - clonedSlidesCount.value.before
        let iterations = 0
        const maxIterations = slides.length * 2

        while (accumulatedSize <= trackOffset && iterations < maxIterations) {
          const normalizedIndex =
            ((index % slides.length) + slides.length) % slides.length
          const slideSize = slidesRect.value[normalizedIndex]?.[dimension.value] || 0
          if (slideSize <= 0) break
          accumulatedSize += slideSize + config.gap
          index++
          iterations++
        }
        minIndex = index - 1
      }

      let maxIndex = 0
      {
        let index = minIndex
        let accumulatedSize = 0
        let iterations = 0
        const maxIterations = slides.length * 2

        if (index < 0) {
          accumulatedSize =
            slidesRect.value
              .slice(0, index)
              .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) -
            trackOffset
        } else {
          accumulatedSize =
            slidesRect.value
              .slice(0, index)
              .reduce((acc, slide) => acc + slide[dimension.value] + config.gap, 0) -
            forwardOffset
        }

        while (
          accumulatedSize < viewportRect.value[dimension.value] &&
          iterations < maxIterations
        ) {
          const normalizedIndex =
            ((index % slides.length) + slides.length) % slides.length
          const slideSize = slidesRect.value[normalizedIndex]?.[dimension.value] || 0
          if (slideSize <= 0) break
          accumulatedSize += slideSize + config.gap
          index++
          iterations++
        }
        maxIndex = index - 1
      }

      return {
        min: Math.floor(minIndex),
        max: Math.ceil(maxIndex),
      }
    })

    const trackTransform: ComputedRef<string | undefined> = computed(() => {
      if (config.slideEffect === 'fade' || isNative.value) {
        return undefined
      }

      const translateAxis = isVertical.value ? 'Y' : 'X'

      // Include user drag interaction offset, converted to layout px
      const dragOffset = isVertical.value
        ? dragged.y * dragScale.value.heightMultiplier
        : dragged.x * dragScale.value.widthMultiplier

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
        maxSlidingValue += normalizedEdgeSpacing.value
        const min = isReversed.value ? -normalizedEdgeSpacing.value : -1 * maxSlidingValue
        const max = isReversed.value ? maxSlidingValue : normalizedEdgeSpacing.value
        totalOffset = getNumberInRange({
          val: totalOffset,
          min,
          max,
        })
      }
      return `translate${translateAxis}(${totalOffset}px)`
    })

    const carouselStyle = computed(() => ({
      '--vc-carousel-height': toCssValue(config.height),
      '--vc-cloned-offset': toCssValue(clonedSlidesOffset.value),
      '--vc-slide-gap': toCssValue(config.gap),
      '--vc-snap-align': isNative.value ? NATIVE_SNAP_ALIGN[config.snapAlign] : undefined,
      '--vc-transition-duration': isSliding.value
        ? toCssValue(config.transition, 'ms')
        : undefined,
      '--vc-transition-easing': config.transitionEasing,
    }))

    const nav: CarouselNav = { slideTo, next, prev }

    const provided: InjectedCarousel = reactive({
      activeSlide: activeSlideIndex,
      config,
      currentSlide: currentSlideIndex,
      isSliding,
      isNative,
      isVertical,
      maxSlide: maxSlideIndex,
      minSlide: minSlideIndex,
      nav,
      normalizedDir,
      slideRegistry,
      slideSize,
      slides,
      slidesCount,
      viewport,
      visibleRange,
    })

    provide(injectCarousel, provided)

    const data = reactive<CarouselData>({
      config,
      currentSlide: currentSlideIndex,
      maxSlide: maxSlideIndex,
      middleSlide: middleSlideIndex,
      minSlide: minSlideIndex,
      slideSize,
      slidesCount,
    })

    expose<CarouselExposed>(
      reactive({
        data,
        next,
        prev,
        restartCarousel,
        slideTo,
        updateBreakpointsConfig,
        updateSlideSize,
        updateSlidesData,
        ...toRefs(provided),
      })
    )

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
          onMousedownCapture: config.mouseDrag ? handleDragStart : null,
          onTouchstartPassiveCapture: config.touchDrag ? handleDragStart : null,
          onWheel: config.mouseWheel ? handleScroll : null,
          style: { transform: trackTransform.value },
        },
        output
      )
      const viewPortEl = h(
        'div',
        {
          class: 'carousel__viewport',
          ref: viewport,
          onScrollPassive: isNative.value ? onNativeScroll : undefined,
        },
        trackEl
      )

      return h(
        'section',
        {
          ref: root,
          class: [
            'carousel',
            `is-${normalizedDir.value}`,
            `is-effect-${config.slideEffect}`,
            {
              'is-dragging': isDragging.value,
              'is-hover': isHover.value,
              'is-native': isNative.value,
              'is-sliding': isSliding.value,
              'is-vertical': isVertical.value,
            },
          ],
          dir: normalizedDir.value,
          style: carouselStyle.value,
          'aria-label': config.i18n['ariaGallery'],
          tabindex: '0',
          onBlur: handleBlur,
          onFocus: handleFocus,
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements, h(ARIAComponent)]
      )
    }
  },
})
