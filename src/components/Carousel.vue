<template>
  <section ref="root" class="carousel" aria-label="Gallery">
    <div class="carousel__viewport">
      <ol class="carousel__track" :style="trackStyle">
        <slot name="slides" />
      </ol>
    </div>
    <slot name="addons" :nav="nav" />
  </section>
</template>

<script>
import eventsBus from '../EventsBus';

import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  provide,
  computed,
  watchEffect,
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
    const currentSlide = ref(0);
    const prevSlide = ref(1);
    const slidesCount = ref(1);
    const middleSlide = ref(1);
    const slidesBuffer = ref([]);
    const isSliding = ref(false);
    const config = reactive({
      ...props,
      ...props.settings,
    });

    watchEffect(() => {
      slides.value = slots.slides()?.[0]?.children || [];
      const needToUpdate = slidesCount.value !== slides.value.length;
      if (needToUpdate) {
        updateSlidesData();
        updateSlidesBuffer();
      }
    });

    provide('config', config);
    provide('slidesCount', slidesCount);
    provide('middleSlide', middleSlide);
    provide('currentSlide', currentSlide);
    provide('slidesBuffer', slidesBuffer);

    /**
     * Setup functions
     */

    onMounted(() => {
      updateSlideWidth();
      new ResizeObserver((entries) => {
        for (let entry of entries) updateSlideWidth(entry.contentRect);
      }).observe(root.value);
    });

    function updateSlideWidth(contentRect) {
      const rect = contentRect || root.value.getBoundingClientRect();
      slideWidth.value = rect.width / config.itemsToShow;
    }

    function updateSlidesData() {
      slidesCount.value = slides.value.length;
      middleSlide.value = Math.ceil((slidesCount.value - 1) / 2);
    }

    function updateSlidesBuffer() {
      const slidesArray = [...Array(slidesCount.value).keys()];
      if (config.wrapAround) {
        const shifts = currentSlide.value + middleSlide.value + 1;
        for (let i = 0; i < shifts; i++) {
          slidesArray.push(slidesArray.shift());
        }
      }
      slidesBuffer.value = slidesArray;
    }

    const trackStyle = computed(() => {
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

      const xScroll = slidesToScroll * slideWidth.value;
      return {
        transform: `translateX(-${xScroll}px)`,
        transition: `${isSliding.value ? config.transition : 0}ms`,
      };
    });

    /**
     * Navigation function
     */

    function slideTo(slideNumber) {
      if (currentSlide.value === slideNumber || isSliding.value) return;
      isSliding.value = true;
      prevSlide.value = currentSlide.value;
      currentSlide.value = slideNumber;

      setTimeout(() => {
        updateSlidesBuffer();
        eventsBus.emit('sliding-end');
        isSliding.value = false;
      }, config.transition);
    }

    function next() {
      const isLastSlide = currentSlide.value >= slidesCount.value - 1;
      if (!isLastSlide) {
        slideTo(currentSlide.value + 1);
        return;
      }
      if (config.wrapAround) {
        slideTo(0);
      }
    }

    function prev() {
      const isFirstSlide = currentSlide.value <= 0;
      if (!isFirstSlide) {
        slideTo(currentSlide.value - 1);
        return;
      }
      if (config.wrapAround) {
        slideTo(slidesCount.value - 1);
      }
    }
    const nav = { slideTo, next, prev };
    provide('nav', nav);

    return {
      root,
      trackStyle,
      nav,
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
  margin: 0;
  padding: 0;
  position: relative;
}

.carousel__viewport {
  overflow: hidden;
}
</style>
