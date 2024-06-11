# Vue 3 Carousel

Modern lightweight Vue 3 carousel component

<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-carousel"><img src="https://img.shields.io/npm/dm/vue3-carousel.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/vue3-carousel"><img src="https://img.shields.io/npm/v/vue3-carousel.svg" alt="npm"/></a>
  <a href="https://packagequality.com/#?package=vue3-carousel"><img src="https://packagequality.com/shield/vue3-carousel.svg" alt="Package Quality"/></a>
</p>

## Documentation

https://ismail9k.github.io/vue3-carousel/

## Features

- [x] Responsive breakpoints
- [x] Mouse/touch dragging
- [x] Infinity scroll (wrapping around)
- [x] Auto play
- [x] Add classes for active and for visible slides
- [x] RTL
- [x] Enrich a11y

## Getting started

### Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install vue3-carousel

# or use yarn
yarn add vue3-carousel
```

### Basic Using

```vue
<template>
  <Carousel :items-to-show="1.5">
    <Slide v-for="slide in 10" :key="slide">
      {{ slide }}
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
}
</script>
```
