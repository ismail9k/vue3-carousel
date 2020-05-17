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

import eventsBus from '../partials/EventsBus';
import slidesCounter from '../partials/counter';
import { debounce } from '../partials/utils';

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
    // control center mode
    mode: {
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

    watchEffect((): void => {
      if (slots.slides) {
        slides.value = slots.slides()?.[0]?.children || [];
      }

      // Handel when slides added/removed
      const needToUpdate = slidesCount.value !== slides.value.length;
      if (needToUpdate) {
        updateSlidesData();
        updateSlidesBuffer();
        slidesCounter.value = slides.value.length - 1;
      }
    });

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

    const handleWindowResize = () =>
      debounce(() => {
        if (breakpoints.value) updateConfig();
        updateSlideWidth();
      }, 500);

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
      updateSlideWidth();
      if (breakpoints.value) updateConfig();
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

    const handleDrag = () =>
      function (event: MouseEvent & TouchEvent): void {
        endPosition.x = isTouch ? event.touches[0].clientX : event.clientX;
        endPosition.y = isTouch ? event.touches[0].clientY : event.clientY;
        const deltaX = endPosition.x - startPosition.x;
        const deltaY = endPosition.y - startPosition.y;

        dragged.y = deltaY;
        dragged.x = deltaX;

        if (!isTouch) {
          event.preventDefault();
        }
      };

    function handleDragStart(event: MouseEvent & TouchEvent): void {
      isTouch = event.type === 'touchstart';
      if ((!isTouch && event.button !== 0) || isSliding.value) {
        return;
      }

      isDragging.value = true;
      startPosition.x = isTouch ? event.touches[0].clientX : event.clientX;
      startPosition.y = isTouch ? event.touches[0].clientY : event.clientY;

      document.addEventListener(isTouch ? 'touchmove' : 'mousemove', handleDrag);
      document.addEventListener(isTouch ? 'touchend' : 'mouseup', handleDragEnd);
    }

    function handleDragEnd(): void {
      isDragging.value = false;

      const draggedSlides = Math.round(dragged.x / slideWidth.value);

      slideTo(currentSlide.value - draggedSlides);
      dragged.x = 0;
      dragged.y = 0;
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
        updateSlidesBuffer();
        eventsBus.emit('sliding-end');
        isSliding.value = false;
      }, config.transition);
    }

    function next(): void {
      const isLastSlide = currentSlide.value >= slidesCount.value - 1;
      if (!isLastSlide) {
        slideTo(currentSlide.value + 1);
        return;
      }
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
      if (config.wrapAround) {
        slideTo(slidesCount.value - 1);
      }
    }
    const nav: CarouselNav = { slideTo, next, prev };
    provide('nav', nav);

    /**
     * Track style
     */
    const trackStyle = computed(
      (): ElementStyleObject => {
        let slidesToScroll = slidesBuffer.value.indexOf(currentSlide.value);

        if (config.mode === 'center') {
          slidesToScroll -= (config.itemsToShow - 1) / 2;
        }
        if (config.mode === 'end') {
          slidesToScroll -= config.itemsToShow - 1;
        }

        if (!config.wrapAround) {
          const max = slidesCount.value - config.itemsToShow;
          const min = 0;
          slidesToScroll = Math.max(Math.min(slidesToScroll, max), min);
        }

        const xScroll = slidesToScroll * slideWidth.value - dragged.x;
        return {
          transform: `translateX(-${xScroll}px)`,
          transition: `${isSliding.value ? config.transition : 0}ms`,
        };
      }
    );

    const slidesEl = slots.slides ? slots.slides() : [];
    const addonsEl = slots.addons ? slots.addons() : [];
    const trackEl = h(
      'ol',
      {
        class: 'carousel__track',
        style: trackStyle,
        on: { mousedown: handleDragStart, touchstrat: handleDragStart },
      },
      slidesEl
    );
    const viewPortEl = h('div', { class: 'carousel__viewport' }, trackEl);

    return () =>
      h(
        'section',
        {
          ref: 'root',
          class: 'carousel',
          attr: {
            'aria-label': 'Gallery',
          },
        },
        [viewPortEl, addonsEl]
      );
  },
});
