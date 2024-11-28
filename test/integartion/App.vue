<script setup>
import { Carousel } from '@/components/Carousel'
import { Slide } from '@/components/Slide'
const config = {}
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="slide in 5" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  </Carousel>
</template>
