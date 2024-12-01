<template>
  <Carousel v-model="vModel" :items-to-show="itemsToShow" :wrap-around="wrapAround">
    <Slide v-for="slide in slideNum" :key="slide">
      {{slide}}
      <input type="text">
    </Slide>
    <template #addons>
      <CarouselNavigation/>
      <CarouselPagination/>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel'
import Slide from '@/components/Slide'
import CarouselNavigation from '@/components/Navigation'
import CarouselPagination from '@/components/Pagination'
const { slideNum = 5, itemsToShow = 1 } = defineProps<{ slideNum?: number, itemsToShow?: number, wrapAround?: boolean }>()
const vModel = defineModel<number>({default: 0})
</script>
