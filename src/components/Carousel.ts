import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  provide,
  computed,
  watchEffect,
  h,
} from 'vue';

import counterFactory, { Counter } from '../partials/counter';
import { debounce, throttle } from '../partials/utils';

import {
  Data,
  SetupContext,
  CarouselConfig,
  Ref,
  CarouselNav,
  ElementStyleObject,
} from '../types';

export default defineComponent({
  name: 'Carousel',
  props: {
    // count of items to showed per view
    itemsToShow: {
      default: 1,
      type: Number,
    },
    // slide number number of initial slide
    currentSlide: {
      default: 0,
      type: Number,
    },
    // control infinite scrolling mode
    wrapAround: {
      default: false,
      type: Boolean,
    },
    // control snap position alignment
    snapAlign: {
      default: 'center',
      validator(value: string) {
        // The value must match one of these strings
        return ['start', 'end', 'center'].includes(value);
      },
    },
    // sliding transition time in ms
    transition: {
      default: 300,
      type: Number,
    },
    // an object to pass all settings
    settings: {
      default() {
        return {};
      },
      type: Object,
    },
    // an object to store breakpoints
    breakpoints: {
      default: null,
      type: Object,
    },
  },
  setup(props: Data, { slots }: SetupContext) {
    const root: Ref<Element | null> = ref(null);
    const slides: Ref<any> = ref([]);
    const slidesBuffer: Ref<Array<number>> = ref([]);
    const slideWidth: Ref<number> = ref(0);
    const slidesCount: Ref<number> = ref(1);
    const slidesCounter: Counter = counterFactory();

    // generate carousel configs
    const defaultConfig: CarouselConfig = {
      ...props,
      ...(props.settings as CarouselConfig),
    };
    const breakpoints: CarouselConfig = ref({ ...defaultConfig.breakpoints });
    // remove extra values
    delete defaultConfig.settings;
    delete defaultConfig.breakpoints;
    // current config
    const config = reactive({ ...defaultConfig });

    // slides
    const currentSlide = ref(config.currentSlide);
    const prevSlide = ref(0);
    const middleSlide = ref(0);

    provide('config', config);
    provide('slidesBuffer', slidesBuffer);
    provide('slidesCount', slidesCount);
    provide('currentSlide', currentSlide);
    provide('slidesCounter', slidesCounter);

    /**
     * Breakpoints
     */

    function updateConfig(): void {
      const breakpointsArray = Object.keys(breakpoints.value)
        .map((key: string): number => Number(key))
        .sort((a: number, b: number) => +b - +a);
      let newConfig = { ...defaultConfig };

      breakpointsArray.some((breakpoint): boolean => {
        const isMatched = window.matchMedia(`(min-width: ${breakpoint}px)`).matches;
        if (isMatched) {
          newConfig = { ...newConfig, ...breakpoints.value[breakpoint] };
          return true;
        }
        return false;
      });
      Object.keys(newConfig).forEach((key): any => (config[key] = newConfig[key]));
    }

    const handleWindowResize = debounce(() => {
      if (breakpoints.value) updateConfig();
      updateSlideWidth();
    }, 16);

    /**
     * Setup functions
     */

    function updateSlideWidth(): void {
      if (!root.value) return;
      const rect = root.value.getBoundingClientRect();
      slideWidth.value = rect.width / config.itemsToShow;
    }

    function updateSlidesData(): void {
      slidesCount.value = slides.value.length;
      middleSlide.value = Math.ceil((slidesCount.value - 1) / 2);
    }

    function updateSlidesBuffer(): void {
      const slidesArray = [...Array(slidesCount.value).keys()];
      if (config.wrapAround) {
        const shifts = currentSlide.value + middleSlide.value + 1;
        for (let i = 0; i < shifts; i++) {
          slidesArray.push(Number(slidesArray.shift()));
        }
      }
      slidesBuffer.value = slidesArray;
    }

    onMounted((): void => {
      if (breakpoints.value) updateConfig();
      updateSlideWidth();

      // @ts-ignore
      window.addEventListener('resize', handleWindowResize, { passive: true });
    });

    /**
     * Carousel Event listeners
     */
    let isTouch = false;
    const startPosition = { x: 0, y: 0 };
    const endPosition = { x: 0, y: 0 };
    const dragged = reactive({ x: 0, y: 0 });
    const isDragging = ref(false);

    const handleDrag = throttle((event: MouseEvent & TouchEvent): void => {
      endPosition.x = isTouch ? event.touches[0].clientX : event.clientX;
      endPosition.y = isTouch ? event.touches[0].clientY : event.clientY;
      const deltaX = endPosition.x - startPosition.x;
      const deltaY = endPosition.y - startPosition.y;

      dragged.y = deltaY;
      dragged.x = deltaX;

      if (!isTouch) {
        event.preventDefault();
      }
    }, 16);

    function handleDragStart(event: MouseEvent & TouchEvent): void {
      isTouch = event.type === 'touchstart';
      if ((!isTouch && event.button !== 0) || isSliding.value) {
        return;
      }

      isDragging.value = true;
      startPosition.x = isTouch ? event.touches[0].clientX : event.clientX;
      startPosition.y = isTouch ? event.touches[0].clientY : event.clientY;

      // @ts-ignore
      document.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDrag);
      document.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd);
    }

    function handleDragEnd(): void {
      isDragging.value = false;

      const tolerance = Math.sign(dragged.x) * 0.4;
      const draggedSlides = Math.round(dragged.x / slideWidth.value + tolerance);

      let newSlide = currentSlide.value - draggedSlides;
      if (!config.wrapAround)
        newSlide = Math.max(Math.min(newSlide, slidesCount.value - 1), 0);
      slideTo(newSlide);

      dragged.x = 0;
      dragged.y = 0;

      // @ts-ignore
      document.removeEventListener(isTouch ? 'touchmove' : 'mousemove', handleDrag);
      document.removeEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd);
    }

    /**
     * Navigation function
     */
    const isSliding = ref(false);
    function slideTo(slideIndex: number): void {
      if (currentSlide.value === slideIndex || isSliding.value) {
        return;
      }

      // Wrap slide index
      const lastSlideIndex = slidesCount.value - 1;
      if (slideIndex > lastSlideIndex) {
        return slideTo(slideIndex - slidesCount.value);
      }
      if (slideIndex < 0) {
        return slideTo(slideIndex + slidesCount.value);
      }

      isSliding.value = true;
      prevSlide.value = currentSlide.value;
      currentSlide.value = slideIndex;

      setTimeout((): void => {
        if (config.wrapAround) {
          updateSlidesBuffer();
        }
        isSliding.value = false;
      }, config.transition);
    }

    function next(): void {
      const isLastSlide = currentSlide.value >= slidesCount.value - 1;
      if (!isLastSlide) {
        slideTo(currentSlide.value + 1);
        return;
      }
      // if wrap around to the first slide
      if (config.wrapAround) {
        slideTo(0);
      }
    }

    function prev(): void {
      const isFirstSlide = currentSlide.value <= 0;
      if (!isFirstSlide) {
        slideTo(currentSlide.value - 1);
        return;
      }
      // if wrap around to the last slide
      if (config.wrapAround) {
        slideTo(slidesCount.value - 1);
      }
    }
    const nav: CarouselNav = { slideTo, next, prev };
    provide('nav', nav);

    /**
     * Track style
     */
    const slidesToScroll = computed((): number => {
      let output = slidesBuffer.value.indexOf(currentSlide.value);
      if (config.snapAlign === 'center') {
        output -= (config.itemsToShow - 1) / 2;
      }
      if (config.snapAlign === 'end') {
        output -= config.itemsToShow - 1;
      }

      if (!config.wrapAround) {
        const max = slidesCount.value - config.itemsToShow;
        const min = 0;
        output = Math.max(Math.min(output, max), min);
      }
      return output;
    });

    const trackStyle = computed(
      (): ElementStyleObject => {
        const xScroll = dragged.x - slidesToScroll.value * slideWidth.value;
        return {
          transform: `translateX(${xScroll}px)`,
          transition: `${isSliding.value ? config.transition : 0}ms`,
        };
      }
    );

    const slotsProps = reactive({ slideWidth, slidesCount, currentSlide });
    const slotSlides = slots.default || slots.slides;
    const slotAddons = slots.addons;

    watchEffect((): void => {
      const slidesElements = slotSlides?.(slotsProps) || [];
      slides.value = slidesElements[0]?.children || [];

      // Handel when slides added/removed
      const needToUpdate = slidesCount.value !== slides.value.length;
      if (needToUpdate) {
        updateSlidesData();
        updateSlidesBuffer();
      }
      if (slidesCounter.read) {
        slidesCounter.value = slides.value.length - 1;
      }
    });

    updateSlidesBuffer();

    return () => {
      const slidesElements = slotSlides?.(slotsProps) || [];
      const addonsElements = slotAddons?.(slotsProps) || [];
      const trackEl = h(
        'ol',
        {
          class: 'carousel__track',
          style: trackStyle.value,
          onMousedown: handleDragStart,
          onTouchstart: handleDragStart,
        },
        slidesElements
      );
      const viewPortEl = h('div', { class: 'carousel__viewport' }, trackEl);

      return h(
        'section',
        {
          ref: root,
          class: 'carousel',
          'aria-label': 'Gallery',
        },
        [viewPortEl, addonsElements]
      );
    };
  },
});
