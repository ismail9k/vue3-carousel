# Navigation Component

The Navigation component provides intuitive Previous and Next buttons for slide navigation, with support for custom styling and RTL layouts.

## Basic Usage

```vue {2,11,12,13}
<script setup>
import { Navigation as CarouselNavigation } from 'vue3-carousel'
</script>

<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <!-- slide content -->
    </Slide>
    
    <template #addons>
      <CarouselNavigation />
    </template>
  </Carousel>
</template>
```

## Features

- Automatic RTL support
- Vertical navigation support
- Customizable button appearance
- Automatic disable state when reaching bounds
- Built-in accessibility features

## Custom Navigation Buttons

You can customize the navigation buttons using slots:

```vue 
<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <!-- slide content -->
    </Slide>
    
    <template #addons>
      <CarouselNavigation>
        <template #prev>
          <span>←</span>
        </template>
        <template #next>
          <span>→</span>
        </template>
      </CarouselNavigation>
    </template>
  </Carousel>
</template>
```

## Styling

### CSS Custom Properties

| Variable                 | Default Value             | Description                     |
| ------------------------ | ------------------------- | ------------------------------- |
| `--vc-nav-background`    | `transparent`             | Navigation button background    |
| `--vc-nav-border-radius` | `0`                       | Navigation button border radius |
| `--vc-nav-color`         | `var(--vc-clr-primary)`   | Navigation button color         |
| `--vc-nav-color-hover`   | `var(--vc-clr-secondary)` | Navigation button hover color   |
| `--vc-nav-height`        | `30px`                    | Navigation button height        |
| `--vc-nav-width`         | `30px`                    | Navigation button width         |

## Accessibility

- Buttons include descriptive ARIA labels
- Automatic disable state management
- Keyboard navigation support
- Proper focus management
