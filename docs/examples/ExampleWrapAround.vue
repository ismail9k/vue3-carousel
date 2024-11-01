<script setup>
import { Carousel, Navigation, Slide } from '../../dist/carousel.es'
import '../../dist/carousel.css'

const config = {
  itemsToShow: 2.5,
  wrapAround: true,
}
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>
