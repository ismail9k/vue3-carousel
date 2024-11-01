<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'
</script>

<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
