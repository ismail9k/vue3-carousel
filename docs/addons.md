# Addons

Enhance the functionality of the carousel by adding more features to it/

## Navigation

The **Navigation** addon provides **Next** and **Previous** buttons for navigating through the carousel.

### How to Use It

```vue {2,9}
<script setup>
import { Navigation as CarouselNavigation } from 'vue3-carousel'
</script>

<template>
  <Carousel v-bind="config">
    ...
    <template #addons>
      <CarouselNavigation />
    </template>
  </Carousel>
</template>

```

## Pagination

The **Pagination** addon adds pagination indicators to the carousel.

```vue {2,9}
<script setup>
import { Pagination as CarouselPagination } from 'vue3-carousel'
</script>

<template>
  <Carousel v-bind="config">
    ...
    <template #addons>
      <CarouselPagination />
    </template>
  </Carousel>
</template>

```

### Config

| Prop             | Default | Description                  |
| ---------------- | ------- | ---------------------------- |
| `disableOnClick` | false   | Disables navigation on click |
