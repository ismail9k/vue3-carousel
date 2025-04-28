<script setup lang="ts">
import '@/theme.css'
import {
  Carousel as VueCarousel,
  Slide as CarouselSlide,
  Pagination as CarouselPagination,
  Navigation as CarouselNavigation,
} from '@/index'
import { computed, onMounted, reactive, ref } from 'vue'

import {
  DIR_MAP,
  SNAP_ALIGN_OPTIONS,
  BREAKPOINT_MODE_OPTIONS,
  SLIDE_EFFECTS,
} from '@/shared/constants'

const carouselWrapper = ref<HTMLDivElement | null>(null)
const carousel = ref<VueCarousel | null>(null)

const breakpoints = reactive({
  100: { itemsToShow: 1 },
  200: { itemsToShow: 2 },
  400: { itemsToShow: 3 },
  600: { itemsToShow: 4 },
})

const defaultSlides = [
  { id: 1, title: 'Slide 1', description: 'First slide description' },
  { id: 2, title: 'Slide 2', description: 'Second slide description' },
  { id: 3, title: 'Slide 3', description: 'Third slide description' },
  { id: 4, title: 'Slide 4', description: 'Fourth slide description' },
  { id: 5, title: 'Slide 5', description: 'Fifth slide description' },
]
const defaultConfig = {
  currentSlide: 0,
  snapAlign: 'center',
  slideEffect: 'slide',
  itemsToScroll: 1,
  itemsToShow: 2,
  autoplay: null,
  wrapAround: true,
  height: '200',
  mouseWheel: true,
  dir: 'left-to-right',
  breakpointMode: 'carousel',
  gap: 10,
  pauseAutoplayOnHover: true,
  useBreakpoints: false,
  threshold: 0.5,
}

const config = reactive({ ...defaultConfig })
const items = reactive([...defaultSlides])

const getConfigValue = (path: string) => config[path]

const setConfigValue = ({ type, path }, value: any) => {
  // Convert string values to numbers for numeric fields
  if (type === 'number') {
    config[path] = Number(value)
  } else {
    config[path] = value
  }
}

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
      {
        type: 'number',
        label: 'Gap',
        path: 'gap',
        attrs: { step: '1', min: '0', max: '20' },
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
        label: 'Slide Effect',
        path: 'slideEffect',
        options: SLIDE_EFFECTS,
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
  return
  // Reset animation
  if (carouselWrapper.value) {
    carouselWrapper.value.classList.remove('pop-in')
    void carouselWrapper.value.offsetWidth
    carouselWrapper.value.classList.add('pop-in')
  }

  // Reset config values
  Object.entries(defaultConfig).forEach(([key, value]) =>
    setConfigValue({ path: key }, value)
  )
  // Reset items
  items.splice(0, items.length, ...defaultSlides)
}

const handleButtonClick = () => {
  alert('Button clicked')
}

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

const handleAddingASlide = () => {
  const newId = items.length + 1
  const randomPosition = getRandomInt(0, newId)
  const newSlide = {
    id: newId,
    title: `Dynamic Slide ${newId}`,
    description: `Dynamically inserted at index ${randomPosition}`,
    color: '#2fa265',
  }
  items.splice(randomPosition, 0, newSlide)
}

const handleRemovingASlide = () => {
  if (items.length > 1) {
    const randomPosition = getRandomInt(0, items.length)
    const removedSlide = items[randomPosition]
    items.splice(randomPosition, 1)
    if (config.currentSlide >= items.length) {
      config.currentSlide = items.length - 1
    }
  }
}

const events = [
  'before-init',
  'init',
  'slide-start',
  'slide-end',
  'loop',
  'drag',
  'wheel',
  'slide-registered',
  'slide-unregistered',
]

const lastEvent = ref('')
const lastEventData = ref<any>(null)

const getSerializableData = (data: any): any => {
  if (!data) return null

  // For slide-registered and slide-unregistered events, only return relevant info
  if (data.slide) {
    return {
      ...data,
      slide: '[Complex Object]',
    }
  }

  return data
}

const handleEvent = (eventName: string) => (data?: any) => {
  lastEvent.value = eventName
  lastEventData.value = getSerializableData(data)
  console.log(`Event: ${eventName}`, data)
}

onMounted(() => {
  // Trigger pop-in animation
  window.carousel = carousel.value
})
</script>

<template>
  <div class="playground">
    <main class="canvas">
      <div class="carousel-wrapper pop-in" ref="carouselWrapper">
        <VueCarousel
          ref="carousel"
          v-model="config.currentSlide"
          v-bind="config"
          :breakpoints="config.useBreakpoints ? breakpoints : null"
          v-on="Object.fromEntries(events.map((e) => [e, handleEvent(e)]))"
        >
          <CarouselSlide v-for="(item, index) in items" :key="item.id" :index="index">
            <div
              class="carousel-item"
              :key="item.id"
              :style="{ backgroundColor: `${item.color}` }"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <button @click="handleButtonClick">This is a button</button>
            </div>
          </CarouselSlide>
          <template #addons>
            <CarouselPagination />
            <CarouselNavigation />
          </template>
        </VueCarousel>
      </div>
      <div v-if="lastEvent" class="event-debug">
        Last Event: {{ lastEvent }}
        <pre v-if="lastEventData">{{ JSON.stringify(lastEventData, null, 2) }}</pre>
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
            @input="(e) => setConfigValue(field, e.target.value)"
          >
            <option v-for="opt in field.options" :value="opt" :key="opt">
              {{ opt }}
            </option>
          </select>

          <input
            v-else-if="field.type === 'checkbox'"
            :checked="getConfigValue(field.path)"
            @input="(e) => setConfigValue(field, e.target.checked)"
            :type="field.type"
            v-bind="field.attrs || {}"
          />
          <input
            v-else
            :value="getConfigValue(field.path)"
            @input="(e) => setConfigValue(field, e.target.value)"
            :type="field.type"
            v-bind="field.attrs || {}"
          />
        </label>
      </div>
      <div class="config-panel-buttons-row">
        <!-- <button @click="handleAddingASlide" class="config-panel-button">
          Add a new slide
        </button>
        <button @click="handleRemovingASlide" class="config-panel-button">
          Remove a new slide
        </button> -->
        <button @click="handleReset" class="config-panel-button">Reset</button>
      </div>
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

.config-panel-button {
  margin-top: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: white;
  cursor: pointer;
  transition: opacity 0.2s;
}

.config-panel-button:hover {
  background: var(--brand-color);
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

.carousel-item h3 {
  margin: 0 0 10px;
}

.carousel-item p {
  margin: 0 0 15px;
  font-size: 16px;
  text-align: center;
  padding: 0 20px;
}

.event-debug {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 4px;
  font-size: 0.9em;
  max-width: 300px;
  overflow: auto;
}

.event-debug pre {
  margin: 5px 0 0;
  font-size: 0.8em;
  white-space: pre-wrap;
}

.carousel__slide--active .carousel-item {
  box-shadow: inset 0 0 0 2px red;
}
.config-panel-buttons-row {
  display: flex;
  flex-direction: column;
}
</style>
