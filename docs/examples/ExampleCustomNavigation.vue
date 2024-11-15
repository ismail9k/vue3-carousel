<script setup>
import '../../dist/carousel.css'
import { ref } from 'vue'
import { Carousel, Slide, Navigation } from '../../dist/carousel.es'

const carouselRef = ref()
const currentSlide = ref(0)

const next = () => carouselRef.value.next()
const prev = () => carouselRef.value.prev()
</script>


<template>
  <Carousel ref="carouselRef" v-model="currentSlide" snapAlign="start">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide - 1 }}</div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>

  <div>
    <button @click="prev">Prev</button>
    <input type="number" min="0" max="9" v-model="currentSlide" />
    <button @click="next">Next</button>
  </div>
</template>

