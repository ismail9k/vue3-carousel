<template>
  <section ref="root" class="carousel" aria-label="Gallery">
    <div
      ref="track"
      class="carousel__track"
      @scroll.prevent=""
      :style="trackStyle"
    >
      <ol ref="viewport" class="carousel__viewport">
        <slot name="slides" />
      </ol>
    </div>
    <slot name="addons" :nav="{ slideTo }" />
  </section>
</template>

<script>
import {
  defineComponent,
  onMounted,
  watchEffect,
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
    const track = ref(null);
    const slides = ref([]);
    const slideWidth = ref(0);
    const currentSlide = ref(1);
    const prevSlide = ref(1);
    const slidesCount = ref(1);
    const middleSlide = ref(1);
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
      if (currentSlide.value === slideNumber) return;
      prevSlide.value = currentSlide.value;
      currentSlide.value = slideNumber;
    }

    onMounted(() => {
      const rect = root.value.getBoundingClientRect();
      slideWidth.value = rect.width / config.itemsToShow;
    });

    const getSlidesBufferCount = computed(() => {
      if (!config.wrapAround) return 0;

      const current = currentSlide.value;
      const middle = middleSlide.value;
      const count = slidesCount.value;

      if (current >= middle) {
        return -1 * (current - middle + 1);
      }
      return count - (current + middle - 1);
    });

    watchEffect(() => {
      let slidesToScroll = currentSlide.value + getSlidesBufferCount.value - 1;

      if (config.mode === 'center') {
        slidesToScroll -= (config.itemsToShow - 1) / 2;
      }
      if (config.mode === 'end') {
        slidesToScroll += (config.itemsToShow - 1) / 2 - 1;
      }

      const xScroll = slidesToScroll * slideWidth.value;

      setTimeout(() => {
        track.value?.scroll(xScroll, 0);
      });
    });

    const trackStyle = computed(() => ({ overflowX: 'hidden' }));

    return {
      root,
      track,
      slideTo,
      trackStyle,
    };
  },
});
</script>

<style>
.carousel {
  text-align: center;
  overflow: hidden;
  box-sizing: border-box;
}

.carousel * {
  box-sizing: border-box;
}

.carousel__viewport {
  display: flex;
  padding: 0;
  position: relative;
  margin: 5px 0;
}
.carousel__track {
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
