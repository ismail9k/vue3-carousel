# Config


## Available Props

| Prop                   | Default                          | Description                                                                                                  |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `itemsToShow`          | 1                                | count of items to showed per view (can be a fraction).                                                       |
| `itemsToScroll`        | 1                                | number of slides to be scrolled                                                                              |
| ~~`currentSlide`~~     | ~~0~~                            | ~~index number of the initial slide.~~ <Badge text="Deprecated 0.1.20" type="danger"/>                       |
| `wrapAround`           | false                            | enable infinite scrolling mode.                                                                              |
| `snapAlign`            | 'center'                         | controls the carousel position alignment, can be 'start', 'end', 'center-[odd\|even]'                        |
| `transition`           | 300                              | sliding transition time in ms.                                                                               |
| `autoplay`             | 0                                | Auto play time in ms.                                                                                        |
| ~~`settings`~~         | ~~{ }~~                          | ~~an object to pass all settings.~~ <Badge text="Deprecated 0.3.0" type="danger"/>                           |
| `breakpoints`          | null                             | an object to pass all the breakpoints settings.                                                              |
| `modelValue`           | 0                                | index number of the initial slide. <Badge text="0.1.20"/>                                                    |
| `mouseDrag`            | true                             | toggle mouse dragging <Badge text="0.1.23"/>                                                                 |
| `touchDrag`            | true                             | toggle pointer touch dragging <Badge text="0.1.23"/>                                                         |
| `pauseAutoplayOnHover` | false                            | toggle if auto play should pause on mouse hover <Badge text="0.1.25"/>                                       |
| `dir`                  | ltr                              | controls the carousel direction. Available values 'ltr', 'rtl' <Badge text="0.1.38"/>                        |
| `i18n`                 | [`{ ariaNextSlide: ...}`](#i18n) | Used to translate and/or change aria labels and additional texts used in the carousel. <Badge text="0.3.1"/> |

## Slots

### Slides/Default

Used to render the carousel items. You can use either the default slot or wrap element in `slides` slot.

```vue
<Carousel>
  <template #slides>
    <Slide v-for="slide in 10" :key="slide">
      ...
    </Slide>
  </template>
</Carousel>
```

### Addons

Used to add display carousel addons components.

```vue
<Carousel>
  ...
  <template #addons>
    <Navigation />
    <Pagination />
  </template>
</Carousel>
```

### Slots Attributes

| Prop           | Description                          |
| -------------- | ------------------------------------ |
| `slideWidth`   | the width of a single slide element. |
| `currentSlide` | index number of the current slide.   |
| `slidesCount`  | the count of all slides              |

#### Example

```vue {6,7,8}
<Carousel>
  <Slide v-for="slide in slides" :key="slide">
    <div class="carousel__item">{{ slide }}</div>
  </Slide>

  <template #addons="{ slidesCount }">
    <Navigation v-if="slidesCount > 1" />
  </template>
</Carousel>
```

### I18n

Avaialbe keys:

| Key                   | Defaults                               |
| --------------------- | -------------------------------------- |
| `ariaNextSlide`       | "Navigate to next slide"               |
| `ariaPreviousSlide`   | "Navigate to previous slide"           |
| `ariaNavigateToSlide` | "Navigate to slide {slideNumber}"      |
| `ariaGallery`         | "Gallery"                              |
| `itemXofY`            | "Item {currentSlide} of {slidesCount}" |
| `iconArrowUp`         | "Arrow pointing upwards"               |
| `iconArrowDown`       | "Arrow pointing downwards"             |
| `iconArrowRight`      | "Arrow pointing to the right"          |
| `iconArrowLeft`       | "Arrow pointing to the left"           |


<script>
import Badge from './.vitepress/components/Badge.vue';

export default {
  components: {
   Badge,
  }
}
</script>
