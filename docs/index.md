---
home: true
actionText: Getting Started →
actionLink: /getting-started
features:
- title: 🧁 Vue.js
  details: Optimized to work with Vue 3 framework, not a wrapper for another library.
- title: ♿ Accessible
  details: Robust structure and Touch, Keyboard, Mouse Wheel, and Navigation support.
- title: 📱 Responsive
  details: Responsive breakpoints, to apply custom configurations for each screen size.
footer: MIT Licensed
description: A customizable accessible carousel slider optimized for Vue
meta:
  - name: og:title
    content: Vue3-carousel
  - name: og:description
    content: A customizable accessible carousel slider optimized for Vue 3
---

## Quick Start

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