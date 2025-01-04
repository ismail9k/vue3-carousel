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
  dir?: string
  height?: number
  gap?: number
  wrapAround?: boolean
  breakpoints?: Breakpoints
}>()
const vModel = defineModel<number>({ default: 0 })
</script>

<template>
  <Carousel
    v-model="vModel"
    :gap="gap"
    :items-to-show="itemsToShow"
    :dir="dir"
    :wrap-around="wrapAround"
    :breakpoints="breakpoints"
    :height="height"
  >
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
