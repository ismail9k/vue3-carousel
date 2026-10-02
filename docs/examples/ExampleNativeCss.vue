<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from '../../dist/carousel.mjs'

const carouselConfig = {
  nativeCss: true,
  itemsToShow: 2.5,
  gap: 10,
  snapAlign: 'start',
}
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

.carousel {
  --vc-pgn-background-color: rgba(255, 255, 255, 0.7);
  --vc-pgn-active-color: rgba(255, 255, 255, 1);
  --vc-nav-background: rgba(255, 255, 255, 0.7);
  --vc-nav-border-radius: 100%;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: #3b3f5c;
  color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
