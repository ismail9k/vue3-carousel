# Config

## Available Props

| Prop                       | Type                                        | Default                          | Description                                                                                            |
| -------------------------- | ------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `autoplay`                 | `number`                                    | 0                                | Time interval (in milliseconds) between auto-advancing slides. Set to 0 to disable autoplay.           |
| `breakpointMode`           | 'viewport', 'carousel'                      | 'viewport'                       | Defines whether breakpoints are calculated based on viewport width or carousel container width.        |
| `breakpoints`              | `object`                                    | null                             | Responsive breakpoint configurations. Each breakpoint can override any carousel prop.                  |
| `dir`                      | 'ltr', 'rtl', 'ttb', 'btt'                  | 'ltr'                            | Carousel sliding direction. Supports horizontal (ltr/rtl) and vertical (ttb/btt) orientations.         |
| `enabled`                  | `boolean`                                   | true                             | Controls whether the carousel is interactive. When false, all interactions are disabled.               |
| `gap`                      | `number`                                    | 0                                | Space (in pixels) between carousel slides.                                                             |
| `height`                   | `number` \| `string`                        | 'auto'                           | Sets the carousel track height. Required for vertical orientation.                                     |
| `i18n`                     | `object`                                    | [`{ ariaNextSlide: ...}`](#i18n) | Internationalization options for accessibility labels and text content.                                |
| `ignoreAnimations`         | `boolean` \| `string` \| `array`            | false                            | Specifies which CSS animations should be excluded from slide size calculations. <Badge text="0.10.0"/> |
| `itemsToScroll`            | `number`                                    | 1                                | Number of slides to move when navigating. Useful for creating slide groups.                            |
| `itemsToShow`              | `number`  \| 'auto'                         | 1                                | Number of slides visible simultaneously. Use 'auto' for variable width slides.                         |
| `modelValue`               | `number`                                    | 0                                | Controls the active slide index. Can be used with v-model for two-way binding.                         |
| `mouseDrag`                | `boolean`                                   | true                             | Enables/disables mouse drag navigation.                                                                |
| `pauseAutoplayOnHover`     | `boolean`                                   | false                            | When true, autoplay pauses while the mouse cursor is over the carousel.                                |
| `preventExcessiveDragging` | `boolean`                                   | false                            | Limits dragging behavior at carousel boundaries for better UX. <Badge text="0.13.0" />                 |
| `snapAlign`                | 'start', 'end', 'center-odd', 'center-even' | 'center'                         | Determines how slides are aligned within the viewport.                                                 |
| `threshold`                | `number`                                    | 0.5                              | Define a threshold for the drag distance required to trigger a slide transition.                       |
| `touchDrag`                | `boolean`                                   | true                             | Enables/disables touch navigation on touch-enabled devices.                                            |
| `transition`               | `number`                                    | 300                              | Duration of the slide transition animation in milliseconds.                                            |
| `wrapAround`               | `boolean`                                   | false                            | When true, creates an infinite loop effect by connecting the last slide to the first.                  |

> **itemsToShow**: Controls the number of visible slides. Values between 1 and the total slide count are valid. Values outside this range are automatically clamped. Using 'auto' allows slides to determine their own width based on content.

> **Direction Settings**: For vertical orientations ('ttb'/'top-to-bottom', 'btt'/'bottom-to-top'), the carousel requires a fixed height setting. Direction can be specified using either short ('ltr', 'rtl', 'ttb', 'btt') or verbose ('left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top') formats.

> **Drag Prevention**: The `preventExcessiveDragging` option is automatically disabled when `wrapAround` is enabled, as boundary restrictions aren't needed in infinite loop mode.

## Slots

### Slides/Default

Used to render the carousel items. You can use either the default slot or wrap element in `slides` slot.

```vue
<template>
  <Carousel>
    <template #slides>
      <Slide v-for="slide in 10" :key="slide">
        ...
      </Slide>
    </template>
  </Carousel>
</template>
```

### Addons

Used to add display carousel addons components.

```vue
<template>
  <Carousel>
    ...
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
```

### Slots Attributes

| Prop           | Description                                 |
| -------------- | ------------------------------------------- |
| `currentSlide` | index number of the current slide.          |
| `slideSize`    | the width/height of a single slide element. |
| `slidesCount`  | the count of all slides                     |

#### Example

```vue {7,8,9}
<template>
  <Carousel>
    <Slide v-for="slide in slides" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
  
    <template #addons="{ slidesCount }">
      <Navigation v-if="slidesCount > 1" />
    </template>
  </Carousel>
</template>
```

### I18n

Available keys:

| Key                   | Defaults                               | Description                                                                |
| --------------------- | -------------------------------------- | -------------------------------------------------------------------------- |
| `ariaGallery`         | "Gallery"                              | Used as the aria-label for the main carousel element, indicating purpose.  |
| `ariaNavigateToSlide` | "Navigate to slide {slideNumber}"      | Sets title and aria-label for pagination buttons to select a slide.        |
| `ariaNextSlide`       | "Navigate to next slide"               | Sets title and aria-label for the “Next” navigation button.                |
| `ariaPreviousSlide`   | "Navigate to previous slide"           | Sets title and aria-label for the “Previous” navigation button.            |
| `iconArrowDown`       | "Arrow pointing downwards"             | Sets title and aria-label for the downward-pointing arrow SVG icon.        |
| `iconArrowLeft`       | "Arrow pointing to the left"           | Sets title and aria-label for the left-pointing arrow SVG icon.            |
| `iconArrowRight`      | "Arrow pointing to the right"          | Sets title and aria-label for the right-pointing arrow SVG icon.           |
| `iconArrowUp`         | "Arrow pointing upwards"               | Sets title and aria-label for the upward-pointing arrow SVG icon.          |
| `itemXofY`            | "Item {currentSlide} of {slidesCount}" | Provides screen readers with the current slide’s position in the sequence. |
