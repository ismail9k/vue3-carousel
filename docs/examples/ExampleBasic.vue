<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.mjs'
import '../../dist/carousel.css'
const config = {}
</script>

<template>
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
