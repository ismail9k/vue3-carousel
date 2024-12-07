<script setup lang="ts">
import '@/theme.css'
import {
  Carousel as VueCarousel,
  Slide as CarouselSlide,
  Pagination as CarouselPagination,
  Navigation as CarouselNavigation,
} from '@/index'
import { ref } from 'vue'

import { DIR_MAP, SNAP_ALIGN_OPTIONS } from '@/shared/constants'

const carouselWrapper = ref<HTMLDivElement | null>(null)
const currentSlide = ref(0)
const snapAlign = ref('center')
const itemsToScroll = ref(1)
const itemsToShow = ref(1)
const autoplay = ref()
const wrapAround = ref(true)
const height = ref('200')
const dir = ref('left-to-right')

const handleRestartAnimation = () => {
  if (!carouselWrapper.value) return

  carouselWrapper.value.classList.remove('pop-in')
  void carouselWrapper.value.offsetWidth
  carouselWrapper.value.classList.add('pop-in')
}

const handelButtonClick = () => {
  alert('Button clicked')
}
</script>

<template>
  <div>
    <fieldset>
      <label
        >Snap Align
        <select v-model="snapAlign">
          <option v-for="opt in SNAP_ALIGN_OPTIONS" :value="opt" :key="opt">
            {{ opt }}
          </option>
        </select>
      </label>
      <label
        >Direction
        <select v-model="dir">
          <option v-for="opt in Object.keys(DIR_MAP)" :value="opt" :key="opt">
            {{ opt }}
          </option>
        </select>
      </label>
      <label>Items to show: <input type="number" v-model="itemsToShow" /></label>
      <label>Items to scroll: <input type="number" v-model="itemsToScroll" /></label>
      <label>Height: <input v-model="height" type="number" /></label>
      <label
        >Autoplay time:
        <input type="number" v-model="autoplay" step="100" min="0" max="10000"
      /></label>
      <label><input type="checkbox" v-model="wrapAround" />Wrap Around</label>
      <label>Current slide: <input type="number" v-model="currentSlide" /></label>

      <button @click="handleRestartAnimation">Restart animation</button>
    </fieldset>

    <div class="carousel-wrapper pop-in" ref="carouselWrapper">
      <VueCarousel
        v-model="currentSlide"
        :items-to-show="itemsToShow"
        :items-to-scroll="itemsToScroll"
        :gap="10"
        :height="height || 'auto'"
        :autoplay="autoplay ? parseInt(autoplay) : null"
        :pause-autoplay-on-hover="true"
        :wrap-around="wrapAround"
        :dir="dir"
        :snap-align="snapAlign"
      >
        <CarouselSlide v-for="i in 10" :key="i" v-slot="{ isActive, isClone }">
          <div class="carousel__item">
            {{ i }}<button @click="handelButtonClick">This is a button</button>
          </div>
        </CarouselSlide>
        <template #addons>
          <CarouselPagination />
          <CarouselNavigation />
        </template>
      </VueCarousel>
    </div>
  </div>
</template>

<style lang="css">
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color-scheme: light dark;
  background-color: #242424;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --brand-color: #535bf2;
}

fieldset {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 10px;
}

@keyframes pop-in {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.pop-in {
  animation: pop-in 3s;
}

fieldset label {
  display: inline-flex;
  gap: 10px;
  flex-grow: 1;
}

.carousel__item {
  width: 100%;
  height: 100%;
  background-color: var(--brand-color);
  color: #fff;
  font-size: 20px;
  border-radius: 8px;
  flex-direction: column;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
