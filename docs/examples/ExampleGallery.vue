<script setup>
import { Carousel, Slide, Navigation } from '../../dist/carousel.mjs'

import '../../dist/carousel.css'
import { ref } from 'vue'

const currentSlide = ref(0)
const slideTo = (index) => {
  currentSlide.value = index
}

const galleryConfig = {
  itemsToShow: 1,
  slideEffect: 'fade',
  wrapAround: true,
  mouseDrag: false,
  touchDrag: false,
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

  <Carousel
    id="thumbnails"
    v-bind="thumbnailsConfig"
    v-model="currentSlide"
    ref="thumbnailsCarousel"
  >
    <Slide v-for="slide in 10" :key="slide">
      <template #default="{ currentIndex, isActive }">
        <div
          class="carousel__item"
          :class="{ active: isActive }"
          @click="slideTo(currentIndex)"
        >
          {{ slide }}
        </div>
      </template>
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

.carousel__item.active {
  border: 2px solid #42b883;
}
</style>


