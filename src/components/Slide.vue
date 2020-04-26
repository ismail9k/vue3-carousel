<template>
  <li class="carousel__slide" :style="slideStyle">
    <slot />
  </li>
</template>

<script>
import { defineComponent, inject, ref, computed } from 'vue';

export default defineComponent({
  setup() {
    const config = inject('config', ref({}));

    const slideStyle = computed(() => {
      const items = config.itemsToShow.value;
      const width = `${(1 / items) * 100}%`;
      return { width };
    });

    return {
      slideStyle,
    };
  },
});
</script>

<style>
.carousel__slide {
  scroll-snap-align: start;
  flex-shrink: 0;
  margin: 0;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
