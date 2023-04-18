<template>
  <Carousel :labels="{
    'ariaNextSlide': 'Zur nächsten Slide',
    'ariaPreviousSlide': 'Zur vorherigen Slide',
    'ariaNavigateToSlide': 'Springe zu Slide',
    'ariaGallery': 'Galerie',
    'itemXofY': 'Slide ${0} von ${1}',
    'iconAriaLabels': {
      'arrowUp': 'Pfeil nach oben',
      'arrowDown': 'Pfeil nach unten',
      'arrowRight': 'Pfeil nach rechts',
      'arrowLeft': 'Pfeil nach links',
    }
  }">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Navigation, Slide } from '../../dist/carousel.es'

import '../../dist/carousel.css'

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
})
</script>
