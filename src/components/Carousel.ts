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
  DefineComponent,
  VNode,
} from 'vue'

import { defaultConfigs } from '@/partials/defaults'
import { carouselProps } from '@/partials/props'
import {
  debounce,
  throttle,
  getSlidesVNodes,
  getCurrentSlideIndex,
  getMaxSlideIndex,
  getMinSlideIndex,
  getSlidesToScroll,
  getNumberInRage,
} from '@/partials/utils'
import SlideComponent from './Slide'
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
  props: carouselProps,
  setup(props: CarouselConfig, { slots, emit, expose }: SetupContext) {
    const root: Ref<Element | null> = ref(null)
    const slides: Ref<any> = ref([])
    const slideWidth: Ref<number> = ref(0)
    const slidesCount: Ref<number> = ref(1)
    let autoplayTimer: ReturnType<typeof setInterval> | null
    let transitionTimer: ReturnType<typeof setTimeout>

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

    onMounted((): void => {
      if (breakpoints.value) {
        updateBreakpointsConfigs()
        updateSlidesData()
      }
      nextTick(() => setTimeout(updateSlideWidth, 16))

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
    function slideTo(slideIndex: number, mute = false): void {
      if (currentSlideIndex.value === slideIndex || isSliding.value) {
        return
      }

      resetAutoplay()

      let currentVal = slideIndex
      if (!config.wrapAround) {
        currentVal = getSlideInRange(slideIndex)
      }

      isSliding.value = true
      prevSlideIndex.value = currentSlideIndex.value
      currentSlideIndex.value = currentVal

      if (!mute) {
        emit('update:modelValue', currentSlideIndex.value)
      }
      transitionTimer = setTimeout((): void => {
        isSliding.value = false
        currentSlideIndex.value = getSlideInRange(currentVal)
      }, config.transition)
    }

    function getSlideInRange(current: number): number {
      return getNumberInRage(current, maxSlideIndex.value, minSlideIndex.value)
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
        margin: `0 -${slidesCount.value * slideWidth.value}px`,
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
      slides.value = slidesElements
      slidesElements.forEach(
        (el: typeof SlideComponent, index: number) => (el.props.index = index)
      )
      const slidesBefore = slidesElements.map((el: VNode, index: number) =>
        cloneVNode(el, { index: -slidesElements.length + index })
      )
      const slidesAfter = slidesElements.map((el: VNode, index: number) =>
        cloneVNode(el, { index: slidesElements.length + index })
      )
      const output = [...slidesBefore, ...slidesElements, ...slidesAfter]
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
          onMouseenter: handleMouseEnter,
          onMouseleave: handleMouseLeave,
        },
        [viewPortEl, addonsElements]
      )
    }
  },
})
