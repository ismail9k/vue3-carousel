<template>
  <Carousel :items-to-show="3" id="hideArrowsExample">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue';
import { Carousel, Slide, Navigation } from '../../dist/carousel.es';

import '../../dist/carousel.css';

export default defineComponent({
  name: 'HiddenArrows',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
});
</script>

<style>
#hideArrowsExample .carousel__prev--in-active,
#hideArrowsExample .carousel__next--in-active {
  display: none;
}
</style>
