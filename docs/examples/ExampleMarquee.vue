<script setup>
import '../../dist/carousel.css'
import { Carousel, Slide } from '../../dist/carousel.mjs'

const images = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  url: `https://picsum.photos/seed/${Math.random()}/800/600`,
}))

const config = {
  height: 160,
  itemsToShow: 3,
  gap: 10,
  marquee: true,
  marqueeSpeed: 60,
  pauseAutoplayOnHover: true,
}
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="image in images" :key="image.id">
      <img :src="image.url" alt="image" />
    </Slide>
  </Carousel>
</template>

<style>
:root {
  background-color: #242424;
}

img {
  border-radius: 8px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
