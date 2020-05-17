<template>
  <li class="carousel__slide" :style="slideStyle">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent, inject, ref, computed, watchEffect } from 'vue';

import slidesCounter from '../partials/counter';

import { Data } from 'vue/types';

export default defineComponent({
  name: 'CarouselSlide',
  props: {
    order: {
      type: Number,
      default: 1,
    },
  },
  setup(props: Data): Data {
    const config = inject('config', ref({}));
    const slidesBuffer = inject('slidesBuffer', ref([]));

    const slideOrder = ref(slidesCounter.value);
    const wrapOrder = ref(slideOrder.value);

    if (config.wrapAround) {
      updateOrder();
      watchEffect(updateOrder);
    }

    const slideStyle = computed((): object => {
      const items = config.itemsToShow;
      const width = `${(1 / items) * 100}%`;
      return {
        width,
        order: wrapOrder.value.toString(),
      };
    });

    function updateOrder(): void {
      wrapOrder.value = slidesBuffer.value.indexOf(slideOrder.value);
    }

    return {
      slideStyle,
      props,
    };
  },
});
</script>
