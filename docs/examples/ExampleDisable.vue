<script setup>
import { ref } from 'vue'
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
const enabled = ref(true)
const config = { enabled }
</script>

<template>
  <div>
    <span>Enabled: </span>
    <input id="status-checkbox" type="checkbox" v-model="enabled" />
  </div>

  <Carousel v-bind="config">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style scoped>
.carousel.is-disabled {
  width: 100%;
  display: flex;
  gap: 5px;
  height: 200px;
}
</style>
