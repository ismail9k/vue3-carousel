# Vue 3 Carousel

Modern lightweight Vue 3 carousel component

<p>
  <a href="https://npm-stat.com/charts.html?package=vue3-carousel"><img src="https://img.shields.io/npm/dm/vue3-carousel.svg" alt="npm"/></a>
  <a href="https://www.npmjs.com/package/vue3-carousel"><img src="https://img.shields.io/npm/v/vue3-carousel.svg" alt="npm"/></a>
</p>

## Documentation

https://ismail9k.github.io/vue3-carousel/

## TODO

- [x] Responsive breakpoints
- [x] Mouse/touch dragging
- [x] Infinity scroll (wrapping around)
- [ ] Auto play
- [ ] RTL
- [ ] Vertical scroll
- [ ] Sync multiple carousel
- [ ] Enrich a11y

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
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
};
</script>
```

### Available Props

| Prop           | Default  | Description                                                                  |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| `itemsToShow`  | 1        | count of items to showed per view (can be a fraction).                       |
| `currentSlide` | 0        | index number of the initial slide.                                           |
| `wrapAround`   | false    | enable infinite scrolling mode.                                              |
| `snapAlign`    | 'center' | controls the carousel position alignment, can be 'start', 'end', or 'center' |
| `transition`   | 300      | sliding transition time in ms.                                               |
| `settings`     | { }      | an object to pass all settings.                                              |
| `breakpoints`  | null     | an object to pass all the breakpoints settings.                              |
