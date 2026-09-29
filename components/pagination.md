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
| `--vc-pgn-active-color`     | `var(--vc-clr-primary)`   | Active pagination button color     |
| `--vc-pgn-background-color` | `var(--vc-clr-secondary)` | Pagination button background color |
| `--vc-pgn-border-radius`    | `0`                       | Pagination button border radius    |
| `--vc-pgn-gap`              | `6px`                     | Gap between pagination buttons     |
| `--vc-pgn-height`           | `4px`                     | Pagination button height           |
| `--vc-png-bottom`           | `10px`                    | Bottom spacing for pagination      |
| `--vc-png-left`             | `auto`                    | Left spacing for vertical mode     |
| `--vc-png-right`            | `10px`                    | Right spacing for vertical mode    |
| `--vc-pgn-width`            | `16px`                    | Pagination button width            |

### Customization Examples

There are two ways to customize the pagination appearance:

#### 1. Using CSS Custom Properties

```css
.carousel {
  --vc-pgn-background-color: white;
  --vc-pgn-active-color: red;
  --vc-pgn-border-radius: 5px;
  --vc-pgn-height: 5px;
  --vc-pgn-width: 5px;
}
```

#### 2. Direct CSS Override

```css
.carousel__pagination-button {
  height: 5px;
  width: 5px;
  border-radius: 5px;
  background-color: white;
}
.carousel__pagination-button--active {
  background-color: red;
}
```

## Accessibility

- Pagination buttons are properly labeled for screen readers
- Active state is communicated through ARIA attributes
- Buttons include descriptive titles for better UX
