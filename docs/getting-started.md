# Getting started

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

## Available Props

| Prop                   | Default  | Description                                                                            |
| ---------------------- | -------- | -------------------------------------------------------------------------------------- |
| `itemsToShow`          | 1        | count of items to showed per view (can be a fraction).                                 |
| `itemsToScroll`        | 1        | number of slides to be scrolled                                                        |
| ~~`currentSlide`~~     | ~~0~~    | ~~index number of the initial slide.~~ <Badge text="Deprecated 0.1.20" type="danger"/> |
| `wrapAround`           | false    | enable infinite scrolling mode.                                                        |
| `snapAlign`            | 'center' | controls the carousel position alignment, can be 'start', 'end', or 'center'           |
| `transition`           | 300      | sliding transition time in ms.                                                         |
| `settings`             | { }      | an object to pass all settings.                                                        |
| `breakpoints`          | null     | an object to pass all the breakpoints settings.                                        |
| `modelValue`           | 0        | index number of the initial slide. <Badge text="0.1.20"/>                              |
| `mouseDrag`            | true     | toggle mouse dragging <Badge text="0.1.23"/>                                           |
| `touchDrag`            | true     | toggle pointer touch dragging <Badge text="0.1.23"/>                                   |
| `pauseAutoplayOnHover` | true     | toggle pointer touch dragging <Badge text="0.1.25"/>                                   |


## Slots

### Slides/Default
Used to render the carousel items. You can use either the default slot or wrap element in `slides` slot.

```vue
<Carousel>
  <template #slides>
    <Slide v-for="slide in 10" :key="slide">
      ...
    </Slide>
  </template>
</Carousel>
```
### Addons
Used to add display carousel addons components.

```vue
<Carousel>
  ...
  <template #addons>
    <Navigation />
    <Pagination />
  </template>
</Carousel>
```

### Slots Attributes

| Prop           | Description                          |
| -------------- | ------------------------------------ |
| `slideWidth`   | the width of a single slide element. |
| `currentSlide` | index number of the current slide.   |
| `slidesCount`  | the count of all slides              |


#### Example

```vue {6,7,8}
<Carousel>
  <Slide v-for="slide in slides" :key="slide">
    <div class="carousel__item">{{ slide }}</div>
  </Slide>

  <template #addons="{ slidesCount }">
    <Navigation v-if="slidesCount > 1" />
  </template>
</Carousel>
```

<script>
import Badge from './.vitepress/components/Badge.vue';

export default {
  components: {
   Badge,
  }
}
</script>