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
} from 'vue'

import { defaultConfigs } from '@/partials/defaults'
import {
  debounce,
  throttle,
  getSlidesVNodes,
  getCurrentSlideIndex,
  getMaxSlideIndex,
  getMinSlideIndex,
  getSlidesToScroll,
} from '@/partials/utils'

import {
  SetupContext,
  CarouselConfig,
  Ref,
  CarouselNav,
  ElementStyleObject,
  Breakpoints,
} from '@/types'

export default defineComponent({
  name: 'Carousel',
  props: {
    // count of items to showed per view
    itemsToShow: {
      default: defaultConfigs.itemsToShow,
      type: Number,
    },
    // count of items to be scrolled
    itemsToScroll: {
      default: defaultConfigs.itemsToScroll,
      type: Number,
    },
    // control infinite scrolling mode
    wrapAround: {
      default: defaultConfigs.wrapAround,
      type: Boolean,
    },
    // control snap position alignment
    snapAlign: {
      default: defaultConfigs.snapAlign,
      validator(value: string) {
        // The value must match one of these strings
        return ['start', 'end', 'center', 'center-even', 'center-odd'].includes(value)
      },
    },
    // sliding transition time in ms
    transition: {
      default: defaultConfigs.transition,
      type: Number,
    },
    // an object to store breakpoints
    breakpoints: {
      default: defaultConfigs.breakpoints,
      type: Object,
    },
    // time to auto advance slides in ms
    autoplay: {
      default: defaultConfigs.autoplay,
      type: Number,
    },
    // pause autoplay when mouse hover over the carousel
    pauseAutoplayOnHover: {
      default: defaultConfigs.pauseAutoplayOnHover,
      type: Boolean,
    },
    // slide number number of initial slide
    modelValue: {
      default: undefined,
      type: Number,
    },
    // toggle mouse dragging.
    mouseDrag: {
      default: defaultConfigs.mouseDrag,
      type: Boolean,
    },
    // toggle mouse dragging.
    touchDrag: {
      default: defaultConfigs.touchDrag,
      type: Boolean,
    },
    // control snap position alignment
    dir: {
      default: defaultConfigs.dir,
      validator(value: string) {
        // The value must match one of these strings
        return ['rtl', 'ltr'].includes(value)
      },
    },
    // an object to pass all settings
    settings: {
      default() {
        return {}
      },
      type: Object,
    },
  },
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const root: Ref<Element | null> = ref(null)
    const slides: Ref<any> = ref([])
    const slidesBuffer: Ref<Array<number>> = ref([])
    const slideWidth: Ref<number> = ref(0)
    const slidesCount: Ref<number> = ref(1)
    const autoplayTimer: Ref<NodeJS.Timeout | null> = ref(null)
    const transitionTimer: Ref<NodeJS.Timeout | null> = ref(null)

    let breakpoints: Ref<Breakpoints> = ref({})

    // generate carousel configs
    let __defaultConfig: CarouselConfig = { ...defaultConfigs }
    // current config
    const config = reactive<CarouselConfig>({ ...__defaultConfig })

    // slides
    const currentSlideIndex = ref(config.modelValue ?? 0)
    const prevSlideIndex = ref(0)
    const middleSlideIndex = ref(0)
    const maxSlideIndex = ref(0)
    const minSlideIndex = ref(0)

    provide('config', config)
    provide('slidesBuffer', slidesBuffer)
    provide('slidesCount', slidesCount)
    provide('currentSlide', currentSlideIndex)
    provide('maxSlide', maxSlideIndex)
    provide('minSlide', minSlideIndex)

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
            ...(breakpoints.value[breakpoint] as CarouselConfig),
          }
          return true
        }
        return false
      })

      bindConfigs(newConfig)
    }

    function bindConfigs(newConfig: CarouselConfig): void {
      for (let key in newConfig) {
        // @ts-ignore
        config[key] = newConfig[key]
      }
    }

    const handleWindowResize = debounce(() => {
      if (breakpoints.value) {
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
      slidesCount.value = Math.max(slides.value.length, 1)
      if (slidesCount.value <= 0) return

      middleSlideIndex.value = Math.ceil((slidesCount.value - 1) / 2)
      maxSlideIndex.value = getMaxSlideIndex(config, slidesCount.value)
      minSlideIndex.value = getMinSlideIndex(config)
      currentSlideIndex.value = getCurrentSlideIndex(
        config,
        currentSlideIndex.value,
        maxSlideIndex.value,
        minSlideIndex.value
      )
    }

    function updateSlidesBuffer(): void {
      const slidesArray = [...Array(slidesCount.value).keys()]
      const shouldShiftSlides =
        config.wrapAround && config.itemsToShow + 1 <= slidesCount.value

      if (shouldShiftSlides) {
        const buffer =
          config.itemsToShow !== 1
            ? Math.round((slidesCount.value - config.itemsToShow) / 2)
            : 0
        let shifts = buffer - currentSlideIndex.value

        if (config.snapAlign === 'end') {
          shifts += Math.floor(config.itemsToShow - 1)
        } else if (config.snapAlign === 'center' || config.snapAlign === 'center-odd') {
          shifts++
        }

        // Check shifting directions
        if (shifts < 0) {
          for (let i = shifts; i < 0; i++) {
            slidesArray.push(Number(slidesArray.shift()))
          }
        } else {
          for (let i = 0; i < shifts; i++) {
            slidesArray.unshift(Number(slidesArray.pop()))
          }
        }
      }
      slidesBuffer.value = slidesArray
    }

    onMounted((): void => {
      if (breakpoints.value) {
        updateBreakpointsConfigs()
        updateSlidesData()
      }
      nextTick(() => setTimeout(updateSlideWidth, 16))

      if (config.autoplay && config.autoplay > 0) {
        initializeAutoplay()
      }

      window.addEventListener('resize', handleWindowResize, { passive: true })
    })

    onUnmounted(() => {
      if (transitionTimer.value) {
        clearTimeout(transitionTimer.value)
      }
      resetAutoplayTimer(false)
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

      let newSlide = getCurrentSlideIndex(
        config,
        currentSlideIndex.value - draggedSlides,
        maxSlideIndex.value,
        minSlideIndex.value
      )

      // Prevent clicking if there is clicked slides
      if (draggedSlides && !isTouch) {
        const captureClick = (e: MouseEvent) => {
          e.stopPropagation()
          window.removeEventListener('click', captureClick, true)
        }
        window.addEventListener('click', captureClick, true)
      }

      slideTo(newSlide)

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
    function initializeAutoplay(): void {
      autoplayTimer.value = setInterval(() => {
        if (config.pauseAutoplayOnHover && isHover.value) {
          return
        }

        next()
      }, config.autoplay)
    }

    function resetAutoplayTimer(restart = true): void {
      if (!autoplayTimer.value) {
        return
      }

      clearInterval(autoplayTimer.value)
      if (restart) {
        initializeAutoplay()
      }
    }

    /**
     * Navigation function
     */
    const isSliding = ref(false)
    function slideTo(slideIndex: number, mute = false): void {
      resetAutoplayTimer()

      if (currentSlideIndex.value === slideIndex || isSliding.value) {
        return
      }

      // Wrap slide index
      const lastSlideIndex = slidesCount.value - 1
      if (slideIndex > lastSlideIndex) {
        return slideTo(slideIndex - slidesCount.value)
      }
      if (slideIndex < 0) {
        return slideTo(slideIndex + slidesCount.value)
      }

      isSliding.value = true
      prevSlideIndex.value = currentSlideIndex.value
      currentSlideIndex.value = slideIndex

      if (!mute) {
        emit('update:modelValue', currentSlideIndex.value)
      }
      transitionTimer.value = setTimeout((): void => {
        if (config.wrapAround) updateSlidesBuffer()
        isSliding.value = false
      }, config.transition)
    }

    function next(): void {
      let nextSlide = currentSlideIndex.value + config.itemsToScroll
      if (!config.wrapAround) {
        nextSlide = Math.min(nextSlide, maxSlideIndex.value)
      }
      slideTo(nextSlide)
    }

    function prev(): void {
      let prevSlide = currentSlideIndex.value - config.itemsToScroll
      if (!config.wrapAround) {
        prevSlide = Math.max(prevSlide, minSlideIndex.value)
      }
      slideTo(prevSlide)
    }
    const nav: CarouselNav = { slideTo, next, prev }
    provide('nav', nav)

    /**
     * Track style
     */
    const slidesToScroll = computed(() =>
      getSlidesToScroll({
        slidesBuffer: slidesBuffer.value,
        itemsToShow: config.itemsToShow,
        snapAlign: config.snapAlign,
        wrapAround: Boolean(config.wrapAround),
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
      }
    })

    function initCarousel(): void {
      initDefaultConfigs()
    }

    function restartCarousel(): void {
      initDefaultConfigs()
      updateBreakpointsConfigs()
      updateSlidesData()
      updateSlidesBuffer()
      updateSlideWidth()
    }

    function updateCarousel(): void {
      updateSlidesData()
      updateSlidesBuffer()
    }

    // Update the carousel on props change
    watch(() => Object.values(props), restartCarousel)

    // Init carousel
    initCarousel()

    watchEffect((): void => {
      // Handel when slides added/removed
      const needToUpdate = slidesCount.value !== slides.value.length
      const currentSlideUpdated =
        props.modelValue !== undefined && currentSlideIndex.value !== props.modelValue

      if (currentSlideUpdated) {
        slideTo(Number(props.modelValue), true)
      }

      if (needToUpdate) {
        updateCarousel()
      }
    })

    const data = {
      config,
      slidesBuffer,
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
      updateSlidesBuffer,
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
      slides.value = slidesElements
      // Bind slide order
      slidesElements.forEach(
        (el: { props: { [key: string]: any } }, index: number) => (el.props.index = index)
      )
      const trackEl = h(
        'ol',
        {
          class: 'carousel__track',
          style: trackStyle.value,
          onMousedown: config.mouseDrag ? handleDragStart : null,
          onTouchstart: config.touchDrag ? handleDragStart : null,
        },
        slidesElements
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
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements]
      )
    }
  },
})
