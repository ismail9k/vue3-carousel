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
<script setup>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true
}
</script>

<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
```
