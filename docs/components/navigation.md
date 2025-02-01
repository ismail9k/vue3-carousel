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

### Customization Examples

There are two ways to customize the navigation appearance:

#### 1. Using CSS Custom Properties

```css
.carousel {
  --vc-nav-background: rgba(0, 0, 0, 0.3);
  --vc-nav-color: white;
  --vc-nav-color-hover: #e5e5e5;
  --vc-nav-border-radius: 50%;
  --vc-nav-width: 40px;
  --vc-nav-height: 40px;
}
```

#### 2. Direct CSS Override

```css
.carousel__next,
.carousel__prev {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
}

.carousel__next:hover,
.carousel__prev:hover {
  color: #e5e5e5;
}

.carousel__next--disabled,
.carousel__prev--disabled {
  opacity: 0.3;
}
```

## Accessibility

- Buttons include descriptive ARIA labels
- Automatic disable state management
- Keyboard navigation support
- Proper focus management
