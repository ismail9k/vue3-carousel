<script setup>
import { Carousel, Slide, Navigation } from '../../dist/carousel.es'

import '../../dist/carousel.css'
import { ref } from 'vue'

const currentSlide = ref(0)

const slideTo = (nextSlide) => (currentSlide.value = nextSlide)

const galleryConfig = {
  itemsToShow: 1,
  mouseDrag: false,
  touchDrag: false,
  wrapAround: false,
}

const thumbnailsConfig = {
  itemsToShow: 7,
  wrapAround: true,
  height: 100,
  gap: 10,
}
</script>

<template>
  <Carousel id="gallery" v-bind="galleryConfig" v-model="currentSlide">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  </Carousel>

  <Carousel id="thumbnails" v-bind="thumbnailsConfig" v-model="currentSlide">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item" @click="slideTo(slide - 1)">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>


<style>
#thumbnails {
  margin-top: 10px;
  .carousel__track {
    min-height: auto;
  }
}
</style>


