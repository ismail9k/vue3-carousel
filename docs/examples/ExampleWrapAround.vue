<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
const config1 = {
  itemsToShow: 3,
  modelValue: 2,
  snapAlign: 'start',
  wrapAround: true,
  gap: 20,
}
const config2 = {
  itemsToShow: 3,
  modelValue: 2,
  snapAlign: 'center-odd',
  wrapAround: true,
  gap: 20,
}
const config3 = {
  itemsToShow: 3,
  modelValue: 2,
  snapAlign: 'center-even',
  wrapAround: true,
  gap: 20,
}
const config4 = {
  itemsToShow: 3,
  modelValue: 2,
  snapAlign: 'end',
  wrapAround: true,
  gap: 20,
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

  <Carousel v-bind="config2">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  <Carousel v-bind="config3">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
  <Carousel v-bind="config4">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
