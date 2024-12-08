<script setup lang="ts">
import Carousel from './Carousel.vue'
import Slides from './Slides.vue'
const { slideNum = 5 } = defineProps<{ slideNum: number, wrapAround?: boolean }>()
</script>

<template>
  <Carousel :wrap-around="wrapAround">
    <Slides :slide-num="slideNum"></Slides>
  </Carousel>
</template>

