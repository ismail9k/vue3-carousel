# Config

## Available Props

| Prop                       | Default                          | Description                                                                                                                                                                                                                                                    |
|----------------------------|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`                  | true                             | Controlled weather the carousel is enabled or disabled. <Badge text="0.8.0"/>                                                                                                                                                                                  |
| `itemsToShow`              | 1                                | Count of items to showed per view (can be a fraction). Must be between 1 and the total number of slides. If set to a value less than 1, it defaults to 1. If set to a value greater than the total number of slides, it defaults to the total number of slides. |
| `itemsToScroll`            | 1                                | Number of slides to be scrolled                                                                                                                                                                                                                                |
| `wrapAround`               | false                            | Enable infinite scrolling mode.                                                                                                                                                                                                                                |
| `snapAlign`                | 'center'                         | Controls the carousel position alignment, can be 'start', 'end', 'center-[odd\|even]'                                                                                                                                                                          |
| `transition`               | 300                              | Sliding transition time in ms.                                                                                                                                                                                                                                 |
| `autoplay`                 | 0                                | Auto play time in ms.                                                                                                                                                                                                                                          |
| `breakpointMode`           | 'viewport'                       | Determines how the carousel breakpoints are calculated. acceptable values: 'viewport', 'carousel' <Badge text="0.5.0"/>                                                                                                                                        |
| `breakpoints`              | null                             | An object to pass all the breakpoints settings.                                                                                                                                                                                                                |
| `modelValue`               | 0                                | Index number of the initial slide.                                                                                                                                                                                                                             |
| `mouseDrag`                | true                             | Toggle mouse dragging                                                                                                                                                                                                                                          |
| `touchDrag`                | true                             | Toggle pointer touch dragging                                                                                                                                                                                                                                  |
| `pauseAutoplayOnHover`     | false                            | Toggle if auto play should pause on mouse hover                                                                                                                                                                                                                |
| `dir`                      | 'ltr'                            | Controls the carousel direction. Available values: 'ltr', 'rtl', 'ttb', 'btt' or use verbose 'left-to-right', 'right-to-left', 'top-to-bottom', 'bottom-to-top' <Badge text="0.7.0"/>                                                                          |
| `i18n`                     | [`{ ariaNextSlide: ...}`](#i18n) | Used to translate and/or change aria labels and additional texts used in the carousel. <Badge text="0.3.1"/>                                                                                                                                                   |
| `gap`                      | 0                                | Used to add gap between the slides. <Badge text="0.6.0"/>                                                                                                                                                                                                      |
| `height`                   | 'auto'                           | Carousel track height. <Badge text="0.7.0"/>                                                                                                                                                                                                                   |
| `ignoreAnimations`         | false                            | List of animation names to ignore for size calculations. Can be a boolean, string, or array of strings. <Badge text="0.10.0"/>                                                                                                                                 |
| `preventExcessiveDragging` | false                            | Prevents unwanted dragging behavior when the carousel reaches its first or last slide.                                                                                                                                                                         |



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

| Prop             | Description                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------- |
| ~~`slideWidth`~~ | ~~the width of a single slide element.~~  <Badge type="danger" text="Rename to slideSize"/> |
| `slideSize`      | the width/height of a single slide element.                                                 |
| `currentSlide`   | index number of the current slide.                                                          |
| `slidesCount`    | the count of all slides                                                                     |

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
| `ariaNextSlide`       | "Navigate to next slide"               | Sets title and aria-label for the “Next” navigation button.                |
| `ariaPreviousSlide`   | "Navigate to previous slide"           | Sets title and aria-label for the “Previous” navigation button.            |
| `ariaNavigateToSlide` | "Navigate to slide {slideNumber}"      | Sets title and aria-label for pagination buttons to select a slide.        |
| `ariaGallery`         | "Gallery"                              | Used as the aria-label for the main carousel element, indicating purpose.  |
| `itemXofY`            | "Item {currentSlide} of {slidesCount}" | Provides screen readers with the current slide’s position in the sequence. |
| `iconArrowUp`         | "Arrow pointing upwards"               | Sets title and aria-label for the upward-pointing arrow SVG icon.          |
| `iconArrowDown`       | "Arrow pointing downwards"             | Sets title and aria-label for the downward-pointing arrow SVG icon.        |
| `iconArrowRight`      | "Arrow pointing to the right"          | Sets title and aria-label for the right-pointing arrow SVG icon.           |
| `iconArrowLeft`       | "Arrow pointing to the left"           | Sets title and aria-label for the left-pointing arrow SVG icon.            |
