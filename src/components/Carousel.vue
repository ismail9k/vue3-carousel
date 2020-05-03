<template>
  <section ref="root" class="carousel" aria-label="Gallery">
    <div class="carousel__viewport" :style="viewportStyle">
      <ol class="carousel__track" :style="trackStyle">
        <slot name="slides" />
      </ol>
    </div>
    <slot name="addons" :nav="{ slideTo, next, prev }" />
  </section>
</template>

<script>
import eventsBus from '../EventsBus';

import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  reactive,
  provide,
  computed,
} from 'vue';

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
      default: 1,
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
      validator(value) {
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
  },
  setup(props, { slots }) {
    const root = ref(null);
    const slides = ref([]);
    const slideWidth = ref(0);
    const currentSlide = ref(1);
    const prevSlide = ref(1);
    const slidesCount = ref(1);
    const middleSlide = ref(1);
    const isSliding = ref(false);
    const config = reactive({
      ...props,
      ...props.settings,
    });

    slides.value = slots.slides()?.[0]?.children || [];
    slidesCount.value = slides.value.length;
    middleSlide.value = Math.ceil(slidesCount.value / 2);

    provide('config', toRefs(config));
    provide('slidesCount', slidesCount);
    provide('middleSlide', middleSlide);
    provide('currentSlide', currentSlide);

    function slideTo(slideNumber) {
      if (currentSlide.value === slideNumber || isSliding.value) return;
      isSliding.value = true;
      prevSlide.value = currentSlide.value;
      currentSlide.value = slideNumber;

      setTimeout(() => {
        isSliding.value = false;
        eventsBus.emit('sliding-end');
      }, config.transition);
    }

    function next() {
      const isLastSlide = currentSlide.value >= slidesCount.value;
      if (!isLastSlide) {
        slideTo(currentSlide.value + 1);
        return;
      }
      if (config.wrapAround) {
        slideTo(1);
      }
    }

    function prev() {
      const isFirstSlide = currentSlide.value === 1;
      if (!isFirstSlide) {
        slideTo(currentSlide.value - 1);
        return;
      }
      if (config.wrapAround) {
        slideTo(slidesCount.value);
      }
    }

    onMounted(() => {
      const rect = root.value.getBoundingClientRect();
      slideWidth.value = rect.width / config.itemsToShow;
    });

    /**
     * mode:
     * true => current slide
     * false => previous slide
     */
    function getSlidesBufferCount(mode) {
      if (!config.wrapAround) return 0;

      const slides = mode ? currentSlide.value : prevSlide.value;
      const middle = middleSlide.value;
      const count = slidesCount.value;

      if (slides >= middle) {
        return -1 * (slides - middle + 1);
      }
      return count - (slides + middle - 1);
    }

    const trackStyle = computed(() => {
      const _isSliding = isSliding.value;
      let slidesToScroll =
        currentSlide.value + getSlidesBufferCount(!_isSliding) - 1;

      if (config.mode === 'center') {
        slidesToScroll -= (config.itemsToShow - 1) / 2;
      }
      if (config.mode === 'end') {
        slidesToScroll += (config.itemsToShow - 1) / 2 - 1;
      }

      const xScroll = slidesToScroll * slideWidth.value;
      return {
        transform: `translateX(-${xScroll}px)`,
        transition: `${_isSliding ? config.transition : 0}ms`,
      };
    });

    const viewportStyle = computed(() => ({ overflowX: 'hidden' }));

    return {
      root,
      trackStyle,
      viewportStyle,
      slideTo,
      next,
      prev,
    };
  },
});
</script>

<style>
.carousel {
  position: relative;
  text-align: center;
  box-sizing: border-box;
}

.carousel * {
  box-sizing: border-box;
}

.carousel__track {
  display: flex;
  padding: 0;
  position: relative;
  margin: 5px 0;
}
.carousel__viewport {
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
