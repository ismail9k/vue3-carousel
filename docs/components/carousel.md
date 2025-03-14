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

For more information about configuration options, see the [Configuration documentation](/config).