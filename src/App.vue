<template>
  <div id="app">
    <carousel
      :settings="{ itemsToShow: 3.5, mode: 'center', wrapAround: true }"
    >
      <template #slides>
        <slide v-for="n in 10" :key="n" :order="n">
          {{ n }}
        </slide>
      </template>

      <template #addons="{ nav }">
        <pagination @slide="nav.slideTo" />
        <navigation @prev="nav.prev" @next="nav.next" />
      </template>
    </carousel>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import Carousel from './components/Carousel.vue';
import Slide from './components/Slide.vue';
import Pagination from './components/Pagination.vue';
import Navigation from './components/Navigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<style>
.carousel {
  width: 700px;
}
html,
body {
  height: 100%;
}
body {
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel__slide {
  height: 300px;
  border-radius: 10px;
  background: #5563de;
  color: #ffffff;
  font-size: 50px;
  border: 2px solid #ffffff;
}
</style>
