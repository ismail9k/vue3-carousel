# Addons

## Navigation

Provides the navigation button (next, previous) to the Carousel

### How to Use It

```vue {2,9}
<script setup>
import { Navigation } from 'vue3-carousel'
</script>

<template>
  <Carousel v-bind="config">
    ...
    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

```

### Config

| Prop | Default | Description |
| ---- | ------- | ----------- |
| `dd` | dd      | d           |