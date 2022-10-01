<template>
  <Carousel :items-to-show="3" :wrap-around="false">
    <Slide key="sdfs">
      <div class="carousel__item">{{ ddfds }}</div>
    </Slide>

    <Slide key="sdfs">
      <div class="carousel__item">{{ ddfds }}</div>
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
