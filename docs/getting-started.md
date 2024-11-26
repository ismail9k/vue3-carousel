# Getting started

 <p style="display: flex">
  <a href="https://www.npmjs.com/package/vue3-carousel">
    <img src="https://img.shields.io/npm/v/vue3-carousel.svg?style=flat-square&logo=npm" alt="npm version" />
  </a>
  <a href="https://github.com/ismail9k/vue3-carousel/stargazers">
    <img src="https://img.shields.io/github/stars/ismail9k/vue3-carousel?style=flat-square&logo=github" alt="GitHub stars" />
  </a>
  <a href="https://npm-stat.com/charts.html?package=vue3-carousel">
    <img src="https://img.shields.io/npm/dm/vue3-carousel.svg?style=flat-square" alt="npm downloads" />
  </a>
</p>

## Installation

First step is to install it using `yarn` or `npm`:

```bash
npm install vue3-carousel

# or use yarn
yarn add vue3-carousel
```

## Basic Using

```vue
<template>
  <carousel :items-to-show="1.5">
    <slide v-for="slide in 10" :key="slide">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
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
