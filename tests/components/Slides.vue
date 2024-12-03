<script setup lang="ts">
import { Slide } from '@/index'
const { slideNum = 5 } = defineProps<{ slideNum: number }>()
</script>

<template>
  <Slide v-for="slide in slideNum" :key="slide">
    {{ slide }}
  </Slide>
</template>

