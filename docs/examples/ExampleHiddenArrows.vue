<template>
  <Carousel :items-to-show="3">
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
.carousel__prev--in-active,
.carousel__next--in-active {
  display: none;
}
</style>
