<script setup lang="ts">
import {
  Carousel,
  Slide,
  Navigation as CarouselNavigation,
  Pagination as CarouselPagination,
  Breakpoints,
} from '@/index'

const { slideNum = 5, itemsToShow = 1 } = defineProps<{
  slideNum?: number
  itemsToShow?: number
  wrapAround?: boolean
  breakpoints?: Breakpoints
}>()
const vModel = defineModel<number>({ default: 0 })
</script>

<template>
  <Carousel v-model="vModel" :items-to-show="itemsToShow" :wrap-around="wrapAround" :breakpoints="breakpoints">
    <Slide v-for="slide in slideNum" :key="slide">
      {{ slide }}
      <input type="text" />
    </Slide>
    <template #addons>
      <CarouselNavigation />
      <CarouselPagination />
    </template>
  </Carousel>
</template>
