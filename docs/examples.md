# Examples

## Basic Example

<iframe height="350" style="width: 100%;" scrolling="no" title="Vue3-Carousel - Basic Example" src="https://codepen.io/ismail9k/embed/LYRQoEj?height=350&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ismail9k/pen/LYRQoEj'>Vue3-Carousel - Basic Example</a> by Abdelrahman Ismail
  (<a href='https://codepen.io/ismail9k'>@ismail9k</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```vue
<template>
  <carousel>
    <slide v-for="slide in 10" :key="slide">{{ slide }}</slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>
```
## Wrap Around

<iframe height="350" style="width: 100%;" scrolling="no" title="Vue3-Carousel - Wrap Around" src="https://codepen.io/ismail9k/embed/RwGQmqd?height=350&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ismail9k/pen/RwGQmqd'>Vue3-Carousel - Wrap Around</a> by Abdelrahman Ismail
  (<a href='https://codepen.io/ismail9k'>@ismail9k</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```vue
<template>
  <carousel>
    <slide v-for="slide in 10" :key="slide">{{ slide }}</slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Navigation, Slide } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Navigation,
  },
};
</script>
```

## Breakpoints

<iframe height="350" style="width: 100%;" scrolling="no" title="Vue3-Carousel - Breakpoints" src="https://codepen.io/ismail9k/embed/BaLYeMa?height=350&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ismail9k/pen/BaLYeMa'>Vue3-Carousel - Breakpoints</a> by Abdelrahman Ismail
  (<a href='https://codepen.io/ismail9k'>@ismail9k</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```vue
<template>
  <carousel :settings="settings" :breakpoints="breakpoints">
    <slide v-for="slide in 10" :key="slide">{{ slide }}</slide>

    <template #addons>
      <navigation />
      <pagination />
    </template>
  </carousel>
</template>

<script>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Navigation, Slide } from 'vue3-carousel';

export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data: () => ({
      // carousel settings
      settings: {
        itemsToShow: 1,
        snapAlign: "center"
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 3.5,
          snapAlign: "center"
        },
        // 1024 and up
        1024: {
          itemsToShow: 5,
          snapAlign: "start"
        }
      }
    };
  }),
};
</script>
```