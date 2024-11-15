<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
const config1 = {
  itemsToShow: 2.5,
  modelValue: 2,
  snapAlign: 'start',
}
const config2 = {
  itemsToShow: 2.5,
  modelValue: 2,
  snapAlign: 'center-odd',
}
const config3 = {
  itemsToShow: 2.5,
  modelValue: 2,
  snapAlign: 'center-even',
}
const config4 = {
  itemsToShow: 2.5,
  modelValue: 3,
  snapAlign: 'end',
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
