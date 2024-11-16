<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
const config1 = {
  itemsToShow: 2,
  modelValue: 0,
  snapAlign: 'center',
  gap: 10,
  dir: 'btt',
}
</script>

<template>
  <Carousel v-bind="config1">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
