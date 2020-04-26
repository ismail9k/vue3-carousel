<template>
  <section ref="root" class="carousel" aria-label="Gallery" style="">
    <div ref="track" class="carousel__track" @scroll="handleTrackScroll">
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
} from 'vue';

import { debounce } from '../utils';

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
    infiniteScroll: {
      default: false,
      type: Boolean,
    },
    // control center mode
    mode: {
      default: true,
      type: Boolean,
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
      currentSlide.value = slideNumber;
    }

    onMounted(() => {
      const rect = root.value.getBoundingClientRect();
      slideWidth.value = rect.width / config.itemsToShow;
    });

    watchEffect(() => {
      const xScroll = (currentSlide.value - 1) * slideWidth.value;
      track.value?.scroll(xScroll, 0);
    });

    const handleTrackScroll = debounce((event) => {
      const target = event.target;
      const scroll = target.scrollLeft;
      currentSlide.value = Math.round(scroll / slideWidth.value) + 1;
    }, 300);

    return {
      root,
      track,
      slideTo,
      handleTrackScroll,
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
  margin: 0;
}
.carousel__track {
  overflow-x: auto;
  scroll-snap-type: x mandatory;

  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.carousel__track::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
.carousel__track::-webkit-scrollbar-thumb {
  background: black;
  border-radius: 5px;
}
.carousel__track::-webkit-scrollbar-track {
  background: transparent;
}
</style>
