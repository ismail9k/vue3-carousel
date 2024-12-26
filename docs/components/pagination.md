# Pagination Component

The Pagination component provides interactive indicators that allow users to navigate directly to specific slides.

## Basic Usage

```vue  {2,11,12,13}
<script setup>
import { Pagination as CarouselPagination } from 'vue3-carousel'
</script>

<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <!-- slide content -->
    </Slide>
    
    <template #addons>
      <CarouselPagination />
    </template>
  </Carousel>
</template>
```

## Props

| Prop                    | Type    | Default | Description                                                     |
| ----------------------- | ------- | ------- | --------------------------------------------------------------- |
| `disableOnClick`        | Boolean | false   | When true, disables navigation when clicking pagination buttons |
| `paginateByItemsToShow` | Boolean | false   | Groups slides into pages based on `itemsToShow` setting         |

## Styling

### CSS Custom Properties

| Variable                    | Default Value             | Description                        |
| --------------------------- | ------------------------- | ---------------------------------- |
| `--vc-pgn-width`            | `16px`                    | Pagination button width            |
| `--vc-pgn-height`           | `4px`                     | Pagination button height           |
| `--vc-pgn-margin`           | `6px 5px`                 | Pagination button margin           |
| `--vc-pgn-border-radius`    | `0`                       | Pagination button border radius    |
| `--vc-pgn-background-color` | `var(--vc-clr-secondary)` | Pagination button background color |
| `--vc-pgn-active-color`     | `var(--vc-clr-primary)`   | Active pagination button color     |


## Accessibility

- Pagination buttons are properly labeled for screen readers
- Active state is communicated through ARIA attributes
- Buttons include descriptive titles for better UX
