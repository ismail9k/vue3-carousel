<script setup>
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.mjs'
import '../../dist/carousel.css'

const images = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/800/600?random=${index + 1}`,
}))

const config = {
  height: 200,
  itemsToShow: 2,
  gap: 5,
  mouseWheel: true,
  wrapAround: true,
}
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <div class="carousel__item">
        <img :src="image.url" alt="image" />
      </div>
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

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
