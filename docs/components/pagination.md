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
| `paginateByItemsToShow` | Boolean | false   | When true, overrides the carousel's `navigationBoundary` config and groups slides into pages based on `itemsToShow` setting. For new projects, prefer using the carousel's `navigationBoundary="viewport"` config instead |

## Pagination Modes

The pagination component automatically follows the carousel's `navigationBoundary` configuration:

### Viewport Mode (Paginated)

When `navigationBoundary="viewport"`, pagination shows page indicators grouped by `itemsToShow`:

```vue
<template>
  <Carousel
    :items-to-show="3"
    navigation-boundary="viewport"
  >
    <Slide v-for="slide in 10" :key="slide">
      <!-- slide content -->
    </Slide>

    <template #addons>
      <CarouselPagination />
    </template>
  </Carousel>
</template>
```

With 10 slides and `itemsToShow: 3`, this displays 4 page buttons (pages 0-3).

### Slides Mode (Individual)

When `navigationBoundary="slides"` (default), pagination shows one button per slide:

```vue
<template>
  <Carousel
    :items-to-show="3"
    navigation-boundary="slides"
  >
    <Slide v-for="slide in 10" :key="slide">
      <!-- slide content -->
    </Slide>

    <template #addons>
      <CarouselPagination />
    </template>
  </Carousel>
</template>
```

With 10 slides, this displays 10 individual slide buttons.

## Legacy Prop vs. Modern Configuration

The `paginateByItemsToShow` prop provides backward compatibility and can override the carousel's `navigationBoundary` setting. However, for new projects, the recommended approach is to use the carousel's `navigationBoundary` config:

**Legacy approach (still supported):**

```vue
<Carousel>
  <template #addons>
    <CarouselPagination :paginate-by-items-to-show="true" />
  </template>
</Carousel>
```

**Recommended approach:**

```vue
<Carousel navigation-boundary="viewport">
  <template #addons>
    <CarouselPagination />
  </template>
</Carousel>
```

### Benefits of Using `navigationBoundary`

- **Consistency**: Both Navigation and Pagination components use the same configuration
- **Centralized Control**: Single source of truth for boundary behavior at the carousel level
- **Snap Align Support**: Works correctly with all snap alignment options (start, center, end, center-even, center-odd)
- **Better Architecture**: Configuration lives at the appropriate level (carousel) rather than individual components

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
