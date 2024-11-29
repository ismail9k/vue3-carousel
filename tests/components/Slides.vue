<template>
  <Slide v-for="slide in slideNum" :key="slide">
    {{slide}}
  </Slide>
</template>

<script setup lang="ts">
import Slide from '@/components/Slide'
const { slideNum = 5 } = defineProps<{ slideNum: number }>()
</script>
