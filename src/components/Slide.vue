<template>
  <li class="carousel__slide" :style="slideStyle">
    <slot />
  </li>
</template>

<script>
import eventsBus from '../EventsBus';

import {
  defineComponent,
  inject,
  ref,
  computed,
  //watch
} from 'vue';

export default defineComponent({
  name: 'CarouselSlide',
  props: {
    order: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const slideOrder = ref(props.order);
    const config = inject('config', ref({}));
    const slidesCount = inject('slidesCount', ref(0));
    const currentSlide = inject('currentSlide', ref(0));
    const middleSlide = inject('middleSlide', ref(0));

    if (config.wrapAround.value) {
      updateSlideOrder();
      eventsBus.on('sliding-end', updateSlideOrder);
    }

    const slideStyle = computed(() => {
      const items = config.itemsToShow.value;
      const width = `${(1 / items) * 100}%`;
      return {
        width,
        order: slideOrder.value.toString(),
      };
    });

    function updateSlideOrder() {
      const order = props.order;
      const current = currentSlide.value;
      const count = slidesCount.value;
      const middle = middleSlide.value;

      slideOrder.value = (middle + order - current) % count;
    }

    return {
      slideStyle,
      props,
    };
  },
});
</script>

<style>
.carousel__slide {
  scroll-snap-stop: auto;
  flex-shrink: 0;
  margin: 0;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
