<script setup>
import { ref } from 'vue'
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
const config = {}
const enabled = ref(true)
</script>

<template>
  <div>
    <span>Enabled: </span>
    <input id="status-checkbox" type="checkbox" v-model="enabled" />
  </div>

  <div class="carousel__wrapper">
    <Carousel v-bind="config" :enabled="enabled">
      <Slide v-for="slide in 10" :key="slide">
        <div class="carousel__item">{{ slide }}</div>
      </Slide>
      <template #addons>
        <Navigation />
        <Pagination />
      </template>
    </Carousel>
  </div>
</template>

<style>
.carousel__wrapper {
  width: 100%;
  display: flex;
  gap: 5px;
  height: 200px;
}

.carousel {
  flex: 1;
}
</style>
