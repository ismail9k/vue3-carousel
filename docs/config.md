---
outline: deep
---

# Configuration

Vue 3 Carousel offers a comprehensive set of configuration options to customize its behavior and appearance. This page documents all available props, their types, default values, and usage guidelines.

## All Available Props

| Prop                       | Type                                        | Default                         | Description                                                                                                                                  |
|----------------------------|---------------------------------------------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `autoplay`                 | `number`                                    | 0                               | Time interval (in milliseconds) between auto-advancing slides. Set to 0 to disable autoplay.                                                 |
| `breakpointMode`           | 'viewport', 'carousel'                      | 'viewport'                      | Defines whether breakpoints are calculated based on viewport width or carousel container width.                                              |
| `breakpoints`              | `object`                                    | null                            | Responsive breakpoint configurations. Each breakpoint can override any carousel prop.                                                        |
| `clamp`                    | `boolean`                                   | false                           | If true will clamp itemsToShow to the number of available slides                                                                             |
| `dir`                      | 'ltr', 'rtl', 'ttb', 'btt'                  | 'ltr'                           | Carousel sliding direction. Supports horizontal (ltr/rtl) and vertical (ttb/btt) orientations.                                               |
| `enabled`                  | `boolean`                                   | true                            | Controls whether the carousel is interactive. When false, all interactions are disabled.                                                     |
| `focusInJumpToSlide`       | `boolean`                                   | true                            | Focusing a slide will jump-navigate to it                                                                                                    |
| `gap`                      | `number`                                    | 0                               | Space (in pixels) between carousel slides.                                                                                                   |
| `height`                   | `number` \| `string`                        | 'auto'                          | Sets the carousel track height. Required for vertical orientation.                                                                           |
| `i18n`                     | `object`                                    | `{ ... }` | Internationalization options for accessibility labels and text content. See [i18n](#i18n) for configuration details.                         |
| `ignoreAnimations`         | `boolean` \| `string` \| `array`            | false                           | Specifies which CSS animations should be excluded from slide size calculations. <Badge text="0.10.0"/>                                       |
| `itemsToScroll`            | `number`                                    | 1                               | Number of slides to move when navigating. Useful for creating slide groups.                                                                  |
| `itemsToShow`              | `number`  \| 'auto'                         | 1                               | Number of slides visible simultaneously. Use 'auto' for variable width slides.                                                               |
| `modelValue`               | `number`                                    | 0                               | Controls the active slide index. Can be used with v-model for two-way binding.                                                               |
| `mouseDrag`                | `boolean` \| `object`                   | true                            | Enables/disables mouse drag navigation. See [Drag Options](#drag-options) for configuration details.                                         |
| `mouseWheel`               | `boolean` \| `object`                   | false                           | Enables/disables mouse wheel scrolling for carousel navigation. See [Wheel Options](#wheel-options) for configuration details.               |
| `pauseAutoplayOnHover`     | `boolean`                                   | false                           | When true, autoplay pauses while the mouse cursor is over the carousel.                                                                      |
| `preventExcessiveDragging` | `boolean`                                   | false                           | Limits dragging behavior at carousel boundaries for better UX. <Badge text="0.13.0" />                                                       |
| `slideEffect`              | 'slide', 'fade'                             | 'slide'                         | Determines the transition effect between slides.                                                                                             |
| `snapAlign`                | 'start', 'end', 'center-odd', 'center-even' | 'center'                        | Determines how slides are aligned within the viewport.                                                                                       |
| `touchDrag`                | `boolean` \| `DragConfig`                   | true                            | Enables/disables touch navigation on touch-enabled devices. See [Drag Options](#drag-options) for configuration details.                     |
| `transition`               | `number`                                    | 300                             | Duration of the slide transition animation in milliseconds.                                                                                  |
| `wrapAround`               | `boolean`                                   | false                           | When true, creates an infinite loop effect by connecting the last slide to the first.                                                        |

## Basic Configuration

These props control the fundamental behavior of the carousel:

```vue
<template>
  <Carousel :items-to-show="3" :wrap-around="true" :transition="500">
    <Slide v-for="slide in 10" :key="slide">
      Slide {{ slide }}
    </Slide>
  </Carousel>
</template>
```

### Item Display Options

- **`itemsToShow`**: Controls the number of visible slides at once. Accepts numeric values (including decimals) or 'auto'.
  - When set to 'auto', slides determine their own width based on content.
  - Example: `:items-to-show="2.5"` shows 2 full slides and half of the next one.

- **`itemsToScroll`**: Number of slides to move when navigating.
  - Set to a value higher than 1 to create slide groups.
  - Example: `:items-to-show="3" :items-to-scroll="3"` creates page-like navigation.

### Direction Settings

- **`dir`**: Controls sliding direction. Supports both short and verbose formats:
  - Horizontal: 'ltr'/'left-to-right' or 'rtl'/'right-to-left'
  - Vertical: 'ttb'/'top-to-bottom' or 'btt'/'bottom-to-top'
  
  For vertical orientations, a fixed `height` setting is required:
  
  ```vue
  <Carousel dir="ttb" :height="300">
    <!-- Slides -->
  </Carousel>
  ```

## Navigation & Control

These props control how users can interact with the carousel:

```vue
<template>
  <Carousel 
    :autoplay="3000"
    :pause-autoplay-on-hover="true"
    :mouse-drag="true"
    :touch-drag="true"
    :mouse-wheel="{ threshold: 20 }"
  >
    <!-- Slides -->
  </Carousel>
</template>
```

- **`autoplay`**: Automatically advances slides after the specified interval (in milliseconds).
  - Set to 0 to disable autoplay: `:autoplay="0"`
  
- **`pauseAutoplayOnHover`**: When `true`, pauses autoplay while mouse is over the carousel.

- **`mouseDrag`** and **`touchDrag`**: Enable/disable drag navigation.
  - Basic usage: `:mouse-drag="true"` or `:touch-drag="false"`
  - Advanced usage: `:mouse-drag="{ threshold: 0.5 }"` (see [Drag Options](#drag-options))

- **`mouseWheel`**: Enable/disable mouse wheel navigation.
  - Basic usage: `:mouse-wheel="true"`
  - Advanced usage: `:mouse-wheel="{ threshold: 20 }"` (see [Wheel Options](#wheel-options))

- **`preventExcessiveDragging`**: Improves UX by limiting drag behavior at carousel boundaries.
  - Automatically disabled when `wrapAround` is enabled

## Visual Customization

These props control the appearance of the carousel:

```vue
<template>
  <Carousel 
    :gap="20"
    snap-align="start"
    slide-effect="fade"
    :transition="500"
  >
    <!-- Slides -->
  </Carousel>
</template>
```

- **`gap`**: Space (in pixels) between slides.
  - Example: `:gap="20"` creates 20px spacing between slides.

- **`snapAlign`**: Controls how slides align within the viewport.
  - 'start': Aligns slides to the beginning of the carousel
  - 'center': Centers the current slide (default)
  - 'end': Aligns slides to the end of the carousel
  - 'center-odd'/'center-even': Special center alignments for odd/even number of visible slides

- **`slideEffect`**: Controls the transition effect between slides.
  - 'slide': Standard sliding transition (default)
  - 'fade': Fade effect between slides

- **`transition`**: Duration of slide transitions in milliseconds.
  - Example: `:transition="500"` for a half-second transition.

## Responsive Behavior

These props control how the carousel adapts to different screen sizes:

```vue
<template>
  <Carousel 
    :items-to-show="1"
    breakpoint-mode="carousel"
    :breakpoints="{
      700: {
        itemsToShow: 2,
        snapAlign: 'center',
      },
      1000: {
        itemsToShow: 3,
        snapAlign: 'start',
      }
    }"
  >
    <!-- Slides -->
  </Carousel>
</template>
```

- **`breakpoints`**: Responsive settings that override default props at different widths.
  - Keys represent the minimum width in pixels
  - Values are objects containing any carousel props to override

- **`breakpointMode`**: Determines how breakpoints are calculated.
  - 'viewport': Based on browser window width (default)
  - 'carousel': Based on carousel container width

## Advanced Options

These props provide additional customization for specific use cases:

- **`clamp`**: When `true`, limits `itemsToShow` to the actual number of available slides.
  - Useful for preventing empty space when there are fewer slides than `itemsToShow`.

- **`enabled`**: When `false`, disables all carousel interactions.
  - Useful for conditionally disabling the carousel functionality.

- **`ignoreAnimations`**: Excludes specified CSS animations from slide size calculations.
  - Useful when animations are causing layout issues.

- **`modelValue`**: Controls the active slide index (for use with v-model).
  - Example: `v-model="activeSlide"` for two-way binding.

- **`wrapAround`**: Creates an infinite loop effect by connecting the last slide to the first.
  - Example: `:wrap-around="true"` allows continuous navigation in either direction.

## Option Details

### Drag Options

Both `mouseDrag` and `touchDrag` properties accept either a boolean value or a `DragConfig` object with the following properties:

| Property    | Type     | Default | Description                                                                                |
|-------------|----------|---------|--------------------------------------------------------------------------------------------|
| `threshold` | `number` | 0.3     | Controls the drag distance required to trigger a slide transition, as a fraction of slide width. Higher values require more dragging to trigger a slide change. |

Example:
```vue
<Carousel :mouse-drag="{ threshold: 0.5 }" :touch-drag="false">
  <!-- Slides -->
</Carousel>
```

### Wheel Options

The `mouseWheel` property accepts either a boolean value or a `WheelConfig` object with the following properties:

| Property      | Type     | Default | Description                                                                                |
|---------------|----------|---------|--------------------------------------------------------------------------------------------|
| `threshold`   | `number` | 10      | Controls the wheel movement threshold required to trigger a slide transition. Higher values require more scrolling to trigger a slide change. |

Example:
```vue
<Carousel :mouse-wheel="{ threshold: 20 }">
  <!-- Slides -->
</Carousel>
```

### I18n

The `i18n` prop allows customization of text content for accessibility and internationalization:

```vue
<Carousel 
  :i18n="{
    ariaNextSlide: 'Go to next slide',
    ariaPreviousSlide: 'Go to previous slide'
  }"
>
  <!-- Slides -->
</Carousel>
```

Available keys:

| Key                   | Defaults                               | Description                                                                |
| --------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `ariaGallery`         | "Gallery"                              | Used as the aria-label for the main carousel element, indicating purpose.  |
| `ariaNavigateToSlide` | "Navigate to slide {slideNumber}"      | Sets title and aria-label for pagination buttons to select a slide.        |
| `ariaNextSlide`       | "Navigate to next slide"               | Sets title and aria-label for the "Next" navigation button.                |
| `ariaPreviousSlide`   | "Navigate to previous slide"           | Sets title and aria-label for the "Previous" navigation button.            |
| `iconArrowDown`       | "Arrow pointing downwards"             | Sets title and aria-label for the downward-pointing arrow SVG icon.        |
| `iconArrowLeft`       | "Arrow pointing to the left"           | Sets title and aria-label for the left-pointing arrow SVG icon.            |
| `iconArrowRight`      | "Arrow pointing to the right"          | Sets title and aria-label for the right-pointing arrow SVG icon.           |
| `iconArrowUp`         | "Arrow pointing upwards"               | Sets title and aria-label for the upward-pointing arrow SVG icon.          |
| `itemXofY`            | "Item {currentSlide} of {slidesCount}" | Provides screen readers with the current slide's position in the sequence. |

