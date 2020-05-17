# Vue 3 Carousel

Modern lightweight Vue 3 carousel component

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
  <carousel>
    <slide v-for="slide in 10" :key="slide" :items-to-show="1.5">
      {{ slide }}
    </slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
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

| Prop           | Default  | Description                                                     |
| -------------- | -------- | --------------------------------------------------------------- |
| `itemsToShow`  | 1        | count of items to showed per view (can be a fraction).          |
| `initialSlide` | 0        | index number of the initial slide.                              |
| `wrapAround`   | false    | enable infinite scrolling mode.                                 |
| `mode`         | 'center' | controls the carousel modes, can be 'start', 'end', or 'center' |
| `transition`   | 300      | sliding transition time in ms.                                  |
| `settings`     | { }      | an object to pass all settings.                                 |
| `breakpoints`  | null     | an object to pass all the breakpoints settings.                 |
