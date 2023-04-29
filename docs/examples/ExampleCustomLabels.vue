<template>
  <Carousel
    :i18n="{
      ariaNextSlide: 'Zur nächsten Slide',
      ariaPreviousSlide: 'Zur vorherigen Slide',
      ariaNavigateToSlide: 'Springe zu Slide {slideNumber}',
      ariaGallery: 'Galerie',
      itemXofY: 'Slide {currentSlide} von {slidesCount}',
      iconArrowUp: 'Pfeil nach oben',
      iconArrowDown: 'Pfeil nach unten',
      iconArrowRight: 'Pfeil nach rechts',
      iconArrowLeft: 'Pfeil nach links',
    }"
  >
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
