<script setup lang="ts">
import {
  Carousel,
  Slide,
  Navigation as CarouselNavigation,
  Pagination as CarouselPagination,
} from '@/index'

import {ref} from 'vue';

const vModel = defineModel<number>({ default: 0 })
const slideNum = 5;
const carousel = ref();
</script>

<template>
  <Carousel
    v-model="vModel"
    ref="carousel"
  >
    <Slide v-for="slide in slideNum" :key="slide">
      {{ slide }}
      <input type="text" />
    </Slide>
  </Carousel>
  <CarouselNavigation v-if="carousel" :carousel="carousel" />
  <CarouselPagination v-if="carousel" :carousel="carousel" />
</template>
