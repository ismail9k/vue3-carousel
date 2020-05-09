<template>
  <li class="carousel__slide" :style="slideStyle">
    <slot />
  </li>
</template>

<script>
import { defineComponent, inject, ref, computed, watchEffect } from 'vue';

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
    const slidesBuffer = inject('slidesBuffer', ref([]));

    if (config.wrapAround.value) {
      updateOrder();
      watchEffect(updateOrder);
    }

    const slideStyle = computed(() => {
      const items = config.itemsToShow.value;
      const width = `${(1 / items) * 100}%`;
      return {
        width,
        order: slideOrder.value.toString(),
      };
    });

    function updateOrder() {
      slideOrder.value = slidesBuffer.value.indexOf(props.order);
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
