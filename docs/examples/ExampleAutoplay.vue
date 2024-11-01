<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Navigation } from '../../dist/carousel.es'

const config = {
  autoplay: 2000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
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

