# Slide Component

The Slide component is a fundamental building block of the carousel that represents individual slides. It manages slide visibility, positioning, and state transitions.

## Basic Usage

```vue
<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">
        {{ slide }}
      </div>
    </Slide>
  </Carousel>
</template>
```

## Props

| Name  | Type   | Default | Description                                                |
| ----- | ------ | ------- | ---------------------------------------------------------- |
| index | Number | -       | Zero-based index position of the slide within the carousel |

## Slot Props

The default slot exposes these reactive properties for custom slide content:

| Name         | Type    | Description                                               |
| ------------ | ------- | --------------------------------------------------------- |
| currentIndex | Number  | Current index position of the slide                       |
| isActive     | Boolean | True when this slide is the current active slide          |
| isClone      | Boolean | True if this is a clone slide (used for infinite scroll)  |
| isPrev       | Boolean | True if this slide is immediately before the active slide |
| isNext       | Boolean | True if this slide is immediately after the active slide  |
| isSliding    | Boolean | True during slide transition animations                   |
| isVisible    | Boolean | True when the slide is within the visible viewport        |

## Examples

### Basic Slide

```vue
<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  </Carousel>
</template>
```

### Custom Slide with State

```vue
<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <template #default="{ isActive, isVisible }">
        <div 
          class="carousel__item"
          :class="{
            'is-active': isActive,
            'is-visible': isVisible
          }"
        >
          <h3>Slide {{ slide }}</h3>
          <p>{{ isActive ? 'Current Slide' : 'Other Slide' }}</p>
        </div>
      </template>
    </Slide>
  </Carousel>
</template>
```

## Styling

The component provides these CSS classes for styling:

| CSS Class                   | Description               |
| --------------------------- | ------------------------- |
| `.carousel__slide`          | Base slide styles         |
| `.carousel__slide--clone`   | Cloned slide styles       |
| `.carousel__slide--visible` | Visible slide styles      |
| `.carousel__slide--active`  | Active slide styles       |
| `.carousel__slide--prev`    | Previous slide styles     |
| `.carousel__slide--next`    | Next slide styles         |
| `.carousel__slide--sliding` | Styles during transitions |

## Best Practices

1. Always provide a unique `:key` when using v-for with Slides
2. If you have a dynamic slides which changes its position consider use `index` prop
