<template>
  <div id="app">
    <carousel :settings="{ itemsToShow: 3 }">
      <template #slides>
        <slide v-for="n in 10" :key="n">
          {{ n }}
        </slide>
      </template>

      <template #addons="{ nav }">
        <navigation @slide="nav.slideTo" />
      </template>
    </carousel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Carousel from './components/Carousel.vue';
import Slide from './components/Slide.vue';
import Navigation from './components/Navigation.vue';

export default defineComponent({
  name: 'App',
  components: {
    Carousel,
    Slide,
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
}
</style>
