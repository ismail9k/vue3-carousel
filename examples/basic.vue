<template>
  <carousel :items-to-show="1.5" :wrap-around="true">
    <slide v-for="slide in 10" :key="slide">{{ slide }}</slide>
    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Navigation, Slide } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 10px;
}
* {
  box-sizing: border-box;
}
.carousel__slide {
  background: #642afb;
  color: white;
  font-size: 20px;
  border: 2px solid white;
  border-radius: 5px;
  height: 200px;
}
</style>
