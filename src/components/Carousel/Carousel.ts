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
  useId,
  watch,
  watchEffect,
} from 'vue'

import { ARIA as ARIAComponent } from '@/components/ARIA'
import {
  DragEventData,
  useDrag,
  useHover,
  useMarqueePhase,
  useWheel,
  WheelEventData,
} from '@/composables'
import {
  CarouselConfig,
  DEFAULT_CLASS_PREFIX,
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
  getClampedScrollTarget,
  getDraggedSlidesCount,
  getNativeScrollDelta,
  getNativeSlideIndex,
  getNumberInRange,
  getScaleMultipliers,
  getSnapAlignOffset,
  i18nFormatter,
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
import { carouselProps, isValidClassPrefix } from './carouselProps'

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
    const id = useId()

    const root: Ref<Element | null> = ref(null)
    const viewport: Ref<Element | null> = ref(null)
    const track: Ref<HTMLElement | null> = ref(null)
    const slideSize: Ref<number> = ref(0)

    // Assumed until mount so supported browsers render native mode from the
    // first paint and SSR output never needs a hydration fix-up
    const nativeSupport = ref(true)

    const fallbackConfig = computed(() => ({
      ...DEFAULT_CONFIG,
      // Avoid reactivity tracking in breakpoints and vModel which would trigger unnecessary updates
      ...except(props, ['breakpoints', 'modelValue']),
      // The validator only warns, so an invalid prefix falls back here
      classPrefix: isValidClassPrefix(props.classPrefix)
        ? props.classPrefix
        : DEFAULT_CLASS_PREFIX,
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
    let snapBackTimer: ReturnType<typeof setTimeout> | null = null
    let endTransition: ((interrupted?: boolean) => void) | null = null
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
    // Marquee is ignored with the fade effect: the stacked slides cannot scroll
    const isMarquee = computed(() => !!config.marquee && config.slideEffect !== 'fade')

    // btt relies on column-reverse, whose overflow is not reliably scrollable.
    // Marquee loops over cloned slides, which native mode cannot render
    const isNative = computed(
      () =>
        !!config.nativeCss &&
        nativeSupport.value &&
        normalizedDir.value !== 'btt' &&
        !isMarquee.value
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

      // classPrefix is not a breakpoint option (see Breakpoints); keep the prop value
      Object.assign(config, fallbackConfig.value, newConfig, {
        classPrefix: fallbackConfig.value.classPrefix,
      })

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

    // With adaptiveHeight the root ResizeObserver fires on every frame of the height
    // transition; those root-only, width-unchanged entries are skipped where the
    // observer is created. The measured slide heights do not depend on the root
    // height, so a re-measure cannot loop.
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

    // Every slide is on screen at once, so there is nothing to slide to.
    // Never true with wrapAround: the loop always has somewhere to go.
    const allSlidesFit = computed(() => {
      if (slidesCount.value === 0) {
        // Nothing registered yet (first render, SSR): never lock an empty carousel
        return false
      }
      if (config.wrapAround) {
        return false
      }
      if (config.slideEffect === 'fade') {
        // Fade stacks every slide in one cell, so only a single slide ever fits
        return slidesCount.value <= 1
      }
      if (!isAuto.value) {
        return slidesCount.value <= Number(config.itemsToShow)
      }
      const viewportSize = viewportRect.value[dimension.value]
      if (viewportSize <= 0) {
        // Not measured yet: keep the controls until the sizes are known
        return false
      }
      const slidesSize = slidesRect.value.reduce(
        (acc, slide) => acc + slide[dimension.value] + config.gap,
        -config.gap
      )
      // The locked track keeps its leading edgeSpacing, so that has to fit as well.
      // 1px tolerance: fractional widths and scale multipliers make an exact fit measure a hair over
      return slidesSize + normalizedEdgeSpacing.value - viewportSize <= 1
    })

    const isLocked = computed(() => config.disableWhenSlidesFit && allSlidesFit.value)

    // Drag and wheel do nothing on a locked carousel or a display-only marquee
    const isInteractionDisabled = computed(() => isLocked.value || isMarquee.value)

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
      // A marquee track animates forever and never changes the slide sizes, so
      // tracking it (e.g. from a carousel nested in a marquee) would run the
      // rAF loop for good
      if (event.animationName === 'vc-marquee') {
        return
      }

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
        let rootWidth = -1
        resizeObserver = new ResizeObserver((entries) => {
          // In adaptive mode the root height follows the slides, so a root-only
          // entry with an unchanged width is a frame of the height transition
          const rootEntry = entries.find((entry) => entry.target === root.value)
          const onlyRootHeight =
            isAdaptiveHeight.value &&
            entries.length === 1 &&
            rootEntry !== undefined &&
            rootEntry.contentRect.width === rootWidth
          if (rootEntry) {
            rootWidth = rootEntry.contentRect.width
          }
          if (!onlyRootHeight) {
            handleResize()
          }
        })
        resizeObserver.observe(root.value)
        updateObservedSlides()
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
        transitionTimer = null
        endTransition = null
      }
      if (snapBackTimer) {
        clearTimeout(snapBackTimer)
      }
      if (animationInterval) {
        cancelAnimationFrame(animationInterval)
      }
      if (autoplayTimer) {
        clearInterval(autoplayTimer)
      }
      if (resizeObserver) {
        resizeObserver.disconnect()
        observedSlides.clear()
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
      if (!config.keyboardNavigation || event.ctrlKey) return
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          if (isVertical.value === event.key.endsWith('Up')) {
            if (isReversed.value) {
              next()
            } else {
              prev()
            }
          }
          break
        case 'ArrowRight':
        case 'ArrowDown':
          if (isVertical.value === event.key.endsWith('Down')) {
            if (isReversed.value) {
              prev()
            } else {
              next()
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
      if (isMarquee.value || !config.autoplay || config.autoplay <= 0) {
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
    // Transitions the track back after a drag that did not change slide,
    // without locking input the way isSliding does
    const isSnappingBack = ref(false)

    // Screen px → layout px multipliers, sampled when a drag starts so the
    // drag follows the pointer 1:1 under scaled ancestors
    const dragScale = shallowRef<ScaleMultipliers>({
      widthMultiplier: 1,
      heightMultiplier: 1,
    })

    const onDragStart = () => {
      // A new drag must follow the pointer directly, not with easing
      if (snapBackTimer) {
        clearTimeout(snapBackTimer)
        snapBackTimer = null
      }
      isSnappingBack.value = false
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

    const onDragEnd = () => {
      if (isLocked.value) {
        activeSlideIndex.value = currentSlideIndex.value
        return
      }
      slideTo(activeSlideIndex.value)

      // slideTo returns early when the drag did not change the slide (under the
      // threshold or clamped at an edge). The track's return to its slot must
      // still be transitioned instead of snapping back.
      const axisOffset = isVertical.value ? dragged.y : dragged.x
      if (!isSliding.value && config.slideEffect !== 'fade' && axisOffset !== 0) {
        isSnappingBack.value = true
        if (snapBackTimer) {
          clearTimeout(snapBackTimer)
        }
        snapBackTimer = setTimeout(() => {
          isSnappingBack.value = false
          snapBackTimer = null
        }, config.transition)
      }
    }

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

    function getStepTarget(direction: 1 | -1): number {
      // Window stepping only applies to multi-slide steps on a track clamped at
      // both ends; itemsToScroll 1 must reach every slide, and when itemsToShow
      // exceeds the slide count the track is not clamped, so both use the index.
      if (
        config.wrapAround ||
        isAuto.value ||
        config.itemsToScroll <= 1 ||
        Number(config.itemsToShow) > slidesCount.value
      ) {
        return currentSlideIndex.value + direction * config.itemsToScroll
      }
      return getClampedScrollTarget({
        currentIndex: currentSlideIndex.value,
        direction,
        itemsToScroll: config.itemsToScroll,
        itemsToShow: Number(config.itemsToShow),
        slidesCount: slidesCount.value,
        snapAlignOffset: snapAlignOffset.value,
      })
    }

    function next(skipTransition = false): void {
      flushNativeScroll()
      slideTo(getStepTarget(1), skipTransition)
    }

    function prev(skipTransition = false): void {
      flushNativeScroll()
      slideTo(getStepTarget(-1), skipTransition)
    }

    function slideTo(slideIndex: number, skipTransition = false): void {
      if (isMarquee.value) {
        return
      }

      flushNativeScroll()
      // Only an explicit `true` bypasses the guard, so a handler that forwards
      // its event (`@click="carousel.next"`) cannot start an overlapping slide
      if (isLocked.value || (skipTransition !== true && isSliding.value)) {
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

      // A transition still in flight ends here, so that its timer never fires
      if (transitionTimer) {
        clearTimeout(transitionTimer)
        transitionTimer = null
        endTransition?.(true)
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
      } else {
        // The interrupted transition may have left the watcher paused
        modelWatcher.resume()
      }
      emit('update:modelValue', targetIndex)

      endTransition = (interrupted = false): void => {
        if (config.wrapAround && targetIndex !== slideIndex) {
          // The interrupting transition sets the watcher state itself, resuming
          // here would queue a watcher run in the middle of that transition
          if (!interrupted) {
            modelWatcher.resume()
          }

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
      }

      transitionTimer = setTimeout(() => {
        transitionTimer = null
        // slideTo can still be called on an unmounted carousel
        if (!mounted.value) {
          return
        }

        endTransition?.()
        endTransition = null
        isSliding.value = false
        resetAutoplay()
      }, config.transition)

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

    // Marquee disables autoplay, so restore or stop it when marquee toggles
    // (a prop change or a breakpoint)
    watch(isMarquee, () => resetAutoplay())

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

    // A v-model can only hold a canonical index, so with wrapAround take the
    // shortest path to it; slideTo maps the unclamped index and loops.
    function getModelTarget(val: number): number {
      if (!config.wrapAround || isAuto.value || slidesCount.value <= 0) {
        return val
      }
      const current = currentSlideIndex.value
      const canonical = mapNumberToRange({ val, max: maxSlideIndex.value, min: 0 })
      return [canonical - slidesCount.value, canonical + slidesCount.value].reduce(
        (best, candidate) =>
          Math.abs(candidate - current) < Math.abs(best - current) ? candidate : best,
        canonical
      )
    }

    // Handle changing v-model value
    const modelWatcher = watch(
      () => props.modelValue,
      (val) => {
        if (val === currentSlideIndex.value) {
          return
        }
        slideTo(getModelTarget(Number(val)), true)
      }
    )

    // Locking pins the carousel at its first slide; unlocking re-applies the
    // v-model value that was ignored while locked
    watch(isLocked, (locked) => {
      if (locked) {
        if (currentSlideIndex.value !== minSlideIndex.value) {
          currentSlideIndex.value = minSlideIndex.value
          emit('update:modelValue', minSlideIndex.value)
        }
      } else if (
        props.modelValue !== undefined &&
        props.modelValue !== currentSlideIndex.value
      ) {
        slideTo(props.modelValue, true)
      }
    })

    // Init carousel
    emit('before-init')

    // Length of the real slide set, gaps included: the distance one marquee loop travels
    const marqueeDistance = computed(() => {
      if (!isMarquee.value) {
        return 0
      }
      if (isAuto.value) {
        return slidesRect.value.reduce(
          (acc, slide) => acc + slide[dimension.value] + config.gap,
          0
        )
      }
      return slidesCount.value * effectiveSlideSize.value
    })

    const clonedSlidesCount = computed(() => {
      if (isMarquee.value) {
        // The clones after the real set must cover one viewport, so the jump
        // back to the start shows the same pixels
        if (!isAuto.value) {
          return { before: 0, after: Math.ceil(Number(config.itemsToShow)) }
        }
        // Auto mode clones whole sets; a set narrower than the viewport needs several.
        // Before the slides are measured the distance is 0, so clone a single set
        const sets = marqueeDistance.value
          ? Math.max(
              1,
              Math.ceil(viewportRect.value[dimension.value] / marqueeDistance.value)
            )
          : 1
        return { before: 0, after: slidesCount.value * sets }
      }
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

          // A locked carousel is pinned at its first slide: every slide is already on screen
          output = applyEdgeSpacing({
            value: isLocked.value
              ? 0
              : getNumberInRange({ val: output, max: maxSlidingValue, min: 0 }),
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
          // A locked carousel is pinned at its first slide: every slide is already on screen
          output = applyEdgeSpacing({
            value:
              (isLocked.value
                ? 0
                : getNumberInRange({
                    val: scrolledSlides,
                    max: maxScrolledSlides,
                    min: 0,
                  })) * effectiveSlideSize.value,
            max: maxScrolledSlides * effectiveSlideSize.value,
            spacing: normalizedEdgeSpacing.value,
          })
        }
      }

      return output * (isReversed.value ? 1 : -1)
    })

    const visibleRange = computed(() => {
      if (isLocked.value) {
        // A locked track is pinned at its first slide with every slide on screen
        return { min: 0, max: slidesCount.value - 1 }
      }
      if (!isAuto.value) {
        const base = currentSlideIndex.value - snapAlignOffset.value
        if (config.wrapAround) {
          return {
            min: Math.floor(base),
            max: Math.ceil(base + Number(config.itemsToShow) - 1),
          }
        }
        const itemsToShow = Number(config.itemsToShow)
        const start = getNumberInRange({
          val: base,
          max: slidesCount.value - itemsToShow,
          min: 0,
        })
        return {
          min: Math.floor(start),
          max: Math.ceil(
            getNumberInRange({
              val: start + itemsToShow - 1,
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

    const isAdaptiveHeight = computed(() => !!config.adaptiveHeight && !isVertical.value)

    // Tallest visible slide in layout px; undefined until a slide has a height, so
    // the `height` prop stays in effect before the first measurement
    const adaptiveHeight = computed<number | undefined>(() => {
      if (!isAdaptiveHeight.value) {
        return undefined
      }
      const count = slidesRect.value.length
      if (!count) {
        return undefined
      }
      const { min, max } = visibleRange.value
      let height = 0
      for (let index = min; index <= max; index++) {
        const normalizedIndex = ((index % count) + count) % count
        height = Math.max(height, slidesRect.value[normalizedIndex]?.height || 0)
      }
      return height > 0 ? height : undefined
    })

    // In adaptive height mode the root no longer grows with its content, so slide
    // content changing size later (images loading) is caught by observing the
    // slide elements themselves. Clones mirror real slides and are not observed.
    const observedSlides = new Set<Element>()
    function updateObservedSlides(): void {
      const observer = resizeObserver
      if (!observer) {
        return
      }
      const next = new Set<Element>()
      if (isAdaptiveHeight.value) {
        slides.forEach((slide) => {
          const el = slide.vnode.el
          if (el instanceof Element) {
            next.add(el)
          }
        })
      }
      observedSlides.forEach((el) => {
        if (!next.has(el)) {
          observer.unobserve(el)
          observedSlides.delete(el)
        }
      })
      next.forEach((el) => {
        if (!observedSlides.has(el)) {
          observer.observe(el)
          observedSlides.add(el)
        }
      })
    }
    // Spread `slides` so registry changes re-run the watcher; post flush so the
    // slide elements exist
    watch(() => [isAdaptiveHeight.value, ...slides], updateObservedSlides, {
      flush: 'post',
    })

    const trackTransform: ComputedRef<string | undefined> = computed(() => {
      if (config.slideEffect === 'fade' || isMarquee.value || isNative.value) {
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

    // Seconds one marquee loop takes; 0 when the marquee is off or cannot run
    const marqueeDuration = computed(() => {
      const speed = Number(config.marqueeSpeed) || 0
      return isMarquee.value && speed > 0 ? marqueeDistance.value / speed : 0
    })

    useMarqueePhase({ track, duration: marqueeDuration, slidesCount })

    const carouselStyle = computed(() => {
      const marqueeOffset = isMarquee.value
        ? toCssValue(marqueeDistance.value * (isReversed.value ? 1 : -1))
        : undefined
      return {
        '--vc-carousel-height':
          adaptiveHeight.value !== undefined
            ? toCssValue(adaptiveHeight.value)
            : toCssValue(config.height),
        '--vc-cloned-offset': toCssValue(clonedSlidesOffset.value),
        '--vc-marquee-duration': isMarquee.value
          ? toCssValue(marqueeDuration.value, 's')
          : undefined,
        '--vc-marquee-x': isVertical.value ? undefined : marqueeOffset,
        '--vc-marquee-y': isVertical.value ? marqueeOffset : undefined,
        '--vc-slide-gap': toCssValue(config.gap),
        '--vc-snap-align': isNative.value
          ? NATIVE_SNAP_ALIGN[config.snapAlign]
          : undefined,
        '--vc-transition-duration':
          isSliding.value || isSnappingBack.value
            ? toCssValue(config.transition, 'ms')
            : undefined,
        '--vc-transition-easing': config.transitionEasing,
      }
    })

    const nav: CarouselNav = { slideTo, next, prev }

    const provided: InjectedCarousel = reactive({
      activeSlide: activeSlideIndex,
      allSlidesFit,
      config,
      currentSlide: currentSlideIndex,
      isMarquee,
      isSliding,
      isNative,
      isLocked,
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

      const prefix = config.classPrefix

      if (!config.enabled || !output.length) {
        return h(
          'section',
          {
            ref: root,
            class: [prefix, 'is-disabled'],
          },
          output
        )
      }

      const addonsElements = slots.addons?.(data) || []

      const trackEl = h(
        'ol',
        {
          ref: track,
          class: `${prefix}__track`,
          onMousedownCapture:
            config.mouseDrag && !isInteractionDisabled.value ? handleDragStart : null,
          onTouchstartPassiveCapture:
            config.touchDrag && !isInteractionDisabled.value ? handleDragStart : null,
          onWheel: config.mouseWheel && !isInteractionDisabled.value ? handleScroll : null,
          style: { transform: trackTransform.value },
        },
        output
      )
      const viewPortEl = h(
        'div',
        {
          class: `${prefix}__viewport`,
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
            prefix,
            `is-${normalizedDir.value}`,
            `is-effect-${config.slideEffect}`,
            {
              'is-adaptive-height': isAdaptiveHeight.value,
              'is-dragging': isDragging.value,
              'is-hover': isHover.value,
              'is-locked': isLocked.value,
              'is-native': isNative.value,
              'is-marquee': isMarquee.value,
              'is-paused':
                isMarquee.value && !!config.pauseAutoplayOnHover && isHover.value,
              'is-sliding': isSliding.value,
              'is-vertical': isVertical.value,
            },
          ],
          dir: normalizedDir.value,
          style: carouselStyle.value,
          'aria-label': i18nFormatter(config.i18n['ariaGallery'], { id }),
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
