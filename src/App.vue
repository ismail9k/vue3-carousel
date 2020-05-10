<template>
  <div id="app">
    <carousel
      :settings="{ itemsToShow: 2.5, mode: 'center', wrapAround: true }"
    >
      <template #slides>
        <slide v-for="(n, order) in slides" :key="n" :order="order">
          {{ order }}
        </slide>
      </template>

      <template #addons>
        <pagination />
        <navigation />
      </template>
    </carousel>

    <button @click="addSlide">Add slide</button>
    <button @click="removeSlide">remove slide</button>
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
  data: () => ({
    slides: [],
  }),
  mounted() {
    setTimeout(() => {
      this.slides = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }, 1000);
  },
  methods: {
    addSlide() {
      this.slides.push(this.slides.length + 1);
    },
    removeSlide() {
      this.slides.pop();
    },
  },
});
</script>

<style>
.carousel {
  width: 50vw;
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
