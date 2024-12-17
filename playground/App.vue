<script setup lang="ts">
import '@/theme.css'
import {
  Carousel as VueCarousel,
  Slide as CarouselSlide,
  Pagination as CarouselPagination,
  Navigation as CarouselNavigation,
} from '@/index'
import { computed, reactive, ref } from 'vue'

import { DIR_MAP, SNAP_ALIGN_OPTIONS, BREAKPOINT_MODE_OPTIONS } from '@/shared/constants'

const carouselWrapper = ref<HTMLDivElement | null>(null)

const numItems = 10
const breakpoints = reactive({
  100: { itemsToShow: 1 },
  200: { itemsToShow: 2 },
  400: { itemsToShow: 3 },
  600: { itemsToShow: 4 },
})
const defaultConfig = {
  currentSlide: 0,
  snapAlign: 'center',
  itemsToScroll: 1,
  itemsToShow: 1,
  autoplay: null,
  wrapAround: true,
  height: '200',
  dir: 'left-to-right',
  breakpointMode: 'carousel',
  gap: 10,
  pauseAutoplayOnHover: true,
  useBreakpoints: false,
}

const config = reactive({ ...defaultConfig })

const getConfigValue = (path: string) => config[path]

const setConfigValue = (path: string, value: any) => (config[path] = value)

const formFields = [
  {
    section: 'Layout',
    fields: [
      {
        type: 'number',
        label: 'Items to show',
        path: 'itemsToShow',
      },
      {
        type: 'number',
        label: 'Items to scroll',
        path: 'itemsToScroll',
      },
      {
        type: 'number',
        label: 'Height',
        path: 'height',
        attrs: { step: '100', min: '200', max: '1000' },
      },
    ],
  },
  {
    section: 'Behavior',
    fields: [
      {
        type: 'select',
        label: 'Snap Align',
        path: 'snapAlign',
        options: SNAP_ALIGN_OPTIONS,
      },
      {
        type: 'select',
        label: 'Direction',
        path: 'dir',
        options: Object.keys(DIR_MAP),
      },
      {
        type: 'checkbox',
        label: 'Wrap Around',
        path: 'wrapAround',
      },
    ],
  },
  {
    section: 'Navigation',
    fields: [
      {
        type: 'number',
        label: 'Current slide',
        path: 'currentSlide',
      },
      {
        type: 'number',
        label: 'Autoplay time',
        path: 'autoplay',
        attrs: { step: '100', min: '0', max: '10000' },
      },
    ],
  },
  {
    section: 'Responsive',
    fields: [
      {
        type: 'select',
        label: 'Breakpoint Mode',
        path: 'breakpointMode',
        options: BREAKPOINT_MODE_OPTIONS,
      },
      {
        type: 'checkbox',
        label: 'Use Breakpoints',
        path: 'useBreakpoints',
      },
    ],
  },
]

const handleReset = () => {
  // Reset animation
  if (carouselWrapper.value) {
    carouselWrapper.value.classList.remove('pop-in')
    void carouselWrapper.value.offsetWidth
    carouselWrapper.value.classList.add('pop-in')
  }

  // Reset config values
  Object.entries(defaultConfig).forEach(([key, value]) => setConfigValue(key, value))
}

const handelButtonClick = () => {
  alert('Button clicked')
}
</script>

<template>
  <div class="playground">
    <main class="canvas">
      <div class="carousel-wrapper pop-in" ref="carouselWrapper">
        <VueCarousel
          v-model="config.currentSlide"
          v-bind="config"
          :breakpoints="config.useBreakpoints ? breakpoints : null"
        >
          <CarouselSlide v-for="i in numItems" :key="i" v-slot="{ isActive, isClone }">
            <div class="carousel-item">
              {{ i }}<button @click="handelButtonClick">This is a button</button>
            </div>
          </CarouselSlide>
          <template #addons>
            <CarouselPagination />
            <CarouselNavigation />
          </template>
        </VueCarousel>
      </div>
    </main>

    <aside class="config-panel">
      <div v-for="section in formFields" :key="section.section" class="form-section">
        <h3 class="section-title">{{ section.section }}</h3>
        <label v-for="field in section.fields" :key="field.label">
          {{ field.label }}

          <select
            v-if="field.type === 'select'"
            :value="getConfigValue(field.path)"
            @input="(e) => setConfigValue(field.path, e.target.value)"
          >
            <option v-for="opt in field.options" :value="opt" :key="opt">
              {{ opt }}
            </option>
          </select>

          <input
            v-else-if="field.type === 'checkbox'"
            :checked="getConfigValue(field.path)"
            @input="(e) => setConfigValue(field.path, e.target.checked)"
            :type="field.type"
            v-bind="field.attrs || {}"
          />
          <input
            v-else
            :value="getConfigValue(field.path)"
            @input="(e) => setConfigValue(field.path, e.target.value)"
            :type="field.type"
            v-bind="field.attrs || {}"
          />
        </label>
      </div>
      <button @click="handleReset" class="reset-button">Reset Config</button>
    </aside>
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

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  min-height: 100vh;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  margin: 0;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
}

button,
input,
select {
  font: inherit;
  outline: none;
}

.playground {
  display: grid;
  grid-template-columns: 1fr 320px;
  min-height: 100vh;
  gap: 20px;
  padding: 20px;
  max-width: 1600px;
  margin: 0 auto;
}

.canvas {
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 10px;
  position: relative;
}

.config-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 8px;
  height: fit-content;
  position: sticky;
  top: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.config-panel label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-size: 0.9em;
}

.config-panel input,
.config-panel select {
  width: 140px;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: inherit;
  margin: 2px 0;
}

.config-panel input[type='checkbox'] {
  width: auto;
}

.config-panel button {
  margin-top: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.config-panel button:hover {
  background: rgba(200, 0, 0, 0.9);
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
  animation: pop-in 1s;
  transition: cubic-bezier(0.075, 0.82, 0.165, 1);
}

.carousel-wrapper {
  width: 100%;
  max-width: 1000px;
  min-width: 200px;
  margin: 0 auto;
  padding: 10px;
  border-radius: 8px;
  resize: horizontal;
  border: 2px dashed gray;
  overflow: auto;
}

.carousel-item {
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
