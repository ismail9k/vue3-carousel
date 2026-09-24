# Carousel Component

The Carousel component is the main container that manages slides, navigation, and overall carousel functionality.

## Basic Usage

```vue
<template>
  <Carousel>
    <Slide v-for="slide in 10" :key="slide">
      <div class="carousel__item">{{ slide }}</div>
    </Slide>
    
    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>
```

## Slots

### Default/Slides Slot

Used to render the carousel items. You can use either the default slot or wrap elements in the `slides` slot.

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

### Addons Slot

Used to add display carousel addon components such as Navigation and Pagination.

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

## Slot Props

The following props are passed to slots and can be used within them:

| Name           | Type    | Description                                 |
| -------------- | ------- | ------------------------------------------- |
| `config`       | Object  | Configuration object with carousel settings. |
| `currentSlide` | Number  | Index number of the current slide.          |
| `maxSlide`     | Number  | The maximum slide index.                    |
| `middleSlide`  | Number  | The middle slide index.                     |
| `minSlide`     | Number  | The minimum slide index.                    |
| `slideSize`    | Number  | The width/height of a single slide element. |
| `slidesCount`  | Number  | The count of all slides.                    |

## Styling

The Carousel component provides several CSS classes that you can use for styling:

| CSS Class            | Description                       |
| -------------------- | --------------------------------- |
| `.carousel`          | Main carousel container           |
| `.carousel__viewport`| Carousel viewport/wrapper element |
| `.carousel__track`   | Container for slides              |

### Class prefix <Badge text="0.19.0"/>

Every class above (and the ones from Slide, Navigation and Pagination) starts with `carousel`. If that name collides with another stylesheet or script on your page, set `classPrefix` and every class is renamed, e.g. `classPrefix="vc"` renders `vc`, `vc__track`, `vc__slide--active`. The `is-*` state classes are unchanged.

The bundled `carousel.css` targets the default prefix. With a custom prefix, load a copy of it with `.carousel` replaced by `.<prefix>`, or write your own styles for the prefixed classes.

```vue
<Carousel class-prefix="vc">
  <Slide v-for="slide in 10" :key="slide">{{ slide }}</Slide>
</Carousel>
```

## Layout

The carousel is sized by its container, so make sure the container can shrink. `.carousel` already sets `min-width: 0`, which lets it shrink when it is a flex or grid item. In a grid column that is all it needs. In a flex row its flex basis is still the width of all its slides, so also give it `flex: 1`; otherwise it claims most of the row and squeezes its siblings. If you wrap it in your own element that is the flex or grid item, give that wrapper `min-width: 0` (flex and grid items default to `min-width: auto`, which prevents shrinking below the slides' content):

```css
.two-columns-grid {
  display: grid;
  grid-template-columns: 1fr 250px;
}

.two-columns-flex {
  display: flex;
}

.two-columns-flex .carousel {
  flex: 1;
}

.carousel-wrapper {
  min-width: 0;
}
```

For more information about configuration options, see the [Configuration documentation](/config).