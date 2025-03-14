<p align="center">
  <img src="docs/public/vue3-carousel-logo-light.svg" width="200" alt="Vue 3 Carousel Logo">
</p>

<h1 align="center">Vue 3 Carousel</h1>

<p align="center">
Modern lightweight Vue 3 carousel component
</p>

<p align="center">
  <a href="https://npm-stat.com/charts.html?package=vue3-carousel"><img src="https://img.shields.io/npm/dm/vue3-carousel.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/vue3-carousel"><img src="https://img.shields.io/npm/v/vue3-carousel.svg" alt="npm"/></a>
  <a href="https://packagequality.com/#?package=vue3-carousel"><img src="https://packagequality.com/shield/vue3-carousel.svg" alt="Package Quality"/></a>
</p>

## ✨ Features

- 📱 **Responsive** - Breakpoints support
- 🔄 **Infinite Scroll** - Wrap around sliding
- 🖱️ **Mouse/Touch** - Dragging support
- 🖲️ **Mouse Wheel** - Scroll navigation support
- ⚡ **Auto Play** - Automatic sliding
- 🎯 **Slide Classes** - Active & visible states
- 🌐 **RTL** - Right-to-left support
- ♿ **A11y** - Keyboard navigation & ARIA labels
- 📊 **Vertical** - Vertical sliding mode

## 🚀 Installation

```bash
# npm
npm i vue3-carousel

# yarn
yarn add vue3-carousel

# pnpm
pnpm install vue3-carousel
```

## 📖 Basic Usage

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

## 📚 Documentation

Visit our [documentation website](https://vue3-carousel.ismail9k.com/) for detailed usage and examples:

- [Getting Started](https://vue3-carousel.ismail9k.com/getting-started)
- [Carousel Configuration](https://vue3-carousel.ismail9k.com/config)
- [Carousel Component](https://vue3-carousel.ismail9k.com/components/carousel)
- [Slide Component](https://vue3-carousel.ismail9k.com/components/slide)
- [Navigation Component](https://vue3-carousel.ismail9k.com/components/navigation)
- [Pagination Component](https://vue3-carousel.ismail9k.com/components/pagination)

## 💚 Nuxt Module

For Nuxt users, check out [vue3-carousel-nuxt](https://github.com/gaetansenn/vue3-carousel-nuxt) module.
